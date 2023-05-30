package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.NewsCategoryDTO;
import co.aladintech.hcm.service.dto.NewsDTO;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.News}.
 */
public interface NewsService {
    /**
     * Save a news.
     *
     * @param newsDTO the entity to save.
     * @return the persisted entity.
     */
    NewsDTO save(NewsDTO newsDTO);

    /**
     * Updates a news.
     *
     * @param newsDTO the entity to update.
     * @return the persisted entity.
     */
    NewsDTO update(NewsDTO newsDTO);

    /**
     * Partially updates a news.
     *
     * @param newsDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<NewsDTO> partialUpdate(NewsDTO newsDTO);

    /**
     * Get all the news.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<NewsDTO> findAll(Pageable pageable);

    /**
     * Get the "id" news.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NewsDTO> findOne(Long id);

    /**
     * Delete the "id" news.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the news corresponding to the query.
     *
     * @param query the query of the search.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<NewsDTO> search(String query, Pageable pageable);

    Page<NewsDTO> findAllByCategoriesIdAndKeyword(List<Long> categoriesId, String keyword, Pageable pageable);

    void deleteAll(List<Long> ids);
}
