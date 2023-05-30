package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.CadresCategory;
import co.aladintech.hcm.service.dto.CadresCategoryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CadresCategory} and its DTO {@link CadresCategoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface CadresCategoryMapper extends EntityMapper<CadresCategoryDTO, CadresCategory> {}
