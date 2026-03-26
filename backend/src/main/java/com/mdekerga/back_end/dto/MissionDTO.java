package com.mdekerga.back_end.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class MissionDTO {
    private Long id;

    @NotBlank(message = "Le titre est obligatoire")
    private String titre;

    @NotBlank(message = "Une mission à toujours un client")
    private String client;

    @NotNull(message = "La date de début est obligatoire")
    private LocalDate dateDebut;

    private LocalDate dateFin;

    private String description;
    private String motif;

    @Positive(message = "Le TJM doit être supérieur à 0")
    private BigDecimal tjm;

    private Long assignedUserId;

    private String assignedUserName;
}
