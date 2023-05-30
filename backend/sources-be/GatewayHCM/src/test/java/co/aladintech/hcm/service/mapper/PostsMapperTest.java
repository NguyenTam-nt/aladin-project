package co.aladintech.hcm.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PostsMapperTest {

    private PostsMapper postsMapper;

    @BeforeEach
    public void setUp() {
        postsMapper = new PostsMapperImpl();
    }
}
