package co.aladintech.hcm.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.aladintech.hcm.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CadresCategoryDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CadresCategoryDTO.class);
        CadresCategoryDTO cadresCategoryDTO1 = new CadresCategoryDTO();
        cadresCategoryDTO1.setId(1L);
        CadresCategoryDTO cadresCategoryDTO2 = new CadresCategoryDTO();
        assertThat(cadresCategoryDTO1).isNotEqualTo(cadresCategoryDTO2);
        cadresCategoryDTO2.setId(cadresCategoryDTO1.getId());
        assertThat(cadresCategoryDTO1).isEqualTo(cadresCategoryDTO2);
        cadresCategoryDTO2.setId(2L);
        assertThat(cadresCategoryDTO1).isNotEqualTo(cadresCategoryDTO2);
        cadresCategoryDTO1.setId(null);
        assertThat(cadresCategoryDTO1).isNotEqualTo(cadresCategoryDTO2);
    }
}
