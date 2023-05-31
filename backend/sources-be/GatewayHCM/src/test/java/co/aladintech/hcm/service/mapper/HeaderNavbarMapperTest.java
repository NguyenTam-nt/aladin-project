package co.aladintech.hcm.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class HeaderNavbarMapperTest {

    private HeaderNavbarMapper headerNavbarMapper;

    @BeforeEach
    public void setUp() {
        headerNavbarMapper = new HeaderNavbarMapperImpl();
    }
}
