(function() {
    if (window.Reflect === void 0 || window.customElements === void 0 || window.customElements.polyfillWrapFlushCallback) return;
    const s = HTMLElement,
        e = {
            HTMLElement: function() {
                return Reflect.construct(s, [], this.constructor)
            }
        };
    window.HTMLElement = e.HTMLElement, HTMLElement.prototype = s.prototype, HTMLElement.prototype.constructor = HTMLElement, Object.setPrototypeOf(HTMLElement, s)
})();
(function(s) {
    if (typeof s.requestSubmit == "function") return;
    s.requestSubmit = function(i) {
        i ? (e(i, this), i.click()) : (i = document.createElement("input"), i.type = "submit", i.hidden = !0, this.appendChild(i), i.click(), this.removeChild(i))
    };

    function e(i, r) {
        i instanceof HTMLElement || t(TypeError, "parameter 1 is not of type 'HTMLElement'"), i.type == "submit" || t(TypeError, "The specified element is not a submit button"), i.form == r || t(DOMException, "The specified element is not owned by this form element", "NotFoundError")
    }

    function t(i, r, n) {
        throw new i("Failed to execute 'requestSubmit' on 'HTMLFormElement': " + r + ".", n)
    }
})(HTMLFormElement.prototype);
const re = new WeakMap;

function ye(s) {
    const e = s instanceof Element ? s : s instanceof Node ? s.parentElement : null,
        t = e ? e.closest("input, button") : null;
    return t ? .type == "submit" ? t : null
}

function Le(s) {
    const e = ye(s.target);
    e && e.form && re.set(e.form, e)
}(function() {
    if ("submitter" in Event.prototype) return;
    let s = window.Event.prototype;
    if ("SubmitEvent" in window && /Apple Computer/.test(navigator.vendor)) s = window.SubmitEvent.prototype;
    else if ("SubmitEvent" in window) return;
    addEventListener("click", Le, !0), Object.defineProperty(s, "submitter", {
        get() {
            if (this.type == "submit" && this.target instanceof HTMLFormElement) return re.get(this.target)
        }
    })
})();
var E;
(function(s) {
    s.eager = "eager", s.lazy = "lazy"
})(E || (E = {}));
class v extends HTMLElement {
    static get observedAttributes() {
        return ["disabled", "complete", "loading", "src"]
    }
    constructor() {
        super(), this.loaded = Promise.resolve(), this.delegate = new v.delegateConstructor(this)
    }
    connectedCallback() {
        this.delegate.connect()
    }
    disconnectedCallback() {
        this.delegate.disconnect()
    }
    reload() {
        return this.delegate.sourceURLReloaded()
    }
    attributeChangedCallback(e) {
        e == "loading" ? this.delegate.loadingStyleChanged() : e == "complete" ? this.delegate.completeChanged() : e == "src" ? this.delegate.sourceURLChanged() : this.delegate.disabledChanged()
    }
    get src() {
        return this.getAttribute("src")
    }
    set src(e) {
        e ? this.setAttribute("src", e) : this.removeAttribute("src")
    }
    get loading() {
        return Re(this.getAttribute("loading") || "")
    }
    set loading(e) {
        e ? this.setAttribute("loading", e) : this.removeAttribute("loading")
    }
    get disabled() {
        return this.hasAttribute("disabled")
    }
    set disabled(e) {
        e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled")
    }
    get autoscroll() {
        return this.hasAttribute("autoscroll")
    }
    set autoscroll(e) {
        e ? this.setAttribute("autoscroll", "") : this.removeAttribute("autoscroll")
    }
    get complete() {
        return !this.delegate.isLoading
    }
    get isActive() {
        return this.ownerDocument === document && !this.isPreview
    }
    get isPreview() {
        var e, t;
        return (t = (e = this.ownerDocument) === null || e === void 0 ? void 0 : e.documentElement) === null || t === void 0 ? void 0 : t.hasAttribute("data-turbo-preview")
    }
}

function Re(s) {
    switch (s.toLowerCase()) {
        case "lazy":
            return E.lazy;
        default:
            return E.eager
    }
}

function c(s) {
    return new URL(s.toString(), document.baseURI)
}

