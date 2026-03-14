package com.mdekerga.back_end.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
    @Column(name = "firstname")
    private String first_name;
    @Column(name = "lastname")
    private String last_name;

    @Column(name="email")
    private String email;

}
