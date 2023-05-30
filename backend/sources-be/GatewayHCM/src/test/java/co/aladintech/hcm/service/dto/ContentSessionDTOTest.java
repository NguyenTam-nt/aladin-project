package co.aladintech.hcm.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.aladintech.hcm.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ContentSessionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContentSessionDTO.class);
        ContentSessionDTO contentSessionDTO1 = new ContentSessionDTO();
        contentSessionDTO1.setId(1L);
        ContentSessionDTO contentSessionDTO2 = new ContentSessionDTO();
        assertThat(contentSessionDTO1).isNotEqualTo(contentSessionDTO2);
        contentSessionDTO2.setId(contentSessionDTO1.getId());
        assertThat(contentSessionDTO1).isEqualTo(contentSessionDTO2);
        contentSessionDTO2.setId(2L);
        assertThat(contentSessionDTO1).isNotEqualTo(contentSessionDTO2);
        contentSessionDTO1.setId(null);
        assertThat(contentSessionDTO1).isNotEqualTo(contentSessionDTO2);
    }
}
