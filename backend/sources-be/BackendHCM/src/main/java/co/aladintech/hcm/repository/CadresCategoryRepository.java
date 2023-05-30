package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.CadresCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CadresCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CadresCategoryRepository extends JpaRepository<CadresCategory, Long> {}
