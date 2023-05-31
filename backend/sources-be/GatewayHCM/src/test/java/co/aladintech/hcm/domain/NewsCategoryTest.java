package co.aladintech.hcm.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.aladintech.hcm.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NewsCategoryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NewsCategory.class);
        NewsCategory newsCategory1 = new NewsCategory();
        newsCategory1.setId(1L);
        NewsCategory newsCategory2 = new NewsCategory();
        newsCategory2.setId(newsCategory1.getId());
        assertThat(newsCategory1).isEqualTo(newsCategory2);
        newsCategory2.setId(2L);
        assertThat(newsCategory1).isNotEqualTo(newsCategory2);
        newsCategory1.setId(null);
        assertThat(newsCategory1).isNotEqualTo(newsCategory2);
    }
}
