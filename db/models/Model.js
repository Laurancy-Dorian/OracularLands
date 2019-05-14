
/**
 * Analyses the parameter and assigns values to the variables whereSql as "WHERE field = ? AND field2 = ?"
 *                    and whereValues as [value1, value2] to be used in sql query
 *
 * @param where  an object on the form :
 *                              {
 *                                  field: value1,
 *                                  field2: value2
 *                              }
 *                              where field is an attribute of the table and value is its value.
 *
 * @param next the callback function with parameters (whereSql, whereValues)
 */
const formatWhere = (where, next) => {
    let whereValues = [];
    let whereSql = ' ';
    let and = 'WHERE ';
    for (let key in where) {
        whereSql += and + key + ' = ?';
        whereValues.push(where[key])
        and = ' AND ';
    }
    next (whereSql, whereValues);
}


module.exports = (table) => {
    var model = {};

    /**
     * Reads all the rows in the table
     * @param next  the callback function when the query is done : (res) => {};
     */
    model.readAll = (next) => {
        pool.query('SELECT * FROM ' + table,(error, results, fields) => {
            if (error) {
                throw error;
            } else if (next) {
                next(results);
            }
        });
    };

    /**
     * Read the rows in table corresponding to where.
     *
     * @param where  an object on the form :
     *          {
     *              field: value1,
     *              field2: value2
     *          }
     *      where field is an attribute of the table and value is its value.
     *      ==> This will give : SELECT * FROM table WHERE filed = value1 AND field2 = value2
     *
     *      {} if you don't want WHERE
     *
     * @param next the callback function when the query is done : (res) => {};
     */
    model.read = (where, next) => {
        formatWhere(where, (whereSql, values) => {
            let sql = 'SELECT * FROM ' + table + whereSql;
            pool.query(sql, values, (error, results, fields) => {
                if (error) {
                    throw error;
                } else if (next) {
                    next(results);
                }
            });
        });
    };

/*    /!**
     * Insert the rows in table corresponding to where.
     *
     * @param values
     *
     * @param where  an object on the form :
     *          {
     *              field: value1,
     *              field2: value2
     *          }
     *      where field is an attribute of the table and value is its value.
     *      ==> This will give : SELECT * FROM table WHERE filed = value1 AND field2 = value2
     *
     *      {} if you don't want WHERE
     *
     * @param next the callback function when the query is done : (res) => {};
     *!/
    model.create = (values, where, next) => {
        formatWhere(where, (whereSql, whereValues) => {
            let sql = 'INSERT INTO' + table + ' VALUES ' + whereSql;
            pool.query(sql, whereValues, (error, results, fields) => {
                if (error) {
                    throw error;
                } else if (next) {
                    next(results);
                }
            });
        });
    };*/



    return model;
};

