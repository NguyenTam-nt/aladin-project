package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.CadresCategory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the CadresCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CadresCategoryRepository extends ReactiveCrudRepository<CadresCategory, Long>, CadresCategoryRepositoryInternal {
    Flux<CadresCategory> findAllBy(Pageable pageable);

    @Query("SELECT * FROM cadres_category entity WHERE entity.cadres_id = :id")
    Flux<CadresCategory> findByCadres(Long id);

    @Query("SELECT * FROM cadres_category entity WHERE entity.cadres_id IS NULL")
    Flux<CadresCategory> findAllWhereCadresIsNull();

    @Override
    <S extends CadresCategory> Mono<S> save(S entity);

    @Override
    Flux<CadresCategory> findAll();

    @Override
    Mono<CadresCategory> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface CadresCategoryRepositoryInternal {
    <S extends CadresCategory> Mono<S> save(S entity);

    Flux<CadresCategory> findAllBy(Pageable pageable);

    Flux<CadresCategory> findAll();

    Mono<CadresCategory> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<CadresCategory> findAllBy(Pageable pageable, Criteria criteria);

}
