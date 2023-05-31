package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.HeaderNavbar;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Spring Data JPA repository for the HeaderNavbar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HeaderNavbarRepository extends JpaRepository<HeaderNavbar, Long> {

    List<HeaderNavbar> findAllByParent(Long id);
    List<HeaderNavbar> findAllByLink(String link);

    @Transactional
    @Modifying
    void deleteAllByParent(Long id);
}
