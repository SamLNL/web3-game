import { u as unwrapExports, c as createCommonjsModule, a as commonjsGlobal } from './bootstrap.native.js';

var dateInputPolyfill_dist = createCommonjsModule(function (module, exports) {
  !function (t, e) {
    module.exports = e();
  }(commonjsGlobal, function () {
    return function (t) {
      function e(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
          exports: {},
          id: r,
          loaded: !1
        };
        return t[r].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports;
      }

      var n = {};
      return e.m = t, e.c = n, e.p = "", e(0);
    }([function (t, e, n) {

      function r(t) {
        return t && t.__esModule ? t : {
          default: t
        };
      }

      var o = n(42),
          i = r(o),
          a = function a() {
        i.default.addPickerToOtherInputs(), i.default.supportsDateInput() || i.default.addPickerToDateInputs();
      };

      a(), document.addEventListener("DOMContentLoaded", function () {
        a();
      }), document.querySelector("body").addEventListener("mousedown", function () {
        a();
      });
    }, function (t, e, n) {
      t.exports = !n(12)(function () {
        return 7 != Object.defineProperty({}, "a", {
          get: function () {
            return 7;
          }
        }).a;
      });
    }, function (t, e) {
      var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
      "number" == typeof __g && (__g = n);
    }, function (t, e) {
      var n = {}.hasOwnProperty;

      t.exports = function (t, e) {
        return n.call(t, e);
      };
    }, function (t, e, n) {
      var r = n(10),
          o = n(32),
          i = n(25),
          a = Object.defineProperty;
      e.f = n(1) ? Object.defineProperty : function (t, e, n) {
        if (r(t), e = i(e, !0), r(n), o) try {
          return a(t, e, n);
        } catch (t) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (t[e] = n.value), t;
      };
    }, function (t, e) {
      var n = t.exports = {
        version: "2.6.12"
      };
      "number" == typeof __e && (__e = n);
    }, function (t, e, n) {
      var r = n(4),
          o = n(14);
      t.exports = n(1) ? function (t, e, n) {
        return r.f(t, e, o(1, n));
      } : function (t, e, n) {
        return t[e] = n, t;
      };
    }, function (t, e, n) {
      var r = n(60),
          o = n(16);

      t.exports = function (t) {
        return r(o(t));
      };
    }, function (t, e, n) {
      var r = n(23)("wks"),
          o = n(15),
          i = n(2).Symbol,
          a = "function" == typeof i,
          u = t.exports = function (t) {
        return r[t] || (r[t] = a && i[t] || (a ? i : o)("Symbol." + t));
      };

      u.store = r;
    }, function (t, e) {
      t.exports = function (t) {
        return "object" == typeof t ? null !== t : "function" == typeof t;
      };
    }, function (t, e, n) {
      var r = n(9);

      t.exports = function (t) {
        if (!r(t)) throw TypeError(t + " is not an object!");
        return t;
      };
    }, function (t, e, n) {
      var r = n(2),
          o = n(5),
          i = n(57),
          a = n(6),
          u = n(3),
          s = "prototype",
          c = function c(t, e, n) {
        var f,
            l,
            d,
            p = t & c.F,
            h = t & c.G,
            y = t & c.S,
            m = t & c.P,
            v = t & c.B,
            g = t & c.W,
            b = h ? o : o[e] || (o[e] = {}),
            M = b[s],
            S = h ? r : y ? r[e] : (r[e] || {})[s];
        h && (n = e);

        for (f in n) l = !p && S && void 0 !== S[f], l && u(b, f) || (d = l ? S[f] : n[f], b[f] = h && "function" != typeof S[f] ? n[f] : v && l ? i(d, r) : g && S[f] == d ? function (t) {
          var e = function e(e, n, r) {
            if (this instanceof t) {
              switch (arguments.length) {
                case 0:
                  return new t();

                case 1:
                  return new t(e);

                case 2:
                  return new t(e, n);
              }

              return new t(e, n, r);
            }

            return t.apply(this, arguments);
          };

          return e[s] = t[s], e;
        }(d) : m && "function" == typeof d ? i(Function.call, d) : d, m && ((b.virtual || (b.virtual = {}))[f] = d, t & c.R && M && !M[f] && a(M, f, d)));
      };

      c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c;
    }, function (t, e) {
      t.exports = function (t) {
        try {
          return !!t();
        } catch (t) {
          return !0;
        }
      };
    }, function (t, e) {
      t.exports = !0;
    }, function (t, e) {
      t.exports = function (t, e) {
        return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: e
        };
      };
    }, function (t, e) {
      var n = 0,
          r = Math.random();

      t.exports = function (t) {
        return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + r).toString(36));
      };
    }, function (t, e) {
      t.exports = function (t) {
        if (void 0 == t) throw TypeError("Can't call method on  " + t);
        return t;
      };
    }, function (t, e) {
      t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, function (t, e) {
      t.exports = {};
    }, function (t, e, n) {
      var r = n(38),
          o = n(17);

      t.exports = Object.keys || function (t) {
        return r(t, o);
      };
    }, function (t, e) {
      e.f = {}.propertyIsEnumerable;
    }, function (t, e, n) {
      var r = n(4).f,
          o = n(3),
          i = n(8)("toStringTag");

      t.exports = function (t, e, n) {
        t && !o(t = n ? t : t.prototype, i) && r(t, i, {
          configurable: !0,
          value: e
        });
      };
    }, function (t, e, n) {
      var r = n(23)("keys"),
          o = n(15);

      t.exports = function (t) {
        return r[t] || (r[t] = o(t));
      };
    }, function (t, e, n) {
      var r = n(5),
          o = n(2),
          i = "__core-js_shared__",
          a = o[i] || (o[i] = {});
      (t.exports = function (t, e) {
        return a[t] || (a[t] = void 0 !== e ? e : {});
      })("versions", []).push({
        version: r.version,
        mode: n(13) ? "pure" : "global",
        copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
      });
    }, function (t, e) {
      var n = Math.ceil,
          r = Math.floor;

      t.exports = function (t) {
        return isNaN(t = +t) ? 0 : (t > 0 ? r : n)(t);
      };
    }, function (t, e, n) {
      var r = n(9);

      t.exports = function (t, e) {
        if (!r(t)) return t;
        var n, o;
        if (e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;
        if ("function" == typeof (n = t.valueOf) && !r(o = n.call(t))) return o;
        if (!e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;
        throw TypeError("Can't convert object to primitive value");
      };
    }, function (t, e, n) {
      var r = n(2),
          o = n(5),
          i = n(13),
          a = n(27),
          u = n(4).f;

      t.exports = function (t) {
        var e = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
        "_" == t.charAt(0) || t in e || u(e, t, {
          value: a.f(t)
        });
      };
    }, function (t, e, n) {
      e.f = n(8);
    }, function (t, e) {

      e.__esModule = !0, e.default = function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      };
    }, function (t, e, n) {

      function r(t) {
        return t && t.__esModule ? t : {
          default: t
        };
      }

      e.__esModule = !0;
      var o = n(46),
          i = r(o);

      e.default = function () {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), (0, i.default)(t, r.key, r);
          }
        }

        return function (e, n, r) {
          return n && t(e.prototype, n), r && t(e, r), e;
        };
      }();
    }, function (t, e) {
      var n = {}.toString;

      t.exports = function (t) {
        return n.call(t).slice(8, -1);
      };
    }, function (t, e, n) {
      var r = n(9),
          o = n(2).document,
          i = r(o) && r(o.createElement);

      t.exports = function (t) {
        return i ? o.createElement(t) : {};
      };
    }, function (t, e, n) {
      t.exports = !n(1) && !n(12)(function () {
        return 7 != Object.defineProperty(n(31)("div"), "a", {
          get: function () {
            return 7;
          }
        }).a;
      });
    }, function (t, e, n) {

      var r = n(13),
          o = n(11),
          i = n(39),
          a = n(6),
          u = n(18),
          s = n(62),
          c = n(21),
          f = n(67),
          l = n(8)("iterator"),
          d = !([].keys && "next" in [].keys()),
          p = "@@iterator",
          h = "keys",
          y = "values",
          m = function m() {
        return this;
      };

      t.exports = function (t, e, n, v, g, b, M) {
        s(n, e, v);

        var S,
            D,
            O,
            w = function w(t) {
          if (!d && t in A) return A[t];

          switch (t) {
            case h:
              return function () {
                return new n(this, t);
              };

            case y:
              return function () {
                return new n(this, t);
              };
          }

          return function () {
            return new n(this, t);
          };
        },
            T = e + " Iterator",
            x = g == y,
            _ = !1,
            A = t.prototype,
            E = A[l] || A[p] || g && A[g],
            k = E || w(g),
            L = g ? x ? w("entries") : k : void 0,
            P = "Array" == e ? A.entries || E : E;

        if (P && (O = f(P.call(new t())), O !== Object.prototype && O.next && (c(O, T, !0), r || "function" == typeof O[l] || a(O, l, m))), x && E && E.name !== y && (_ = !0, k = function () {
          return E.call(this);
        }), r && !M || !d && !_ && A[l] || a(A, l, k), u[e] = k, u[T] = m, g) if (S = {
          values: x ? k : w(y),
          keys: b ? k : w(h),
          entries: L
        }, M) for (D in S) D in A || i(A, D, S[D]);else o(o.P + o.F * (d || _), e, S);
        return S;
      };
    }, function (t, e, n) {
      var r = n(10),
          o = n(35),
          i = n(17),
          a = n(22)("IE_PROTO"),
          u = function u() {},
          s = "prototype",
          _c = function c() {
        var t,
            e = n(31)("iframe"),
            r = i.length,
            o = "<",
            a = ">";

        for (e.style.display = "none", n(59).appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write(o + "script" + a + "document.F=Object" + o + "/script" + a), t.close(), _c = t.F; r--;) delete _c[s][i[r]];

        return _c();
      };

      t.exports = Object.create || function (t, e) {
        var n;
        return null !== t ? (u[s] = r(t), n = new u(), u[s] = null, n[a] = t) : n = _c(), void 0 === e ? n : o(n, e);
      };
    }, function (t, e, n) {
      var r = n(4),
          o = n(10),
          i = n(19);
      t.exports = n(1) ? Object.defineProperties : function (t, e) {
        o(t);

        for (var n, a = i(e), u = a.length, s = 0; u > s;) r.f(t, n = a[s++], e[n]);

        return t;
      };
    }, function (t, e, n) {
      var r = n(38),
          o = n(17).concat("length", "prototype");

      e.f = Object.getOwnPropertyNames || function (t) {
        return r(t, o);
      };
    }, function (t, e) {
      e.f = Object.getOwnPropertySymbols;
    }, function (t, e, n) {
      var r = n(3),
          o = n(7),
          i = n(56)(!1),
          a = n(22)("IE_PROTO");

      t.exports = function (t, e) {
        var n,
            u = o(t),
            s = 0,
            c = [];

        for (n in u) n != a && r(u, n) && c.push(n);

        for (; e.length > s;) r(u, n = e[s++]) && (~i(c, n) || c.push(n));

        return c;
      };
    }, function (t, e, n) {
      t.exports = n(6);
    }, function (t, e, n) {
      var r = n(16);

      t.exports = function (t) {
        return Object(r(t));
      };
    }, function (t, e, n) {

      function r(t) {
        return t && t.__esModule ? t : {
          default: t
        };
      }

      function o(t, e) {
        for (t = String(t), e = e || 2; t.length < e;) t = "0" + t;

        return t;
      }

      function i(t) {
        var e = new Date(t.getFullYear(), t.getMonth(), t.getDate());
        e.setDate(e.getDate() - (e.getDay() + 6) % 7 + 3);
        var n = new Date(e.getFullYear(), 0, 4);
        n.setDate(n.getDate() - (n.getDay() + 6) % 7 + 3);
        var r = e.getTimezoneOffset() - n.getTimezoneOffset();
        e.setHours(e.getHours() - r);
        var o = (e - n) / 6048e5;
        return 1 + Math.floor(o);
      }

      function a(t) {
        var e = t.getDay();
        return 0 === e && (e = 7), e;
      }

      function u(t) {
        return null === t ? "null" : void 0 === t ? "undefined" : "object" !== ("undefined" == typeof t ? "undefined" : (0, c.default)(t)) ? "undefined" == typeof t ? "undefined" : (0, c.default)(t) : Array.isArray(t) ? "array" : {}.toString.call(t).slice(8, -1).toLowerCase();
      }

      Object.defineProperty(e, "__esModule", {
        value: !0
      });

      var s = n(49),
          c = r(s),
          f = function () {
        var t = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g,
            e = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            n = /[^-+\dA-Z]/g;
        return function (r, s, c, l) {
          if (1 !== arguments.length || "string" !== u(r) || /\d/.test(r) || (s = r, r = void 0), r = r || new Date(), r instanceof Date || (r = new Date(r)), isNaN(r)) throw TypeError("Invalid date");
          s = String(f.masks[s] || s || f.masks.default);
          var d = s.slice(0, 4);
          "UTC:" !== d && "GMT:" !== d || (s = s.slice(4), c = !0, "GMT:" === d && (l = !0));
          var p = c ? "getUTC" : "get",
              h = r[p + "Date"](),
              y = r[p + "Day"](),
              m = r[p + "Month"](),
              v = r[p + "FullYear"](),
              g = r[p + "Hours"](),
              b = r[p + "Minutes"](),
              M = r[p + "Seconds"](),
              S = r[p + "Milliseconds"](),
              D = c ? 0 : r.getTimezoneOffset(),
              O = i(r),
              w = a(r),
              T = {
            d: h,
            dd: o(h),
            ddd: f.i18n.dayNames[y],
            dddd: f.i18n.dayNames[y + 7],
            m: m + 1,
            mm: o(m + 1),
            mmm: f.i18n.monthNames[m],
            mmmm: f.i18n.monthNames[m + 12],
            yy: String(v).slice(2),
            yyyy: v,
            h: g % 12 || 12,
            hh: o(g % 12 || 12),
            H: g,
            HH: o(g),
            M: b,
            MM: o(b),
            s: M,
            ss: o(M),
            l: o(S, 3),
            L: o(Math.round(S / 10)),
            t: g < 12 ? "a" : "p",
            tt: g < 12 ? "am" : "pm",
            T: g < 12 ? "A" : "P",
            TT: g < 12 ? "AM" : "PM",
            Z: l ? "GMT" : c ? "UTC" : (String(r).match(e) || [""]).pop().replace(n, ""),
            o: (D > 0 ? "-" : "+") + o(100 * Math.floor(Math.abs(D) / 60) + Math.abs(D) % 60, 4),
            S: ["th", "st", "nd", "rd"][h % 10 > 3 ? 0 : (h % 100 - h % 10 != 10) * h % 10],
            W: O,
            N: w
          };
          return s.replace(t, function (t) {
            return t in T ? T[t] : t.slice(1, t.length - 1);
          });
        };
      }();

      f.masks = {
        default: "ddd mmm dd yyyy HH:MM:ss",
        shortDate: "m/d/yy",
        mediumDate: "mmm d, yyyy",
        longDate: "mmmm d, yyyy",
        fullDate: "dddd, mmmm d, yyyy",
        shortTime: "h:MM TT",
        mediumTime: "h:MM:ss TT",
        longTime: "h:MM:ss TT Z",
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
        expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z"
      }, f.i18n = {
        dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      }, e.default = f;
    }, function (t, e, n) {

      function r(t) {
        return t && t.__esModule ? t : {
          default: t
        };
      }

      Object.defineProperty(e, "__esModule", {
        value: !0
      });

      var o = n(45),
          i = r(o),
          a = n(28),
          u = r(a),
          s = n(29),
          c = r(s),
          f = n(44),
          l = r(f),
          d = n(43),
          p = r(d),
          h = n(41),
          y = r(h),
          m = function () {
        function t(e) {
          var n = this;
          (0, u.default)(this, t), this.element = e, this.element.setAttribute("data-has-picker", ""), this.locale = this.element.getAttribute("lang") || document.body.getAttribute("lang") || "en", this.format = this.element.getAttribute("date-format") || document.body.getAttribute("date-format") || this.element.getAttribute("data-date-format") || document.body.getAttribute("data-date-format") || "yyyy-mm-dd", this.localeText = this.getLocaleText(), (0, i.default)(this.element, {
            valueAsDate: {
              get: function () {
                if (!n.element.value) return null;
                var t = n.format || "yyyy-mm-dd",
                    e = n.element.value.match(/(\d+)/g),
                    r = 0,
                    o = {};
                return t.replace(/(yyyy|dd|mm)/g, function (t) {
                  o[t] = r++;
                }), new Date(e[o.yyyy], e[o.mm] - 1, e[o.dd]);
              },
              set: function (t) {
                n.element.value = (0, y.default)(t, n.format);
              }
            },
            valueAsNumber: {
              get: function () {
                return n.element.value ? n.element.valueAsDate.valueOf() : NaN;
              },
              set: function (t) {
                n.element.valueAsDate = new Date(t);
              }
            }
          });

          var r = function r(t) {
            var e = n.element;
            e.locale = n.localeText, l.default.attachTo(e);
          };

          this.element.addEventListener("focus", r), this.element.addEventListener("mouseup", r), this.element.addEventListener("keydown", function (t) {
            var e = new Date();

            switch (t.keyCode) {
              case 9:
              case 27:
                l.default.hide();
                break;

              case 38:
                n.element.valueAsDate && (e.setDate(n.element.valueAsDate.getDate() + 1), n.element.valueAsDate = e, l.default.pingInput());
                break;

              case 40:
                n.element.valueAsDate && (e.setDate(n.element.valueAsDate.getDate() - 1), n.element.valueAsDate = e, l.default.pingInput());
            }

            l.default.sync();
          }), this.element.addEventListener("keyup", function (t) {
            l.default.sync();
          });
        }

        return (0, c.default)(t, [{
          key: "getLocaleText",
          value: function () {
            var t = this.locale.toLowerCase();

            for (var e in p.default) {
              var n = e.split("_");
              if (n.map(function (t) {
                return t.toLowerCase();
              }), ~n.indexOf(t) || ~n.indexOf(t.substr(0, 2))) return p.default[e];
            }
          }
        }], [{
          key: "supportsDateInput",
          value: function () {
            var t = document.createElement("input");
            t.setAttribute("type", "date");
            var e = "not-a-date";
            return t.setAttribute("value", e), !(t.value === e);
          }
        }, {
          key: "addPickerToDateInputs",
          value: function () {
            var e = document.querySelectorAll('input[type="date"]:not([data-has-picker])'),
                n = e.length;
            if (!n) return !1;

            for (var r = 0; r < n; ++r) new t(e[r]);
          }
        }, {
          key: "addPickerToOtherInputs",
          value: function () {
            var e = document.querySelectorAll('input[type="text"].date-polyfill:not([data-has-picker])'),
                n = e.length;
            if (!n) return !1;

            for (var r = 0; r < n; ++r) new t(e[r]);
          }
        }]), t;
      }();

      e.default = m;
    }, function (t, e) {

      Object.defineProperty(e, "__esModule", {
        value: !0
      });
      var n = {
        "en_en-US_en-UK": {
          days: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        },
        "zh_zh-CN": {
          days: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
          months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        },
        "zh-Hans_zh-Hans-CN": {
          days: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
          months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        },
        "zh-Hant_zh-Hant-TW": {
          days: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
          months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        },
        "de_de-DE": {
          days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
          months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
        },
        "nl_nl-NL_nl-BE": {
          days: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
          months: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
          today: "Vandaag",
          format: "D/M/Y"
        },
        "pt_pt-BR": {
          days: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
          today: "Hoje"
        },
        "fr_fr-FR_fr-BE": {
          days: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
          months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
          today: "Aujourd'hui",
          format: "D/M/Y"
        },
        "es_es-VE": {
          days: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
          months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
          today: "Hoy",
          format: "D/M/Y"
        },
        "da_da-dk": {
          days: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
          months: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
          today: "I dag",
          format: "dd/MM-YYYY"
        },
        "ru_ru-RU_ru-UA_ru-KZ_ru-MD": {
          days: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
          months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
          today: "Сегодня",
          format: "D.M.Y"
        },
        "uk_uk-UA": {
          days: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
          months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
          today: "Cьогодні",
          format: "D.M.Y"
        },
        "sv_sv-SE": {
          days: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
          months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
          today: "Idag",
          format: "YYYY-MM-dd"
        },
        "test_test-TEST": {
          days: ["Foo", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          months: ["Foo", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        },
        ja: {
          days: ["日", "月", "火", "水", "木", "金", "土"],
          months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          today: "今日",
          format: "YYYY-MM-dd"
        }
      };
      e.default = n;
    }, function (t, e, n) {

      function r(t) {
        return t && t.__esModule ? t : {
          default: t
        };
      }

      Object.defineProperty(e, "__esModule", {
        value: !0
      });

      var o = n(28),
          i = r(o),
          a = n(29),
          u = r(a),
          s = function () {
        function t() {
          var e = this;
          if ((0, i.default)(this, t), window.thePicker) return window.thePicker;
          this.date = new Date(), this.input = null, this.isOpen = !1, this.container = document.createElement("date-input-polyfill"), this.year = document.createElement("select"), t.createRangeSelect(this.year, 1890, this.date.getFullYear() + 20), this.year.className = "yearSelect", this.year.addEventListener("change", function () {
            e.date.setYear(e.year.value), e.refreshDaysMatrix();
          });
          var n = document.createElement("span");
          n.className = "yearSelect-wrapper", n.appendChild(this.year), this.container.appendChild(n), this.month = document.createElement("select"), this.month.className = "monthSelect", this.month.addEventListener("change", function () {
            e.date.setMonth(e.month.value), e.refreshDaysMatrix();
          });
          var r = document.createElement("span");
          r.className = "monthSelect-wrapper", r.appendChild(this.month), this.container.appendChild(r), this.today = document.createElement("button"), this.today.textContent = "Today", this.today.addEventListener("click", function () {
            var t = new Date();
            e.date = new Date(t.getFullYear() + "/" + ("0" + (t.getMonth() + 1)).slice(-2) + "/" + ("0" + t.getDate()).slice(-2)), e.setInput();
          }), this.container.appendChild(this.today);
          var o = document.createElement("table");
          this.daysHead = document.createElement("thead"), this.days = document.createElement("tbody"), this.days.addEventListener("click", function (t) {
            var n = t.target;
            if (!n.hasAttribute("data-day")) return !1;
            var r = e.days.querySelector("[data-selected]");
            r && r.removeAttribute("data-selected"), n.setAttribute("data-selected", ""), e.date.setDate(parseInt(n.textContent)), e.setInput();
          }), o.appendChild(this.daysHead), o.appendChild(this.days), this.container.appendChild(o), this.hide(), document.body.appendChild(this.container), this.removeClickOut = function (t) {
            if (e.isOpen) {
              for (var n = t.target, r = n === e.container || n === e.input; !r && (n = n.parentNode);) r = n === e.container;

              ("date" !== t.target.getAttribute("type") && !r || !r) && e.hide();
            }
          }, this.removeBlur = function (t) {
            e.isOpen && e.hide();
          };
        }

        return (0, u.default)(t, [{
          key: "hide",
          value: function () {
            this.container.setAttribute("data-open", this.isOpen = !1), this.input && this.input.blur(), document.removeEventListener("mousedown", this.removeClickOut), document.removeEventListener("touchstart", this.removeClickOut);
          }
        }, {
          key: "show",
          value: function () {
            var t = this;
            this.container.setAttribute("data-open", this.isOpen = !0), setTimeout(function () {
              document.addEventListener("mousedown", t.removeClickOut), document.addEventListener("touchstart", t.removeClickOut);
            }, 500), window.onpopstate = function () {
              t.hide();
            };
          }
        }, {
          key: "goto",
          value: function (t) {
            var e = this,
                n = t.getBoundingClientRect();
            this.container.style.top = n.top + n.height + (document.documentElement.scrollTop || document.body.scrollTop) + 3 + "px";

            var r = this.container.getBoundingClientRect(),
                o = r.width ? r.width : 280,
                i = function i() {
              return e.container.className.replace("polyfill-left-aligned", "").replace("polyfill-right-aligned", "").replace(/\s+/g, " ").trim();
            },
                a = n.right - o;

            n.right < o ? (a = n.left, this.container.className = i() + " polyfill-left-aligned") : this.container.className = i() + " polyfill-right-aligned", this.container.style.left = a + (document.documentElement.scrollLeft || document.body.scrollLeft) + "px", this.show();
          }
        }, {
          key: "attachTo",
          value: function (t) {
            return !(t === this.input && this.isOpen || (this.input = t, this.refreshLocale(), this.sync(), this.goto(this.input), 0));
          }
        }, {
          key: "sync",
          value: function () {
            isNaN(Date.parse(this.input.valueAsDate)) ? this.date = new Date() : this.date = t.absoluteDate(this.input.valueAsDate), this.year.value = this.date.getFullYear(), this.month.value = this.date.getMonth(), this.refreshDaysMatrix();
          }
        }, {
          key: "setInput",
          value: function () {
            var t = this;
            this.input.valueAsDate = this.date, this.input.focus(), setTimeout(function () {
              t.hide();
            }, 100), this.pingInput();
          }
        }, {
          key: "refreshLocale",
          value: function () {
            if (this.locale === this.input.locale) return !1;
            this.locale = this.input.locale, this.today.textContent = this.locale.today || "Today";

            for (var e = ["<tr>"], n = 0, r = this.locale.days.length; n < r; ++n) e.push('<th scope="col">' + this.locale.days[n] + "</th>");

            this.daysHead.innerHTML = e.join(""), t.createRangeSelect(this.month, 0, 11, this.locale.months);
          }
        }, {
          key: "refreshDaysMatrix",
          value: function () {
            this.refreshLocale();

            for (var e = this.date.getFullYear(), n = this.date.getMonth(), r = new Date(e, n, 1).getDay(), o = new Date(this.date.getFullYear(), n + 1, 0).getDate(), i = t.absoluteDate(this.input.valueAsDate) || !1, a = i && e === i.getFullYear() && n === i.getMonth(), u = [], s = 0; s < o + r; ++s) if (s % 7 === 0 && u.push("\n          " + (0 !== s ? "</tr>" : "") + "\n          <tr>\n        "), s + 1 <= r) u.push("<td></td>");else {
              var c = s + 1 - r,
                  f = a && i.getDate() === c;
              u.push("<td data-day " + (f ? "data-selected" : "") + ">\n          " + c + "\n        </td>");
            }

            this.days.innerHTML = u.join("");
          }
        }, {
          key: "pingInput",
          value: function () {
            var t = void 0,
                e = void 0;

            try {
              t = new Event("input"), e = new Event("change");
            } catch (n) {
              t = document.createEvent("KeyboardEvent"), t.initEvent("input", !0, !1), e = document.createEvent("KeyboardEvent"), e.initEvent("change", !0, !1);
            }

            this.input.dispatchEvent(t), this.input.dispatchEvent(e);
          }
        }], [{
          key: "createRangeSelect",
          value: function (t, e, n, r) {
            t.innerHTML = "";

            for (var o = e; o <= n; ++o) {
              var i = document.createElement("option");
              t.appendChild(i);
              var a = r ? r[o - e] : o;
              i.text = a, i.value = o;
            }

            return t;
          }
        }, {
          key: "absoluteDate",
          value: function (t) {
            return t && new Date(t.getTime() + 60 * t.getTimezoneOffset() * 1e3);
          }
        }]), t;
      }();

      window.thePicker = new s(), e.default = window.thePicker;
    }, function (t, e, n) {
      t.exports = {
        default: n(50),
        __esModule: !0
      };
    }, function (t, e, n) {
      t.exports = {
        default: n(51),
        __esModule: !0
      };
    }, function (t, e, n) {
      t.exports = {
        default: n(52),
        __esModule: !0
      };
    }, function (t, e, n) {
      t.exports = {
        default: n(53),
        __esModule: !0
      };
    }, function (t, e, n) {

      function r(t) {
        return t && t.__esModule ? t : {
          default: t
        };
      }

      e.__esModule = !0;
      var o = n(48),
          i = r(o),
          a = n(47),
          u = r(a),
          s = "function" == typeof u.default && "symbol" == typeof i.default ? function (t) {
        return typeof t;
      } : function (t) {
        return t && "function" == typeof u.default && t.constructor === u.default && t !== u.default.prototype ? "symbol" : typeof t;
      };
      e.default = "function" == typeof u.default && "symbol" === s(i.default) ? function (t) {
        return "undefined" == typeof t ? "undefined" : s(t);
      } : function (t) {
        return t && "function" == typeof u.default && t.constructor === u.default && t !== u.default.prototype ? "symbol" : "undefined" == typeof t ? "undefined" : s(t);
      };
    }, function (t, e, n) {
      n(72);
      var r = n(5).Object;

      t.exports = function (t, e) {
        return r.defineProperties(t, e);
      };
    }, function (t, e, n) {
      n(73);
      var r = n(5).Object;

      t.exports = function (t, e, n) {
        return r.defineProperty(t, e, n);
      };
    }, function (t, e, n) {
      n(76), n(74), n(77), n(78), t.exports = n(5).Symbol;
    }, function (t, e, n) {
      n(75), n(79), t.exports = n(27).f("iterator");
    }, function (t, e) {
      t.exports = function (t) {
        if ("function" != typeof t) throw TypeError(t + " is not a function!");
        return t;
      };
    }, function (t, e) {
      t.exports = function () {};
    }, function (t, e, n) {
      var r = n(7),
          o = n(70),
          i = n(69);

      t.exports = function (t) {
        return function (e, n, a) {
          var u,
              s = r(e),
              c = o(s.length),
              f = i(a, c);

          if (t && n != n) {
            for (; c > f;) if (u = s[f++], u != u) return !0;
          } else for (; c > f; f++) if ((t || f in s) && s[f] === n) return t || f || 0;

          return !t && -1;
        };
      };
    }, function (t, e, n) {
      var r = n(54);

      t.exports = function (t, e, n) {
        if (r(t), void 0 === e) return t;

        switch (n) {
          case 1:
            return function (n) {
              return t.call(e, n);
            };

          case 2:
            return function (n, r) {
              return t.call(e, n, r);
            };

          case 3:
            return function (n, r, o) {
              return t.call(e, n, r, o);
            };
        }

        return function () {
          return t.apply(e, arguments);
        };
      };
    }, function (t, e, n) {
      var r = n(19),
          o = n(37),
          i = n(20);

      t.exports = function (t) {
        var e = r(t),
            n = o.f;
        if (n) for (var a, u = n(t), s = i.f, c = 0; u.length > c;) s.call(t, a = u[c++]) && e.push(a);
        return e;
      };
    }, function (t, e, n) {
      var r = n(2).document;
      t.exports = r && r.documentElement;
    }, function (t, e, n) {
      var r = n(30);
      t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
        return "String" == r(t) ? t.split("") : Object(t);
      };
    }, function (t, e, n) {
      var r = n(30);

      t.exports = Array.isArray || function (t) {
        return "Array" == r(t);
      };
    }, function (t, e, n) {

      var r = n(34),
          o = n(14),
          i = n(21),
          a = {};
      n(6)(a, n(8)("iterator"), function () {
        return this;
      }), t.exports = function (t, e, n) {
        t.prototype = r(a, {
          next: o(1, n)
        }), i(t, e + " Iterator");
      };
    }, function (t, e) {
      t.exports = function (t, e) {
        return {
          value: e,
          done: !!t
        };
      };
    }, function (t, e, n) {
      var r = n(15)("meta"),
          o = n(9),
          i = n(3),
          a = n(4).f,
          u = 0,
          s = Object.isExtensible || function () {
        return !0;
      },
          c = !n(12)(function () {
        return s(Object.preventExtensions({}));
      }),
          f = function f(t) {
        a(t, r, {
          value: {
            i: "O" + ++u,
            w: {}
          }
        });
      },
          l = function l(t, e) {
        if (!o(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;

        if (!i(t, r)) {
          if (!s(t)) return "F";
          if (!e) return "E";
          f(t);
        }

        return t[r].i;
      },
          d = function d(t, e) {
        if (!i(t, r)) {
          if (!s(t)) return !0;
          if (!e) return !1;
          f(t);
        }

        return t[r].w;
      },
          p = function p(t) {
        return c && h.NEED && s(t) && !i(t, r) && f(t), t;
      },
          h = t.exports = {
        KEY: r,
        NEED: !1,
        fastKey: l,
        getWeak: d,
        onFreeze: p
      };
    }, function (t, e, n) {
      var r = n(20),
          o = n(14),
          i = n(7),
          a = n(25),
          u = n(3),
          s = n(32),
          c = Object.getOwnPropertyDescriptor;
      e.f = n(1) ? c : function (t, e) {
        if (t = i(t), e = a(e, !0), s) try {
          return c(t, e);
        } catch (t) {}
        if (u(t, e)) return o(!r.f.call(t, e), t[e]);
      };
    }, function (t, e, n) {
      var r = n(7),
          o = n(36).f,
          i = {}.toString,
          a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
          u = function u(t) {
        try {
          return o(t);
        } catch (t) {
          return a.slice();
        }
      };

      t.exports.f = function (t) {
        return a && "[object Window]" == i.call(t) ? u(t) : o(r(t));
      };
    }, function (t, e, n) {
      var r = n(3),
          o = n(40),
          i = n(22)("IE_PROTO"),
          a = Object.prototype;

      t.exports = Object.getPrototypeOf || function (t) {
        return t = o(t), r(t, i) ? t[i] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? a : null;
      };
    }, function (t, e, n) {
      var r = n(24),
          o = n(16);

      t.exports = function (t) {
        return function (e, n) {
          var i,
              a,
              u = String(o(e)),
              s = r(n),
              c = u.length;
          return s < 0 || s >= c ? t ? "" : void 0 : (i = u.charCodeAt(s), i < 55296 || i > 56319 || s + 1 === c || (a = u.charCodeAt(s + 1)) < 56320 || a > 57343 ? t ? u.charAt(s) : i : t ? u.slice(s, s + 2) : (i - 55296 << 10) + (a - 56320) + 65536);
        };
      };
    }, function (t, e, n) {
      var r = n(24),
          o = Math.max,
          i = Math.min;

      t.exports = function (t, e) {
        return t = r(t), t < 0 ? o(t + e, 0) : i(t, e);
      };
    }, function (t, e, n) {
      var r = n(24),
          o = Math.min;

      t.exports = function (t) {
        return t > 0 ? o(r(t), 9007199254740991) : 0;
      };
    }, function (t, e, n) {

      var r = n(55),
          o = n(63),
          i = n(18),
          a = n(7);
      t.exports = n(33)(Array, "Array", function (t, e) {
        this._t = a(t), this._i = 0, this._k = e;
      }, function () {
        var t = this._t,
            e = this._k,
            n = this._i++;
        return !t || n >= t.length ? (this._t = void 0, o(1)) : "keys" == e ? o(0, n) : "values" == e ? o(0, t[n]) : o(0, [n, t[n]]);
      }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries");
    }, function (t, e, n) {
      var r = n(11);
      r(r.S + r.F * !n(1), "Object", {
        defineProperties: n(35)
      });
    }, function (t, e, n) {
      var r = n(11);
      r(r.S + r.F * !n(1), "Object", {
        defineProperty: n(4).f
      });
    }, function (t, e) {}, function (t, e, n) {

      var r = n(68)(!0);
      n(33)(String, "String", function (t) {
        this._t = String(t), this._i = 0;
      }, function () {
        var t,
            e = this._t,
            n = this._i;
        return n >= e.length ? {
          value: void 0,
          done: !0
        } : (t = r(e, n), this._i += t.length, {
          value: t,
          done: !1
        });
      });
    }, function (t, e, n) {

      var r = n(2),
          o = n(3),
          i = n(1),
          a = n(11),
          u = n(39),
          s = n(64).KEY,
          c = n(12),
          f = n(23),
          l = n(21),
          d = n(15),
          p = n(8),
          h = n(27),
          y = n(26),
          m = n(58),
          v = n(61),
          g = n(10),
          b = n(9),
          M = n(40),
          S = n(7),
          D = n(25),
          O = n(14),
          w = n(34),
          T = n(66),
          x = n(65),
          _ = n(37),
          A = n(4),
          E = n(19),
          k = x.f,
          L = A.f,
          P = T.f,
          j = r.Symbol,
          N = r.JSON,
          C = N && N.stringify,
          F = "prototype",
          J = p("_hidden"),
          H = p("toPrimitive"),
          I = {}.propertyIsEnumerable,
          Y = f("symbol-registry"),
          z = f("symbols"),
          R = f("op-symbols"),
          W = Object[F],
          G = "function" == typeof j && !!_.f,
          U = r.QObject,
          V = !U || !U[F] || !U[F].findChild,
          B = i && c(function () {
        return 7 != w(L({}, "a", {
          get: function () {
            return L(this, "a", {
              value: 7
            }).a;
          }
        })).a;
      }) ? function (t, e, n) {
        var r = k(W, e);
        r && delete W[e], L(t, e, n), r && t !== W && L(W, e, r);
      } : L,
          Z = function Z(t) {
        var e = z[t] = w(j[F]);
        return e._k = t, e;
      },
          K = G && "symbol" == typeof j.iterator ? function (t) {
        return "symbol" == typeof t;
      } : function (t) {
        return t instanceof j;
      },
          q = function q(t, e, n) {
        return t === W && q(R, e, n), g(t), e = D(e, !0), g(n), o(z, e) ? (n.enumerable ? (o(t, J) && t[J][e] && (t[J][e] = !1), n = w(n, {
          enumerable: O(0, !1)
        })) : (o(t, J) || L(t, J, O(1, {})), t[J][e] = !0), B(t, e, n)) : L(t, e, n);
      },
          Q = function Q(t, e) {
        g(t);

        for (var n, r = m(e = S(e)), o = 0, i = r.length; i > o;) q(t, n = r[o++], e[n]);

        return t;
      },
          X = function X(t, e) {
        return void 0 === e ? w(t) : Q(w(t), e);
      },
          $ = function $(t) {
        var e = I.call(this, t = D(t, !0));
        return !(this === W && o(z, t) && !o(R, t)) && (!(e || !o(this, t) || !o(z, t) || o(this, J) && this[J][t]) || e);
      },
          tt = function tt(t, e) {
        if (t = S(t), e = D(e, !0), t !== W || !o(z, e) || o(R, e)) {
          var n = k(t, e);
          return !n || !o(z, e) || o(t, J) && t[J][e] || (n.enumerable = !0), n;
        }
      },
          et = function et(t) {
        for (var e, n = P(S(t)), r = [], i = 0; n.length > i;) o(z, e = n[i++]) || e == J || e == s || r.push(e);

        return r;
      },
          nt = function nt(t) {
        for (var e, n = t === W, r = P(n ? R : S(t)), i = [], a = 0; r.length > a;) !o(z, e = r[a++]) || n && !o(W, e) || i.push(z[e]);

        return i;
      };

      G || (j = function () {
        if (this instanceof j) throw TypeError("Symbol is not a constructor!");

        var t = d(arguments.length > 0 ? arguments[0] : void 0),
            e = function e(n) {
          this === W && e.call(R, n), o(this, J) && o(this[J], t) && (this[J][t] = !1), B(this, t, O(1, n));
        };

        return i && V && B(W, t, {
          configurable: !0,
          set: e
        }), Z(t);
      }, u(j[F], "toString", function () {
        return this._k;
      }), x.f = tt, A.f = q, n(36).f = T.f = et, n(20).f = $, _.f = nt, i && !n(13) && u(W, "propertyIsEnumerable", $, !0), h.f = function (t) {
        return Z(p(t));
      }), a(a.G + a.W + a.F * !G, {
        Symbol: j
      });

      for (var rt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ot = 0; rt.length > ot;) p(rt[ot++]);

      for (var it = E(p.store), at = 0; it.length > at;) y(it[at++]);

      a(a.S + a.F * !G, "Symbol", {
        for: function (t) {
          return o(Y, t += "") ? Y[t] : Y[t] = j(t);
        },
        keyFor: function (t) {
          if (!K(t)) throw TypeError(t + " is not a symbol!");

          for (var e in Y) if (Y[e] === t) return e;
        },
        useSetter: function () {
          V = !0;
        },
        useSimple: function () {
          V = !1;
        }
      }), a(a.S + a.F * !G, "Object", {
        create: X,
        defineProperty: q,
        defineProperties: Q,
        getOwnPropertyDescriptor: tt,
        getOwnPropertyNames: et,
        getOwnPropertySymbols: nt
      });
      var ut = c(function () {
        _.f(1);
      });
      a(a.S + a.F * ut, "Object", {
        getOwnPropertySymbols: function (t) {
          return _.f(M(t));
        }
      }), N && a(a.S + a.F * (!G || c(function () {
        var t = j();
        return "[null]" != C([t]) || "{}" != C({
          a: t
        }) || "{}" != C(Object(t));
      })), "JSON", {
        stringify: function (t) {
          for (var e, n, r = [t], o = 1; arguments.length > o;) r.push(arguments[o++]);

          if (n = e = r[1], (b(e) || void 0 !== t) && !K(t)) return v(e) || (e = function (t, e) {
            if ("function" == typeof n && (e = n.call(this, t, e)), !K(e)) return e;
          }), r[1] = e, C.apply(N, r);
        }
      }), j[F][H] || n(6)(j[F], H, j[F].valueOf), l(j, "Symbol"), l(Math, "Math", !0), l(r.JSON, "JSON", !0);
    }, function (t, e, n) {
      n(26)("asyncIterator");
    }, function (t, e, n) {
      n(26)("observable");
    }, function (t, e, n) {
      n(71);

      for (var r = n(2), o = n(6), i = n(18), a = n(8)("toStringTag"), u = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), s = 0; s < u.length; s++) {
        var c = u[s],
            f = r[c],
            l = f && f.prototype;
        l && !l[a] && o(l, a, c), i[c] = i.Array;
      }
    }]);
  });
});
var dateInputPolyfill_dist$1 = unwrapExports(dateInputPolyfill_dist);

export default dateInputPolyfill_dist$1;
export { dateInputPolyfill_dist as __moduleExports };