function y(s) {
    let e;
    if (s.hash) return s.hash.slice(1);
    if (e = s.href.match(/#(.*)$/)) return e[1]
}

function z(s, e) {
    const t = e ? .getAttribute("formaction") || s.getAttribute("action") || s.action;
    return c(t)
}

function Te(s) {
    return (ke(s).match(/\.[^.]*$/) || [])[0] || ""
}

function Ce(s) {
    return !!Te(s).match(/^(?:|\.(?:htm|html|xhtml|php))$/)
}

function Ae(s, e) {
    const t = Me(e);
    return s.href === c(t).href || s.href.startsWith(t)
}

function A(s, e) {
    return Ae(s, e) && Ce(s)
}

function x(s) {
    const e = y(s);
    return e != null ? s.href.slice(0, -(e.length + 1)) : s.href
}

function I(s) {
    return x(s)
}

function Pe(s, e) {
    return c(s).href == c(e).href
}

function Fe(s) {
    return s.pathname.split("/").slice(1)
}

function ke(s) {
    return Fe(s).slice(-1)[0]
}

function Me(s) {
    return Ie(s.origin + s.pathname)
}

function Ie(s) {
    return s.endsWith("/") ? s : s + "/"
}
class K {
    constructor(e) {
        this.response = e
    }
    get succeeded() {
        return this.response.ok
    }
    get failed() {
        return !this.succeeded
    }
    get clientError() {
        return this.statusCode >= 400 && this.statusCode <= 499
    }
    get serverError() {
        return this.statusCode >= 500 && this.statusCode <= 599
    }
    get redirected() {
        return this.response.redirected
    }
    get location() {
        return c(this.response.url)
    }
    get isHTML() {
        return this.contentType && this.contentType.match(/^(?:text\/([^\s;,]+\b)?html|application\/xhtml\+xml)\b/)
    }
    get statusCode() {
        return this.response.status
    }
    get contentType() {
        return this.header("Content-Type")
    }
    get responseText() {
        return this.response.clone().text()
    }
    get responseHTML() {
        return this.isHTML ? this.response.clone().text() : Promise.resolve(void 0)
    }
    header(e) {
        return this.response.headers.get(e)
    }
}

function F(s) {
    if (s.getAttribute("data-turbo-eval") == "false") return s; {
        const e = document.createElement("script"),
            t = B("csp-nonce");
        return t && (e.nonce = t), e.textContent = s.textContent, e.async = !1, He(e, s), e
    }
}

function He(s, e) {
    for (const {
            name: t,
            value: i
        } of e.attributes) s.setAttribute(t, i)
}

function qe(s) {
    const e = document.createElement("template");
    return e.innerHTML = s, e.content
}

function l(s, {
    target: e,
    cancelable: t,
    detail: i
} = {}) {
    const r = new CustomEvent(s, {
        cancelable: t,
        bubbles: !0,
        composed: !0,
        detail: i
    });
    return e && e.isConnected ? e.dispatchEvent(r) : document.documentElement.dispatchEvent(r), r
}

function H() {
    return new Promise(s => requestAnimationFrame(() => s()))
}

function Be() {
    return new Promise(s => setTimeout(() => s(), 0))
}

function Oe() {
    return Promise.resolve()
}

function ne(s = "") {
    return new DOMParser().parseFromString(s, "text/html")
}

function oe(s, ...e) {
    const t = Ne(s, e).replace(/^\n/, "").split(`
`),
        i = t[0].match(/^\s+/),
        r = i ? i[0].length : 0;
    return t.map(n => n.slice(r)).join(`
`)
}

function Ne(s, e) {
    return s.reduce((t, i, r) => {
        const n = e[r] == null ? "" : e[r];
        return t + i + n
    }, "")
}

function P() {
    return Array.from({
        length: 36
    }).map((s, e) => e == 8 || e == 13 || e == 18 || e == 23 ? "-" : e == 14 ? "4" : e == 19 ? (Math.floor(Math.random() * 4) + 8).toString(16) : Math.floor(Math.random() * 15).toString(16)).join("")
}

function q(s, ...e) {
    for (const t of e.map(i => i ? .getAttribute(s)))
        if (typeof t == "string") return t;
    return null
}

function De(s, ...e) {
    return e.some(t => t && t.hasAttribute(s))
}

function _(...s) {
    for (const e of s) e.localName == "turbo-frame" && e.setAttribute("busy", ""), e.setAttribute("aria-busy", "true")
}

function W(...s) {
    for (const e of s) e.localName == "turbo-frame" && e.removeAttribute("busy"), e.removeAttribute("aria-busy")
}

function Ve(s, e = 2e3) {
    return new Promise(t => {
        const i = () => {
            s.removeEventListener("error", i), s.removeEventListener("load", i), t()
        };
        s.addEventListener("load", i, {
            once: !0
        }), s.addEventListener("error", i, {
            once: !0
        }), setTimeout(t, e)
    })
}

function ae(s) {
    switch (s) {
        case "replace":
            return history.replaceState;
        case "advance":
        case "restore":
            return history.pushState
    }
}

function xe(s) {
    return s == "advance" || s == "replace" || s == "restore"
}

function N(...s) {
    const e = q("data-turbo-action", ...s);
    return xe(e) ? e : null
}

function le(s) {
    return document.querySelector(`meta[name="${s}"]`)
}

function B(s) {
    const e = le(s);
    return e && e.content
}

function _e(s, e) {
    let t = le(s);
    return t || (t = document.createElement("meta"), t.setAttribute("name", s), document.head.appendChild(t)), t.setAttribute("content", e), t
}

function O(s, e) {
    var t;
    if (s instanceof Element) return s.closest(e) || O(s.assignedSlot || ((t = s.getRootNode()) === null || t === void 0 ? void 0 : t.host), e)
}
var d;
(function(s) {
    s[s.get = 0] = "get", s[s.post = 1] = "post", s[s.put = 2] = "put", s[s.patch = 3] = "patch", s[s.delete = 4] = "delete"
})(d || (d = {}));

function We(s) {
    switch (s.toLowerCase()) {
        case "get":
            return d.get;
        case "post":
            return d.post;
        case "put":
            return d.put;
        case "patch":
            return d.patch;
        case "delete":
            return d.delete
    }
}
class Q {
    constructor(e, t, i, r = new URLSearchParams, n = null) {
        this.abortController = new AbortController, this.resolveRequestPromise = o => {}, this.delegate = e, this.method = t, this.headers = this.defaultHeaders, this.body = r, this.url = i, this.target = n
    }
    get location() {
        return this.url
    }
    get params() {
        return this.url.searchParams
    }
    get entries() {
        return this.body ? Array.from(this.body.entries()) : []
    }
    cancel() {
        this.abortController.abort()
    }
    async perform() {
        const {
            fetchOptions: e
        } = this;
        this.delegate.prepareRequest(this), await this.allowRequestToBeIntercepted(e);
        try {
            this.delegate.requestStarted(this);
            const t = await fetch(this.url.href, e);
            return await this.receive(t)
        } catch (t) {
            if (t.name !== "AbortError") throw this.willDelegateErrorHandling(t) && this.delegate.requestErrored(this, t), t
        } finally {
            this.delegate.requestFinished(this)
        }
    }
    async receive(e) {
        const t = new K(e);
        return l("turbo:before-fetch-response", {
            cancelable: !0,
            detail: {
                fetchResponse: t
            },
            target: this.target
        }).defaultPrevented ? this.delegate.requestPreventedHandlingResponse(this, t) : t.succeeded ? this.delegate.requestSucceededWithResponse(this, t) : this.delegate.requestFailedWithResponse(this, t), t
    }
    get fetchOptions() {
        var e;
        return {
            method: d[this.method].toUpperCase(),
            credentials: "same-origin",
            headers: this.headers,
            redirect: "follow",
            body: this.isSafe ? null : this.body,
            signal: this.abortSignal,
            referrer: (e = this.delegate.referrer) === null || e === void 0 ? void 0 : e.href
        }
    }
    get defaultHeaders() {
        return {
            Accept: "text/html, application/xhtml+xml"
        }
    }
    get isSafe() {
        return this.method === d.get
    }
    get abortSignal() {
        return this.abortController.signal
    }
    acceptResponseType(e) {
        this.headers.Accept = [e, this.headers.Accept].join(", ")
    }
    async allowRequestToBeIntercepted(e) {
        const t = new Promise(r => this.resolveRequestPromise = r);
        l("turbo:before-fetch-request", {
            cancelable: !0,
            detail: {
                fetchOptions: e,
                url: this.url,
                resume: this.resolveRequestPromise
            },
            target: this.target
        }).defaultPrevented && await t
    }
    willDelegateErrorHandling(e) {
        return !l("turbo:fetch-request-error", {
            target: this.target,
            cancelable: !0,
            detail: {
                request: this,
                error: e
            }
        }).defaultPrevented
    }
}
class Ue {
    constructor(e, t) {
        this.started = !1, this.intersect = i => {
            const r = i.slice(-1)[0];
            r ? .isIntersecting && this.delegate.elementAppearedInViewport(this.element)
        }, this.delegate = e, this.element = t, this.intersectionObserver = new IntersectionObserver(this.intersect)
    }
    start() {
        this.started || (this.started = !0, this.intersectionObserver.observe(this.element))
    }
    stop() {
        this.started && (this.started = !1, this.intersectionObserver.unobserve(this.element))
    }
}
class L {
    static wrap(e) {
        return typeof e == "string" ? new this(qe(e)) : e
    }
    constructor(e) {
        this.fragment = je(e)
    }
}
L.contentType = "text/vnd.turbo-stream.html";

function je(s) {
    for (const e of s.querySelectorAll("turbo-stream")) {
        const t = document.importNode(e, !0);
        for (const i of t.templateElement.content.querySelectorAll("script")) i.replaceWith(F(i));
        e.replaceWith(t)
    }
    return s
}
var b;
(function(s) {
    s[s.initialized = 0] = "initialized", s[s.requesting = 1] = "requesting", s[s.waiting = 2] = "waiting", s[s.receiving = 3] = "receiving", s[s.stopping = 4] = "stopping", s[s.stopped = 5] = "stopped"
})(b || (b = {}));
var w;
(function(s) {
    s.urlEncoded = "application/x-www-form-urlencoded", s.multipart = "multipart/form-data", s.plain = "text/plain"
})(w || (w = {}));

function $e(s) {
    switch (s.toLowerCase()) {
        case w.multipart:
            return w.multipart;
        case w.plain:
            return w.plain;
        default:
            return w.urlEncoded
    }
}
class k {
    static confirmMethod(e, t, i) {
        return Promise.resolve(confirm(e))
    }
    constructor(e, t, i, r = !1) {
        this.state = b.initialized, this.delegate = e, this.formElement = t, this.submitter = i, this.formData = ze(t, i), this.location = c(this.action), this.method == d.get && Xe(this.location, [...this.body.entries()]), this.fetchRequest = new Q(this, this.method, this.location, this.body, this.formElement), this.mustRedirect = r
    }
    get method() {
        var e;
        const t = ((e = this.submitter) === null || e === void 0 ? void 0 : e.getAttribute("formmethod")) || this.formElement.getAttribute("method") || "";
        return We(t.toLowerCase()) || d.get
    }
    get action() {
        var e;
        const t = typeof this.formElement.action == "string" ? this.formElement.action : null;
        return !((e = this.submitter) === null || e === void 0) && e.hasAttribute("formaction") ? this.submitter.getAttribute("formaction") || "" : this.formElement.getAttribute("action") || t || ""
    }
    get body() {
        return this.enctype == w.urlEncoded || this.method == d.get ? new URLSearchParams(this.stringFormData) : this.formData
    }
    get enctype() {
        var e;
        return $e(((e = this.submitter) === null || e === void 0 ? void 0 : e.getAttribute("formenctype")) || this.formElement.enctype)
    }
    get isSafe() {
        return this.fetchRequest.isSafe
    }
    get stringFormData() {
        return [...this.formData].reduce((e, [t, i]) => e.concat(typeof i == "string" ? [
            [t, i]
        ] : []), [])
    }
    async start() {
        const {
            initialized: e,
            requesting: t
        } = b, i = q("data-turbo-confirm", this.submitter, this.formElement);
        if (!(typeof i == "string" && !await k.confirmMethod(i, this.formElement, this.submitter)) && this.state == e) return this.state = t, this.fetchRequest.perform()
    }
    stop() {
        const {
            stopping: e,
            stopped: t
        } = b;
        if (this.state != e && this.state != t) return this.state = e, this.fetchRequest.cancel(), !0
    }
    prepareRequest(e) {
        if (!e.isSafe) {
            const t = Ke(B("csrf-param")) || B("csrf-token");
            t && (e.headers["X-CSRF-Token"] = t)
        }
        this.requestAcceptsTurboStreamResponse(e) && e.acceptResponseType(L.contentType)
    }
    requestStarted(e) {
        var t;
        this.state = b.waiting, (t = this.submitter) === null || t === void 0 || t.setAttribute("disabled", ""), this.setSubmitsWith(), l("turbo:submit-start", {
            target: this.formElement,
            detail: {
                formSubmission: this
            }
        }), this.delegate.formSubmissionStarted(this)
    }
    requestPreventedHandlingResponse(e, t) {
        this.result = {
            success: t.succeeded,
            fetchResponse: t
        }
    }
    requestSucceededWithResponse(e, t) {
        if (t.clientError || t.serverError) this.delegate.formSubmissionFailedWithResponse(this, t);
        else if (this.requestMustRedirect(e) && Qe(t)) {
            const i = new Error("Form responses must redirect to another location");
            this.delegate.formSubmissionErrored(this, i)
        } else this.state = b.receiving, this.result = {
            success: !0,
            fetchResponse: t
        }, this.delegate.formSubmissionSucceededWithResponse(this, t)
    }
    requestFailedWithResponse(e, t) {
        this.result = {
            success: !1,
            fetchResponse: t
        }, this.delegate.formSubmissionFailedWithResponse(this, t)
    }
    requestErrored(e, t) {
        this.result = {
            success: !1,
            error: t
        }, this.delegate.formSubmissionErrored(this, t)
    }
    requestFinished(e) {
        var t;
        this.state = b.stopped, (t = this.submitter) === null || t === void 0 || t.removeAttribute("disabled"), this.resetSubmitterText(), l("turbo:submit-end", {
            target: this.formElement,
            detail: Object.assign({
                formSubmission: this
            }, this.result)
        }), this.delegate.formSubmissionFinished(this)
    }
    setSubmitsWith() {
        if (!(!this.submitter || !this.submitsWith)) {
            if (this.submitter.matches("button")) this.originalSubmitText = this.submitter.innerHTML, this.submitter.innerHTML = this.submitsWith;
            else if (this.submitter.matches("input")) {
                const e = this.submitter;
                this.originalSubmitText = e.value, e.value = this.submitsWith
            }
        }
    }
    resetSubmitterText() {
        if (!(!this.submitter || !this.originalSubmitText)) {
            if (this.submitter.matches("button")) this.submitter.innerHTML = this.originalSubmitText;
            else if (this.submitter.matches("input")) {
                const e = this.submitter;
                e.value = this.originalSubmitText
            }
        }
    }
    requestMustRedirect(e) {
        return !e.isSafe && this.mustRedirect
    }
    requestAcceptsTurboStreamResponse(e) {
        return !e.isSafe || De("data-turbo-stream", this.submitter, this.formElement)
    }
    get submitsWith() {
        var e;
        return (e = this.submitter) === null || e === void 0 ? void 0 : e.getAttribute("data-turbo-submits-with")
    }
}

function ze(s, e) {
    const t = new FormData(s),
        i = e ? .getAttribute("name"),
        r = e ? .getAttribute("value");
    return i && t.append(i, r || ""), t
}

function Ke(s) {
    if (s != null) {
        const t = (document.cookie ? document.cookie.split("; ") : []).find(i => i.startsWith(s));
        if (t) {
            const i = t.split("=").slice(1).join("=");
            return i ? decodeURIComponent(i) : void 0
        }
    }
}

function Qe(s) {
    return s.statusCode == 200 && !s.redirected
}

function Xe(s, e) {
    const t = new URLSearchParams;
    for (const [i, r] of e) r instanceof File || t.append(i, r);
    return s.search = t.toString(), s
}
class D {
    constructor(e) {
        this.element = e
    }
    get activeElement() {
        return this.element.ownerDocument.activeElement
    }
    get children() {
        return [...this.element.children]
    }
    hasAnchor(e) {
        return this.getElementForAnchor(e) != null
    }
    getElementForAnchor(e) {
        return e ? this.element.querySelector(`[id='${e}'], a[name='${e}']`) : null
    }
    get isConnected() {
        return this.element.isConnected
    }
    get firstAutofocusableElement() {
        const e = "[inert], :disabled, [hidden], details:not([open]), dialog:not([open])";
        for (const t of this.element.querySelectorAll("[autofocus]"))
            if (t.closest(e) == null) return t;
        return null
    }
    get permanentElements() {
        return he(this.element)
    }
    getPermanentElementById(e) {
        return ce(this.element, e)
    }
    getPermanentElementMapForSnapshot(e) {
        const t = {};
        for (const i of this.permanentElements) {
            const {
                id: r
            } = i, n = e.getPermanentElementById(r);
            n && (t[r] = [i, n])
        }
        return t
    }
}

function ce(s, e) {
    return s.querySelector(`#${e}[data-turbo-permanent]`)
}

function he(s) {
    return s.querySelectorAll("[id][data-turbo-permanent]")
}
class X {
    constructor(e, t) {
        this.started = !1, this.submitCaptured = () => {
            this.eventTarget.removeEventListener("submit", this.submitBubbled, !1), this.eventTarget.addEventListener("submit", this.submitBubbled, !1)
        }, this.submitBubbled = i => {
            if (!i.defaultPrevented) {
                const r = i.target instanceof HTMLFormElement ? i.target : void 0,
                    n = i.submitter || void 0;
                r && Ye(r, n) && Je(r, n) && this.delegate.willSubmitForm(r, n) && (i.preventDefault(), i.stopImmediatePropagation(), this.delegate.formSubmitted(r, n))
            }
        }, this.delegate = e, this.eventTarget = t
    }
    start() {
        this.started || (this.eventTarget.addEventListener("submit", this.submitCaptured, !0), this.started = !0)
    }
    stop() {
        this.started && (this.eventTarget.removeEventListener("submit", this.submitCaptured, !0), this.started = !1)
    }
}

function Ye(s, e) {
    return (e ? .getAttribute("formmethod") || s.getAttribute("method")) != "dialog"
}

function Je(s, e) {
    if (e ? .hasAttribute("formtarget") || s.hasAttribute("target")) {
        const t = e ? .getAttribute("formtarget") || s.target;
        for (const i of document.getElementsByName(t))
            if (i instanceof HTMLIFrameElement) return !1;
        return !0
    } else return !0
}
class de {
    constructor(e, t) {
        this.resolveRenderPromise = i => {}, this.resolveInterceptionPromise = i => {}, this.delegate = e, this.element = t
    }
    scrollToAnchor(e) {
        const t = this.snapshot.getElementForAnchor(e);
        t ? (this.scrollToElement(t), this.focusElement(t)) : this.scrollToPosition({
            x: 0,
            y: 0
        })
    }
    scrollToAnchorFromLocation(e) {
        this.scrollToAnchor(y(e))
    }
    scrollToElement(e) {
        e.scrollIntoView()
    }
    focusElement(e) {
        e instanceof HTMLElement && (e.hasAttribute("tabindex") ? e.focus() : (e.setAttribute("tabindex", "-1"), e.focus(), e.removeAttribute("tabindex")))
    }
    scrollToPosition({
        x: e,
        y: t
    }) {
        this.scrollRoot.scrollTo(e, t)
    }
    scrollToTop() {
        this.scrollToPosition({
            x: 0,
            y: 0
        })
    }
    get scrollRoot() {
        return window
    }
    async render(e) {
        const {
            isPreview: t,
            shouldRender: i,
            newSnapshot: r
        } = e;
        if (i) try {
            this.renderPromise = new Promise(u => this.resolveRenderPromise = u), this.renderer = e, await this.prepareToRenderSnapshot(e);
            const n = new Promise(u => this.resolveInterceptionPromise = u),
                o = {
                    resume: this.resolveInterceptionPromise,
                    render: this.renderer.renderElement
                };
            this.delegate.allowsImmediateRender(r, o) || await n, await this.renderSnapshot(e), this.delegate.viewRenderedSnapshot(r, t), this.delegate.preloadOnLoadLinksForView(this.element), this.finishRenderingSnapshot(e)
        } finally {
            delete this.renderer, this.resolveRenderPromise(void 0), delete this.renderPromise
        } else this.invalidate(e.reloadReason)
    }
    invalidate(e) {
        this.delegate.viewInvalidated(e)
    }
    async prepareToRenderSnapshot(e) {
        this.markAsPreview(e.isPreview), await e.prepareToRender()
    }
    markAsPreview(e) {
        e ? this.element.setAttribute("data-turbo-preview", "") : this.element.removeAttribute("data-turbo-preview")
    }
    async renderSnapshot(e) {
        await e.render()
    }
    finishRenderingSnapshot(e) {
        e.finishRendering()
    }
}
class Ge extends de {
    missing() {
        this.element.innerHTML = '<strong class="turbo-frame-error">Content missing</strong>'
    }
    get snapshot() {
        return new D(this.element)
    }
}
class ue {
    constructor(e, t) {
        this.clickBubbled = i => {
            this.respondsToEventTarget(i.target) ? this.clickEvent = i : delete this.clickEvent
        }, this.linkClicked = i => {
            this.clickEvent && this.respondsToEventTarget(i.target) && i.target instanceof Element && this.delegate.shouldInterceptLinkClick(i.target, i.detail.url, i.detail.originalEvent) && (this.clickEvent.preventDefault(), i.preventDefault(), this.delegate.linkClickIntercepted(i.target, i.detail.url, i.detail.originalEvent)), delete this.clickEvent
        }, this.willVisit = i => {
            delete this.clickEvent
        }, this.delegate = e, this.element = t
    }
    start() {
        this.element.addEventListener("click", this.clickBubbled), document.addEventListener("turbo:click", this.linkClicked), document.addEventListener("turbo:before-visit", this.willVisit)
    }
    stop() {
        this.element.removeEventListener("click", this.clickBubbled), document.removeEventListener("turbo:click", this.linkClicked), document.removeEventListener("turbo:before-visit", this.willVisit)
    }
    respondsToEventTarget(e) {
        const t = e instanceof Element ? e : e instanceof Node ? e.parentElement : null;
        return t && t.closest("turbo-frame, html") == this.element
    }
}
class me {
    constructor(e, t) {
        this.started = !1, this.clickCaptured = () => {
            this.eventTarget.removeEventListener("click", this.clickBubbled, !1), this.eventTarget.addEventListener("click", this.clickBubbled, !1)
        }, this.clickBubbled = i => {
            if (i instanceof MouseEvent && this.clickEventIsSignificant(i)) {
                const r = i.composedPath && i.composedPath()[0] || i.target,
                    n = this.findLinkFromClickTarget(r);
                if (n && Ze(n)) {
                    const o = this.getLocationForLink(n);
                    this.delegate.willFollowLinkToLocation(n, o, i) && (i.preventDefault(), this.delegate.followedLinkToLocation(n, o))
                }
            }
        }, this.delegate = e, this.eventTarget = t
    }
    start() {
        this.started || (this.eventTarget.addEventListener("click", this.clickCaptured, !0), this.started = !0)
    }
    stop() {
        this.started && (this.eventTarget.removeEventListener("click", this.clickCaptured, !0), this.started = !1)
    }
    clickEventIsSignificant(e) {
        return !(e.target && e.target.isContentEditable || e.defaultPrevented || e.which > 1 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)
    }
    findLinkFromClickTarget(e) {
        return O(e, "a[href]:not([target^=_]):not([download])")
    }
    getLocationForLink(e) {
        return c(e.getAttribute("href") || "")
    }
}

function Ze(s) {
    if (s.hasAttribute("target")) {
        for (const e of document.getElementsByName(s.target))
            if (e instanceof HTMLIFrameElement) return !1;
        return !0
    } else return !0
}
class pe {
    constructor(e, t) {
        this.delegate = e, this.linkInterceptor = new me(this, t)
    }
    start() {
        this.linkInterceptor.start()
    }
    stop() {
        this.linkInterceptor.stop()
    }
    willFollowLinkToLocation(e, t, i) {
        return this.delegate.willSubmitFormLinkToLocation(e, t, i) && e.hasAttribute("data-turbo-method")
    }
    followedLinkToLocation(e, t) {
        const i = document.createElement("form"),
            r = "hidden";
        for (const [T, M] of t.searchParams) i.append(Object.assign(document.createElement("input"), {
            type: r,
            name: T,
            value: M
        }));
        const n = Object.assign(t, {
            search: ""
        });
        i.setAttribute("data-turbo", "true"), i.setAttribute("action", n.href), i.setAttribute("hidden", "");
        const o = e.getAttribute("data-turbo-method");
        o && i.setAttribute("method", o);
        const h = e.getAttribute("data-turbo-frame");
        h && i.setAttribute("data-turbo-frame", h);
        const u = N(e);
        u && i.setAttribute("data-turbo-action", u);
        const R = e.getAttribute("data-turbo-confirm");
        R && i.setAttribute("data-turbo-confirm", R), e.hasAttribute("data-turbo-stream") && i.setAttribute("data-turbo-stream", ""), this.delegate.submittedFormLinkToLocation(e, t, i), document.body.appendChild(i), i.addEventListener("turbo:submit-end", () => i.remove(), {
            once: !0
        }), requestAnimationFrame(() => i.requestSubmit())
    }
}
class fe {
    static async preservingPermanentElements(e, t, i) {
        const r = new this(e, t);
        r.enter(), await i(), r.leave()
    }
    constructor(e, t) {
        this.delegate = e, this.permanentElementMap = t
    }
    enter() {
        for (const e in this.permanentElementMap) {
            const [t, i] = this.permanentElementMap[e];
            this.delegate.enteringBardo(t, i), this.replaceNewPermanentElementWithPlaceholder(i)
        }
    }
    leave() {
        for (const e in this.permanentElementMap) {
            const [t] = this.permanentElementMap[e];
            this.replaceCurrentPermanentElementWithClone(t), this.replacePlaceholderWithPermanentElement(t), this.delegate.leavingBardo(t)
        }
    }
    replaceNewPermanentElementWithPlaceholder(e) {
        const t = et(e);
        e.replaceWith(t)
    }
    replaceCurrentPermanentElementWithClone(e) {
        const t = e.cloneNode(!0);
        e.replaceWith(t)
    }
    replacePlaceholderWithPermanentElement(e) {
        const t = this.getPlaceholderById(e.id);
        t ? .replaceWith(e)
    }
    getPlaceholderById(e) {
        return this.placeholders.find(t => t.content == e)
    }
    get placeholders() {
        return [...document.querySelectorAll("meta[name=turbo-permanent-placeholder][content]")]
    }
}

function et(s) {
    const e = document.createElement("meta");
    return e.setAttribute("name", "turbo-permanent-placeholder"), e.setAttribute("content", s.id), e
}
class Y {
    constructor(e, t, i, r, n = !0) {
        this.activeElement = null, this.currentSnapshot = e, this.newSnapshot = t, this.isPreview = r, this.willRender = n, this.renderElement = i, this.promise = new Promise((o, h) => this.resolvingFunctions = {
            resolve: o,
            reject: h
        })
    }
    get shouldRender() {
        return !0
    }
    get reloadReason() {}
    prepareToRender() {}
    finishRendering() {
        this.resolvingFunctions && (this.resolvingFunctions.resolve(), delete this.resolvingFunctions)
    }
    async preservingPermanentElements(e) {
        await fe.preservingPermanentElements(this, this.permanentElementMap, e)
    }
    focusFirstAutofocusableElement() {
        const e = this.connectedSnapshot.firstAutofocusableElement;
        tt(e) && e.focus()
    }
    enteringBardo(e) {
        this.activeElement || e.contains(this.currentSnapshot.activeElement) && (this.activeElement = this.currentSnapshot.activeElement)
    }
    leavingBardo(e) {
        e.contains(this.activeElement) && this.activeElement instanceof HTMLElement && (this.activeElement.focus(), this.activeElement = null)
    }
    get connectedSnapshot() {
        return this.newSnapshot.isConnected ? this.newSnapshot : this.currentSnapshot
    }
    get currentElement() {
        return this.currentSnapshot.element
    }
    get newElement() {
        return this.newSnapshot.element
    }
    get permanentElementMap() {
        return this.currentSnapshot.getPermanentElementMapForSnapshot(this.newSnapshot)
    }
}

function tt(s) {
    return s && typeof s.focus == "function"
}
class U extends Y {
    static renderElement(e, t) {
        var i;
        const r = document.createRange();
        r.selectNodeContents(e), r.deleteContents();
        const n = t,
            o = (i = n.ownerDocument) === null || i === void 0 ? void 0 : i.createRange();
        o && (o.selectNodeContents(n), e.appendChild(o.extractContents()))
    }
    constructor(e, t, i, r, n, o = !0) {
        super(t, i, r, n, o), this.delegate = e
    }
    get shouldRender() {
        return !0
    }
    async render() {
        await H(), this.preservingPermanentElements(() => {
            this.loadFrameElement()
        }), this.scrollFrameIntoView(), await H(), this.focusFirstAutofocusableElement(), await H(), this.activateScriptElements()
    }
    loadFrameElement() {
        this.delegate.willRenderFrame(this.currentElement, this.newElement), this.renderElement(this.currentElement, this.newElement)
    }
    scrollFrameIntoView() {
        if (this.currentElement.autoscroll || this.newElement.autoscroll) {
            const e = this.currentElement.firstElementChild,
                t = st(this.currentElement.getAttribute("data-autoscroll-block"), "end"),
                i = it(this.currentElement.getAttribute("data-autoscroll-behavior"), "auto");
            if (e) return e.scrollIntoView({
                block: t,
                behavior: i
            }), !0
        }
        return !1
    }
    activateScriptElements() {
        for (const e of this.newScriptElements) {
            const t = F(e);
            e.replaceWith(t)
        }
    }
    get newScriptElements() {
        return this.currentElement.querySelectorAll("script")
    }
}

function st(s, e) {
    return s == "end" || s == "start" || s == "center" || s == "nearest" ? s : e
}

function it(s, e) {
    return s == "auto" || s == "smooth" ? s : e
}
class g {
    static get defaultCSS() {
        return oe `
      .turbo-progress-bar {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        height: 3px;
        background: #0076ff;
        z-index: 2147483647;
        transition:
          width ${g.animationDuration}ms ease-out,
          opacity ${g.animationDuration/2}ms ${g.animationDuration/2}ms ease-in;
        transform: translate3d(0, 0, 0);
      }
    `
    }
    constructor() {
        this.hiding = !1, this.value = 0, this.visible = !1, this.trickle = () => {
            this.setValue(this.value + Math.random() / 100)
        }, this.stylesheetElement = this.createStylesheetElement(), this.progressElement = this.createProgressElement(), this.installStylesheetElement(), this.setValue(0)
    }
    show() {
        this.visible || (this.visible = !0, this.installProgressElement(), this.startTrickling())
    }
    hide() {
        this.visible && !this.hiding && (this.hiding = !0, this.fadeProgressElement(() => {
            this.uninstallProgressElement(), this.stopTrickling(), this.visible = !1, this.hiding = !1
        }))
    }
    setValue(e) {
        this.value = e, this.refresh()
    }
    installStylesheetElement() {
        document.head.insertBefore(this.stylesheetElement, document.head.firstChild)
    }
    installProgressElement() {
        this.progressElement.style.width = "0", this.progressElement.style.opacity = "1", document.documentElement.insertBefore(this.progressElement, document.body), this.refresh()
    }
    fadeProgressElement(e) {
        this.progressElement.style.opacity = "0", setTimeout(e, g.animationDuration * 1.5)
    }
    uninstallProgressElement() {
        this.progressElement.parentNode && document.documentElement.removeChild(this.progressElement)
    }
    startTrickling() {
        this.trickleInterval || (this.trickleInterval = window.setInterval(this.trickle, g.animationDuration))
    }
    stopTrickling() {
        window.clearInterval(this.trickleInterval), delete this.trickleInterval
    }
    refresh() {
        requestAnimationFrame(() => {
            this.progressElement.style.width = `${10+this.value*90}%`
        })
    }
    createStylesheetElement() {
        const e = document.createElement("style");
        return e.type = "text/css", e.textContent = g.defaultCSS, this.cspNonce && (e.nonce = this.cspNonce), e
    }
    createProgressElement() {
        const e = document.createElement("div");
        return e.className = "turbo-progress-bar", e
    }
    get cspNonce() {
        return B("csp-nonce")
    }
}
g.animationDuration = 300;
class rt extends D {
    constructor() {
        super(...arguments), this.detailsByOuterHTML = this.children.filter(e => !lt(e)).map(e => dt(e)).reduce((e, t) => {
            const {
                outerHTML: i
            } = t, r = i in e ? e[i] : {
                type: nt(t),
                tracked: ot(t),
                elements: []
            };
            return Object.assign(Object.assign({}, e), {
                [i]: Object.assign(Object.assign({}, r), {
                    elements: [...r.elements, t]
                })
            })
        }, {})
    }
    get trackedElementSignature() {
        return Object.keys(this.detailsByOuterHTML).filter(e => this.detailsByOuterHTML[e].tracked).join("")
    }
    getScriptElementsNotInSnapshot(e) {
        return this.getElementsMatchingTypeNotInSnapshot("script", e)
    }
    getStylesheetElementsNotInSnapshot(e) {
        return this.getElementsMatchingTypeNotInSnapshot("stylesheet", e)
    }
    getElementsMatchingTypeNotInSnapshot(e, t) {
        return Object.keys(this.detailsByOuterHTML).filter(i => !(i in t.detailsByOuterHTML)).map(i => this.detailsByOuterHTML[i]).filter(({
            type: i
        }) => i == e).map(({
            elements: [i]
        }) => i)
    }
    get provisionalElements() {
        return Object.keys(this.detailsByOuterHTML).reduce((e, t) => {
            const {
                type: i,
                tracked: r,
                elements: n
            } = this.detailsByOuterHTML[t];
            return i == null && !r ? [...e, ...n] : n.length > 1 ? [...e, ...n.slice(1)] : e
        }, [])
    }
    getMetaValue(e) {
        const t = this.findMetaElementByName(e);
        return t ? t.getAttribute("content") : null
    }
    findMetaElementByName(e) {
        return Object.keys(this.detailsByOuterHTML).reduce((t, i) => {
            const {
                elements: [r]
            } = this.detailsByOuterHTML[i];
            return ht(r, e) ? r : t
        }, void 0)
    }
}

function nt(s) {
    if (at(s)) return "script";
    if (ct(s)) return "stylesheet"
}

function ot(s) {
    return s.getAttribute("data-turbo-track") == "reload"
}

function at(s) {
    return s.localName == "script"
}

function lt(s) {
    return s.localName == "noscript"
}

function ct(s) {
    const e = s.localName;
    return e == "style" || e == "link" && s.getAttribute("rel") == "stylesheet"
}

function ht(s, e) {
    return s.localName == "meta" && s.getAttribute("name") == e
}

function dt(s) {
    return s.hasAttribute("nonce") && s.setAttribute("nonce", ""), s
}
class p extends D {
    static fromHTMLString(e = "") {
        return this.fromDocument(ne(e))
    }
    static fromElement(e) {
        return this.fromDocument(e.ownerDocument)
    }
    static fromDocument({
        head: e,
        body: t
    }) {
        return new this(t, new rt(e))
    }
    constructor(e, t) {
        super(e), this.headSnapshot = t
    }
    clone() {
        const e = this.element.cloneNode(!0),
            t = this.element.querySelectorAll("select"),
            i = e.querySelectorAll("select");
        for (const [r, n] of t.entries()) {
            const o = i[r];
            for (const h of o.selectedOptions) h.selected = !1;
            for (const h of n.selectedOptions) o.options[h.index].selected = !0
        }
        for (const r of e.querySelectorAll('input[type="password"]')) r.value = "";
        return new p(e, this.headSnapshot)
    }
    get headElement() {
        return this.headSnapshot.element
    }
    get rootLocation() {
        var e;
        const t = (e = this.getSetting("root")) !== null && e !== void 0 ? e : "/";
        return c(t)
    }
    get cacheControlValue() {
        return this.getSetting("cache-control")
    }
    get isPreviewable() {
        return this.cacheControlValue != "no-preview"
    }
    get isCacheable() {
        return this.cacheControlValue != "no-cache"
    }
    get isVisitable() {
        return this.getSetting("visit-control") != "reload"
    }
    getSetting(e) {
        return this.headSnapshot.getMetaValue(`turbo-${e}`)
    }
}
var C;
(function(s) {
    s.visitStart = "visitStart", s.requestStart = "requestStart", s.requestEnd = "requestEnd", s.visitEnd = "visitEnd"
})(C || (C = {}));
var m;
(function(s) {
    s.initialized = "initialized", s.started = "started", s.canceled = "canceled", s.failed = "failed", s.completed = "completed"
})(m || (m = {}));
const ut = {
    action: "advance",
    historyChanged: !1,
    visitCachedSnapshot: () => {},
    willRender: !0,
    updateHistory: !0,
    shouldCacheSnapshot: !0,
    acceptsStreamResponse: !1
};
var S;
(function(s) {
    s[s.networkFailure = 0] = "networkFailure", s[s.timeoutFailure = -1] = "timeoutFailure", s[s.contentTypeMismatch = -2] = "contentTypeMismatch"
})(S || (S = {}));
class mt {
    constructor(e, t, i, r = {}) {
        this.identifier = P(), this.timingMetrics = {}, this.followedRedirect = !1, this.historyChanged = !1, this.scrolled = !1, this.shouldCacheSnapshot = !0, this.acceptsStreamResponse = !1, this.snapshotCached = !1, this.state = m.initialized, this.delegate = e, this.location = t, this.restorationIdentifier = i || P();
        const {
            action: n,
            historyChanged: o,
            referrer: h,
            snapshot: u,
            snapshotHTML: R,
            response: V,
            visitCachedSnapshot: T,
            willRender: M,
            updateHistory: we,
            shouldCacheSnapshot: Ee,
            acceptsStreamResponse: Se
        } = Object.assign(Object.assign({}, ut), r);
        this.action = n, this.historyChanged = o, this.referrer = h, this.snapshot = u, this.snapshotHTML = R, this.response = V, this.isSamePage = this.delegate.locationWithActionIsSamePage(this.location, this.action), this.visitCachedSnapshot = T, this.willRender = M, this.updateHistory = we, this.scrolled = !M, this.shouldCacheSnapshot = Ee, this.acceptsStreamResponse = Se
    }
    get adapter() {
        return this.delegate.adapter
    }
    get view() {
        return this.delegate.view
    }
    get history() {
        return this.delegate.history
    }
    get restorationData() {
        return this.history.getRestorationDataForIdentifier(this.restorationIdentifier)
    }
    get silent() {
        return this.isSamePage
    }
    start() {
        this.state == m.initialized && (this.recordTimingMetric(C.visitStart), this.state = m.started, this.adapter.visitStarted(this), this.delegate.visitStarted(this))
    }
    cancel() {
        this.state == m.started && (this.request && this.request.cancel(), this.cancelRender(), this.state = m.canceled)
    }
    complete() {
        this.state == m.started && (this.recordTimingMetric(C.visitEnd), this.state = m.completed, this.followRedirect(), this.followedRedirect || (this.adapter.visitCompleted(this), this.delegate.visitCompleted(this)))
    }
    fail() {
        this.state == m.started && (this.state = m.failed, this.adapter.visitFailed(this))
    }
    changeHistory() {
        var e;
        if (!this.historyChanged && this.updateHistory) {
            const t = this.location.href === ((e = this.referrer) === null || e === void 0 ? void 0 : e.href) ? "replace" : this.action,
                i = ae(t);
            this.history.update(i, this.location, this.restorationIdentifier), this.historyChanged = !0
        }
    }
    issueRequest() {
        this.hasPreloadedResponse() ? this.simulateRequest() : this.shouldIssueRequest() && !this.request && (this.request = new Q(this, d.get, this.location), this.request.perform())
    }
    simulateRequest() {
        this.response && (this.startRequest(), this.recordResponse(), this.finishRequest())
    }
    startRequest() {
        this.recordTimingMetric(C.requestStart), this.adapter.visitRequestStarted(this)
    }
    recordResponse(e = this.response) {
        if (this.response = e, e) {
            const {
                statusCode: t
            } = e;
            Z(t) ? this.adapter.visitRequestCompleted(this) : this.adapter.visitRequestFailedWithStatusCode(this, t)
        }
    }
    finishRequest() {
        this.recordTimingMetric(C.requestEnd), this.adapter.visitRequestFinished(this)
    }
    loadResponse() {
        if (this.response) {
            const {
                statusCode: e,
                responseHTML: t
            } = this.response;
            this.render(async () => {
                this.shouldCacheSnapshot && this.cacheSnapshot(), this.view.renderPromise && await this.view.renderPromise, Z(e) && t != null ? (await this.view.renderPage(p.fromHTMLString(t), !1, this.willRender, this), this.performScroll(), this.adapter.visitRendered(this), this.complete()) : (await this.view.renderError(p.fromHTMLString(t), this), this.adapter.visitRendered(this), this.fail())
            })
        }
    }
    getCachedSnapshot() {
        const e = this.view.getCachedSnapshotForLocation(this.location) || this.getPreloadedSnapshot();
        if (e && (!y(this.location) || e.hasAnchor(y(this.location))) && (this.action == "restore" || e.isPreviewable)) return e
    }
    getPreloadedSnapshot() {
        if (this.snapshotHTML) return p.fromHTMLString(this.snapshotHTML)
    }
    hasCachedSnapshot() {
        return this.getCachedSnapshot() != null
    }
    loadCachedSnapshot() {
        const e = this.getCachedSnapshot();
        if (e) {
            const t = this.shouldIssueRequest();
            this.render(async () => {
                this.cacheSnapshot(), this.isSamePage ? this.adapter.visitRendered(this) : (this.view.renderPromise && await this.view.renderPromise, await this.view.renderPage(e, t, this.willRender, this), this.performScroll(), this.adapter.visitRendered(this), t || this.complete())
            })
        }
    }
    followRedirect() {
        var e;
        this.redirectedToLocation && !this.followedRedirect && (!((e = this.response) === null || e === void 0) && e.redirected) && (this.adapter.visitProposedToLocation(this.redirectedToLocation, {
            action: "replace",
            response: this.response,
            shouldCacheSnapshot: !1,
            willRender: !1
        }), this.followedRedirect = !0)
    }
    goToSamePageAnchor() {
        this.isSamePage && this.render(async () => {
            this.cacheSnapshot(), this.performScroll(), this.changeHistory(), this.adapter.visitRendered(this)
        })
    }
    prepareRequest(e) {
        this.acceptsStreamResponse && e.acceptResponseType(L.contentType)
    }
    requestStarted() {
        this.startRequest()
    }
    requestPreventedHandlingResponse(e, t) {}
    async requestSucceededWithResponse(e, t) {
        const i = await t.responseHTML,
            {
                redirected: r,
                statusCode: n
            } = t;
        i == null ? this.recordResponse({
            statusCode: S.contentTypeMismatch,
            redirected: r
        }) : (this.redirectedToLocation = t.redirected ? t.location : void 0, this.recordResponse({
            statusCode: n,
            responseHTML: i,
            redirected: r
        }))
    }
    async requestFailedWithResponse(e, t) {
        const i = await t.responseHTML,
            {
                redirected: r,
                statusCode: n
            } = t;
        i == null ? this.recordResponse({
            statusCode: S.contentTypeMismatch,
            redirected: r
        }) : this.recordResponse({
            statusCode: n,
            responseHTML: i,
            redirected: r
        })
    }
    requestErrored(e, t) {
        this.recordResponse({
            statusCode: S.networkFailure,
            redirected: !1
        })
    }
    requestFinished() {
        this.finishRequest()
    }
    performScroll() {
        !this.scrolled && !this.view.forceReloaded && (this.action == "restore" ? this.scrollToRestoredPosition() || this.scrollToAnchor() || this.view.scrollToTop() : this.scrollToAnchor() || this.view.scrollToTop(), this.isSamePage && this.delegate.visitScrolledToSamePageLocation(this.view.lastRenderedLocation, this.location), this.scrolled = !0)
    }
    scrollToRestoredPosition() {
        const {
            scrollPosition: e
        } = this.restorationData;
        if (e) return this.view.scrollToPosition(e), !0
    }
    scrollToAnchor() {
        const e = y(this.location);
        if (e != null) return this.view.scrollToAnchor(e), !0
    }
    recordTimingMetric(e) {
        this.timingMetrics[e] = new Date().getTime()
    }
    getTimingMetrics() {
        return Object.assign({}, this.timingMetrics)
    }
    getHistoryMethodForAction(e) {
        switch (e) {
            case "replace":
                return history.replaceState;
            case "advance":
            case "restore":
                return history.pushState
        }
    }
    hasPreloadedResponse() {
        return typeof this.response == "object"
    }
    shouldIssueRequest() {
        return this.isSamePage ? !1 : this.action == "restore" ? !this.hasCachedSnapshot() : this.willRender
    }
    cacheSnapshot() {
        this.snapshotCached || (this.view.cacheSnapshot(this.snapshot).then(e => e && this.visitCachedSnapshot(e)), this.snapshotCached = !0)
    }
    async render(e) {
        this.cancelRender(), await new Promise(t => {
            this.frame = requestAnimationFrame(() => t())
        }), await e(), delete this.frame
    }
    cancelRender() {
        this.frame && (cancelAnimationFrame(this.frame), delete this.frame)
    }
}

function Z(s) {
    return s >= 200 && s < 300
}
class pt {
    constructor(e) {
        this.progressBar = new g, this.showProgressBar = () => {
            this.progressBar.show()
        }, this.session = e
    }
    visitProposedToLocation(e, t) {
        this.navigator.startVisit(e, t ? .restorationIdentifier || P(), t)
    }
    visitStarted(e) {
        this.location = e.location, e.loadCachedSnapshot(), e.issueRequest(), e.goToSamePageAnchor()
    }
    visitRequestStarted(e) {
        this.progressBar.setValue(0), e.hasCachedSnapshot() || e.action != "restore" ? this.showVisitProgressBarAfterDelay() : this.showProgressBar()
    }
    visitRequestCompleted(e) {
        e.loadResponse()
    }
    visitRequestFailedWithStatusCode(e, t) {
        switch (t) {
            case S.networkFailure:
            case S.timeoutFailure:
            case S.contentTypeMismatch:
                return this.reload({
                    reason: "request_failed",
                    context: {
                        statusCode: t
                    }
                });
            default:
                return e.loadResponse()
        }
    }
    visitRequestFinished(e) {
        this.progressBar.setValue(1), this.hideVisitProgressBar()
    }
    visitCompleted(e) {}
    pageInvalidated(e) {
        this.reload(e)
    }
    visitFailed(e) {}
    visitRendered(e) {}
    formSubmissionStarted(e) {
        this.progressBar.setValue(0), this.showFormProgressBarAfterDelay()
    }
    formSubmissionFinished(e) {
        this.progressBar.setValue(1), this.hideFormProgressBar()
    }
    showVisitProgressBarAfterDelay() {
        this.visitProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay)
    }
    hideVisitProgressBar() {
        this.progressBar.hide(), this.visitProgressBarTimeout != null && (window.clearTimeout(this.visitProgressBarTimeout), delete this.visitProgressBarTimeout)
    }
    showFormProgressBarAfterDelay() {
        this.formProgressBarTimeout == null && (this.formProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay))
    }
    hideFormProgressBar() {
        this.progressBar.hide(), this.formProgressBarTimeout != null && (window.clearTimeout(this.formProgressBarTimeout), delete this.formProgressBarTimeout)
    }
    reload(e) {
        var t;
        l("turbo:reload", {
            detail: e
        }), window.location.href = ((t = this.location) === null || t === void 0 ? void 0 : t.toString()) || window.location.href
    }
    get navigator() {
        return this.session.navigator
    }
}
class ft {
    constructor() {
        this.selector = "[data-turbo-temporary]", this.deprecatedSelector = "[data-turbo-cache=false]", this.started = !1, this.removeTemporaryElements = e => {
            for (const t of this.temporaryElements) t.remove()
        }
    }
    start() {
        this.started || (this.started = !0, addEventListener("turbo:before-cache", this.removeTemporaryElements, !1))
    }
    stop() {
        this.started && (this.started = !1, removeEventListener("turbo:before-cache", this.removeTemporaryElements, !1))
    }
    get temporaryElements() {
        return [...document.querySelectorAll(this.selector), ...this.temporaryElementsWithDeprecation]
    }
    get temporaryElementsWithDeprecation() {
        const e = document.querySelectorAll(this.deprecatedSelector);
        return e.length && console.warn(`The ${this.deprecatedSelector} selector is deprecated and will be removed in a future version. Use ${this.selector} instead.`), [...e]
    }
}
class gt {
    constructor(e, t) {
        this.session = e, this.element = t, this.linkInterceptor = new ue(this, t), this.formSubmitObserver = new X(this, t)
    }
    start() {
        this.linkInterceptor.start(), this.formSubmitObserver.start()
    }
    stop() {
        this.linkInterceptor.stop(), this.formSubmitObserver.stop()
    }
    shouldInterceptLinkClick(e, t, i) {
        return this.shouldRedirect(e)
    }
    linkClickIntercepted(e, t, i) {
        const r = this.findFrameElement(e);
        r && r.delegate.linkClickIntercepted(e, t, i)
    }
    willSubmitForm(e, t) {
        return e.closest("turbo-frame") == null && this.shouldSubmit(e, t) && this.shouldRedirect(e, t)
    }
    formSubmitted(e, t) {
        const i = this.findFrameElement(e, t);
        i && i.delegate.formSubmitted(e, t)
    }
    shouldSubmit(e, t) {
        var i;
        const r = z(e, t),
            n = this.element.ownerDocument.querySelector('meta[name="turbo-root"]'),
            o = c((i = n ? .content) !== null && i !== void 0 ? i : "/");
        return this.shouldRedirect(e, t) && A(r, o)
    }
    shouldRedirect(e, t) {
        if (e instanceof HTMLFormElement ? this.session.submissionIsNavigatable(e, t) : this.session.elementIsNavigatable(e)) {
            const r = this.findFrameElement(e, t);
            return r ? r != e.closest("turbo-frame") : !1
        } else return !1
    }
    findFrameElement(e, t) {
        const i = t ? .getAttribute("data-turbo-frame") || e.getAttribute("data-turbo-frame");
        if (i && i != "_top") {
            const r = this.element.querySelector(`#${i}:not([disabled])`);
            if (r instanceof v) return r
        }
    }
}
class vt {
    constructor(e) {
        this.restorationIdentifier = P(), this.restorationData = {}, this.started = !1, this.pageLoaded = !1, this.onPopState = t => {
            if (this.shouldHandlePopState()) {
                const {
                    turbo: i
                } = t.state || {};
                if (i) {
                    this.location = new URL(window.location.href);
                    const {
                        restorationIdentifier: r
                    } = i;
                    this.restorationIdentifier = r, this.delegate.historyPoppedToLocationWithRestorationIdentifier(this.location, r)
                }
            }
        }, this.onPageLoad = async t => {
            await Oe(), this.pageLoaded = !0
        }, this.delegate = e
    }
    start() {
        this.started || (addEventListener("popstate", this.onPopState, !1), addEventListener("load", this.onPageLoad, !1), this.started = !0, this.replace(new URL(window.location.href)))
    }
    stop() {
        this.started && (removeEventListener("popstate", this.onPopState, !1), removeEventListener("load", this.onPageLoad, !1), this.started = !1)
    }
    push(e, t) {
        this.update(history.pushState, e, t)
    }
    replace(e, t) {
        this.update(history.replaceState, e, t)
    }
    update(e, t, i = P()) {
        const r = {
            turbo: {
                restorationIdentifier: i
            }
        };
        e.call(history, r, "", t.href), this.location = t, this.restorationIdentifier = i
    }
    getRestorationDataForIdentifier(e) {
        return this.restorationData[e] || {}
    }
    updateRestorationData(e) {
        const {
            restorationIdentifier: t
        } = this, i = this.restorationData[t];
        this.restorationData[t] = Object.assign(Object.assign({}, i), e)
    }
    assumeControlOfScrollRestoration() {
        var e;
        this.previousScrollRestoration || (this.previousScrollRestoration = (e = history.scrollRestoration) !== null && e !== void 0 ? e : "auto", history.scrollRestoration = "manual")
    }
    relinquishControlOfScrollRestoration() {
        this.previousScrollRestoration && (history.scrollRestoration = this.previousScrollRestoration, delete this.previousScrollRestoration)
    }
    shouldHandlePopState() {
        return this.pageIsLoaded()
    }
    pageIsLoaded() {
        return this.pageLoaded || document.readyState == "complete"
    }
}
class bt {
    constructor(e) {
        this.delegate = e
    }
    proposeVisit(e, t = {}) {
        this.delegate.allowsVisitingLocationWithAction(e, t.action) && (A(e, this.view.snapshot.rootLocation) ? this.delegate.visitProposedToLocation(e, t) : window.location.href = e.toString())
    }
    startVisit(e, t, i = {}) {
        this.stop(), this.currentVisit = new mt(this, c(e), t, Object.assign({
            referrer: this.location
        }, i)), this.currentVisit.start()
    }
    submitForm(e, t) {
        this.stop(), this.formSubmission = new k(this, e, t, !0), this.formSubmission.start()
    }
    stop() {
        this.formSubmission && (this.formSubmission.stop(), delete this.formSubmission), this.currentVisit && (this.currentVisit.cancel(), delete this.currentVisit)
    }
    get adapter() {
        return this.delegate.adapter
    }
    get view() {
        return this.delegate.view
    }
    get history() {
        return this.delegate.history
    }
    formSubmissionStarted(e) {
        typeof this.adapter.formSubmissionStarted == "function" && this.adapter.formSubmissionStarted(e)
    }
    async formSubmissionSucceededWithResponse(e, t) {
        if (e == this.formSubmission) {
            const i = await t.responseHTML;
            if (i) {
                const r = e.isSafe;
                r || this.view.clearSnapshotCache();
                const {
                    statusCode: n,
                    redirected: o
                } = t, u = {
                    action: this.getActionForFormSubmission(e),
                    shouldCacheSnapshot: r,
                    response: {
                        statusCode: n,
                        responseHTML: i,
                        redirected: o
                    }
                };
                this.proposeVisit(t.location, u)
            }
        }
    }
    async formSubmissionFailedWithResponse(e, t) {
        const i = await t.responseHTML;
        if (i) {
            const r = p.fromHTMLString(i);
            t.serverError ? await this.view.renderError(r, this.currentVisit) : await this.view.renderPage(r, !1, !0, this.currentVisit), this.view.scrollToTop(), this.view.clearSnapshotCache()
        }
    }
    formSubmissionErrored(e, t) {
        console.error(t)
    }
    formSubmissionFinished(e) {
        typeof this.adapter.formSubmissionFinished == "function" && this.adapter.formSubmissionFinished(e)
    }
    visitStarted(e) {
        this.delegate.visitStarted(e)
    }
    visitCompleted(e) {
        this.delegate.visitCompleted(e)
    }
    locationWithActionIsSamePage(e, t) {
        const i = y(e),
            r = y(this.view.lastRenderedLocation),
            n = t === "restore" && typeof i > "u";
        return t !== "replace" && x(e) === x(this.view.lastRenderedLocation) && (n || i != null && i !== r)
    }
    visitScrolledToSamePageLocation(e, t) {
        this.delegate.visitScrolledToSamePageLocation(e, t)
    }
    get location() {
        return this.history.location
    }
    get restorationIdentifier() {
        return this.history.restorationIdentifier
    }
    getActionForFormSubmission({
        submitter: e,
        formElement: t
    }) {
        return N(e, t) || "advance"
    }
}
var f;
(function(s) {
    s[s.initial = 0] = "initial", s[s.loading = 1] = "loading", s[s.interactive = 2] = "interactive", s[s.complete = 3] = "complete"
})(f || (f = {}));
class wt {
    constructor(e) {
        this.stage = f.initial, this.started = !1, this.interpretReadyState = () => {
            const {
                readyState: t
            } = this;
            t == "interactive" ? this.pageIsInteractive() : t == "complete" && this.pageIsComplete()
        }, this.pageWillUnload = () => {
            this.delegate.pageWillUnload()
        }, this.delegate = e
    }
    start() {
        this.started || (this.stage == f.initial && (this.stage = f.loading), document.addEventListener("readystatechange", this.interpretReadyState, !1), addEventListener("pagehide", this.pageWillUnload, !1), this.started = !0)
    }
    stop() {
        this.started && (document.removeEventListener("readystatechange", this.interpretReadyState, !1), removeEventListener("pagehide", this.pageWillUnload, !1), this.started = !1)
    }
    pageIsInteractive() {
        this.stage == f.loading && (this.stage = f.interactive, this.delegate.pageBecameInteractive())
    }
    pageIsComplete() {
        this.pageIsInteractive(), this.stage == f.interactive && (this.stage = f.complete, this.delegate.pageLoaded())
    }
    get readyState() {
        return document.readyState
    }
}
class Et {
    constructor(e) {
        this.started = !1, this.onScroll = () => {
            this.updatePosition({
                x: window.pageXOffset,
                y: window.pageYOffset
            })
        }, this.delegate = e
    }
    start() {
        this.started || (addEventListener("scroll", this.onScroll, !1), this.onScroll(), this.started = !0)
    }
    stop() {
        this.started && (removeEventListener("scroll", this.onScroll, !1), this.started = !1)
    }
    updatePosition(e) {
        this.delegate.scrollPositionChanged(e)
    }
}
class St {
    render({
        fragment: e
    }) {
        fe.preservingPermanentElements(this, yt(e), () => document.documentElement.appendChild(e))
    }
    enteringBardo(e, t) {
        t.replaceWith(e.cloneNode(!0))
    }
    leavingBardo() {}
}

