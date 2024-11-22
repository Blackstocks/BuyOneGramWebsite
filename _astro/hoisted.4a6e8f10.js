import "./hoisted.3b47e02d.js";
var ci = function() {
        function i(t, e) {
            e === void 0 && (e = []), this._eventType = t, this._eventFunctions = e
        }
        return i.prototype.init = function() {
            var t = this;
            this._eventFunctions.forEach(function(e) {
                typeof window < "u" && window.addEventListener(t._eventType, e)
            })
        }, i
    }(),
    Dt = globalThis && globalThis.__assign || function() {
        return Dt = Object.assign || function(i) {
            for (var t, e = 1, n = arguments.length; e < n; e++) {
                t = arguments[e];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r])
            }
            return i
        }, Dt.apply(this, arguments)
    },
    St = {
        alwaysOpen: !1,
        activeClasses: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
        inactiveClasses: "text-gray-500 dark:text-gray-400",
        onOpen: function() {},
        onClose: function() {},
        onToggle: function() {}
    },
    Re = function() {
        function i(t, e) {
            t === void 0 && (t = []), e === void 0 && (e = St), this._items = t, this._options = Dt(Dt({}, St), e), this._init()
        }
        return i.prototype._init = function() {
            var t = this;
            this._items.length && this._items.map(function(e) {
                e.active && t.open(e.id), e.triggerEl.addEventListener("click", function() {
                    t.toggle(e.id)
                })
            })
        }, i.prototype.getItem = function(t) {
            return this._items.filter(function(e) {
                return e.id === t
            })[0]
        }, i.prototype.open = function(t) {
            var e, n, r = this,
                o = this.getItem(t);
            this._options.alwaysOpen || this._items.map(function(s) {
                var a, l;
                s !== o && ((a = s.triggerEl.classList).remove.apply(a, r._options.activeClasses.split(" ")), (l = s.triggerEl.classList).add.apply(l, r._options.inactiveClasses.split(" ")), s.targetEl.classList.add("hidden"), s.triggerEl.setAttribute("aria-expanded", "false"), s.active = !1, s.iconEl && s.iconEl.classList.remove("rotate-180"))
            }), (e = o.triggerEl.classList).add.apply(e, this._options.activeClasses.split(" ")), (n = o.triggerEl.classList).remove.apply(n, this._options.inactiveClasses.split(" ")), o.triggerEl.setAttribute("aria-expanded", "true"), o.targetEl.classList.remove("hidden"), o.active = !0, o.iconEl && o.iconEl.classList.add("rotate-180"), this._options.onOpen(this, o)
        }, i.prototype.toggle = function(t) {
            var e = this.getItem(t);
            e.active ? this.close(t) : this.open(t), this._options.onToggle(this, e)
        }, i.prototype.close = function(t) {
            var e, n, r = this.getItem(t);
            (e = r.triggerEl.classList).remove.apply(e, this._options.activeClasses.split(" ")), (n = r.triggerEl.classList).add.apply(n, this._options.inactiveClasses.split(" ")), r.targetEl.classList.add("hidden"), r.triggerEl.setAttribute("aria-expanded", "false"), r.active = !1, r.iconEl && r.iconEl.classList.remove("rotate-180"), this._options.onClose(this, r)
        }, i
    }();

function Qt() {
    document.querySelectorAll("[data-accordion]").forEach(function(i) {
        var t = i.getAttribute("data-accordion"),
            e = i.getAttribute("data-active-classes"),
            n = i.getAttribute("data-inactive-classes"),
            r = [];
        i.querySelectorAll("[data-accordion-target]").forEach(function(o) {
            if (o.closest("[data-accordion]") === i) {
                var s = {
                    id: o.getAttribute("data-accordion-target"),
                    triggerEl: o,
                    targetEl: document.querySelector(o.getAttribute("data-accordion-target")),
                    iconEl: o.querySelector("[data-accordion-icon]"),
                    active: o.getAttribute("aria-expanded") === "true"
                };
                r.push(s)
            }
        }), new Re(r, {
            alwaysOpen: t === "open",
            activeClasses: e || St.activeClasses,
            inactiveClasses: n || St.inactiveClasses
        })
    })
}
typeof window < "u" && (window.Accordion = Re, window.initAccordions = Qt);
var jt = globalThis && globalThis.__assign || function() {
        return jt = Object.assign || function(i) {
            for (var t, e = 1, n = arguments.length; e < n; e++) {
                t = arguments[e];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r])
            }
            return i
        }, jt.apply(this, arguments)
    },
    ke = {
        onCollapse: function() {},
        onExpand: function() {},
        onToggle: function() {}
    },
    Ve = function() {
        function i(t, e, n) {
            t === void 0 && (t = null), e === void 0 && (e = null), n === void 0 && (n = ke), this._targetEl = t, this._triggerEl = e, this._options = jt(jt({}, ke), n), this._visible = !1, this._init()
        }
        return i.prototype._init = function() {
            var t = this;
            this._triggerEl && (this._triggerEl.hasAttribute("aria-expanded") ? this._visible = this._triggerEl.getAttribute("aria-expanded") === "true" : this._visible = !this._targetEl.classList.contains("hidden"), this._triggerEl.addEventListener("click", function() {
                t.toggle()
            }))
        }, i.prototype.collapse = function() {
            this._targetEl.classList.add("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "false"), this._visible = !1, this._options.onCollapse(this)
        }, i.prototype.expand = function() {
            this._targetEl.classList.remove("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "true"), this._visible = !0, this._options.onExpand(this)
        }, i.prototype.toggle = function() {
            this._visible ? this.collapse() : this.expand(), this._options.onToggle(this)
        }, i
    }();

function Zt() {
    document.querySelectorAll("[data-collapse-toggle]").forEach(function(i) {
        var t = i.getAttribute("data-collapse-toggle"),
            e = document.getElementById(t);
        e ? new Ve(e, i) : console.error('The target element with id "'.concat(t, '" does not exist. Please check the data-collapse-toggle attribute.'))
    })
}
typeof window < "u" && (window.Collapse = Ve, window.initCollapses = Zt);
var Q = globalThis && globalThis.__assign || function() {
        return Q = Object.assign || function(i) {
            for (var t, e = 1, n = arguments.length; e < n; e++) {
                t = arguments[e];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r])
            }
            return i
        }, Q.apply(this, arguments)
    },
    It = {
        defaultPosition: 0,
        indicators: {
            items: [],
            activeClasses: "bg-white dark:bg-gray-800",
            inactiveClasses: "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
        },
        interval: 3e3,
        onNext: function() {},
        onPrev: function() {},
        onChange: function() {}
    },
    te = function() {
        function i(t, e) {
            t === void 0 && (t = []), e === void 0 && (e = It), this._items = t, this._options = Q(Q(Q({}, It), e), {
                indicators: Q(Q({}, It.indicators), e.indicators)
            }), this._activeItem = this.getItem(this._options.defaultPosition), this._indicators = this._options.indicators.items, this._intervalDuration = this._options.interval, this._intervalInstance = null, this._init()
        }
        return i.prototype._init = function() {
            var t = this;
            this._items.map(function(e) {
                e.el.classList.add("absolute", "inset-0", "transition-transform", "transform")
            }), this._getActiveItem() ? this.slideTo(this._getActiveItem().position) : this.slideTo(0), this._indicators.map(function(e, n) {
                e.el.addEventListener("click", function() {
                    t.slideTo(n)
                })
            })
        }, i.prototype.getItem = function(t) {
            return this._items[t]
        }, i.prototype.slideTo = function(t) {
            var e = this._items[t],
                n = {
                    left: e.position === 0 ? this._items[this._items.length - 1] : this._items[e.position - 1],
                    middle: e,
                    right: e.position === this._items.length - 1 ? this._items[0] : this._items[e.position + 1]
                };
            this._rotate(n), this._setActiveItem(e), this._intervalInstance && (this.pause(), this.cycle()), this._options.onChange(this)
        }, i.prototype.next = function() {
            var t = this._getActiveItem(),
                e = null;
            t.position === this._items.length - 1 ? e = this._items[0] : e = this._items[t.position + 1], this.slideTo(e.position), this._options.onNext(this)
        }, i.prototype.prev = function() {
            var t = this._getActiveItem(),
                e = null;
            t.position === 0 ? e = this._items[this._items.length - 1] : e = this._items[t.position - 1], this.slideTo(e.position), this._options.onPrev(this)
        }, i.prototype._rotate = function(t) {
            this._items.map(function(e) {
                e.el.classList.add("hidden")
            }), t.left.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-20"), t.left.el.classList.add("-translate-x-full", "z-10"), t.middle.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-10"), t.middle.el.classList.add("translate-x-0", "z-20"), t.right.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-20"), t.right.el.classList.add("translate-x-full", "z-10")
        }, i.prototype.cycle = function() {
            var t = this;
            typeof window < "u" && (this._intervalInstance = window.setInterval(function() {
                t.next()
            }, this._intervalDuration))
        }, i.prototype.pause = function() {
            clearInterval(this._intervalInstance)
        }, i.prototype._getActiveItem = function() {
            return this._activeItem
        }, i.prototype._setActiveItem = function(t) {
            var e, n, r = this;
            this._activeItem = t;
            var o = t.position;
            this._indicators.length && (this._indicators.map(function(s) {
                var a, l;
                s.el.setAttribute("aria-current", "false"), (a = s.el.classList).remove.apply(a, r._options.indicators.activeClasses.split(" ")), (l = s.el.classList).add.apply(l, r._options.indicators.inactiveClasses.split(" "))
            }), (e = this._indicators[o].el.classList).add.apply(e, this._options.indicators.activeClasses.split(" ")), (n = this._indicators[o].el.classList).remove.apply(n, this._options.indicators.inactiveClasses.split(" ")), this._indicators[o].el.setAttribute("aria-current", "true"))
        }, i
    }();

