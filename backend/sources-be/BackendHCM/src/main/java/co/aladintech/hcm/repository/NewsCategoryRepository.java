package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.NewsCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Spring Data JPA repository for the NewsCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NewsCategoryRepository extends JpaRepository<NewsCategory, Long> {
    Page<NewsCategory> findAllByParent(Long id, Pageable pageable);;
    List<NewsCategory> findAllByParent(Long id);

    @Transactional
    @Modifying
    void deleteAllByParent(Long id);
}
