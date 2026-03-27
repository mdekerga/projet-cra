package com.mdekerga.back_end.controller;

import com.mdekerga.back_end.dto.ActivationRequest;
import com.mdekerga.back_end.security.JwtUtil;
import com.mdekerga.back_end.entity.User;
import com.mdekerga.back_end.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200") 
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")

    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid email or password"));
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (!user.isActive()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN) // Erreur 403
                    .body(Map.of("message", "Votre compte est désactivé ou en attente d'activation."));
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole().name());

        return ResponseEntity.ok(response);
    }
    @PostMapping("/activate")
    public ResponseEntity<?> activateAccount(@RequestBody ActivationRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (request.getPassword() == null || request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode("Temp1234!"));
        } else {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        user.setActive(true);

        userRepository.save(user);
        return ResponseEntity.ok("Compte activé avec succès !");
    }
}