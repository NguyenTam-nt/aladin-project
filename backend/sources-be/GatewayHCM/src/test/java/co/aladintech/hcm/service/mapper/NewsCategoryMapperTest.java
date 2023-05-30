package co.aladintech.hcm.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class NewsCategoryMapperTest {

    private NewsCategoryMapper newsCategoryMapper;

    @BeforeEach
    public void setUp() {
        newsCategoryMapper = new NewsCategoryMapperImpl();
    }
}
