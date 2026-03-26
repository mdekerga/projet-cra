package com.mdekerga.back_end.service;

import com.mdekerga.back_end.dto.MissionDTO;
import com.mdekerga.back_end.entity.Mission;
import com.mdekerga.back_end.entity.User;
import com.mdekerga.back_end.entity.Assignment;
import com.mdekerga.back_end.exception.ResourceNotFoundException;
import com.mdekerga.back_end.repository.AssignmentRepository;
import com.mdekerga.back_end.repository.MissionRepository;
import com.mdekerga.back_end.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MissionService {

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    UserRepository userRepository;

    public List<MissionDTO> findAll() {
        List<Mission> missions = missionRepository.findAll();

        return missions.stream().map(mission -> {
            MissionDTO dto = new MissionDTO();

            dto.setId(mission.getId());
            dto.setTitre(mission.getName());
            dto.setClient(mission.getClient());
            dto.setDateDebut(mission.getStart_date());
            dto.setDateFin(mission.getEnd_date());

            assignmentRepository.findByMissionId(mission.getId()).stream()
                    .findFirst() //
                    .ifPresent(assignment -> {
                        String fullName = assignment.getUser().getFirst_name() + " " + assignment.getUser().getLast_name();
                        dto.setAssignedUserName(fullName);
                    });

            return dto;
        }).collect(Collectors.toList());
    }

    public MissionDTO findById(Long id) {
        Mission mission = missionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mission non trouvée"));
        return mapToDTO(mission);
    }

    @Transactional
    public MissionDTO save(MissionDTO dto) {
        Mission mission = (dto.getId() != null)
                ? missionRepository.findById(dto.getId()).orElse(new Mission())
                : new Mission();

        copyDtoToEntity(dto, mission);
        Mission savedMission = missionRepository.save(mission);


        if (dto.getAssignedUserId() != null) {
            updateAssignment(savedMission, dto.getAssignedUserId());
        }

        return mapToDTO(savedMission);
    }

    @Transactional
    public MissionDTO update(Long id, MissionDTO dto) {
        dto.setId(id); 
        return save(dto);
    }

    private void updateAssignment(Mission mission, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));

        Assignment assignment = assignmentRepository.findByMissionId(mission.getId())
                .stream().findFirst().orElse(new Assignment());

        assignment.setMission(mission);
        assignment.setUser(user);

        assignment.setStartDate(mission.getStart_date());
        assignment.setEndDate(mission.getEnd_date());

        assignmentRepository.save(assignment);
    }

    public void delete(Long id) {
        if (!missionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Mission non trouvée");
        }
        missionRepository.deleteById(id);
    }

    private void copyDtoToEntity(MissionDTO dto, Mission entity) {
        entity.setClient(dto.getClient());
        entity.setName(dto.getTitre());
        entity.setStart_date(dto.getDateDebut());
        entity.setEnd_date(dto.getDateFin());
        entity.setDescription(dto.getDescription());
        entity.setMotif(dto.getMotif());
        entity.setTjm(dto.getTjm());
    }

    private MissionDTO mapToDTO(Mission mission) {
        MissionDTO dto = new MissionDTO();
        dto.setClient(mission.getClient());
        dto.setId(mission.getId());
        dto.setTitre(mission.getName());
        dto.setDateDebut(mission.getStart_date());
        dto.setDateFin(mission.getEnd_date());
        dto.setDescription(mission.getDescription());
        dto.setMotif(mission.getMotif());
        dto.setTjm(mission.getTjm());
        return dto;
    }
}
