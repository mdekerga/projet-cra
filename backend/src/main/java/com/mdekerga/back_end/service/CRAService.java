package com.mdekerga.back_end.service;

import com.mdekerga.back_end.entity.*;
import com.mdekerga.back_end.enums.*;
import com.mdekerga.back_end.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CRAService {

    @Autowired private CRARepository craRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private AssignmentRepository assignmentRepository;

    public CRA generateMonthlyCRA(Long userId, int month, int year) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Vérifier si un CRA existe déjà pour ce mois pour éviter les doublons
        if (craRepository.existsByUserIdAndMonthAndYear(userId, month, year)) {
            throw new RuntimeException("Un CRA existe déjà pour ce mois.");
        }

        CRA cra = new CRA();
        cra.setUser(user);
        cra.setMonth(month);
        cra.setYear(year);
        cra.setEtatCRA(EtatCRA.DRAFT);
        cra.setDays(new ArrayList<>());

        YearMonth yearMonth = YearMonth.of(year, month);
        List<Assignment> assignments = assignmentRepository.findByUserId(userId);

        for (int day = 1; day <= yearMonth.lengthOfMonth(); day++) {
            LocalDate date = yearMonth.atDay(day);

            // On ne génère des lignes que pour les jours ouvrés
            if (date.getDayOfWeek() != DayOfWeek.SATURDAY && date.getDayOfWeek() != DayOfWeek.SUNDAY) {
                CraDay craDay = new CraDay();
                craDay.setCra(cra);
                craDay.setDate(date);
                craDay.setDuration(1.0);

                Mission activeMission = findActiveMission(assignments, date);

                if (activeMission != null) {
                    craDay.setMission(activeMission);
                    craDay.setActivityType(Activites.WORK);
                } else {
                    // Règle métier : Auto intercontrat si pas de mission
                    craDay.setMission(null);
                    craDay.setActivityType(Activites.INTERCONTRAT);
                }
                cra.getDays().add(craDay);
            }
        }
        return craRepository.save(cra);
    }

    public CRA submitCRA(Long craId) {
        CRA cra = craRepository.findById(craId)
                .orElseThrow(() -> new RuntimeException("CRA non trouvé"));

        // Règle métier : Fenêtre 22 -> 28
        ZonedDateTime nowParis = ZonedDateTime.now(ZoneId.of("Europe/Paris"));
        int currentDay = nowParis.getDayOfMonth();

        if (currentDay < 22 || currentDay > 28) {
            throw new RuntimeException("La soumission n'est autorisée qu'entre le 22 et le 28 du mois.");
        }

        cra.setEtatCRA(EtatCRA.SUBMITTED);
        cra.setSubmittedAt(nowParis.toLocalDateTime());
        return craRepository.save(cra);
    }

    /**
     * Gère la validation, le rejet ou l'invalidation
     * @param action : APPROVED, REJECTED, ou INVALIDATED
     */
    public CRA processAdminAction(Long craId, EtatCRA action, String reason) {
        CRA cra = craRepository.findById(craId)
                .orElseThrow(() -> new RuntimeException("CRA non trouvé"));

        if ((action == EtatCRA.REJECTED || action == EtatCRA.INVALIDATED)
                && (reason == null || reason.isBlank())) {
            throw new RuntimeException("Le motif est obligatoire pour un rejet ou une invalidation.");
        }

        cra.setEtatCRA(action);
        cra.setRejectionReason(reason);
        return craRepository.save(cra);
    }

    public List<CRA> getCRAsByStatus(EtatCRA status) {
        return craRepository.findByEtatCRA(status);
    }

    private Mission findActiveMission(List<Assignment> assignments, LocalDate date) {
        return assignments.stream()
                .filter(a -> !date.isBefore(a.getStartDate()) &&
                        (a.getEndDate() == null || !date.isAfter(a.getEndDate())))
                .map(Assignment::getMission)
                .findFirst()
                .orElse(null);
    }
}