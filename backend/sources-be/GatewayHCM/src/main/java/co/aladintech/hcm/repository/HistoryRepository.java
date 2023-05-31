package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.History;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the History entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistoryRepository extends ReactiveCrudRepository<History, Long>, HistoryRepositoryInternal {
    Flux<History> findAllBy(Pageable pageable);

    @Override
    <S extends History> Mono<S> save(S entity);

    @Override
    Flux<History> findAll();

    @Override
    Mono<History> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface HistoryRepositoryInternal {
    <S extends History> Mono<S> save(S entity);

    Flux<History> findAllBy(Pageable pageable);

    Flux<History> findAll();

    Mono<History> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<History> findAllBy(Pageable pageable, Criteria criteria);

}
