const util = require (appRoot + '/helpers/util');

/**
 * Creates the string for SQL WHERE
 * ==> "WHERE field = value AND field2 = value2 ..."
 *
 * use this function in a query :
 *            query('SELECT * FROM table' + sql, whereArray)
 *
 * @param where  an object on the form (example) :  {field1: value1, field2: value2}
 *                  where field is an attribute/field of the table and value is its value.
 *
 *                => Giving an empty object will give an empty string
 *
 * @param next  the callback function with parameters (sql, whereArray) :
 *                  - sql contains the string "WHERE field1 = ? AND field2 = ?"
 *                  - whereArray contains the array [value1, value2]
 */
const formatWhere = (where, next) => {
    let whereValues = [];
    let whereSql = ' ';
    let and = 'WHERE ';
    for (let key in where) {
        whereSql += and + key + ' = ?';
        whereValues.push(where[key]);
        and = ' AND ';
    }
    next(whereSql, whereValues);
}

/**
 * Creates the string for SQL INSERT requests and the associated data array
 *
 * use : You should use the results of this this function in a query :
 *            query('INSERT INTO table' + sql, valuesArray)
 *
 * @param values  an object on the form (example) : {field1: value1, field2: value2}
 *                  where field is an attribute/field of the table and value is its value.
 *
 * @param next   the callback function with parameters (sql, valuesArray) :
 *                  - sql contains the string "(field1, field2) VALUES (?,?)"
 *                  - valuesArray contains the array [value1, value2]
 */
const formatValuesInsert = (values, next) => {
    let fieldsSql = ' ';
    let valuesSql = ' VALUES ';
    let valFields = [];
    let sep = '(';
    for (let key in values) {
        fieldsSql += sep + key;
        valuesSql += sep + '?';
        valFields.push(values[key]);
        sep = ', ';
    }
    fieldsSql += ')';
    valuesSql += ')';
    fieldsSql += valuesSql;
    next(fieldsSql, valFields);
}

/**
 * Creates the string for SQL UPDATE requests and the associated data array
 *
 * use : You should use the results of this this function in a query :
 *            query('UPDATE table' + sql, valuesArray)
 *
 * @param values  an object on the form (example) : {field1: value1, field2: value2}
 *                  where field is an attribute/field of the table and value is its value.
 *
 * @param next   the callback function with parameters (sql, valuesArray) :
 *                  - sql contains the string "(field1, field2) VALUES (?,?)"
 *                  - valuesArray contains the array [value1, value2]
 */
const formatValuesUpdate = (values, next) => {
    let sql = ' SET ';
    let valuesArray = [];
    let sep = '';
    for (let key in values) {
        sql += sep + key + " = ?";
        valuesArray.push(values[key]);
        sep = ', ';
    }
    next(sql, valuesArray);
}


module.exports = (table) => {
    var model = {};

    /**
     * Reads all the rows in the table
     * @param next  the callback function when the query is done : (res, err) => {};
     *                      if  err is NOT empty, this means the query failed.
     *
     */
    model.readAll = (next) => {
        pool.query('SELECT * FROM ' + table, (error, results, fields) => {
            if (error) {
                throw error;
            } else if (next) {
                next(results, error);
            }
        });
    };

    /**
     * Reads the rows in table, according to the where parameter.
     *
     * @param select    an array of string representing the fields you want to select
     *          example : ['id_user', 'name_user'] will create "SELECT id_user, name_user FROM ...'
     *
     *
     * @param where     an object on the form (example) :  {field1: value1, field2: value2}
     *                      where field is an attribute/field of the table and value is its value.
     *          this example will give : " ... WHERE field1 = value1 AND field2 = value2"
     *
     *   ===>  give an empty object {} if you don't want a WHERE clause
     *
     * @param next   the callback function when the query is done : (res, err) => {};
     *                  if  err is NOT empty, this means the query failed.
     */
    model.read = (select, where, next) => {
        formatWhere(where, (whereSql, values) => {
            let sql = 'SELECT ' + select.join(', ') + ' FROM ' + table + whereSql;
            pool.query(sql, values, (error, results, fields) => {
                next(results, error);
            });
        });
    };

    /**
     * Insert the rows in table, according to where parameter.
     *
     * @param values  an object on the form (example) : {field1: value1, field2: value2}
     *                   where field is an attribute of the table and value is its value.
     *               This example will give : "INSERT INTO table (field1, field2) VALUES (value1, value2)"
     *
     * @param where     an object on the form (example) :  {field1: value1, field2: value2}
     *                      where field is an attribute/field of the table and value is its value.
     *          this example will give : " ... WHERE field1 = value1 AND field2 = value2"
     *
     *   ===>  give an empty object {} if you don't want a WHERE clause
     *
     * @param next   the callback function when the query is done : (res, err) => {};
     *                  if  err is NOT empty, this means the query failed.
     */
    model.create = (values, where, next) => {
        formatWhere(where, (whereSql, whereArray) => {
            formatValuesInsert(values, (insertSql, valuesArray) => {
                let sql = 'INSERT INTO ' + table + insertSql + whereSql;
                pool.query(sql, valuesArray.concat(whereArray), (error, results, fields) => {
                    next(results, error);
                });
            });
        });
    }

    /**
     * Update the rows in table, according to where parameter.
     *
     * @param values  an object on the form (example) : {field1: value1, field2: value2}
     *                   where field is an attribute of the table and value is its value.
     *               This example will give : "UPDATE table SET field1 = 'value1', field2 = 'value2'"
     *
     * @param where     an object on the form (example) :  {field1: value1, field2: value2}
     *                      where field is an attribute/field of the table and value is its value.
     *          this example will give : " ... WHERE field1 = value1 AND field2 = value2"
     *
     *   ===>  give an empty object {} if you don't want a WHERE clause
     *
     * @param next   the callback function when the query is done : (res, err) => {};
     *                  if err is NOT empty, this means the query failed.
     */
    model.update = (values, where, next) => {
        if (!util.isObjectEmpty(values)) {
            formatWhere(where, (whereSql, whereArray) => {
                formatValuesUpdate(values, (updateSql, valuesArray) => {
                    let sql = 'UPDATE ' + table + updateSql + whereSql;
                    pool.query(sql, valuesArray.concat(whereArray), (error, results, fields) => {
                        next(results, error);
                    });
                });
            });
        } else {
            next ([]);
        }

    }


    /**
     * Delete the rows in table, according to where parameter
     * @param where     an object on the form (example) :  {field1: value1, field2: value2}
     *                      where field is an attribute/field of the table and value is its value.
     *          this example will give : " ... WHERE field1 = value1 AND field2 = value2"
     *
     *   ===>  give an empty object {} if you don't want a WHERE clause
     *
     * @param next   the callback function when the query is done : (res, err) => {};
     *                  if err is NOT empty, this means the query failed.
     */
    model.delete = (where, next) => {
        formatWhere(where, (whereSql, whereArray) => {
            let sql = 'DELETE FROM ' + table + whereSql;
            pool.query(sql, whereArray, (error, results, fields) => {
                next(results, error);
            });
        });
    }


    return model;
}


