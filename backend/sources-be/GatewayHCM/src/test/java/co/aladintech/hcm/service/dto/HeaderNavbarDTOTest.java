package co.aladintech.hcm.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.aladintech.hcm.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class HeaderNavbarDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(HeaderNavbarDTO.class);
        HeaderNavbarDTO headerNavbarDTO1 = new HeaderNavbarDTO();
        headerNavbarDTO1.setId(1L);
        HeaderNavbarDTO headerNavbarDTO2 = new HeaderNavbarDTO();
        assertThat(headerNavbarDTO1).isNotEqualTo(headerNavbarDTO2);
        headerNavbarDTO2.setId(headerNavbarDTO1.getId());
        assertThat(headerNavbarDTO1).isEqualTo(headerNavbarDTO2);
        headerNavbarDTO2.setId(2L);
        assertThat(headerNavbarDTO1).isNotEqualTo(headerNavbarDTO2);
        headerNavbarDTO1.setId(null);
        assertThat(headerNavbarDTO1).isNotEqualTo(headerNavbarDTO2);
    }
}
