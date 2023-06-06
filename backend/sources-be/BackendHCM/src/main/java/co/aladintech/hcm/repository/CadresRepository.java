package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.Cadres;
import co.aladintech.hcm.domain.News;
import co.aladintech.hcm.domain.NewsCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Cadres entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CadresRepository extends JpaRepository<Cadres, Long> {
    Page<Cadres> findAllByFullnameIsLikeIgnoreCase(String keyword, Pageable pageable);
}
