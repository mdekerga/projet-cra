package com.mdekerga.back_end.entity;

import com.mdekerga.back_end.enums.ContratType;
import com.mdekerga.back_end.enums.Role;
import com.mdekerga.back_end.enums.Seniorite;
import com.mdekerga.back_end.enums.Statut;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="user_id")
    private Long user_id;

    @Column(name = "firstname")
    private String first_name;
    @Column(name = "lastname")
    private String last_name;

    @Column(name = "role")
    private Role role;

    @Column(name="hash_password")
    private String password;

    @Column(unique = true, name="email")
    private String email;

    @Column(name="active")
    private boolean active;

    @Column(name="statut")
    private Statut statut;

    @Column(name="Contrat")
    private ContratType contrat;

    @Column(name="seniorite")
    private Seniorite seniorite;

    @Column(name="salaire")
    private BigDecimal salaire;
}