function yt(s) {
    const e = he(document.documentElement),
        t = {};
    for (const i of e) {
        const {
            id: r
        } = i;
        for (const n of s.querySelectorAll("turbo-stream")) {
            const o = ce(n.templateElement.content, r);
            o && (t[r] = [i, o])
        }
    }
    return t
}
class Lt {
    constructor(e) {
        this.sources = new Set, this.started = !1, this.inspectFetchResponse = t => {
            const i = Rt(t);
            i && Tt(i) && (t.preventDefault(), this.receiveMessageResponse(i))
        }, this.receiveMessageEvent = t => {
            this.started && typeof t.data == "string" && this.receiveMessageHTML(t.data)
        }, this.delegate = e
    }
    start() {
        this.started || (this.started = !0, addEventListener("turbo:before-fetch-response", this.inspectFetchResponse, !1))
    }
    stop() {
        this.started && (this.started = !1, removeEventListener("turbo:before-fetch-response", this.inspectFetchResponse, !1))
    }
    connectStreamSource(e) {
        this.streamSourceIsConnected(e) || (this.sources.add(e), e.addEventListener("message", this.receiveMessageEvent, !1))
    }
    disconnectStreamSource(e) {
        this.streamSourceIsConnected(e) && (this.sources.delete(e), e.removeEventListener("message", this.receiveMessageEvent, !1))
    }
    streamSourceIsConnected(e) {
        return this.sources.has(e)
    }
    async receiveMessageResponse(e) {
        const t = await e.responseHTML;
        t && this.receiveMessageHTML(t)
    }
    receiveMessageHTML(e) {
        this.delegate.receivedMessageFromStream(L.wrap(e))
    }
}

