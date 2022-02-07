"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Juice = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Juice = /*#__PURE__*/function () {
  function Juice(id, name, ingredients, benefits, htm) {
    (0, _classCallCheck2.default)(this, Juice);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "name", "");
    (0, _defineProperty2.default)(this, "ingredients", "");
    (0, _defineProperty2.default)(this, "benefits", "");
    (0, _defineProperty2.default)(this, "htm", "");
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.benefits = benefits;
    this.htm = htm;
  }

  (0, _createClass2.default)(Juice, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
    }
  }, {
    key: "Name",
    get: function get() {
      return this.name;
    },
    set: function set(name) {
      this.name = name;
    }
  }, {
    key: "Ingredients",
    get: function get() {
      return this.ingredients;
    },
    set: function set(ingredients) {
      this.ingredients = ingredients;
    }
  }, {
    key: "Benefits",
    get: function get() {
      return this.benefits;
    },
    set: function set(benefits) {
      this.benefits = benefits;
    }
  }, {
    key: "Htm",
    get: function get() {
      return this.htm;
    },
    set: function set(htm) {
      this.htm = htm;
    }
  }]);
  return Juice;
}();

exports.Juice = Juice;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvSnVpY2UudHMiXSwibmFtZXMiOlsiSnVpY2UiLCJpZCIsIm5hbWUiLCJpbmdyZWRpZW50cyIsImJlbmVmaXRzIiwiaHRtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFBYUEsSztBQVFULGlCQUFZQyxFQUFaLEVBQXVCQyxJQUF2QixFQUFvQ0MsV0FBcEMsRUFBd0RDLFFBQXhELEVBQXlFQyxHQUF6RSxFQUNBO0FBQUE7QUFBQSw4Q0FQcUIsQ0FBQyxDQU90QjtBQUFBLGdEQU51QixFQU12QjtBQUFBLHVEQUw4QixFQUs5QjtBQUFBLG9EQUoyQixFQUkzQjtBQUFBLCtDQUhzQixFQUd0QjtBQUNJLFNBQUtKLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDSDs7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtKLEVBQVo7QUFDSCxLO1NBQ0QsYUFBT0EsRUFBUCxFQUNBO0FBQ0ksV0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLElBQVo7QUFDSCxLO1NBQ0QsYUFBU0EsSUFBVCxFQUNBO0FBQ0ksV0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLFdBQVo7QUFDSCxLO1NBQ0QsYUFBZ0JBLFdBQWhCLEVBQ0E7QUFDSSxXQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxRQUFaO0FBQ0gsSztTQUNELGFBQWFBLFFBQWIsRUFDQTtBQUNJLFdBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLEdBQVo7QUFDSCxLO1NBRUQsYUFBZUEsR0FBZixFQUNBO0FBQ0ksV0FBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgSnVpY2UgXG57XG4gICAgcHJpdmF0ZSBpZDogbnVtYmVyID0gLTE7XG4gICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgaW5ncmVkaWVudHM6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBiZW5lZml0czogc3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIGh0bTogc3RyaW5nID0gXCJcIjtcbiBcbiAgICBjb25zdHJ1Y3RvcihpZDpudW1iZXIsIG5hbWU6c3RyaW5nLCBpbmdyZWRpZW50czpzdHJpbmcsIGJlbmVmaXRzOnN0cmluZywgaHRtOnN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5pbmdyZWRpZW50cyA9IGluZ3JlZGllbnRzO1xuICAgICAgICB0aGlzLmJlbmVmaXRzID0gYmVuZWZpdHM7XG4gICAgICAgIHRoaXMuaHRtID0gaHRtO1xuICAgIH1cblxuICAgIGdldCBJZCgpOm51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxuICAgIHNldCBJZChpZDpudW1iZXIpXG4gICAge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgfVxuXG4gICAgZ2V0IE5hbWUoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfVxuICAgIHNldCBOYW1lKG5hbWU6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBnZXQgSW5ncmVkaWVudHMoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZ3JlZGllbnRzO1xuICAgIH1cbiAgICBzZXQgSW5ncmVkaWVudHMoaW5ncmVkaWVudHM6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5pbmdyZWRpZW50cyA9IGluZ3JlZGllbnRzO1xuICAgIH1cblxuICAgIGdldCBCZW5lZml0cygpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVuZWZpdHM7XG4gICAgfVxuICAgIHNldCBCZW5lZml0cyhiZW5lZml0czpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLmJlbmVmaXRzID0gYmVuZWZpdHM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBIdG0oKTogc3RyaW5nIFxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgSHRtKGh0bTogc3RyaW5nKSBcbiAgICB7XG4gICAgICAgIHRoaXMuaHRtID0gaHRtO1xuICAgIH1cbn0iXX0=