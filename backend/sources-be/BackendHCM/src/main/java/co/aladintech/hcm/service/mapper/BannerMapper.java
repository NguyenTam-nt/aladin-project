package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.Banner;
import co.aladintech.hcm.service.dto.BannerDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Banner} and its DTO {@link BannerDTO}.
 */
@Mapper(componentModel = "spring")
public interface BannerMapper extends EntityMapper<BannerDTO, Banner> {}
