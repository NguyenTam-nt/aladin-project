package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.Banner;
import co.aladintech.hcm.domain.ContentSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ContentSession entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContentSessionRepository extends JpaRepository<ContentSession, Long> {

    Page<ContentSession> findAllByCategory(String category, Pageable pageable);
}
