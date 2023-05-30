package co.aladintech.hcm.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CadresMapperTest {

    private CadresMapper cadresMapper;

    @BeforeEach
    public void setUp() {
        cadresMapper = new CadresMapperImpl();
    }
}
