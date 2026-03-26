package com.mdekerga.back_end.dto;

import com.mdekerga.back_end.enums.ContratType;
import com.mdekerga.back_end.enums.Role;
import com.mdekerga.back_end.enums.Seniorite;
import com.mdekerga.back_end.enums.Statut;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class UserDTO {
    private Long id;

    @NotBlank(message = "Le prénom est obligatoire")
    private String firstName;

    @NotBlank(message = "Le nom est obligatoire")
    private String lastName;

    @Email(message = "Email invalide")
    @NotBlank(message = "L'email est obligatoire")
    private String email;

    private String password;

    private boolean active;
    private Role role;
    private Statut statut;
    private ContratType contrat;
    private Seniorite seniorite;

    @PositiveOrZero
    private BigDecimal salaire;
}
