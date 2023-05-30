package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.Gallery;
import co.aladintech.hcm.repository.GalleryRepository;
import co.aladintech.hcm.service.GalleryService;
import co.aladintech.hcm.service.dto.GalleryDTO;
import co.aladintech.hcm.service.mapper.GalleryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link Gallery}.
 */
@Service
@Transactional
public class GalleryServiceImpl implements GalleryService {

    private final Logger log = LoggerFactory.getLogger(GalleryServiceImpl.class);

    private final GalleryRepository galleryRepository;

    private final GalleryMapper galleryMapper;

    public GalleryServiceImpl(GalleryRepository galleryRepository, GalleryMapper galleryMapper) {
        this.galleryRepository = galleryRepository;
        this.galleryMapper = galleryMapper;
    }

    @Override
    public Mono<GalleryDTO> save(GalleryDTO galleryDTO) {
        log.debug("Request to save Gallery : {}", galleryDTO);
        return galleryRepository.save(galleryMapper.toEntity(galleryDTO)).map(galleryMapper::toDto);
    }

    @Override
    public Mono<GalleryDTO> update(GalleryDTO galleryDTO) {
        log.debug("Request to update Gallery : {}", galleryDTO);
        return galleryRepository.save(galleryMapper.toEntity(galleryDTO)).map(galleryMapper::toDto);
    }

    @Override
    public Mono<GalleryDTO> partialUpdate(GalleryDTO galleryDTO) {
        log.debug("Request to partially update Gallery : {}", galleryDTO);

        return galleryRepository
            .findById(galleryDTO.getId())
            .map(existingGallery -> {
                galleryMapper.partialUpdate(existingGallery, galleryDTO);

                return existingGallery;
            })
            .flatMap(galleryRepository::save)
            .map(galleryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<GalleryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Galleries");
        return galleryRepository.findAllBy(pageable).map(galleryMapper::toDto);
    }

    public Mono<Long> countAll() {
        return galleryRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<GalleryDTO> findOne(Long id) {
        log.debug("Request to get Gallery : {}", id);
        return galleryRepository.findById(id).map(galleryMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Gallery : {}", id);
        return galleryRepository.deleteById(id);
    }
}
