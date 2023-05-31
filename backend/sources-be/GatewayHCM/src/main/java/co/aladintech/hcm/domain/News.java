package co.aladintech.hcm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A News.
 */
@Table("news")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class News implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @NotNull(message = "must not be null")
    @Column("tilte")
    private String tilte;

    @NotNull(message = "must not be null")
    @Column("tilte_ko")
    private String tilteKo;

    @NotNull(message = "must not be null")
    @Column("description")
    private String description;

    @NotNull(message = "must not be null")
    @Column("description_ko")
    private String descriptionKo;

    @NotNull(message = "must not be null")
    @Column("content")
    private String content;

    @NotNull(message = "must not be null")
    @Column("content_ko")
    private String contentKo;

    @Transient
    @JsonIgnoreProperties(value = { "contentSession", "news", "cadres", "subject", "gallery" }, allowSetters = true)
    private Set<Files> files = new HashSet<>();

    @Transient
    @JsonIgnoreProperties(value = { "news" }, allowSetters = true)
    private NewsCategory newsCategory;

    @Column("news_category_id")
    private Long newsCategoryId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public News id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTilte() {
        return this.tilte;
    }

    public News tilte(String tilte) {
        this.setTilte(tilte);
        return this;
    }

    public void setTilte(String tilte) {
        this.tilte = tilte;
    }

    public String getTilteKo() {
        return this.tilteKo;
    }

    public News tilteKo(String tilteKo) {
        this.setTilteKo(tilteKo);
        return this;
    }

    public void setTilteKo(String tilteKo) {
        this.tilteKo = tilteKo;
    }

    public String getDescription() {
        return this.description;
    }

    public News description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescriptionKo() {
        return this.descriptionKo;
    }

    public News descriptionKo(String descriptionKo) {
        this.setDescriptionKo(descriptionKo);
        return this;
    }

    public void setDescriptionKo(String descriptionKo) {
        this.descriptionKo = descriptionKo;
    }

    public String getContent() {
        return this.content;
    }

    public News content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentKo() {
        return this.contentKo;
    }

    public News contentKo(String contentKo) {
        this.setContentKo(contentKo);
        return this;
    }

    public void setContentKo(String contentKo) {
        this.contentKo = contentKo;
    }

    public Set<Files> getFiles() {
        return this.files;
    }

    public void setFiles(Set<Files> files) {
        if (this.files != null) {
            this.files.forEach(i -> i.setNews(null));
        }
        if (files != null) {
            files.forEach(i -> i.setNews(this));
        }
        this.files = files;
    }

    public News files(Set<Files> files) {
        this.setFiles(files);
        return this;
    }

    public News addFiles(Files files) {
        this.files.add(files);
        files.setNews(this);
        return this;
    }

    public News removeFiles(Files files) {
        this.files.remove(files);
        files.setNews(null);
        return this;
    }

    public NewsCategory getNewsCategory() {
        return this.newsCategory;
    }

    public void setNewsCategory(NewsCategory newsCategory) {
        this.newsCategory = newsCategory;
        this.newsCategoryId = newsCategory != null ? newsCategory.getId() : null;
    }

    public News newsCategory(NewsCategory newsCategory) {
        this.setNewsCategory(newsCategory);
        return this;
    }

    public Long getNewsCategoryId() {
        return this.newsCategoryId;
    }

    public void setNewsCategoryId(Long newsCategory) {
        this.newsCategoryId = newsCategory;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof News)) {
            return false;
        }
        return id != null && id.equals(((News) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "News{" +
            "id=" + getId() +
            ", tilte='" + getTilte() + "'" +
            ", tilteKo='" + getTilteKo() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionKo='" + getDescriptionKo() + "'" +
            ", content='" + getContent() + "'" +
            ", contentKo='" + getContentKo() + "'" +
            "}";
    }
}
