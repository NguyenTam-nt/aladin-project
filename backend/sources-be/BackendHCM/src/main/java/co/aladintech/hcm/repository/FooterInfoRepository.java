package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.Files;
import co.aladintech.hcm.domain.FooterInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FooterInfoRepository extends JpaRepository<FooterInfo, Long> {

}
