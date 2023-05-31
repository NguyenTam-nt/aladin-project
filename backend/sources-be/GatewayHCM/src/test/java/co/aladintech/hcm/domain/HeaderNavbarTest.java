package co.aladintech.hcm.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.aladintech.hcm.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class HeaderNavbarTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HeaderNavbar.class);
        HeaderNavbar headerNavbar1 = new HeaderNavbar();
        headerNavbar1.setId(1L);
        HeaderNavbar headerNavbar2 = new HeaderNavbar();
        headerNavbar2.setId(headerNavbar1.getId());
        assertThat(headerNavbar1).isEqualTo(headerNavbar2);
        headerNavbar2.setId(2L);
        assertThat(headerNavbar1).isNotEqualTo(headerNavbar2);
        headerNavbar1.setId(null);
        assertThat(headerNavbar1).isNotEqualTo(headerNavbar2);
    }
}
