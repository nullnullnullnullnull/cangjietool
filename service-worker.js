const a = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), p = [
  a + "/_app/immutable/entry/app.1679aaba.js",
  a + "/_app/immutable/chunks/0.a38fd2ec.js",
  a + "/_app/immutable/chunks/1.1959f64c.js",
  a + "/_app/immutable/chunks/2.d50a7b15.js",
  a + "/_app/immutable/chunks/3.601f165e.js",
  a + "/_app/immutable/chunks/4.3fdef661.js",
  a + "/_app/immutable/assets/Card.c62309c5.css",
  a + "/_app/immutable/chunks/Card.ed7953d5.js",
  a + "/_app/immutable/chunks/Card.svelte_svelte_type_style_lang.8af72263.js",
  a + "/_app/immutable/chunks/_layout.7e4796dc.js",
  a + "/_app/immutable/chunks/index.e2ae98d0.js",
  a + "/_app/immutable/chunks/singletons.0bdb6e64.js",
  a + "/_app/immutable/chunks/stores.530fbbd2.js",
  a + "/_app/immutable/entry/start.1fe9c440.js",
  a + "/_app/immutable/assets/_error.2ec7ca1c.css",
  a + "/_app/immutable/entry/_error.svelte.6277d862.js",
  a + "/_app/immutable/assets/_layout.b63466f3.css",
  a + "/_app/immutable/entry/_layout.js.a21eebba.js",
  a + "/_app/immutable/entry/_layout.svelte.6b5a7a3d.js",
  a + "/_app/immutable/assets/_page.5ad9aa52.css",
  a + "/_app/immutable/entry/_page.svelte.8c8e238a.js",
  a + "/_app/immutable/assets/_page.73cd3909.css",
  a + "/_app/immutable/entry/letters-page.svelte.0faf4e82.js",
  a + "/_app/immutable/assets/_page.7ba4c388.css",
  a + "/_app/immutable/entry/lookup-page.svelte.bdf0458c.js"
], m = [
  a + "/.nojekyll",
  a + "/android-chrome-192x192.png",
  a + "/android-chrome-512x512.png",
  a + "/apple-touch-icon.png",
  a + "/data/all_chars.json",
  a + "/data/mandarin-1000.csv",
  a + "/data/mandarin-10000.csv",
  a + "/data/mandarin-2000.csv",
  a + "/data/mandarin-3000.csv",
  a + "/data/mandarin-4000.csv",
  a + "/data/mandarin-5000.csv",
  a + "/data/mandarin-6000.csv",
  a + "/data/mandarin-7000.csv",
  a + "/data/mandarin-8000.csv",
  a + "/data/mandarin-9000.csv",
  a + "/favicon-16x16.png",
  a + "/favicon-32x32.png",
  a + "/favicon.ico",
  a + "/global.css",
  a + "/oiargrmbc.jpg",
  a + "/site.webmanifest"
], r = "1742082868442", c = `cache-${r}`, u = [...p, ...m];
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(c).then((n) => n.addAll(u)).then(() => {
      self.skipWaiting();
    })
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (n) => {
      for (const t of n)
        t !== c && await caches.delete(t);
      self.clients.claim();
    })
  );
});
self.addEventListener("fetch", (e) => {
  new URL(e.request.url).origin === self.location.origin && e.request.method === "GET" && e.respondWith(
    caches.match(e.request).then((t) => t || fetch(e.request).then((s) => {
      if (!s || s.status !== 200 || s.type !== "basic")
        return s;
      const i = s.clone();
      return caches.open(c).then((l) => {
        l.put(e.request, i);
      }), s;
    }))
  );
});
