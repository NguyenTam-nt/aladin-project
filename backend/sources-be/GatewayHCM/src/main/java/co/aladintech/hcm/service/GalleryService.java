package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.GalleryDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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
    Mono<GalleryDTO> save(GalleryDTO galleryDTO);

    /**
     * Updates a gallery.
     *
     * @param galleryDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<GalleryDTO> update(GalleryDTO galleryDTO);

    /**
     * Partially updates a gallery.
     *
     * @param galleryDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<GalleryDTO> partialUpdate(GalleryDTO galleryDTO);

    /**
     * Get all the galleries.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<GalleryDTO> findAll(Pageable pageable);

    /**
     * Returns the number of galleries available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" gallery.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<GalleryDTO> findOne(Long id);

    /**
     * Delete the "id" gallery.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
