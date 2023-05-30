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
 * A ContentSession.
 */
@Table("content_session")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ContentSession implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @NotNull(message = "must not be null")
    @Column("jhi_type")
    private String type;

    @NotNull(message = "must not be null")
    @Column("category")
    private String category;

    @NotNull(message = "must not be null")
    @Column("category_ko")
    private String categoryKo;

    @NotNull(message = "must not be null")
    @Column("tilte")
    private String tilte;

    @NotNull(message = "must not be null")
    @Column("tilte_ko")
    private String tilteKo;

    @NotNull(message = "must not be null")
    @Column("content")
    private String content;

    @NotNull(message = "must not be null")
    @Column("content_ko")
    private String contentKo;

    @Transient
    @JsonIgnoreProperties(value = { "contentSession", "news", "cadres", "subject", "gallery" }, allowSetters = true)
    private Set<Files> files = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ContentSession id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return this.type;
    }

    public ContentSession type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return this.category;
    }

    public ContentSession category(String category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategoryKo() {
        return this.categoryKo;
    }

    public ContentSession categoryKo(String categoryKo) {
        this.setCategoryKo(categoryKo);
        return this;
    }

    public void setCategoryKo(String categoryKo) {
        this.categoryKo = categoryKo;
    }

    public String getTilte() {
        return this.tilte;
    }

    public ContentSession tilte(String tilte) {
        this.setTilte(tilte);
        return this;
    }

    public void setTilte(String tilte) {
        this.tilte = tilte;
    }

    public String getTilteKo() {
        return this.tilteKo;
    }

    public ContentSession tilteKo(String tilteKo) {
        this.setTilteKo(tilteKo);
        return this;
    }

    public void setTilteKo(String tilteKo) {
        this.tilteKo = tilteKo;
    }

    public String getContent() {
        return this.content;
    }

    public ContentSession content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentKo() {
        return this.contentKo;
    }

    public ContentSession contentKo(String contentKo) {
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
            this.files.forEach(i -> i.setContentSession(null));
        }
        if (files != null) {
            files.forEach(i -> i.setContentSession(this));
        }
        this.files = files;
    }

    public ContentSession files(Set<Files> files) {
        this.setFiles(files);
        return this;
    }

    public ContentSession addFiles(Files files) {
        this.files.add(files);
        files.setContentSession(this);
        return this;
    }

    public ContentSession removeFiles(Files files) {
        this.files.remove(files);
        files.setContentSession(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContentSession)) {
            return false;
        }
        return id != null && id.equals(((ContentSession) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContentSession{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", category='" + getCategory() + "'" +
            ", categoryKo='" + getCategoryKo() + "'" +
            ", tilte='" + getTilte() + "'" +
            ", tilteKo='" + getTilteKo() + "'" +
            ", content='" + getContent() + "'" +
            ", contentKo='" + getContentKo() + "'" +
            "}";
    }
}