function ee() {
    document.querySelectorAll("[data-carousel]").forEach(function(i) {
        var t = i.getAttribute("data-carousel-interval"),
            e = i.getAttribute("data-carousel") === "slide",
            n = [],
            r = 0;
        i.querySelectorAll("[data-carousel-item]").length && Array.from(i.querySelectorAll("[data-carousel-item]")).map(function(d, c) {
            n.push({
                position: c,
                el: d
            }), d.getAttribute("data-carousel-item") === "active" && (r = c)
        });
        var o = [];
        i.querySelectorAll("[data-carousel-slide-to]").length && Array.from(i.querySelectorAll("[data-carousel-slide-to]")).map(function(d) {
            o.push({
                position: parseInt(d.getAttribute("data-carousel-slide-to")),
                el: d
            })
        });
        var s = new te(n, {
            defaultPosition: r,
            indicators: {
                items: o
            },
            interval: t || It.interval
        });
        e && s.cycle();
        var a = i.querySelector("[data-carousel-next]"),
            l = i.querySelector("[data-carousel-prev]");
        a && a.addEventListener("click", function() {
            s.next()
        }), l && l.addEventListener("click", function() {
            s.prev()
        })
    })
}
typeof window < "u" && (window.Carousel = te, window.initCarousels = ee);
var Bt = globalThis && globalThis.__assign || function() {
        return Bt = Object.assign || function(i) {
            for (var t, e = 1, n = arguments.length; e < n; e++) {
                t = arguments[e];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r])
            }
            return i
        }, Bt.apply(this, arguments)
    },
    Te = {
        transition: "transition-opacity",
        duration: 300,
        timing: "ease-out",
        onHide: function() {}
    },
    ze = function() {
        function i(t, e, n) {
            t === void 0 && (t = null), e === void 0 && (e = null), n === void 0 && (n = Te), this._targetEl = t, this._triggerEl = e, this._options = Bt(Bt({}, Te), n), this._init()
        }
        return i.prototype._init = function() {
            var t = this;
            this._triggerEl && this._triggerEl.addEventListener("click", function() {
                t.hide()
            })
        }, i.prototype.hide = function() {
            var t = this;
            this._targetEl.classList.add(this._options.transition, "duration-".concat(this._options.duration), this._options.timing, "opacity-0"), setTimeout(function() {
                t._targetEl.classList.add("hidden")
            }, this._options.duration), this._options.onHide(this, this._targetEl)
        }, i
    }();

function ie() {
    document.querySelectorAll("[data-dismiss-target]").forEach(function(i) {
        var t = i.getAttribute("data-dismiss-target"),
            e = document.querySelector(t);
        e ? new ze(e, i) : console.error('The dismiss element with id "'.concat(t, '" does not exist. Please check the data-dismiss-target attribute.'))
    })
}
typeof window < "u" && (window.Dismiss = ze, window.initDismisses = ie);
var C = "top",
    j = "bottom",
    B = "right",
    I = "left",
    ne = "auto",
    mt = [C, j, B, I],
    ot = "start",
    vt = "end",
    di = "clippingParents",
    We = "viewport",
    ut = "popper",
    ui = "reference",
    Ce = mt.reduce(function(i, t) {
        return i.concat([t + "-" + ot, t + "-" + vt])
    }, []),
    $e = [].concat(mt, [ne]).reduce(function(i, t) {
        return i.concat([t, t + "-" + ot, t + "-" + vt])
    }, []),
    fi = "beforeRead",
    pi = "read",
    hi = "afterRead",
    vi = "beforeMain",
    gi = "main",
    mi = "afterMain",
    yi = "beforeWrite",
    _i = "write",
    bi = "afterWrite",
    wi = [fi, pi, hi, vi, gi, mi, yi, _i, bi];

function R(i) {
    return i ? (i.nodeName || "").toLowerCase() : null
}

function D(i) {
    if (i == null) return window;
    if (i.toString() !== "[object Window]") {
        var t = i.ownerDocument;
        return t && t.defaultView || window
    }
    return i
}

function it(i) {
    var t = D(i).Element;
    return i instanceof t || i instanceof Element
}

function S(i) {
    var t = D(i).HTMLElement;
    return i instanceof t || i instanceof HTMLElement
}

function re(i) {
    if (typeof ShadowRoot > "u") return !1;
    var t = D(i).ShadowRoot;
    return i instanceof t || i instanceof ShadowRoot
}

function Ei(i) {
    var t = i.state;
    Object.keys(t.elements).forEach(function(e) {
        var n = t.styles[e] || {},
            r = t.attributes[e] || {},
            o = t.elements[e];
        !S(o) || !R(o) || (Object.assign(o.style, n), Object.keys(r).forEach(function(s) {
            var a = r[s];
            a === !1 ? o.removeAttribute(s) : o.setAttribute(s, a === !0 ? "" : a)
        }))
    })
}

function Li(i) {
    var t = i.state,
        e = {
            popper: {
                position: t.options.strategy,
                left: "0",
                top: "0",
                margin: "0"
            },
            arrow: {
                position: "absolute"
            },
            reference: {}
        };
    return Object.assign(t.elements.popper.style, e.popper), t.styles = e, t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow),
        function() {
            Object.keys(t.elements).forEach(function(n) {
                var r = t.elements[n],
                    o = t.attributes[n] || {},
                    s = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : e[n]),
                    a = s.reduce(function(l, d) {
                        return l[d] = "", l
                    }, {});
                !S(r) || !R(r) || (Object.assign(r.style, a), Object.keys(o).forEach(function(l) {
                    r.removeAttribute(l)
                }))
            })
        }
}
const Ai = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: Ei,
    effect: Li,
    requires: ["computeStyles"]
};

function M(i) {
    return i.split("-")[0]
}
var et = Math.max,
    Ht = Math.min,
    st = Math.round;

function Yt() {
    var i = navigator.userAgentData;
    return i != null && i.brands && Array.isArray(i.brands) ? i.brands.map(function(t) {
        return t.brand + "/" + t.version
    }).join(" ") : navigator.userAgent
}

function Ne() {
    return !/^((?!chrome|android).)*safari/i.test(Yt())
}

function at(i, t, e) {
    t === void 0 && (t = !1), e === void 0 && (e = !1);
    var n = i.getBoundingClientRect(),
        r = 1,
        o = 1;
    t && S(i) && (r = i.offsetWidth > 0 && st(n.width) / i.offsetWidth || 1, o = i.offsetHeight > 0 && st(n.height) / i.offsetHeight || 1);
    var s = it(i) ? D(i) : window,
        a = s.visualViewport,
        l = !Ne() && e,
        d = (n.left + (l && a ? a.offsetLeft : 0)) / r,
        c = (n.top + (l && a ? a.offsetTop : 0)) / o,
        v = n.width / r,
        y = n.height / o;
    return {
        width: v,
        height: y,
        top: c,
        right: d + v,
        bottom: c + y,
        left: d,
        x: d,
        y: c
    }
}

function oe(i) {
    var t = at(i),
        e = i.offsetWidth,
        n = i.offsetHeight;
    return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
        x: i.offsetLeft,
        y: i.offsetTop,
        width: e,
        height: n
    }
}

function Fe(i, t) {
    var e = t.getRootNode && t.getRootNode();
    if (i.contains(t)) return !0;
    if (e && re(e)) {
        var n = t;
        do {
            if (n && i.isSameNode(n)) return !0;
            n = n.parentNode || n.host
        } while (n)
    }
    return !1
}

function z(i) {
    return D(i).getComputedStyle(i)
}

function xi(i) {
    return ["table", "td", "th"].indexOf(R(i)) >= 0
}

function X(i) {
    return ((it(i) ? i.ownerDocument : i.document) || window.document).documentElement
}

function $t(i) {
    return R(i) === "html" ? i : i.assignedSlot || i.parentNode || (re(i) ? i.host : null) || X(i)
}

function Ie(i) {
    return !S(i) || z(i).position === "fixed" ? null : i.offsetParent
}

function Oi(i) {
    var t = /firefox/i.test(Yt()),
        e = /Trident/i.test(Yt());
    if (e && S(i)) {
        var n = z(i);
        if (n.position === "fixed") return null
    }
    var r = $t(i);
    for (re(r) && (r = r.host); S(r) && ["html", "body"].indexOf(R(r)) < 0;) {
        var o = z(r);
        if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || t && o.willChange === "filter" || t && o.filter && o.filter !== "none") return r;
        r = r.parentNode
    }
    return null
}

function yt(i) {
    for (var t = D(i), e = Ie(i); e && xi(e) && z(e).position === "static";) e = Ie(e);
    return e && (R(e) === "html" || R(e) === "body" && z(e).position === "static") ? t : e || Oi(i) || t
}

function se(i) {
    return ["top", "bottom"].indexOf(i) >= 0 ? "x" : "y"
}

function ft(i, t, e) {
    return et(i, Ht(t, e))
}

function ki(i, t, e) {
    var n = ft(i, t, e);
    return n > e ? e : n
}

function Xe() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}

function Ke(i) {
    return Object.assign({}, Xe(), i)
}

function Ye(i, t) {
    return t.reduce(function(e, n) {
        return e[n] = i, e
    }, {})
}
var Ti = function(t, e) {
    return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
        placement: e.placement
    })) : t, Ke(typeof t != "number" ? t : Ye(t, mt))
};

function Ci(i) {
    var t, e = i.state,
        n = i.name,
        r = i.options,
        o = e.elements.arrow,
        s = e.modifiersData.popperOffsets,
        a = M(e.placement),
        l = se(a),
        d = [I, B].indexOf(a) >= 0,
        c = d ? "height" : "width";
    if (!(!o || !s)) {
        var v = Ti(r.padding, e),
            y = oe(o),
            u = l === "y" ? C : I,
            b = l === "y" ? j : B,
            h = e.rects.reference[c] + e.rects.reference[l] - s[l] - e.rects.popper[c],
            p = s[l] - e.rects.reference[l],
            _ = yt(o),
            E = _ ? l === "y" ? _.clientHeight || 0 : _.clientWidth || 0 : 0,
            L = h / 2 - p / 2,
            f = v[u],
            g = E - y[c] - v[b],
            m = E / 2 - y[c] / 2 + L,
            w = ft(f, m, g),
            O = l;
        e.modifiersData[n] = (t = {}, t[O] = w, t.centerOffset = w - m, t)
    }
}

function Ii(i) {
    var t = i.state,
        e = i.options,
        n = e.element,
        r = n === void 0 ? "[data-popper-arrow]" : n;
    r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || Fe(t.elements.popper, r) && (t.elements.arrow = r))
}
const Pi = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: Ci,
    effect: Ii,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
};

function lt(i) {
    return i.split("-")[1]
}
var Di = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
};

function Si(i, t) {
    var e = i.x,
        n = i.y,
        r = t.devicePixelRatio || 1;
    return {
        x: st(e * r) / r || 0,
        y: st(n * r) / r || 0
    }
}

