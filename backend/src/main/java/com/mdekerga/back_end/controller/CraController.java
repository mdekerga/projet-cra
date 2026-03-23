package com.mdekerga.back_end.controller;

import com.mdekerga.back_end.entity.CRA;
import com.mdekerga.back_end.enums.EtatCRA;
import com.mdekerga.back_end.service.CRAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cras")
@CrossOrigin(origins = "http://localhost:4200") // Pour autoriser les appels Angular
public class CraController {

    @Autowired
    private CRAService craService;

    /**
     * Génère ou récupère le CRA brouillon d'un collaborateur pour un mois donné
     */
    @PostMapping("/generate")
    public ResponseEntity<?> generateCRA(@RequestBody Map<String, Object> payload) {
        try {
            Long userId = Long.valueOf(payload.get("userId").toString());
            int month = (int) payload.get("month");
            int year = (int) payload.get("year");

            CRA cra = craService.generateMonthlyCRA(userId, month, year);
            return ResponseEntity.ok(cra);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Soumission par le collaborateur (Règle 22-28)
     */
    @PutMapping("/{id}/submit")
    public ResponseEntity<?> submitCRA(@PathVariable Long id) {
        try {
            CRA submitted = craService.submitCRA(id);
            return ResponseEntity.ok(submitted);
        } catch (RuntimeException e) {
            // Renvoie une erreur 400 si hors fenêtre 22-28
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Action Admin : Validation, Rejet ou Invalidation
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam EtatCRA action,
            @RequestBody(required = false) Map<String, String> body) {
        try {
            String reason = (body != null) ? body.get("reason") : null;
            CRA updated = craService.processAdminAction(id, action, reason);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}