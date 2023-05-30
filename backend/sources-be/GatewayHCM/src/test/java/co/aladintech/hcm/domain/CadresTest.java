package co.aladintech.hcm.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.aladintech.hcm.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CadresTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cadres.class);
        Cadres cadres1 = new Cadres();
        cadres1.setId(1L);
        Cadres cadres2 = new Cadres();
        cadres2.setId(cadres1.getId());
        assertThat(cadres1).isEqualTo(cadres2);
        cadres2.setId(2L);
        assertThat(cadres1).isNotEqualTo(cadres2);
        cadres1.setId(null);
        assertThat(cadres1).isNotEqualTo(cadres2);
    }
}
