package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.News;
import co.aladintech.hcm.domain.NewsCategory;
import co.aladintech.hcm.service.dto.NewsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Spring Data JPA repository for the News entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    Page<News> findAllByNewsCategoryIn(List<NewsCategory> categories, Pageable pageable);
    Page<News> findAllByNewsCategoryInAndTitleIsLikeIgnoreCase(List<NewsCategory> categories, String keyword, Pageable pageable);

    @Transactional
    @Modifying
    void deleteAllByNewsCategory(NewsCategory newsCategory);
}
