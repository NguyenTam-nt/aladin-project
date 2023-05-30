package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.News;
import co.aladintech.hcm.domain.NewsCategory;
import co.aladintech.hcm.service.dto.NewsCategoryDTO;
import co.aladintech.hcm.service.dto.NewsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link News} and its DTO {@link NewsDTO}.
 */
@Mapper(componentModel = "spring")
public interface NewsMapper extends EntityMapper<NewsDTO, News> {
    @Mapping(target = "newsCategory", source = "newsCategory", qualifiedByName = "newsCategoryId")
    NewsDTO toDto(News s);

    @Named("newsCategoryId")
    NewsCategoryDTO toDtoNewsCategory(NewsCategory newsCategory);
}
