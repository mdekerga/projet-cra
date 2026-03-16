package com.mdekerga.back_end.controller;

import com.mdekerga.back_end.entity.Mission;
import com.mdekerga.back_end.exception.ResourceNotFoundException;
import com.mdekerga.back_end.repository.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/missions")
public class MissionController {
    @Autowired
    private MissionRepository missionRepository;

    @GetMapping
    public List<Mission> getAllMissions(){
        return missionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Mission getMission(@PathVariable Long id){
        return missionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Mission not found"));
    }

    @PostMapping()
    public Mission createMission(@RequestBody Mission newMission){

        return missionRepository.save(newMission);
    }

    @DeleteMapping("/{id}")
    public void deleteMission(@PathVariable Long id){
        Mission mission = missionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Mission not found"));

        missionRepository.deleteById(id);
    }
}
