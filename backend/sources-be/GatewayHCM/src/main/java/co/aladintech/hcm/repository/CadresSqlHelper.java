package co.aladintech.hcm.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class CadresSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("fullname", table, columnPrefix + "_fullname"));
        columns.add(Column.aliased("fullname_ko", table, columnPrefix + "_fullname_ko"));
        columns.add(Column.aliased("position", table, columnPrefix + "_position"));
        columns.add(Column.aliased("position_ko", table, columnPrefix + "_position_ko"));
        columns.add(Column.aliased("email", table, columnPrefix + "_email"));
        columns.add(Column.aliased("major", table, columnPrefix + "_major"));
        columns.add(Column.aliased("major_ko", table, columnPrefix + "_major_ko"));
        columns.add(Column.aliased("work_responsibility", table, columnPrefix + "_work_responsibility"));
        columns.add(Column.aliased("work_responsibility_ko", table, columnPrefix + "_work_responsibility_ko"));
        columns.add(Column.aliased("title", table, columnPrefix + "_title"));
        columns.add(Column.aliased("title_ko", table, columnPrefix + "_title_ko"));
        columns.add(Column.aliased("content", table, columnPrefix + "_content"));
        columns.add(Column.aliased("content_ko", table, columnPrefix + "_content_ko"));

        return columns;
    }
}