function Rt(s) {
    var e;
    const t = (e = s.detail) === null || e === void 0 ? void 0 : e.fetchResponse;
    if (t instanceof K) return t
}

function Tt(s) {
    var e;
    return ((e = s.contentType) !== null && e !== void 0 ? e : "").startsWith(L.contentType)
}
class ee extends Y {
    static renderElement(e, t) {
        const {
            documentElement: i,
            body: r
        } = document;
        i.replaceChild(t, r)
    }
    async render() {
        this.replaceHeadAndBody(), this.activateScriptElements()
    }
    replaceHeadAndBody() {
        const {
            documentElement: e,
            head: t
        } = document;
        e.replaceChild(this.newHead, t), this.renderElement(this.currentElement, this.newElement)
    }
    activateScriptElements() {
        for (const e of this.scriptElements) {
            const t = e.parentNode;
            if (t) {
                const i = F(e);
                t.replaceChild(i, e)
            }
        }
    }
    get newHead() {
        return this.newSnapshot.headSnapshot.element
    }
    get scriptElements() {
        return document.documentElement.querySelectorAll("script")
    }
}
class j extends Y {
    static renderElement(e, t) {
        document.body && t instanceof HTMLBodyElement ? document.body.replaceWith(t) : document.documentElement.appendChild(t)
    }
    get shouldRender() {
        return this.newSnapshot.isVisitable && this.trackedElementsAreIdentical
    }
    get reloadReason() {
        if (!this.newSnapshot.isVisitable) return {
            reason: "turbo_visit_control_is_reload"
        };
        if (!this.trackedElementsAreIdentical) return {
            reason: "tracked_element_mismatch"
        }
    }
    async prepareToRender() {
        await this.mergeHead()
    }
    async render() {
        this.willRender && await this.replaceBody()
    }
    finishRendering() {
        super.finishRendering(), this.isPreview || this.focusFirstAutofocusableElement()
    }
    get currentHeadSnapshot() {
        return this.currentSnapshot.headSnapshot
    }
    get newHeadSnapshot() {
        return this.newSnapshot.headSnapshot
    }
    get newElement() {
        return this.newSnapshot.element
    }
    async mergeHead() {
        const e = this.mergeProvisionalElements(),
            t = this.copyNewHeadStylesheetElements();
        this.copyNewHeadScriptElements(), await e, await t
    }
    async replaceBody() {
        await this.preservingPermanentElements(async () => {
            this.activateNewBody(), await this.assignNewBody()
        })
    }
    get trackedElementsAreIdentical() {
        return this.currentHeadSnapshot.trackedElementSignature == this.newHeadSnapshot.trackedElementSignature
    }
    async copyNewHeadStylesheetElements() {
        const e = [];
        for (const t of this.newHeadStylesheetElements) e.push(Ve(t)), document.head.appendChild(t);
        await Promise.all(e)
    }
    copyNewHeadScriptElements() {
        for (const e of this.newHeadScriptElements) document.head.appendChild(F(e))
    }
    async mergeProvisionalElements() {
        const e = [...this.newHeadProvisionalElements];
        for (const t of this.currentHeadProvisionalElements) this.isCurrentElementInElementList(t, e) || document.head.removeChild(t);
        for (const t of e) document.head.appendChild(t)
    }
    isCurrentElementInElementList(e, t) {
        for (const [i, r] of t.entries()) {
            if (e.tagName == "TITLE") {
                if (r.tagName != "TITLE") continue;
                if (e.innerHTML == r.innerHTML) return t.splice(i, 1), !0
            }
            if (r.isEqualNode(e)) return t.splice(i, 1), !0
        }
        return !1
    }
    removeCurrentHeadProvisionalElements() {
        for (const e of this.currentHeadProvisionalElements) document.head.removeChild(e)
    }
    copyNewHeadProvisionalElements() {
        for (const e of this.newHeadProvisionalElements) document.head.appendChild(e)
    }
    activateNewBody() {
        document.adoptNode(this.newElement), this.activateNewBodyScriptElements()
    }
    activateNewBodyScriptElements() {
        for (const e of this.newBodyScriptElements) {
            const t = F(e);
            e.replaceWith(t)
        }
    }
    async assignNewBody() {
        await this.renderElement(this.currentElement, this.newElement)
    }
    get newHeadStylesheetElements() {
        return this.newHeadSnapshot.getStylesheetElementsNotInSnapshot(this.currentHeadSnapshot)
    }
    get newHeadScriptElements() {
        return this.newHeadSnapshot.getScriptElementsNotInSnapshot(this.currentHeadSnapshot)
    }
    get currentHeadProvisionalElements() {
        return this.currentHeadSnapshot.provisionalElements
    }
    get newHeadProvisionalElements() {
        return this.newHeadSnapshot.provisionalElements
    }
    get newBodyScriptElements() {
        return this.newElement.querySelectorAll("script")
    }
}
class Ct {
    constructor(e) {
        this.keys = [], this.snapshots = {}, this.size = e
    }
    has(e) {
        return I(e) in this.snapshots
    }
    get(e) {
        if (this.has(e)) {
            const t = this.read(e);
            return this.touch(e), t
        }
    }
    put(e, t) {
        return this.write(e, t), this.touch(e), t
    }
    clear() {
        this.snapshots = {}
    }
    read(e) {
        return this.snapshots[I(e)]
    }
    write(e, t) {
        this.snapshots[I(e)] = t
    }
    touch(e) {
        const t = I(e),
            i = this.keys.indexOf(t);
        i > -1 && this.keys.splice(i, 1), this.keys.unshift(t), this.trim()
    }
    trim() {
        for (const e of this.keys.splice(this.size)) delete this.snapshots[e]
    }
}
class At extends de {
    constructor() {
        super(...arguments), this.snapshotCache = new Ct(10), this.lastRenderedLocation = new URL(location.href), this.forceReloaded = !1
    }
    renderPage(e, t = !1, i = !0, r) {
        const n = new j(this.snapshot, e, j.renderElement, t, i);
        return n.shouldRender ? r ? .changeHistory() : this.forceReloaded = !0, this.render(n)
    }
    renderError(e, t) {
        t ? .changeHistory();
        const i = new ee(this.snapshot, e, ee.renderElement, !1);
        return this.render(i)
    }
    clearSnapshotCache() {
        this.snapshotCache.clear()
    }
    async cacheSnapshot(e = this.snapshot) {
        if (e.isCacheable) {
            this.delegate.viewWillCacheSnapshot();
            const {
                lastRenderedLocation: t
            } = this;
            await Be();
            const i = e.clone();
            return this.snapshotCache.put(t, i), i
        }
    }
    getCachedSnapshotForLocation(e) {
        return this.snapshotCache.get(e)
    }
    get snapshot() {
        return p.fromElement(this.element)
    }
}
class Pt {
    constructor(e) {
        this.selector = "a[data-turbo-preload]", this.delegate = e
    }
    get snapshotCache() {
        return this.delegate.navigator.view.snapshotCache
    }
    start() {
        if (document.readyState === "loading") return document.addEventListener("DOMContentLoaded", () => {
            this.preloadOnLoadLinksForView(document.body)
        });
        this.preloadOnLoadLinksForView(document.body)
    }
    preloadOnLoadLinksForView(e) {
        for (const t of e.querySelectorAll(this.selector)) this.preloadURL(t)
    }
    async preloadURL(e) {
        const t = new URL(e.href);
        if (!this.snapshotCache.has(t)) try {
            const r = await (await fetch(t.toString(), {
                    headers: {
                        "VND.PREFETCH": "true",
                        Accept: "text/html"
                    }
                })).text(),
                n = p.fromHTMLString(r);
            this.snapshotCache.put(t, n)
        } catch {}
    }
}
class Ft {
    constructor() {
        this.navigator = new bt(this), this.history = new vt(this), this.preloader = new Pt(this), this.view = new At(this, document.documentElement), this.adapter = new pt(this), this.pageObserver = new wt(this), this.cacheObserver = new ft, this.linkClickObserver = new me(this, window), this.formSubmitObserver = new X(this, document), this.scrollObserver = new Et(this), this.streamObserver = new Lt(this), this.formLinkClickObserver = new pe(this, document.documentElement), this.frameRedirector = new gt(this, document.documentElement), this.streamMessageRenderer = new St, this.drive = !0, this.enabled = !0, this.progressBarDelay = 500, this.started = !1, this.formMode = "on"
    }
    start() {
        this.started || (this.pageObserver.start(), this.cacheObserver.start(), this.formLinkClickObserver.start(), this.linkClickObserver.start(), this.formSubmitObserver.start(), this.scrollObserver.start(), this.streamObserver.start(), this.frameRedirector.start(), this.history.start(), this.preloader.start(), this.started = !0, this.enabled = !0)
    }
    disable() {
        this.enabled = !1
    }
    stop() {
        this.started && (this.pageObserver.stop(), this.cacheObserver.stop(), this.formLinkClickObserver.stop(), this.linkClickObserver.stop(), this.formSubmitObserver.stop(), this.scrollObserver.stop(), this.streamObserver.stop(), this.frameRedirector.stop(), this.history.stop(), this.started = !1)
    }
    registerAdapter(e) {
        this.adapter = e
    }
    visit(e, t = {}) {
        const i = t.frame ? document.getElementById(t.frame) : null;
        i instanceof v ? (i.src = e.toString(), i.loaded) : this.navigator.proposeVisit(c(e), t)
    }
    connectStreamSource(e) {
        this.streamObserver.connectStreamSource(e)
    }
    disconnectStreamSource(e) {
        this.streamObserver.disconnectStreamSource(e)
    }
    renderStreamMessage(e) {
        this.streamMessageRenderer.render(L.wrap(e))
    }
    clearCache() {
        this.view.clearSnapshotCache()
    }
    setProgressBarDelay(e) {
        this.progressBarDelay = e
    }
    setFormMode(e) {
        this.formMode = e
    }
    get location() {
        return this.history.location
    }
    get restorationIdentifier() {
        return this.history.restorationIdentifier
    }
    historyPoppedToLocationWithRestorationIdentifier(e, t) {
        this.enabled ? this.navigator.startVisit(e, t, {
            action: "restore",
            historyChanged: !0
        }) : this.adapter.pageInvalidated({
            reason: "turbo_disabled"
        })
    }
    scrollPositionChanged(e) {
        this.history.updateRestorationData({
            scrollPosition: e
        })
    }
    willSubmitFormLinkToLocation(e, t) {
        return this.elementIsNavigatable(e) && A(t, this.snapshot.rootLocation)
    }
    submittedFormLinkToLocation() {}
    willFollowLinkToLocation(e, t, i) {
        return this.elementIsNavigatable(e) && A(t, this.snapshot.rootLocation) && this.applicationAllowsFollowingLinkToLocation(e, t, i)
    }
    followedLinkToLocation(e, t) {
        const i = this.getActionForLink(e),
            r = e.hasAttribute("data-turbo-stream");
        this.visit(t.href, {
            action: i,
            acceptsStreamResponse: r
        })
    }
    allowsVisitingLocationWithAction(e, t) {
        return this.locationWithActionIsSamePage(e, t) || this.applicationAllowsVisitingLocation(e)
    }
    visitProposedToLocation(e, t) {
        te(e), this.adapter.visitProposedToLocation(e, t)
    }
    visitStarted(e) {
        e.acceptsStreamResponse || _(document.documentElement), te(e.location), e.silent || this.notifyApplicationAfterVisitingLocation(e.location, e.action)
    }
    visitCompleted(e) {
        W(document.documentElement), this.notifyApplicationAfterPageLoad(e.getTimingMetrics())
    }
    locationWithActionIsSamePage(e, t) {
        return this.navigator.locationWithActionIsSamePage(e, t)
    }
    visitScrolledToSamePageLocation(e, t) {
        this.notifyApplicationAfterVisitingSamePageLocation(e, t)
    }
    willSubmitForm(e, t) {
        const i = z(e, t);
        return this.submissionIsNavigatable(e, t) && A(c(i), this.snapshot.rootLocation)
    }
    formSubmitted(e, t) {
        this.navigator.submitForm(e, t)
    }
    pageBecameInteractive() {
        this.view.lastRenderedLocation = this.location, this.notifyApplicationAfterPageLoad()
    }
    pageLoaded() {
        this.history.assumeControlOfScrollRestoration()
    }
    pageWillUnload() {
        this.history.relinquishControlOfScrollRestoration()
    }
    receivedMessageFromStream(e) {
        this.renderStreamMessage(e)
    }
    viewWillCacheSnapshot() {
        var e;
        !((e = this.navigator.currentVisit) === null || e === void 0) && e.silent || this.notifyApplicationBeforeCachingSnapshot()
    }
    allowsImmediateRender({
        element: e
    }, t) {
        const i = this.notifyApplicationBeforeRender(e, t),
            {
                defaultPrevented: r,
                detail: {
                    render: n
                }
            } = i;
        return this.view.renderer && n && (this.view.renderer.renderElement = n), !r
    }
    viewRenderedSnapshot(e, t) {
        this.view.lastRenderedLocation = this.history.location, this.notifyApplicationAfterRender()
    }
    preloadOnLoadLinksForView(e) {
        this.preloader.preloadOnLoadLinksForView(e)
    }
    viewInvalidated(e) {
        this.adapter.pageInvalidated(e)
    }
    frameLoaded(e) {
        this.notifyApplicationAfterFrameLoad(e)
    }
    frameRendered(e, t) {
        this.notifyApplicationAfterFrameRender(e, t)
    }
    applicationAllowsFollowingLinkToLocation(e, t, i) {
        return !this.notifyApplicationAfterClickingLinkToLocation(e, t, i).defaultPrevented
    }
    applicationAllowsVisitingLocation(e) {
        return !this.notifyApplicationBeforeVisitingLocation(e).defaultPrevented
    }
    notifyApplicationAfterClickingLinkToLocation(e, t, i) {
        return l("turbo:click", {
            target: e,
            detail: {
                url: t.href,
                originalEvent: i
            },
            cancelable: !0
        })
    }
    notifyApplicationBeforeVisitingLocation(e) {
        return l("turbo:before-visit", {
            detail: {
                url: e.href
            },
            cancelable: !0
        })
    }
    notifyApplicationAfterVisitingLocation(e, t) {
        return l("turbo:visit", {
            detail: {
                url: e.href,
                action: t
            }
        })
    }
    notifyApplicationBeforeCachingSnapshot() {
        return l("turbo:before-cache")
    }
    notifyApplicationBeforeRender(e, t) {
        return l("turbo:before-render", {
            detail: Object.assign({
                newBody: e
            }, t),
            cancelable: !0
        })
    }
    notifyApplicationAfterRender() {
        return l("turbo:render")
    }
    notifyApplicationAfterPageLoad(e = {}) {
        return l("turbo:load", {
            detail: {
                url: this.location.href,
                timing: e
            }
        })
    }
    notifyApplicationAfterVisitingSamePageLocation(e, t) {
        dispatchEvent(new HashChangeEvent("hashchange", {
            oldURL: e.toString(),
            newURL: t.toString()
        }))
    }
    notifyApplicationAfterFrameLoad(e) {
        return l("turbo:frame-load", {
            target: e
        })
    }
    notifyApplicationAfterFrameRender(e, t) {
        return l("turbo:frame-render", {
            detail: {
                fetchResponse: e
            },
            target: t,
            cancelable: !0
        })
    }
    submissionIsNavigatable(e, t) {
        if (this.formMode == "off") return !1; {
            const i = t ? this.elementIsNavigatable(t) : !0;
            return this.formMode == "optin" ? i && e.closest('[data-turbo="true"]') != null : i && this.elementIsNavigatable(e)
        }
    }
    elementIsNavigatable(e) {
        const t = O(e, "[data-turbo]"),
            i = O(e, "turbo-frame");
        return this.drive || i ? t ? t.getAttribute("data-turbo") != "false" : !0 : t ? t.getAttribute("data-turbo") == "true" : !1
    }
    getActionForLink(e) {
        return N(e) || "advance"
    }
    get snapshot() {
        return this.view.snapshot
    }
}

