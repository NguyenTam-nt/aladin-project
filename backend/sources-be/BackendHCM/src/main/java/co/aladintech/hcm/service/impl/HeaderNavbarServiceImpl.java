package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.HeaderNavbar;
import co.aladintech.hcm.repository.HeaderNavbarRepository;
import co.aladintech.hcm.service.HeaderNavbarService;
import co.aladintech.hcm.service.dto.HeaderNavbarDTO;
import co.aladintech.hcm.service.mapper.HeaderNavbarMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link HeaderNavbar}.
 */
@Service
@Transactional
public class HeaderNavbarServiceImpl implements HeaderNavbarService {

    private final Logger log = LoggerFactory.getLogger(HeaderNavbarServiceImpl.class);

    private final HeaderNavbarRepository headerNavbarRepository;

    private final HeaderNavbarMapper headerNavbarMapper;

    public HeaderNavbarServiceImpl(HeaderNavbarRepository headerNavbarRepository, HeaderNavbarMapper headerNavbarMapper) {
        this.headerNavbarRepository = headerNavbarRepository;
        this.headerNavbarMapper = headerNavbarMapper;
    }

    @Override
    public HeaderNavbarDTO save(HeaderNavbarDTO headerNavbarDTO) {
        log.debug("Request to save HeaderNavbar : {}", headerNavbarDTO);
        HeaderNavbar headerNavbar = headerNavbarMapper.toEntity(headerNavbarDTO);
        headerNavbar = headerNavbarRepository.save(headerNavbar);
        return headerNavbarMapper.toDto(headerNavbar);
    }

    @Override
    public HeaderNavbarDTO update(HeaderNavbarDTO headerNavbarDTO) {
        log.debug("Request to update HeaderNavbar : {}", headerNavbarDTO);
        HeaderNavbar headerNavbar = headerNavbarMapper.toEntity(headerNavbarDTO);
        headerNavbar = headerNavbarRepository.save(headerNavbar);
        return headerNavbarMapper.toDto(headerNavbar);
    }

    @Override
    public Optional<HeaderNavbarDTO> partialUpdate(HeaderNavbarDTO headerNavbarDTO) {
        log.debug("Request to partially update HeaderNavbar : {}", headerNavbarDTO);

        return headerNavbarRepository
            .findById(headerNavbarDTO.getId())
            .map(existingHeaderNavbar -> {
                headerNavbarMapper.partialUpdate(existingHeaderNavbar, headerNavbarDTO);

                return existingHeaderNavbar;
            })
            .map(headerNavbarRepository::save)
            .map(headerNavbarMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<HeaderNavbarDTO> findAll(Pageable pageable) {
        log.debug("Request to get all HeaderNavbars");
        return headerNavbarRepository.findAll(pageable).map(headerNavbarMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<HeaderNavbarDTO> findOne(Long id) {
        log.debug("Request to get HeaderNavbar : {}", id);
        return headerNavbarRepository.findById(id).map(headerNavbarMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete HeaderNavbar : {}", id);
        headerNavbarRepository.deleteById(id);
    }
}
