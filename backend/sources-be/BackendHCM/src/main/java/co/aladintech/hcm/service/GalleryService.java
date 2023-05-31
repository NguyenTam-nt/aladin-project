package co.aladintech.hcm.service;

import co.aladintech.hcm.domain.enumeration.GalleryType;
import co.aladintech.hcm.service.dto.GalleryDTO;

import java.util.List;
import java.util.Optional;

import co.aladintech.hcm.service.dto.GalleryPageDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.Gallery}.
 */
public interface GalleryService {
    /**
     * Save a gallery.
     *
     * @param galleryDTO the entity to save.
     * @return the persisted entity.
     */
    GalleryDTO save(GalleryDTO galleryDTO);

    /**
     * Updates a gallery.
     *
     * @param galleryDTO the entity to update.
     * @return the persisted entity.
     */
    GalleryDTO update(GalleryDTO galleryDTO);

    /**
     * Partially updates a gallery.
     *
     * @param galleryDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<GalleryDTO> partialUpdate(GalleryDTO galleryDTO);

    /**
     * Get all the galleries.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<GalleryDTO> findAll(Pageable pageable);

    /**
     * Get the "id" gallery.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GalleryPageDTO> findOne(Long id, Pageable pageable);

    /**
     * Delete the "id" gallery.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    void deleteAll(List<Long> ids);

    Page<GalleryDTO> findAllByType(GalleryType type, Pageable pageable);
}
