package co.aladintech.hcm.repository.rowmapper;

import co.aladintech.hcm.domain.Files;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Files}, with proper type conversions.
 */
@Service
public class FilesRowMapper implements BiFunction<Row, String, Files> {

    private final ColumnConverter converter;

    public FilesRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Files} stored in the database.
     */
    @Override
    public Files apply(Row row, String prefix) {
        Files entity = new Files();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setObjectId(converter.fromRow(row, prefix + "_object_id", Long.class));
        entity.setType(converter.fromRow(row, prefix + "_jhi_type", String.class));
        entity.setLink(converter.fromRow(row, prefix + "_jhi_link", String.class));
        entity.setName(converter.fromRow(row, prefix + "_name", String.class));
        entity.setContentSessionId(converter.fromRow(row, prefix + "_content_session_id", Long.class));
        entity.setNewsId(converter.fromRow(row, prefix + "_news_id", Long.class));
        entity.setCadresId(converter.fromRow(row, prefix + "_cadres_id", Long.class));
        entity.setSubjectId(converter.fromRow(row, prefix + "_subject_id", Long.class));
        entity.setGalleryId(converter.fromRow(row, prefix + "_gallery_id", Long.class));
        return entity;
    }
}
