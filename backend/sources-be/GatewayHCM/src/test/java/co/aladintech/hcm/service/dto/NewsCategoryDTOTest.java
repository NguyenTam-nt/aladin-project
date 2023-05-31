package co.aladintech.hcm.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.aladintech.hcm.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NewsCategoryDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(NewsCategoryDTO.class);
        NewsCategoryDTO newsCategoryDTO1 = new NewsCategoryDTO();
        newsCategoryDTO1.setId(1L);
        NewsCategoryDTO newsCategoryDTO2 = new NewsCategoryDTO();
        assertThat(newsCategoryDTO1).isNotEqualTo(newsCategoryDTO2);
        newsCategoryDTO2.setId(newsCategoryDTO1.getId());
        assertThat(newsCategoryDTO1).isEqualTo(newsCategoryDTO2);
        newsCategoryDTO2.setId(2L);
        assertThat(newsCategoryDTO1).isNotEqualTo(newsCategoryDTO2);
        newsCategoryDTO1.setId(null);
        assertThat(newsCategoryDTO1).isNotEqualTo(newsCategoryDTO2);
    }
}
