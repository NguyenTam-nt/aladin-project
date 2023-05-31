package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.Posts;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Posts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostsRepository extends ReactiveCrudRepository<Posts, Long>, PostsRepositoryInternal {
    Flux<Posts> findAllBy(Pageable pageable);

    @Override
    <S extends Posts> Mono<S> save(S entity);

    @Override
    Flux<Posts> findAll();

    @Override
    Mono<Posts> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface PostsRepositoryInternal {
    <S extends Posts> Mono<S> save(S entity);

    Flux<Posts> findAllBy(Pageable pageable);

    Flux<Posts> findAll();

    Mono<Posts> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Posts> findAllBy(Pageable pageable, Criteria criteria);

}
