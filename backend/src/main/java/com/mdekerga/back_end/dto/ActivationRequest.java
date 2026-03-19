package com.mdekerga.back_end.dto;


import lombok.Data;

@Data
public class ActivationRequest {
    private String email;
    private String password;
}
