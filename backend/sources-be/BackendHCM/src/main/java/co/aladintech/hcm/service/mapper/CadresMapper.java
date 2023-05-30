package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.Cadres;
import co.aladintech.hcm.domain.CadresCategory;
import co.aladintech.hcm.service.dto.CadresCategoryDTO;
import co.aladintech.hcm.service.dto.CadresDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Cadres} and its DTO {@link CadresDTO}.
 */
@Mapper(componentModel = "spring")
public interface CadresMapper extends EntityMapper<CadresDTO, Cadres> {
    @Mapping(target = "cadresCategory", source = "cadresCategory", qualifiedByName = "cadresCategoryId")
    CadresDTO toDto(Cadres s);

    @Named("cadresCategoryId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CadresCategoryDTO toDtoCadresCategoryId(CadresCategory cadresCategory);
}
