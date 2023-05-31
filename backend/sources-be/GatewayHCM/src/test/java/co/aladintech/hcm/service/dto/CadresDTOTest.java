package co.aladintech.hcm.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.aladintech.hcm.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CadresDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CadresDTO.class);
        CadresDTO cadresDTO1 = new CadresDTO();
        cadresDTO1.setId(1L);
        CadresDTO cadresDTO2 = new CadresDTO();
        assertThat(cadresDTO1).isNotEqualTo(cadresDTO2);
        cadresDTO2.setId(cadresDTO1.getId());
        assertThat(cadresDTO1).isEqualTo(cadresDTO2);
        cadresDTO2.setId(2L);
        assertThat(cadresDTO1).isNotEqualTo(cadresDTO2);
        cadresDTO1.setId(null);
        assertThat(cadresDTO1).isNotEqualTo(cadresDTO2);
    }
}
