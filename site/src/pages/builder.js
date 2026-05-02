!(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return (e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports);
  }
  ((n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      ("undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 }));
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function (t) {
              return e[t];
            }.bind(null, o),
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return (n.d(t, "a", t), t);
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 8)));
})({
  6: function (e, t, n) {
    (function (e) {
      (!(function (e) {
        var t = (function () {
            try {
              return !!Symbol.iterator;
            } catch (e) {
              return !1;
            }
          })(),
          n = function (e) {
            var n = {
              next: function () {
                var t = e.shift();
                return { done: void 0 === t, value: t };
              },
            };
            return (
              t &&
                (n[Symbol.iterator] = function () {
                  return n;
                }),
              n
            );
          },
          r = function (e) {
            return encodeURIComponent(e).replace(/%20/g, "+");
          },
          o = function (e) {
            return decodeURIComponent(String(e).replace(/\+/g, " "));
          };
        (function () {
          try {
            var t = e.URLSearchParams;
            return (
              "a=1" === new t("?a=1").toString() &&
              "function" == typeof t.prototype.set &&
              "function" == typeof t.prototype.entries
            );
          } catch (e) {
            return !1;
          }
        })() ||
          (function () {
            var o = function (e) {
                Object.defineProperty(this, "_entries", {
                  writable: !0,
                  value: {},
                });
                var t = typeof e;
                if ("undefined" === t);
                else if ("string" === t) "" !== e && this._fromString(e);
                else if (e instanceof o) {
                  var n = this;
                  e.forEach(function (e, t) {
                    n.append(t, e);
                  });
                } else {
                  if (null === e || "object" !== t)
                    throw new TypeError(
                      "Unsupported input's type for URLSearchParams",
                    );
                  if ("[object Array]" === Object.prototype.toString.call(e))
                    for (var r = 0; r < e.length; r++) {
                      var i = e[r];
                      if (
                        "[object Array]" !==
                          Object.prototype.toString.call(i) &&
                        2 === i.length
                      )
                        throw new TypeError(
                          "Expected [string, any] as entry at index " +
                            r +
                            " of URLSearchParams's input",
                        );
                      this.append(i[0], i[1]);
                    }
                  else
                    for (var a in e)
                      e.hasOwnProperty(a) && this.append(a, e[a]);
                }
              },
              i = o.prototype;
            ((i.append = function (e, t) {
              e in this._entries
                ? this._entries[e].push(String(t))
                : (this._entries[e] = [String(t)]);
            }),
              (i.delete = function (e) {
                delete this._entries[e];
              }),
              (i.get = function (e) {
                return e in this._entries ? this._entries[e][0] : null;
              }),
              (i.getAll = function (e) {
                return e in this._entries ? this._entries[e].slice(0) : [];
              }),
              (i.has = function (e) {
                return e in this._entries;
              }),
              (i.set = function (e, t) {
                this._entries[e] = [String(t)];
              }),
              (i.forEach = function (e, t) {
                var n;
                for (var r in this._entries)
                  if (this._entries.hasOwnProperty(r)) {
                    n = this._entries[r];
                    for (var o = 0; o < n.length; o++) e.call(t, n[o], r, this);
                  }
              }),
              (i.keys = function () {
                var e = [];
                return (
                  this.forEach(function (t, n) {
                    e.push(n);
                  }),
                  n(e)
                );
              }),
              (i.values = function () {
                var e = [];
                return (
                  this.forEach(function (t) {
                    e.push(t);
                  }),
                  n(e)
                );
              }),
              (i.entries = function () {
                var e = [];
                return (
                  this.forEach(function (t, n) {
                    e.push([n, t]);
                  }),
                  n(e)
                );
              }),
              t && (i[Symbol.iterator] = i.entries),
              (i.toString = function () {
                var e = [];
                return (
                  this.forEach(function (t, n) {
                    e.push(r(n) + "=" + r(t));
                  }),
                  e.join("&")
                );
              }),
              (e.URLSearchParams = o));
          })();
        var i = e.URLSearchParams.prototype;
        ("function" != typeof i.sort &&
          (i.sort = function () {
            var e = this,
              t = [];
            (this.forEach(function (n, r) {
              (t.push([r, n]), e._entries || e.delete(r));
            }),
              t.sort(function (e, t) {
                return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : 0;
              }),
              e._entries && (e._entries = {}));
            for (var n = 0; n < t.length; n++) this.append(t[n][0], t[n][1]);
          }),
          "function" != typeof i._fromString &&
            Object.defineProperty(i, "_fromString", {
              enumerable: !1,
              configurable: !1,
              writable: !1,
              value: function (e) {
                if (this._entries) this._entries = {};
                else {
                  var t = [];
                  this.forEach(function (e, n) {
                    t.push(n);
                  });
                  for (var n = 0; n < t.length; n++) this.delete(t[n]);
                }
                var r,
                  i = (e = e.replace(/^\?/, "")).split("&");
                for (n = 0; n < i.length; n++)
                  ((r = i[n].split("=")),
                    this.append(o(r[0]), r.length > 1 ? o(r[1]) : ""));
              },
            }));
      })(
        void 0 !== e
          ? e
          : "undefined" != typeof window
            ? window
            : "undefined" != typeof self
              ? self
              : this,
      ),
        (function (e) {
          if (
            ((function () {
              try {
                var t = new e.URL("b", "http://a");
                return (
                  (t.pathname = "c d"),
                  "http://a/c%20d" === t.href && t.searchParams
                );
              } catch (e) {
                return !1;
              }
            })() ||
              (function () {
                var t = e.URL,
                  n = function (t, n) {
                    ("string" != typeof t && (t = String(t)),
                      n && "string" != typeof n && (n = String(n)));
                    var r,
                      o = document;
                    if (n && (void 0 === e.location || n !== e.location.href)) {
                      ((n = n.toLowerCase()),
                        ((r = (o =
                          document.implementation.createHTMLDocument(
                            "",
                          )).createElement("base")).href = n),
                        o.head.appendChild(r));
                      try {
                        if (0 !== r.href.indexOf(n)) throw new Error(r.href);
                      } catch (e) {
                        throw new Error(
                          "URL unable to set base " + n + " due to " + e,
                        );
                      }
                    }
                    var i = o.createElement("a");
                    ((i.href = t),
                      r && (o.body.appendChild(i), (i.href = i.href)));
                    var a = o.createElement("input");
                    if (
                      ((a.type = "url"),
                      (a.value = t),
                      ":" === i.protocol ||
                        !/:/.test(i.href) ||
                        (!a.checkValidity() && !n))
                    )
                      throw new TypeError("Invalid URL");
                    Object.defineProperty(this, "_anchorElement", { value: i });
                    var c = new e.URLSearchParams(this.search),
                      s = !0,
                      u = !0,
                      l = this;
                    (["append", "delete", "set"].forEach(function (e) {
                      var t = c[e];
                      c[e] = function () {
                        (t.apply(c, arguments),
                          s && ((u = !1), (l.search = c.toString()), (u = !0)));
                      };
                    }),
                      Object.defineProperty(this, "searchParams", {
                        value: c,
                        enumerable: !0,
                      }));
                    var f = void 0;
                    Object.defineProperty(this, "_updateSearchParams", {
                      enumerable: !1,
                      configurable: !1,
                      writable: !1,
                      value: function () {
                        this.search !== f &&
                          ((f = this.search),
                          u &&
                            ((s = !1),
                            this.searchParams._fromString(this.search),
                            (s = !0)));
                      },
                    });
                  },
                  r = n.prototype;
                (["hash", "host", "hostname", "port", "protocol"].forEach(
                  function (e) {
                    !(function (e) {
                      Object.defineProperty(r, e, {
                        get: function () {
                          return this._anchorElement[e];
                        },
                        set: function (t) {
                          this._anchorElement[e] = t;
                        },
                        enumerable: !0,
                      });
                    })(e);
                  },
                ),
                  Object.defineProperty(r, "search", {
                    get: function () {
                      return this._anchorElement.search;
                    },
                    set: function (e) {
                      ((this._anchorElement.search = e),
                        this._updateSearchParams());
                    },
                    enumerable: !0,
                  }),
                  Object.defineProperties(r, {
                    toString: {
                      get: function () {
                        var e = this;
                        return function () {
                          return e.href;
                        };
                      },
                    },
                    href: {
                      get: function () {
                        return this._anchorElement.href.replace(/\?$/, "");
                      },
                      set: function (e) {
                        ((this._anchorElement.href = e),
                          this._updateSearchParams());
                      },
                      enumerable: !0,
                    },
                    pathname: {
                      get: function () {
                        return this._anchorElement.pathname.replace(
                          /(^\/?)/,
                          "/",
                        );
                      },
                      set: function (e) {
                        this._anchorElement.pathname = e;
                      },
                      enumerable: !0,
                    },
                    origin: {
                      get: function () {
                        var e = { "http:": 80, "https:": 443, "ftp:": 21 }[
                            this._anchorElement.protocol
                          ],
                          t =
                            this._anchorElement.port != e &&
                            "" !== this._anchorElement.port;
                        return (
                          this._anchorElement.protocol +
                          "//" +
                          this._anchorElement.hostname +
                          (t ? ":" + this._anchorElement.port : "")
                        );
                      },
                      enumerable: !0,
                    },
                    password: {
                      get: function () {
                        return "";
                      },
                      set: function (e) {},
                      enumerable: !0,
                    },
                    username: {
                      get: function () {
                        return "";
                      },
                      set: function (e) {},
                      enumerable: !0,
                    },
                  }),
                  (n.createObjectURL = function (e) {
                    return t.createObjectURL.apply(t, arguments);
                  }),
                  (n.revokeObjectURL = function (e) {
                    return t.revokeObjectURL.apply(t, arguments);
                  }),
                  (e.URL = n));
              })(),
            void 0 !== e.location && !("origin" in e.location))
          ) {
            var t = function () {
              return (
                e.location.protocol +
                "//" +
                e.location.hostname +
                (e.location.port ? ":" + e.location.port : "")
              );
            };
            try {
              Object.defineProperty(e.location, "origin", {
                get: t,
                enumerable: !0,
              });
            } catch (n) {
              setInterval(function () {
                e.location.origin = t();
              }, 100);
            }
          }
        })(
          void 0 !== e
            ? e
            : "undefined" != typeof window
              ? window
              : "undefined" != typeof self
                ? self
                : this,
        ));
    }).call(this, n(7));
  },
  7: function (e, t) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (n = window);
    }
    e.exports = n;
  },
  8: function (e, t, n) {
    "use strict";
    n.r(t);
    var r = {};
    (n.r(r),
      n.d(r, "getTarget", function () {
        return v;
      }),
      n.d(r, "isUrlMatch", function () {
        return h;
      }),
      n.d(r, "isMatch", function () {
        return g;
      }),
      n.d(r, "isMatchNode", function () {
        return m;
      }),
      n.d(r, "isUnaryLogicalNode", function () {
        return y;
      }),
      n.d(r, "optimizeLogicalNode", function () {
        return b;
      }));
    var o = {};
    (n.r(o),
      n.d(o, "StatsType", function () {
        return u;
      }),
      n.d(o, "TimeWindowType", function () {
        return l;
      }),
      n.d(o, "StorageType", function () {
        return f;
      }),
      n.d(o, "CompareType", function () {
        return d;
      }));
    var i = {};
    (n.r(i),
      n.d(i, "createClientSideVariablesQueryResolver", function () {
        return P;
      }),
      n.d(i, "createServerSideVariablesClient", function () {
        return G;
      }),
      n.d(i, "createServerSideVariablesQueryResolver", function () {
        return B;
      }),
      n.d(i, "createStaticVariablesQueryResolver", function () {
        return H;
      }),
      n.d(i, "SERVER_SIDE_RESOLVERS", function () {
        return L;
      }),
      n.d(i, "CLIENT_SIDE_RESOLVERS", function () {
        return N;
      }));
    var a = {};
    (n.r(a),
      n.d(a, "createActionTableClient", function () {
        return Q;
      }));
    var c = {};
    (n.r(c),
      n.d(c, "extractBlockAPIVariable", function () {
        return mr;
      }));
    var s = {};
    (n.r(s),
      n.d(s, "createApp", function () {
        return Wi;
      }),
      n.d(s, "nextTick", function () {
        return ei;
      }),
      n.d(s, "reactive", function () {
        return qo;
      }));
    var u,
      l,
      f,
      d,
      p = {
        krt_rewrite_config: {
          apiKey: "d2926d6b073c282fa86e2fbec2f1ec5b",
          forceMatchCondition: !1,
          hasControlForAll: !1,
          trackUrl: "https://timestamp-blocks.karte.io/rewrite-timestamp/",
          staticAssetUrl: "https://cdn-blocks.karte.io/",
          isEnabledPartsAnalysis: !0,
          sampling: { isEnable: !1, userAgentWhiteList: [], rate: 100 },
          goals: [],
          pageGroups: [
            {
              pageGroupId: "693a81319706b7ab946780ef",
              urlCondition: {
                target: "origin",
                match: "exact",
                value: "https://sample-lp-with-karte-and-blocks.vercel.app",
              },
              priority: "U",
              conditions: [
                {
                  conditionId: "693a81319706b7ab946780f4",
                  priority: "~",
                  campaignPriority: "",
                  isOriginal: !0,
                  scheduleTimeRange: [],
                  segmentConditions: [],
                  dimensionCondition: [],
                  blocksSegmentCondition: { logicGate: "$and", segmentSet: [] },
                  patterns: [
                    {
                      patternId: "693a81319706b7ab946780fb",
                      proportion: 100,
                      variations: [
                        {
                          variationId: "693a814e9706b7ab946781a4",
                          areaId: "693a814e9706b7ab9467819b",
                          trackingId: "",
                          type: "original",
                          aHref: "",
                          imgUrl: "",
                          html: "",
                          text: "",
                          script: "",
                          originImgSrc: "",
                          cssSelector:
                            "#main_content > div.l-mainContent__inner > div.post_content > figure.wp-block-table > table.has-fixed-layout > tbody > tr:nth-of-type(4) > td:nth-of-type(1)",
                          elementAttributes: {},
                        },
                        {
                          variationId: "693a814eeb2f58d9d8b121f0",
                          areaId: "693a814eeb2f58d9d8b121e7",
                          trackingId: "",
                          type: "original",
                          aHref: "",
                          imgUrl: "",
                          html: "",
                          text: "",
                          script: "",
                          originImgSrc: "",
                          cssSelector:
                            "#main_content > div.l-mainContent__inner > div.post_content > figure.wp-block-table > table.has-fixed-layout > tbody > tr:nth-of-type(2) > td:nth-of-type(2) > span.swl-fz",
                          elementAttributes: {},
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              pageGroupId: "69d6035637a7eb9e34da34ff",
              urlCondition: {
                operator: "and",
                operands: [
                  {
                    target: "origin",
                    match: "exact",
                    value: "https://sample-lp-with-karte-and-blocks.vercel.app",
                  },
                  { target: "path", match: "exact", value: "/" },
                ],
              },
              priority: "~",
              conditions: [
                {
                  conditionId: "69d6035637a7eb9e34da3503",
                  priority: "g",
                  campaignPriority: "U",
                  isOriginal: !1,
                  scheduleTimeRange: ["2026-04-08T15:00:56.645Z", ""],
                  recurrenceSettings: {
                    type: "weekly",
                    distDaysAndHours: [{ start: 345600, end: 432e3 }],
                    daysOfWeek: [4],
                  },
                  segmentConditions: [],
                  dimensionCondition: [],
                  blocksSegmentCondition: { logicGate: "$and", segmentSet: [] },
                  patterns: [
                    {
                      patternId: "69d6035637a7eb9e34da350a",
                      proportion: 100,
                      variations: [
                        {
                          variationId: "69d60385634e9b8783290e0d",
                          areaId: "69d603852f1a7503aa81f214",
                          type: "blocks-element",
                          cssSelector: "body > section.hero",
                          style: "",
                          html: "%3Csection%20class%3D%22hero%22%3E%3Ch1%3E%E6%9C%A8%E6%9B%9C%E6%97%A5%E3%81%AE%E9%85%8D%E4%BF%A1%E3%81%A0%E3%82%88%EF%BC%81%3Cbr%3E%E3%83%86%E3%82%B9%E3%83%88%3C%2Fh1%3E%3Cp%3E%E3%81%93%E3%81%93%E3%81%AB%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AE%E6%A6%82%E8%A6%81%E8%AA%AC%E6%98%8E%E6%96%87%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B%E3%80%82%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AE%E3%83%A1%E3%83%AA%E3%83%83%E3%83%88%E3%82%92%E7%AB%AF%E7%9A%84%E3%81%AB%E4%BC%9D%E3%81%88%E3%82%8B%E4%B8%80%E6%96%87%E3%80%82%3C%2Fp%3E%3Ca%20class%3D%22cta-button%22%20href%3D%22%23cta%22%3E%E7%84%A1%E6%96%99%E3%83%88%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%AB%E3%82%92%E5%A7%8B%E3%82%81%E3%82%8B%3C%2Fa%3E%3C%2Fsection%3E",
                          script: "",
                          variablesQuery: [],
                          waitLatestUserData: !1,
                          aHref: "",
                          imgUrl: "",
                          originImgSrc: "",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          betaFeatures: [],
          populatedSegments: [
            {
              _id: "session_count_1",
              logicGate: "$and",
              conditions: [
                {
                  logicGate: "$or",
                  dimensionConditions: [
                    {
                      dimensionId: "session_count",
                      dimension: {
                        time: "ALL",
                        eventName: "time_window",
                        field: "SESSION.key_change",
                        calc: "SUM",
                        dataType: "number",
                        isRegex: !1,
                        isPreset: !0,
                        shortenId: "session_count",
                        _id: "session_count",
                      },
                      compare: "eq",
                      isRegex: !1,
                      value: 1,
                    },
                  ],
                },
              ],
            },
            {
              _id: "pv_in_session_1",
              logicGate: "$and",
              conditions: [
                {
                  logicGate: "$or",
                  dimensionConditions: [
                    {
                      dimensionId: "pv_count_in_session",
                      dimension: {
                        time: "SESSION",
                        eventName: "page_view",
                        field: "location.href",
                        calc: "CNT",
                        dataType: "number",
                        isRegex: !1,
                        isPreset: !0,
                        shortenId: "pv_count_in_session",
                        _id: "pv_count_in_session",
                      },
                      compare: "eq",
                      isRegex: !1,
                      value: 1,
                    },
                  ],
                },
              ],
            },
            {
              _id: "from_google",
              logicGate: "$and",
              conditions: [
                {
                  logicGate: "$or",
                  dimensionConditions: [
                    {
                      dimensionId: "landing_referrer_host",
                      dimension: {
                        time: "ALL",
                        eventName: "page_view",
                        field: "landing_referrer.host",
                        calc: "LAST",
                        dataType: "string",
                        isRegex: !1,
                        isPreset: !0,
                        shortenId: "landing_referrer_host",
                        _id: "landing_referrer_host",
                      },
                      compare: "match_partial",
                      isRegex: !1,
                      value: "google.com",
                    },
                  ],
                },
              ],
            },
            {
              _id: "from_facebook",
              logicGate: "$and",
              conditions: [
                {
                  logicGate: "$or",
                  dimensionConditions: [
                    {
                      dimensionId: "landing_referrer_host",
                      dimension: {
                        time: "ALL",
                        eventName: "page_view",
                        field: "landing_referrer.host",
                        calc: "LAST",
                        dataType: "string",
                        isRegex: !1,
                        isPreset: !0,
                        shortenId: "landing_referrer_host",
                        _id: "landing_referrer_host",
                      },
                      compare: "match_partial",
                      isRegex: !1,
                      value: "facebook.com",
                    },
                  ],
                },
              ],
            },
            {
              _id: "from_twitter",
              logicGate: "$and",
              conditions: [
                {
                  logicGate: "$or",
                  dimensionConditions: [
                    {
                      dimensionId: "landing_referrer_host",
                      dimension: {
                        time: "ALL",
                        eventName: "page_view",
                        field: "landing_referrer.host",
                        calc: "LAST",
                        dataType: "string",
                        isRegex: !1,
                        isPreset: !0,
                        shortenId: "landing_referrer_host",
                        _id: "landing_referrer_host",
                      },
                      compare: "eq",
                      isRegex: !1,
                      value: "t.co",
                    },
                  ],
                },
              ],
            },
            {
              _id: "os_iphone",
              logicGate: "$and",
              conditions: [
                {
                  logicGate: "$or",
                  dimensionConditions: [
                    {
                      dimensionId: "os",
                      dimension: {
                        time: "ALL",
                        eventName: "page_view",
                        field: "access.user-agent.platform",
                        calc: "LAST",
                        dataType: "string",
                        isRegex: !1,
                        isPreset: !0,
                        shortenId: "os",
                        _id: "os",
                      },
                      compare: "eq",
                      isRegex: !1,
                      value: "iPhone",
                    },
                  ],
                },
              ],
            },
            {
              _id: "os_android",
              logicGate: "$and",
              conditions: [
                {
                  logicGate: "$or",
                  dimensionConditions: [
                    {
                      dimensionId: "os",
                      dimension: {
                        time: "ALL",
                        eventName: "page_view",
                        field: "access.user-agent.platform",
                        calc: "LAST",
                        dataType: "string",
                        isRegex: !1,
                        isPreset: !0,
                        shortenId: "os",
                        _id: "os",
                      },
                      compare: "eq",
                      isRegex: !1,
                      value: "Android",
                    },
                  ],
                },
              ],
            },
            {
              _id: "device_pc",
              logicGate: "$and",
              conditions: [
                {
                  logicGate: "$or",
                  dimensionConditions: [
                    {
                      dimensionId: "screen_width",
                      dimension: {
                        time: "ALL",
                        eventName: "page_view",
                        field: "access.screen.width",
                        calc: "LAST",
                        dataType: "number",
                        isRegex: !1,
                        isPreset: !0,
                        shortenId: "screen_width",
                        _id: "screen_width",
                      },
                      compare: "gte",
                      isRegex: !1,
                      value: 1025,
                    },
                  ],
                },
              ],
            },
            {
              _id: "device_tablet",
              logicGate: "$and",
              conditions: [
                {
                  logicGate: "$or",
                  dimensionConditions: [
                    {
                      dimensionId: "screen_width",
                      dimension: {
                        time: "ALL",
                        eventName: "page_view",
                        field: "access.screen.width",
                        calc: "LAST",
                        dataType: "number",
                        isRegex: !1,
                        isPreset: !0,
                        shortenId: "screen_width",
                        _id: "screen_width",
                      },
                      compare: "gte",
                      isRegex: !1,
                      value: 600,
                    },
                  ],
                },
                {
                  logicGate: "$or",
                  dimensionConditions: [
                    {
                      dimensionId: "screen_width",
                      dimension: {
                        time: "ALL",
                        eventName: "page_view",
                        field: "access.screen.width",
                        calc: "LAST",
                        dataType: "number",
                        isRegex: !1,
                        isPreset: !0,
                        shortenId: "screen_width",
                        _id: "screen_width",
                      },
                      compare: "lte",
                      isRegex: !1,
                      value: 1024,
                    },
                  ],
                },
              ],
            },
            {
              _id: "device_smart_phone",
              logicGate: "$and",
              conditions: [
                {
                  logicGate: "$or",
                  dimensionConditions: [
                    {
                      dimensionId: "screen_width",
                      dimension: {
                        time: "ALL",
                        eventName: "page_view",
                        field: "access.screen.width",
                        calc: "LAST",
                        dataType: "number",
                        isRegex: !1,
                        isPreset: !0,
                        shortenId: "screen_width",
                        _id: "screen_width",
                      },
                      compare: "lte",
                      isRegex: !1,
                      value: 599,
                    },
                  ],
                },
              ],
            },
            {
              _id: "browser_chrome",
              logicGate: "$and",
              conditions: [
                {
                  logicGate: "$or",
                  dimensionConditions: [
                    {
                      dimensionId: "browser",
                      dimension: {
                        time: "ALL",
                        eventName: "page_view",
                        field: "access.user-agent.brand",
                        calc: "LAST",
                        dataType: "string",
                        isRegex: !1,
                        isPreset: !0,
                        shortenId: "browser",
                        _id: "browser",
                      },
                      compare: "eq",
                      isRegex: !1,
                      value: "Chrome",
                    },
                  ],
                },
              ],
            },
            {
              _id: "for_test",
              logicGate: "$and",
              conditions: [
                {
                  logicGate: "$or",
                  dimensionConditions: [
                    {
                      dimensionId: "hash",
                      dimension: {
                        time: "ALL",
                        eventName: "page_view",
                        field: "location.hash",
                        calc: "LAST",
                        dataType: "string",
                        isRegex: !1,
                        isPreset: !0,
                        shortenId: "hash",
                        _id: "hash",
                      },
                      compare: "eq",
                      isRegex: !1,
                      value: "test",
                    },
                  ],
                },
              ],
            },
          ],
          isEnabledDynamicBlock: !1,
          ga4Integration: {
            propertyId: "",
            sendingDistributedPatternDataEnabled: !1,
          },
        },
        dimensionConfig: {
          dimensions: [
            {
              id: "session_count",
              shortenId: "session_count",
              path: "time_window.SESSION.key_change",
              type: "SUM",
              tw: "ALL",
              dataType: "number",
              option: null,
            },
            {
              id: "pv_count_in_session",
              shortenId: "pv_count_in_session",
              path: "page_view.location.href",
              type: "CNT",
              tw: "SESSION",
              dataType: "number",
              option: null,
            },
            {
              id: "landing_referrer_host",
              shortenId: "landing_referrer_host",
              path: "page_view.landing_referrer.host",
              type: "LAST",
              tw: "ALL",
              dataType: "string",
              option: null,
            },
            {
              id: "query",
              shortenId: "query",
              path: "page_view.location.search",
              type: "LAST",
              tw: "ALL",
              dataType: "string",
              option: null,
            },
            {
              id: "os",
              shortenId: "os",
              path: "page_view.access.user-agent.platform",
              type: "LAST",
              tw: "ALL",
              dataType: "string",
              option: null,
            },
            {
              id: "screen_width",
              shortenId: "screen_width",
              path: "page_view.access.screen.width",
              type: "LAST",
              tw: "ALL",
              dataType: "number",
              option: null,
            },
            {
              id: "browser",
              shortenId: "browser",
              path: "page_view.access.user-agent.brand",
              type: "LAST",
              tw: "ALL",
              dataType: "string",
              option: null,
            },
            {
              id: "hash",
              shortenId: "hash",
              path: "page_view.location.hash",
              type: "LAST",
              tw: "ALL",
              dataType: "string",
              option: null,
            },
          ],
        },
        publicPreviewConfig: {
          baseUrl:
            "https://s3.ap-northeast-1.amazonaws.com/cdn-blocks.karte.io/public-preview",
          clientJsUrl:
            "https://admin.karte.io/blocks/static/js/public_preview_client.js",
        },
        deploymentId: "ca2a56c1-f164-4b92-84db-5b465fbf30d3",
      };
    function v(e, t) {
      var n = new URL(e);
      return "origin" === t
        ? n.origin
        : "url" === t
          ? n.origin + n.pathname + n.search + n.hash
          : "path" === t
            ? n.pathname
            : "query" === t
              ? n.search
              : "hash" === t
                ? n.hash
                : "old_url" === t
                  ? n.origin + n.pathname
                  : n.href;
    }
    function h(e, t) {
      var n = t.match,
        r = t.value,
        o = v(e, t.target);
      if (null === o) return !1;
      switch (n) {
        case "any-of-exact":
          return r.includes(o);
        case "none-of-exact":
          return !r.includes(o);
        case "any-of-partial":
          return r.some(function (e) {
            return o.includes(e);
          });
        case "none-of-partial":
          return r.every(function (e) {
            return !o.includes(e);
          });
        case "exact":
          return o === r;
        case "forward":
          return 0 === o.indexOf(r);
        case "backward":
          var i = o.length - r.length;
          return i >= 0 && o.lastIndexOf(r) === i;
        case "partial":
          return -1 !== o.indexOf(r);
        case "regex":
          try {
            return new RegExp(r).test(o);
          } catch (e) {
            return !1;
          }
        default:
          return !1;
      }
    }
    function g(e, t) {
      return m(t)
        ? h(e, t)
        : "not" === t.operator
          ? !g(e, t.operand)
          : "and" === t.operator
            ? t.operands.every(function (t) {
                return g(e, t);
              })
            : "or" === t.operator &&
              t.operands.some(function (t) {
                return g(e, t);
              });
    }
    function m(e) {
      return !Object.prototype.hasOwnProperty.call(e, "operator");
    }
    function y(e) {
      return !m(e) && "not" === e.operator;
    }
    function b(e) {
      if (m(e) || y(e)) return e;
      if (0 === e.operands.length)
        throw new Error("node.operands.length === 0");
      return 1 === e.operands.length
        ? b(e.operands[0])
        : { operator: e.operator, operands: e.operands.map(b) };
    }
    function _(e) {
      return (_ =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function w(e) {
      var t = (function (e, t) {
        if ("object" != _(e) || !e) return e;
        var n = e[Symbol.toPrimitive];
        if (void 0 !== n) {
          var r = n.call(e, t || "default");
          if ("object" != _(r)) return r;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(e);
      })(e, "string");
      return "symbol" == _(t) ? t : t + "";
    }
    function E(e, t, n) {
      return (
        (t = w(t)) in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function S(e, t, n, r, o, i, a) {
      try {
        var c = e[i](a),
          s = c.value;
      } catch (e) {
        return void n(e);
      }
      c.done ? t(s) : Promise.resolve(s).then(r, o);
    }
    function k(e) {
      return function () {
        var t = this,
          n = arguments;
        return new Promise(function (r, o) {
          var i = e.apply(t, n);
          function a(e) {
            S(i, r, o, a, c, "next", e);
          }
          function c(e) {
            S(i, r, o, a, c, "throw", e);
          }
          a(void 0);
        });
      };
    }
    function I(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    function O(e, t) {
      if (e) {
        if ("string" == typeof e) return I(e, t);
        var n = {}.toString.call(e).slice(8, -1);
        return (
          "Object" === n && e.constructor && (n = e.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? I(e, t)
              : void 0
        );
      }
    }
    function T(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          var n =
            null == e
              ? null
              : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                e["@@iterator"];
          if (null != n) {
            var r,
              o,
              i,
              a,
              c = [],
              s = !0,
              u = !1;
            try {
              if (((i = (n = n.call(e)).next), 0 === t)) {
                if (Object(n) !== n) return;
                s = !1;
              } else
                for (
                  ;
                  !(s = (r = i.call(n)).done) &&
                  (c.push(r.value), c.length !== t);
                  s = !0
                );
            } catch (e) {
              ((u = !0), (o = e));
            } finally {
              try {
                if (
                  !s &&
                  null != n.return &&
                  ((a = n.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (u) throw o;
              }
            }
            return c;
          }
        })(e, t) ||
        O(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        })()
      );
    }
    (!(function (e) {
      ((e.SUM = "SUM"),
        (e.AVG = "AVG"),
        (e.MIN = "MIN"),
        (e.MAX = "MAX"),
        (e.CNT = "CNT"),
        (e.FIRST = "FIRST"),
        (e.LAST = "LAST"),
        (e.PREV = "PREV"),
        (e.MATCH = "MATCH"),
        (e.PARTIAL_MATCH = "PARTIAL_MATCH"));
    })(u || (u = {})),
      (function (e) {
        ((e.ALL = "ALL"),
          (e.DAY = "DAY"),
          (e.WEEK = "WEEK"),
          (e.MONTH = "MONTH"),
          (e.SESSION = "SESSION"),
          (e.PREV_SESSION = "PREV_SESSION"),
          (e._TEST = "_TEST"));
      })(l || (l = {})),
      (function (e) {
        ((e[(e.MEMORY = 0)] = "MEMORY"),
          (e[(e.LOCAL_STORAGE = 1)] = "LOCAL_STORAGE"));
      })(f || (f = {})),
      (function (e) {
        ((e.LTE = "lte"),
          (e.LT = "lt"),
          (e.GTE = "gte"),
          (e.GT = "gt"),
          (e.EQ = "eq"),
          (e.NE = "ne"),
          (e.MF = "match_forward"),
          (e.MP = "match_partial"),
          (e.MB = "match_backward"),
          (e.NMF = "not_match_forward"),
          (e.NMP = "not_match_partial"),
          (e.NMB = "not_match_backward"),
          (e.AOE = "any_of_exact"),
          (e.NOE = "none_of_exact"),
          (e.AOP = "any_of_partial"),
          (e.NOP = "none_of_partial"));
      })(d || (d = {})));
    var A;
    function C(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        (t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r));
      }
      return n;
    }
    function R(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? C(Object(n), !0).forEach(function (t) {
              E(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : C(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                );
              });
      }
      return e;
    }
    function x(e, t) {
      switch (t.resolver) {
        case "action-table-row":
          return (function (e, t) {
            var n = {};
            function r() {
              return (r = k(function* (n) {
                var r = n[t.query.key];
                if ("string" != typeof r) throw new Error("invalid type");
                var o = yield e.actionTableClient.getByKey({
                  tableName: t.query.table_name,
                  key: r,
                });
                return E({}, t.name, null != o ? o : t.query.default_value);
              })).apply(this, arguments);
            }
            function o() {
              return (o = k(function* () {
                var e;
                return E(
                  {},
                  t.name,
                  null !== (e = t.preview_value) && void 0 !== e ? e : n,
                );
              })).apply(this, arguments);
            }
            return {
              resolve: function (e) {
                return r.apply(this, arguments);
              },
              resolvePreview: function () {
                return o.apply(this, arguments);
              },
              getInitial: function () {
                return E({}, t.name, n);
              },
            };
          })(e, t);
        case "action-table-rows":
          return (function (e, t) {
            var n = [];
            function r() {
              return (r = k(function* (n) {
                var r = [];
                t.query.keys.forEach(function (e) {
                  var t = n[e];
                  "string" == typeof t && r.push(t);
                });
                var o = yield e.actionTableClient.getByKeys({
                  tableName: t.query.table_name,
                  keys: r,
                });
                return E({}, t.name, o);
              })).apply(this, arguments);
            }
            function o() {
              return (o = k(function* () {
                var e;
                return E(
                  {},
                  t.name,
                  null !== (e = t.preview_value) && void 0 !== e ? e : n,
                );
              })).apply(this, arguments);
            }
            return {
              resolve: function (e) {
                return r.apply(this, arguments);
              },
              resolvePreview: function () {
                return o.apply(this, arguments);
              },
              getInitial: function () {
                return E({}, t.name, n);
              },
            };
          })(e, t);
        case "action-table-query":
          return (function (e, t) {
            var n = [];
            function r() {
              return (r = k(function* (n) {
                var r,
                  o = {};
                Object.entries(
                  null !== (r = t.query.params) && void 0 !== r ? r : {},
                ).forEach(function (e) {
                  var t = T(e, 2),
                    r = t[0],
                    i = t[1];
                  if ("string" == typeof i) {
                    var a = n[i];
                    a && (o[r] = a);
                  }
                });
                var i = yield e.actionTableClient.getByQuery({
                  tableName: t.query.table_name,
                  queryName: t.query.query_name,
                  queryParams: o,
                  queryOptions: t.query.options,
                });
                return E({}, t.name, i.length > 0 ? i : t.query.default_value);
              })).apply(this, arguments);
            }
            function o() {
              return (o = k(function* () {
                var e;
                return E(
                  {},
                  t.name,
                  null !== (e = t.preview_value) && void 0 !== e ? e : n,
                );
              })).apply(this, arguments);
            }
            return {
              resolve: function (e) {
                return r.apply(this, arguments);
              },
              resolvePreview: function () {
                return o.apply(this, arguments);
              },
              getInitial: function () {
                var e;
                return E(
                  {},
                  t.name,
                  null !== (e = t.query.placeholder_value) && void 0 !== e
                    ? e
                    : n,
                );
              },
            };
          })(e, t);
        default:
          return {
            resolve:
              ((r = k(function* () {
                return {};
              })),
              function () {
                return r.apply(this, arguments);
              }),
            resolvePreview:
              ((n = k(function* () {
                return {};
              })),
              function () {
                return n.apply(this, arguments);
              }),
            getInitial: function () {
              return {};
            },
          };
      }
      var n, r;
    }
    function P(e, t) {
      var n = t.map(function (t) {
        return x(e, t);
      });
      function r(e) {
        return e.reduce(function (e, t) {
          return R(R({}, e), t);
        }, {});
      }
      function o() {
        return (o = k(function* (e) {
          return r(
            yield Promise.all(
              n.map(function (t) {
                return t.resolve(e);
              }),
            ),
          );
        })).apply(this, arguments);
      }
      function i() {
        return (i = k(function* () {
          return r(
            yield Promise.all(
              n.map(function (e) {
                return e.resolvePreview();
              }),
            ),
          );
        })).apply(this, arguments);
      }
      return {
        resolve: function (e) {
          return o.apply(this, arguments);
        },
        resolvePreview: function () {
          return i.apply(this, arguments);
        },
        getInitial: function () {
          return r(
            n.map(function (e) {
              return e.getInitial();
            }),
          );
        },
      };
    }
    !(function (e) {
      ((e.Dummy = "dummy"),
        (e.Template = "template"),
        (e.Campaign = "campaign"),
        (e.UserData = "user-data"),
        (e.PageUserCount = "page-user-count"),
        (e.ActionTableRow = "action-table-row"),
        (e.ActionTableRows = "action-table-rows"),
        (e.ActionTableQuery = "action-table-query"),
        (e.Number = "number"),
        (e.String = "string"),
        (e.Boolean = "boolean"));
    })(A || (A = {}));
    var D = E({}, A.UserData, A.UserData),
      j = E(
        E(
          E({}, A.ActionTableRow, A.ActionTableRow),
          A.ActionTableRows,
          A.ActionTableRows,
        ),
        A.ActionTableQuery,
        A.ActionTableQuery,
      ),
      L = Object.values(D),
      N = Object.values(j);
    function K(e) {
      var t = e.storage,
        n = e.key;
      return {
        set: function (e) {
          t.setItem(n, JSON.stringify(e));
        },
        get: function () {
          try {
            var e = t.getItem(n);
            if (e) return JSON.parse(e);
          } catch (e) {}
          return {};
        },
      };
    }
    var M = "__KARTE_BLOCKS_RESOLVED_VARIABLES";
    function V(e) {
      return Object.entries(e)
        .map(function (e) {
          var t,
            n = T(e, 2),
            r = n[0],
            o = n[1],
            i = T(
              null !== (t = r.match(/^__([0-9a-zA-Z]+)__(.+)/)) && void 0 !== t
                ? t
                : [],
              3,
            );
          return [i[1], i[2], o];
        })
        .reduce(function (e, t) {
          var n = T(t, 3),
            r = n[0],
            o = n[1],
            i = n[2];
          return r && o ? (e[r] || (e[r] = {}), (e[r][o] = i), e) : e;
        }, {});
    }
    var G = function (e) {
      var t = (function (e) {
        var t,
          n,
          r = e.window,
          o = e.storageKey,
          i =
            null !== (t = K({ storage: r.localStorage, key: o }).get()) &&
            void 0 !== t
              ? t
              : {},
          a = (n = r[M])
            ? Promise.resolve(n)
            : Promise.race([
                new Promise(function (e) {
                  r.addEventListener(
                    "KARTE::BLOCKS::RESOLVE_VARIABLES",
                    function () {
                      var t = r[M];
                      e(null != t ? t : {});
                    },
                  );
                }),
                new Promise(function (e) {
                  return setTimeout(function () {
                    return e({});
                  }, 5e3);
                }),
              ]);
        return (
          a.then(function (e) {
            K({ storage: r.localStorage, key: o }).set(e);
          }),
          {
            getPrev: function () {
              return i;
            },
            getLatest: function () {
              return k(function* () {
                return yield a;
              })();
            },
          }
        );
      })({ window: e.window, storageKey: e.storageKey });
      function n() {
        return (n = k(function* (e) {
          var n = e.variationId;
          return V(e.usePreviousValue ? t.getPrev() : yield t.getLatest())[n];
        })).apply(this, arguments);
      }
      return {
        getVariables: function (e) {
          return n.apply(this, arguments);
        },
      };
    };
    function F(e) {
      return null == e || "" === e;
    }
    function U(e) {
      return L.some(function (t) {
        return e.resolver === t;
      });
    }
    function B(e, t) {
      var n = e.serverSideVariablesClient;
      function r() {
        return (r = k(function* () {
          var r = yield n.getVariables({
            variationId: e.variationId,
            usePreviousValue: e.usePreviousValue,
          });
          return Object.fromEntries(
            t.filter(U).map(function (e) {
              var t = r[e.name];
              return [e.name, F(t) ? e.query.default_value : t];
            }),
          );
        })).apply(this, arguments);
      }
      function o() {
        return (o = k(function* () {
          return Object.fromEntries(
            t.filter(U).map(function (e) {
              var t;
              return [
                e.name,
                null !== (t = e.preview_value) && void 0 !== t ? t : "",
              ];
            }),
          );
        })).apply(this, arguments);
      }
      return {
        resolve: function () {
          return r.apply(this, arguments);
        },
        resolvePreview: function () {
          return o.apply(this, arguments);
        },
        getInitial: function () {
          return Object.fromEntries(
            t.filter(U).map(function (e) {
              var t;
              return [
                e.name,
                null !== (t = e.query.placeholder_value) && void 0 !== t
                  ? t
                  : "",
              ];
            }),
          );
        },
      };
    }
    function $(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        (t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r));
      }
      return n;
    }
    function W(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? $(Object(n), !0).forEach(function (t) {
              E(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : $(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                );
              });
      }
      return e;
    }
    function H(e, t) {
      var n = t.map(function (e) {
        return (function (e, t) {
          return "number" === t.resolver ||
            "string" === t.resolver ||
            "boolean" === t.resolver
            ? {
                resolve: function () {
                  return k(function* () {
                    return E({}, t.name, t.query.value);
                  })();
                },
                resolvePreview: function () {
                  return k(function* () {
                    return E({}, t.name, t.query.value);
                  })();
                },
                getInitial: function () {
                  return E({}, t.name, t.query.value);
                },
              }
            : {
                resolve:
                  ((r = k(function* () {
                    return {};
                  })),
                  function () {
                    return r.apply(this, arguments);
                  }),
                resolvePreview:
                  ((n = k(function* () {
                    return {};
                  })),
                  function () {
                    return n.apply(this, arguments);
                  }),
                getInitial: function () {
                  return {};
                },
              };
          var n, r;
        })(0, e);
      });
      function r(e) {
        return e.reduce(function (e, t) {
          return W(W({}, e), t);
        }, {});
      }
      function o() {
        return (o = k(function* (e) {
          return r(
            yield Promise.all(
              n.map(function (t) {
                return t.resolve(e);
              }),
            ),
          );
        })).apply(this, arguments);
      }
      function i() {
        return (i = k(function* () {
          return r(
            yield Promise.all(
              n.map(function (e) {
                return e.resolvePreview();
              }),
            ),
          );
        })).apply(this, arguments);
      }
      return {
        resolve: function (e) {
          return o.apply(this, arguments);
        },
        resolvePreview: function () {
          return i.apply(this, arguments);
        },
        getInitial: function () {
          return r(
            n.map(function (e) {
              return e.getInitial();
            }),
          );
        },
      };
    }
    function q(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        (t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r));
      }
      return n;
    }
    function J(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? q(Object(n), !0).forEach(function (t) {
              E(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : q(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                );
              });
      }
      return e;
    }
    var Y = {
      development: "https://admin.karte.test/collection",
      evaluation: "https://action-table.dev-karte.com/collection",
      production: "https://action-table.karte.io/collection",
    };
    function Q(e) {
      var t = e.apiKey,
        n = e.env;
      function r(e, t) {
        return o.apply(this, arguments);
      }
      function o() {
        return (o = k(function* (e, r) {
          var o = yield fetch("".concat(Y[n]).concat(e), {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=UTF-8" },
            body: JSON.stringify(J({ api_key: t }, r)),
            mode: "evaluation" === n ? "no-cors" : void 0,
          });
          if (!o.ok) throw o;
          return yield o.json();
        })).apply(this, arguments);
      }
      function i() {
        return (i = k(function* (e) {
          var t = e.tableName,
            n = e.key;
          return yield r("/getByKey", { name: t, key: n });
        })).apply(this, arguments);
      }
      function a() {
        return (a = k(function* (e) {
          var t = e.tableName,
            n = e.keys;
          return yield r("/getByKeys", { name: t, keys: n });
        })).apply(this, arguments);
      }
      function c() {
        return (c = k(function* (e) {
          var t = e.tableName,
            n = e.queryName,
            o = e.queryParams,
            i = e.queryOptions;
          return yield r("/getByQuery", {
            name: t,
            query_name: n,
            params: o,
            options: i,
          });
        })).apply(this, arguments);
      }
      return {
        getByKey: function (e) {
          return i.apply(this, arguments);
        },
        getByKeys: function (e) {
          return a.apply(this, arguments);
        },
        getByQuery: function (e) {
          return c.apply(this, arguments);
        },
      };
    }
    var z = Object.prototype.toString,
      Z = function (e) {
        return z.call(e);
      },
      X = function (e) {
        return "[object Object]" === Z(e);
      },
      ee = {
        date: "2",
        api_token: "3",
        user_id: "4",
        email: "5",
        visitor_id: "6",
        session_id: "7",
        path: "8",
        host: "9",
        "access.os.name": "a",
        "access.os.version": "b",
        "access.os.all": "c",
        "access.engine.name": "d",
        "access.engine.version": "e",
        "access.browser.name": "f",
        "access.browser.version": "g",
        "access.browser.major": "h",
        "access.browser.all": "i",
        "access.language": "j",
        "access.screen.availWidth": "k",
        "access.screen.availHeight": "l",
        "access.screen.availTop": "m",
        "access.screen.availLeft": "n",
        "access.screen.pixelDepth": "o",
        "access.screen.colorDepth": "p",
        "access.screen.width": "q",
        "access.screen.height": "r",
        "access.referrer.protocol": "s",
        "access.referrer.host": "t",
        "access.referrer.path": "u",
        "access.referrer.anchor": "v",
        "access.in_referrer.protocol": "w",
        "access.in_referrer.host": "x",
        "access.in_referrer.path": "y",
        "access.in_referrer.anchor": "z",
        "access.land_uri.protocol": "A",
        "access.land_uri.host": "B",
        "access.land_uri.path": "C",
        "access.land_uri.anchor": "D",
        "access.uri.protocol": "E",
        "access.uri.host": "F",
        "access.uri.path": "G",
        "access.uri.anchor": "H",
        "access.title": "I",
      },
      te = function (e, t) {
        null == t && (t = "");
        for (var n = {}, r = 0, o = Object.keys(e || {}); r < o.length; r++) {
          var i = o[r],
            a = t;
          a.length > 0 ? (a += "." + i) : (a += i);
          var c = e[i];
          if (Array.isArray(c)) n[a] = c;
          else if (null !== c && "object" === _(c))
            if ("ObjectID" === c._bsontype) n[a] = c;
            else if (0 === Object.keys(c).length) n[a] = {};
            else
              for (
                var s = te(c, a), u = 0, l = Object.keys(s || {});
                u < l.length;
                u++
              ) {
                var f = l[u];
                n[f] = s[f];
              }
          else n[a] = c;
        }
        return n;
      },
      ne = function (e, t) {
        return (
          void 0 === t && (t = ee),
          (function (e, t) {
            null == t && (t = ee);
            for (
              var n = {}, r = 0, o = Object.keys(e || {});
              r < o.length;
              r++
            ) {
              var i = o[r];
              i in t ? (n[t[i]] = e[i]) : (n[i] = e[i]);
            }
            return n;
          })(te(e, null), t)
        );
      },
      re = function (e, t) {
        if (
          ("string" === t &&
            "[object String]" === Z(e) &&
            (e = e.toString().toLowerCase()),
          X(e))
        ) {
          if (
            "date" === t &&
            (function (e) {
              return "[object Date]" === Z(e);
            })(e)
          )
            return Math.round(e.getTime() / 1e3);
          for (var n = 0, r = Object.keys(e || {}); n < r.length; n++) {
            var o = r[n],
              i = e[o];
            if (-1 !== o.indexOf(".")) {
              var a = o;
              ((o = o.replace(/\./g, "_")), delete e[a]);
            }
            e[o] = re(i, t);
          }
        }
        return e;
      };
    function oe(e, t) {
      if (window.navigator)
        try {
          !(function (e, t) {
            var n = new XMLHttpRequest();
            (n.open("POST", e),
              (n.onerror = function () {
                window.console.error(
                  "[ingest.sendByXHR] error status: ".concat(n.status),
                );
              }),
              n.send(JSON.stringify(t)));
          })(e, t);
        } catch (e) {
          window.console.error(e);
        }
    }
    function ie() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
        .split("")
        .map(function (e) {
          switch (e) {
            case "x":
              return Math.floor(16 * Math.random()).toString(16);
            case "y":
              return (Math.floor(4 * Math.random()) + 8).toString(16);
            default:
              return e;
          }
        })
        .join("");
    }
    var ae = "krt___ingest.vis",
      ce = (function () {
        function e(e, t) {
          ((this.apiKey = e),
            (this.pvId = ie()),
            (this.originalPvId = this.pvId),
            (this.ingestUrl = t.ingestUrl || "https://t.karte.io/ingest"));
          var n,
            r =
              ((n = window.localStorage),
              function (e) {
                try {
                  var t = n.getItem(e);
                  if (!t) return;
                  var r = JSON.parse(t);
                  return r.expire && r.last + 63072e6 <= new Date().getTime()
                    ? void n.removeItem(e)
                    : ((r.last = new Date().getTime()),
                      n.setItem(e, JSON.stringify(r)),
                      r.val);
                } catch (e) {
                  return;
                }
              }),
            o = (function (e) {
              return function (t, n, r) {
                void 0 === r && (r = !1);
                var o = { expire: r, last: new Date().getTime(), val: n };
                try {
                  return (e.setItem(t, JSON.stringify(o)), o.val);
                } catch (e) {
                  return;
                }
              };
            })(window.localStorage);
          ((this.visitorId = r(ae) || ie()), o(ae, this.visitorId));
        }
        return (
          (e.prototype.track = function (e) {
            var t = this._createReqData(e);
            oe(this.ingestUrl, t);
          }),
          (e.prototype.trackGlobalCustomEvents = function () {
            if (
              "undefined" != typeof krt_edge_custom_events &&
              Array.isArray(krt_edge_custom_events)
            ) {
              var e = krt_edge_custom_events
                .filter(function (e) {
                  return (
                    !!X(e) &&
                    !!e.ingest &&
                    !!e.event_name &&
                    !(null != e.values && !X(e.values))
                  );
                })
                .map(function (e) {
                  var t = X(e.values) ? e.values : {};
                  return { event_name: e.event_name, values: t };
                });
              0 !== e.length && this.track(e);
            }
          }),
          (e.prototype._createReqData = function (e) {
            var t = {
              api_key: this.apiKey,
              keys: this._createKeys(),
              events: e,
              tracker_version: "0.6",
            };
            return (
              (t = re(t, "date")),
              (t = ne(t)),
              { d: JSON.stringify(t), v: "0.6", encoded: !1 }
            );
          }),
          (e.prototype._createKeys = function () {
            return {
              api_key: this.apiKey,
              visitor_id: this.visitorId,
              pv_id: this.pvId,
              original_pv_id: this.originalPvId,
            };
          }),
          e
        );
      })();
    function se() {
      return location.origin + location.pathname + location.search;
    }
    function ue(e, t) {
      var n = se();
      new MutationObserver(function (e, r) {
        var o = se();
        if (n !== o)
          return (
            t.onUrlChanged(function () {
              r.disconnect();
            }),
            void (n = o)
          );
      }).observe(e, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0,
      });
    }
    var le = (function () {
        function e(e) {
          this.storagePrefixKey = e;
        }
        return (
          (e.prototype._getObj = function () {
            var e = window.localStorage.getItem(this.storagePrefixKey) || "{}";
            return JSON.parse(e);
          }),
          (e.prototype._setObj = function (e) {
            window.localStorage.setItem(
              this.storagePrefixKey,
              JSON.stringify(e),
            );
          }),
          (e.prototype.get = function (e) {
            return this._getObj()[e];
          }),
          (e.prototype.set = function (e, t) {
            var n = this._getObj();
            ((n[e] = t), this._setObj(n));
          }),
          (e.prototype.del = function (e) {
            var t = this._getObj();
            (delete t[e], this._setObj(t));
          }),
          (e.prototype.getAll = function () {
            var e = this._getObj(),
              t = {};
            return (
              Object.keys(e).forEach(function (n) {
                t[n] = e[n];
              }),
              t
            );
          }),
          e
        );
      })(),
      fe = (function () {
        function e() {
          this.storage = {};
        }
        return (
          (e.prototype.get = function (e) {
            return this.storage[e];
          }),
          (e.prototype.set = function (e, t) {
            this.storage[e] = t;
          }),
          (e.prototype.del = function (e) {
            delete this.storage[e];
          }),
          (e.prototype.getAll = function () {
            var e = this,
              t = {};
            return (
              Object.keys(this.storage).forEach(function (n) {
                t[n] = e.storage[n];
              }),
              t
            );
          }),
          e
        );
      })();
    function de(e, t) {
      switch (e) {
        case o.StorageType.MEMORY:
          return new fe();
        case o.StorageType.LOCAL_STORAGE:
          return new le(t);
      }
      return new fe();
    }
    var pe = (function () {
      function e(e) {
        this.storage = de(e, "krtdimh");
      }
      return (
        (e.prototype.getDimensionHistoryKey = function (e, t) {
          return "d-".concat(e, "-").concat(t);
        }),
        (e.prototype.getDimensionHistory = function (e) {
          var t = this.getDimensionHistoryKey(e.id, e.tw);
          return this.getDimensionHistoryFromKey(t);
        }),
        (e.prototype.getDimensionHistoryFromKey = function (e) {
          var t = this.storage.get(e);
          return null != t ? t : [];
        }),
        (e.prototype.getDimensionHistoryWithKey = function () {
          var e = new RegExp("^d-(.+?)-(.+)$", "i"),
            t = this.storage.getAll();
          return Object.keys(t)
            .map(function (n) {
              return (
                (e.exec(n) && { id: RegExp.$1, tw: RegExp.$2, values: t[n] }) ||
                null
              );
            })
            .filter(Boolean);
        }),
        (e.prototype.setDimensionHistory = function (e, t) {
          var n = this.getDimensionHistoryKey(e.id, e.tw);
          this.storage.set(n, t);
        }),
        (e.prototype.removeDimensionHistoryFromKey = function (e) {
          this.storage.del(e);
        }),
        e
      );
    })();
    function ve() {
      return he(Date.now());
    }
    function he(e) {
      return Math.floor(e / 1e3);
    }
    var ge = (function () {
      function e(e) {
        this.storage = de(e, "krtdim");
      }
      return (
        (e.prototype.getDimensionIdKey = function (e) {
          return "d-".concat(e);
        }),
        (e.prototype.getDimension = function (e) {
          var t = this.getDimensionIdKey(e),
            n = this.storage.get(t);
          return (n || (n = { v: void 0, k: ve() }), n);
        }),
        (e.prototype.getAllDimensions = function () {
          return this.storage.getAll();
        }),
        (e.prototype.getDimensionValue = function (e) {
          return this.getDimension(e).v;
        }),
        (e.prototype.setDimension = function (e, t, n) {
          n.tw = t;
          var r = this.getDimensionIdKey(e);
          this.storage.set(r, n);
        }),
        (e.prototype.setDimensionValue = function (e, t) {
          var n = this.getDimension(e);
          n.v = t;
          var r = this.getDimensionIdKey(e);
          this.storage.set(r, n);
        }),
        (e.prototype.clearDimensionByTw = function (e) {
          var t = this,
            n = this.storage.getAll();
          Object.keys(n).forEach(function (r) {
            n[r].tw == e && t.storage.del(r);
          });
        }),
        e
      );
    })();
    function me(e) {
      return new ge(e);
    }
    var ye = (function () {
      function e(e) {
        this.storage = de(e, "krttw");
      }
      return (
        (e.prototype.getStorageKey = function (e) {
          return "t-".concat(e);
        }),
        (e.prototype.getTimeWindowKey = function (e) {
          return this.storage.get(this.getStorageKey(e));
        }),
        (e.prototype.setTimeWindowKey = function (e, t) {
          this.storage.set(this.getStorageKey(e), t);
        }),
        e
      );
    })();
    function be(e) {
      return null !== e && "number" == typeof e;
    }
    function _e(e) {
      return null !== e && "string" == typeof e;
    }
    var we,
      Ee,
      Se = new ((function () {
        function e() {}
        return (
          (e.prototype.dataType = function () {
            return "number";
          }),
          (e.prototype.initialValue = function () {
            return { v: 0, k: 0 };
          }),
          (e.prototype.calculateFromValue = function (e, t) {
            return (
              (e.s = e.s || 0),
              (e.c = e.c || 0),
              (t = be(t) ? t : 0),
              this.calculate(e.s, e.c, t)
            );
          }),
          (e.prototype.calculateFromStats = function (e, t) {
            return (
              (e.s = e.s || 0),
              (e.c = e.c || 0),
              (t.s = t.s || 0),
              (t.c = t.c || 0),
              this.calculate(e.s, e.c, t.s, t.c)
            );
          }),
          (e.prototype.gc = function (e) {
            return e;
          }),
          (e.prototype.calculate = function (e, t, n, r) {
            void 0 === r && (r = 1);
            var o = { v: 0, k: ve() };
            return ((o.s = e + n), (o.c = t + r), (o.v = o.s / o.c), o);
          }),
          e
        );
      })())(),
      ke =
        ((we = function (e, t) {
          return (we =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            })(e, t);
        }),
        function (e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Class extends value " +
                String(t) +
                " is not a constructor or null",
            );
          function n() {
            this.constructor = e;
          }
          (we(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n())));
        }),
      Ie = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (ke(t, e), t);
      })(Error),
      Oe = function (e, t, n) {
        if ("any" !== e && _(t) !== e)
          throw new Ie(
            "invalid dataType: path: "
              .concat(n, " dataType: ")
              .concat(e, " value: ")
              .concat(t),
          );
      },
      Te = new ((function () {
        function e() {}
        return (
          (e.prototype.dataType = function () {
            return "any";
          }),
          (e.prototype.initialValue = function () {
            return { v: 0, k: 0 };
          }),
          (e.prototype.calculateFromValue = function (e) {
            return this.calculate(be(e.v) ? e.v : 0);
          }),
          (e.prototype.calculateFromStats = function (e, t) {
            return this.calculate(be(e.v) ? e.v : 0, be(t.v) ? t.v : 0);
          }),
          (e.prototype.gc = function (e) {
            return e;
          }),
          (e.prototype.calculate = function (e, t) {
            void 0 === t && (t = 1);
            var n = { v: 0, k: ve() };
            return ((n.v = e + t), n);
          }),
          e
        );
      })())(),
      Ae = new ((function () {
        function e() {}
        return (
          (e.prototype.dataType = function () {
            return "any";
          }),
          (e.prototype.initialValue = function () {
            return { v: void 0, k: 0 };
          }),
          (e.prototype.calculateFromValue = function (e, t) {
            return this.calculate(e, t);
          }),
          (e.prototype.calculateFromStats = function (e, t) {
            return this.calculate(e, t.v);
          }),
          (e.prototype.gc = function (e) {
            return e;
          }),
          (e.prototype.calculate = function (e, t) {
            return null != e.v ? e : { v: t, k: ve() };
          }),
          e
        );
      })())(),
      Ce = new ((function () {
        function e() {}
        return (
          (e.prototype.dataType = function () {
            return "any";
          }),
          (e.prototype.initialValue = function () {
            return { v: void 0, k: 0 };
          }),
          (e.prototype.calculateFromValue = function (e, t) {
            return this.calculate(t);
          }),
          (e.prototype.calculateFromStats = function (e, t) {
            return this.calculate(t.v);
          }),
          (e.prototype.gc = function (e) {
            return e.length > 0 ? [e[0]] : [];
          }),
          (e.prototype.calculate = function (e) {
            return { v: e, k: ve() };
          }),
          e
        );
      })())(),
      Re = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      },
      xe = new ((function () {
        function e() {}
        return (
          (e.prototype.dataType = function () {
            return "string";
          }),
          (e.prototype.initialValue = function () {
            return { v: 0, k: 0 };
          }),
          (e.prototype.calculateFromValue = function (e, t, n) {
            if (!_e(t) || !n) return e;
            try {
              return this.match(n, t)
                ? this.calculate(e)
                : this.calculate(e, 0);
            } catch (t) {
              return (Re("Failed to calculate the stats (match).", t), e);
            }
          }),
          (e.prototype.calculateFromStats = function (e, t) {
            return this.calculate(e, t.v);
          }),
          (e.prototype.gc = function (e) {
            return e;
          }),
          (e.prototype.calculate = function (e, t) {
            (void 0 === t && (t = 1),
              (e.v = be(e.v) ? e.v : 0),
              (t = be(t) ? t : 0));
            var n = { v: 0, k: ve() };
            return ((n.v = e.v + t), n);
          }),
          (e.prototype.match = function (e, t) {
            if (!e.regex && !e.text)
              throw new Error("Match condition is not define.");
            return e.regex ? this.matchRegex(e.regex, t) : e.text === t;
          }),
          (e.prototype.matchRegex = function (e, t) {
            return new RegExp(e).test(t);
          }),
          e
        );
      })())(),
      Pe = new ((function () {
        function e() {}
        return (
          (e.prototype.dataType = function () {
            return "number";
          }),
          (e.prototype.initialValue = function () {
            return { v: void 0, k: 0 };
          }),
          (e.prototype.calculateFromValue = function (e, t) {
            return this.calculate(e, t);
          }),
          (e.prototype.calculateFromStats = function (e, t) {
            return this.calculate(e, t.v);
          }),
          (e.prototype.gc = function (e) {
            var t = e.reduce(
              function (e, t, n) {
                return be(e.v) && be(t.v)
                  ? t.v > e.v
                    ? { v: t.v, i: n }
                    : e
                  : be(t.v)
                    ? { v: t.v, i: n }
                    : e;
              },
              { v: void 0, i: -1 },
            );
            return e.splice(0, t.i + 1);
          }),
          (e.prototype.calculate = function (e, t) {
            if (!be(t)) return e;
            var n = { v: void 0, k: ve() };
            return be(e.v) ? (e.v < t ? ((n.v = t), n) : e) : ((n.v = t), n);
          }),
          e
        );
      })())(),
      De = new ((function () {
        function e() {}
        return (
          (e.prototype.dataType = function () {
            return "number";
          }),
          (e.prototype.initialValue = function () {
            return { v: void 0, k: 0 };
          }),
          (e.prototype.calculateFromValue = function (e, t) {
            return this.calculate(e, t);
          }),
          (e.prototype.calculateFromStats = function (e, t) {
            return this.calculate(e, t.v);
          }),
          (e.prototype.gc = function (e) {
            var t = e.reduce(
              function (e, t, n) {
                return be(e.v) && be(t.v)
                  ? t.v < e.v
                    ? { v: t.v, i: n }
                    : e
                  : be(t.v)
                    ? { v: t.v, i: n }
                    : e;
              },
              { v: void 0, i: -1 },
            );
            return e.splice(0, t.i + 1);
          }),
          (e.prototype.calculate = function (e, t) {
            if (!be(t)) return e;
            var n = { v: void 0, k: ve() };
            return be(e.v) ? (e.v > t ? ((n.v = t), n) : e) : ((n.v = t), n);
          }),
          e
        );
      })())(),
      je = new ((function () {
        function e() {}
        return (
          (e.prototype.dataType = function () {
            return "any";
          }),
          (e.prototype.initialValue = function () {
            return { v: void 0, k: 0 };
          }),
          (e.prototype.calculateFromValue = function (e, t) {
            if (e.p == t) return e;
            var n = { v: void 0, k: ve() };
            return ((n.v = e.p), (n.p = t), n);
          }),
          (e.prototype.calculateFromStats = function (e, t) {
            var n = { v: void 0, k: ve() };
            return e.p == t.p
              ? ((n.v = e.v), (n.p = e.p), n)
              : null == t.v
                ? ((n.v = e.p), (n.p = t.p), n)
                : t;
          }),
          (e.prototype.gc = function (e) {
            var t = e.reduce(function (e, t, n) {
              return e > -1 ? e : null != t.v ? n : -1;
            }, -1);
            return t > -1 ? e.splice(0, t + 1) : e;
          }),
          e
        );
      })())(),
      Le = new ((function () {
        function e() {}
        return (
          (e.prototype.dataType = function () {
            return "number";
          }),
          (e.prototype.initialValue = function () {
            return { v: 0, k: 0 };
          }),
          (e.prototype.calculateFromValue = function (e, t) {
            return this.calculate(e, t);
          }),
          (e.prototype.calculateFromStats = function (e, t) {
            return this.calculate(e, t.v);
          }),
          (e.prototype.gc = function (e) {
            return e;
          }),
          (e.prototype.calculate = function (e, t) {
            ((e.v = be(e.v) ? e.v : 0), (t = be(t) ? t : 0));
            var n = { v: 0, k: ve() };
            return ((n.v = e.v + t), n);
          }),
          e
        );
      })())(),
      Ne = new ((function () {
        function e() {}
        return (
          (e.prototype.dataType = function () {
            return "string";
          }),
          (e.prototype.initialValue = function () {
            return { v: 0, k: 0 };
          }),
          (e.prototype.calculateFromValue = function (e, t, n) {
            if (!_e(t) || !n) return e;
            try {
              return this.partialMatch(n, t)
                ? this.calculate(e)
                : this.calculate(e, 0);
            } catch (t) {
              return (
                Re("Failed to calculate the stats (partial match).", t),
                e
              );
            }
          }),
          (e.prototype.calculateFromStats = function (e, t) {
            return this.calculate(e, t.v);
          }),
          (e.prototype.gc = function (e) {
            return e;
          }),
          (e.prototype.calculate = function (e, t) {
            (void 0 === t && (t = 1),
              (e.v = be(e.v) ? e.v : 0),
              (t = be(t) ? t : 0));
            var n = { v: 0, k: ve() };
            return ((n.v = e.v + t), n);
          }),
          (e.prototype.partialMatch = function (e, t) {
            if (!e.text)
              throw new Error("Partial Match condition is not defined.");
            return t.includes(e.text);
          }),
          e
        );
      })())(),
      Ke =
        (((Ee = {})[o.StatsType.SUM] = Le),
        (Ee[o.StatsType.AVG] = Se),
        (Ee[o.StatsType.MIN] = De),
        (Ee[o.StatsType.MAX] = Pe),
        (Ee[o.StatsType.CNT] = Te),
        (Ee[o.StatsType.FIRST] = Ae),
        (Ee[o.StatsType.LAST] = Ce),
        (Ee[o.StatsType.PREV] = je),
        (Ee[o.StatsType.MATCH] = xe),
        (Ee[o.StatsType.PARTIAL_MATCH] = Ne),
        Ee);
    function Me(e, t, n) {
      var r = e.type,
        o = e.path,
        i = e.option,
        a = Ke[r];
      null != n && Oe(a.dataType(), n, o);
      var c = t.reduceRight(function (e, t) {
        return a.calculateFromStats(e, t, null === i ? void 0 : i);
      }, a.initialValue());
      return null != n
        ? a.calculateFromValue(c, n, null === i ? void 0 : i)
        : c;
    }
    var Ve,
      Ge,
      Fe = (function () {
        function e(e) {
          this.storageSet = e;
        }
        return (
          (e.prototype.calculate = function (e, t) {
            var n = this.storageSet.dimensionStorage.getDimension(e.id),
              r = (function (e, t, n, r, o) {
                var i = Ke[e];
                return (Oe(i.dataType(), n, r), i.calculateFromValue(t, n, o));
              })(e.type, n, t, e.path, null === e.option ? void 0 : e.option);
            (!r.shortenId && e.shortenId && (r.shortenId = e.shortenId),
              this.storageSet.dimensionStorage.setDimension(e.id, e.tw, r));
          }),
          (e.prototype.change = function (e, t) {
            var n = this.storageSet.timeWindowKeyStorage.getTimeWindowKey(e);
            return (
              n &&
                n !== t &&
                this.storageSet.dimensionStorage.clearDimensionByTw(e),
              this.storageSet.timeWindowKeyStorage.setTimeWindowKey(e, t),
              n !== t
            );
          }),
          e
        );
      })(),
      Ue = (function () {
        function e(e) {
          this.storageSet = e;
        }
        return (
          (e.prototype.getCalculator = function () {
            return new Fe(this.storageSet);
          }),
          (e.prototype.getKey = function () {
            return "-";
          }),
          e
        );
      })(),
      Be = (function () {
        function e(e) {
          this.storageSet = e;
        }
        return (
          (e.prototype.getCalculator = function () {
            return new Fe(this.storageSet);
          }),
          (e.prototype.getKey = function () {
            var e = new Date();
            return ""
              .concat(e.getFullYear(), "-")
              .concat(e.getMonth() + 1, "-")
              .concat(e.getDate());
          }),
          e
        );
      })(),
      $e = new ((function () {
        function e() {}
        return (
          (e.prototype.getRange = function (e) {
            e.setHours(0, 0, 0, 0);
            var t = e.getTime(),
              n = t + 864e5;
            return { from: he(t), to: he(n) };
          }),
          e
        );
      })())(),
      We = new ((function () {
        function e() {}
        return (
          (e.prototype.getRange = function (e) {
            e.setHours(0, 0, 0, 0);
            var t = e.getDay(),
              n = e.getTime() - 864e5 * t,
              r = n + 6048e5;
            return { from: he(n), to: he(r) };
          }),
          e
        );
      })())();
    !(function (e) {
      ((e.DAY = "DAY"), (e.WEEK = "WEEK"));
    })(Ge || (Ge = {}));
    var He = (((Ve = {})[Ge.DAY] = $e), (Ve[Ge.WEEK] = We), Ve);
    function qe(e, t) {
      return (void 0 === t && (t = new Date()), He[e].getRange(t));
    }
    var Je = (function () {
        function e(e, t, n) {
          ((this.storageSet = e), (this.windowType = t), (this.span = n));
        }
        return (
          Object.defineProperty(e.prototype, "allWindowRange", {
            get: function () {
              var e = qe(this.windowType);
              return ((e.from = he(1e3 * e.to - 864e5 * this.span)), e);
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.calculate = function (e, t) {
            (this.updateHistory(e, t), this.update(e));
          }),
          (e.prototype.change = function (e, t) {
            var n = this.storageSet.timeWindowKeyStorage.getTimeWindowKey(e);
            return (
              n &&
                n !== t &&
                this.storageSet.dimensionStorage.clearDimensionByTw(e),
              this.storageSet.timeWindowKeyStorage.setTimeWindowKey(e, t),
              n !== t
            );
          }),
          (e.prototype.updateHistory = function (e, t) {
            var n,
              r,
              o = this.getHistory(e),
              i = qe(this.windowType),
              a = o.filter(function (e) {
                return e.k < i.from;
              }),
              c = Me(
                e,
                o.filter(function (e) {
                  return i.from <= e.k && e.k < i.to;
                }),
                t,
              ),
              s = ((n = e.type), (r = [c].concat(a)), Ke[n].gc(r));
            (c.shortenId &&
              s.forEach(function (e) {
                e.shortenId && (e.shortenId = void 0);
              }),
              this.storageSet.dimensionHistoryStorage.setDimensionHistory(
                e,
                s,
              ));
          }),
          (e.prototype.update = function (e) {
            var t = Me(e, this.getHistory(e), null);
            (!t.shortenId && e.shortenId && (t.shortenId = e.shortenId),
              this.storageSet.dimensionStorage.setDimension(e.id, e.tw, t));
          }),
          (e.prototype.getHistory = function (e) {
            var t =
                this.storageSet.dimensionHistoryStorage.getDimensionHistory(e),
              n = this.allWindowRange;
            return t.filter(function (e) {
              return n.from <= e.k && e.k < n.to;
            });
          }),
          e
        );
      })(),
      Ye = (function () {
        function e(e) {
          this.storageSet = e;
        }
        return (
          (e.prototype.getCalculator = function () {
            return new Je(this.storageSet, Ge.WEEK, 28);
          }),
          (e.prototype.getKey = function () {
            return "MONTH";
          }),
          e
        );
      })(),
      Qe = (function () {
        function e(e) {
          this.storageSet = e;
        }
        return (
          (e.prototype.calculate = function (e, t) {
            var n = Me(
              e,
              this.storageSet.dimensionHistoryStorage.getDimensionHistory(e),
              t,
            );
            (n.shortenId && (n.shortenId = void 0),
              this.storageSet.dimensionHistoryStorage.setDimensionHistory(e, [
                n,
              ]));
          }),
          (e.prototype.change = function (e, t) {
            var n = this.storageSet.timeWindowKeyStorage.getTimeWindowKey(e);
            return (
              n && n !== t && this.moveToDimensionFromHistory(e),
              this.storageSet.timeWindowKeyStorage.setTimeWindowKey(e, t),
              n !== t
            );
          }),
          (e.prototype.moveToDimensionFromHistory = function (e) {
            var t = this.storageSet,
              n = t.dimensionStorage,
              r = t.dimensionHistoryStorage;
            (n.clearDimensionByTw(e),
              this.storageSet.dimensionHistoryStorage
                .getDimensionHistoryWithKey()
                .filter(function (t) {
                  return t.tw === e;
                })
                .map(function (e) {
                  return { id: e.id, tw: e.tw, value: e.values[0] };
                })
                .forEach(function (t) {
                  var o = r.getDimensionHistoryKey(t.id, e);
                  (r.removeDimensionHistoryFromKey(o),
                    n.setDimension(t.id, e, t.value));
                }));
          }),
          e
        );
      })(),
      ze = (function () {
        function e(e) {
          this.storageSet = e;
        }
        return (
          (e.prototype.getCalculator = function () {
            return new Qe(this.storageSet);
          }),
          (e.prototype.getKey = function () {
            return this.storageSet.timeWindowKeyStorage.getTimeWindowKey(
              o.TimeWindowType.SESSION,
            );
          }),
          e
        );
      })(),
      Ze = (function () {
        function e(e) {
          this.storage = de(e, "krtvt");
        }
        return (
          (e.prototype.getStorageKey = function () {
            return "ts";
          }),
          (e.prototype.getVisitTime = function () {
            var e = this.storage.get(this.getStorageKey());
            return e || 0;
          }),
          (e.prototype.setVisitTime = function (e) {
            this.storage.set(this.getStorageKey(), e);
          }),
          e
        );
      })();
    var Xe = (function () {
        function e(e) {
          var t;
          ((this.storageSet = e),
            (this.visitTimeStorage = ((t = e.storageType), new Ze(t))));
        }
        return (
          (e.prototype.getCalculator = function () {
            return new Fe(this.storageSet);
          }),
          (e.prototype.getKey = function () {
            var t = this.visitTimeStorage.getVisitTime(),
              n = Date.now(),
              r = n - t;
            return (
              this.visitTimeStorage.setVisitTime(n),
              e.INTERVAL > r
                ? this.storageSet.timeWindowKeyStorage.getTimeWindowKey(
                    o.TimeWindowType.SESSION,
                  )
                : String(n)
            );
          }),
          (e.INTERVAL = 18e5),
          e
        );
      })(),
      et = (function () {
        function e(e) {
          this.storageSet = e;
        }
        return (
          (e.prototype.getCalculator = function () {
            return new Je(this.storageSet, Ge.DAY, 7);
          }),
          (e.prototype.getKey = function () {
            return "WEEK";
          }),
          e
        );
      })(),
      tt = Date.now(),
      nt = (function () {
        function e(e) {
          this.storageSet = e;
        }
        return (
          (e.prototype.getCalculator = function () {
            return new Fe(this.storageSet);
          }),
          (e.prototype.getKey = function () {
            var e = Date.now();
            return "".concat(Math.floor((e - tt) / 50), "/").concat(50);
          }),
          e
        );
      })(),
      rt = {};
    var ot = (function () {
      function e(e, t) {
        var n;
        ((this.config = e),
          (this.storageType = t),
          (this.timeWindowKeyStorage = (function (e) {
            return new ye(e);
          })(t)),
          (this.dimensionStorage = me(t)),
          (this.dimensionHistoryStorage = (function (e) {
            return new pe(e);
          })(t)),
          (this.timeWindowChangeListeners = []),
          (n = this.storageSet),
          (rt[o.TimeWindowType.ALL] = new Ue(n)),
          (rt[o.TimeWindowType.DAY] = new Be(n)),
          (rt[o.TimeWindowType.WEEK] = new et(n)),
          (rt[o.TimeWindowType.MONTH] = new Ye(n)),
          (rt[o.TimeWindowType.SESSION] = new Xe(n)),
          (rt[o.TimeWindowType.PREV_SESSION] = new ze(n)),
          (rt[o.TimeWindowType._TEST] = new nt(n)));
      }
      return (
        Object.defineProperty(e.prototype, "storageSet", {
          get: function () {
            return {
              storageType: this.storageType,
              dimensionStorage: this.dimensionStorage,
              dimensionHistoryStorage: this.dimensionHistoryStorage,
              timeWindowKeyStorage: this.timeWindowKeyStorage,
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.update = function (e) {
          var t = this,
            n = Object.keys(rt).filter(function (e) {
              var t = rt[e];
              return t.getCalculator().change(e, t.getKey());
            });
          (this.config.dimensions.forEach(function (n) {
            t.updateDimension(n, e);
          }),
            n.forEach(function (e) {
              t.timeWindowChangeListeners.forEach(function (t) {
                return t(e);
              });
            }));
        }),
        (e.prototype.addTimeWindowChangeListener = function (e) {
          this.timeWindowChangeListeners.indexOf(e) > -1 ||
            this.timeWindowChangeListeners.push(e);
        }),
        (e.prototype.removeTimeWindowChangeListener = function (e) {
          var t = this.timeWindowChangeListeners.indexOf(e);
          t < 0 || this.timeWindowChangeListeners.splice(t, 1);
        }),
        (e.prototype.updateDimension = function (e, t) {
          var n,
            r = (function (e, t, n) {
              if (!t) return n;
              var r = Array.isArray(t) ? t : t.match(/([^[.\]])+/g);
              if (!r || 0 === r.length) return n;
              var o = r.reduce(function (e, t) {
                return e && e[t];
              }, e);
              return void 0 !== o ? o : n;
            })(t, e.path, null);
          null != r && ((n = e.tw), rt[n]).getCalculator().calculate(e, r);
        }),
        e
      );
    })();
    function it(e) {
      var t = (function (e) {
        for (var t = 0, n = ct.length; t < n; ++t) {
          if (at[ct[t]][0].test(e)) return ct[t];
        }
        return "?";
      })(e);
      return {
        full: e,
        brand: t,
        version: (function (e, t) {
          if (t && at[t]) {
            var n = at[t];
            return (n[n.length - 1].exec(e) && RegExp.$1) || "?";
          }
          var r = e.match(/version[\\/ ](\d+?)\./i);
          return r && r.length > 1 ? r[1] : "?";
        })(e, t),
        platform: (function (e) {
          for (var t = 0, n = ut.length; t < n; ++t)
            if (st[ut[t]].test(e)) return ut[t];
          return "?";
        })(e),
      };
    }
    var at = {
        Edge: [/edg(?:[ea]?|ios)\/(\d+?)\./i],
        Opera: [/op(?:r|t)\/(\d+?)\./i],
        Firefox: [/f(?:irefox|xios)\/(\d+?)\./i],
        Chrome: [/c(?:hrome|rios|rmo)\/(\d+?)\./i],
        Safari: [/safari/i, /version\/(\d+?)\./i],
        IE: [/(?:msie\s|trident.+[:\s])(\d+?)\./i],
      },
      ct = Object.keys(at);
    var st = {
        iPad: /ipad/i,
        iPhone: /iphone/i,
        Android: /android/i,
        Windows: /windows nt/i,
        "OS X": /os x \d+[._]\d+/i,
        Linux: /linux/i,
      },
      ut = Object.keys(st);
    var lt,
      ft = function (e) {
        return {
          href: e.href,
          host: e.host,
          hostname: e.hostname,
          origin: e.origin,
          pathname: e.pathname,
          hash: e.hash.replace(/^#/, ""),
          port: e.port,
          protocol: e.protocol,
          search: e.search.replace(/^\?/, ""),
        };
      },
      dt = function (e) {
        var t = it(e);
        return {
          full: t.full,
          brand: t.brand,
          version: t.version,
          platform: t.platform,
        };
      },
      pt = function (e) {
        var t = {};
        if (((t.location = ft(window.location)), document.referrer)) {
          var n = new URL(document.referrer);
          ((t.referrer = ft(n)),
            window.location.origin !== n.origin &&
              (t.landing_referrer = ft(n)));
        }
        var r,
          o,
          i,
          a = sessionStorage.getItem("krt_blocks_landing_location");
        (a
          ? (t.landing_location = ft(JSON.parse(a)))
          : (sessionStorage.setItem(
              "krt_blocks_landing_location",
              JSON.stringify(window.location),
            ),
            (t.landing_location = ft(window.location))),
          (t.access =
            ((r = navigator.userAgent),
            (o = screen.width),
            (i = screen.height),
            { "user-agent": dt(r), screen: { width: o, height: i } })),
          e.track("page_view", t));
      };
    function vt(e) {
      return (
        lt ||
          (lt = function (t) {
            !(function (e, t) {
              var n,
                r = (((n = {})[t] = { key_change: 1, date: Date.now() }), n);
              e.track("time_window", r);
            })(e, t);
          }),
        lt
      );
    }
    var ht = function (e) {
        (e.calculator.addTimeWindowChangeListener(vt(e)),
          pt(e),
          (function (e) {
            var t = Date.now(),
              n = Date.now();
            document.addEventListener("visibilitychange", function () {
              var r = document.visibilityState;
              if ("visible" == r) {
                var o = (t = Date.now()) - n;
                e.track("visibilitychange", { state: r, hiddenElapsedTime: o });
              } else if ("hidden" == r) {
                var i = (n = Date.now()) - t;
                e.track("visibilitychange", {
                  state: r,
                  visibleElapsedTime: i,
                });
              }
            });
          })(e));
      },
      gt = (function () {
        function e(e) {
          this.calculator = e;
        }
        return (
          (e.prototype.track = function (e, t) {
            var n,
              r = {};
            (Object.keys(t).forEach(function (e) {
              r[e] = t[e];
            }),
              (r.date_ = Date.now()));
            var o = (((n = {})[e] = r), n);
            this.calculator.update(o);
          }),
          e
        );
      })(),
      mt = (function () {
        function e(e, t, n) {
          ((this.compare = t),
            (this.regExp = this.makeRegExp(e, t, null != n && n)));
        }
        return (
          Object.defineProperty(e.prototype, "isNot", {
            get: function () {
              switch (this.compare) {
                case o.CompareType.NE:
                case o.CompareType.NMF:
                case o.CompareType.NMP:
                case o.CompareType.NMB:
                  return !0;
                default:
                  return !1;
              }
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.escape = function (e) {
            return e.replace(/[.*+?^=!:${}()|[\]\/\\]/g, "\\$&");
          }),
          (e.prototype.test = function (e) {
            var t = this.regExp.test(e);
            return this.isNot ? !t : t;
          }),
          (e.prototype.makeRegExp = function (t, n, r) {
            var o = r ? t : e.escape(t),
              i = this.makeRegExpString(o, n);
            try {
              return new RegExp(i);
            } catch (e) {
              return new RegExp("^$a");
            }
          }),
          (e.prototype.makeRegExpString = function (e, t) {
            switch (t) {
              case o.CompareType.MF:
              case o.CompareType.NMF:
                return "^".concat(e);
              case o.CompareType.MP:
              case o.CompareType.NMP:
                return e;
              case o.CompareType.MB:
              case o.CompareType.NMB:
                return "".concat(e, "$");
              case o.CompareType.EQ:
              case o.CompareType.NE:
                return "^".concat(e, "$");
              default:
                throw new Error("Invalid compareType: ".concat(t));
            }
          }),
          e
        );
      })(),
      yt = (function () {
        function e(e) {
          this.dimensionStorage = me(e);
        }
        return (
          (e.prototype.isDimensionMatchToConditions = function (e, t) {
            var n = this;
            return (
              !e ||
              0 == e.length ||
              e.some(function (e) {
                return (
                  0 == e.length ||
                  e.every(function (e) {
                    var r = n.dimensionStorage.getDimensionIdKey(e.id),
                      o = t[r];
                    return n.matchCondition(e, o);
                  })
                );
              })
            );
          }),
          (e.prototype.isDimensionMatchToBlocksSegment = function (e, t) {
            var n = this;
            return (
              !e ||
              0 == e.length ||
              e.every(function (e) {
                return (
                  0 == e.length ||
                  e.some(function (e) {
                    var r = n.dimensionStorage.getDimensionIdKey(e.id),
                      o = t[r];
                    return n.matchCondition(e, o);
                  })
                );
              })
            );
          }),
          (e.prototype.toSingleCompareType = function (e) {
            switch (e) {
              case o.CompareType.AOE:
                return o.CompareType.EQ;
              case o.CompareType.NOE:
                return o.CompareType.NE;
              case o.CompareType.AOP:
                return o.CompareType.MP;
              case o.CompareType.NOP:
                return o.CompareType.NMP;
              default:
                return e;
            }
          }),
          (e.prototype.isMatchStringValue = function (e, t, n, r) {
            return new mt(t, n, r).test(String(e));
          }),
          (e.prototype.matchCondition = function (e, t) {
            var n = this;
            if (!t) return !1;
            var r = t.v;
            if (null == r) return !1;
            if (Array.isArray(e.value) && e.value.every(_e)) {
              var i = this.toSingleCompareType(e.compare),
                a = e.value.map(function (t) {
                  return n.isMatchStringValue(r, t, i, e.isRegex);
                });
              switch (e.compare) {
                case o.CompareType.AOE:
                case o.CompareType.AOP:
                  return a.includes(!0);
                case o.CompareType.NOE:
                case o.CompareType.NOP:
                  return a.every(Boolean);
                default:
                  return !1;
              }
            }
            if (_e(e.value))
              return this.isMatchStringValue(r, e.value, e.compare, e.isRegex);
            switch (e.compare) {
              case o.CompareType.EQ:
                return r == e.value;
              case o.CompareType.NE:
                return r != e.value;
              case o.CompareType.GT:
                return r > e.value;
              case o.CompareType.GTE:
                return r >= e.value;
              case o.CompareType.LT:
                return r < e.value;
              case o.CompareType.LTE:
                return r <= e.value;
            }
            return !1;
          }),
          e
        );
      })(),
      bt = function (e) {
        var t = new ot(e, o.StorageType.LOCAL_STORAGE),
          n = new gt(t);
        (ht(n),
          ue(document.documentElement || document.body, {
            onUrlChanged: function () {
              ht(n);
            },
          }));
      },
      _t = new yt(o.StorageType.LOCAL_STORAGE),
      wt = function (e) {
        var t = new ce(e.apiKey, e.ingestOptions);
        (t.trackGlobalCustomEvents(),
          ue(document.documentElement || document.body, {
            onUrlChanged: function () {
              t.trackGlobalCustomEvents();
            },
          }));
      };
    n(6);
    function Et(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function St(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        ((r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, w(r.key), r));
      }
    }
    function kt(e, t, n) {
      return (
        t && St(e.prototype, t),
        n && St(e, n),
        Object.defineProperty(e, "prototype", { writable: !1 }),
        e
      );
    }
    function It(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return I(e);
        })(e) ||
        (function (e) {
          if (
            ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
            null != e["@@iterator"]
          )
            return Array.from(e);
        })(e) ||
        O(e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        })()
      );
    }
    var Ot = function (e, t) {
      if ("function" != typeof t)
        throw new TypeError("callback must be a function");
      for (var n = e.length >>> 0, r = 0; r < n; r++) {
        var o = e[r];
        if (t(o, r, e)) return o;
      }
    };
    var Tt = Object.create(null);
    function At(e) {
      var t = (function (e) {
        var t,
          n,
          r = Tt[e];
        if (r) return r;
        var o = document.createElement("div");
        o.innerHTML = e;
        var i = Array.prototype.slice.call(o.children),
          a = Ot(i, function (e) {
            return "STYLE" === e.tagName;
          }),
          c = i[0] !== a ? i[0] : void 0,
          s = {
            html:
              null !== (t = null == c ? void 0 : c.outerHTML) && void 0 !== t
                ? t
                : "",
            style:
              null !== (n = null == a ? void 0 : a.innerHTML) && void 0 !== n
                ? n
                : "",
          };
        return ((Tt[e] = s), s);
      })(decodeURIComponent(e));
      return { html: t.html, style: t.style };
    }
    function Ct(e) {
      if (!e) return null;
      var t = e.parentElement;
      return t && "A" === t.tagName && t.getAttribute("href") ? t : Ct(t);
    }
    var Rt = "data-krt-blocks-id";
    function xt(e) {
      return [{ key: Rt, value: e.variationId }]
        .concat(
          e.cssSelector
            ? [{ key: "data-krt-blocks-css-selector", value: e.cssSelector }]
            : [],
        )
        .concat(
          e.trackingId
            ? [{ key: "data-krt-blocks-tracking-id", value: e.trackingId }]
            : [],
        );
    }
    function Pt(e) {
      return [{ key: "data-krt-blocks-area", value: e.areaId }];
    }
    function Dt(e, t) {
      if (t && !e.querySelector("[".concat("data-krt-blocks-css", "]"))) {
        var n = document.createElement("style");
        ((n.innerHTML = t),
          n.setAttribute("data-krt-blocks-css", ""),
          e.appendChild(n));
      }
    }
    function jt(e) {
      var t = e.script,
        n = e.variationId;
      if (t) {
        var r = document.querySelector(
          "[".concat("data-krt-blocks-script", "]"),
        );
        r && r.remove();
        var o = document.createElement("script");
        ((o.text = "(function("
          .concat("__karteVariationId", ") {\n")
          .concat(t, "\n})('")
          .concat(n, "')")),
          o.setAttribute(
            "data-krt-blocks-script",
            Math.random().toString(36).slice(-8),
          ),
          document.head.appendChild(o));
      }
    }
    function Lt(e) {
      return "[".concat(Rt, '="').concat(e, '"]');
    }
    function Nt(e) {
      return "[".concat("data-krt-blocks-area", '="').concat(e, '"]');
    }
    var Kt = function (e, t) {
      var n = t.variationId;
      return !document.querySelector(Lt(n));
    };
    function Mt(e, t) {
      if (!t) return [];
      var n = { element: e, variation: { elementAttributes: t } };
      return [].concat(
        It(
          (function (e) {
            var t = e.variation.elementAttributes;
            return t.id ? [{ key: "id", value: t.id }] : [];
          })(n),
        ),
        It(
          (function (e) {
            var t = e.element,
              n = e.variation.elementAttributes,
              r = n.className
                ? n.className.split(/\s+/).filter(function (e) {
                    return !t.classList.contains(e);
                  })
                : [],
              o = "" !== t.className ? " " : "";
            return r.length > 0
              ? [{ key: "class", value: t.className + o + r.join(" ") }]
              : [];
          })(n),
        ),
        It(
          (function (e) {
            var t = e.variation.elementAttributes;
            return t.alt ? [{ key: "alt", value: t.alt }] : [];
          })(n),
        ),
        It(
          (function (e) {
            var t = e.variation.elementAttributes.style;
            if (!t) return [];
            var n = Object.keys(t),
              r = n.length;
            if (0 === r) return [];
            for (var o = {}, i = 0; i < r; i++) {
              var a = n[i],
                c = t[a];
              void 0 !== c && "" !== c && (o[a] = c);
            }
            return o ? [{ key: "style", value: o }] : [];
          })(n),
        ),
      );
    }
    function Vt(e) {
      var t = e.element,
        n = e.elementAttributes,
        r = e.blockAttributes;
      (null == r ||
        r.forEach(function (e) {
          t.setAttribute(e.key, e.value);
        }),
        null == n ||
          n.forEach(function (e) {
            "object" === _(e.value)
              ? (function (e) {
                  if (null == e)
                    throw new TypeError(
                      "Cannot convert undefined or null to object",
                    );
                  for (
                    var t = Object(e), n = 0;
                    n < (arguments.length <= 1 ? 0 : arguments.length - 1);
                    n++
                  ) {
                    var r =
                      n + 1 < 1 || arguments.length <= n + 1
                        ? void 0
                        : arguments[n + 1];
                    if (null != r)
                      for (var o in r)
                        Object.prototype.hasOwnProperty.call(r, o) &&
                          (t[o] = r[o]);
                  }
                })(t[e.key], e.value)
              : t.setAttribute(e.key, e.value);
          }));
    }
    var Gt = function (e, t) {
        var n,
          r,
          o,
          i = t.html,
          a = t.style,
          c = t.script,
          s = t.blockAttributes,
          u = t.variationId;
        if (i) {
          var l = document.createElement("template");
          l.innerHTML = i;
          var f =
            (null === (n = l.content) || void 0 === n
              ? void 0
              : n.firstElementChild) || l.firstElementChild;
          f &&
            (a && Dt(f, a),
            Vt({ element: f, blockAttributes: s, elementAttributes: [] }),
            null === (r = e.parentNode) ||
              void 0 === r ||
              null === (o = r.insertBefore) ||
              void 0 === o ||
              o.call(r, f, e.nextElementSibling),
            c && jt({ script: c, variationId: u }));
        }
      },
      Ft = function () {
        return { render: Gt, shouldRender: Kt };
      },
      Ut = function (e, t) {
        var n,
          r,
          o,
          i = t.html,
          a = t.style,
          c = t.script,
          s = t.blockAttributes,
          u = t.variationId;
        if (i) {
          var l = document.createElement("template");
          l.innerHTML = i;
          var f =
            (null === (n = l.content) || void 0 === n
              ? void 0
              : n.firstElementChild) || l.firstElementChild;
          f &&
            (a && Dt(f, a),
            Vt({ element: f, blockAttributes: s, elementAttributes: [] }),
            null === (r = e.parentNode) ||
              void 0 === r ||
              null === (o = r.insertBefore) ||
              void 0 === o ||
              o.call(r, f, e),
            c && jt({ script: c, variationId: u }));
        }
      },
      Bt = function () {
        return { render: Ut, shouldRender: Kt };
      },
      $t = function (e, t) {
        var n,
          r = t.areaId,
          o = t.html,
          i = t.script,
          a = t.style,
          c = t.blockAttributes,
          s = t.variationId;
        if (o) {
          var u = document.createElement("template");
          u.innerHTML = o;
          var l =
            (null === (n = u.content) || void 0 === n
              ? void 0
              : n.firstElementChild) || u.firstElementChild;
          if (l) {
            var f = Pt({ areaId: r });
            (Vt({
              element: l,
              blockAttributes: c.concat(f),
              elementAttributes: [],
            }),
              a && Dt(l, a),
              (e.outerHTML = l.outerHTML),
              i && jt({ script: i, variationId: s }));
          }
        }
      },
      Wt = function (e, t, n) {
        return !(null == n || !n.force) || Kt(0, t);
      },
      Ht = function () {
        return { render: $t, shouldRender: Wt };
      },
      qt = function (e, t) {
        var n = t.html,
          r = t.script,
          o = t.blockAttributes,
          i = document.createElement("div");
        if (
          ((i.innerHTML = n),
          Array.prototype.slice.call(i.children).forEach(function (t) {
            (e.appendChild(t), Vt({ element: t, blockAttributes: o }));
          }),
          r)
        ) {
          var a = document.createElement("script");
          ((a.text = "(function() {".concat(r, "})()")),
            Vt({ element: a, blockAttributes: o }),
            e.appendChild(a));
        }
      },
      Jt = function (e, t) {
        var n = t.html,
          r = t.script,
          o = t.blockAttributes,
          i = t.variationId;
        ((e.innerHTML = n),
          Vt({ element: e, blockAttributes: o, elementAttributes: [] }),
          r && jt({ script: r, variationId: i }));
      };
    function Yt(e, t) {
      e.getAttribute("href") !== t && e.setAttribute("href", t);
    }
    var Qt = function () {
        return !0;
      },
      zt = function (e, t) {
        var n = t.imgUrl,
          r = t.aHref,
          o = t.blockAttributes,
          i = Mt(e, t.rawElementAttributes);
        if (
          ((function (e, t) {
            if ("IMG" === e.tagName)
              (e.getAttribute("src") !== t &&
                (e.removeAttribute("src"), e.setAttribute("src", t)),
                e.getAttribute("srcset") !== t && e.setAttribute("srcset", t),
                e.removeAttribute("alt"));
            else {
              var n = 'url("'.concat(t, '")');
              if (e.style.backgroundImage === n) return;
              e.style.backgroundImage = 'url("'.concat(t, '")');
            }
          })(e, n),
          r)
        ) {
          var a = Ct(e);
          if (a)
            (Vt({ element: a, blockAttributes: o, elementAttributes: [] }),
              Yt(a, r));
          else {
            var c = document.createElement("a");
            (Vt({ element: c, blockAttributes: o, elementAttributes: [] }),
              Yt(c, r),
              (function (e, t) {
                if (e.parentNode)
                  (e.parentNode.insertBefore(t, e), t.appendChild(e));
              })(e, c));
          }
          Vt({ element: e, blockAttributes: [], elementAttributes: i });
        } else Vt({ element: e, blockAttributes: o, elementAttributes: i });
      };
    var Zt = function (e, t) {
        var n = t.text,
          r = t.blockAttributes,
          o = Mt(e, t.rawElementAttributes);
        (!(function (e, t) {
          e.textContent = "";
          var n = t.split(/\r?\n|\r/g),
            r = n.length - 1;
          n.forEach(function (t, n) {
            (e.appendChild(document.createTextNode(t)),
              n < r && e.appendChild(document.createElement("br")));
          });
        })(e, n),
          Vt({ element: e, blockAttributes: r, elementAttributes: o }));
      },
      Xt = function (e, t) {
        Vt({ element: e, blockAttributes: t.blockAttributes });
      },
      en = function (e, t) {
        var n = t.blockAttributes;
        ((e.style.display = "none"), Vt({ element: e, blockAttributes: n }));
      },
      tn = function (e) {
        return function (t) {
          try {
            var n = e.getItem(t);
            if (!n) return;
            var r = JSON.parse(n);
            return r.expire && r.last + 2592e6 <= new Date().getTime()
              ? void e.removeItem(t)
              : ((r.last = new Date().getTime()),
                e.setItem(t, JSON.stringify(r)),
                r.val);
          } catch (e) {
            return;
          }
        };
      },
      nn = function (e) {
        return function (t, n) {
          var r =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            o = { expire: r, last: new Date().getTime(), val: n };
          try {
            return (e.setItem(t, JSON.stringify(o)), o.val);
          } catch (e) {
            return;
          }
        };
      },
      rn = "krt_rewrite_logger_enable";
    function on() {
      switch (arguments.length) {
        case 2:
          var e = arguments.length <= 0 ? void 0 : arguments[0],
            t = arguments.length <= 1 ? void 0 : arguments[1];
          window.console.log(e, t);
          break;
        case 1:
          var n = arguments.length <= 0 ? void 0 : arguments[0];
          window.console.log(n);
          break;
        default:
          var r;
          (r = window.console).log.apply(r, arguments);
      }
    }
    var an,
      cn =
        ((an = tn(window.localStorage)(rn)),
        {
          info: function () {
            an && on.apply(void 0, arguments);
          },
        });
    function sn(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        (t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r));
      }
      return n;
    }
    function un(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? sn(Object(n), !0).forEach(function (t) {
              E(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : sn(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                );
              });
      }
      return e;
    }
    function ln(e, t) {
      var n = document.querySelector(Nt(e.areaId));
      n &&
        (function (e, t, n) {
          var r = t.type;
          if (!r) return;
          if (Object.prototype.hasOwnProperty.call(pn, r)) {
            var o = pn[r];
            if (!o.shouldRender(e, t, n)) return;
            o.render(e, t);
          }
        })(
          n,
          (function (e) {
            var t = e.type;
            if (!t) {
              return {
                type: "",
                variationId: "",
                areaId: "",
                trackingId: "",
                blockAttributes: [],
              };
            }
            var n = {
              type: t,
              variationId: e.variationId,
              areaId: e.areaId,
              trackingId: e.trackingId,
              blockAttributes: xt(e),
            };
            if (
              "blocks-element" === t ||
              "blocks-element-after" === t ||
              "blocks-element-before" === t
            ) {
              var r = e.html,
                o = e.style,
                i = e.script;
              return un(
                un({}, n),
                {},
                {
                  type: t,
                  html: decodeURIComponent(r || ""),
                  style: decodeURIComponent(o || ""),
                  script: decodeURIComponent(i || ""),
                },
              );
            }
            if (
              "outer-html" === t ||
              "after-html" === t ||
              "before-html" === t
            ) {
              var a = At(e.html || ""),
                c = a.html,
                s = a.style,
                u = decodeURIComponent(e.script || "");
              return un(
                un({}, n),
                {},
                { type: t, html: c, style: s, script: u },
              );
            }
            if ("append-html" === t || "html" === t) {
              var l = decodeURIComponent(e.html || ""),
                f = decodeURIComponent(e.script || "");
              return un(
                un({}, n),
                {},
                { type: t, html: l, style: "", script: f },
              );
            }
            if ("text" === t) {
              var d = decodeURIComponent(e.text || "");
              return un(
                un({}, n),
                {},
                { type: t, text: d, rawElementAttributes: e.elementAttributes },
              );
            }
            if ("image" === t) {
              var p = e.imgUrl,
                v = e.aHref;
              return un(
                un({}, n),
                {},
                {
                  type: t,
                  imgUrl: p,
                  aHref: v,
                  rawElementAttributes: e.elementAttributes,
                },
              );
            }
            return un(un({}, n), {}, { type: t });
          })(e),
          t,
        );
    }
    var fn = "data-krt-blocks-skipped-area-ids";
    function dn(e) {
      var t = e.elementId,
        n = e.cssSelector,
        r = e.onClick,
        o = document.querySelector(n);
      if (o) {
        var i = o.getAttribute("data-krt-blocks-event-listened");
        (i || (i = ""),
          i.includes(t) ||
            (o.setAttribute(
              "data-krt-blocks-event-listened",
              "".concat(i, ",").concat(t).replace(/^,/, ""),
            ),
            (function (e, t) {
              var n = t.onClick,
                r = (function (e) {
                  if (!e) return [];
                  if ("a" === e.tagName.toLowerCase()) return [e];
                  var t = e.getElementsByTagName("a");
                  return [].slice.call(t);
                })(e),
                o = (function (e) {
                  if (!e) return [];
                  if ("button" === e.tagName.toLowerCase()) return [e];
                  var t = e.getElementsByTagName("button");
                  return [].slice.call(t);
                })(e),
                i = (function (e) {
                  if (!e) return [];
                  if ("input" === e.tagName.toLowerCase()) {
                    var t,
                      n =
                        null === (t = e.getAttribute("type")) || void 0 === t
                          ? void 0
                          : t.toLowerCase();
                    if ("button" === n || "submit" === n || "image" === n)
                      return [e];
                  }
                  var r = e.querySelectorAll(
                    "input[type=button], input[type=submit], input[type=image]",
                  );
                  return [].slice.call(r);
                })(e);
              if (0 === r.length && 0 === o.length && 0 === i.length) {
                var a = Ct(e);
                if (!a) return;
                a.addEventListener("click", n);
              } else
                (r.forEach(function (e) {
                  e.addEventListener("click", n);
                }),
                  o.forEach(function (e) {
                    e.addEventListener("click", n);
                  }),
                  i.forEach(function (e) {
                    e.addEventListener("click", n);
                  }));
            })(o, { onClick: r })));
      }
    }
    var pn = {
      "after-html": Ft(),
      "before-html": Bt(),
      "outer-html": Ht(),
      "append-html": { render: qt, shouldRender: Kt },
      "blocks-element": Ht(),
      "blocks-element-after": Ft(),
      "blocks-element-before": Bt(),
      html: { render: Jt, shouldRender: Kt },
      text: { render: Zt, shouldRender: Kt },
      image: { render: zt, shouldRender: Qt },
      original: { render: Xt, shouldRender: Kt },
      remove: { render: en, shouldRender: Kt },
    };
    function vn(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        (t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r));
      }
      return n;
    }
    var hn = (function () {
        return kt(
          function e(t, n, r, o, i) {
            var a = this;
            if (
              (Et(this, e),
              E(this, "config", void 0),
              E(this, "deploymentId", void 0),
              E(this, "state", void 0),
              E(this, "isControlForAll", void 0),
              E(this, "observer", void 0),
              E(this, "variations", []),
              E(this, "eventQueue", void 0),
              E(this, "cache", void 0),
              E(this, "sendEvent", void 0),
              (this.isControlForAll = t),
              (this.config = n),
              (this.deploymentId = r),
              (this.state = o),
              (this.eventQueue = Object.create(null)),
              (this.cache = Object.create(null)),
              (this.sendEvent = void 0),
              "undefined" != typeof IntersectionObserver)
            ) {
              this.observer = new IntersectionObserver(
                function (e, t) {
                  e.forEach(function (e) {
                    if (e.isIntersecting) {
                      var n,
                        r = e.target,
                        o = i(r, a.variations);
                      if (0 === o.length) return;
                      (o.forEach(function (e) {
                        var t = (function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = null != arguments[t] ? arguments[t] : {};
                            t % 2
                              ? vn(Object(n), !0).forEach(function (t) {
                                  E(e, t, n[t]);
                                })
                              : Object.getOwnPropertyDescriptors
                                ? Object.defineProperties(
                                    e,
                                    Object.getOwnPropertyDescriptors(n),
                                  )
                                : vn(Object(n)).forEach(function (t) {
                                    Object.defineProperty(
                                      e,
                                      t,
                                      Object.getOwnPropertyDescriptor(n, t),
                                    );
                                  });
                          }
                          return e;
                        })({}, e);
                        a.eventQueue[e.pageGroupId]
                          ? a.eventQueue[e.pageGroupId].push(t)
                          : (a.eventQueue[e.pageGroupId] = [t]);
                      }),
                        setTimeout(function () {
                          a.sendEvents();
                        }, 500),
                        null === (n = t.unobserve) ||
                          void 0 === n ||
                          n.call(t, r));
                    }
                  });
                },
                { root: null, rootMargin: "0px", threshold: 0.5 },
              );
            }
          },
          [
            {
              key: "sendEvents",
              value: function () {
                var e = this,
                  t = this.eventQueue;
                ((this.eventQueue = Object.create(null)),
                  Object.keys(t).forEach(function (n) {
                    var r,
                      o = t[n].filter(function (t) {
                        if (!t.areaId && !t.variationId) return !1;
                        var n = ""
                            .concat(t.areaId)
                            .concat(t.variationId ? "-" + t.variationId : ""),
                          r = e.cache[n];
                        return (r || (e.cache[n] = !0), !r);
                      });
                    null === (r = e.sendEvent) ||
                      void 0 === r ||
                      r.call(e, {
                        config: e.config,
                        state: e.state,
                        isControlForAll: e.isControlForAll,
                        conditions: o,
                        pageGroupId: n,
                        deploymentId: e.deploymentId,
                      });
                  }));
              },
            },
            {
              key: "observeVariation",
              value: function (e, t) {
                var n,
                  r = this;
                this.observer &&
                  ((this.variations = e),
                  (this.sendEvent = t),
                  ((n = document.querySelectorAll(
                    "[".concat(Rt, "], [").concat(fn, "]"),
                  )),
                  Array.prototype.slice.call(n)).forEach(function (e) {
                    var t;
                    null === (t = r.observer) || void 0 === t || t.observe(e);
                  }));
              },
            },
            {
              key: "disconnect",
              value: function () {
                this.observer && this.observer.disconnect();
              },
            },
          ],
        );
      })(),
      gn = "krt_rewrite_control_group_disability",
      mn = "krt_rewrite_is_control_for_all",
      yn = "krt_rewrite_is_control_for_condition";
    function bn(e, t) {
      var n = tn(window.localStorage);
      if (n(gn)) return !1;
      if (n(yn)) return !0;
      var r = e.randomVal,
        o = e.hasControl,
        i = e.controlPatternProportion;
      return !!o && (r + t) % 100 < i;
    }
    function _n(e) {
      var t = 0;
      return (
        e.forEach(function (e) {
          t += e.proportion;
        }),
        100 - t
      );
    }
    function wn(e) {
      return e > 0;
    }
    function En(e) {
      var t =
        location.protocol +
        "//" +
        location.host +
        location.pathname +
        location.search;
      return e ? t : t + location.hash;
    }
    var Sn = (function () {
      return kt(
        function e(t) {
          (Et(this, e),
            E(this, "limit", void 0),
            E(this, "duration", void 0),
            E(this, "counter", void 0),
            (this.limit = t.limit),
            (this.duration = t.duration),
            (this.counter = []));
        },
        [
          {
            key: "isBurst",
            value: function () {
              var e = this;
              return (
                this.counter.length > this.limit ||
                (this.counter.push(0),
                setTimeout(function () {
                  e.counter.pop();
                }, this.duration),
                !1)
              );
            },
          },
        ],
      );
    })();
    var kn = function (e, t, n) {
        var r = Tn(e) + "=" + Tn(t);
        (null == t && (n.maxAge = -1),
          n.maxAge && (n.expires = new Date(new Date().getTime() + n.maxAge)),
          n.path && (r += "; path=" + n.path),
          n.domain && (r += "; domain=" + n.domain),
          n.expires && (r += "; expires=" + n.expires.toUTCString()),
          n.secure && (r += "; secure"),
          (r += "; samesite"),
          (document.cookie = r));
      },
      In = function (e) {
        return (function () {
          var e;
          try {
            e = document.cookie;
          } catch (e) {
            return ("undefined" != typeof console && console.error, {});
          }
          return On(e);
        })()[e];
      },
      On = function (e) {
        var t,
          n = {},
          r = e.split(/ *; */);
        if ("" == r[0]) return n;
        for (var o = 0; o < r.length; ++o)
          ((t = r[o].split("=")), (n[An(t[0])] = An(t[1])));
        return n;
      },
      Tn = function (e) {
        try {
          return encodeURIComponent(e);
        } catch (e) {
          return "";
        }
      },
      An = function (e) {
        try {
          return decodeURIComponent(e);
        } catch (e) {
          return "";
        }
      },
      Cn = function (e, t) {
        for (var n = 0; n < e.length; n++) if (t(e[n])) return e[n];
      },
      Rn = function (e, t) {
        return e.slice(0, t.length) === t;
      };
    function xn(e, t) {
      var n =
        ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
      if (!n) {
        if (
          Array.isArray(e) ||
          (n = (function (e, t) {
            if (e) {
              if ("string" == typeof e) return Pn(e, t);
              var n = {}.toString.call(e).slice(8, -1);
              return (
                "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n
                  ? Array.from(e)
                  : "Arguments" === n ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? Pn(e, t)
                    : void 0
              );
            }
          })(e)) ||
          (t && e && "number" == typeof e.length)
        ) {
          n && (e = n);
          var r = 0,
            o = function () {};
          return {
            s: o,
            n: function () {
              return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
            },
            e: function (e) {
              throw e;
            },
            f: o,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      }
      var i,
        a = !0,
        c = !1;
      return {
        s: function () {
          n = n.call(e);
        },
        n: function () {
          var e = n.next();
          return ((a = e.done), e);
        },
        e: function (e) {
          ((c = !0), (i = e));
        },
        f: function () {
          try {
            a || null == n.return || n.return();
          } finally {
            if (c) throw i;
          }
        },
      };
    }
    function Pn(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var Dn,
      jn,
      Ln,
      Nn = ["stores.jp", "hatenablog.com"],
      Kn = function (e) {
        var t = "REM" + Math.random().toString(32).substring(2),
          n = {
            expires: new Date(new Date().getTime() + 1e3),
            domain: e,
            secure: !0,
          };
        if (-1 != Nn.indexOf(e)) return !1;
        kn(t, e, n);
        var r = !!In(t);
        return (kn(t, "", { maxAge: 0 }), r);
      },
      Mn = !["097ce595bd5cd0c06f1d912d29afe94f"].includes(
        null === (Dn = p.krt_rewrite_config) || void 0 === Dn
          ? void 0
          : Dn.apiKey,
      ),
      Vn = {
        KRT_SEGMENTS_KEY_FOR_TRACK: "krt___segments",
        KRT_SEGMENTS_KEY_FOR_EDGE: "krt.".concat(
          null === (jn = p.krt_rewrite_config) || void 0 === jn
            ? void 0
            : jn.apiKey,
          ".segments",
        ),
        KRT_VID_KEY_FOR_MULTI_DOMAIN: "krt.__ktid",
        KRT_VID_KEY: "krt___krt.vis",
        KRT_STORAGE_KEY_FOR_EDGE: "krt@".concat(
          null === (Ln = p.krt_rewrite_config) || void 0 === Ln
            ? void 0
            : Ln.apiKey.slice(0, 5),
          ".detect$",
        ),
        KRT_STORAGE_SHARED_KEY_FOR_EDGE: "d",
        KRT_VID_KEY_IN_COOKIE: "krt.vis",
        KRT_REWRITE_UID: "krt_rewrite_uid",
        KRT_REWRITE_CONDITION_VAL: "krt_rewrite_condition_val",
        KRT_REWRITE_CONTROL_GROUP_DISABILITY:
          "krt_rewrite_control_group_disability",
        KRT_REWRITE_LOGGER_ENABLE: "krt_rewrite_logger_enable",
        KRT_REWRITE_IS_CONTROL_FOR_ALL: "krt_rewrite_is_control_for_all",
        KRT_REWRITE_IS_CONTROL_FOR_CONDITION:
          "krt_rewrite_is_control_for_condition",
        KRT_BLOCKS_DIMENSION: "krtdim",
        KRT_BLOCKS_SEGMENTS: "krt_rewrite_segments",
        KRT_REWRITE_PRIORITY: "krt_rewrite_campaign_priority",
      },
      Gn = "krt_rewrite_skip_builderjs",
      Fn = "krt_rewrite_preview",
      Un = "krt_rewrite_preview_block_performance_mode",
      Bn = "krt_rewrite_preview_page_group",
      $n = "krt_rewrite_preview_condition",
      Wn = "krt_rewrite_preview_pattern",
      Hn = "krt_rewrite_after_redesign";
    function qn() {
      var e = window.localStorage.getItem(Vn.KRT_BLOCKS_DIMENSION);
      if (!e) return null;
      try {
        var t = JSON.parse(e),
          n = {};
        return (
          Object.keys(t).forEach(function (e) {
            var r = t[e],
              o = r.shortenId;
            if (o) {
              var i = o
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
              void 0 === r.v ? (n[i] = null) : (n[i] = r.v);
            }
          }),
          n
        );
      } catch (e) {
        return null;
      }
    }
    function Jn(e) {
      var t = window.localStorage.getItem(e);
      if (null == t) return null;
      try {
        return JSON.parse(t);
      } catch (e) {
        return "string" == typeof t ? t : null;
      }
    }
    function Yn(e, t) {
      var n = Jn(e + Vn.KRT_STORAGE_SHARED_KEY_FOR_EDGE);
      if (null != n && null != n[t]) return n[t];
      var r = Jn(e + t);
      if (null != r) return r;
      var o = Jn(t);
      return null != o ? o : null;
    }
    function Qn() {
      var e,
        t = tn(window.localStorage),
        n = tn(window.sessionStorage),
        r = nn(window.localStorage),
        o = In(Vn.KRT_REWRITE_UID),
        i = (function (e) {
          var t = document.cookie,
            n = Cn(t.split(/ *; */), function (t) {
              return Rn(t, e + "=");
            });
          if (n) return n.split("=")[1];
        })(Vn.KRT_VID_KEY_IN_COOKIE),
        a = t(Vn.KRT_REWRITE_UID) || "",
        c =
          o ||
          a ||
          "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
            .split("")
            .map(function (e) {
              switch (e) {
                case "x":
                  return Math.floor(16 * Math.random()).toString(16);
                case "y":
                  return (Math.floor(4 * Math.random()) + 8).toString(16);
                default:
                  return e;
              }
            })
            .join("");
      if (Mn && !o) {
        var s = (function (e) {
          var t,
            n = new URL(e).hostname.split(".").reverse(),
            r = n.shift(),
            o = xn(n);
          try {
            for (o.s(); !(t = o.n()).done; ) {
              var i = t.value;
              if (Kn((r = r ? i + "." + r : i))) return r;
            }
          } catch (e) {
            o.e(e);
          } finally {
            o.f();
          }
          if ("localhost" === location.hostname) return location.host;
        })(window.location.href);
        if (s) {
          var u = { path: "/", secure: !0 };
          ((u.domain = s), (u.maxAge = 2592e6), kn(Vn.KRT_REWRITE_UID, c, u));
        }
      }
      r(Vn.KRT_REWRITE_UID, c);
      var l =
        t(Vn.KRT_REWRITE_CONDITION_VAL) || Math.floor(1e4 * Math.random());
      return (
        r(Vn.KRT_REWRITE_CONDITION_VAL, l),
        {
          rewriteUid: c,
          conditionVal: l,
          karteVisitorId:
            i ||
            Yn(Vn.KRT_STORAGE_KEY_FOR_EDGE, Vn.KRT_VID_KEY_IN_COOKIE) ||
            t(Vn.KRT_VID_KEY) ||
            "",
          segments:
            t(Vn.KRT_SEGMENTS_KEY_FOR_EDGE) ||
            t(Vn.KRT_SEGMENTS_KEY_FOR_TRACK) ||
            null,
          blocksDimensions: qn(),
          blocksSegments:
            window.localStorage.getItem(Vn.KRT_BLOCKS_SEGMENTS) || void 0,
          shouldSkipBuilderJs: n(Gn) || !1,
          isPreview: n(Fn) || !1,
          isBlockPerformanceMode: n(Un) || !1,
          previewPageGroup: n(Bn) || "",
          previewCondition: n($n) || "",
          previewPattern: n(Wn) || "",
          partsEventList: [],
          afterRedesign: null !== (e = n(Hn)) && void 0 !== e && e,
        }
      );
    }
    function zn(e, t) {
      return (
        (function (e) {
          if (0 === e.length) return 0;
          var t = 0,
            n = 0;
          for (n = 0; n < e.length; n++)
            ((t = (t << 5) - t + e.charCodeAt(n)), (t |= 0));
          return Math.abs(t) % 100;
        })(e) <= t
      );
    }
    function Zn(e, t) {
      var n = t.isEnable,
        r = t.userAgentWhiteList,
        o = t.rate;
      return (
        !!n &&
        (!(function (e) {
          return (
            0 === e.length ||
            ((t = e), (n = navigator.userAgent), -1 !== t.indexOf(n))
          );
          var t, n;
        })(r) ||
          !zn(e, o))
      );
    }
    function Xn(e, t) {
      var n = " \n    @keyframes ".concat(
          "krt_rewrite_css_name",
          " {\n      from {\n        visibility: hidden;\n      }\n      to {\n        visibility: visible;\n      }\n    }",
        ),
        r = (function (e) {
          return []
            .concat(
              It(
                e.originImgSrcArray.map(function (e) {
                  return 'img[src="'.concat(e, '"]');
                }),
              ),
              It(e.cssSelectorArray),
              ["krt_rewrite_css_name"],
            )
            .join(",");
        })(t),
        o = "\n    "
          .concat(r, " {\n      animation: ")
          .concat("krt_rewrite_css_name", " 2s step-end;\n    }");
      (e.insertRule(n, 0), e.insertRule(o, 0));
    }
    function er(e) {
      var t = tn(window.localStorage)("krt_blocks_sync_timestamp_diff");
      return !t || isNaN(t) ? e : e + t;
    }
    function tr(e, t) {
      if (!t)
        return (function (e) {
          if (!e || e.length < 2) return !0;
          if (!e[0] || !e[1]) return !0;
          var t = er(Date.now()),
            n = T(e, 2),
            r = n[0],
            o = n[1],
            i = new Date(r).getTime(),
            a = new Date(o).getTime();
          if (i < t && t < a) return !0;
          return !1;
        })(e);
      var n = er(Date.now());
      if (!e || e.length < 2) return nr(t, n);
      var r = T(e, 2),
        o = r[0],
        i = r[1],
        a = "" === o ? null : new Date(o).getTime(),
        c = "" === i ? null : new Date(i).getTime();
      return (
        ((null === a && null != c && c > n) ||
          (null === c && null != a && a < n) ||
          (null != a && null != c && a < n && n < c)) &&
        nr(t, n)
      );
    }
    function nr(e, t) {
      var n = new Date(t),
        r = n.getUTCDay();
      switch (e.type) {
        case "daily":
          return rr(e.distDaysAndHours, n);
        case "weekly":
          return !!e.daysOfWeek.includes(r) && rr(e.distDaysAndHours, n);
        case "monthly":
          var o = (function (e) {
            var t = new Date(
                Date.UTC(e.getUTCFullYear(), e.getUTCMonth() + 1, 0),
              ).getUTCDate(),
              n = e.getUTCDate();
            return n === t ? -1 : n;
          })(n);
          return !!e.daysOfMonth.includes(o) && rr(e.distDaysAndHours, n);
        default:
          return !1;
      }
    }
    function rr(e, t) {
      if (!e || 0 === e.length) return !1;
      var n =
        24 * t.getDay() * 60 * 60 +
        60 * t.getHours() * 60 +
        60 * t.getMinutes() +
        t.getSeconds();
      return e.some(function (e) {
        return e.start <= n && n < e.end;
      });
    }
    function or(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        (t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r));
      }
      return n;
    }
    function ir(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? or(Object(n), !0).forEach(function (t) {
              E(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : or(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                );
              });
      }
      return e;
    }
    function ar(e) {
      switch (e) {
        case "$or":
        case "$and":
          return !1;
        case "$nor":
        case "$nand":
          return !0;
      }
    }
    function cr(e, t) {
      if (!e || 0 === e.segmentSet.length) return !0;
      var n = e.segmentSet.every(function (e) {
        if (0 === e.segments.length) return !0;
        var n = e.segments.some(function (e) {
          if (0 === e.conditions.length) return !0;
          var n = e.conditions.map(function (e) {
            return e.dimensionConditions.map(function (e) {
              return {
                id: e.dimensionId,
                compare: e.compare,
                isRegex: e.isRegex,
                value: e.value,
              };
            });
          });
          return _t.isDimensionMatchToBlocksSegment(n, t);
        });
        return ar(e.logicGate) ? !n : n;
      });
      return ar(e.logicGate) ? !n : n;
    }
    function sr(e, t, n) {
      return (
        !!n.forceMatch ||
        0 === e.length ||
        (!!t &&
          e.every(function (e) {
            return e.flag || "$and" === e.logicGate
              ? e.segmentSet.some(function (e) {
                  return t.indexOf(e) >= 0;
                })
              : e.segmentSet.every(function (e) {
                  return t.indexOf(e) < 0;
                });
          }))
      );
    }
    function ur(e) {
      var t = e.conditionId,
        n = e.uid;
      return (
        parseInt(n.slice(-3), 16) + parseInt(t.toLowerCase().slice(-3), 36)
      );
    }
    function lr(e, t, n, r, o) {
      var i = e.conditions,
        a = _t.dimensionStorage.getAllDimensions(),
        c = i
          .filter(function (e) {
            return !o || (o && e.isOriginal);
          })
          .filter(function (e) {
            return cr(e.blocksSegmentCondition || void 0, a);
          })
          .filter(function (e) {
            return sr(e.segmentConditions || [], n, { forceMatch: !1 });
          })
          .filter(function (e) {
            return _t.isDimensionMatchToConditions(e.dimensionCondition, a);
          })
          .filter(function (e) {
            return tr(e.scheduleTimeRange, e.recurrenceSettings);
          });
      if (0 !== c.length)
        return dr({
          conditions: c.sort(function (e, t) {
            return e.priority > t.priority ? 1 : -1;
          }),
          pageGroup: e,
          uid: t,
          conditionVal: r,
        });
    }
    function fr(e, t, n, r, o) {
      var i = _t.dimensionStorage.getAllDimensions(),
        a = e
          .filter(function (e) {
            return !o || (o && e.isOriginal);
          })
          .filter(function (e) {
            return cr(e.blocksSegmentCondition || void 0, i);
          })
          .filter(function (e) {
            return sr(e.segmentConditions || [], n, { forceMatch: !1 });
          })
          .filter(function (e) {
            return _t.isDimensionMatchToConditions(e.dimensionCondition, i);
          })
          .filter(function (e) {
            return tr(e.scheduleTimeRange, e.recurrenceSettings);
          })
          .filter(function (e) {
            return "" !== e.campaignPriority || void 0 !== e.campaignPriority;
          });
      if (0 !== a.length)
        return (function (e) {
          var t = e.conditions,
            n = e.uid,
            r = e.conditionVal;
          return t.map(function (e) {
            var t = ur({ uid: n, conditionId: e.conditionId }),
              o = _n(e.patterns),
              i = wn(o);
            return ir(
              ir({}, e),
              {},
              {
                pageGroupId: e.pageGroup.pageGroupId,
                randomVal: t,
                hasControl: i,
                controlPatternProportion: o,
                isControlForCondition: bn(
                  { randomVal: t, hasControl: i, controlPatternProportion: o },
                  r,
                ),
              },
            );
          });
        })({
          conditions: a.sort(function (e, t) {
            return e.campaignPriority > t.campaignPriority ? 1 : -1;
          }),
          uid: t,
          conditionVal: r,
        });
    }
    function dr(e) {
      var t = e.conditions,
        n = e.pageGroup,
        r = e.uid,
        o = e.conditionVal;
      return t.map(function (e) {
        var t = ur({ uid: r, conditionId: e.conditionId }),
          i = _n(e.patterns),
          a = wn(i);
        return ir(
          ir({}, e),
          {},
          {
            pageGroupId: n.pageGroupId,
            randomVal: t,
            hasControl: a,
            controlPatternProportion: i,
            isControlForCondition: bn(
              { randomVal: t, hasControl: a, controlPatternProportion: i },
              o,
            ),
          },
        );
      });
    }
    function pr(e) {
      var t = e.filter(function (e) {
        return e.isOriginal;
      })[0];
      return e
        .map(function (e) {
          return e.isControlForCondition
            ? (function (e, t) {
                var n = e.patterns.map(function (e) {
                    return e.variations;
                  }),
                  r = [];
                if (
                  (n.forEach(function (e) {
                    e.forEach(function (e) {
                      r.filter(function (t) {
                        return t.areaId === e.areaId;
                      }).length > 0 || r.push(e);
                    });
                  }),
                  !t || 0 === t.patterns.length)
                )
                  return {
                    conditionId: e.conditionId,
                    isControlForCondition: e.isControlForCondition,
                    hasControl: !!e.hasControl,
                    pageGroupId: e.pageGroupId,
                    proportion: e.controlPatternProportion,
                    patternId: "isControl",
                    variations: [],
                    isOriginal: !1,
                  };
                var o = t.patterns[0],
                  i = r
                    .map(function (e) {
                      return o.variations.filter(function (t) {
                        return t.areaId === e.areaId;
                      })[0];
                    })
                    .filter(function (e) {
                      return void 0 !== e;
                    });
                return {
                  conditionId: e.conditionId,
                  isControlForCondition: e.isControlForCondition,
                  hasControl: !!e.hasControl,
                  pageGroupId: e.pageGroupId,
                  proportion: e.controlPatternProportion,
                  patternId: "isControl",
                  variations: i,
                  isOriginal: !1,
                };
              })(e, t)
            : vr(e);
        })
        .filter(function (e) {
          return void 0 !== e;
        });
    }
    function vr(e) {
      var t = (function (e) {
        for (
          var t = e.randomValue, n = e.array, r = 0, o = 0;
          o < n.length;
          o++
        ) {
          var i = n[o];
          if (t < (r += i.proportion)) return i;
        }
      })({
        randomValue: e.randomVal % (100 - e.controlPatternProportion),
        array: e.patterns,
      });
      if (void 0 !== t)
        return ir(
          ir({}, t),
          {},
          {
            conditionId: e.conditionId,
            isControlForCondition: e.isControlForCondition,
            hasControl: e.hasControl,
            pageGroupId: e.pageGroupId,
            isOriginal: !!e.isOriginal,
          },
        );
    }
    var hr = {
        view: "blocks_view",
        pageView: "blocks_page_view",
        click: "blocks_message_click",
        apply: "blocks_message_open",
        impression: "blocks_impression",
        skippedAreaClick: "blocks_skipped_message_click",
        skippedAreaImpression: "blocks_skipped_impression",
        dynamicBlockPageView: "blocks_dynamic_block_page_view",
      },
      gr = "'"
        .concat("[a-zA-Z_$][0-9a-zA-Z_$]*", "'|\"")
        .concat("[a-zA-Z_$][0-9a-zA-Z_$]*", '"|`')
        .concat("[a-zA-Z_$][0-9a-zA-Z_$]*", "`");
    function mr(e) {
      return Array.from(
        e.matchAll(
          new RegExp(
            ""
              .concat("krtBlock")
              .concat("\\s*", "\\.")
              .concat("\\s*")
              .concat("setVal", "\\(")
              .concat("\\s*", "(")
              .concat(gr, ")")
              .concat("\\s*", ","),
            "g",
          ),
        ),
      )
        .map(function (e) {
          return e[1];
        })
        .map(function (e) {
          return e.slice(1, -1);
        });
    }
    function yr(e, t) {
      var n =
        ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
      if (!n) {
        if (
          Array.isArray(e) ||
          (n = (function (e, t) {
            if (e) {
              if ("string" == typeof e) return br(e, t);
              var n = {}.toString.call(e).slice(8, -1);
              return (
                "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n
                  ? Array.from(e)
                  : "Arguments" === n ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? br(e, t)
                    : void 0
              );
            }
          })(e)) ||
          (t && e && "number" == typeof e.length)
        ) {
          n && (e = n);
          var r = 0,
            o = function () {};
          return {
            s: o,
            n: function () {
              return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
            },
            e: function (e) {
              throw e;
            },
            f: o,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      }
      var i,
        a = !0,
        c = !1;
      return {
        s: function () {
          n = n.call(e);
        },
        n: function () {
          var e = n.next();
          return ((a = e.done), e);
        },
        e: function (e) {
          ((c = !0), (i = e));
        },
        f: function () {
          try {
            a || null == n.return || n.return();
          } finally {
            if (c) throw i;
          }
        },
      };
    }
    function br(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var _r = c.extractBlockAPIVariable,
      wr = [];
    function Er(e) {
      var t = e.config,
        n = e.state,
        r = e.deploymentId;
      !(function (e, t, n) {
        var r,
          o = yr(
            (function (e, t) {
              var n = [];
              try {
                var r = {
                  blocks_uuid: e.uuId,
                  blocks_deployment_id: e.deploymentId,
                  url: window.location.href,
                  user_agent: window.navigator.userAgent,
                };
                (t.segments && (r.on_triggered_segments = t.segments.join(",")),
                  t.blocksDimensions &&
                    (r.on_triggered_blocks_dimensions = t.blocksDimensions),
                  t.blocksSegments &&
                    (r.on_triggered_blocks_segments = t.blocksSegments),
                  n.push(r));
              } catch (e) {
                window.console.error(e);
              }
              return n;
            })({ uuId: t.rewriteUid, deploymentId: n }, t),
          );
        try {
          for (o.s(); !(r = o.n()).done; ) {
            var i = r.value;
            Rr(e, hr.pageView, i);
          }
        } catch (e) {
          o.e(e);
        } finally {
          o.f();
        }
      })(t.apiKey, n, r);
    }
    function Sr(e) {
      var t = e.config,
        n = e.state,
        r = e.deploymentId,
        o = e.variations;
      setTimeout(function () {
        var e = o.filter(function (e) {
          return (function (e) {
            var t,
              n,
              r,
              o = _r(null !== (t = e.script) && void 0 !== t ? t : "");
            return (
              (null !==
                (n =
                  null === (r = e.variablesQuery) || void 0 === r
                    ? void 0
                    : r.length) && void 0 !== n
                ? n
                : 0) > 0 || o.length > 0
            );
          })(e);
        });
        e.length > 0 &&
          (function (e, t, n, r) {
            var o,
              i = yr(
                (function (e, t, n) {
                  var r = [];
                  try {
                    var o = {
                      blocks_uuid: e.uuId,
                      blocks_deployment_id: e.deploymentId,
                      url: window.location.href,
                      user_agent: window.navigator.userAgent,
                      variation_ids: n,
                    };
                    (t.segments &&
                      (o.on_triggered_segments = t.segments.join(",")),
                      t.blocksDimensions &&
                        (o.on_triggered_blocks_dimensions = t.blocksDimensions),
                      t.blocksSegments &&
                        (o.on_triggered_blocks_segments = t.blocksSegments),
                      r.push(o));
                  } catch (e) {
                    window.console.error(e);
                  }
                  return r;
                })({ uuId: t.rewriteUid, deploymentId: n }, t, r),
              );
            try {
              for (i.s(); !(o = i.n()).done; ) {
                var a = o.value;
                Rr(e, hr.dynamicBlockPageView, a);
              }
            } catch (e) {
              i.e(e);
            } finally {
              i.f();
            }
          })(
            t.apiKey,
            n,
            r,
            e.map(function (e) {
              return e.variationId;
            }),
          );
      }, 0);
    }
    function kr(e) {
      var t = e.config,
        n = Pr("impression", e.conditions);
      Or(t.apiKey, "impression", n, e);
    }
    function Ir(e) {
      var t = e.config,
        n = Pr("skippedAreaImpression", e.conditions);
      Or(t.apiKey, "skippedAreaImpression", n, e);
    }
    function Or(e, t, n, r) {
      var o = r.config,
        i = r.state,
        a = r.isControlForAll,
        c = r.pageGroupId,
        s = r.deploymentId,
        u = hr[t];
      if (u && u !== hr.pageView) {
        var l = (function (e, t, n) {
          var r = [];
          try {
            var o,
              i = yr(t);
            try {
              for (i.s(); !(o = i.n()).done; ) {
                var a = o.value,
                  c = {
                    condition_id: a.conditionId,
                    pattern_id: a.patternId,
                    area_id: a.areaId,
                    variation_id: a.variationId,
                    group_page_id: e.pageGroupId,
                    blocks_uuid: e.uuId,
                    blocks_deployment_id: e.deploymentId,
                    is_control_for_all: e.isControlForAll,
                    has_control_for_all: e.hasControlForAll,
                    url: window.location.href,
                    user_agent: window.navigator.userAgent,
                  };
                (n.segments && (c.on_triggered_segments = n.segments.join(",")),
                  n.blocksDimensions &&
                    (c.on_triggered_blocks_dimensions = n.blocksDimensions),
                  n.blocksSegments &&
                    (c.on_triggered_blocks_segments = n.blocksSegments),
                  r.push(c));
              }
            } catch (e) {
              i.e(e);
            } finally {
              i.f();
            }
          } catch (e) {
            window.console.error(e);
          }
          return r;
        })(
          {
            pageGroupId: c,
            uuId: i.rewriteUid,
            deploymentId: s,
            isControlForAll: a,
            hasControlForAll: o.hasControlForAll,
          },
          n,
          i,
        );
        if (l.length) {
          var f,
            d = yr(l);
          try {
            for (d.s(); !(f = d.n()).done; ) {
              Rr(e, u, f.value);
            }
          } catch (e) {
            d.e(e);
          } finally {
            d.f();
          }
        }
      }
    }
    function Tr(e) {
      var t,
        n,
        r =
          null !==
            (t =
              null === (n = window["__KARTE_EDGE_".concat(e)]) || void 0 === n
                ? void 0
                : n.n) && void 0 !== t
            ? t
            : "krt";
      return window[r];
    }
    function Ar(e) {
      return void 0 !== Tr(e) || "undefined" != typeof tracker;
    }
    function Cr(e, t, n) {
      var r = Tr(e);
      void 0 !== r
        ? r("send", t, n)
        : "undefined" != typeof tracker && tracker.track(t, n);
    }
    function Rr(e, t, n) {
      if (Ar(e))
        try {
          (xr(e), Cr(e, t, n));
        } catch (e) {
          window.console.error(e);
        }
      else
        !(function (e, t) {
          var n = { eventName: e, value: t };
          try {
            wr.push(n);
          } catch (e) {
            window.console.error(e);
          }
        })(t, n);
    }
    function xr(e) {
      if (!Ar(e)) return !1;
      if (!wr.length) return !0;
      try {
        var t,
          n = yr(wr);
        try {
          for (n.s(); !(t = n.n()).done; ) {
            var r = t.value;
            Cr(e, r.eventName, r.value);
          }
        } catch (e) {
          n.e(e);
        } finally {
          n.f();
        }
      } catch (e) {
        window.console.error(e);
      }
      return ((wr = []), !0);
    }
    function Pr(e, t) {
      return "view" === e
        ? [{ eventName: e }]
        : t.map(function (t) {
            var n = t.isControlForCondition ? "isControl" : t.patternId;
            return {
              eventName: e,
              patternId: n,
              areaId: t.areaId,
              variationId: t.variationId,
              conditionId: t.conditionId,
              hasControlForCondition: t.hasControl,
            };
          });
    }
    var Dr = function (e) {
      var t = e.pageGroups,
        n = e.isInControlGroupForAll,
        r = e.state,
        o = e.config,
        i = e.deploymentId;
      t.forEach(function (e) {
        var t = lr(e, r.rewriteUid, r.segments, r.conditionVal, n);
        if (t) {
          var a = t
            .filter(function (e) {
              return !e.isOriginal;
            })
            .map(function (e) {
              var t = vr(e);
              if (t)
                return {
                  conditionId: e.conditionId,
                  isControlForCondition: e.isControlForCondition,
                  hasControl: e.hasControl,
                  patternId: t.patternId,
                };
            })
            .filter(function (e) {
              return void 0 !== e;
            });
          !(function (e) {
            var t = e.config,
              n = Pr("apply", e.conditions);
            Or(t.apiKey, "apply", n, e);
          })({
            config: o,
            state: r,
            isControlForAll: n,
            conditions: a,
            pageGroupId: e.pageGroupId,
            deploymentId: i,
          });
        }
      });
    };
    function jr(e) {
      var t = e.pageGroups,
        n = e.isInControlGroupForAll,
        r = e.config,
        o = e.state,
        i = e.deploymentId;
      t.forEach(function (e) {
        !(function (e) {
          var t = e.config,
            n = Pr("view", e.conditions);
          Or(t.apiKey, "view", n, e);
        })({
          config: r,
          state: o,
          isControlForAll: n,
          conditions: [],
          pageGroupId: e.pageGroupId,
          deploymentId: i,
        });
      });
    }
    var Lr = new yt(o.StorageType.LOCAL_STORAGE);
    function Nr(e) {
      var t = _t.dimensionStorage.getAllDimensions(),
        n = [];
      return (
        e.forEach(function (e) {
          var r = e.conditions.map(function (e) {
            return e.dimensionConditions.map(function (e) {
              return {
                id: e.dimensionId,
                compare: e.compare,
                isRegex: e.isRegex,
                value: e.value,
              };
            });
          });
          Lr.isDimensionMatchToBlocksSegment(r, t) && n.push(e._id.toString());
        }),
        n
      );
    }
    function Kr(e) {
      if ((window.localStorage.removeItem(Vn.KRT_BLOCKS_SEGMENTS), e)) {
        var t = Nr(e);
        0 !== t.length &&
          window.localStorage.setItem(Vn.KRT_BLOCKS_SEGMENTS, t.join(","));
      }
    }
    function Mr(e) {
      return null == e
        ? ""
        : null !== e && "object" === _(e)
          ? JSON.stringify(e, null, 2)
          : String(e);
    }
    function Vr(e) {
      for (
        var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
        r < t;
        r++
      )
        n[r - 1] = arguments[r];
      var o = n.map(Mr);
      return e.reduce(function (e, t, n) {
        var r;
        return e + t + (null !== (r = o[n]) && void 0 !== r ? r : "");
      }, "");
    }
    function Gr(e) {
      return {
        data: {},
        template: Vr,
        _setData: function (e) {
          this.data = e;
        },
        _getData: function () {
          return this.data;
        },
        _selector: e,
      };
    }
    function Fr(e) {
      var t,
        n = e.selectors,
        r = e.PetiteVuePkg,
        o = e.directives,
        i = {},
        a = {},
        c = {},
        s = r.nextTick;
      return {
        render: function () {
          var e = r.createApp;
          if (
            (n.forEach(function (e) {
              var t = document.querySelector(e);
              t && (i[e] = t);
            }),
            0 === Object.values(i).length)
          )
            return function () {};
          Object.entries(i).forEach(function (e) {
            var t = T(e, 2),
              n = t[0];
            !(function (e, t) {
              (e.setAttribute("krt-scope", "Scope('".concat(t, "')")),
                e.setAttribute(
                  "krt-".concat("_export"),
                  "{ _getData, _setData, _selector }",
                ));
            })(t[1], n);
          });
          var c,
            s =
              ((c = function (e) {
                var t = e._selector;
                t && (a[t] = { _getData: e._getData, _setData: e._setData });
              }),
              function (e) {
                var t = e.get,
                  n = e.effect,
                  r = e.exp;
                n(function () {
                  var e = t(r);
                  c(e);
                });
              });
          ((t = e({ Scope: Gr, $delimiters: ["#{", "}"] })),
            Object.entries(null != o ? o : {})
              .reduce(function (e, t) {
                var n = T(t, 2),
                  r = n[0],
                  o = n[1];
                return e.directive(
                  r,
                  (function (e) {
                    return function (t) {
                      var n = t.el,
                        r = t.get,
                        o = t.effect,
                        i = t.exp,
                        a = t.arg,
                        c = t.modifiers;
                      return e({
                        el: n,
                        arg: a,
                        modifiers: Object.keys(null != c ? c : {}),
                        expr: i,
                        effect: o,
                        evaluate: r,
                        getRootSelector: function () {
                          return r("_selector");
                        },
                      });
                    };
                  })(o),
                );
              }, t)
              .directive("_export", s)
              .mount());
        },
        setData: function (e, t) {
          var n;
          null === (n = a[e]) || void 0 === n || n._setData(t);
        },
        getData: function (e) {
          var t;
          return (function (e) {
            try {
              return JSON.parse(JSON.stringify(e));
            } catch (e) {
              return {};
            }
          })(null === (t = a[e]) || void 0 === t ? void 0 : t._getData());
        },
        onChangeData: function (e, t) {
          return (
            c[e] || (c[e] = new Set()),
            c[e].add(t),
            function () {
              var n;
              null === (n = c[e]) || void 0 === n || n.delete(t);
            }
          );
        },
        destroy: function () {
          var e;
          (null === (e = t) || void 0 === e || e.unmount(),
            Object.keys(i).forEach(function (e) {
              delete i[e];
            }),
            Object.keys(a).forEach(function (e) {
              delete a[e];
            }),
            Object.keys(c).forEach(function (e) {
              delete c[e];
            }));
        },
        nextTick: (function () {
          var e = k(function* (e) {
            return s(null != e ? e : function () {});
          });
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
      };
    }
    var Ur = Object.defineProperty,
      Br = (e, t, n) => (
        ((e, t, n) => {
          t in e
            ? Ur(e, t, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: n,
              })
            : (e[t] = n);
        })(e, "symbol" != typeof t ? t + "" : t, n),
        n
      );
    const $r = /;(?![^(]*\))/g,
      Wr = /:(.+)/;
    function Hr(e) {
      const t = {};
      return (
        e.split($r).forEach((e) => {
          if (e) {
            const n = e.split(Wr);
            n.length > 1 && (t[n[0].trim()] = n[1].trim());
          }
        }),
        t
      );
    }
    function qr(e, t) {
      if (e === t) return !0;
      let n = eo(e),
        r = eo(t);
      if (n || r) return !(!n || !r) && e.getTime() === t.getTime();
      if (((n = Zr(e)), (r = Zr(t)), n || r))
        return (
          !(!n || !r) &&
          (function (e, t) {
            if (e.length !== t.length) return !1;
            let n = !0;
            for (let r = 0; n && r < e.length; r++) n = qr(e[r], t[r]);
            return n;
          })(e, t)
        );
      if (((n = ro(e)), (r = ro(t)), n || r)) {
        if (!n || !r) return !1;
        if (Object.keys(e).length !== Object.keys(t).length) return !1;
        for (const n in e) {
          const r = e.hasOwnProperty(n),
            o = t.hasOwnProperty(n);
          if ((r && !o) || (!r && o) || !qr(e[n], t[n])) return !1;
        }
      }
      return String(e) === String(t);
    }
    function Jr(e, t) {
      return e.findIndex((e) => qr(e, t));
    }
    const Yr = Object.assign,
      Qr = Object.prototype.hasOwnProperty,
      zr = (e, t) => Qr.call(e, t),
      Zr = Array.isArray,
      Xr = (e) => "[object Map]" === io(e),
      eo = (e) => e instanceof Date,
      to = (e) => "string" == typeof e,
      no = (e) => "symbol" == typeof e,
      ro = (e) => null !== e && "object" == typeof e,
      oo = Object.prototype.toString,
      io = (e) => oo.call(e),
      ao = (e) =>
        to(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
      co = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
      },
      so = /-(\w)/g,
      uo = co((e) => e.replace(so, (e, t) => (t ? t.toUpperCase() : ""))),
      lo = /\B([A-Z])/g,
      fo = co((e) => e.replace(lo, "-$1").toLowerCase()),
      po = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
      };
    function vo(e, t) {
      (t = t || void 0) && t.active && t.effects.push(e);
    }
    const ho = (e) => {
        const t = new Set(e);
        return ((t.w = 0), (t.n = 0), t);
      },
      go = (e) => (e.w & _o) > 0,
      mo = (e) => (e.n & _o) > 0,
      yo = new WeakMap();
    let bo = 0,
      _o = 1;
    const wo = [];
    let Eo;
    const So = Symbol(""),
      ko = Symbol("");
    class Io {
      constructor(e, t = null, n) {
        ((this.fn = e),
          (this.scheduler = t),
          (this.active = !0),
          (this.deps = []),
          vo(this, n));
      }
      run() {
        if (!this.active) return this.fn();
        if (!wo.includes(this))
          try {
            return (
              wo.push((Eo = this)),
              Co.push(Ao),
              (Ao = !0),
              (_o = 1 << ++bo),
              bo <= 30
                ? (({ deps: e }) => {
                    if (e.length)
                      for (let t = 0; t < e.length; t++) e[t].w |= _o;
                  })(this)
                : Oo(this),
              this.fn()
            );
          } finally {
            (bo <= 30 &&
              ((e) => {
                const { deps: t } = e;
                if (t.length) {
                  let n = 0;
                  for (let r = 0; r < t.length; r++) {
                    const o = t[r];
                    (go(o) && !mo(o) ? o.delete(e) : (t[n++] = o),
                      (o.w &= ~_o),
                      (o.n &= ~_o));
                  }
                  t.length = n;
                }
              })(this),
              (_o = 1 << --bo),
              Ro(),
              wo.pop());
            const e = wo.length;
            Eo = e > 0 ? wo[e - 1] : void 0;
          }
      }
      stop() {
        this.active &&
          (Oo(this), this.onStop && this.onStop(), (this.active = !1));
      }
    }
    function Oo(e) {
      const { deps: t } = e;
      if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0;
      }
    }
    function To(e) {
      e.effect.stop();
    }
    let Ao = !0;
    const Co = [];
    function Ro() {
      const e = Co.pop();
      Ao = void 0 === e || e;
    }
    function xo(e, t, n) {
      if (!Ao || void 0 === Eo) return;
      let r = yo.get(e);
      r || yo.set(e, (r = new Map()));
      let o = r.get(n);
      (o || r.set(n, (o = ho())),
        (function (e, t) {
          let n = !1;
          (bo <= 30 ? mo(e) || ((e.n |= _o), (n = !go(e))) : (n = !e.has(Eo)),
            n && (e.add(Eo), Eo.deps.push(e)));
        })(o));
    }
    function Po(e, t, n, r, o, i) {
      const a = yo.get(e);
      if (!a) return;
      let c = [];
      if ("clear" === t) c = [...a.values()];
      else if ("length" === n && Zr(e))
        a.forEach((e, t) => {
          ("length" === t || t >= r) && c.push(e);
        });
      else
        switch ((void 0 !== n && c.push(a.get(n)), t)) {
          case "add":
            Zr(e)
              ? ao(n) && c.push(a.get("length"))
              : (c.push(a.get(So)), Xr(e) && c.push(a.get(ko)));
            break;
          case "delete":
            Zr(e) || (c.push(a.get(So)), Xr(e) && c.push(a.get(ko)));
            break;
          case "set":
            Xr(e) && c.push(a.get(So));
        }
      if (1 === c.length) c[0] && Do(c[0]);
      else {
        const e = [];
        for (const t of c) t && e.push(...t);
        Do(ho(e));
      }
    }
    function Do(e, t) {
      for (const t of Zr(e) ? e : [...e])
        (t !== Eo || t.allowRecurse) && (t.scheduler ? t.scheduler() : t.run());
    }
    const jo = (function (e, t) {
        const n = Object.create(null),
          r = e.split(",");
        for (let e = 0; e < r.length; e++) n[r[e]] = !0;
        return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e];
      })("__proto__,__v_isRef,__isVue"),
      Lo = new Set(
        Object.getOwnPropertyNames(Symbol)
          .map((e) => Symbol[e])
          .filter(no),
      ),
      No = Vo(),
      Ko = Vo(!0),
      Mo = (function () {
        const e = {};
        return (
          ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
            e[t] = function (...e) {
              const n = Yo(this);
              for (let e = 0, t = this.length; e < t; e++) xo(n, 0, e + "");
              const r = n[t](...e);
              return -1 === r || !1 === r ? n[t](...e.map(Yo)) : r;
            };
          }),
          ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
            e[t] = function (...e) {
              (Co.push(Ao), (Ao = !1));
              const n = Yo(this)[t].apply(this, e);
              return (Ro(), n);
            };
          }),
          e
        );
      })();
    function Vo(e = !1, t = !1) {
      return function (n, r, o) {
        if ("__v_isReactive" === r) return !e;
        if ("__v_isReadonly" === r) return e;
        if ("__v_raw" === r && o === (e ? (t ? Wo : $o) : t ? Bo : Uo).get(n))
          return n;
        const i = Zr(n);
        if (!e && i && zr(Mo, r)) return Reflect.get(Mo, r, o);
        const a = Reflect.get(n, r, o);
        return (no(r) ? Lo.has(r) : jo(r)) || (e || xo(n, 0, r), t)
          ? a
          : Qo(a)
            ? i && ao(r)
              ? a
              : a.value
            : ro(a)
              ? e
                ? (function (e) {
                    return Jo(e, !0, Fo, null, $o);
                  })(a)
                : qo(a)
              : a;
      };
    }
    const Go = {
        get: No,
        set: (function (e = !1) {
          return function (t, n, r, o) {
            let i = t[n];
            if (
              !e &&
              !(function (e) {
                return !(!e || !e.__v_isReadonly);
              })(r) &&
              ((r = Yo(r)), (i = Yo(i)), !Zr(t) && Qo(i) && !Qo(r))
            )
              return ((i.value = r), !0);
            const a = Zr(t) && ao(n) ? Number(n) < t.length : zr(t, n),
              c = Reflect.set(t, n, r, o);
            return (
              t === Yo(o) &&
                (a
                  ? ((e, t) => !Object.is(e, t))(r, i) && Po(t, "set", n, r)
                  : Po(t, "add", n, r)),
              c
            );
          };
        })(),
        deleteProperty: function (e, t) {
          const n = zr(e, t);
          e[t];
          const r = Reflect.deleteProperty(e, t);
          return (r && n && Po(e, "delete", t, void 0), r);
        },
        has: function (e, t) {
          const n = Reflect.has(e, t);
          return ((!no(t) || !Lo.has(t)) && xo(e, 0, t), n);
        },
        ownKeys: function (e) {
          return (xo(e, 0, Zr(e) ? "length" : So), Reflect.ownKeys(e));
        },
      },
      Fo = { get: Ko, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
      Uo = new WeakMap(),
      Bo = new WeakMap(),
      $o = new WeakMap(),
      Wo = new WeakMap();
    function Ho(e) {
      return e.__v_skip || !Object.isExtensible(e)
        ? 0
        : (function (e) {
            switch (e) {
              case "Object":
              case "Array":
                return 1;
              case "Map":
              case "Set":
              case "WeakMap":
              case "WeakSet":
                return 2;
              default:
                return 0;
            }
          })(((e) => io(e).slice(8, -1))(e));
    }
    function qo(e) {
      return e && e.__v_isReadonly ? e : Jo(e, !1, Go, null, Uo);
    }
    function Jo(e, t, n, r, o) {
      if (!ro(e) || (e.__v_raw && (!t || !e.__v_isReactive))) return e;
      const i = o.get(e);
      if (i) return i;
      const a = Ho(e);
      if (0 === a) return e;
      const c = new Proxy(e, 2 === a ? r : n);
      return (o.set(e, c), c);
    }
    function Yo(e) {
      const t = e && e.__v_raw;
      return t ? Yo(t) : e;
    }
    function Qo(e) {
      return Boolean(e && !0 === e.__v_isRef);
    }
    Promise.resolve();
    let zo = !1;
    const Zo = [],
      Xo = Promise.resolve(),
      ei = (e) => Xo.then(e),
      ti = (e) => {
        (Zo.includes(e) || Zo.push(e), zo || ((zo = !0), ei(ni)));
      },
      ni = () => {
        for (const e of Zo) e();
        ((Zo.length = 0), (zo = !1));
      },
      ri = /^(spellcheck|draggable|form|list|type)$/,
      oi = ({ el: e, get: t, effect: n, arg: r, modifiers: o }) => {
        let i;
        ("class" === r && (e._class = e.className),
          n(() => {
            let n = t();
            if (r)
              ((null == o ? void 0 : o.camel) && (r = uo(r)), ii(e, r, n, i));
            else {
              for (const t in n) ii(e, t, n[t], i && i[t]);
              for (const t in i) (!n || !(t in n)) && ii(e, t, null);
            }
            i = n;
          }));
      },
      ii = (e, t, n, r) => {
        if ("class" === t)
          e.setAttribute(
            "class",
            (function e(t) {
              let n = "";
              if (to(t)) n = t;
              else if (Zr(t))
                for (let r = 0; r < t.length; r++) {
                  const o = e(t[r]);
                  o && (n += o + " ");
                }
              else if (ro(t)) for (const e in t) t[e] && (n += e + " ");
              return n.trim();
            })(e._class ? [e._class, n] : n) || "",
          );
        else if ("style" === t) {
          n = (function e(t) {
            if (Zr(t)) {
              const n = {};
              for (let r = 0; r < t.length; r++) {
                const o = t[r],
                  i = to(o) ? Hr(o) : e(o);
                if (i) for (const e in i) n[e] = i[e];
              }
              return n;
            }
            return to(t) || ro(t) ? t : void 0;
          })(n);
          const { style: t } = e;
          if (n)
            if (to(n)) n !== r && (t.cssText = n);
            else {
              for (const e in n) ci(t, e, n[e]);
              if (r && !to(r)) for (const e in r) null == n[e] && ci(t, e, "");
            }
          else e.removeAttribute("style");
        } else
          e instanceof SVGElement || !(t in e) || ri.test(t)
            ? "true-value" === t
              ? (e._trueValue = n)
              : "false-value" === t
                ? (e._falseValue = n)
                : null != n
                  ? e.setAttribute(t, n)
                  : e.removeAttribute(t)
            : ((e[t] = n), "value" === t && (e._value = n));
      },
      ai = /\s*!important$/,
      ci = (e, t, n) => {
        Zr(n)
          ? n.forEach((n) => ci(e, t, n))
          : t.startsWith("--")
            ? e.setProperty(t, n)
            : ai.test(n)
              ? e.setProperty(fo(t), n.replace(ai, ""), "important")
              : (e[t] = n);
      },
      si = (e, t) => {
        const n = e.getAttribute(t);
        return (null != n && e.removeAttribute(t), n);
      },
      ui = (e, t, n, r) => {
        e.addEventListener(t, n, r);
      },
      li =
        /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,
      fi = ["ctrl", "shift", "alt", "meta"],
      di = {
        stop: (e) => e.stopPropagation(),
        prevent: (e) => e.preventDefault(),
        self: (e) => e.target !== e.currentTarget,
        ctrl: (e) => !e.ctrlKey,
        shift: (e) => !e.shiftKey,
        alt: (e) => !e.altKey,
        meta: (e) => !e.metaKey,
        left: (e) => "button" in e && 0 !== e.button,
        middle: (e) => "button" in e && 1 !== e.button,
        right: (e) => "button" in e && 2 !== e.button,
        exact: (e, t) => fi.some((n) => e[n + "Key"] && !t[n]),
      },
      pi = ({ el: e, get: t, exp: n, arg: r, modifiers: o }) => {
        if (!r) return;
        let i = li.test(n) ? t(`(e => ${n}(e))`) : t(`($event => { ${n} })`);
        if ("vue:mounted" !== r) {
          if ("vue:unmounted" === r) return () => i();
          if (o) {
            "click" === r &&
              (o.right && (r = "contextmenu"), o.middle && (r = "mouseup"));
            const e = i;
            i = (t) => {
              if (!("key" in t) || fo(t.key) in o) {
                for (const e in o) {
                  const n = di[e];
                  if (n && n(t, o)) return;
                }
                return e(t);
              }
            };
          }
          ui(e, r, i, o);
        } else ei(i);
      },
      vi = ({ el: e, get: t, effect: n }) => {
        n(() => {
          e.textContent = hi(t());
        });
      },
      hi = (e) =>
        null == e ? "" : ro(e) ? JSON.stringify(e, null, 2) : String(e),
      gi = (e) => ("_value" in e ? e._value : e.value),
      mi = (e, t) => {
        const n = t ? "_trueValue" : "_falseValue";
        return n in e ? e[n] : t;
      },
      yi = (e) => {
        e.target.composing = !0;
      },
      bi = (e) => {
        const t = e.target;
        t.composing && ((t.composing = !1), _i(t, "input"));
      },
      _i = (e, t) => {
        const n = document.createEvent("HTMLEvents");
        (n.initEvent(t, !0, !0), e.dispatchEvent(n));
      },
      wi = Object.create(null),
      Ei = (e, t, n) => Si(e, `return(${t})`, n),
      Si = (e, t, n) => {
        const r = wi[t] || (wi[t] = ki(t));
        try {
          return r(e, n);
        } catch (e) {}
      },
      ki = (e) => {
        try {
          return new Function("$data", "$el", `with($data){${e}}`);
        } catch (e) {
          return () => {};
        }
      },
      Ii = {
        bind: oi,
        on: pi,
        show: ({ el: e, get: t, effect: n }) => {
          const r = e.style.display;
          n(() => {
            e.style.display = t() ? r : "none";
          });
        },
        text: vi,
        html: ({ el: e, get: t, effect: n }) => {
          n(() => {
            e.innerHTML = t();
          });
        },
        model: ({ el: e, exp: t, get: n, effect: r, modifiers: o }) => {
          const i = e.type,
            a = n(`(val) => { ${t} = val }`),
            { trim: c, number: s = "number" === i } = o || {};
          if ("SELECT" === e.tagName) {
            const t = e;
            (ui(e, "change", () => {
              const e = Array.prototype.filter
                .call(t.options, (e) => e.selected)
                .map((e) => (s ? po(gi(e)) : gi(e)));
              a(t.multiple ? e : e[0]);
            }),
              r(() => {
                const e = n(),
                  r = t.multiple;
                for (let n = 0, o = t.options.length; n < o; n++) {
                  const o = t.options[n],
                    i = gi(o);
                  if (r)
                    Zr(e)
                      ? (o.selected = Jr(e, i) > -1)
                      : (o.selected = e.has(i));
                  else if (qr(gi(o), e))
                    return void (
                      t.selectedIndex !== n && (t.selectedIndex = n)
                    );
                }
                !r && -1 !== t.selectedIndex && (t.selectedIndex = -1);
              }));
          } else if ("checkbox" === i) {
            let t;
            (ui(e, "change", () => {
              const t = n(),
                r = e.checked;
              if (Zr(t)) {
                const n = gi(e),
                  o = Jr(t, n),
                  i = -1 !== o;
                if (r && !i) a(t.concat(n));
                else if (!r && i) {
                  const e = [...t];
                  (e.splice(o, 1), a(e));
                }
              } else a(mi(e, r));
            }),
              r(() => {
                const r = n();
                (Zr(r)
                  ? (e.checked = Jr(r, gi(e)) > -1)
                  : r !== t && (e.checked = qr(r, mi(e, !0))),
                  (t = r));
              }));
          } else if ("radio" === i) {
            let t;
            (ui(e, "change", () => {
              a(gi(e));
            }),
              r(() => {
                const r = n();
                r !== t && (e.checked = qr(r, gi(e)));
              }));
          } else {
            const t = (e) => (c ? e.trim() : s ? po(e) : e);
            (ui(e, "compositionstart", yi),
              ui(e, "compositionend", bi),
              ui(e, (null == o ? void 0 : o.lazy) ? "change" : "input", () => {
                e.composing || a(t(e.value));
              }),
              c &&
                ui(e, "change", () => {
                  e.value = e.value.trim();
                }),
              r(() => {
                if (e.composing) return;
                const r = e.value,
                  o = n();
                (document.activeElement === e && t(r) === o) ||
                  (r !== o && (e.value = o));
              }));
          }
        },
        effect: ({ el: e, ctx: t, exp: n, effect: r }) => {
          ei(() => r(() => Si(t.scope, n, e)));
        },
      },
      Oi = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
      Ti = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
      Ai = /^\(|\)$/g,
      Ci = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/,
      Ri = (e, t, n) => {
        const r = t.match(Oi);
        if (!r) return;
        const o = e.nextSibling,
          i = e.parentElement,
          a = new Text("");
        (i.insertBefore(a, e), i.removeChild(e));
        const c = r[2].trim();
        let s,
          u,
          l,
          f,
          d = r[1].trim().replace(Ai, "").trim(),
          p = !1,
          v = "key",
          h =
            e.getAttribute(v) ||
            e.getAttribute((v = ":key")) ||
            e.getAttribute((v = "krt-bind:key"));
        (h && (e.removeAttribute(v), "key" === v && (h = JSON.stringify(h))),
          (f = d.match(Ti)) &&
            ((d = d.replace(Ti, "").trim()),
            (u = f[1].trim()),
            f[2] && (l = f[2].trim())),
          (f = d.match(Ci)) &&
            ((s = f[1].split(",").map((e) => e.trim())), (p = "[" === d[0])));
        let g,
          m,
          y,
          b = !1;
        const _ = (e, t, r, o) => {
            const i = {};
            (s ? s.forEach((e, n) => (i[e] = t[p ? n : e])) : (i[d] = t),
              o ? (u && (i[u] = o), l && (i[l] = r)) : u && (i[u] = r));
            const a = Fi(n, i),
              c = h ? Ei(a.scope, h) : r;
            return (e.set(c, r), (a.key = c), a);
          },
          w = (t, n) => {
            const r = new Bi(e, t);
            return ((r.key = t.key), r.insert(i, n), r);
          };
        return (
          n.effect(() => {
            const e = Ei(n.scope, c),
              t = y;
            if (
              (([m, y] = ((e) => {
                const t = new Map(),
                  n = [];
                if (Zr(e))
                  for (let r = 0; r < e.length; r++) n.push(_(t, e[r], r));
                else if ("number" == typeof e)
                  for (let r = 0; r < e; r++) n.push(_(t, r + 1, r));
                else if (ro(e)) {
                  let r = 0;
                  for (const o in e) n.push(_(t, e[o], r++, o));
                }
                return [n, t];
              })(e)),
              b)
            ) {
              for (let e = 0; e < g.length; e++)
                y.has(g[e].key) || g[e].remove();
              const e = [];
              let n,
                r,
                o = m.length;
              for (; o--; ) {
                const c = m[o],
                  s = t.get(c.key);
                let u;
                (null == s
                  ? (u = w(c, n ? n.el : a))
                  : ((u = g[s]),
                    Object.assign(u.ctx.scope, c.scope),
                    s !== o &&
                      (g[s + 1] !== n || r === n) &&
                      ((r = u), u.insert(i, n ? n.el : a))),
                  e.unshift((n = u)));
              }
              g = e;
            } else ((g = m.map((e) => w(e, a))), (b = !0));
          }),
          o
        );
      },
      xi = ({
        el: e,
        ctx: {
          scope: { $refs: t },
        },
        get: n,
        effect: r,
      }) => {
        let o;
        return (
          r(() => {
            const r = n();
            ((t[r] = e), o && r !== o && delete t[o], (o = r));
          }),
          () => {
            o && delete t[o];
          }
        );
      },
      Pi = /^(?:krt-|:|@)/,
      Di = /\.([\w-]+)/g;
    let ji = !1;
    const Li = (e, t) => {
        const n = e.nodeType;
        if (1 === n) {
          const n = e;
          if (n.hasAttribute("krt-pre")) return;
          let r;
          if ((si(n, "krt-cloak"), (r = si(n, "krt-if"))))
            return ((e, t, n) => {
              const r = e.parentElement,
                o = new Comment("krt-if");
              r.insertBefore(o, e);
              const i = [{ exp: t, el: e }];
              let a, c;
              for (
                ;
                (a = e.nextElementSibling) &&
                ((c = null),
                "" === si(a, "krt-else") || (c = si(a, "krt-else-if")));
              )
                (r.removeChild(a), i.push({ exp: c, el: a }));
              const s = e.nextSibling;
              r.removeChild(e);
              let u,
                l = -1;
              const f = () => {
                u && (r.insertBefore(o, u.el), u.remove(), (u = void 0));
              };
              return (
                n.effect(() => {
                  for (let e = 0; e < i.length; e++) {
                    const { exp: t, el: a } = i[e];
                    if (!t || Ei(n.scope, t))
                      return void (
                        e !== l &&
                        (f(),
                        (u = new Bi(a, n)),
                        u.insert(r, o),
                        r.removeChild(o),
                        (l = e))
                      );
                  }
                  ((l = -1), f());
                }),
                s
              );
            })(n, r, t);
          if ((r = si(n, "krt-for"))) return Ri(n, r, t);
          if ((r = si(n, "krt-scope")) || "" === r) {
            const e = r ? Ei(t.scope, r) : {};
            ((t = Fi(t, e)), e.$template && Vi(n, e.$template));
          }
          const o = null != si(n, "krt-once");
          (o && (ji = !0),
            (r = si(n, "ref")) && Mi(n, xi, `"${r}"`, t),
            Ni(n, t));
          const i = [];
          for (const { name: e, value: r } of [...n.attributes])
            Pi.test(e) &&
              "krt-cloak" !== e &&
              ("krt-model" === e
                ? i.unshift([e, r])
                : "@" === e[0] || /^krt-on\b/.test(e)
                  ? i.push([e, r])
                  : Ki(n, e, r, t));
          for (const [e, r] of i) Ki(n, e, r, t);
          o && (ji = !1);
        } else if (3 === n) {
          const n = e.data;
          if (n.includes(t.delimiters[0])) {
            let r,
              o = [],
              i = 0;
            for (; (r = t.delimitersRE.exec(n)); ) {
              const e = n.slice(i, r.index);
              (e && o.push(JSON.stringify(e)),
                o.push(`$s(${r[1]})`),
                (i = r.index + r[0].length));
            }
            (i < n.length && o.push(JSON.stringify(n.slice(i))),
              Mi(e, vi, o.join("+"), t));
          }
        } else 11 === n && Ni(e, t);
      },
      Ni = (e, t) => {
        let n = e.firstChild;
        for (; n; ) n = Li(n, t) || n.nextSibling;
      },
      Ki = (e, t, n, r) => {
        let o, i, a;
        if (
          ":" ===
          (t = t.replace(Di, (e, t) => (((a || (a = {}))[t] = !0), "")))[0]
        )
          ((o = oi), (i = t.slice(1)));
        else if ("@" === t[0]) ((o = pi), (i = t.slice(1)));
        else {
          const e = t.indexOf(":"),
            n = e > 0 ? t.slice(4, e) : t.slice(4);
          ((o = Ii[n] || r.dirs[n]), (i = e > 0 ? t.slice(e + 1) : void 0));
        }
        o &&
          (o === oi && "ref" === i && (o = xi),
          Mi(e, o, n, r, i, a),
          e.removeAttribute(t));
      },
      Mi = (e, t, n, r, o, i) => {
        const a = t({
          el: e,
          get: (t = n) => Ei(r.scope, t, e),
          effect: r.effect,
          ctx: r,
          exp: n,
          arg: o,
          modifiers: i,
        });
        a && r.cleanups.push(a);
      },
      Vi = (e, t) => {
        if ("#" !== t[0]) e.innerHTML = t;
        else {
          const n = document.querySelector(t);
          e.appendChild(n.content.cloneNode(!0));
        }
      },
      Gi = (e) => {
        const t = {
          delimiters: ["{{", "}}"],
          delimitersRE: /\{\{([^]+?)\}\}/g,
          ...e,
          scope: e ? e.scope : qo({}),
          dirs: e ? e.dirs : {},
          effects: [],
          blocks: [],
          cleanups: [],
          effect: (e) => {
            if (ji) return (ti(e), e);
            const n = (function (e, t) {
              e.effect && (e = e.effect.fn);
              const n = new Io(e);
              (t && (Yr(n, t), t.scope && vo(n, t.scope)),
                (!t || !t.lazy) && n.run());
              const r = n.run.bind(n);
              return ((r.effect = n), r);
            })(e, { scheduler: () => ti(n) });
            return (t.effects.push(n), n);
          },
        };
        return t;
      },
      Fi = (e, t = {}) => {
        const n = e.scope,
          r = Object.create(n);
        (Object.defineProperties(r, Object.getOwnPropertyDescriptors(t)),
          (r.$refs = Object.create(n.$refs)));
        const o = qo(
          new Proxy(r, {
            set: (e, t, r, i) =>
              i !== o || e.hasOwnProperty(t)
                ? Reflect.set(e, t, r, i)
                : Reflect.set(n, t, r),
          }),
        );
        return (Ui(o), { ...e, scope: o });
      },
      Ui = (e) => {
        for (const t of Object.keys(e))
          "function" == typeof e[t] && (e[t] = e[t].bind(e));
      };
    class Bi {
      constructor(e, t, n = !1) {
        (Br(this, "template"),
          Br(this, "ctx"),
          Br(this, "key"),
          Br(this, "parentCtx"),
          Br(this, "isFragment"),
          Br(this, "start"),
          Br(this, "end"),
          (this.isFragment = e instanceof HTMLTemplateElement),
          n
            ? (this.template = e)
            : this.isFragment
              ? (this.template = e.content.cloneNode(!0))
              : (this.template = e.cloneNode(!0)),
          n
            ? (this.ctx = t)
            : ((this.parentCtx = t), t.blocks.push(this), (this.ctx = Gi(t))),
          Li(this.template, this.ctx));
      }
      get el() {
        return this.start || this.template;
      }
      insert(e, t = null) {
        if (this.isFragment)
          if (this.start) {
            let n,
              r = this.start;
            for (
              ;
              r && ((n = r.nextSibling), e.insertBefore(r, t), r !== this.end);
            )
              r = n;
          } else
            ((this.start = new Text("")),
              (this.end = new Text("")),
              e.insertBefore(this.end, t),
              e.insertBefore(this.start, this.end),
              e.insertBefore(this.template, this.end));
        else e.insertBefore(this.template, t);
      }
      remove() {
        if (
          (this.parentCtx &&
            ((e, t) => {
              const n = e.indexOf(t);
              n > -1 && e.splice(n, 1);
            })(this.parentCtx.blocks, this),
          this.start)
        ) {
          const e = this.start.parentNode;
          let t,
            n = this.start;
          for (; n && ((t = n.nextSibling), e.removeChild(n), n !== this.end); )
            n = t;
        } else this.template.parentNode.removeChild(this.template);
        this.teardown();
      }
      teardown() {
        (this.ctx.blocks.forEach((e) => {
          e.teardown();
        }),
          this.ctx.effects.forEach(To),
          this.ctx.cleanups.forEach((e) => e()));
      }
    }
    const $i = (e) => e.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&"),
      Wi = (e) => {
        const t = Gi();
        if (e && ((t.scope = qo(e)), Ui(t.scope), e.$delimiters)) {
          const [n, r] = (t.delimiters = e.$delimiters);
          t.delimitersRE = new RegExp($i(n) + "([^]+?)" + $i(r), "g");
        }
        let n;
        return (
          (t.scope.$s = hi),
          (t.scope.$nextTick = ei),
          (t.scope.$refs = Object.create(null)),
          {
            directive(e, n) {
              return n ? ((t.dirs[e] = n), this) : t.dirs[e];
            },
            mount(e) {
              if ("string" == typeof e && !(e = document.querySelector(e)))
                return;
              let r;
              return (
                (r = (e = e || document.documentElement).hasAttribute(
                  "krt-scope",
                )
                  ? [e]
                  : [...e.querySelectorAll("[krt-scope]")].filter(
                      (e) => !e.matches("[krt-scope] [krt-scope]"),
                    )),
                r.length || (r = [e]),
                (n = r.map((e) => new Bi(e, t, !0))),
                this
              );
            },
            unmount() {
              n.forEach((e) => e.teardown());
            },
          }
        );
      },
      Hi = document.currentScript;
    Hi && Hi.hasAttribute("init") && Wi().mount();
    var qi = "krt-dynamic-block-visibility-directive-styles",
      Ji = {
        visible: "krt-dynamic-block-visibility-directive--visible",
        invisible: "krt-dynamic-block-visibility-directive--invisible",
        hidden: "krt-dynamic-block-visibility-directive--hidden",
      },
      Yi = function (e) {
        var t = e.el,
          n = e.expr,
          r = e.effect,
          o = e.evaluate;
        return (
          r(function () {
            var e,
              r = o(n);
            t instanceof HTMLElement &&
              ((e = t.classList).remove.apply(e, It(Object.values(Ji))),
              Ji[r] && t.classList.add(Ji[r]));
          }),
          (function () {
            if (!document.getElementById(qi)) {
              var e = document.createElement("style");
              (e.setAttribute("id", qi), document.head.appendChild(e));
              var t = e.sheet;
              t &&
                (t.insertRule(
                  "\n.".concat(Ji.invisible, " {\n  visibility: hidden;\n}\n"),
                ),
                t.insertRule(
                  "\n.".concat(Ji.hidden, " {\n  display: none;\n}\n"),
                ));
            }
          })(),
          function () {
            var e;
            t instanceof HTMLElement &&
              t instanceof HTMLElement &&
              (e = t.classList).remove.apply(e, It(Object.values(Ji)));
          }
        );
      };
    function Qi(e, t) {
      return { eventName: e.eventName, values: t(e.valuesExpr) };
    }
    var zi = function (e) {
      var t,
        n,
        r = e.tracker,
        o =
          ((t = new Map()),
          (n = new IntersectionObserver(
            function (e) {
              e.forEach(function (e) {
                if (e.isIntersecting) {
                  var n = e.target,
                    r = t.get(n);
                  null == r || r();
                }
              });
            },
            { threshold: 0.5 },
          )),
          {
            observe: function (e, r) {
              return (
                t.set(e, r),
                n.observe(e),
                function () {
                  (n.unobserve(e), t.delete(e));
                }
              );
            },
            disconnect: function () {
              (n.disconnect(), t.clear());
            },
          }),
        i = (function () {
          var e = {};
          function t() {
            return { enabled: !1, handlers: new Set() };
          }
          return {
            getEnabled: function (t) {
              var n, r;
              return (
                null !==
                  (n =
                    null === (r = e[t]) || void 0 === r ? void 0 : r.enabled) &&
                void 0 !== n &&
                n
              );
            },
            setEnabled: function (n, r) {
              var o,
                i = null !== (o = e[n]) && void 0 !== o ? o : (e[n] = t());
              ((i.enabled = r),
                i.handlers.forEach(function (e) {
                  return e();
                }));
            },
            onChangeEnabled: function (n, r) {
              var o,
                i = null !== (o = e[n]) && void 0 !== o ? o : (e[n] = t());
              return (
                i.handlers.add(r),
                function () {
                  i.handlers.delete(r);
                }
              );
            },
          };
        })();
      return {
        directive: function (e) {
          var t,
            n = e.el,
            a = e.arg,
            c = e.effect,
            s = e.expr,
            u = e.evaluate,
            l = e.getRootSelector;
          try {
            t = (function (e) {
              var t = null != e ? e : {},
                n = t.eventName,
                r = t.valuesExpr;
              if ("string" == typeof n && "string" == typeof r)
                return { eventName: n, valuesExpr: r };
            })(JSON.parse(s));
          } catch (e) {}
          if (!t) return function () {};
          var f,
            d = t,
            p = !1,
            v = !1;
          function h() {
            var e;
            if ((null === (e = f) || void 0 === e || e(), v)) {
              if (n instanceof HTMLElement)
                switch (a) {
                  case "click":
                    var t = function () {
                      var e = Qi(d, u);
                      r.track(e.eventName, e.values);
                    };
                    (n.addEventListener("click", t),
                      (f = function () {
                        n.removeEventListener("click", t);
                      }));
                    break;
                  case "impression":
                    f = o.observe(n, function () {
                      if (!p) {
                        p = !0;
                        var e = Qi(d, u);
                        r.track(e.eventName, e.values);
                      }
                    });
                }
            } else f = void 0;
          }
          c(function () {
            h();
          });
          var g = i.onChangeEnabled(l(), function () {
            ((v = i.getEnabled(l())), h());
          });
          return function () {
            var e;
            (null === (e = f) || void 0 === e || e(), null == g || g());
          };
        },
        dispose: function () {
          o.disconnect();
        },
        setEnabled: function (e, t) {
          i.setEnabled(e, t);
        },
      };
    };
    function Zi(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        (t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r));
      }
      return n;
    }
    function Xi(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Zi(Object(n), !0).forEach(function (t) {
              E(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Zi(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                );
              });
      }
      return e;
    }
    var ea = i.createServerSideVariablesQueryResolver,
      ta = i.createClientSideVariablesQueryResolver,
      na = i.createStaticVariablesQueryResolver,
      ra = i.SERVER_SIDE_RESOLVERS,
      oa = i.CLIENT_SIDE_RESOLVERS,
      ia = function (e) {
        var t = (function () {
          switch (e._loadingStatus) {
            case "loading":
              return "invisible";
            case "success":
              return "visible";
            case "empty":
            case "error":
              return "hidden";
          }
        })();
        return Xi(Xi({}, e), {}, { _visibility: e._forcedVisibility || t });
      },
      aa = function (e) {
        return (
          (t = ia),
          (n = e),
          function (e) {
            return t(n(e));
          }
        );
        var t, n;
      };
    function ca(e, t) {
      return function (n) {
        e.setData(t, n(e.getData(t)));
      };
    }
    var sa = (0, i.createServerSideVariablesClient)({
      window: window,
      storageKey: "krt_rewrite_server_side_resolved_variables",
    });
    function ua(e, t) {
      return t
        .map(function (t) {
          return e[t.name];
        })
        .some(function (e) {
          return null == e;
        });
    }
    var la = (function () {
      var e = k(function* (e, t) {
        for (
          var n,
            r =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 5,
            o =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : 200,
            i =
              arguments.length > 4 && void 0 !== arguments[4]
                ? arguments[4]
                : 1e3,
            a = function* () {
              var n = yield e();
              if (t(n)) return { v: n };
              cn.info(
                "failed to call "
                  .concat(e.name, ". retrying ")
                  .concat(c + 1, "/")
                  .concat(r, "."),
              );
              var a = Math.min(o * Math.pow(2, c), i);
              yield new Promise(function (e) {
                return setTimeout(e, a);
              });
            },
            c = 0;
          c < r;
          c++
        )
          if ((n = yield* a())) return n.v;
      });
      return function (t, n) {
        return e.apply(this, arguments);
      };
    })();
    function fa(e, t) {
      var n =
        ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
      if (!n) {
        if (
          Array.isArray(e) ||
          (n = (function (e, t) {
            if (e) {
              if ("string" == typeof e) return da(e, t);
              var n = {}.toString.call(e).slice(8, -1);
              return (
                "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n
                  ? Array.from(e)
                  : "Arguments" === n ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? da(e, t)
                    : void 0
              );
            }
          })(e)) ||
          (t && e && "number" == typeof e.length)
        ) {
          n && (e = n);
          var r = 0,
            o = function () {};
          return {
            s: o,
            n: function () {
              return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
            },
            e: function (e) {
              throw e;
            },
            f: o,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      }
      var i,
        a = !0,
        c = !1;
      return {
        s: function () {
          n = n.call(e);
        },
        n: function () {
          var e = n.next();
          return ((a = e.done), e);
        },
        e: function (e) {
          ((c = !0), (i = e));
        },
        f: function () {
          try {
            a || null == n.return || n.return();
          } finally {
            if (c) throw i;
          }
        },
      };
    }
    function da(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var pa = function (e) {
        try {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
            r < t;
            r++
          )
            n[r - 1] = arguments[r];
          gtag.apply(void 0, [e].concat(n));
        } catch (e) {
          (cn.info("failed to call gtag."),
            e instanceof Error &&
              cn.info({ message: e.message, stack: e.stack }));
        }
      },
      va = (function () {
        return kt(
          function e(t) {
            var n, r;
            (Et(this, e),
              E(this, "propertyId", void 0),
              E(this, "sendingDistributedPatternDataEnabled", void 0),
              E(this, "prepared", !1),
              E(this, "gtagInstalled", !1),
              E(this, "gtagInstallationChecked", !1),
              E(this, "eventBuffer", []),
              (this.propertyId =
                (null === (n = t.ga4Integration) || void 0 === n
                  ? void 0
                  : n.propertyId) || ""),
              (this.sendingDistributedPatternDataEnabled =
                (null === (r = t.ga4Integration) || void 0 === r
                  ? void 0
                  : r.sendingDistributedPatternDataEnabled) || !1));
          },
          [
            {
              key: "prepare",
              value:
                ((n = k(function* () {
                  if (!this.prepared) {
                    this.prepared = !0;
                    var e = yield la(
                      function () {
                        return "function" == typeof gtag;
                      },
                      function (e) {
                        return e;
                      },
                    );
                    if (
                      ((this.gtagInstallationChecked = !0),
                      (this.gtagInstalled = !!e),
                      this.gtagInstalled)
                    ) {
                      var t,
                        n = fa(this.eventBuffer);
                      try {
                        for (n.s(); !(t = n.n()).done; ) {
                          var r = t.value;
                          pa.apply(void 0, [r.command].concat(It(r.args)));
                        }
                      } catch (e) {
                        n.e(e);
                      } finally {
                        n.f();
                      }
                    } else cn.info("gtag is not installed.");
                  }
                })),
                function () {
                  return n.apply(this, arguments);
                }),
            },
            {
              key: "send",
              value:
                ((t = k(function* (e) {
                  this.gtagInstallationChecked
                    ? this.gtagInstalled &&
                      pa.apply(void 0, [e.command].concat(It(e.args)))
                    : this.eventBuffer.push(e);
                })),
                function (e) {
                  return t.apply(this, arguments);
                }),
            },
            {
              key: "sendDistributedPatternData",
              value:
                ((e = k(function* (e) {
                  this.sendingDistributedPatternDataEnabled &&
                    (yield this.send({
                      command: "event",
                      args: [
                        "experience_impression",
                        {
                          exp_variant_string: "blocks_"
                            .concat(e.pageGroupId, "_")
                            .concat(e.conditionId, "_")
                            .concat(e.patternId),
                          send_to: this.propertyId,
                        },
                      ],
                    }));
                })),
                function (t) {
                  return e.apply(this, arguments);
                }),
            },
          ],
        );
        var e, t, n;
      })();
    function ha() {
      return (ha = k(function* (e) {
        var t = e.version,
          n = "https://cdn.jsdelivr.net/npm/keen-slider@".concat(t, "/+esm");
        return (yield import(n)).default;
      })).apply(this, arguments);
    }
    function ga(e, t, n) {
      (ma(e, t), t.set(e, n));
    }
    function ma(e, t) {
      if (t.has(e))
        throw new TypeError(
          "Cannot initialize the same private elements twice on an object",
        );
    }
    function ya(e, t, n) {
      return (e.set(_a(e, t), n), n);
    }
    function ba(e, t) {
      return e.get(_a(e, t));
    }
    function _a(e, t, n) {
      if ("function" == typeof e ? e === t : e.has(t))
        return arguments.length < 3 ? t : n;
      throw new TypeError("Private element is not present on this object");
    }
    var wa = "".concat(
        ".krt-block-carousel",
        ":not([data-keen-slider-disabled])",
      ),
      Ea = "".concat(".krt-block-carousel", "__slide"),
      Sa = "\n"
        .concat(
          wa,
          " {\n  align-content: flex-start;\n  display: flex;\n  overflow: hidden;\n  position: relative;\n  -webkit-user-select: none;\n  -webkit-touch-callout: none;\n  -khtml-user-select: none;\n  user-select: none;\n  -ms-touch-action: pan-y;\n  touch-action: pan-y;\n  -webkit-tap-highlight-color: transparent;\n  width: 100%;\n}\n\n",
        )
        .concat(wa, " ")
        .concat(
          Ea,
          " {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n  min-height: 100%;\n}\n\n",
        )
        .concat(
          wa,
          "[data-keen-slider-reverse] {\n  flex-direction: row-reverse;\n}\n\n",
        )
        .concat(wa, "[data-keen-slider-v] {\n  flex-wrap: wrap;\n}\n");
    function ka() {
      var e = document.createElement("style");
      return ((e.textContent = Sa), document.head.append(e), e);
    }
    function Ia(e) {
      var t, n, r, o, i;
      return (
        (n = new WeakMap()),
        (r = new WeakMap()),
        (o = new WeakSet()),
        (i = { _: void 0 }),
        (t = (function () {
          return kt(
            function e(t, i) {
              var a, s;
              (Et(this, e),
                ma((a = this), (s = o)),
                s.add(a),
                ga(this, n, void 0),
                ga(this, r, {}),
                _a(o, this, c).call(this, t, i));
            },
            [
              {
                key: "destroy",
                value: function () {
                  var e;
                  null === (e = _a(o, this, a).call(this)) ||
                    void 0 === e ||
                    e.destroy();
                },
              },
              {
                key: "next",
                value: function () {
                  var e;
                  null === (e = _a(o, this, a).call(this)) ||
                    void 0 === e ||
                    e.next();
                },
              },
              {
                key: "prev",
                value: function () {
                  var e;
                  null === (e = _a(o, this, a).call(this)) ||
                    void 0 === e ||
                    e.prev();
                },
              },
              {
                key: "moveTo",
                value: function (e) {
                  var t;
                  null === (t = _a(o, this, a).call(this)) ||
                    void 0 === t ||
                    t.moveToIdx(e);
                },
              },
              {
                key: "slides",
                get: function () {
                  var e, t;
                  return null !==
                    (e =
                      null === (t = _a(o, this, a).call(this)) || void 0 === t
                        ? void 0
                        : t.slides) && void 0 !== e
                    ? e
                    : [];
                },
              },
              {
                key: "on",
                value: function (e, t) {
                  var o,
                    i = this,
                    a = function () {
                      t(i);
                    };
                  ba(n, this)
                    ? ba(n, this).on(e, a)
                    : (null !== (o = ba(r, this)[e]) && void 0 !== o
                        ? o
                        : (ba(r, this)[e] = new Map())
                      ).set(t, a);
                  return function () {
                    var o;
                    ba(n, i)
                      ? ba(n, i).on(e, a, !0)
                      : null === (o = ba(r, i)[e]) ||
                        void 0 === o ||
                        o.delete(t);
                  };
                },
              },
            ],
          );
        })())
      );
      function a() {
        if (ba(n, this)) return ba(n, this);
        console.warn("Initialization is not finished.");
      }
      function c(e, t) {
        return s.apply(this, arguments);
      }
      function s() {
        return (s = k(function* (o, a) {
          var c = this,
            s = a.loop,
            u = void 0 !== s && s,
            l = a.freeMode,
            f = void 0 === l ? "none" : l,
            d = a.slides,
            p = (void 0 === d ? {} : d).perView,
            v = void 0 === p ? 1 : p;
          (new (yield e)(o, {
            selector: Ea,
            loop: u,
            mode: "none" === f ? "snap" : f,
            slides: { perView: v },
            created: function (e) {
              var t, o;
              (ya(n, c, e),
                Array.from(
                  null !==
                    (t =
                      null === (o = ba(r, c).created) || void 0 === o
                        ? void 0
                        : o.keys()) && void 0 !== t
                    ? t
                    : [],
                ).forEach(function (e) {
                  setTimeout(function () {
                    e(c);
                  }, 0);
                }),
                Object.entries(ba(r, c))
                  .filter(function (e) {
                    return "created" !== T(e, 1)[0];
                  })
                  .forEach(function (t) {
                    var n = T(t, 2),
                      r = n[0],
                      o = n[1];
                    Array.from(o.values()).forEach(function (t) {
                      e.on(r, t, !0);
                    });
                  }));
            },
          }),
            _a(t, t, i)._ || (i._ = _a(t, t, ka())));
        })).apply(this, arguments);
      }
    }
    var Oa,
      Ta = function (e) {
        var t = e.setVariable,
          n = e.getVariable,
          r = e.onAddEventHandler,
          o = e.setVisibility,
          i = e.blockId,
          a = e.actionTableClient,
          c = e.getCarouselConstructor;
        return {
          setVal: function (e, n) {
            t(e, n);
          },
          getVal: function (e) {
            return n(e);
          },
          on: function (e, t) {
            var n = r(e, t);
            return function () {
              n();
            };
          },
          show: function () {
            o("visible");
          },
          hide: function (e) {
            null != e && e.keepArea ? o("invisible") : o("hidden");
          },
          getBlockId: function () {
            return i;
          },
          collection: function (e) {
            return (function (e, t) {
              return {
                get: function (n, r) {
                  Array.isArray(n)
                    ? t
                        .getByKeys({ tableName: e, keys: n })
                        .then(function (e) {
                          return r(null, e);
                        })
                        .catch(function (e) {
                          return r(e, null);
                        })
                    : t
                        .getByKey({ tableName: e, key: n })
                        .then(function (e) {
                          return r(null, e);
                        })
                        .catch(function (e) {
                          return r(e, []);
                        });
                },
                getByQuery: function (n, r, o, i) {
                  t.getByQuery({
                    tableName: e,
                    queryName: n,
                    queryParams: r,
                    queryOptions: o,
                  })
                    .then(function (e) {
                      i(null, e);
                    })
                    .catch(function (e) {
                      return i(e, []);
                    });
                },
              };
            })(e, a);
          },
          carousel: {
            use: function () {
              return c();
            },
          },
        };
      };
    function Aa(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        (t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r));
      }
      return n;
    }
    function Ca(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Aa(Object(n), !0).forEach(function (t) {
              E(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Aa(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                );
              });
      }
      return e;
    }
    function Ra(e, t) {
      var n =
        ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
      if (!n) {
        if (
          Array.isArray(e) ||
          (n = (function (e, t) {
            if (e) {
              if ("string" == typeof e) return xa(e, t);
              var n = {}.toString.call(e).slice(8, -1);
              return (
                "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n
                  ? Array.from(e)
                  : "Arguments" === n ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? xa(e, t)
                    : void 0
              );
            }
          })(e)) ||
          (t && e && "number" == typeof e.length)
        ) {
          n && (e = n);
          var r = 0,
            o = function () {};
          return {
            s: o,
            n: function () {
              return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
            },
            e: function (e) {
              throw e;
            },
            f: o,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      }
      var i,
        a = !0,
        c = !1;
      return {
        s: function () {
          n = n.call(e);
        },
        n: function () {
          var e = n.next();
          return ((a = e.done), e);
        },
        e: function (e) {
          ((c = !0), (i = e));
        },
        f: function () {
          try {
            a || null == n.return || n.return();
          } finally {
            if (c) throw i;
          }
        },
      };
    }
    function xa(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var Pa = a.createActionTableClient;
    function Da(e) {
      var t,
        n = !["remove", "original"].includes(e.type),
        r =
          null === (t = document.querySelector(Lt(e.variationId))) ||
          void 0 === t
            ? void 0
            : t.hasAttribute(ja);
      return n && !r;
    }
    var ja = "data-krt-dynamic-block-rendered";
    function La(e, t) {
      var n = e;
      Kr(n.populatedSegments);
      var r,
        o,
        i,
        a,
        c = Qn();
      if (
        (window.__KARTE_REWRITE_ADMIN_CONFIG ||
          (window.__KARTE_REWRITE_ADMIN_CONFIG = {}),
        (window.__KARTE_REWRITE_ADMIN_CONFIG.util = {
          show_state_for_debug: function () {
            var e = tn(window.localStorage);
            return {
              isControlForAllForDebug: e(mn),
              isControlForConditionForDebug: e(gn),
              controlGroupDisability: e(gn),
              loggerEnability: e(rn),
            };
          },
          disable_control_group: function (e) {
            nn(window.localStorage)(gn, e);
          },
          enable_logger: function (e) {
            nn(window.localStorage)(rn, e);
          },
          be_control_group_for_all: function (e) {
            nn(window.localStorage)(mn, e);
          },
          be_control_group_for_condition: function (e) {
            nn(window.localStorage)(yn, e);
          },
        }),
        (r = { trackUrl: n.trackUrl }),
        (o = r.trackUrl),
        (i = nn(window.localStorage)),
        (a = new XMLHttpRequest()).open("GET", "".concat(o, "timestamp")),
        (a.onerror = function () {
          (window.console.error(
            "[blocks.timestamp] error status: ".concat(a.status),
          ),
            i("krt_blocks_sync_timestamp_diff", 0, !0));
        }),
        (a.onload = function () {
          try {
            var e = new Date(a.responseText),
              t = Date.now() - e.getTime();
            (i("krt_blocks_sync_timestamp_diff", t, !0),
              cn.info("[blocks.timestamp] synced: ".concat(t)));
          } catch (e) {
            i("krt_blocks_sync_timestamp_diff", 0, !0);
          }
        }),
        a.send(),
        cn.info("[config]", n),
        cn.info("[state]", c),
        !c.shouldSkipBuilderJs && !Zn(c.rewriteUid, n.sampling))
      ) {
        (cn.info("[sampling filter] passed"),
          cn.info("[useragent filter] passed"));
        var s,
          u = {
            config: n,
            styleSheet:
              ((s = document.createElement("style")),
              document.head.appendChild(s),
              s.sheet),
            deploymentId: t,
          },
          l = {
            onUrlChanged: function () {
              Na(u, l);
            },
          };
        Na(u, l);
      }
    }
    function Na(e, t) {
      var n = e.config,
        o = e.styleSheet,
        i = e.deploymentId;
      Kr(n.populatedSegments);
      var a,
        c,
        u,
        l = Qn(),
        f =
          ((a = n.hasControlForAll),
          (c = l.rewriteUid),
          !(u = tn(window.localStorage))(gn) &&
            (!!u(mn) || (!!a && parseInt(c.slice(-2), 16) % 10 == 0)));
      (cn.info("[hasControlForAll]", n.hasControlForAll),
        cn.info("[isInControlGroupForAll]", f));
      var d = new hn(f, n, i, l, function (e, t) {
          var n = e.getAttribute(fn);
          if (!n) return [];
          var r,
            o = n.split(","),
            i = [],
            a = Ra(o);
          try {
            var c = function () {
              var e = r.value,
                n = Ot(t, function (t) {
                  return t.areaId === e;
                });
              n && i.push(n);
            };
            for (a.s(); !(r = a.n()).done; ) c();
          } catch (e) {
            a.e(e);
          } finally {
            a.f();
          }
          return i;
        }),
        p = new hn(f, n, i, l, function (e, t) {
          var n = e.getAttribute(Rt);
          if (!n) return [];
          var r = Ot(t, function (e) {
            return e.variationId === n;
          });
          return r ? [r] : [];
        }),
        v = function () {},
        h = function () {};
      (!(function (e, t, n) {
        var r = new Sn({ limit: 50, duration: 500 }),
          o = {
            attributes: !0,
            childList: !0,
            characterData: !0,
            subtree: !0,
            attributeOldValue: !0,
          },
          i = (null == n ? void 0 : n.ignoreHashOnUrl) || !1,
          a = En(i);
        (function (e) {
          var t = !1,
            n = new MutationObserver(function (t) {
              e(t, r);
            }),
            r = {
              shouldStop: function () {
                return t;
              },
              observe: function (e, r) {
                n && ((t = !1), n.observe(e, r));
              },
              disconnect: function () {
                n && (n.disconnect(), (t = !0));
              },
            };
          return r;
        })(function (n, c) {
          if (!c.shouldStop()) {
            var s = En(i);
            if (a !== s)
              return (
                (a = s),
                void t.onUrlChanged(function () {
                  c.disconnect();
                })
              );
            t.onDomChanged(
              function () {
                c.disconnect();
              },
              function () {
                (c.disconnect(),
                  r.isBurst()
                    ? setTimeout(function () {
                        return c.observe(e, o);
                      }, 0)
                    : c.observe(e, o));
              },
            );
          }
        }).observe(e, o);
      })(document.documentElement || document.body, {
        onUrlChanged: function (e) {
          (cn.info("on url changed"),
            e(),
            p && p.disconnect(),
            d && d.disconnect(),
            h(),
            t.onUrlChanged());
        },
        onDomChanged: function (e, t) {
          (e(), v(), t());
        },
      }),
        !!window.localStorage.getItem(Vn.KRT_REWRITE_PRIORITY) &&
          cn.info("campaign priority mode enabled"));
      var g,
        m,
        y =
          ((g = n.pageGroups),
          (m = g
            .filter(function (e) {
              return r.isMatch(location.href, e.urlCondition);
            })
            .sort(function (e, t) {
              return e.priority < t.priority ? -1 : 1;
            })).length > 0
            ? m
            : void 0);
      if (y) {
        (Er({ config: n, state: l, deploymentId: i }),
          jr({
            pageGroups: y,
            isInControlGroupForAll: f,
            config: n,
            state: l,
            deploymentId: i,
          }),
          cn.info("[matched page groups]", y));
        var b = (function (e) {
          var t,
            n = e.pageGroups,
            r = e.state,
            o = e.isInControlGroupForAll,
            i =
              null ===
                (t = fr(
                  n
                    .map(function (e) {
                      return { pageGroup: e, conditions: e.conditions };
                    })
                    .map(function (e) {
                      var t = e.pageGroup;
                      return e.conditions.map(function (e) {
                        return ir({ pageGroup: t }, e);
                      });
                    })
                    .flat(),
                  r.rewriteUid,
                  r.segments,
                  r.conditionVal,
                  o,
                )) || void 0 === t
                ? void 0
                : t.filter(function (e) {
                    return void 0 !== e;
                  });
          return new Array().concat.apply([], i);
        })({ pageGroups: y, state: l, isInControlGroupForAll: f });
        if (0 !== b.length) {
          (Dr({
            pageGroups: y,
            isInControlGroupForAll: f,
            config: n,
            state: l,
            deploymentId: i,
          }),
            la(
              function (e) {
                return xr(n.apiKey);
              },
              function (e) {
                return e;
              },
              20,
              100,
              3e3,
            ));
          var _ = pr(b);
          if (_) {
            cn.info("[matched patterns]", _);
            var w,
              S =
                ((w = {}),
                _.forEach(function (e) {
                  e.variations.forEach(function (t) {
                    if (!w[t.cssSelector]) {
                      var n = ir(
                        {
                          conditionId: e.conditionId,
                          isControlForCondition: e.isControlForCondition,
                          hasControl: e.hasControl,
                          patternId: e.patternId,
                          pageGroupId: e.pageGroupId,
                        },
                        t,
                      );
                      w[t.cssSelector] = n;
                    }
                  });
                }),
                Object.keys(w).map(function (e) {
                  return w[e];
                }));
            cn.info("[matched variations]", S);
            var I,
              O,
              T = {
                originImgSrcArray: (I = S)
                  .filter(function (e) {
                    return e.originImgSrc;
                  })
                  .map(function (e) {
                    return e.originImgSrc;
                  }),
                cssSelectorArray: I.filter(function (e) {
                  return e.cssSelector;
                }).map(function (e) {
                  return e.cssSelector;
                }),
              },
              A = (function (e) {
                var t = new va(e);
                return (t.prepare(), t);
              })(n),
              C = Ra(_);
            try {
              for (C.s(); !(O = C.n()).done; ) {
                var R = O.value;
                A.sendDistributedPatternData(R);
              }
            } catch (e) {
              C.e(e);
            } finally {
              C.f();
            }
            (n.isEnabledDynamicBlock &&
              Sr({ config: n, state: l, deploymentId: i, variations: S }),
              Xn(o, T));
            var x = function (e) {
              (cn.info("rewrite doms"),
                S.forEach(function (e) {
                  !(function (e) {
                    var t = document.querySelector(e.cssSelector);
                    t &&
                      (t.hasAttribute("data-krt-blocks-area") ||
                        Vt({
                          element: t,
                          blockAttributes: Pt(e),
                          elementAttributes: [],
                        }));
                  })(e);
                }),
                (function (e) {
                  var t = e.matchedPageGroups,
                    n = e.matchedVariations;
                  (cn.info("matchedVariations:", n),
                    cn.info("matchedPageGroups:", t),
                    n.forEach(function (e) {
                      var t = document.querySelector(Nt(e.areaId));
                      if (t && "original" === e.type) {
                        var n = t.getAttribute(fn);
                        n ||
                          ((n = ""),
                          t.setAttribute(
                            fn,
                            ""
                              .concat(n, ",")
                              .concat(e.areaId)
                              .replace(/^,/, ""),
                          ));
                      }
                    }));
                  var r = [];
                  (t.forEach(function (e) {
                    e.conditions.forEach(function (e) {
                      e.patterns.forEach(function (e) {
                        var t = e.variations;
                        r = [].concat(It(r), It(t));
                      });
                    });
                  }),
                    cn.info("allVariations:", r),
                    r.forEach(function (e) {
                      var t,
                        n,
                        r =
                          document.querySelector(e.cssSelector) ||
                          document.querySelector(
                            ((t = e.cssSelector),
                            (n = t.replace(/\\/g, "\\\\").replace(/"/g, '\\"')),
                            "["
                              .concat("data-krt-blocks-css-selector", '="')
                              .concat(n, '"]')),
                          );
                      if (
                        (cn.info(
                          "check result for ".concat(e.variationId, ":"),
                          r && r.dataset.krtBlocksArea !== e.areaId,
                          "target element:",
                          r,
                        ),
                        r && r.dataset.krtBlocksArea !== e.areaId)
                      ) {
                        var o = r.getAttribute(fn);
                        (o || (o = ""),
                          o.includes(e.areaId) ||
                            r.setAttribute(
                              fn,
                              ""
                                .concat(o, ",")
                                .concat(e.areaId)
                                .replace(/^,/, ""),
                            ));
                      }
                    }));
                })({ matchedPageGroups: y, matchedVariations: S }));
              var t,
                r = Pa({ apiKey: n.apiKey, env: "production" });
              if (
                (n.isEnabledDynamicBlock &&
                  ((t = (function (e) {
                    var t,
                      n = e.apiKey,
                      r = e.usePreviewValue,
                      o = void 0 !== r && r,
                      i = e.tracker,
                      a = e.actionTableClient,
                      c = {},
                      u = {},
                      l = zi({
                        tracker: {
                          track: function (e, t) {
                            null == i || i.track(e, t);
                          },
                        },
                      });
                    function f(e, t, n) {
                      var r, o;
                      Array.from(
                        null !==
                          (r =
                            null === (o = c[e]) || void 0 === o
                              ? void 0
                              : o[t]) && void 0 !== r
                          ? r
                          : [],
                      ).map(function (e) {
                        return e(n);
                      });
                    }
                    function d(e, n, r) {
                      var o,
                        i,
                        a,
                        c =
                          null === (o = t) || void 0 === o
                            ? void 0
                            : o.dynamicRenderer,
                        s =
                          null === (i = t) ||
                          void 0 === i ||
                          null ===
                            (i = i.targets.find(function (t) {
                              return t.variation.variationId === e;
                            })) ||
                          void 0 === i
                            ? void 0
                            : i.selector;
                      c && s
                        ? ca(
                            c,
                            s,
                          )(
                            aa(function (e) {
                              return Xi(Xi({}, e), {}, E({}, n, r));
                            }),
                          )
                        : (u[e] = Xi(
                            Xi(
                              {},
                              null !== (a = u[e]) && void 0 !== a ? a : {},
                            ),
                            {},
                            E({}, n, r),
                          ));
                    }
                    return {
                      render: function (e) {
                        if (!t) {
                          var r = e.map(function (e) {
                              return e.selector;
                            }),
                            i = Fr({
                              selectors: r,
                              directives: E(
                                E({}, "visibility", Yi),
                                "tracking",
                                l.directive,
                              ),
                              PetiteVuePkg: s,
                            });
                          ((t = { dynamicRenderer: i, targets: e }),
                            r.forEach(function (e) {
                              var t;
                              null === (t = document.querySelector(e)) ||
                                void 0 === t ||
                                t.setAttribute(
                                  "krt-".concat("visibility"),
                                  "data._visibility",
                                );
                            }),
                            i.render(),
                            e.forEach(
                              (function () {
                                var e = k(function* (e) {
                                  var t = e.variation,
                                    r = e.selector,
                                    c = ca(i, r);
                                  (c(function () {
                                    return u[t.variationId];
                                  }),
                                    f(t.variationId, "beforeDataLoad"));
                                  var s,
                                    d,
                                    p,
                                    v = t.variablesQuery,
                                    h = [],
                                    g = [],
                                    m = [];
                                  ((null != v ? v : []).forEach(function (e) {
                                    ra.some(function (t) {
                                      return t === e.resolver;
                                    })
                                      ? h.push(e)
                                      : oa.some(function (t) {
                                            return t === e.resolver;
                                          })
                                        ? g.push(e)
                                        : m.push(e);
                                  }),
                                    h.length > 0 &&
                                      (s = ea(
                                        {
                                          apiKey: n,
                                          variationId: t.variationId,
                                          usePreviousValue:
                                            !t.waitLatestUserData,
                                          serverSideVariablesClient: sa,
                                        },
                                        h,
                                      )),
                                    g.length > 0 &&
                                      (d = ta(
                                        { apiKey: n, actionTableClient: a },
                                        g,
                                      )),
                                    m.length > 0 && (p = na({ apiKey: n }, m)),
                                    c(
                                      aa(function (e) {
                                        var t, n, r;
                                        return Xi(
                                          Xi(
                                            Xi(
                                              Xi(
                                                Xi({}, e),
                                                null === (t = s) || void 0 === t
                                                  ? void 0
                                                  : t.getInitial(),
                                              ),
                                              null === (n = d) || void 0 === n
                                                ? void 0
                                                : n.getInitial(),
                                            ),
                                            null === (r = p) || void 0 === r
                                              ? void 0
                                              : r.getInitial(),
                                          ),
                                          {},
                                          { _loadingStatus: "loading" },
                                        );
                                      }),
                                    ));
                                  try {
                                    if (s) {
                                      var y = yield o
                                        ? s.resolvePreview()
                                        : s.resolve({});
                                      if (ua(y, h))
                                        return void c(
                                          aa(function (e) {
                                            return Xi(
                                              Xi({}, e),
                                              {},
                                              { _loadingStatus: "empty" },
                                            );
                                          }),
                                        );
                                      c(
                                        aa(function (e) {
                                          return Xi(Xi({}, e), y);
                                        }),
                                      );
                                    }
                                    if (d) {
                                      var b = yield o
                                        ? d.resolvePreview()
                                        : d.resolve(i.getData(r));
                                      if (
                                        (c(
                                          aa(function (e) {
                                            return Xi(Xi({}, e), b);
                                          }),
                                        ),
                                        ua(b, g))
                                      )
                                        return void c(
                                          aa(function (e) {
                                            return Xi(
                                              Xi({}, e),
                                              {},
                                              { _loadingStatus: "empty" },
                                            );
                                          }),
                                        );
                                    }
                                    (yield i.nextTick(),
                                      c(
                                        aa(function (e) {
                                          return Xi(
                                            Xi({}, e),
                                            {},
                                            { _loadingStatus: "success" },
                                          );
                                        }),
                                      ),
                                      l.setEnabled(r, !0),
                                      f(t.variationId, "dataLoaded"));
                                  } catch (e) {
                                    (c(
                                      aa(function (e) {
                                        return Xi(
                                          Xi({}, e),
                                          {},
                                          { _loadingStatus: "error" },
                                        );
                                      }),
                                    ),
                                      f(t.variationId, "error", { raw: e }));
                                  }
                                });
                                return function (t) {
                                  return e.apply(this, arguments);
                                };
                              })(),
                            ));
                        }
                      },
                      on: function (e, t, n) {
                        return (
                          c[e] || (c[e] = {}),
                          c[e][t] || (c[e][t] = new Set()),
                          c[e][t].add(n),
                          function () {
                            c[e][t].delete(n);
                          }
                        );
                      },
                      setVariable: (function (e) {
                        function t(t, n, r) {
                          return e.apply(this, arguments);
                        }
                        return (
                          (t.toString = function () {
                            return e.toString();
                          }),
                          t
                        );
                      })(function (e, t, n) {
                        d(e, t, n);
                      }),
                      getVariable: function (e, n) {
                        var r,
                          o,
                          i,
                          a,
                          c =
                            null === (r = t) || void 0 === r
                              ? void 0
                              : r.dynamicRenderer,
                          s =
                            null === (o = t) ||
                            void 0 === o ||
                            null ===
                              (o = o.targets.find(function (t) {
                                return t.variation.variationId === e;
                              })) ||
                            void 0 === o
                              ? void 0
                              : o.selector;
                        return c && s
                          ? (null !== (i = c.getData(s)) && void 0 !== i
                              ? i
                              : {})[n]
                          : (null !== (a = u[e]) && void 0 !== a ? a : {})[n];
                      },
                      setVisibility: function (e, t) {
                        d(e, "_forcedVisibility", t);
                      },
                      destroy: function () {
                        var e;
                        (null === (e = t) ||
                          void 0 === e ||
                          e.dynamicRenderer.destroy(),
                          Object.keys(c).forEach(function (e) {
                            delete c[e];
                          }),
                          Object.keys(u).forEach(function (e) {
                            delete u[e];
                          }),
                          l.dispose());
                      },
                    };
                  })({
                    apiKey: n.apiKey,
                    usePreviewValue: !1,
                    tracker: {
                      track: function (e, t) {
                        !(function (e) {
                          var t = e.eventName,
                            n = e.values;
                          Rr(e.config.apiKey, t, n);
                        })({ config: n, eventName: e, values: t });
                      },
                    },
                    actionTableClient: r,
                  })),
                  (function (e, t) {
                    e.__KARTE_BLOCK_API = function (e) {
                      return t(e);
                    };
                  })(window, function (e) {
                    return Ta({
                      setVariable: function (n, r) {
                        var o;
                        null === (o = t) ||
                          void 0 === o ||
                          o.setVariable(e, n, r);
                      },
                      getVariable: function (n) {
                        var r;
                        return null === (r = t) || void 0 === r
                          ? void 0
                          : r.getVariable(e, n);
                      },
                      setVisibility: function (n) {
                        var r;
                        null === (r = t) ||
                          void 0 === r ||
                          r.setVisibility(e, n);
                      },
                      onAddEventHandler: function (n, r) {
                        var o,
                          i =
                            null === (o = t) || void 0 === o
                              ? void 0
                              : o.on(e, n, function (e) {
                                  r(e);
                                });
                        return function () {
                          null == i || i();
                        };
                      },
                      blockId: e,
                      actionTableClient: r,
                      getCarouselConstructor: function () {
                        var e;
                        return Ia(
                          null !== (e = Oa) && void 0 !== e
                            ? e
                            : (Oa = (function (e) {
                                return ha.apply(this, arguments);
                              })({
                                version: null !== "6.8.6" ? "6.8.6" : "latest",
                              })),
                        );
                      },
                    });
                  })),
                S.forEach(function (t) {
                  var r, o;
                  n.isEnabledDynamicBlock
                    ? ln(
                        Ca(
                          Ca({}, t),
                          {},
                          {
                            script: Da(t)
                              ? ((o =
                                  null !== (r = t.script) && void 0 !== r
                                    ? r
                                    : ""),
                                "\nconst krtBlock = (() => {\ntry {\n  return window."
                                  .concat("__KARTE_BLOCK_API", "(")
                                  .concat(
                                    "__karteVariationId",
                                    ");\n} catch (e) {\n  console.error(e);\n}\n})();\n",
                                  )
                                  .concat(o, "\n"))
                              : t.script,
                          },
                        ),
                        e,
                      )
                    : ln(t, e);
                }),
                t)
              ) {
                var a = S.filter(function (e) {
                  return Da(e);
                }).map(function (e) {
                  return { variation: e, selector: Lt(e.variationId) };
                });
                (a.forEach(function (e) {
                  var t,
                    n = e.selector;
                  null === (t = document.querySelector(n)) ||
                    void 0 === t ||
                    t.setAttribute(ja, "");
                }),
                  t.render(a));
              }
              var c = (function (e) {
                var t = {
                  conditionId: "SKIPPED_AREA_EVENT",
                  variationId: "SKIPPED_AREA_EVENT",
                  cssSelector: "",
                  aHref: "",
                  imgUrl: "",
                  originImgSrc: "",
                };
                return e.reduce(function (e, n) {
                  return (
                    e.findIndex(function (e) {
                      return e.areaId === n.areaId;
                    }) > -1 || e.push(ir(ir({}, n), t)),
                    e
                  );
                }, []);
              })(
                (function (e) {
                  var t = e.pageGroups,
                    n = e.state,
                    r = [];
                  document
                    .querySelectorAll("[".concat(fn, "]"))
                    .forEach(function (e) {
                      var t = e.getAttribute(fn);
                      t &&
                        t.split(",").forEach(function (e) {
                          r.indexOf(e) < 0 && r.push(e);
                        });
                    });
                  var o = [];
                  return (
                    t.forEach(function (e) {
                      dr({
                        conditions: e.conditions,
                        pageGroup: e,
                        uid: n.rewriteUid,
                        conditionVal: n.conditionVal,
                      }).forEach(function (e) {
                        e.patterns.forEach(function (t) {
                          t.variations.forEach(function (n) {
                            r.indexOf(n.areaId) >= 0 &&
                              o.push(
                                ir(
                                  ir({}, n),
                                  {},
                                  {
                                    pageGroupId: e.pageGroupId,
                                    conditionId: e.conditionId,
                                    patternId: t.patternId,
                                    isControlForCondition:
                                      e.isControlForCondition,
                                    hasControl: e.hasControl,
                                  },
                                ),
                              );
                          });
                        });
                      });
                    }),
                    o
                  );
                })({ pageGroups: y, state: l }),
              );
              (c.forEach(function (e) {
                dn({
                  elementId: e.areaId,
                  cssSelector: "[".concat(fn, '*="').concat(e.areaId, '"]'),
                  onClick: function () {
                    var t = [Ca({}, e)];
                    (Ir({
                      config: n,
                      state: l,
                      isControlForAll: f,
                      conditions: t,
                      pageGroupId: e.pageGroupId,
                      deploymentId: i,
                    }),
                      (function (e) {
                        var t = e.config,
                          n = Pr("skippedAreaClick", e.conditions);
                        Or(t.apiKey, "skippedAreaClick", n, e);
                      })({
                        config: n,
                        state: l,
                        isControlForAll: f,
                        conditions: t,
                        pageGroupId: e.pageGroupId,
                        deploymentId: i,
                      }));
                  },
                });
              }),
                d.observeVariation(c, Ir),
                S.forEach(function (e) {
                  dn({
                    elementId: e.variationId,
                    cssSelector: Lt(e.variationId),
                    onClick: function () {
                      var t = [Ca({}, e)];
                      (kr({
                        config: n,
                        state: l,
                        isControlForAll: f,
                        conditions: t,
                        pageGroupId: e.pageGroupId,
                        deploymentId: i,
                      }),
                        (function (e) {
                          var t = e.config,
                            n = Pr("click", e.conditions);
                          Or(t.apiKey, "click", n, e);
                        })({
                          config: n,
                          state: l,
                          isControlForAll: f,
                          conditions: t,
                          pageGroupId: e.pageGroupId,
                          deploymentId: i,
                        }));
                    },
                  });
                }),
                p.observeVariation(S, kr),
                (function (e) {
                  for (var t = e.cssRules.length - 1; t >= 0; t--)
                    e.deleteRule(t);
                })(o));
            };
            "loading" === document.readyState
              ? document.addEventListener("DOMContentLoaded", function () {
                  (x(), (v = x));
                })
              : (cn.info("DOMContentLoaded already fired"), x(), (v = x));
            var P = function () {
              x({ force: !0 });
            };
            (document.addEventListener("karte-blocks-force-activate", P),
              (h = function () {
                document.removeEventListener("karte-blocks-force-activate", P);
              }));
          }
        }
      }
    }
    function Ka(e) {
      var t, n, r;
      ((t = e),
        (n = function () {
          var e,
            t = window;
          t.krtBlocksPublicPreview &&
            t.krtBlocksPublicPreview.start({
              apiKey: p.krt_rewrite_config.apiKey,
              configBaseUrl:
                null === (e = p.publicPreviewConfig) || void 0 === e
                  ? void 0
                  : e.baseUrl,
            });
        }),
        (r = function () {
          var e = document.createElement("script");
          (e.addEventListener("load", n),
            (e.src = t),
            document.body.appendChild(e),
            document.removeEventListener("DOMContentLoaded", r));
        }),
        "loading" === document.readyState
          ? document.addEventListener("DOMContentLoaded", r)
          : r());
    }
    try {
      !(function () {
        var e;
        if (
          ((function () {
            if (
              (window.__KARTE_REWRITE_ADMIN_CONFIG ||
                (window.__KARTE_REWRITE_ADMIN_CONFIG = {}),
              window.__KARTE_REWRITE_ADMIN_CONFIG.IS_EXECUTED_BUILDERJS)
            )
              throw new Error(
                "builder.js cannot be loaded more than twice. Please check whether this script is loaded only once or not.",
              );
            window.__KARTE_REWRITE_ADMIN_CONFIG.IS_EXECUTED_BUILDERJS = !0;
          })(),
          (e = tn(window.localStorage)("blocks_oo")),
          -1 === document.cookie.indexOf("blocks_oo") && !e)
        )
          if (
            window.location.search
              .slice(1)
              .split("&")
              .some(function (e) {
                return /^krt_blocks_skip_builderjs/.test(e);
              })
          )
            cn.info("builder.js is skipped, since skipping query exists.");
          else {
            (p.dimensionConfig && bt(p.dimensionConfig),
              p.ingestConfig && wt(p.ingestConfig));
            var t = (function (e) {
              if (
                new URL(e).searchParams.has("krt_public_preview") &&
                p.publicPreviewConfig
              )
                return p.publicPreviewConfig.clientJsUrl;
            })(location.href);
            t ? Ka(t) : La(p.krt_rewrite_config, p.deploymentId);
          }
      })();
    } catch (e) {
      window.console.error(e);
    }
  },
});
