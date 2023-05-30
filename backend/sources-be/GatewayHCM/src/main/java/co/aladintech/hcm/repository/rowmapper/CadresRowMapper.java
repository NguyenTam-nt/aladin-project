package co.aladintech.hcm.repository.rowmapper;

import co.aladintech.hcm.domain.Cadres;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Cadres}, with proper type conversions.
 */
@Service
public class CadresRowMapper implements BiFunction<Row, String, Cadres> {

    private final ColumnConverter converter;

    public CadresRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Cadres} stored in the database.
     */
    @Override
    public Cadres apply(Row row, String prefix) {
        Cadres entity = new Cadres();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setFullname(converter.fromRow(row, prefix + "_fullname", String.class));
        entity.setFullnameKo(converter.fromRow(row, prefix + "_fullname_ko", String.class));
        entity.setPosition(converter.fromRow(row, prefix + "_position", String.class));
        entity.setPositionKo(converter.fromRow(row, prefix + "_position_ko", String.class));
        entity.setEmail(converter.fromRow(row, prefix + "_email", String.class));
        entity.setMajor(converter.fromRow(row, prefix + "_major", String.class));
        entity.setMajorKo(converter.fromRow(row, prefix + "_major_ko", String.class));
        entity.setWorkResponsibility(converter.fromRow(row, prefix + "_work_responsibility", String.class));
        entity.setWorkResponsibilityKo(converter.fromRow(row, prefix + "_work_responsibility_ko", String.class));
        entity.setTitle(converter.fromRow(row, prefix + "_title", String.class));
        entity.setTitleKo(converter.fromRow(row, prefix + "_title_ko", String.class));
        entity.setContent(converter.fromRow(row, prefix + "_content", String.class));
        entity.setContentKo(converter.fromRow(row, prefix + "_content_ko", String.class));
        return entity;
    }
}
