package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.PostsDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.Posts}.
 */
public interface PostsService {
    /**
     * Save a posts.
     *
     * @param postsDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<PostsDTO> save(PostsDTO postsDTO);

    /**
     * Updates a posts.
     *
     * @param postsDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<PostsDTO> update(PostsDTO postsDTO);

    /**
     * Partially updates a posts.
     *
     * @param postsDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<PostsDTO> partialUpdate(PostsDTO postsDTO);

    /**
     * Get all the posts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<PostsDTO> findAll(Pageable pageable);

    /**
     * Returns the number of posts available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" posts.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<PostsDTO> findOne(Long id);

    /**
     * Delete the "id" posts.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
