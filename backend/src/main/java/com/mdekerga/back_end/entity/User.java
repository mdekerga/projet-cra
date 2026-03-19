package com.mdekerga.back_end.entity;

import com.mdekerga.back_end.enums.ContratType;
import com.mdekerga.back_end.enums.Role;
import com.mdekerga.back_end.enums.Seniorite;
import com.mdekerga.back_end.enums.Statut;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "firstname")
    private String first_name;
    @Column(name = "lastname")
    private String last_name;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name="hash_password")
    private String password;

    @Column(unique = true, name="email")
    private String email;

    @Column(name="active")
    private boolean active;

    @Column(name="statut")
    @Enumerated(EnumType.STRING)
    private Statut statut;

    @Column(name="Contrat")
    @Enumerated(EnumType.STRING)
    private ContratType contrat;

    @Column(name="seniorite")
    @Enumerated(EnumType.STRING)
    private Seniorite seniorite;

    @Column(name="salaire")
    private BigDecimal salaire;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
