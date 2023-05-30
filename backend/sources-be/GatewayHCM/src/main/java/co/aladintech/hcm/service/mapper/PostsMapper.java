package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.Posts;
import co.aladintech.hcm.service.dto.PostsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Posts} and its DTO {@link PostsDTO}.
 */
@Mapper(componentModel = "spring")
public interface PostsMapper extends EntityMapper<PostsDTO, Posts> {}