function Pe(i) {
    var t, e = i.popper,
        n = i.popperRect,
        r = i.placement,
        o = i.variation,
        s = i.offsets,
        a = i.position,
        l = i.gpuAcceleration,
        d = i.adaptive,
        c = i.roundOffsets,
        v = i.isFixed,
        y = s.x,
        u = y === void 0 ? 0 : y,
        b = s.y,
        h = b === void 0 ? 0 : b,
        p = typeof c == "function" ? c({
            x: u,
            y: h
        }) : {
            x: u,
            y: h
        };
    u = p.x, h = p.y;
    var _ = s.hasOwnProperty("x"),
        E = s.hasOwnProperty("y"),
        L = I,
        f = C,
        g = window;
    if (d) {
        var m = yt(e),
            w = "clientHeight",
            O = "clientWidth";
        if (m === D(e) && (m = X(e), z(m).position !== "static" && a === "absolute" && (w = "scrollHeight", O = "scrollWidth")), m = m, r === C || (r === I || r === B) && o === vt) {
            f = j;
            var x = v && m === g && g.visualViewport ? g.visualViewport.height : m[w];
            h -= x - n.height, h *= l ? 1 : -1
        }
        if (r === I || (r === C || r === j) && o === vt) {
            L = B;
            var A = v && m === g && g.visualViewport ? g.visualViewport.width : m[O];
            u -= A - n.width, u *= l ? 1 : -1
        }
    }
    var k = Object.assign({
            position: a
        }, d && Di),
        H = c === !0 ? Si({
            x: u,
            y: h
        }, D(e)) : {
            x: u,
            y: h
        };
    if (u = H.x, h = H.y, l) {
        var T;
        return Object.assign({}, k, (T = {}, T[f] = E ? "0" : "", T[L] = _ ? "0" : "", T.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + h + "px)" : "translate3d(" + u + "px, " + h + "px, 0)", T))
    }
    return Object.assign({}, k, (t = {}, t[f] = E ? h + "px" : "", t[L] = _ ? u + "px" : "", t.transform = "", t))
}

function ji(i) {
    var t = i.state,
        e = i.options,
        n = e.gpuAcceleration,
        r = n === void 0 ? !0 : n,
        o = e.adaptive,
        s = o === void 0 ? !0 : o,
        a = e.roundOffsets,
        l = a === void 0 ? !0 : a,
        d = {
            placement: M(t.placement),
            variation: lt(t.placement),
            popper: t.elements.popper,
            popperRect: t.rects.popper,
            gpuAcceleration: r,
            isFixed: t.options.strategy === "fixed"
        };
    t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Pe(Object.assign({}, d, {
        offsets: t.modifiersData.popperOffsets,
        position: t.options.strategy,
        adaptive: s,
        roundOffsets: l
    })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Pe(Object.assign({}, d, {
        offsets: t.modifiersData.arrow,
        position: "absolute",
        adaptive: !1,
        roundOffsets: l
    })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-placement": t.placement
    })
}
const Bi = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: ji,
    data: {}
};
var At = {
    passive: !0
};

function Hi(i) {
    var t = i.state,
        e = i.instance,
        n = i.options,
        r = n.scroll,
        o = r === void 0 ? !0 : r,
        s = n.resize,
        a = s === void 0 ? !0 : s,
        l = D(t.elements.popper),
        d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
    return o && d.forEach(function(c) {
            c.addEventListener("scroll", e.update, At)
        }), a && l.addEventListener("resize", e.update, At),
        function() {
            o && d.forEach(function(c) {
                c.removeEventListener("scroll", e.update, At)
            }), a && l.removeEventListener("resize", e.update, At)
        }
}
const qi = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function() {},
    effect: Hi,
    data: {}
};
var Mi = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
};

function Pt(i) {
    return i.replace(/left|right|bottom|top/g, function(t) {
        return Mi[t]
    })
}
var Ri = {
    start: "end",
    end: "start"
};

function De(i) {
    return i.replace(/start|end/g, function(t) {
        return Ri[t]
    })
}

function ae(i) {
    var t = D(i),
        e = t.pageXOffset,
        n = t.pageYOffset;
    return {
        scrollLeft: e,
        scrollTop: n
    }
}

function le(i) {
    return at(X(i)).left + ae(i).scrollLeft
}

function Vi(i, t) {
    var e = D(i),
        n = X(i),
        r = e.visualViewport,
        o = n.clientWidth,
        s = n.clientHeight,
        a = 0,
        l = 0;
    if (r) {
        o = r.width, s = r.height;
        var d = Ne();
        (d || !d && t === "fixed") && (a = r.offsetLeft, l = r.offsetTop)
    }
    return {
        width: o,
        height: s,
        x: a + le(i),
        y: l
    }
}

function zi(i) {
    var t, e = X(i),
        n = ae(i),
        r = (t = i.ownerDocument) == null ? void 0 : t.body,
        o = et(e.scrollWidth, e.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0),
        s = et(e.scrollHeight, e.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0),
        a = -n.scrollLeft + le(i),
        l = -n.scrollTop;
    return z(r || e).direction === "rtl" && (a += et(e.clientWidth, r ? r.clientWidth : 0) - o), {
        width: o,
        height: s,
        x: a,
        y: l
    }
}

function ce(i) {
    var t = z(i),
        e = t.overflow,
        n = t.overflowX,
        r = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(e + r + n)
}

function Ue(i) {
    return ["html", "body", "#document"].indexOf(R(i)) >= 0 ? i.ownerDocument.body : S(i) && ce(i) ? i : Ue($t(i))
}

function pt(i, t) {
    var e;
    t === void 0 && (t = []);
    var n = Ue(i),
        r = n === ((e = i.ownerDocument) == null ? void 0 : e.body),
        o = D(n),
        s = r ? [o].concat(o.visualViewport || [], ce(n) ? n : []) : n,
        a = t.concat(s);
    return r ? a : a.concat(pt($t(s)))
}

function Ut(i) {
    return Object.assign({}, i, {
        left: i.x,
        top: i.y,
        right: i.x + i.width,
        bottom: i.y + i.height
    })
}

function Wi(i, t) {
    var e = at(i, !1, t === "fixed");
    return e.top = e.top + i.clientTop, e.left = e.left + i.clientLeft, e.bottom = e.top + i.clientHeight, e.right = e.left + i.clientWidth, e.width = i.clientWidth, e.height = i.clientHeight, e.x = e.left, e.y = e.top, e
}

function Se(i, t, e) {
    return t === We ? Ut(Vi(i, e)) : it(t) ? Wi(t, e) : Ut(zi(X(i)))
}

function $i(i) {
    var t = pt($t(i)),
        e = ["absolute", "fixed"].indexOf(z(i).position) >= 0,
        n = e && S(i) ? yt(i) : i;
    return it(n) ? t.filter(function(r) {
        return it(r) && Fe(r, n) && R(r) !== "body"
    }) : []
}

function Ni(i, t, e, n) {
    var r = t === "clippingParents" ? $i(i) : [].concat(t),
        o = [].concat(r, [e]),
        s = o[0],
        a = o.reduce(function(l, d) {
            var c = Se(i, d, n);
            return l.top = et(c.top, l.top), l.right = Ht(c.right, l.right), l.bottom = Ht(c.bottom, l.bottom), l.left = et(c.left, l.left), l
        }, Se(i, s, n));
    return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a
}

function Ge(i) {
    var t = i.reference,
        e = i.element,
        n = i.placement,
        r = n ? M(n) : null,
        o = n ? lt(n) : null,
        s = t.x + t.width / 2 - e.width / 2,
        a = t.y + t.height / 2 - e.height / 2,
        l;
    switch (r) {
        case C:
            l = {
                x: s,
                y: t.y - e.height
            };
            break;
        case j:
            l = {
                x: s,
                y: t.y + t.height
            };
            break;
        case B:
            l = {
                x: t.x + t.width,
                y: a
            };
            break;
        case I:
            l = {
                x: t.x - e.width,
                y: a
            };
            break;
        default:
            l = {
                x: t.x,
                y: t.y
            }
    }
    var d = r ? se(r) : null;
    if (d != null) {
        var c = d === "y" ? "height" : "width";
        switch (o) {
            case ot:
                l[d] = l[d] - (t[c] / 2 - e[c] / 2);
                break;
            case vt:
                l[d] = l[d] + (t[c] / 2 - e[c] / 2);
                break
        }
    }
    return l
}

function gt(i, t) {
    t === void 0 && (t = {});
    var e = t,
        n = e.placement,
        r = n === void 0 ? i.placement : n,
        o = e.strategy,
        s = o === void 0 ? i.strategy : o,
        a = e.boundary,
        l = a === void 0 ? di : a,
        d = e.rootBoundary,
        c = d === void 0 ? We : d,
        v = e.elementContext,
        y = v === void 0 ? ut : v,
        u = e.altBoundary,
        b = u === void 0 ? !1 : u,
        h = e.padding,
        p = h === void 0 ? 0 : h,
        _ = Ke(typeof p != "number" ? p : Ye(p, mt)),
        E = y === ut ? ui : ut,
        L = i.rects.popper,
        f = i.elements[b ? E : y],
        g = Ni(it(f) ? f : f.contextElement || X(i.elements.popper), l, c, s),
        m = at(i.elements.reference),
        w = Ge({
            reference: m,
            element: L,
            strategy: "absolute",
            placement: r
        }),
        O = Ut(Object.assign({}, L, w)),
        x = y === ut ? O : m,
        A = {
            top: g.top - x.top + _.top,
            bottom: x.bottom - g.bottom + _.bottom,
            left: g.left - x.left + _.left,
            right: x.right - g.right + _.right
        },
        k = i.modifiersData.offset;
    if (y === ut && k) {
        var H = k[r];
        Object.keys(A).forEach(function(T) {
            var K = [B, j].indexOf(T) >= 0 ? 1 : -1,
                Y = [C, j].indexOf(T) >= 0 ? "y" : "x";
            A[T] += H[Y] * K
        })
    }
    return A
}

function Fi(i, t) {
    t === void 0 && (t = {});
    var e = t,
        n = e.placement,
        r = e.boundary,
        o = e.rootBoundary,
        s = e.padding,
        a = e.flipVariations,
        l = e.allowedAutoPlacements,
        d = l === void 0 ? $e : l,
        c = lt(n),
        v = c ? a ? Ce : Ce.filter(function(b) {
            return lt(b) === c
        }) : mt,
        y = v.filter(function(b) {
            return d.indexOf(b) >= 0
        });
    y.length === 0 && (y = v);
    var u = y.reduce(function(b, h) {
        return b[h] = gt(i, {
            placement: h,
            boundary: r,
            rootBoundary: o,
            padding: s
        })[M(h)], b
    }, {});
    return Object.keys(u).sort(function(b, h) {
        return u[b] - u[h]
    })
}

