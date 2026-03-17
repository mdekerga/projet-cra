package com.mdekerga.back_end.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "assignments")
@Getter
@Setter
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

    @Column(name="startDate")
    private LocalDate startDate;

    @Column(name="endDate")
    private LocalDate endDate;

    @Column(name="createdAt")
    private LocalDateTime createdAt;

    @PrePersist
    void prePersist(){
        createdAt = LocalDateTime.now();
    }
}
