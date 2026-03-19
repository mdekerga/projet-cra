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

        CRA cra = new CRA();
        cra.setUser(user);
        cra.setMonth(month);
        cra.setYear(year);
        cra.setEtatCRA(EtatCRA.DRAFT);
        cra.setDays(new ArrayList<>());

        YearMonth yearMonth = YearMonth.of(year, month);
        int daysInMonth = yearMonth.lengthOfMonth();

        List<Assignment> assignments = assignmentRepository.findByUserId(userId);

        for (int day = 1; day <= daysInMonth; day++) {
            LocalDate date = yearMonth.atDay(day);

            if (date.getDayOfWeek() != DayOfWeek.SATURDAY && date.getDayOfWeek() != DayOfWeek.SUNDAY) {
                CraDay craDay = new CraDay();
                craDay.setCra(cra);
                craDay.setDate(date);
                craDay.setDuration(1.0);
                craDay.setActivityType(Activites.WORK);

                Mission activeMission = findActiveMission(assignments, date);

                craDay.setMission(activeMission);

                cra.getDays().add(craDay);
            }
        }

        return craRepository.save(cra);
    }

    public CRA submitCRA(Long craId) {
        CRA cra = craRepository.findById(craId)
                .orElseThrow(() -> new RuntimeException("CRA non trouvé"));

        ZonedDateTime nowParis = ZonedDateTime.now(ZoneId.of("Europe/Paris"));
        int currentDay = nowParis.getDayOfMonth();

        if (currentDay < 22 || currentDay > 28) {
            throw new RuntimeException("La soumission n'est autorisée qu'entre le 22 et le 28 du mois.");
        }

        cra.setEtatCRA(EtatCRA.SUBMITTED);
        cra.setSubmittedAt(nowParis.toLocalDateTime());

        return craRepository.save(cra);
    }


    public CRA validateCRA(Long craId, boolean approved, String reason) {
        CRA cra = craRepository.findById(craId)
                .orElseThrow(() -> new RuntimeException("CRA non trouvé"));

        if (!approved && (reason == null || reason.isBlank())) {
            throw new RuntimeException("Un motif est obligatoire pour rejeter ou invalider un CRA.");
        }

        cra.setEtatCRA(approved ? EtatCRA.APPROVED : EtatCRA.REJECTED);
        cra.setRejectionReason(approved ? null : reason);

        return craRepository.save(cra);
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