package co.aladintech.hcm.repository.rowmapper;

import co.aladintech.hcm.domain.ContentSession;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link ContentSession}, with proper type conversions.
 */
@Service
public class ContentSessionRowMapper implements BiFunction<Row, String, ContentSession> {

    private final ColumnConverter converter;

    public ContentSessionRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link ContentSession} stored in the database.
     */
    @Override
    public ContentSession apply(Row row, String prefix) {
        ContentSession entity = new ContentSession();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setType(converter.fromRow(row, prefix + "_jhi_type", String.class));
        entity.setCategory(converter.fromRow(row, prefix + "_category", String.class));
        entity.setCategoryKo(converter.fromRow(row, prefix + "_category_ko", String.class));
        entity.setTilte(converter.fromRow(row, prefix + "_tilte", String.class));
        entity.setTilteKo(converter.fromRow(row, prefix + "_tilte_ko", String.class));
        entity.setContent(converter.fromRow(row, prefix + "_content", String.class));
        entity.setContentKo(converter.fromRow(row, prefix + "_content_ko", String.class));
        return entity;
    }
}
