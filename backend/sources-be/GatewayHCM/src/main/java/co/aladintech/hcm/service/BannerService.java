package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.BannerDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.Banner}.
 */
public interface BannerService {
    /**
     * Save a banner.
     *
     * @param bannerDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<BannerDTO> save(BannerDTO bannerDTO);

    /**
     * Updates a banner.
     *
     * @param bannerDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<BannerDTO> update(BannerDTO bannerDTO);

    /**
     * Partially updates a banner.
     *
     * @param bannerDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<BannerDTO> partialUpdate(BannerDTO bannerDTO);

    /**
     * Get all the banners.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<BannerDTO> findAll(Pageable pageable);

    /**
     * Returns the number of banners available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" banner.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<BannerDTO> findOne(Long id);

    /**
     * Delete the "id" banner.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
