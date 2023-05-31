package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.Files;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Files entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FilesRepository extends ReactiveCrudRepository<Files, Long>, FilesRepositoryInternal {
    Flux<Files> findAllBy(Pageable pageable);

    @Query("SELECT * FROM files entity WHERE entity.content_session_id = :id")
    Flux<Files> findByContentSession(Long id);

    @Query("SELECT * FROM files entity WHERE entity.content_session_id IS NULL")
    Flux<Files> findAllWhereContentSessionIsNull();

    @Query("SELECT * FROM files entity WHERE entity.news_id = :id")
    Flux<Files> findByNews(Long id);

    @Query("SELECT * FROM files entity WHERE entity.news_id IS NULL")
    Flux<Files> findAllWhereNewsIsNull();

    @Query("SELECT * FROM files entity WHERE entity.cadres_id = :id")
    Flux<Files> findByCadres(Long id);

    @Query("SELECT * FROM files entity WHERE entity.cadres_id IS NULL")
    Flux<Files> findAllWhereCadresIsNull();

    @Query("SELECT * FROM files entity WHERE entity.subject_id = :id")
    Flux<Files> findBySubject(Long id);

    @Query("SELECT * FROM files entity WHERE entity.subject_id IS NULL")
    Flux<Files> findAllWhereSubjectIsNull();

    @Query("SELECT * FROM files entity WHERE entity.gallery_id = :id")
    Flux<Files> findByGallery(Long id);

    @Query("SELECT * FROM files entity WHERE entity.gallery_id IS NULL")
    Flux<Files> findAllWhereGalleryIsNull();

    @Override
    <S extends Files> Mono<S> save(S entity);

    @Override
    Flux<Files> findAll();

    @Override
    Mono<Files> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface FilesRepositoryInternal {
    <S extends Files> Mono<S> save(S entity);

    Flux<Files> findAllBy(Pageable pageable);

    Flux<Files> findAll();

    Mono<Files> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Files> findAllBy(Pageable pageable, Criteria criteria);

}
