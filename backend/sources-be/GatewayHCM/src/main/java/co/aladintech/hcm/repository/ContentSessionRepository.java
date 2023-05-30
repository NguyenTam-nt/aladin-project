package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.ContentSession;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the ContentSession entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContentSessionRepository extends ReactiveCrudRepository<ContentSession, Long>, ContentSessionRepositoryInternal {
    Flux<ContentSession> findAllBy(Pageable pageable);

    @Override
    <S extends ContentSession> Mono<S> save(S entity);

    @Override
    Flux<ContentSession> findAll();

    @Override
    Mono<ContentSession> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface ContentSessionRepositoryInternal {
    <S extends ContentSession> Mono<S> save(S entity);

    Flux<ContentSession> findAllBy(Pageable pageable);

    Flux<ContentSession> findAll();

    Mono<ContentSession> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<ContentSession> findAllBy(Pageable pageable, Criteria criteria);

}
