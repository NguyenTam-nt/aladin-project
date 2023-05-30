package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.Cadres;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Cadres entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CadresRepository extends ReactiveCrudRepository<Cadres, Long>, CadresRepositoryInternal {
    Flux<Cadres> findAllBy(Pageable pageable);

    @Override
    <S extends Cadres> Mono<S> save(S entity);

    @Override
    Flux<Cadres> findAll();

    @Override
    Mono<Cadres> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface CadresRepositoryInternal {
    <S extends Cadres> Mono<S> save(S entity);

    Flux<Cadres> findAllBy(Pageable pageable);

    Flux<Cadres> findAll();

    Mono<Cadres> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Cadres> findAllBy(Pageable pageable, Criteria criteria);

}
