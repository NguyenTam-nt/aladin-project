package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.Banner;
import co.aladintech.hcm.repository.BannerRepository;
import co.aladintech.hcm.service.BannerService;
import co.aladintech.hcm.service.dto.BannerDTO;
import co.aladintech.hcm.service.mapper.BannerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link Banner}.
 */
@Service
@Transactional
public class BannerServiceImpl implements BannerService {

    private final Logger log = LoggerFactory.getLogger(BannerServiceImpl.class);

    private final BannerRepository bannerRepository;

    private final BannerMapper bannerMapper;

    public BannerServiceImpl(BannerRepository bannerRepository, BannerMapper bannerMapper) {
        this.bannerRepository = bannerRepository;
        this.bannerMapper = bannerMapper;
    }

    @Override
    public Mono<BannerDTO> save(BannerDTO bannerDTO) {
        log.debug("Request to save Banner : {}", bannerDTO);
        return bannerRepository.save(bannerMapper.toEntity(bannerDTO)).map(bannerMapper::toDto);
    }

    @Override
    public Mono<BannerDTO> update(BannerDTO bannerDTO) {
        log.debug("Request to update Banner : {}", bannerDTO);
        return bannerRepository.save(bannerMapper.toEntity(bannerDTO)).map(bannerMapper::toDto);
    }

    @Override
    public Mono<BannerDTO> partialUpdate(BannerDTO bannerDTO) {
        log.debug("Request to partially update Banner : {}", bannerDTO);

        return bannerRepository
            .findById(bannerDTO.getId())
            .map(existingBanner -> {
                bannerMapper.partialUpdate(existingBanner, bannerDTO);

                return existingBanner;
            })
            .flatMap(bannerRepository::save)
            .map(bannerMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<BannerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Banners");
        return bannerRepository.findAllBy(pageable).map(bannerMapper::toDto);
    }

    public Mono<Long> countAll() {
        return bannerRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<BannerDTO> findOne(Long id) {
        log.debug("Request to get Banner : {}", id);
        return bannerRepository.findById(id).map(bannerMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Banner : {}", id);
        return bannerRepository.deleteById(id);
    }
}
