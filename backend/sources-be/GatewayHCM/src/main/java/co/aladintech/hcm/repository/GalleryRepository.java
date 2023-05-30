package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.Gallery;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Gallery entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GalleryRepository extends ReactiveCrudRepository<Gallery, Long>, GalleryRepositoryInternal {
    Flux<Gallery> findAllBy(Pageable pageable);

    @Override
    <S extends Gallery> Mono<S> save(S entity);

    @Override
    Flux<Gallery> findAll();

    @Override
    Mono<Gallery> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface GalleryRepositoryInternal {
    <S extends Gallery> Mono<S> save(S entity);

    Flux<Gallery> findAllBy(Pageable pageable);

    Flux<Gallery> findAll();

    Mono<Gallery> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Gallery> findAllBy(Pageable pageable, Criteria criteria);

}
