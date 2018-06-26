## Feathers & Nuxt demo repo
This is to demo a potential memory leak whilst using `feathers-vuex` and `Nuxt`. The problem has still not been resolved.

## Issue
Whilst running the `Nuxt` app in `Universal` mode, for each request the memory footprint increases, this never gets GC'd.

## Getting Started
- `cd server && npm i && npm run start`
- `cd client && npm i && npm run dev`

Open a terminal / browser and hit `http://localhost:3000` 100+ times, (I used `autocanon` to hit the front-end).

The client will start printing `heapdumps` every 5mins, if you keep hitting the `client` you will see the `heapdump` files getting larger. If you stop hitting the client you will see the `heapdumps` stay a similar size but not actually get any smaller.

## TODO
- [ ] Remove AsyncData
- [ ] Remove NuxtServerInit
- [ ] Try REST client for SSR rather than SocketIO