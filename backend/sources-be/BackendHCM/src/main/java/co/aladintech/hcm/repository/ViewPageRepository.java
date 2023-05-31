package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.ViewPage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ViewPage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ViewPageRepository extends JpaRepository<ViewPage, Long> {}
