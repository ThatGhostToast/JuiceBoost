"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JuiceDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Juice = require("../models/Juice");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var JuiceDAO = /*#__PURE__*/function () {
  /**
   * Non-default constructor.
   * 
   * @param host Database Hostname
   * @param username Database Username
   * @param password Database Password
   */
  function JuiceDAO(host, port, username, password) {
    (0, _classCallCheck2.default)(this, JuiceDAO);
    (0, _defineProperty2.default)(this, "host", "");
    (0, _defineProperty2.default)(this, "port", 3306);
    (0, _defineProperty2.default)(this, "username", "");
    (0, _defineProperty2.default)(this, "password", "");
    (0, _defineProperty2.default)(this, "schema", "Juice-Boost");
    (0, _defineProperty2.default)(this, "pool", this.initDbConnection());
    // Set all class properties
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.pool = this.initDbConnection();
  }
  /**
  * CRUD method to create a new juice.
  * 
  * @param juice Juice to insert.
  * @param callback Callback function with -1 if an error else Juice ID created.  
  */


  (0, _createClass2.default)(JuiceDAO, [{
    key: "create",
    value: function create(juice, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, connection) {
          var result1, juiceId;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and insert Album
                  connection.query = util.promisify(connection.query);
                  _context.next = 6;
                  return connection.query('INSERT INTO Juices (NAME, INGREDIENTS, BENEFITS, HTM, IMAGENAME) VALUES(?,?,?,?,?)', [juice.Name, juice.Ingredients, juice.Benefits, juice.Htm, juice.ImageName]);

                case 6:
                  result1 = _context.sent;
                  if (result1.affectedRows != 1) callback(-1); // Use Promisfy Util to make an async function and run query to insert all Tracks for this Album

                  juiceId = result1.insertId; // Do a callback to return the results

                  callback(juiceId);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to return all Juices.
    * 
    * @param callback Callback function with an Array of type Juice.
    */

  }, {
    key: "findJuice",
    value: function findJuice(callback) {
      // List of Juices to return
      var juices = []; // Get a pooled connection to the database, run the query to get all the Juices, and return the List of Juices

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, connection) {
          var result1, x;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context2.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all Juices
                  connection.query = util.promisify(connection.query);
                  _context2.next = 6;
                  return connection.query('SELECT * FROM `Juices`');

                case 6:
                  result1 = _context2.sent;

                  for (x = 0; x < result1.length; ++x) {
                    // Add Juice and its data to the list
                    juices.push(new _Juice.Juice(result1[x].ID, result1[x].NAME, result1[x].INGREDIENTS, result1[x].BENEFITS, result1[x].HTM, result1[x].IMAGENAME));
                  } // Do a callback to return the results


                  callback(juices);

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to update a Juice.
    * 
    * @param juice Juice to update.
    * @param callback Callback function with number of rows updated.  
    */

  }, {
    key: "update",
    value: function update(juice, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(err, connection) {
          var changes, result1;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context3.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and update Juice
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context3.next = 7;
                  return connection.query('UPDATE Juices SET NAME=?, INGREDIENTS=?, BENEFITS=?, HTM=?, IMAGENAME=? WHERE ID=?', [juice.Name, juice.Ingredients, juice.Benefits, juice.Htm, juice.ImageName, juice.Id]);

                case 7:
                  result1 = _context3.sent;
                  if (result1.changedRows != 0) ++changes; // Do a callback to return the results

                  callback(changes);

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to delete a Juice.
    * 
    * @param juiceId Juice ID to delete.
    * @param callback Callback function with number of rows deleted.  
    * */

  }, {
    key: "delete",
    value: function _delete(juiceId, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
          var changes, result1;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context4.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to delete juice
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context4.next = 7;
                  return connection.query('DELETE FROM Juices WHERE ID=?', [juiceId]);

                case 7:
                  result1 = _context4.sent;
                  changes = changes + result1.affectedRows; // Do a callback to return the results

                  callback(changes);

                case 10:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    } //* **************** Private Helper Methods **************** */

    /**
     * Private helper method to initialie a Database Connection
     */

  }, {
    key: "initDbConnection",
    value: function initDbConnection() {
      return mysql.createPool({
        host: this.host,
        port: this.port,
        user: this.username,
        password: this.password,
        database: this.schema,
        connectionLimit: 10
      });
    }
  }]);
  return JuiceDAO;
}();

exports.JuiceDAO = JuiceDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9KdWljZURBTy50cyJdLCJuYW1lcyI6WyJKdWljZURBTyIsImhvc3QiLCJwb3J0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluaXREYkNvbm5lY3Rpb24iLCJwb29sIiwianVpY2UiLCJjYWxsYmFjayIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicmVsZWFzZSIsInF1ZXJ5IiwidXRpbCIsInByb21pc2lmeSIsIk5hbWUiLCJJbmdyZWRpZW50cyIsIkJlbmVmaXRzIiwiSHRtIiwiSW1hZ2VOYW1lIiwicmVzdWx0MSIsImFmZmVjdGVkUm93cyIsImp1aWNlSWQiLCJpbnNlcnRJZCIsImp1aWNlcyIsIngiLCJsZW5ndGgiLCJwdXNoIiwiSnVpY2UiLCJJRCIsIk5BTUUiLCJJTkdSRURJRU5UUyIsIkJFTkVGSVRTIiwiSFRNIiwiSU1BR0VOQU1FIiwiY2hhbmdlcyIsIklkIiwiY2hhbmdlZFJvd3MiLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJ1c2VyIiwiZGF0YWJhc2UiLCJzY2hlbWEiLCJjb25uZWN0aW9uTGltaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7SUFFYUEsUTtBQVNUO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksb0JBQVlDLElBQVosRUFBeUJDLElBQXpCLEVBQXNDQyxRQUF0QyxFQUF1REMsUUFBdkQsRUFDQTtBQUFBO0FBQUEsZ0RBZnNCLEVBZXRCO0FBQUEsZ0RBZHNCLElBY3RCO0FBQUEsb0RBYjBCLEVBYTFCO0FBQUEsb0RBWjBCLEVBWTFCO0FBQUEsa0RBWHdCLGFBV3hCO0FBQUEsZ0RBVmUsS0FBS0MsZ0JBQUwsRUFVZjtBQUNJO0FBQ0EsU0FBS0osSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxR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WyJpbXBvcnQgeyBKdWljZSB9IGZyb20gXCIuLi9tb2RlbHMvSnVpY2VcIjtcbmltcG9ydCAqIGFzIG15c3FsIGZyb20gXCJteXNxbFwiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xuXG5leHBvcnQgY2xhc3MgSnVpY2VEQU9cbntcbiAgICBwcml2YXRlIGhvc3Q6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHBvcnQ6bnVtYmVyID0gMzMwNjtcbiAgICBwcml2YXRlIHVzZXJuYW1lOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBwYXNzd29yZDpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgc2NoZW1hOnN0cmluZyA9IFwiSnVpY2UtQm9vc3RcIjtcbiAgICBwcml2YXRlIHBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBOb24tZGVmYXVsdCBjb25zdHJ1Y3Rvci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gaG9zdCBEYXRhYmFzZSBIb3N0bmFtZVxuICAgICAqIEBwYXJhbSB1c2VybmFtZSBEYXRhYmFzZSBVc2VybmFtZVxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBEYXRhYmFzZSBQYXNzd29yZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGhvc3Q6c3RyaW5nLCBwb3J0Om51bWJlciwgdXNlcm5hbWU6c3RyaW5nLCBwYXNzd29yZDpzdHJpbmcpXG4gICAge1xuICAgICAgICAvLyBTZXQgYWxsIGNsYXNzIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgIHRoaXMucG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBjcmVhdGUgYSBuZXcganVpY2UuXG4gICAgICogXG4gICAgICogQHBhcmFtIGp1aWNlIEp1aWNlIHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCAtMSBpZiBhbiBlcnJvciBlbHNlIEp1aWNlIElEIGNyZWF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlKGp1aWNlOkp1aWNlLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgaW5zZXJ0IEFsYnVtXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIEp1aWNlcyAoTkFNRSwgSU5HUkVESUVOVFMsIEJFTkVGSVRTLCBIVE0sIElNQUdFTkFNRSkgVkFMVUVTKD8sPyw/LD8sPyknLCBbanVpY2UuTmFtZSwganVpY2UuSW5ncmVkaWVudHMsIGp1aWNlLkJlbmVmaXRzLCBqdWljZS5IdG0sIGp1aWNlLkltYWdlTmFtZV0pO1xuICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgIT0gMSlcbiAgICAgICAgICAgICAgIGNhbGxiYWNrKC0xKTtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGluc2VydCBhbGwgVHJhY2tzIGZvciB0aGlzIEFsYnVtXG4gICAgICAgICAgICBsZXQganVpY2VJZCA9IHJlc3VsdDEuaW5zZXJ0SWQ7XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhqdWljZUlkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHJldHVybiBhbGwgSnVpY2VzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgSnVpY2UuXG4gICAgICovXG4gICAgcHVibGljIGZpbmRKdWljZShjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gTGlzdCBvZiBKdWljZXMgdG8gcmV0dXJuXG4gICAgICAgIGxldCBqdWljZXM6SnVpY2VbXSA9IFtdO1xuICAgICAgICBcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlLCBydW4gdGhlIHF1ZXJ5IHRvIGdldCBhbGwgdGhlIEp1aWNlcywgYW5kIHJldHVybiB0aGUgTGlzdCBvZiBKdWljZXNcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIEp1aWNlc1xuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIGBKdWljZXNgJyk7XG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBKdWljZSBhbmQgaXRzIGRhdGEgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICBqdWljZXMucHVzaChuZXcgSnVpY2UocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5OQU1FLCByZXN1bHQxW3hdLklOR1JFRElFTlRTLCByZXN1bHQxW3hdLkJFTkVGSVRTLCByZXN1bHQxW3hdLkhUTSwgcmVzdWx0MVt4XS5JTUFHRU5BTUUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGp1aWNlcyk7XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHVwZGF0ZSBhIEp1aWNlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBqdWljZSBKdWljZSB0byB1cGRhdGUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggbnVtYmVyIG9mIHJvd3MgdXBkYXRlZC4gIFxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGUoanVpY2U6SnVpY2UsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgICB7XG4gICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG4gXG4gICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcbiBcbiAgICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCB1cGRhdGUgSnVpY2VcbiAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnVVBEQVRFIEp1aWNlcyBTRVQgTkFNRT0/LCBJTkdSRURJRU5UUz0/LCBCRU5FRklUUz0/LCBIVE09PywgSU1BR0VOQU1FPT8gV0hFUkUgSUQ9PycsIFtqdWljZS5OYW1lLCBqdWljZS5JbmdyZWRpZW50cywganVpY2UuQmVuZWZpdHMsIGp1aWNlLkh0bSwganVpY2UuSW1hZ2VOYW1lLCBqdWljZS5JZF0pO1xuICAgICAgICAgICAgaWYocmVzdWx0MS5jaGFuZ2VkUm93cyAhPSAwKVxuICAgICAgICAgICAgICAgICsrY2hhbmdlcztcbiBcbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gZGVsZXRlIGEgSnVpY2UuXG4gICAgICogXG4gICAgICogQHBhcmFtIGp1aWNlSWQgSnVpY2UgSUQgdG8gZGVsZXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIGRlbGV0ZWQuICBcbiAgICAgKiAqL1xuICAgIHB1YmxpYyBkZWxldGUoanVpY2VJZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBkZWxldGUganVpY2VcbiAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnREVMRVRFIEZST00gSnVpY2VzIFdIRVJFIElEPT8nLCBbanVpY2VJZF0pO1xuICAgICAgICAgICAgY2hhbmdlcyA9IGNoYW5nZXMgKyByZXN1bHQxLmFmZmVjdGVkUm93cztcblxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyogKioqKioqKioqKioqKioqKiBQcml2YXRlIEhlbHBlciBNZXRob2RzICoqKioqKioqKioqKioqKiogKi9cblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgaGVscGVyIG1ldGhvZCB0byBpbml0aWFsaWUgYSBEYXRhYmFzZSBDb25uZWN0aW9uXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0RGJDb25uZWN0aW9uKCk6YW55XG4gICAge1xuICAgICAgICByZXR1cm4gbXlzcWwuY3JlYXRlUG9vbCh7aG9zdDogdGhpcy5ob3N0LCBwb3J0OiB0aGlzLnBvcnQsIHVzZXI6IHRoaXMudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLCBkYXRhYmFzZTogdGhpcy5zY2hlbWEsIGNvbm5lY3Rpb25MaW1pdDogMTB9KTtcbiAgICB9XG59XG4iXX0=