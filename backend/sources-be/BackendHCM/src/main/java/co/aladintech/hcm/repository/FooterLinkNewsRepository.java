package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.FooterInfo;
import co.aladintech.hcm.domain.FooterLinkNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FooterLinkNewsRepository extends JpaRepository<FooterLinkNews, Long> {

}
