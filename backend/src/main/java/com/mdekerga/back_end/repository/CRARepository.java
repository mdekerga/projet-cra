package com.mdekerga.back_end.repository;

import com.mdekerga.back_end.entity.CRA;
import com.mdekerga.back_end.enums.EtatCRA;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface CRARepository extends JpaRepository<CRA, Long> {

    boolean existsByUserIdAndMonthAndYear(Long userId, int month, int year);
    
    List<CRA> findByEtatCRA(EtatCRA etatCRA);
}
