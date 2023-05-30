package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.NewsCategoryDTO;
import java.util.Optional;

import co.aladintech.hcm.service.dto.NewsCategoryListChildrenDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.NewsCategory}.
 */
public interface NewsCategoryService {
    /**
     * Save a newsCategory.
     *
     * @param newsCategoryDTO the entity to save.
     * @return the persisted entity.
     */
    NewsCategoryDTO save(NewsCategoryDTO newsCategoryDTO);

    /**
     * Updates a newsCategory.
     *
     * @param newsCategoryDTO the entity to update.
     * @return the persisted entity.
     */
    NewsCategoryDTO update(NewsCategoryDTO newsCategoryDTO);

    /**
     * Partially updates a newsCategory.
     *
     * @param newsCategoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<NewsCategoryDTO> partialUpdate(NewsCategoryDTO newsCategoryDTO);

    /**
     * Get all the newsCategories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<NewsCategoryDTO> findAll(Pageable pageable);
    Page<NewsCategoryListChildrenDTO> findAllParent(Pageable pageable);
    Page<NewsCategoryListChildrenDTO> findAllWithChildren(Pageable pageable);

    /**
     * Get the "id" newsCategory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NewsCategoryDTO> findOne(Long id);

    /**
     * Delete the "id" newsCategory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    NewsCategoryListChildrenDTO saveWithChildren(NewsCategoryListChildrenDTO newsCategoryListChildrenDTO);

    Optional<NewsCategoryListChildrenDTO> findOneWithChildren(Long id);

    NewsCategoryListChildrenDTO updateWithChildren(NewsCategoryListChildrenDTO newsCategoryListChildrenDTO);
}
