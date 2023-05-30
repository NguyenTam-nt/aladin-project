package co.aladintech.hcm.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class FilesSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("object_id", table, columnPrefix + "_object_id"));
        columns.add(Column.aliased("jhi_type", table, columnPrefix + "_jhi_type"));
        columns.add(Column.aliased("jhi_link", table, columnPrefix + "_jhi_link"));
        columns.add(Column.aliased("name", table, columnPrefix + "_name"));

        columns.add(Column.aliased("content_session_id", table, columnPrefix + "_content_session_id"));
        columns.add(Column.aliased("news_id", table, columnPrefix + "_news_id"));
        columns.add(Column.aliased("cadres_id", table, columnPrefix + "_cadres_id"));
        columns.add(Column.aliased("subject_id", table, columnPrefix + "_subject_id"));
        columns.add(Column.aliased("gallery_id", table, columnPrefix + "_gallery_id"));
        return columns;
    }
}
