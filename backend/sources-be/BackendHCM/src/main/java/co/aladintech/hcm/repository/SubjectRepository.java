package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.Cadres;
import co.aladintech.hcm.domain.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Subject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Page<Subject> findAllByNameIsLikeIgnoreCase(String keyword, Pageable pageable);
}
