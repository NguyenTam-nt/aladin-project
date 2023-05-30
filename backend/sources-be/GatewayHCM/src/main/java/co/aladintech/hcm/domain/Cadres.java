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
 * A Cadres.
 */
@Table("cadres")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Cadres implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @NotNull(message = "must not be null")
    @Column("fullname")
    private String fullname;

    @NotNull(message = "must not be null")
    @Column("fullname_ko")
    private String fullnameKo;

    @NotNull(message = "must not be null")
    @Column("position")
    private String position;

    @NotNull(message = "must not be null")
    @Column("position_ko")
    private String positionKo;

    @NotNull(message = "must not be null")
    @Pattern(regexp = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\\\.[A-Z]{2,6}$")
    @Column("email")
    private String email;

    @NotNull(message = "must not be null")
    @Column("major")
    private String major;

    @NotNull(message = "must not be null")
    @Column("major_ko")
    private String majorKo;

    @NotNull(message = "must not be null")
    @Column("work_responsibility")
    private String workResponsibility;

    @NotNull(message = "must not be null")
    @Column("work_responsibility_ko")
    private String workResponsibilityKo;

    @NotNull(message = "must not be null")
    @Column("title")
    private String title;

    @NotNull(message = "must not be null")
    @Column("title_ko")
    private String titleKo;

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
    @JsonIgnoreProperties(value = { "cadres" }, allowSetters = true)
    private Set<CadresCategory> cadresCategories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Cadres id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return this.fullname;
    }

    public Cadres fullname(String fullname) {
        this.setFullname(fullname);
        return this;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getFullnameKo() {
        return this.fullnameKo;
    }

    public Cadres fullnameKo(String fullnameKo) {
        this.setFullnameKo(fullnameKo);
        return this;
    }

    public void setFullnameKo(String fullnameKo) {
        this.fullnameKo = fullnameKo;
    }

    public String getPosition() {
        return this.position;
    }

    public Cadres position(String position) {
        this.setPosition(position);
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPositionKo() {
        return this.positionKo;
    }

    public Cadres positionKo(String positionKo) {
        this.setPositionKo(positionKo);
        return this;
    }

    public void setPositionKo(String positionKo) {
        this.positionKo = positionKo;
    }

    public String getEmail() {
        return this.email;
    }

    public Cadres email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMajor() {
        return this.major;
    }

    public Cadres major(String major) {
        this.setMajor(major);
        return this;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getMajorKo() {
        return this.majorKo;
    }

    public Cadres majorKo(String majorKo) {
        this.setMajorKo(majorKo);
        return this;
    }

    public void setMajorKo(String majorKo) {
        this.majorKo = majorKo;
    }

    public String getWorkResponsibility() {
        return this.workResponsibility;
    }

    public Cadres workResponsibility(String workResponsibility) {
        this.setWorkResponsibility(workResponsibility);
        return this;
    }

    public void setWorkResponsibility(String workResponsibility) {
        this.workResponsibility = workResponsibility;
    }

    public String getWorkResponsibilityKo() {
        return this.workResponsibilityKo;
    }

    public Cadres workResponsibilityKo(String workResponsibilityKo) {
        this.setWorkResponsibilityKo(workResponsibilityKo);
        return this;
    }

    public void setWorkResponsibilityKo(String workResponsibilityKo) {
        this.workResponsibilityKo = workResponsibilityKo;
    }

    public String getTitle() {
        return this.title;
    }

    public Cadres title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleKo() {
        return this.titleKo;
    }

    public Cadres titleKo(String titleKo) {
        this.setTitleKo(titleKo);
        return this;
    }

    public void setTitleKo(String titleKo) {
        this.titleKo = titleKo;
    }

    public String getContent() {
        return this.content;
    }

    public Cadres content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentKo() {
        return this.contentKo;
    }

    public Cadres contentKo(String contentKo) {
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
            this.files.forEach(i -> i.setCadres(null));
        }
        if (files != null) {
            files.forEach(i -> i.setCadres(this));
        }
        this.files = files;
    }

    public Cadres files(Set<Files> files) {
        this.setFiles(files);
        return this;
    }

    public Cadres addFiles(Files files) {
        this.files.add(files);
        files.setCadres(this);
        return this;
    }

    public Cadres removeFiles(Files files) {
        this.files.remove(files);
        files.setCadres(null);
        return this;
    }

    public Set<CadresCategory> getCadresCategories() {
        return this.cadresCategories;
    }

    public void setCadresCategories(Set<CadresCategory> cadresCategories) {
        if (this.cadresCategories != null) {
            this.cadresCategories.forEach(i -> i.setCadres(null));
        }
        if (cadresCategories != null) {
            cadresCategories.forEach(i -> i.setCadres(this));
        }
        this.cadresCategories = cadresCategories;
    }

    public Cadres cadresCategories(Set<CadresCategory> cadresCategories) {
        this.setCadresCategories(cadresCategories);
        return this;
    }

    public Cadres addCadresCategory(CadresCategory cadresCategory) {
        this.cadresCategories.add(cadresCategory);
        cadresCategory.setCadres(this);
        return this;
    }

    public Cadres removeCadresCategory(CadresCategory cadresCategory) {
        this.cadresCategories.remove(cadresCategory);
        cadresCategory.setCadres(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cadres)) {
            return false;
        }
        return id != null && id.equals(((Cadres) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cadres{" +
            "id=" + getId() +
            ", fullname='" + getFullname() + "'" +
            ", fullnameKo='" + getFullnameKo() + "'" +
            ", position='" + getPosition() + "'" +
            ", positionKo='" + getPositionKo() + "'" +
            ", email='" + getEmail() + "'" +
            ", major='" + getMajor() + "'" +
            ", majorKo='" + getMajorKo() + "'" +
            ", workResponsibility='" + getWorkResponsibility() + "'" +
            ", workResponsibilityKo='" + getWorkResponsibilityKo() + "'" +
            ", title='" + getTitle() + "'" +
            ", titleKo='" + getTitleKo() + "'" +
            ", content='" + getContent() + "'" +
            ", contentKo='" + getContentKo() + "'" +
            "}";
    }
}
