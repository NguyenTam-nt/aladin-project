package co.aladintech.hcm.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ContentSessionMapperTest {

    private ContentSessionMapper contentSessionMapper;

    @BeforeEach
    public void setUp() {
        contentSessionMapper = new ContentSessionMapperImpl();
    }
}
