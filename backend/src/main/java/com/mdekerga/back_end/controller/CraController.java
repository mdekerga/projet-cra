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
@CrossOrigin(origins = "http://localhost:4200")
public class CraController {

    @Autowired
    private CRAService craService;

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

    @PutMapping("/{id}/submit")
    public ResponseEntity<?> submitCRA(@PathVariable Long id) {
        try {
            CRA submitted = craService.submitCRA(id);
            return ResponseEntity.ok(submitted);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

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

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {

        String statusStr = payload.get("status");
        String reason = payload.get("reason");

        if (statusStr == null) {
            return ResponseEntity.badRequest().body("Le champ 'status' est manquant");
        }

        try {
            EtatCRA nouvelEtat = EtatCRA.valueOf(statusStr.toUpperCase());
            CRA updated = craService.processAdminAction(id, nouvelEtat, reason);

            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Statut invalide : " + statusStr);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}