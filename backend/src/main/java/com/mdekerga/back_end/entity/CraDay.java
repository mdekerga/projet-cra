package com.mdekerga.back_end.entity;


import com.mdekerga.back_end.enums.Activites;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "craDay")
public class CraDay {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="craDay_id")
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cra_id")
    private CRA cra;

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private Activites activityType;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;

    @Column(name="duration_cra")
    private double duration;
}

