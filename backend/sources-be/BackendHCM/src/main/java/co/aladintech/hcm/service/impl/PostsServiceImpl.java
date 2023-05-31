package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.Posts;
import co.aladintech.hcm.repository.PostsRepository;
import co.aladintech.hcm.service.PostsService;
import co.aladintech.hcm.service.dto.BannerDTO;
import co.aladintech.hcm.service.dto.PostsDTO;
import co.aladintech.hcm.service.mapper.PostsMapper;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public PostsDTO save(PostsDTO postsDTO) {
        log.debug("Request to save Posts : {}", postsDTO);
        Posts posts = postsMapper.toEntity(postsDTO);
        posts = postsRepository.save(posts);
        return postsMapper.toDto(posts);
    }

    @Override
    public PostsDTO update(PostsDTO postsDTO) {
        log.debug("Request to update Posts : {}", postsDTO);
        Posts posts = postsMapper.toEntity(postsDTO);
        posts = postsRepository.save(posts);
        return postsMapper.toDto(posts);
    }

    @Override
    public Optional<PostsDTO> partialUpdate(PostsDTO postsDTO) {
        log.debug("Request to partially update Posts : {}", postsDTO);

        return postsRepository
            .findById(postsDTO.getId())
            .map(existingPosts -> {
                postsMapper.partialUpdate(existingPosts, postsDTO);

                return existingPosts;
            })
            .map(postsRepository::save)
            .map(postsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PostsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Posts");
        return postsRepository.findAll(pageable).map(postsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PostsDTO> findOne(Long id) {
        log.debug("Request to get Posts : {}", id);
        return postsRepository.findById(id).map(postsMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Posts : {}", id);
        postsRepository.deleteById(id);
    }

    @Override
    public void deleteAll(List<Long> ids) {
        log.debug("Request to delete Posts : {}", ids);
        postsRepository.deleteAllById(ids);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PostsDTO> findAllByType(String type, Pageable pageable) {
        log.debug("Request to get all Banners");
        return postsRepository.findAllByType(type, pageable).map(postsMapper::toDto);
    }
}
