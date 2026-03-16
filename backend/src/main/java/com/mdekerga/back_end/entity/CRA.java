package com.mdekerga.back_end.entity;

import com.mdekerga.back_end.enums.EtatCRA;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;



public class CRA {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="cra_id")
    private Long cra_id;

    private EtatCRA etatCRA;
}
