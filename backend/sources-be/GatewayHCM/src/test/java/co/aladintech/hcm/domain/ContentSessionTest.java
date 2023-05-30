package co.aladintech.hcm.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.aladintech.hcm.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ContentSessionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContentSession.class);
        ContentSession contentSession1 = new ContentSession();
        contentSession1.setId(1L);
        ContentSession contentSession2 = new ContentSession();
        contentSession2.setId(contentSession1.getId());
        assertThat(contentSession1).isEqualTo(contentSession2);
        contentSession2.setId(2L);
        assertThat(contentSession1).isNotEqualTo(contentSession2);
        contentSession1.setId(null);
        assertThat(contentSession1).isNotEqualTo(contentSession2);
    }
}
