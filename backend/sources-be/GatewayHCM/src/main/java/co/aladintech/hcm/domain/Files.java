package co.aladintech.hcm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A Files.
 */
@Table("files")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Files implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @NotNull(message = "must not be null")
    @Column("object_id")
    private Long objectId;

    @Column("jhi_type")
    private String type;

    @NotNull(message = "must not be null")
    @Column("jhi_link")
    private String link;

    @Column("name")
    private String name;

    @Transient
    @JsonIgnoreProperties(value = { "files" }, allowSetters = true)
    private ContentSession contentSession;

    @Transient
    @JsonIgnoreProperties(value = { "files", "newsCategory" }, allowSetters = true)
    private News news;

    @Transient
    @JsonIgnoreProperties(value = { "files", "cadresCategories" }, allowSetters = true)
    private Cadres cadres;

    @Transient
    @JsonIgnoreProperties(value = { "files" }, allowSetters = true)
    private Subject subject;

    @Transient
    @JsonIgnoreProperties(value = { "files" }, allowSetters = true)
    private Gallery gallery;

    @Column("content_session_id")
    private Long contentSessionId;

    @Column("news_id")
    private Long newsId;

    @Column("cadres_id")
    private Long cadresId;

    @Column("subject_id")
    private Long subjectId;

    @Column("gallery_id")
    private Long galleryId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Files id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getObjectId() {
        return this.objectId;
    }

    public Files objectId(Long objectId) {
        this.setObjectId(objectId);
        return this;
    }

    public void setObjectId(Long objectId) {
        this.objectId = objectId;
    }

    public String getType() {
        return this.type;
    }

    public Files type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLink() {
        return this.link;
    }

    public Files link(String link) {
        this.setLink(link);
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getName() {
        return this.name;
    }

    public Files name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ContentSession getContentSession() {
        return this.contentSession;
    }

    public void setContentSession(ContentSession contentSession) {
        this.contentSession = contentSession;
        this.contentSessionId = contentSession != null ? contentSession.getId() : null;
    }

    public Files contentSession(ContentSession contentSession) {
        this.setContentSession(contentSession);
        return this;
    }

    public News getNews() {
        return this.news;
    }

    public void setNews(News news) {
        this.news = news;
        this.newsId = news != null ? news.getId() : null;
    }

    public Files news(News news) {
        this.setNews(news);
        return this;
    }

    public Cadres getCadres() {
        return this.cadres;
    }

    public void setCadres(Cadres cadres) {
        this.cadres = cadres;
        this.cadresId = cadres != null ? cadres.getId() : null;
    }

    public Files cadres(Cadres cadres) {
        this.setCadres(cadres);
        return this;
    }

    public Subject getSubject() {
        return this.subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
        this.subjectId = subject != null ? subject.getId() : null;
    }

    public Files subject(Subject subject) {
        this.setSubject(subject);
        return this;
    }

    public Gallery getGallery() {
        return this.gallery;
    }

    public void setGallery(Gallery gallery) {
        this.gallery = gallery;
        this.galleryId = gallery != null ? gallery.getId() : null;
    }

    public Files gallery(Gallery gallery) {
        this.setGallery(gallery);
        return this;
    }

    public Long getContentSessionId() {
        return this.contentSessionId;
    }

    public void setContentSessionId(Long contentSession) {
        this.contentSessionId = contentSession;
    }

    public Long getNewsId() {
        return this.newsId;
    }

    public void setNewsId(Long news) {
        this.newsId = news;
    }

    public Long getCadresId() {
        return this.cadresId;
    }

    public void setCadresId(Long cadres) {
        this.cadresId = cadres;
    }

    public Long getSubjectId() {
        return this.subjectId;
    }

    public void setSubjectId(Long subject) {
        this.subjectId = subject;
    }

    public Long getGalleryId() {
        return this.galleryId;
    }

    public void setGalleryId(Long gallery) {
        this.galleryId = gallery;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Files)) {
            return false;
        }
        return id != null && id.equals(((Files) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Files{" +
            "id=" + getId() +
            ", objectId=" + getObjectId() +
            ", type='" + getType() + "'" +
            ", link='" + getLink() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
