package co.aladintech.hcm.domain;

import java.io.Serializable;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A Posts.
 */
@Table("posts")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Posts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @NotNull(message = "must not be null")
    @Column("title")
    private String title;

    @NotNull(message = "must not be null")
    @Column("title_ko")
    private String titleKo;

    @NotNull(message = "must not be null")
    @Column("description")
    private String description;

    @NotNull(message = "must not be null")
    @Column("description_ko")
    private String descriptionKo;

    @NotNull(message = "must not be null")
    @Column("image")
    private String image;

    @NotNull(message = "must not be null")
    @Column("jhi_link")
    private String link;

    @Column("outstanding")
    private Boolean outstanding;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Posts id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Posts title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleKo() {
        return this.titleKo;
    }

    public Posts titleKo(String titleKo) {
        this.setTitleKo(titleKo);
        return this;
    }

    public void setTitleKo(String titleKo) {
        this.titleKo = titleKo;
    }

    public String getDescription() {
        return this.description;
    }

    public Posts description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescriptionKo() {
        return this.descriptionKo;
    }

    public Posts descriptionKo(String descriptionKo) {
        this.setDescriptionKo(descriptionKo);
        return this;
    }

    public void setDescriptionKo(String descriptionKo) {
        this.descriptionKo = descriptionKo;
    }

    public String getImage() {
        return this.image;
    }

    public Posts image(String image) {
        this.setImage(image);
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLink() {
        return this.link;
    }

    public Posts link(String link) {
        this.setLink(link);
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Boolean getOutstanding() {
        return this.outstanding;
    }

    public Posts outstanding(Boolean outstanding) {
        this.setOutstanding(outstanding);
        return this;
    }

    public void setOutstanding(Boolean outstanding) {
        this.outstanding = outstanding;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Posts)) {
            return false;
        }
        return id != null && id.equals(((Posts) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Posts{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", titleKo='" + getTitleKo() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionKo='" + getDescriptionKo() + "'" +
            ", image='" + getImage() + "'" +
            ", link='" + getLink() + "'" +
            ", outstanding='" + getOutstanding() + "'" +
            "}";
    }
}
