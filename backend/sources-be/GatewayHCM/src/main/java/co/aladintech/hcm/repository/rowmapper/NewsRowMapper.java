package co.aladintech.hcm.repository.rowmapper;

import co.aladintech.hcm.domain.News;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link News}, with proper type conversions.
 */
@Service
public class NewsRowMapper implements BiFunction<Row, String, News> {

    private final ColumnConverter converter;

    public NewsRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link News} stored in the database.
     */
    @Override
    public News apply(Row row, String prefix) {
        News entity = new News();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setTilte(converter.fromRow(row, prefix + "_tilte", String.class));
        entity.setTilteKo(converter.fromRow(row, prefix + "_tilte_ko", String.class));
        entity.setDescription(converter.fromRow(row, prefix + "_description", String.class));
        entity.setDescriptionKo(converter.fromRow(row, prefix + "_description_ko", String.class));
        entity.setContent(converter.fromRow(row, prefix + "_content", String.class));
        entity.setContentKo(converter.fromRow(row, prefix + "_content_ko", String.class));
        entity.setNewsCategoryId(converter.fromRow(row, prefix + "_news_category_id", Long.class));
        return entity;
    }
}
