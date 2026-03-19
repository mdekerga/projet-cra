package com.mdekerga.back_end.repository;

import com.mdekerga.back_end.entity.Assignment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByMissionId(Long missionId);
    List<Assignment> findByUserId(Long userId);
}
