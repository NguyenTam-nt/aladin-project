package co.aladintech.hcm.repository.rowmapper;

import co.aladintech.hcm.domain.Posts;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Posts}, with proper type conversions.
 */
@Service
public class PostsRowMapper implements BiFunction<Row, String, Posts> {

    private final ColumnConverter converter;

    public PostsRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Posts} stored in the database.
     */
    @Override
    public Posts apply(Row row, String prefix) {
        Posts entity = new Posts();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setTitle(converter.fromRow(row, prefix + "_title", String.class));
        entity.setTitleKo(converter.fromRow(row, prefix + "_title_ko", String.class));
        entity.setDescription(converter.fromRow(row, prefix + "_description", String.class));
        entity.setDescriptionKo(converter.fromRow(row, prefix + "_description_ko", String.class));
        entity.setImage(converter.fromRow(row, prefix + "_image", String.class));
        entity.setLink(converter.fromRow(row, prefix + "_jhi_link", String.class));
        entity.setOutstanding(converter.fromRow(row, prefix + "_outstanding", Boolean.class));
        return entity;
    }
}
