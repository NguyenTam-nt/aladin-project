package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.NewsCategory;
import co.aladintech.hcm.service.dto.NewsCategoryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link NewsCategory} and its DTO {@link NewsCategoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface NewsCategoryMapper extends EntityMapper<NewsCategoryDTO, NewsCategory> {}
