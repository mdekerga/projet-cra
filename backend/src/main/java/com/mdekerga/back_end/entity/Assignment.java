package com.mdekerga.back_end.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="assignment_id")
    private Long assignment_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalDateTime createdAt;

    @PrePersist
    void prePersist(){
        createdAt = LocalDateTime.now();
    }
}
