package com.mdekerga.back_end.service;

import com.mdekerga.back_end.dto.MissionDTO;
import com.mdekerga.back_end.entity.Mission;
import com.mdekerga.back_end.exception.ResourceNotFoundException;
import com.mdekerga.back_end.repository.MissionRepository;
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

    public List<MissionDTO> findAll() {
        return missionRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public MissionDTO findById(Long id) {
        Mission mission = missionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mission non trouvée"));
        return mapToDTO(mission);
    }

    public MissionDTO save(MissionDTO dto) {
        Mission mission = new Mission();
        copyDtoToEntity(dto, mission);
        return mapToDTO(missionRepository.save(mission));
    }

    public MissionDTO update(Long id, MissionDTO dto) {
        Mission mission = missionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mission non trouvée"));
        copyDtoToEntity(dto, mission);
        return mapToDTO(missionRepository.save(mission));
    }

    public void delete(Long id) {
        if (!missionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Mission non trouvée");
        }
        missionRepository.deleteById(id);
    }

    private void copyDtoToEntity(MissionDTO dto, Mission entity) {
        entity.setName(dto.getTitre());
        entity.setStart_date(dto.getDateDebut());
        entity.setEnd_date(dto.getDateFin());
        entity.setDescription(dto.getDescription());
        entity.setMotif(dto.getMotif());
        entity.setTjm(dto.getTjm());
    }

    private MissionDTO mapToDTO(Mission mission) {
        MissionDTO dto = new MissionDTO();
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
