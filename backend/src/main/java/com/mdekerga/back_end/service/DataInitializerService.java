package com.mdekerga.back_end.service;

import com.mdekerga.back_end.entity.*;
import com.mdekerga.back_end.enums.*;
import com.mdekerga.back_end.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class DataInitializerService implements CommandLineRunner {

    private final UserRepository userRepository;
    private final MissionRepository missionRepository;
    private final AssignmentRepository assignmentRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializerService(UserRepository userRepository, MissionRepository missionRepository,
                           AssignmentRepository assignmentRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.missionRepository = missionRepository;
        this.assignmentRepository = assignmentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) return;

        User admin = new User();
        admin.setFirst_name("Jean");
        admin.setLast_name("Admin");
        admin.setEmail("admin@cbx.fr");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(Role.ADMIN);
        admin.setActive(true);
        userRepository.save(admin);

        User colab1 = createCollab("Alice", "Consultant", "alice@cbx.fr", Statut.MISSION);
        User colab2 = createCollab("Bob", "Junior", "bob@cbx.fr", Statut.INTERCONTRAT);

        Mission m1 = new Mission();
        m1.setName("Projet Cloud AWS");
        m1.setClient("Société Générale");
        missionRepository.save(m1);

        Mission m2 = new Mission();
        m2.setName("Refonte Mobile");
        m2.setClient("Air France");
        missionRepository.save(m2);

        Assignment a1 = new Assignment();
        a1.setUser(colab1);
        a1.setMission(m1);
        a1.setStartDate(LocalDate.of(2026, 3, 1));
        a1.setEndDate(LocalDate.of(2026, 12, 31));
        assignmentRepository.save(a1);

        System.out.println("✅ Base de données peuplée avec succès !");
    }

    private User createCollab(String fn, String ln, String email, Statut statut) {
        User u = new User();
        u.setFirst_name(fn);
        u.setLast_name(ln);
        u.setEmail(email);
        u.setPassword(passwordEncoder.encode("password123"));
        u.setRole(Role.COLLABORATOR);
        u.setActive(true);
        u.setStatut(statut);
        return userRepository.save(u);
    }
}