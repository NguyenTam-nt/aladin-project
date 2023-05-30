package co.aladintech.hcm.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.aladintech.hcm.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CadresCategoryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CadresCategory.class);
        CadresCategory cadresCategory1 = new CadresCategory();
        cadresCategory1.setId(1L);
        CadresCategory cadresCategory2 = new CadresCategory();
        cadresCategory2.setId(cadresCategory1.getId());
        assertThat(cadresCategory1).isEqualTo(cadresCategory2);
        cadresCategory2.setId(2L);
        assertThat(cadresCategory1).isNotEqualTo(cadresCategory2);
        cadresCategory1.setId(null);
        assertThat(cadresCategory1).isNotEqualTo(cadresCategory2);
    }
}