function Xi(i) {
    if (M(i) === ne) return [];
    var t = Pt(i);
    return [De(i), t, De(t)]
}

function Ki(i) {
    var t = i.state,
        e = i.options,
        n = i.name;
    if (!t.modifiersData[n]._skip) {
        for (var r = e.mainAxis, o = r === void 0 ? !0 : r, s = e.altAxis, a = s === void 0 ? !0 : s, l = e.fallbackPlacements, d = e.padding, c = e.boundary, v = e.rootBoundary, y = e.altBoundary, u = e.flipVariations, b = u === void 0 ? !0 : u, h = e.allowedAutoPlacements, p = t.options.placement, _ = M(p), E = _ === p, L = l || (E || !b ? [Pt(p)] : Xi(p)), f = [p].concat(L).reduce(function(nt, W) {
                return nt.concat(M(W) === ne ? Fi(t, {
                    placement: W,
                    boundary: c,
                    rootBoundary: v,
                    padding: d,
                    flipVariations: b,
                    allowedAutoPlacements: h
                }) : W)
            }, []), g = t.rects.reference, m = t.rects.popper, w = new Map, O = !0, x = f[0], A = 0; A < f.length; A++) {
            var k = f[A],
                H = M(k),
                T = lt(k) === ot,
                K = [C, j].indexOf(H) >= 0,
                Y = K ? "width" : "height",
                P = gt(t, {
                    placement: k,
                    boundary: c,
                    rootBoundary: v,
                    altBoundary: y,
                    padding: d
                }),
                q = K ? T ? B : I : T ? j : C;
            g[Y] > m[Y] && (q = Pt(q));
            var _t = Pt(q),
                U = [];
            if (o && U.push(P[H] <= 0), a && U.push(P[q] <= 0, P[_t] <= 0), U.every(function(nt) {
                    return nt
                })) {
                x = k, O = !1;
                break
            }
            w.set(k, U)
        }
        if (O)
            for (var bt = b ? 3 : 1, Nt = function(W) {
                    var dt = f.find(function(Et) {
                        var G = w.get(Et);
                        if (G) return G.slice(0, W).every(function(Ft) {
                            return Ft
                        })
                    });
                    if (dt) return x = dt, "break"
                }, ct = bt; ct > 0; ct--) {
                var wt = Nt(ct);
                if (wt === "break") break
            }
        t.placement !== x && (t.modifiersData[n]._skip = !0, t.placement = x, t.reset = !0)
    }
}
const Yi = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: Ki,
    requiresIfExists: ["offset"],
    data: {
        _skip: !1
    }
};

function je(i, t, e) {
    return e === void 0 && (e = {
        x: 0,
        y: 0
    }), {
        top: i.top - t.height - e.y,
        right: i.right - t.width + e.x,
        bottom: i.bottom - t.height + e.y,
        left: i.left - t.width - e.x
    }
}

function Be(i) {
    return [C, B, j, I].some(function(t) {
        return i[t] >= 0
    })
}

function Ui(i) {
    var t = i.state,
        e = i.name,
        n = t.rects.reference,
        r = t.rects.popper,
        o = t.modifiersData.preventOverflow,
        s = gt(t, {
            elementContext: "reference"
        }),
        a = gt(t, {
            altBoundary: !0
        }),
        l = je(s, n),
        d = je(a, r, o),
        c = Be(l),
        v = Be(d);
    t.modifiersData[e] = {
        referenceClippingOffsets: l,
        popperEscapeOffsets: d,
        isReferenceHidden: c,
        hasPopperEscaped: v
    }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-reference-hidden": c,
        "data-popper-escaped": v
    })
}
const Gi = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: Ui
};

function Ji(i, t, e) {
    var n = M(i),
        r = [I, C].indexOf(n) >= 0 ? -1 : 1,
        o = typeof e == "function" ? e(Object.assign({}, t, {
            placement: i
        })) : e,
        s = o[0],
        a = o[1];
    return s = s || 0, a = (a || 0) * r, [I, B].indexOf(n) >= 0 ? {
        x: a,
        y: s
    } : {
        x: s,
        y: a
    }
}

function Qi(i) {
    var t = i.state,
        e = i.options,
        n = i.name,
        r = e.offset,
        o = r === void 0 ? [0, 0] : r,
        s = $e.reduce(function(c, v) {
            return c[v] = Ji(v, t.rects, o), c
        }, {}),
        a = s[t.placement],
        l = a.x,
        d = a.y;
    t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += d), t.modifiersData[n] = s
}
const Zi = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: Qi
};

function tn(i) {
    var t = i.state,
        e = i.name;
    t.modifiersData[e] = Ge({
        reference: t.rects.reference,
        element: t.rects.popper,
        strategy: "absolute",
        placement: t.placement
    })
}
const en = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: tn,
    data: {}
};

function nn(i) {
    return i === "x" ? "y" : "x"
}

function rn(i) {
    var t = i.state,
        e = i.options,
        n = i.name,
        r = e.mainAxis,
        o = r === void 0 ? !0 : r,
        s = e.altAxis,
        a = s === void 0 ? !1 : s,
        l = e.boundary,
        d = e.rootBoundary,
        c = e.altBoundary,
        v = e.padding,
        y = e.tether,
        u = y === void 0 ? !0 : y,
        b = e.tetherOffset,
        h = b === void 0 ? 0 : b,
        p = gt(t, {
            boundary: l,
            rootBoundary: d,
            padding: v,
            altBoundary: c
        }),
        _ = M(t.placement),
        E = lt(t.placement),
        L = !E,
        f = se(_),
        g = nn(f),
        m = t.modifiersData.popperOffsets,
        w = t.rects.reference,
        O = t.rects.popper,
        x = typeof h == "function" ? h(Object.assign({}, t.rects, {
            placement: t.placement
        })) : h,
        A = typeof x == "number" ? {
            mainAxis: x,
            altAxis: x
        } : Object.assign({
            mainAxis: 0,
            altAxis: 0
        }, x),
        k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        H = {
            x: 0,
            y: 0
        };
    if (m) {
        if (o) {
            var T, K = f === "y" ? C : I,
                Y = f === "y" ? j : B,
                P = f === "y" ? "height" : "width",
                q = m[f],
                _t = q + p[K],
                U = q - p[Y],
                bt = u ? -O[P] / 2 : 0,
                Nt = E === ot ? w[P] : O[P],
                ct = E === ot ? -O[P] : -w[P],
                wt = t.elements.arrow,
                nt = u && wt ? oe(wt) : {
                    width: 0,
                    height: 0
                },
                W = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Xe(),
                dt = W[K],
                Et = W[Y],
                G = ft(0, w[P], nt[P]),
                Ft = L ? w[P] / 2 - bt - G - dt - A.mainAxis : Nt - G - dt - A.mainAxis,
                ni = L ? -w[P] / 2 + bt + G + Et + A.mainAxis : ct + G + Et + A.mainAxis,
                Xt = t.elements.arrow && yt(t.elements.arrow),
                ri = Xt ? f === "y" ? Xt.clientTop || 0 : Xt.clientLeft || 0 : 0,
                ye = (T = k ? .[f]) != null ? T : 0,
                oi = q + Ft - ye - ri,
                si = q + ni - ye,
                _e = ft(u ? Ht(_t, oi) : _t, q, u ? et(U, si) : U);
            m[f] = _e, H[f] = _e - q
        }
        if (a) {
            var be, ai = f === "x" ? C : I,
                li = f === "x" ? j : B,
                J = m[g],
                Lt = g === "y" ? "height" : "width",
                we = J + p[ai],
                Ee = J - p[li],
                Kt = [C, I].indexOf(_) !== -1,
                Le = (be = k ? .[g]) != null ? be : 0,
                Ae = Kt ? we : J - w[Lt] - O[Lt] - Le + A.altAxis,
                xe = Kt ? J + w[Lt] + O[Lt] - Le - A.altAxis : Ee,
                Oe = u && Kt ? ki(Ae, J, xe) : ft(u ? Ae : we, J, u ? xe : Ee);
            m[g] = Oe, H[g] = Oe - J
        }
        t.modifiersData[n] = H
    }
}
const on = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: rn,
    requiresIfExists: ["offset"]
};

function sn(i) {
    return {
        scrollLeft: i.scrollLeft,
        scrollTop: i.scrollTop
    }
}

function an(i) {
    return i === D(i) || !S(i) ? ae(i) : sn(i)
}

function ln(i) {
    var t = i.getBoundingClientRect(),
        e = st(t.width) / i.offsetWidth || 1,
        n = st(t.height) / i.offsetHeight || 1;
    return e !== 1 || n !== 1
}

