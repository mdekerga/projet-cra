package com.mdekerga.back_end.controller;

import com.mdekerga.back_end.entity.CRA;
import com.mdekerga.back_end.enums.EtatCRA;
import com.mdekerga.back_end.service.CRAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/cras")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private CRAService craService;

    @GetMapping("/submitted")
    public ResponseEntity<?> getSubmittedCRAs() {
        try {
            List<CRA> submitted = craService.getCRAsByStatus(EtatCRA.SUBMITTED);
            return ResponseEntity.ok(submitted);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id}/validate")
    public ResponseEntity<?> validateCRA(
            @PathVariable Long id,
            @RequestBody Map<String, Object> payload) {
        try {
            boolean approved = (boolean) payload.get("approved");
            String reason = (String) payload.get("reason");
            EtatCRA action = approved ? EtatCRA.APPROVED : EtatCRA.REJECTED;
            
            CRA updated = craService.processAdminAction(id, action, reason);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
