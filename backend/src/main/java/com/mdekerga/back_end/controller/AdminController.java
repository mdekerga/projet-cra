package com.mdekerga.back_end.controller;

import com.mdekerga.back_end.entity.CRA;
import com.mdekerga.back_end.enums.EtatCRA;
import com.mdekerga.back_end.service.CRAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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
            return ResponseEntity.ok(submitted.stream().map(this::toSubmittedCraResponse).toList());
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
            return ResponseEntity.ok(toSubmittedCraResponse(updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    private Map<String, Object> toSubmittedCraResponse(CRA cra) {
        String firstName = cra.getUser() != null ? cra.getUser().getFirst_name() : "";
        String lastName = cra.getUser() != null ? cra.getUser().getLast_name() : "";

        String missionName = cra.getDays().stream()
                .map(day -> day.getMission() != null ? day.getMission().getName() : null)
                .filter(Objects::nonNull)
                .findFirst()
                .orElse("Intercontrat");

        double totalDays = cra.getDays().stream()
                .mapToDouble(day -> day.getDuration())
                .sum();

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("id", cra.getCra_id());
        response.put("month", cra.getMonth());
        response.put("year", cra.getYear());
        response.put("status", cra.getEtatCRA().name());
        response.put("rejectionReason", cra.getRejectionReason() == null ? "" : cra.getRejectionReason());
        response.put("submittedAt", cra.getSubmittedAt());
        response.put("collaboratorFirstName", firstName);
        response.put("collaboratorLastName", lastName);
        response.put("mission", missionName);
        response.put("totalDays", totalDays);
        return response;
    }
}