function cn(i, t, e) {
    e === void 0 && (e = !1);
    var n = S(t),
        r = S(t) && ln(t),
        o = X(t),
        s = at(i, r, e),
        a = {
            scrollLeft: 0,
            scrollTop: 0
        },
        l = {
            x: 0,
            y: 0
        };
    return (n || !n && !e) && ((R(t) !== "body" || ce(o)) && (a = an(t)), S(t) ? (l = at(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : o && (l.x = le(o))), {
        x: s.left + a.scrollLeft - l.x,
        y: s.top + a.scrollTop - l.y,
        width: s.width,
        height: s.height
    }
}

function dn(i) {
    var t = new Map,
        e = new Set,
        n = [];
    i.forEach(function(o) {
        t.set(o.name, o)
    });

    function r(o) {
        e.add(o.name);
        var s = [].concat(o.requires || [], o.requiresIfExists || []);
        s.forEach(function(a) {
            if (!e.has(a)) {
                var l = t.get(a);
                l && r(l)
            }
        }), n.push(o)
    }
    return i.forEach(function(o) {
        e.has(o.name) || r(o)
    }), n
}

function un(i) {
    var t = dn(i);
    return wi.reduce(function(e, n) {
        return e.concat(t.filter(function(r) {
            return r.phase === n
        }))
    }, [])
}

function fn(i) {
    var t;
    return function() {
        return t || (t = new Promise(function(e) {
            Promise.resolve().then(function() {
                t = void 0, e(i())
            })
        })), t
    }
}

function pn(i) {
    var t = i.reduce(function(e, n) {
        var r = e[n.name];
        return e[n.name] = r ? Object.assign({}, r, n, {
            options: Object.assign({}, r.options, n.options),
            data: Object.assign({}, r.data, n.data)
        }) : n, e
    }, {});
    return Object.keys(t).map(function(e) {
        return t[e]
    })
}
var He = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
};

function qe() {
    for (var i = arguments.length, t = new Array(i), e = 0; e < i; e++) t[e] = arguments[e];
    return !t.some(function(n) {
        return !(n && typeof n.getBoundingClientRect == "function")
    })
}

function hn(i) {
    i === void 0 && (i = {});
    var t = i,
        e = t.defaultModifiers,
        n = e === void 0 ? [] : e,
        r = t.defaultOptions,
        o = r === void 0 ? He : r;
    return function(a, l, d) {
        d === void 0 && (d = o);
        var c = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, He, o),
                modifiersData: {},
                elements: {
                    reference: a,
                    popper: l
                },
                attributes: {},
                styles: {}
            },
            v = [],
            y = !1,
            u = {
                state: c,
                setOptions: function(_) {
                    var E = typeof _ == "function" ? _(c.options) : _;
                    h(), c.options = Object.assign({}, o, c.options, E), c.scrollParents = {
                        reference: it(a) ? pt(a) : a.contextElement ? pt(a.contextElement) : [],
                        popper: pt(l)
                    };
                    var L = un(pn([].concat(n, c.options.modifiers)));
                    return c.orderedModifiers = L.filter(function(f) {
                        return f.enabled
                    }), b(), u.update()
                },
                forceUpdate: function() {
                    if (!y) {
                        var _ = c.elements,
                            E = _.reference,
                            L = _.popper;
                        if (qe(E, L)) {
                            c.rects = {
                                reference: cn(E, yt(L), c.options.strategy === "fixed"),
                                popper: oe(L)
                            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(A) {
                                return c.modifiersData[A.name] = Object.assign({}, A.data)
                            });
                            for (var f = 0; f < c.orderedModifiers.length; f++) {
                                if (c.reset === !0) {
                                    c.reset = !1, f = -1;
                                    continue
                                }
                                var g = c.orderedModifiers[f],
                                    m = g.fn,
                                    w = g.options,
                                    O = w === void 0 ? {} : w,
                                    x = g.name;
                                typeof m == "function" && (c = m({
                                    state: c,
                                    options: O,
                                    name: x,
                                    instance: u
                                }) || c)
                            }
                        }
                    }
                },
                update: fn(function() {
                    return new Promise(function(p) {
                        u.forceUpdate(), p(c)
                    })
                }),
                destroy: function() {
                    h(), y = !0
                }
            };
        if (!qe(a, l)) return u;
        u.setOptions(d).then(function(p) {
            !y && d.onFirstUpdate && d.onFirstUpdate(p)
        });

        function b() {
            c.orderedModifiers.forEach(function(p) {
                var _ = p.name,
                    E = p.options,
                    L = E === void 0 ? {} : E,
                    f = p.effect;
                if (typeof f == "function") {
                    var g = f({
                            state: c,
                            name: _,
                            instance: u,
                            options: L
                        }),
                        m = function() {};
                    v.push(g || m)
                }
            })
        }

        function h() {
            v.forEach(function(p) {
                return p()
            }), v = []
        }
        return u
    }
}
var vn = [qi, en, Bi, Ai, Zi, Yi, on, Pi, Gi],
    de = hn({
        defaultModifiers: vn
    }),
    $ = globalThis && globalThis.__assign || function() {
        return $ = Object.assign || function(i) {
            for (var t, e = 1, n = arguments.length; e < n; e++) {
                t = arguments[e];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r])
            }
            return i
        }, $.apply(this, arguments)
    },
    xt = globalThis && globalThis.__spreadArray || function(i, t, e) {
        if (e || arguments.length === 2)
            for (var n = 0, r = t.length, o; n < r; n++)(o || !(n in t)) && (o || (o = Array.prototype.slice.call(t, 0, n)), o[n] = t[n]);
        return i.concat(o || Array.prototype.slice.call(t))
    },
    Z = {
        placement: "bottom",
        triggerType: "click",
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onShow: function() {},
        onHide: function() {},
        onToggle: function() {}
    },
    Je = function() {
        function i(t, e, n) {
            t === void 0 && (t = null), e === void 0 && (e = null), n === void 0 && (n = Z), this._targetEl = t, this._triggerEl = e, this._options = $($({}, Z), n), this._popperInstance = this._createPopperInstance(), this._visible = !1, this._init()
        }
        return i.prototype._init = function() {
            this._triggerEl && this._setupEventListeners()
        }, i.prototype._setupEventListeners = function() {
            var t = this,
                e = this._getTriggerEvents();
            this._options.triggerType === "click" && e.showEvents.forEach(function(n) {
                t._triggerEl.addEventListener(n, function() {
                    t.toggle()
                })
            }), this._options.triggerType === "hover" && (e.showEvents.forEach(function(n) {
                t._triggerEl.addEventListener(n, function() {
                    n === "click" ? t.toggle() : setTimeout(function() {
                        t.show()
                    }, t._options.delay)
                }), t._targetEl.addEventListener(n, function() {
                    t.show()
                })
            }), e.hideEvents.forEach(function(n) {
                t._triggerEl.addEventListener(n, function() {
                    setTimeout(function() {
                        t._targetEl.matches(":hover") || t.hide()
                    }, t._options.delay)
                }), t._targetEl.addEventListener(n, function() {
                    setTimeout(function() {
                        t._triggerEl.matches(":hover") || t.hide()
                    }, t._options.delay)
                })
            }))
        }, i.prototype._createPopperInstance = function() {
            return de(this._triggerEl, this._targetEl, {
                placement: this._options.placement,
                modifiers: [{
                    name: "offset",
                    options: {
                        offset: [this._options.offsetSkidding, this._options.offsetDistance]
                    }
                }]
            })
        }, i.prototype._setupClickOutsideListener = function() {
            var t = this;
            this._clickOutsideEventListener = function(e) {
                t._handleClickOutside(e, t._targetEl)
            }, document.body.addEventListener("click", this._clickOutsideEventListener, !0)
        }, i.prototype._removeClickOutsideListener = function() {
            document.body.removeEventListener("click", this._clickOutsideEventListener, !0)
        }, i.prototype._handleClickOutside = function(t, e) {
            var n = t.target;
            n !== e && !e.contains(n) && !this._triggerEl.contains(n) && this.isVisible() && this.hide()
        }, i.prototype._getTriggerEvents = function() {
            switch (this._options.triggerType) {
                case "hover":
                    return {
                        showEvents: ["mouseenter", "click"],
                        hideEvents: ["mouseleave"]
                    };
                case "click":
                    return {
                        showEvents: ["click"],
                        hideEvents: []
                    };
                case "none":
                    return {
                        showEvents: [],
                        hideEvents: []
                    };
                default:
                    return {
                        showEvents: ["click"],
                        hideEvents: []
                    }
            }
        }, i.prototype.toggle = function() {
            this.isVisible() ? this.hide() : this.show(), this._options.onToggle(this)
        }, i.prototype.isVisible = function() {
            return this._visible
        }, i.prototype.show = function() {
            this._targetEl.classList.remove("hidden"), this._targetEl.classList.add("block"), this._popperInstance.setOptions(function(t) {
                return $($({}, t), {
                    modifiers: xt(xt([], t.modifiers, !0), [{
                        name: "eventListeners",
                        enabled: !0
                    }], !1)
                })
            }), this._setupClickOutsideListener(), this._popperInstance.update(), this._visible = !0, this._options.onShow(this)
        }, i.prototype.hide = function() {
            this._targetEl.classList.remove("block"), this._targetEl.classList.add("hidden"), this._popperInstance.setOptions(function(t) {
                return $($({}, t), {
                    modifiers: xt(xt([], t.modifiers, !0), [{
                        name: "eventListeners",
                        enabled: !1
                    }], !1)
                })
            }), this._visible = !1, this._removeClickOutsideListener(), this._options.onHide(this)
        }, i
    }();

