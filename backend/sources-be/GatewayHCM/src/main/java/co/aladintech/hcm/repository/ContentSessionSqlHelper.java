package co.aladintech.hcm.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class ContentSessionSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("jhi_type", table, columnPrefix + "_jhi_type"));
        columns.add(Column.aliased("category", table, columnPrefix + "_category"));
        columns.add(Column.aliased("category_ko", table, columnPrefix + "_category_ko"));
        columns.add(Column.aliased("tilte", table, columnPrefix + "_tilte"));
        columns.add(Column.aliased("tilte_ko", table, columnPrefix + "_tilte_ko"));
        columns.add(Column.aliased("content", table, columnPrefix + "_content"));
        columns.add(Column.aliased("content_ko", table, columnPrefix + "_content_ko"));

        return columns;
    }
}
