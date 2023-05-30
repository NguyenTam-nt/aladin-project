package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.NewsCategory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the NewsCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NewsCategoryRepository extends ReactiveCrudRepository<NewsCategory, Long>, NewsCategoryRepositoryInternal {
    Flux<NewsCategory> findAllBy(Pageable pageable);

    @Override
    <S extends NewsCategory> Mono<S> save(S entity);

    @Override
    Flux<NewsCategory> findAll();

    @Override
    Mono<NewsCategory> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface NewsCategoryRepositoryInternal {
    <S extends NewsCategory> Mono<S> save(S entity);

    Flux<NewsCategory> findAllBy(Pageable pageable);

    Flux<NewsCategory> findAll();

    Mono<NewsCategory> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<NewsCategory> findAllBy(Pageable pageable, Criteria criteria);

}