function te(s) {
    Object.defineProperties(s, kt)
}
const kt = {
    absoluteURL: {
        get() {
            return this.toString()
        }
    }
};
class Mt {
    constructor(e) {
        this.session = e
    }
    clear() {
        this.session.clearCache()
    }
    resetCacheControl() {
        this.setCacheControl("")
    }
    exemptPageFromCache() {
        this.setCacheControl("no-cache")
    }
    exemptPageFromPreview() {
        this.setCacheControl("no-preview")
    }
    setCacheControl(e) {
        _e("turbo-cache-control", e)
    }
}
const ge = {
        after() {
            this.targetElements.forEach(s => {
                var e;
                return (e = s.parentElement) === null || e === void 0 ? void 0 : e.insertBefore(this.templateContent, s.nextSibling)
            })
        },
        append() {
            this.removeDuplicateTargetChildren(), this.targetElements.forEach(s => s.append(this.templateContent))
        },
        before() {
            this.targetElements.forEach(s => {
                var e;
                return (e = s.parentElement) === null || e === void 0 ? void 0 : e.insertBefore(this.templateContent, s)
            })
        },
        prepend() {
            this.removeDuplicateTargetChildren(), this.targetElements.forEach(s => s.prepend(this.templateContent))
        },
        remove() {
            this.targetElements.forEach(s => s.remove())
        },
        replace() {
            this.targetElements.forEach(s => s.replaceWith(this.templateContent))
        },
        update() {
            this.targetElements.forEach(s => {
                s.innerHTML = "", s.append(this.templateContent)
            })
        }
    },
    a = new Ft,
    It = new Mt(a),
    {
        navigator: Ht
    } = a;