function ue() {
    document.querySelectorAll("[data-dropdown-toggle]").forEach(function(i) {
        var t = i.getAttribute("data-dropdown-toggle"),
            e = document.getElementById(t);
        if (e) {
            var n = i.getAttribute("data-dropdown-placement"),
                r = i.getAttribute("data-dropdown-offset-skidding"),
                o = i.getAttribute("data-dropdown-offset-distance"),
                s = i.getAttribute("data-dropdown-trigger"),
                a = i.getAttribute("data-dropdown-delay");
            new Je(e, i, {
                placement: n || Z.placement,
                triggerType: s || Z.triggerType,
                offsetSkidding: r ? parseInt(r) : Z.offsetSkidding,
                offsetDistance: o ? parseInt(o) : Z.offsetDistance,
                delay: a ? parseInt(a) : Z.delay
            })
        } else console.error('The dropdown element with id "'.concat(t, '" does not exist. Please check the data-dropdown-toggle attribute.'))
    })
}
typeof window < "u" && (window.Dropdown = Je, window.initDropdowns = ue);
var qt = globalThis && globalThis.__assign || function() {
        return qt = Object.assign || function(i) {
            for (var t, e = 1, n = arguments.length; e < n; e++) {
                t = arguments[e];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r])
            }
            return i
        }, qt.apply(this, arguments)
    },
    rt = {
        placement: "center",
        backdropClasses: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
        backdrop: "dynamic",
        closable: !0,
        onHide: function() {},
        onShow: function() {},
        onToggle: function() {}
    },
    Gt = function() {
        function i(t, e) {
            t === void 0 && (t = null), e === void 0 && (e = rt), this._targetEl = t, this._options = qt(qt({}, rt), e), this._isHidden = !0, this._backdropEl = null, this._init()
        }
        return i.prototype._init = function() {
            var t = this;
            this._targetEl && this._getPlacementClasses().map(function(e) {
                t._targetEl.classList.add(e)
            })
        }, i.prototype._createBackdrop = function() {
            var t;
            if (this._isHidden) {
                var e = document.createElement("div");
                e.setAttribute("modal-backdrop", ""), (t = e.classList).add.apply(t, this._options.backdropClasses.split(" ")), document.querySelector("body").append(e), this._backdropEl = e
            }
        }, i.prototype._destroyBackdropEl = function() {
            this._isHidden || document.querySelector("[modal-backdrop]").remove()
        }, i.prototype._setupModalCloseEventListeners = function() {
            var t = this;
            this._options.backdrop === "dynamic" && (this._clickOutsideEventListener = function(e) {
                t._handleOutsideClick(e.target)
            }, this._targetEl.addEventListener("click", this._clickOutsideEventListener, !0)), this._keydownEventListener = function(e) {
                e.key === "Escape" && t.hide()
            }, document.body.addEventListener("keydown", this._keydownEventListener, !0)
        }, i.prototype._removeModalCloseEventListeners = function() {
            this._options.backdrop === "dynamic" && this._targetEl.removeEventListener("click", this._clickOutsideEventListener, !0), document.body.removeEventListener("keydown", this._keydownEventListener, !0)
        }, i.prototype._handleOutsideClick = function(t) {
            (t === this._targetEl || t === this._backdropEl && this.isVisible()) && this.hide()
        }, i.prototype._getPlacementClasses = function() {
            switch (this._options.placement) {
                case "top-left":
                    return ["justify-start", "items-start"];
                case "top-center":
                    return ["justify-center", "items-start"];
                case "top-right":
                    return ["justify-end", "items-start"];
                case "center-left":
                    return ["justify-start", "items-center"];
                case "center":
                    return ["justify-center", "items-center"];
                case "center-right":
                    return ["justify-end", "items-center"];
                case "bottom-left":
                    return ["justify-start", "items-end"];
                case "bottom-center":
                    return ["justify-center", "items-end"];
                case "bottom-right":
                    return ["justify-end", "items-end"];
                default:
                    return ["justify-center", "items-center"]
            }
        }, i.prototype.toggle = function() {
            this._isHidden ? this.show() : this.hide(), this._options.onToggle(this)
        }, i.prototype.show = function() {
            this.isHidden && (this._targetEl.classList.add("flex"), this._targetEl.classList.remove("hidden"), this._targetEl.setAttribute("aria-modal", "true"), this._targetEl.setAttribute("role", "dialog"), this._targetEl.removeAttribute("aria-hidden"), this._createBackdrop(), this._isHidden = !1, document.body.classList.add("overflow-hidden"), this._options.closable && this._setupModalCloseEventListeners(), this._options.onShow(this))
        }, i.prototype.hide = function() {
            this.isVisible && (this._targetEl.classList.add("hidden"), this._targetEl.classList.remove("flex"), this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.removeAttribute("aria-modal"), this._targetEl.removeAttribute("role"), this._destroyBackdropEl(), this._isHidden = !0, document.body.classList.remove("overflow-hidden"), this._options.closable && this._removeModalCloseEventListeners(), this._options.onHide(this))
        }, i.prototype.isVisible = function() {
            return !this._isHidden
        }, i.prototype.isHidden = function() {
            return this._isHidden
        }, i
    }(),
    Ot = function(i, t) {
        return t.some(function(e) {
            return e.id === i
        }) ? t.find(function(e) {
            return e.id === i
        }) : null
    };

function fe() {
    var i = [];
    document.querySelectorAll("[data-modal-target]").forEach(function(t) {
        var e = t.getAttribute("data-modal-target"),
            n = document.getElementById(e);
        if (n) {
            var r = n.getAttribute("data-modal-placement"),
                o = n.getAttribute("data-modal-backdrop");
            Ot(e, i) || i.push({
                id: e,
                object: new Gt(n, {
                    placement: r || rt.placement,
                    backdrop: o || rt.backdrop
                })
            })
        } else console.error("Modal with id ".concat(e, " does not exist. Are you sure that the data-modal-target attribute points to the correct modal id?."))
    }), document.querySelectorAll("[data-modal-toggle]").forEach(function(t) {
        var e = t.getAttribute("data-modal-toggle"),
            n = document.getElementById(e);
        if (n) {
            var r = n.getAttribute("data-modal-placement"),
                o = n.getAttribute("data-modal-backdrop"),
                s = Ot(e, i);
            s || (s = {
                id: e,
                object: new Gt(n, {
                    placement: r || rt.placement,
                    backdrop: o || rt.backdrop
                })
            }, i.push(s)), t.addEventListener("click", function() {
                s.object.toggle()
            })
        } else console.error("Modal with id ".concat(e, " does not exist. Are you sure that the data-modal-toggle attribute points to the correct modal id?"))
    }), document.querySelectorAll("[data-modal-show]").forEach(function(t) {
        var e = t.getAttribute("data-modal-show"),
            n = document.getElementById(e);
        if (n) {
            var r = Ot(e, i);
            r ? t.addEventListener("click", function() {
                r.object.isHidden && r.object.show()
            }) : console.error("Modal with id ".concat(e, " has not been initialized. Please initialize it using the data-modal-target attribute."))
        } else console.error("Modal with id ".concat(e, " does not exist. Are you sure that the data-modal-show attribute points to the correct modal id?"))
    }), document.querySelectorAll("[data-modal-hide]").forEach(function(t) {
        var e = t.getAttribute("data-modal-hide"),
            n = document.getElementById(e);
        if (n) {
            var r = Ot(e, i);
            r ? t.addEventListener("click", function() {
                r.object.isVisible && r.object.hide()
            }) : console.error("Modal with id ".concat(e, " has not been initialized. Please initialize it using the data-modal-target attribute."))
        } else console.error("Modal with id ".concat(e, " does not exist. Are you sure that the data-modal-hide attribute points to the correct modal id?"))
    })
}
typeof window < "u" && (window.Modal = Gt, window.initModals = fe);
var Mt = globalThis && globalThis.__assign || function() {
        return Mt = Object.assign || function(i) {
            for (var t, e = 1, n = arguments.length; e < n; e++) {
                t = arguments[e];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r])
            }
            return i
        }, Mt.apply(this, arguments)
    },
    tt = {
        placement: "left",
        bodyScrolling: !1,
        backdrop: !0,
        edge: !1,
        edgeOffset: "bottom-[60px]",
        backdropClasses: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30",
        onShow: function() {},
        onHide: function() {},
        onToggle: function() {}
    },
    Qe = function() {
        function i(t, e) {
            t === void 0 && (t = null), e === void 0 && (e = tt), this._targetEl = t, this._options = Mt(Mt({}, tt), e), this._visible = !1, this._init()
        }
        return i.prototype._init = function() {
            var t = this;
            this._targetEl && (this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.classList.add("transition-transform")), this._getPlacementClasses(this._options.placement).base.map(function(e) {
                t._targetEl.classList.add(e)
            }), document.addEventListener("keydown", function(e) {
                e.key === "Escape" && t.isVisible() && t.hide()
            })
        }, i.prototype.hide = function() {
            var t = this;
            this._options.edge ? (this._getPlacementClasses(this._options.placement + "-edge").active.map(function(e) {
                t._targetEl.classList.remove(e)
            }), this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(e) {
                t._targetEl.classList.add(e)
            })) : (this._getPlacementClasses(this._options.placement).active.map(function(e) {
                t._targetEl.classList.remove(e)
            }), this._getPlacementClasses(this._options.placement).inactive.map(function(e) {
                t._targetEl.classList.add(e)
            })), this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.removeAttribute("aria-modal"), this._targetEl.removeAttribute("role"), this._options.bodyScrolling || document.body.classList.remove("overflow-hidden"), this._options.backdrop && this._destroyBackdropEl(), this._visible = !1, this._options.onHide(this)
        }, i.prototype.show = function() {
            var t = this;
            this._options.edge ? (this._getPlacementClasses(this._options.placement + "-edge").active.map(function(e) {
                t._targetEl.classList.add(e)
            }), this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(e) {
                t._targetEl.classList.remove(e)
            })) : (this._getPlacementClasses(this._options.placement).active.map(function(e) {
                t._targetEl.classList.add(e)
            }), this._getPlacementClasses(this._options.placement).inactive.map(function(e) {
                t._targetEl.classList.remove(e)
            })), this._targetEl.setAttribute("aria-modal", "true"), this._targetEl.setAttribute("role", "dialog"), this._targetEl.removeAttribute("aria-hidden"), this._options.bodyScrolling || document.body.classList.add("overflow-hidden"), this._options.backdrop && this._createBackdrop(), this._visible = !0, this._options.onShow(this)
        }, i.prototype.toggle = function() {
            this.isVisible() ? this.hide() : this.show()
        }, i.prototype._createBackdrop = function() {
            var t, e = this;
            if (!this._visible) {
                var n = document.createElement("div");
                n.setAttribute("drawer-backdrop", ""), (t = n.classList).add.apply(t, this._options.backdropClasses.split(" ")), document.querySelector("body").append(n), n.addEventListener("click", function() {
                    e.hide()
                })
            }
        }, i.prototype._destroyBackdropEl = function() {
            this._visible && document.querySelector("[drawer-backdrop]").remove()
        }, i.prototype._getPlacementClasses = function(t) {
            switch (t) {
                case "top":
                    return {
                        base: ["top-0", "left-0", "right-0"],
                        active: ["transform-none"],
                        inactive: ["-translate-y-full"]
                    };
                case "right":
                    return {
                        base: ["right-0", "top-0"],
                        active: ["transform-none"],
                        inactive: ["translate-x-full"]
                    };
                case "bottom":
                    return {
                        base: ["bottom-0", "left-0", "right-0"],
                        active: ["transform-none"],
                        inactive: ["translate-y-full"]
                    };
                case "left":
                    return {
                        base: ["left-0", "top-0"],
                        active: ["transform-none"],
                        inactive: ["-translate-x-full"]
                    };
                case "bottom-edge":
                    return {
                        base: ["left-0", "top-0"],
                        active: ["transform-none"],
                        inactive: ["translate-y-full", this._options.edgeOffset]
                    };
                default:
                    return {
                        base: ["left-0", "top-0"],
                        active: ["transform-none"],
                        inactive: ["-translate-x-full"]
                    }
            }
        }, i.prototype.isHidden = function() {
            return !this._visible
        }, i.prototype.isVisible = function() {
            return this._visible
        }, i
    }(),
    kt = function(i, t) {
        if (t.some(function(e) {
                return e.id === i
            })) return t.find(function(e) {
            return e.id === i
        })
    };

