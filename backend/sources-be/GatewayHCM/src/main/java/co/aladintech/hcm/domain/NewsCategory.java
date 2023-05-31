package co.aladintech.hcm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A NewsCategory.
 */
@Table("news_category")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NewsCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @Column("name")
    private String name;

    @Column("name_ko")
    private String nameKo;

    @Transient
    @JsonIgnoreProperties(value = { "files", "newsCategory" }, allowSetters = true)
    private Set<News> news = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public NewsCategory id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public NewsCategory name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameKo() {
        return this.nameKo;
    }

    public NewsCategory nameKo(String nameKo) {
        this.setNameKo(nameKo);
        return this;
    }

    public void setNameKo(String nameKo) {
        this.nameKo = nameKo;
    }

    public Set<News> getNews() {
        return this.news;
    }

    public void setNews(Set<News> news) {
        if (this.news != null) {
            this.news.forEach(i -> i.setNewsCategory(null));
        }
        if (news != null) {
            news.forEach(i -> i.setNewsCategory(this));
        }
        this.news = news;
    }

    public NewsCategory news(Set<News> news) {
        this.setNews(news);
        return this;
    }

    public NewsCategory addNews(News news) {
        this.news.add(news);
        news.setNewsCategory(this);
        return this;
    }

    public NewsCategory removeNews(News news) {
        this.news.remove(news);
        news.setNewsCategory(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NewsCategory)) {
            return false;
        }
        return id != null && id.equals(((NewsCategory) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NewsCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nameKo='" + getNameKo() + "'" +
            "}";
    }
}
