package com.mdekerga.back_end.controller;

import com.mdekerga.back_end.dto.MissionDTO;
import com.mdekerga.back_end.service.MissionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/missions")
public class MissionController {

    @Autowired
    private MissionService missionService;

    @GetMapping
    public List<MissionDTO> getAllMissions() {
        return missionService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MissionDTO createMission(@Valid @RequestBody MissionDTO dto) {
        return missionService.save(dto);
    }

    @PutMapping("/{id}")
    public MissionDTO updateMission(@PathVariable Long id, @Valid @RequestBody MissionDTO dto) {
        return missionService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMission(@PathVariable Long id) {
        missionService.delete(id);
    }
}
