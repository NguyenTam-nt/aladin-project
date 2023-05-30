package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.Posts;
import co.aladintech.hcm.repository.PostsRepository;
import co.aladintech.hcm.service.PostsService;
import co.aladintech.hcm.service.dto.PostsDTO;
import co.aladintech.hcm.service.mapper.PostsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link Posts}.
 */
@Service
@Transactional
public class PostsServiceImpl implements PostsService {

    private final Logger log = LoggerFactory.getLogger(PostsServiceImpl.class);

    private final PostsRepository postsRepository;

    private final PostsMapper postsMapper;

    public PostsServiceImpl(PostsRepository postsRepository, PostsMapper postsMapper) {
        this.postsRepository = postsRepository;
        this.postsMapper = postsMapper;
    }

    @Override
    public Mono<PostsDTO> save(PostsDTO postsDTO) {
        log.debug("Request to save Posts : {}", postsDTO);
        return postsRepository.save(postsMapper.toEntity(postsDTO)).map(postsMapper::toDto);
    }

    @Override
    public Mono<PostsDTO> update(PostsDTO postsDTO) {
        log.debug("Request to update Posts : {}", postsDTO);
        return postsRepository.save(postsMapper.toEntity(postsDTO)).map(postsMapper::toDto);
    }

    @Override
    public Mono<PostsDTO> partialUpdate(PostsDTO postsDTO) {
        log.debug("Request to partially update Posts : {}", postsDTO);

        return postsRepository
            .findById(postsDTO.getId())
            .map(existingPosts -> {
                postsMapper.partialUpdate(existingPosts, postsDTO);

                return existingPosts;
            })
            .flatMap(postsRepository::save)
            .map(postsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<PostsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Posts");
        return postsRepository.findAllBy(pageable).map(postsMapper::toDto);
    }

    public Mono<Long> countAll() {
        return postsRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<PostsDTO> findOne(Long id) {
        log.debug("Request to get Posts : {}", id);
        return postsRepository.findById(id).map(postsMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Posts : {}", id);
        return postsRepository.deleteById(id);
    }
}
