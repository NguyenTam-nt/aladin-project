package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.Banner;
import co.aladintech.hcm.domain.Gallery;
import co.aladintech.hcm.domain.enumeration.GalleryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Gallery entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {
    Page<Gallery> findAllByType(GalleryType type, Pageable pageable);
}
