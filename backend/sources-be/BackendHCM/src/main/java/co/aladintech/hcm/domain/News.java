package co.aladintech.hcm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Fetch;

/**
 * A News.
 */
@Entity
@Table(name = "news")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "hcm_news")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class News extends AbstractAuditingEntity<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "title_ko", nullable = false)
    private String titleKo;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "description_ko", nullable = false)
    private String descriptionKo;

    @NotNull
    @Column(name = "content", nullable = false)
    private String content;

    @NotNull
    @Column(name = "content_ko", nullable = false)
    private String contentKo;

    @Column(name = "jhi_view")
    private Long view;

    @OneToMany(cascade=CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @org.springframework.data.annotation.Transient
    private Set<Files> files = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = { "news" }, allowSetters = true)
    private NewsCategory newsCategory;

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

    public String getTitle() {
        return this.title;
    }

    public News title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleKo() {
        return this.titleKo;
    }

    public News titleKo(String titleKo) {
        this.setTitleKo(titleKo);
        return this;
    }

    public void setTitleKo(String titleKo) {
        this.titleKo = titleKo;
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

    public Long getView() {
        return this.view;
    }

    public News view(Long view) {
        this.setView(view);
        return this;
    }

    public void setView(Long view) {
        this.view = view;
    }

    public Set<Files> getFiles() {
        return this.files;
    }


    public NewsCategory getNewsCategory() {
        return this.newsCategory;
    }

    public void setNewsCategory(NewsCategory newsCategory) {
        this.newsCategory = newsCategory;
    }

    public News newsCategory(NewsCategory newsCategory) {
        this.setNewsCategory(newsCategory);
        return this;
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
            ", tilte='" + getTitle() + "'" +
            ", tilteKo='" + getTitleKo() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionKo='" + getDescriptionKo() + "'" +
            ", content='" + getContent() + "'" +
            ", contentKo='" + getContentKo() + "'" +
            ", view=" + getView() +
            "}";
    }
}
