package co.aladintech.hcm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Subject.
 */
@Entity
@Table(name = "subject")
//@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Subject extends AbstractAuditingEntity<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "name_ko", nullable = false)
    private String nameKo;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "description_ko", nullable = false)
    private String descriptionKo;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "title_ko", nullable = false)
    private String titleKo;

    @NotNull
    @Column(name = "content", nullable = false)
    private String content;

    @NotNull
    @Column(name = "content_ko", nullable = false)
    private String contentKo;

    @OneToMany(cascade=CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "contentSession", "news", "cadres", "subject", "gallery" }, allowSetters = true)
    private Set<Files> files = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Subject id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Subject name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameKo() {
        return this.nameKo;
    }

    public Subject nameKo(String nameKo) {
        this.setNameKo(nameKo);
        return this;
    }

    public void setNameKo(String nameKo) {
        this.nameKo = nameKo;
    }

    public String getDescription() {
        return this.description;
    }

    public Subject description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescriptionKo() {
        return this.descriptionKo;
    }

    public Subject descriptionKo(String descriptionKo) {
        this.setDescriptionKo(descriptionKo);
        return this;
    }

    public void setDescriptionKo(String descriptionKo) {
        this.descriptionKo = descriptionKo;
    }

    public String getTitle() {
        return this.title;
    }

    public Subject title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleKo() {
        return this.titleKo;
    }

    public Subject titleKo(String titleKo) {
        this.setTitleKo(titleKo);
        return this;
    }

    public void setTitleKo(String titleKo) {
        this.titleKo = titleKo;
    }

    public String getContent() {
        return this.content;
    }

    public Subject content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentKo() {
        return this.contentKo;
    }

    public Subject contentKo(String contentKo) {
        this.setContentKo(contentKo);
        return this;
    }

    public void setContentKo(String contentKo) {
        this.contentKo = contentKo;
    }

    public Set<Files> getFiles() {
        return this.files;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Subject)) {
            return false;
        }
        return id != null && id.equals(((Subject) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Subject{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nameKo='" + getNameKo() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionKo='" + getDescriptionKo() + "'" +
            ", title='" + getTitle() + "'" +
            ", titleKo='" + getTitleKo() + "'" +
            ", content='" + getContent() + "'" +
            ", contentKo='" + getContentKo() + "'" +
            "}";
    }
}
