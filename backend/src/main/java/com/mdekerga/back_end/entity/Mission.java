package com.mdekerga.back_end.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Setter
@Getter
@Entity
@Table(name="mission")
public class Mission {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="mission_id")
    private Long id;

    @Column(name="mission_name")
    private String mission_name;

    @Column(name="mission_start")
    private LocalDate start_date;

    @Column(name="mission_end")
    private LocalDate end_date;

    @Column(name="mission_description")
    private String description;

}
