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
  * @param album Album to insert.
  * @param callback Callback function with -1 if an error else Album ID created.  
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
                  return connection.query('INSERT INTO Juices (NAME, INGREDIENTS, BENEFITS, HTM) VALUES(?,?,?,?)', [juice.Name, juice.Ingredients, juice.Benefits, juice.Htm]);

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
                    juices.push(new _Juice.Juice(result1[x].ID, result1[x].NAME, result1[x].INGREDIENTS, result1[x].BENEFITS, result1[x].HTM));
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
    * CRUD method to update an Album.
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
                  // Use Promisfy Util to make an async function and update Album
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context3.next = 7;
                  return connection.query('UPDATE Juices SET NAME=?, INGREDIENTS=?, BENEFITS=?, HTM=? WHERE ID=?', [juice.Name, juice.Ingredients, juice.Benefits, juice.Htm, juice.Id]);

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
    * CRUD method to delete an Album.
    * 
    * @param album Album ID to delete.
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
                  // Use Promisfy Util to make an async function and run query to delete the tracks for an Album
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9KdWljZURBTy50cyJdLCJuYW1lcyI6WyJKdWljZURBTyIsImhvc3QiLCJwb3J0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluaXREYkNvbm5lY3Rpb24iLCJwb29sIiwianVpY2UiLCJjYWxsYmFjayIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicmVsZWFzZSIsInF1ZXJ5IiwidXRpbCIsInByb21pc2lmeSIsIk5hbWUiLCJJbmdyZWRpZW50cyIsIkJlbmVmaXRzIiwiSHRtIiwicmVzdWx0MSIsImFmZmVjdGVkUm93cyIsImp1aWNlSWQiLCJpbnNlcnRJZCIsImp1aWNlcyIsIngiLCJsZW5ndGgiLCJwdXNoIiwiSnVpY2UiLCJJRCIsIk5BTUUiLCJJTkdSRURJRU5UUyIsIkJFTkVGSVRTIiwiSFRNIiwiY2hhbmdlcyIsIklkIiwiY2hhbmdlZFJvd3MiLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJ1c2VyIiwiZGF0YWJhc2UiLCJzY2hlbWEiLCJjb25uZWN0aW9uTGltaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7SUFFYUEsUTtBQVNUO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksb0JBQVlDLElBQVosRUFBeUJDLElBQXpCLEVBQXNDQyxRQUF0QyxFQUF1REMsUUFBdkQsRUFDQTtBQUFBO0FBQUEsZ0RBZnNCLEVBZXRCO0FBQUEsZ0RBZHNCLElBY3RCO0FBQUEsb0RBYjBCLEVBYTFCO0FBQUEsb0RBWjBCLEVBWTFCO0FBQUEsa0RBWHdCLGFBV3hCO0FBQUEsZ0RBVmUsS0FBS0MsZ0JBQUwsRUFVZjtBQUNJO0FBQ0EsU0FBS0osSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNB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VSxDQUFDQyxPQUFYLEdBSG9CLENBS3BCOztBQUxvQix1QkFNakJGLEdBTmlCO0FBQUE7QUFBQTtBQUFBOztBQUFBLHdCQU1OQSxHQU5NOztBQUFBO0FBUXBCO0FBQ0l3QixrQkFBQUEsT0FUZ0IsR0FTTixDQVRNO0FBVXBCdkIsa0JBQUFBLFVBQVUsQ0FBQ0UsS0FBWCxHQUFtQkMsSUFBSSxDQUFDQyxTQUFMLENBQWVKLFVBQVUsQ0FBQ0UsS0FBMUIsQ0FBbkI7QUFWb0I7QUFBQSx5QkFXQUYsVUFBVSxDQUFDRSxLQUFYLENBQWlCLCtCQUFqQixFQUFrRCxDQUFDUyxPQUFELENBQWxELENBWEE7O0FBQUE7QUFXaEJGLGtCQUFBQSxPQVhnQjtBQVlwQmMsa0JBQUFBLE9BQU8sR0FBR0EsT0FBTyxHQUFHZCxPQUFPLENBQUNDLFlBQTVCLENBWm9CLENBY3BCOztBQUNBYixrQkFBQUEsUUFBUSxDQUFDMEIsT0FBRCxDQUFSOztBQWZvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlCSCxLLENBRUQ7O0FBRUE7QUFDSjtBQUNBOzs7O1dBQ0ksNEJBQ0E7QUFDSSxhQUFPRyxLQUFLLENBQUNDLFVBQU4sQ0FBaUI7QUFBQ3JDLFFBQUFBLElBQUksRUFBRSxLQUFLQSxJQUFaO0FBQWtCQyxRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBN0I7QUFBbUNxQyxRQUFBQSxJQUFJLEVBQUUsS0FBS3BDLFFBQTlDO0FBQXdEQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFBdkU7QUFBaUZvQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0MsTUFBaEc7QUFBd0dDLFFBQUFBLGVBQWUsRUFBRTtBQUF6SCxPQUFqQixDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKdWljZSB9IGZyb20gXCIuLi9tb2RlbHMvSnVpY2VcIjtcbmltcG9ydCAqIGFzIG15c3FsIGZyb20gXCJteXNxbFwiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xuXG5leHBvcnQgY2xhc3MgSnVpY2VEQU9cbntcbiAgICBwcml2YXRlIGhvc3Q6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHBvcnQ6bnVtYmVyID0gMzMwNjtcbiAgICBwcml2YXRlIHVzZXJuYW1lOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBwYXNzd29yZDpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgc2NoZW1hOnN0cmluZyA9IFwiSnVpY2UtQm9vc3RcIjtcbiAgICBwcml2YXRlIHBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBOb24tZGVmYXVsdCBjb25zdHJ1Y3Rvci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gaG9zdCBEYXRhYmFzZSBIb3N0bmFtZVxuICAgICAqIEBwYXJhbSB1c2VybmFtZSBEYXRhYmFzZSBVc2VybmFtZVxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBEYXRhYmFzZSBQYXNzd29yZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGhvc3Q6c3RyaW5nLCBwb3J0Om51bWJlciwgdXNlcm5hbWU6c3RyaW5nLCBwYXNzd29yZDpzdHJpbmcpXG4gICAge1xuICAgICAgICAvLyBTZXQgYWxsIGNsYXNzIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgIHRoaXMucG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBjcmVhdGUgYSBuZXcganVpY2UuXG4gICAgICogXG4gICAgICogQHBhcmFtIGFsYnVtIEFsYnVtIHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCAtMSBpZiBhbiBlcnJvciBlbHNlIEFsYnVtIElEIGNyZWF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlKGp1aWNlOkp1aWNlLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgaW5zZXJ0IEFsYnVtXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIEp1aWNlcyAoTkFNRSwgSU5HUkVESUVOVFMsIEJFTkVGSVRTLCBIVE0pIFZBTFVFUyg/LD8sPyw/KScsIFtqdWljZS5OYW1lLCBqdWljZS5JbmdyZWRpZW50cywganVpY2UuQmVuZWZpdHMsIGp1aWNlLkh0bV0pO1xuICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgIT0gMSlcbiAgICAgICAgICAgICAgIGNhbGxiYWNrKC0xKTtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGluc2VydCBhbGwgVHJhY2tzIGZvciB0aGlzIEFsYnVtXG4gICAgICAgICAgICBsZXQganVpY2VJZCA9IHJlc3VsdDEuaW5zZXJ0SWQ7XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhqdWljZUlkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHJldHVybiBhbGwgSnVpY2VzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgSnVpY2UuXG4gICAgICovXG4gICAgcHVibGljIGZpbmRKdWljZShjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gTGlzdCBvZiBKdWljZXMgdG8gcmV0dXJuXG4gICAgICAgIGxldCBqdWljZXM6SnVpY2VbXSA9IFtdO1xuICAgICAgICBcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlLCBydW4gdGhlIHF1ZXJ5IHRvIGdldCBhbGwgdGhlIEp1aWNlcywgYW5kIHJldHVybiB0aGUgTGlzdCBvZiBKdWljZXNcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIEp1aWNlc1xuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIGBKdWljZXNgJyk7XG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBKdWljZSBhbmQgaXRzIGRhdGEgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICBqdWljZXMucHVzaChuZXcgSnVpY2UocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5OQU1FLCByZXN1bHQxW3hdLklOR1JFRElFTlRTLCByZXN1bHQxW3hdLkJFTkVGSVRTLCByZXN1bHQxW3hdLkhUTSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soanVpY2VzKTtcbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gdXBkYXRlIGFuIEFsYnVtLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBqdWljZSBKdWljZSB0byB1cGRhdGUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggbnVtYmVyIG9mIHJvd3MgdXBkYXRlZC4gIFxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGUoanVpY2U6SnVpY2UsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgICB7XG4gICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG4gXG4gICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcbiBcbiAgICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCB1cGRhdGUgQWxidW1cbiAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnVVBEQVRFIEp1aWNlcyBTRVQgTkFNRT0/LCBJTkdSRURJRU5UUz0/LCBCRU5FRklUUz0/LCBIVE09PyBXSEVSRSBJRD0/JywgW2p1aWNlLk5hbWUsIGp1aWNlLkluZ3JlZGllbnRzLCBqdWljZS5CZW5lZml0cywganVpY2UuSHRtLCBqdWljZS5JZF0pO1xuICAgICAgICAgICAgaWYocmVzdWx0MS5jaGFuZ2VkUm93cyAhPSAwKVxuICAgICAgICAgICAgICAgICsrY2hhbmdlcztcbiBcbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gZGVsZXRlIGFuIEFsYnVtLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBhbGJ1bSBBbGJ1bSBJRCB0byBkZWxldGUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggbnVtYmVyIG9mIHJvd3MgZGVsZXRlZC4gIFxuICAgICAqICovXG4gICAgcHVibGljIGRlbGV0ZShqdWljZUlkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGRlbGV0ZSB0aGUgdHJhY2tzIGZvciBhbiBBbGJ1bVxuICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdERUxFVEUgRlJPTSBKdWljZXMgV0hFUkUgSUQ9PycsIFtqdWljZUlkXSk7XG4gICAgICAgICAgICBjaGFuZ2VzID0gY2hhbmdlcyArIHJlc3VsdDEuYWZmZWN0ZWRSb3dzO1xuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soY2hhbmdlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vKiAqKioqKioqKioqKioqKioqIFByaXZhdGUgSGVscGVyIE1ldGhvZHMgKioqKioqKioqKioqKioqKiAqL1xuXG4gICAgLyoqXG4gICAgICogUHJpdmF0ZSBoZWxwZXIgbWV0aG9kIHRvIGluaXRpYWxpZSBhIERhdGFiYXNlIENvbm5lY3Rpb25cbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXREYkNvbm5lY3Rpb24oKTphbnlcbiAgICB7XG4gICAgICAgIHJldHVybiBteXNxbC5jcmVhdGVQb29sKHtob3N0OiB0aGlzLmhvc3QsIHBvcnQ6IHRoaXMucG9ydCwgdXNlcjogdGhpcy51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsIGRhdGFiYXNlOiB0aGlzLnNjaGVtYSwgY29ubmVjdGlvbkxpbWl0OiAxMH0pO1xuICAgIH1cbn1cbiJdfQ==