function J() {
    a.start()
}

function qt(s) {
    a.registerAdapter(s)
}

function Bt(s, e) {
    a.visit(s, e)
}

function ve(s) {
    a.connectStreamSource(s)
}

function be(s) {
    a.disconnectStreamSource(s)
}

function Ot(s) {
    a.renderStreamMessage(s)
}

function Nt() {
    console.warn("Please replace `Turbo.clearCache()` with `Turbo.cache.clear()`. The top-level function is deprecated and will be removed in a future version of Turbo.`"), a.clearCache()
}

function Dt(s) {
    a.setProgressBarDelay(s)
}

function Vt(s) {
    k.confirmMethod = s
}

function xt(s) {
    a.setFormMode(s)
}
var _t = Object.freeze({
    __proto__: null,
    navigator: Ht,
    session: a,
    cache: It,
    PageRenderer: j,
    PageSnapshot: p,
    FrameRenderer: U,
    start: J,
    registerAdapter: qt,
    visit: Bt,
    connectStreamSource: ve,
    disconnectStreamSource: be,
    renderStreamMessage: Ot,
    clearCache: Nt,
    setProgressBarDelay: Dt,
    setConfirmMethod: Vt,
    setFormMode: xt,
    StreamActions: ge
});
class Wt extends Error {}
class Ut {
    constructor(e) {
        this.fetchResponseLoaded = t => {}, this.currentFetchRequest = null, this.resolveVisitPromise = () => {}, this.connected = !1, this.hasBeenLoaded = !1, this.ignoredAttributes = new Set, this.action = null, this.visitCachedSnapshot = ({
            element: t
        }) => {
            const i = t.querySelector("#" + this.element.id);
            i && this.previousFrameElement && i.replaceChildren(...this.previousFrameElement.children), delete this.previousFrameElement
        }, this.element = e, this.view = new Ge(this, this.element), this.appearanceObserver = new Ue(this, this.element), this.formLinkClickObserver = new pe(this, this.element), this.linkInterceptor = new ue(this, this.element), this.restorationIdentifier = P(), this.formSubmitObserver = new X(this, this.element)
    }
    connect() {
        this.connected || (this.connected = !0, this.loadingStyle == E.lazy ? this.appearanceObserver.start() : this.loadSourceURL(), this.formLinkClickObserver.start(), this.linkInterceptor.start(), this.formSubmitObserver.start())
    }
    disconnect() {
        this.connected && (this.connected = !1, this.appearanceObserver.stop(), this.formLinkClickObserver.stop(), this.linkInterceptor.stop(), this.formSubmitObserver.stop())
    }
    disabledChanged() {
        this.loadingStyle == E.eager && this.loadSourceURL()
    }
    sourceURLChanged() {
        this.isIgnoringChangesTo("src") || (this.element.isConnected && (this.complete = !1), (this.loadingStyle == E.eager || this.hasBeenLoaded) && this.loadSourceURL())
    }
    sourceURLReloaded() {
        const {
            src: e
        } = this.element;
        return this.ignoringChangesToAttribute("complete", () => {
            this.element.removeAttribute("complete")
        }), this.element.src = null, this.element.src = e, this.element.loaded
    }
    completeChanged() {
        this.isIgnoringChangesTo("complete") || this.loadSourceURL()
    }
    loadingStyleChanged() {
        this.loadingStyle == E.lazy ? this.appearanceObserver.start() : (this.appearanceObserver.stop(), this.loadSourceURL())
    }
    async loadSourceURL() {
        this.enabled && this.isActive && !this.complete && this.sourceURL && (this.element.loaded = this.visit(c(this.sourceURL)), this.appearanceObserver.stop(), await this.element.loaded, this.hasBeenLoaded = !0)
    }
    async loadResponse(e) {
        (e.redirected || e.succeeded && e.isHTML) && (this.sourceURL = e.response.url);
        try {
            const t = await e.responseHTML;
            if (t) {
                const i = ne(t);
                p.fromDocument(i).isVisitable ? await this.loadFrameResponse(e, i) : await this.handleUnvisitableFrameResponse(e)
            }
        } finally {
            this.fetchResponseLoaded = () => {}
        }
    }
    elementAppearedInViewport(e) {
        this.proposeVisitIfNavigatedWithAction(e, e), this.loadSourceURL()
    }
    willSubmitFormLinkToLocation(e) {
        return this.shouldInterceptNavigation(e)
    }
    submittedFormLinkToLocation(e, t, i) {
        const r = this.findFrameElement(e);
        r && i.setAttribute("data-turbo-frame", r.id)
    }
    shouldInterceptLinkClick(e, t, i) {
        return this.shouldInterceptNavigation(e)
    }
    linkClickIntercepted(e, t) {
        this.navigateFrame(e, t)
    }
    willSubmitForm(e, t) {
        return e.closest("turbo-frame") == this.element && this.shouldInterceptNavigation(e, t)
    }
    formSubmitted(e, t) {
        this.formSubmission && this.formSubmission.stop(), this.formSubmission = new k(this, e, t);
        const {
            fetchRequest: i
        } = this.formSubmission;
        this.prepareRequest(i), this.formSubmission.start()
    }
    prepareRequest(e) {
        var t;
        e.headers["Turbo-Frame"] = this.id, !((t = this.currentNavigationElement) === null || t === void 0) && t.hasAttribute("data-turbo-stream") && e.acceptResponseType(L.contentType)
    }
    requestStarted(e) {
        _(this.element)
    }
    requestPreventedHandlingResponse(e, t) {
        this.resolveVisitPromise()
    }
    async requestSucceededWithResponse(e, t) {
        await this.loadResponse(t), this.resolveVisitPromise()
    }
    async requestFailedWithResponse(e, t) {
        await this.loadResponse(t), this.resolveVisitPromise()
    }
    requestErrored(e, t) {
        console.error(t), this.resolveVisitPromise()
    }
    requestFinished(e) {
        W(this.element)
    }
    formSubmissionStarted({
        formElement: e
    }) {
        _(e, this.findFrameElement(e))
    }
    formSubmissionSucceededWithResponse(e, t) {
        const i = this.findFrameElement(e.formElement, e.submitter);
        i.delegate.proposeVisitIfNavigatedWithAction(i, e.formElement, e.submitter), i.delegate.loadResponse(t), e.isSafe || a.clearCache()
    }
    formSubmissionFailedWithResponse(e, t) {
        this.element.delegate.loadResponse(t), a.clearCache()
    }
    formSubmissionErrored(e, t) {
        console.error(t)
    }
    formSubmissionFinished({
        formElement: e
    }) {
        W(e, this.findFrameElement(e))
    }
    allowsImmediateRender({
        element: e
    }, t) {
        const i = l("turbo:before-frame-render", {
                target: this.element,
                detail: Object.assign({
                    newFrame: e
                }, t),
                cancelable: !0
            }),
            {
                defaultPrevented: r,
                detail: {
                    render: n
                }
            } = i;
        return this.view.renderer && n && (this.view.renderer.renderElement = n), !r
    }
    viewRenderedSnapshot(e, t) {}
    preloadOnLoadLinksForView(e) {
        a.preloadOnLoadLinksForView(e)
    }
    viewInvalidated() {}
    willRenderFrame(e, t) {
        this.previousFrameElement = e.cloneNode(!0)
    }
    async loadFrameResponse(e, t) {
        const i = await this.extractForeignFrameElement(t.body);
        if (i) {
            const r = new D(i),
                n = new U(this, this.view.snapshot, r, U.renderElement, !1, !1);
            this.view.renderPromise && await this.view.renderPromise, this.changeHistory(), await this.view.render(n), this.complete = !0, a.frameRendered(e, this.element), a.frameLoaded(this.element), this.fetchResponseLoaded(e)
        } else this.willHandleFrameMissingFromResponse(e) && this.handleFrameMissingFromResponse(e)
    }
    async visit(e) {
        var t;
        const i = new Q(this, d.get, e, new URLSearchParams, this.element);
        return (t = this.currentFetchRequest) === null || t === void 0 || t.cancel(), this.currentFetchRequest = i, new Promise(r => {
            this.resolveVisitPromise = () => {
                this.resolveVisitPromise = () => {}, this.currentFetchRequest = null, r()
            }, i.perform()
        })
    }
    navigateFrame(e, t, i) {
        const r = this.findFrameElement(e, i);
        r.delegate.proposeVisitIfNavigatedWithAction(r, e, i), this.withCurrentNavigationElement(e, () => {
            r.src = t
        })
    }
    proposeVisitIfNavigatedWithAction(e, t, i) {
        if (this.action = N(i, t, e), this.action) {
            const r = p.fromElement(e).clone(),
                {
                    visitCachedSnapshot: n
                } = e.delegate;
            e.delegate.fetchResponseLoaded = o => {
                if (e.src) {
                    const {
                        statusCode: h,
                        redirected: u
                    } = o, R = e.ownerDocument.documentElement.outerHTML, T = {
                        response: {
                            statusCode: h,
                            redirected: u,
                            responseHTML: R
                        },
                        visitCachedSnapshot: n,
                        willRender: !1,
                        updateHistory: !1,
                        restorationIdentifier: this.restorationIdentifier,
                        snapshot: r
                    };
                    this.action && (T.action = this.action), a.visit(e.src, T)
                }
            }
        }
    }
    changeHistory() {
        if (this.action) {
            const e = ae(this.action);
            a.history.update(e, c(this.element.src || ""), this.restorationIdentifier)
        }
    }
    async handleUnvisitableFrameResponse(e) {
        console.warn(`The response (${e.statusCode}) from <turbo-frame id="${this.element.id}"> is performing a full page visit due to turbo-visit-control.`), await this.visitResponse(e.response)
    }
    willHandleFrameMissingFromResponse(e) {
        this.element.setAttribute("complete", "");
        const t = e.response,
            i = async (n, o = {}) => {
                n instanceof Response ? this.visitResponse(n) : a.visit(n, o)
            };
        return !l("turbo:frame-missing", {
            target: this.element,
            detail: {
                response: t,
                visit: i
            },
            cancelable: !0
        }).defaultPrevented
    }
    handleFrameMissingFromResponse(e) {
        this.view.missing(), this.throwFrameMissingError(e)
    }
    throwFrameMissingError(e) {
        const t = `The response (${e.statusCode}) did not contain the expected <turbo-frame id="${this.element.id}"> and will be ignored. To perform a full page visit instead, set turbo-visit-control to reload.`;
        throw new Wt(t)
    }
    async visitResponse(e) {
        const t = new K(e),
            i = await t.responseHTML,
            {
                location: r,
                redirected: n,
                statusCode: o
            } = t;
        return a.visit(r, {
            response: {
                redirected: n,
                statusCode: o,
                responseHTML: i
            }
        })
    }
    findFrameElement(e, t) {
        var i;
        const r = q("data-turbo-frame", t, e) || this.element.getAttribute("target");
        return (i = se(r)) !== null && i !== void 0 ? i : this.element
    }
    async extractForeignFrameElement(e) {
        let t;
        const i = CSS.escape(this.id);
        try {
            if (t = ie(e.querySelector(`turbo-frame#${i}`), this.sourceURL), t) return t;
            if (t = ie(e.querySelector(`turbo-frame[src][recurse~=${i}]`), this.sourceURL), t) return await t.loaded, await this.extractForeignFrameElement(t)
        } catch (r) {
            return console.error(r), new v
        }
        return null
    }
    formActionIsVisitable(e, t) {
        const i = z(e, t);
        return A(c(i), this.rootLocation)
    }
    shouldInterceptNavigation(e, t) {
        const i = q("data-turbo-frame", t, e) || this.element.getAttribute("target");
        if (e instanceof HTMLFormElement && !this.formActionIsVisitable(e, t) || !this.enabled || i == "_top") return !1;
        if (i) {
            const r = se(i);
            if (r) return !r.disabled
        }
        return !(!a.elementIsNavigatable(e) || t && !a.elementIsNavigatable(t))
    }
    get id() {
        return this.element.id
    }
    get enabled() {
        return !this.element.disabled
    }
    get sourceURL() {
        if (this.element.src) return this.element.src
    }
    set sourceURL(e) {
        this.ignoringChangesToAttribute("src", () => {
            this.element.src = e ? ? null
        })
    }
    get loadingStyle() {
        return this.element.loading
    }
    get isLoading() {
        return this.formSubmission !== void 0 || this.resolveVisitPromise() !== void 0
    }
    get complete() {
        return this.element.hasAttribute("complete")
    }
    set complete(e) {
        this.ignoringChangesToAttribute("complete", () => {
            e ? this.element.setAttribute("complete", "") : this.element.removeAttribute("complete")
        })
    }
    get isActive() {
        return this.element.isActive && this.connected
    }
    get rootLocation() {
        var e;
        const t = this.element.ownerDocument.querySelector('meta[name="turbo-root"]'),
            i = (e = t ? .content) !== null && e !== void 0 ? e : "/";
        return c(i)
    }
    isIgnoringChangesTo(e) {
        return this.ignoredAttributes.has(e)
    }
    ignoringChangesToAttribute(e, t) {
        this.ignoredAttributes.add(e), t(), this.ignoredAttributes.delete(e)
    }
    withCurrentNavigationElement(e, t) {
        this.currentNavigationElement = e, t(), delete this.currentNavigationElement
    }
}

