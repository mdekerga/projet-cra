package com.mdekerga.back_end.repository;

import com.mdekerga.back_end.entity.CRA;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface CRARepository extends JpaRepository<CRA, Long> {

    boolean existsByUserIdAndMonthAndYear(Long userId, int month, int year);
}
