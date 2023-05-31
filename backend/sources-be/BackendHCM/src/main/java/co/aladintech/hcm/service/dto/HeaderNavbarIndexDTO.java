package co.aladintech.hcm.service.dto;

import java.util.List;

public class HeaderNavbarIndexDTO {
    private Long id;

    private Integer index;

    private String name;

    private String nameKo;

    private String link;

    private Long parent;

    private Boolean status;

    private List<HeaderNavbarDTO> items;


    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameKo() {
        return nameKo;
    }

    public void setNameKo(String nameKo) {
        this.nameKo = nameKo;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Long getParent() {
        return parent;
    }

    public void setParent(Long parent) {
        this.parent = parent;
    }

    public List<HeaderNavbarDTO> getItems() {
        return items;
    }

    public void setItems(List<HeaderNavbarDTO> items) {
        this.items = items;
    }
}
