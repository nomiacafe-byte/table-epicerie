const CACHE='table-v2-shell-1';
const LOCAL=['./','./index.html','./styles.css','./data.js','./app.js','./favicon.svg','./manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(LOCAL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!new URL(e.request.url).origin.includes(self.location.origin)||new URL(e.request.url).pathname.includes('/api'))return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)))})