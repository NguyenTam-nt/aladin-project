package co.aladintech.hcm.repository.rowmapper;

import co.aladintech.hcm.domain.Subject;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Subject}, with proper type conversions.
 */
@Service
public class SubjectRowMapper implements BiFunction<Row, String, Subject> {

    private final ColumnConverter converter;

    public SubjectRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Subject} stored in the database.
     */
    @Override
    public Subject apply(Row row, String prefix) {
        Subject entity = new Subject();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setName(converter.fromRow(row, prefix + "_name", String.class));
        entity.setNameKo(converter.fromRow(row, prefix + "_name_ko", String.class));
        entity.setDescription(converter.fromRow(row, prefix + "_description", String.class));
        entity.setDescriptionKo(converter.fromRow(row, prefix + "_description_ko", String.class));
        entity.setTitleKo(converter.fromRow(row, prefix + "_title_ko", String.class));
        entity.setContentKo(converter.fromRow(row, prefix + "_content_ko", String.class));
        return entity;
    }
}
