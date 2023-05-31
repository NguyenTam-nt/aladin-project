package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.Cadres;
import co.aladintech.hcm.domain.CadresCategory;
import co.aladintech.hcm.service.dto.CadresCategoryDTO;
import co.aladintech.hcm.service.dto.CadresDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CadresCategory} and its DTO {@link CadresCategoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface CadresCategoryMapper extends EntityMapper<CadresCategoryDTO, CadresCategory> {
    @Mapping(target = "cadres", source = "cadres", qualifiedByName = "cadresId")
    CadresCategoryDTO toDto(CadresCategory s);

    @Named("cadresId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CadresDTO toDtoCadresId(Cadres cadres);
}
