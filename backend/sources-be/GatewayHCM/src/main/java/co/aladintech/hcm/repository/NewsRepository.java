package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.News;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the News entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NewsRepository extends ReactiveCrudRepository<News, Long>, NewsRepositoryInternal {
    Flux<News> findAllBy(Pageable pageable);

    @Query("SELECT * FROM news entity WHERE entity.news_category_id = :id")
    Flux<News> findByNewsCategory(Long id);

    @Query("SELECT * FROM news entity WHERE entity.news_category_id IS NULL")
    Flux<News> findAllWhereNewsCategoryIsNull();

    @Override
    <S extends News> Mono<S> save(S entity);

    @Override
    Flux<News> findAll();

    @Override
    Mono<News> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface NewsRepositoryInternal {
    <S extends News> Mono<S> save(S entity);

    Flux<News> findAllBy(Pageable pageable);

    Flux<News> findAll();

    Mono<News> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<News> findAllBy(Pageable pageable, Criteria criteria);

}
