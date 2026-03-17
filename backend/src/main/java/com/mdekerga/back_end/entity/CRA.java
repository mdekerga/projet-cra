package com.mdekerga.back_end.entity;

import com.mdekerga.back_end.enums.EtatCRA;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Setter
@Getter
@Entity
@Table(name = "cra")
public class CRA {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="cra_id")
    private Long cra_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name="month_cra")
    private int month;

    @Column(name="year_cra")
    private int year;

    @Enumerated(EnumType.STRING)
    @Column(name="etat_cra")
    private EtatCRA etatCRA;

    @Column(name="rejectionReason")
    private String rejectionReason;

    @Column(name="submittedAt")
    private LocalDateTime submittedAt;

    @OneToMany(mappedBy = "cra", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CraDay> days = new ArrayList<>();
}
