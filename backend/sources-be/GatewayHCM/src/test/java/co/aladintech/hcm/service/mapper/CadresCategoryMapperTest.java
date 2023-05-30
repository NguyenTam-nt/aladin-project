package co.aladintech.hcm.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CadresCategoryMapperTest {

    private CadresCategoryMapper cadresCategoryMapper;

    @BeforeEach
    public void setUp() {
        cadresCategoryMapper = new CadresCategoryMapperImpl();
    }
}
