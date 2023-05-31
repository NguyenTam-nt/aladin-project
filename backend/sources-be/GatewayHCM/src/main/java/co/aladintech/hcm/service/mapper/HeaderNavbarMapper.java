package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.HeaderNavbar;
import co.aladintech.hcm.service.dto.HeaderNavbarDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link HeaderNavbar} and its DTO {@link HeaderNavbarDTO}.
 */
@Mapper(componentModel = "spring")
public interface HeaderNavbarMapper extends EntityMapper<HeaderNavbarDTO, HeaderNavbar> {}
