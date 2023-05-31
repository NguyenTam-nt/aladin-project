package co.aladintech.hcm.repository.rowmapper;

import co.aladintech.hcm.domain.History;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link History}, with proper type conversions.
 */
@Service
public class HistoryRowMapper implements BiFunction<Row, String, History> {

    private final ColumnConverter converter;

    public HistoryRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link History} stored in the database.
     */
    @Override
    public History apply(Row row, String prefix) {
        History entity = new History();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setYear(converter.fromRow(row, prefix + "_jhi_year", Integer.class));
        entity.setImage(converter.fromRow(row, prefix + "_image", String.class));
        entity.setDescription(converter.fromRow(row, prefix + "_description", String.class));
        entity.setDescriptionKo(converter.fromRow(row, prefix + "_description_ko", String.class));
        return entity;
    }
}
