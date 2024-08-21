class LiteYTEmbed extends HTMLElement {
	connectedCallback() {
		this.videoId = this.getAttribute("videoid")
		let e = this.querySelector(".lty-playbtn")
		if (
			((this.playLabel =
				(e && e.textContent.trim()) ||
				this.getAttribute("playlabel") ||
				"Play"),
			(this.dataset.title = this.getAttribute("title") || ""),
			this.style.backgroundImage ||
				((this.style.backgroundImage = `url("https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg")`),
				this.upgradePosterImage()),
			e ||
				(((e = document.createElement("button")).type = "button"),
				e.classList.add("lty-playbtn"),
				this.append(e)),
			!e.textContent)
		) {
			let t = document.createElement("span")
			;(t.className = "lyt-visually-hidden"),
				(t.textContent = this.playLabel),
				e.append(t)
		}
		this.addNoscriptIframe(),
			"A" === e.nodeName &&
				(e.removeAttribute("href"),
				e.setAttribute("tabindex", "0"),
				e.setAttribute("role", "button"),
				e.addEventListener("keydown", (e) => {
					;("Enter" === e.key || " " === e.key) &&
						(e.preventDefault(), this.activate())
				})),
			this.addEventListener("pointerover", LiteYTEmbed.warmConnections, {
				once: !0,
			}),
			this.addEventListener("focusin", LiteYTEmbed.warmConnections, {
				once: !0,
			}),
			this.addEventListener("click", this.activate),
			(this.needsYTApi =
				this.hasAttribute("js-api") ||
				navigator.vendor.includes("Apple") ||
				navigator.userAgent.includes("Mobi"))
	}
	static addPrefetch(e, t, i) {
		let a = document.createElement("link")
		;(a.rel = e), (a.href = t), i && (a.as = i), document.head.append(a)
	}
	static warmConnections() {
		LiteYTEmbed.preconnected ||
			(LiteYTEmbed.addPrefetch(
				"preconnect",
				"https://www.youtube-nocookie.com"
			),
			LiteYTEmbed.addPrefetch("preconnect", "https://www.google.com"),
			LiteYTEmbed.addPrefetch(
				"preconnect",
				"https://googleads.g.doubleclick.net"
			),
			LiteYTEmbed.addPrefetch(
				"preconnect",
				"https://static.doubleclick.net"
			),
			(LiteYTEmbed.preconnected = !0))
	}
	fetchYTPlayerApi() {
		window.YT ||
			(window.YT && window.YT.Player) ||
			(this.ytApiPromise = new Promise((e, t) => {
				var i = document.createElement("script")
				;(i.src = "https://www.youtube.com/iframe_api"),
					(i.async = !0),
					(i.onload = (t) => {
						YT.ready(e)
					}),
					(i.onerror = t),
					this.append(i)
			}))
	}
	async getYTPlayer() {
		return this.playerPromise || (await this.activate()), this.playerPromise
	}
	async addYTPlayerIframe() {
		this.fetchYTPlayerApi(), await this.ytApiPromise
		let e = document.createElement("div")
		this.append(e)
		let t = Object.fromEntries(this.getParams().entries())
		this.playerPromise = new Promise((i) => {
			let a = new YT.Player(e, {
				width: "100%",
				videoId: this.videoId,
				playerVars: t,
				events: {
					onReady(e) {
						e.target.playVideo(), i(a)
					},
				},
			})
		})
	}
	addNoscriptIframe() {
		let e = this.createBasicIframe(),
			t = document.createElement("noscript")
		;(t.innerHTML = e.outerHTML), this.append(t)
	}
	getParams() {
		let e = new URLSearchParams(this.getAttribute("params") || [])
		return e.append("autoplay", "1"), e.append("playsinline", "1"), e
	}
	async activate() {
		if (this.classList.contains("lyt-activated")) return
		if ((this.classList.add("lyt-activated"), this.needsYTApi))
			return this.addYTPlayerIframe(this.getParams())
		let e = this.createBasicIframe()
		this.append(e), e.focus()
	}
	createBasicIframe() {
		let e = document.createElement("iframe")
		return (
			(e.width = 560),
			(e.height = 315),
			(e.title = this.playLabel),
			(e.allow =
				"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"),
			(e.allowFullscreen = !0),
			(e.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
				this.videoId
			)}?${this.getParams().toString()}`),
			e
		)
	}
	upgradePosterImage() {
		setTimeout(() => {
			let e = `https://i.ytimg.com/vi_webp/${this.videoId}/sddefault.webp`,
				t = new Image()
			;(t.fetchPriority = "low"),
				(t.referrerpolicy = "origin"),
				(t.src = e),
				(t.onload = (t) => {
					let i =
						90 == t.target.naturalHeight && 120 == t.target.naturalWidth
					i || (this.style.backgroundImage = `url("${e}")`)
				})
		}, 100)
	}
}
customElements.define("lite-youtube", LiteYTEmbed)
