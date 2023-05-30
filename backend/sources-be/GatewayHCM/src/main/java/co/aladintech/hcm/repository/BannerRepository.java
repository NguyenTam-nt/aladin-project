package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.Banner;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Banner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BannerRepository extends ReactiveCrudRepository<Banner, Long>, BannerRepositoryInternal {
    Flux<Banner> findAllBy(Pageable pageable);

    @Override
    <S extends Banner> Mono<S> save(S entity);

    @Override
    Flux<Banner> findAll();

    @Override
    Mono<Banner> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface BannerRepositoryInternal {
    <S extends Banner> Mono<S> save(S entity);

    Flux<Banner> findAllBy(Pageable pageable);

    Flux<Banner> findAll();

    Mono<Banner> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Banner> findAllBy(Pageable pageable, Criteria criteria);

}