function se(s) {
    if (s != null) {
        const e = document.getElementById(s);
        if (e instanceof v) return e
    }
}

function ie(s, e) {
    if (s) {
        const t = s.getAttribute("src");
        if (t != null && e != null && Pe(t, e)) throw new Error(`Matching <turbo-frame id="${s.id}"> element has a source URL which references itself`);
        if (s.ownerDocument !== document && (s = document.importNode(s, !0)), s instanceof v) return s.connectedCallback(), s.disconnectedCallback(), s
    }
}
class G extends HTMLElement {
    static async renderElement(e) {
        await e.performAction()
    }
    async connectedCallback() {
        try {
            await this.render()
        } catch (e) {
            console.error(e)
        } finally {
            this.disconnect()
        }
    }
    async render() {
        var e;
        return (e = this.renderPromise) !== null && e !== void 0 ? e : this.renderPromise = (async () => {
            const t = this.beforeRenderEvent;
            this.dispatchEvent(t) && (await H(), await t.detail.render(this))
        })()
    }
    disconnect() {
        try {
            this.remove()
        } catch {}
    }
    removeDuplicateTargetChildren() {
        this.duplicateChildren.forEach(e => e.remove())
    }
    get duplicateChildren() {
        var e;
        const t = this.targetElements.flatMap(r => [...r.children]).filter(r => !!r.id),
            i = [...((e = this.templateContent) === null || e === void 0 ? void 0 : e.children) || []].filter(r => !!r.id).map(r => r.id);
        return t.filter(r => i.includes(r.id))
    }
    get performAction() {
        if (this.action) {
            const e = ge[this.action];
            if (e) return e;
            this.raise("unknown action")
        }
        this.raise("action attribute is missing")
    }
    get targetElements() {
        if (this.target) return this.targetElementsById;
        if (this.targets) return this.targetElementsByQuery;
        this.raise("target or targets attribute is missing")
    }
    get templateContent() {
        return this.templateElement.content.cloneNode(!0)
    }
    get templateElement() {
        if (this.firstElementChild === null) {
            const e = this.ownerDocument.createElement("template");
            return this.appendChild(e), e
        } else if (this.firstElementChild instanceof HTMLTemplateElement) return this.firstElementChild;
        this.raise("first child element must be a <template> element")
    }
    get action() {
        return this.getAttribute("action")
    }
    get target() {
        return this.getAttribute("target")
    }
    get targets() {
        return this.getAttribute("targets")
    }
    raise(e) {
        throw new Error(`${this.description}: ${e}`)
    }
    get description() {
        var e, t;
        return (t = ((e = this.outerHTML.match(/<[^>]+>/)) !== null && e !== void 0 ? e : [])[0]) !== null && t !== void 0 ? t : "<turbo-stream>"
    }
    get beforeRenderEvent() {
        return new CustomEvent("turbo:before-stream-render", {
            bubbles: !0,
            cancelable: !0,
            detail: {
                newStream: this,
                render: G.renderElement
            }
        })
    }
    get targetElementsById() {
        var e;
        const t = (e = this.ownerDocument) === null || e === void 0 ? void 0 : e.getElementById(this.target);
        return t !== null ? [t] : []
    }
    get targetElementsByQuery() {
        var e;
        const t = (e = this.ownerDocument) === null || e === void 0 ? void 0 : e.querySelectorAll(this.targets);
        return t.length !== 0 ? Array.prototype.slice.call(t) : []
    }
}
class jt extends HTMLElement {
    constructor() {
        super(...arguments), this.streamSource = null
    }
    connectedCallback() {
        this.streamSource = this.src.match(/^ws{1,2}:/) ? new WebSocket(this.src) : new EventSource(this.src), ve(this.streamSource)
    }
    disconnectedCallback() {
        this.streamSource && be(this.streamSource)
    }
    get src() {
        return this.getAttribute("src") || ""
    }
}
v.delegateConstructor = Ut;
customElements.get("turbo-frame") === void 0 && customElements.define("turbo-frame", v);
customElements.get("turbo-stream") === void 0 && customElements.define("turbo-stream", G);
customElements.get("turbo-stream-source") === void 0 && customElements.define("turbo-stream-source", jt);
(() => {
    let s = document.currentScript;
    if (s && !s.hasAttribute("data-turbo-suppress-warning"))
        for (s = s.parentElement; s;) {
            if (s == document.body) return console.warn(oe `
        You are loading Turbo from a <script> element inside the <body> element. This is probably not what you meant to do!

        Load your application’s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.

        For more information, see: https://turbo.hotwired.dev/handbook/building#working-with-script-elements

        ——
        Suppress this warning by adding a "data-turbo-suppress-warning" attribute to: %s
      `, s.outerHTML);
            s = s.parentElement
        }
})();
window.Turbo = _t;
J();
J();
const $t = document.querySelector("header"),
    zt = document.querySelector("#mobile-menu"),
    Kt = document.querySelector("#drawer"),
    Qt = $t ? .offsetHeight;
document.documentElement.style.setProperty("--navigation-scroll-padding", Qt + "px");
zt ? .addEventListener("click", () => {
    Kt ? .classList.add("open")
});
const $ = document.querySelector("#drawer"),
    Xt = document.querySelector("#drawer>div:last-child"),
    Yt = document.querySelector("#drawer button");
Yt ? .addEventListener("click", () => {
    $ ? .classList.remove("open")
});
$ ? .addEventListener("click", s => {
    Xt ? .contains(s.target) || $ ? .classList.remove("open")
});