function pe() {
    var i = [];
    document.querySelectorAll("[data-drawer-target]").forEach(function(t) {
        var e = t.getAttribute("data-drawer-target"),
            n = document.getElementById(e);
        if (n) {
            var r = t.getAttribute("data-drawer-placement"),
                o = t.getAttribute("data-drawer-body-scrolling"),
                s = t.getAttribute("data-drawer-backdrop"),
                a = t.getAttribute("data-drawer-edge"),
                l = t.getAttribute("data-drawer-edge-offset");
            kt(e, i) || i.push({
                id: e,
                object: new Qe(n, {
                    placement: r || tt.placement,
                    bodyScrolling: o ? o === "true" : tt.bodyScrolling,
                    backdrop: s ? s === "true" : tt.backdrop,
                    edge: a ? a === "true" : tt.edge,
                    edgeOffset: l || tt.edgeOffset
                })
            })
        } else console.error("Drawer with id ".concat(e, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"))
    }), document.querySelectorAll("[data-drawer-toggle]").forEach(function(t) {
        var e = t.getAttribute("data-drawer-toggle"),
            n = document.getElementById(e);
        if (n) {
            var r = kt(e, i);
            r ? t.addEventListener("click", function() {
                r.object.toggle()
            }) : console.error("Drawer with id ".concat(e, " has not been initialized. Please initialize it using the data-drawer-target attribute."))
        } else console.error("Drawer with id ".concat(e, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"))
    }), document.querySelectorAll("[data-drawer-dismiss], [data-drawer-hide]").forEach(function(t) {
        var e = t.getAttribute("data-drawer-dismiss") ? t.getAttribute("data-drawer-dismiss") : t.getAttribute("data-drawer-hide"),
            n = document.getElementById(e);
        if (n) {
            var r = kt(e, i);
            r ? t.addEventListener("click", function() {
                r.object.hide()
            }) : console.error("Drawer with id ".concat(e, " has not been initialized. Please initialize it using the data-drawer-target attribute."))
        } else console.error("Drawer with id ".concat(e, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id"))
    }), document.querySelectorAll("[data-drawer-show]").forEach(function(t) {
        var e = t.getAttribute("data-drawer-show"),
            n = document.getElementById(e);
        if (n) {
            var r = kt(e, i);
            r ? t.addEventListener("click", function() {
                r.object.show()
            }) : console.error("Drawer with id ".concat(e, " has not been initialized. Please initialize it using the data-drawer-target attribute."))
        } else console.error("Drawer with id ".concat(e, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"))
    })
}
typeof window < "u" && (window.Drawer = Qe, window.initDrawers = pe);
var Rt = globalThis && globalThis.__assign || function() {
        return Rt = Object.assign || function(i) {
            for (var t, e = 1, n = arguments.length; e < n; e++) {
                t = arguments[e];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r])
            }
            return i
        }, Rt.apply(this, arguments)
    },
    Me = {
        defaultTabId: null,
        activeClasses: "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500",
        inactiveClasses: "dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
        onShow: function() {}
    },
    Ze = function() {
        function i(t, e) {
            t === void 0 && (t = []), e === void 0 && (e = Me), this._items = t, this._activeTab = e ? this.getTab(e.defaultTabId) : null, this._options = Rt(Rt({}, Me), e), this._init()
        }
        return i.prototype._init = function() {
            var t = this;
            this._items.length && (this._activeTab || this._setActiveTab(this._items[0]), this.show(this._activeTab.id, !0), this._items.map(function(e) {
                e.triggerEl.addEventListener("click", function() {
                    t.show(e.id)
                })
            }))
        }, i.prototype.getActiveTab = function() {
            return this._activeTab
        }, i.prototype._setActiveTab = function(t) {
            this._activeTab = t
        }, i.prototype.getTab = function(t) {
            return this._items.filter(function(e) {
                return e.id === t
            })[0]
        }, i.prototype.show = function(t, e) {
            var n, r, o = this;
            e === void 0 && (e = !1);
            var s = this.getTab(t);
            s === this._activeTab && !e || (this._items.map(function(a) {
                var l, d;
                a !== s && ((l = a.triggerEl.classList).remove.apply(l, o._options.activeClasses.split(" ")), (d = a.triggerEl.classList).add.apply(d, o._options.inactiveClasses.split(" ")), a.targetEl.classList.add("hidden"), a.triggerEl.setAttribute("aria-selected", "false"))
            }), (n = s.triggerEl.classList).add.apply(n, this._options.activeClasses.split(" ")), (r = s.triggerEl.classList).remove.apply(r, this._options.inactiveClasses.split(" ")), s.triggerEl.setAttribute("aria-selected", "true"), s.targetEl.classList.remove("hidden"), this._setActiveTab(s), this._options.onShow(this, s))
        }, i
    }();

function he() {
    document.querySelectorAll("[data-tabs-toggle]").forEach(function(i) {
        var t = [],
            e = null;
        i.querySelectorAll('[role="tab"]').forEach(function(n) {
            var r = n.getAttribute("aria-selected") === "true",
                o = {
                    id: n.getAttribute("data-tabs-target"),
                    triggerEl: n,
                    targetEl: document.querySelector(n.getAttribute("data-tabs-target"))
                };
            t.push(o), r && (e = o.id)
        }), new Ze(t, {
            defaultTabId: e
        })
    })
}
typeof window < "u" && (window.Tabs = Ze, window.initTabs = he);
var N = globalThis && globalThis.__assign || function() {
        return N = Object.assign || function(i) {
            for (var t, e = 1, n = arguments.length; e < n; e++) {
                t = arguments[e];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r])
            }
            return i
        }, N.apply(this, arguments)
    },
    Tt = globalThis && globalThis.__spreadArray || function(i, t, e) {
        if (e || arguments.length === 2)
            for (var n = 0, r = t.length, o; n < r; n++)(o || !(n in t)) && (o || (o = Array.prototype.slice.call(t, 0, n)), o[n] = t[n]);
        return i.concat(o || Array.prototype.slice.call(t))
    },
    Vt = {
        placement: "top",
        triggerType: "hover",
        onShow: function() {},
        onHide: function() {},
        onToggle: function() {}
    },
    ti = function() {
        function i(t, e, n) {
            t === void 0 && (t = null), e === void 0 && (e = null), n === void 0 && (n = Vt), this._targetEl = t, this._triggerEl = e, this._options = N(N({}, Vt), n), this._popperInstance = this._createPopperInstance(), this._visible = !1, this._init()
        }
        return i.prototype._init = function() {
            this._triggerEl && this._setupEventListeners()
        }, i.prototype._setupEventListeners = function() {
            var t = this,
                e = this._getTriggerEvents();
            e.showEvents.forEach(function(n) {
                t._triggerEl.addEventListener(n, function() {
                    t.show()
                })
            }), e.hideEvents.forEach(function(n) {
                t._triggerEl.addEventListener(n, function() {
                    t.hide()
                })
            })
        }, i.prototype._createPopperInstance = function() {
            return de(this._triggerEl, this._targetEl, {
                placement: this._options.placement,
                modifiers: [{
                    name: "offset",
                    options: {
                        offset: [0, 8]
                    }
                }]
            })
        }, i.prototype._getTriggerEvents = function() {
            switch (this._options.triggerType) {
                case "hover":
                    return {
                        showEvents: ["mouseenter", "focus"],
                        hideEvents: ["mouseleave", "blur"]
                    };
                case "click":
                    return {
                        showEvents: ["click", "focus"],
                        hideEvents: ["focusout", "blur"]
                    };
                case "none":
                    return {
                        showEvents: [],
                        hideEvents: []
                    };
                default:
                    return {
                        showEvents: ["mouseenter", "focus"],
                        hideEvents: ["mouseleave", "blur"]
                    }
            }
        }, i.prototype._setupKeydownListener = function() {
            var t = this;
            this._keydownEventListener = function(e) {
                e.key === "Escape" && t.hide()
            }, document.body.addEventListener("keydown", this._keydownEventListener, !0)
        }, i.prototype._removeKeydownListener = function() {
            document.body.removeEventListener("keydown", this._keydownEventListener, !0)
        }, i.prototype._setupClickOutsideListener = function() {
            var t = this;
            this._clickOutsideEventListener = function(e) {
                t._handleClickOutside(e, t._targetEl)
            }, document.body.addEventListener("click", this._clickOutsideEventListener, !0)
        }, i.prototype._removeClickOutsideListener = function() {
            document.body.removeEventListener("click", this._clickOutsideEventListener, !0)
        }, i.prototype._handleClickOutside = function(t, e) {
            var n = t.target;
            n !== e && !e.contains(n) && !this._triggerEl.contains(n) && this.isVisible() && this.hide()
        }, i.prototype.isVisible = function() {
            return this._visible
        }, i.prototype.toggle = function() {
            this.isVisible() ? this.hide() : this.show()
        }, i.prototype.show = function() {
            this._targetEl.classList.remove("opacity-0", "invisible"), this._targetEl.classList.add("opacity-100", "visible"), this._popperInstance.setOptions(function(t) {
                return N(N({}, t), {
                    modifiers: Tt(Tt([], t.modifiers, !0), [{
                        name: "eventListeners",
                        enabled: !0
                    }], !1)
                })
            }), this._setupClickOutsideListener(), this._setupKeydownListener(), this._popperInstance.update(), this._visible = !0, this._options.onShow(this)
        }, i.prototype.hide = function() {
            this._targetEl.classList.remove("opacity-100", "visible"), this._targetEl.classList.add("opacity-0", "invisible"), this._popperInstance.setOptions(function(t) {
                return N(N({}, t), {
                    modifiers: Tt(Tt([], t.modifiers, !0), [{
                        name: "eventListeners",
                        enabled: !1
                    }], !1)
                })
            }), this._removeClickOutsideListener(), this._removeKeydownListener(), this._visible = !1, this._options.onHide(this)
        }, i
    }();

function ve() {
    document.querySelectorAll("[data-tooltip-target]").forEach(function(i) {
        var t = i.getAttribute("data-tooltip-target"),
            e = document.getElementById(t);
        if (e) {
            var n = i.getAttribute("data-tooltip-trigger"),
                r = i.getAttribute("data-tooltip-placement");
            new ti(e, i, {
                placement: r || Vt.placement,
                triggerType: n || Vt.triggerType
            })
        } else console.error('The tooltip element with id "'.concat(t, '" does not exist. Please check the data-tooltip-target attribute.'))
    })
}
typeof window < "u" && (window.Tooltip = ti, window.initTooltips = ve);
var F = globalThis && globalThis.__assign || function() {
        return F = Object.assign || function(i) {
            for (var t, e = 1, n = arguments.length; e < n; e++) {
                t = arguments[e];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r])
            }
            return i
        }, F.apply(this, arguments)
    },
    Ct = globalThis && globalThis.__spreadArray || function(i, t, e) {
        if (e || arguments.length === 2)
            for (var n = 0, r = t.length, o; n < r; n++)(o || !(n in t)) && (o || (o = Array.prototype.slice.call(t, 0, n)), o[n] = t[n]);
        return i.concat(o || Array.prototype.slice.call(t))
    },
    ht = {
        placement: "top",
        offset: 10,
        triggerType: "hover",
        onShow: function() {},
        onHide: function() {},
        onToggle: function() {}
    },
    ei = function() {
        function i(t, e, n) {
            t === void 0 && (t = null), e === void 0 && (e = null), n === void 0 && (n = ht), this._targetEl = t, this._triggerEl = e, this._options = F(F({}, ht), n), this._popperInstance = this._createPopperInstance(), this._visible = !1, this._init()
        }
        return i.prototype._init = function() {
            this._triggerEl && this._setupEventListeners()
        }, i.prototype._setupEventListeners = function() {
            var t = this,
                e = this._getTriggerEvents();
            e.showEvents.forEach(function(n) {
                t._triggerEl.addEventListener(n, function() {
                    t.show()
                }), t._targetEl.addEventListener(n, function() {
                    t.show()
                })
            }), e.hideEvents.forEach(function(n) {
                t._triggerEl.addEventListener(n, function() {
                    setTimeout(function() {
                        t._targetEl.matches(":hover") || t.hide()
                    }, 100)
                }), t._targetEl.addEventListener(n, function() {
                    setTimeout(function() {
                        t._triggerEl.matches(":hover") || t.hide()
                    }, 100)
                })
            })
        }, i.prototype._createPopperInstance = function() {
            return de(this._triggerEl, this._targetEl, {
                placement: this._options.placement,
                modifiers: [{
                    name: "offset",
                    options: {
                        offset: [0, this._options.offset]
                    }
                }]
            })
        }, i.prototype._getTriggerEvents = function() {
            switch (this._options.triggerType) {
                case "hover":
                    return {
                        showEvents: ["mouseenter", "focus"],
                        hideEvents: ["mouseleave", "blur"]
                    };
                case "click":
                    return {
                        showEvents: ["click", "focus"],
                        hideEvents: ["focusout", "blur"]
                    };
                case "none":
                    return {
                        showEvents: [],
                        hideEvents: []
                    };
                default:
                    return {
                        showEvents: ["mouseenter", "focus"],
                        hideEvents: ["mouseleave", "blur"]
                    }
            }
        }, i.prototype._setupKeydownListener = function() {
            var t = this;
            this._keydownEventListener = function(e) {
                e.key === "Escape" && t.hide()
            }, document.body.addEventListener("keydown", this._keydownEventListener, !0)
        }, i.prototype._removeKeydownListener = function() {
            document.body.removeEventListener("keydown", this._keydownEventListener, !0)
        }, i.prototype._setupClickOutsideListener = function() {
            var t = this;
            this._clickOutsideEventListener = function(e) {
                t._handleClickOutside(e, t._targetEl)
            }, document.body.addEventListener("click", this._clickOutsideEventListener, !0)
        }, i.prototype._removeClickOutsideListener = function() {
            document.body.removeEventListener("click", this._clickOutsideEventListener, !0)
        }, i.prototype._handleClickOutside = function(t, e) {
            var n = t.target;
            n !== e && !e.contains(n) && !this._triggerEl.contains(n) && this.isVisible() && this.hide()
        }, i.prototype.isVisible = function() {
            return this._visible
        }, i.prototype.toggle = function() {
            this.isVisible() ? this.hide() : this.show(), this._options.onToggle(this)
        }, i.prototype.show = function() {
            this._targetEl.classList.remove("opacity-0", "invisible"), this._targetEl.classList.add("opacity-100", "visible"), this._popperInstance.setOptions(function(t) {
                return F(F({}, t), {
                    modifiers: Ct(Ct([], t.modifiers, !0), [{
                        name: "eventListeners",
                        enabled: !0
                    }], !1)
                })
            }), this._setupClickOutsideListener(), this._setupKeydownListener(), this._popperInstance.update(), this._visible = !0, this._options.onShow(this)
        }, i.prototype.hide = function() {
            this._targetEl.classList.remove("opacity-100", "visible"), this._targetEl.classList.add("opacity-0", "invisible"), this._popperInstance.setOptions(function(t) {
                return F(F({}, t), {
                    modifiers: Ct(Ct([], t.modifiers, !0), [{
                        name: "eventListeners",
                        enabled: !1
                    }], !1)
                })
            }), this._removeClickOutsideListener(), this._removeKeydownListener(), this._visible = !1, this._options.onHide(this)
        }, i
    }();

function ge() {
    document.querySelectorAll("[data-popover-target]").forEach(function(i) {
        var t = i.getAttribute("data-popover-target"),
            e = document.getElementById(t);
        if (e) {
            var n = i.getAttribute("data-popover-trigger"),
                r = i.getAttribute("data-popover-placement"),
                o = i.getAttribute("data-popover-offset");
            new ei(e, i, {
                placement: r || ht.placement,
                offset: o ? parseInt(o) : ht.offset,
                triggerType: n || ht.triggerType
            })
        } else console.error('The popover element with id "'.concat(t, '" does not exist. Please check the data-popover-target attribute.'))
    })
}
typeof window < "u" && (window.Popover = ei, window.initPopovers = ge);
var zt = globalThis && globalThis.__assign || function() {
        return zt = Object.assign || function(i) {
            for (var t, e = 1, n = arguments.length; e < n; e++) {
                t = arguments[e];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r])
            }
            return i
        }, zt.apply(this, arguments)
    },
    Jt = {
        triggerType: "hover",
        onShow: function() {},
        onHide: function() {},
        onToggle: function() {}
    },
    ii = function() {
        function i(t, e, n, r) {
            t === void 0 && (t = null), e === void 0 && (e = null), n === void 0 && (n = null), r === void 0 && (r = Jt), this._parentEl = t, this._triggerEl = e, this._targetEl = n, this._options = zt(zt({}, Jt), r), this._visible = !1, this._init()
        }
        return i.prototype._init = function() {
            var t = this;
            if (this._triggerEl) {
                var e = this._getTriggerEventTypes(this._options.triggerType);
                e.showEvents.forEach(function(n) {
                    t._triggerEl.addEventListener(n, function() {
                        t.show()
                    }), t._targetEl.addEventListener(n, function() {
                        t.show()
                    })
                }), e.hideEvents.forEach(function(n) {
                    t._parentEl.addEventListener(n, function() {
                        t._parentEl.matches(":hover") || t.hide()
                    })
                })
            }
        }, i.prototype.hide = function() {
            this._targetEl.classList.add("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "false"), this._visible = !1, this._options.onHide(this)
        }, i.prototype.show = function() {
            this._targetEl.classList.remove("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "true"), this._visible = !0, this._options.onShow(this)
        }, i.prototype.toggle = function() {
            this._visible ? this.hide() : this.show()
        }, i.prototype.isHidden = function() {
            return !this._visible
        }, i.prototype.isVisible = function() {
            return this._visible
        }, i.prototype._getTriggerEventTypes = function(t) {
            switch (t) {
                case "hover":
                    return {
                        showEvents: ["mouseenter", "focus"],
                        hideEvents: ["mouseleave", "blur"]
                    };
                case "click":
                    return {
                        showEvents: ["click", "focus"],
                        hideEvents: ["focusout", "blur"]
                    };
                case "none":
                    return {
                        showEvents: [],
                        hideEvents: []
                    };
                default:
                    return {
                        showEvents: ["mouseenter", "focus"],
                        hideEvents: ["mouseleave", "blur"]
                    }
            }
        }, i
    }();

function me() {
    document.querySelectorAll("[data-dial-init]").forEach(function(i) {
        var t = i.querySelector("[data-dial-toggle]");
        if (t) {
            var e = t.getAttribute("data-dial-toggle"),
                n = document.getElementById(e);
            if (n) {
                var r = t.getAttribute("data-dial-trigger");
                new ii(i, t, n, {
                    triggerType: r || Jt.triggerType
                })
            } else console.error("Dial with id ".concat(e, " does not exist. Are you sure that the data-dial-toggle attribute points to the correct modal id?"))
        } else console.error("Dial with id ".concat(i.id, " does not have a trigger element. Are you sure that the data-dial-toggle attribute exists?"))
    })
}
typeof window < "u" && (window.Dial = ii, window.initDials = me);

function gn() {
    Qt(), Zt(), ee(), ie(), ue(), fe(), pe(), he(), ve(), ge(), me()
}
typeof window < "u" && (window.initFlowbite = gn);
var mn = new ci("load", [Qt, Zt, ee, ie, ue, fe, pe, he, ve, ge, me]);
mn.init();
const yn = [{
        position: 0,
        el: document.getElementById("data-carousel-item-1")
    }, {
        position: 1,
        el: document.getElementById("data-carousel-item-2")
    }, {
        position: 2,
        el: document.getElementById("data-carousel-item-3")
    }, {
        position: 3,
        el: document.getElementById("data-carousel-item-4")
    }],
    _n = {
        defaultPosition: 0,
        interval: 3e3,
        indicators: {
            activeClasses: "bg-white dark:bg-gray-800",
            inactiveClasses: "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800",
            items: [{
                position: 0,
                el: document.getElementById("data-carousel-indicator-1")
            }, {
                position: 1,
                el: document.getElementById("data-carousel-indicator-2")
            }, {
                position: 2,
                el: document.getElementById("data-carousel-indicator-3")
            }, {
                position: 3,
                el: document.getElementById("data-carousel-indicator-4")
            }]
        }
    },
    V = new te(yn, _n);
V.cycle();
const Wt = document.getElementById("default-carousel");
Wt.addEventListener("mouseover", () => V.pause());
Wt.addEventListener("mouseout", () => V.cycle());
Wt.addEventListener("click", () => {
    function i(t) {
        V.pause(), t.key === "ArrowLeft" ? V.prev() : t.key === "ArrowRight" && V.next()
    }
    document.addEventListener("keydown", i), document.addEventListener("click", function t(e) {
        Wt.contains(e.target) || (document.removeEventListener("keydown", i), document.removeEventListener("click", t), V.cycle())
    })
});
const bn = document.getElementById("data-carousel-prev"),
    wn = document.getElementById("data-carousel-next");
bn.addEventListener("click", () => V.prev());
wn.addEventListener("click", () => V.next());