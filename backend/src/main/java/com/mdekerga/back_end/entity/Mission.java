package com.mdekerga.back_end.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;


@Setter
@Getter
@Entity
@Table(name="missions")
public class Mission {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="mission_id")
    private Long id;

    @Column(nullable = false,name="mission_name")
    private String mission_name;

    @Column(name="mission_start")
    private LocalDate start_date;

    @Column(name="mission_end")
    private LocalDate end_date;

    @Column(columnDefinition = "TEXT",name="mission_description")
    private String description;

    @Column(name="motif")
    private String motif;

    @Column(name="tjm")
    private BigDecimal tjm;

}
