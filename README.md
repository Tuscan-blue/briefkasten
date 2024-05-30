# 📮 Briefkasten with scrape

## 📕 Intro
More Intro: [briefkasten](https://github.com/ndom91/briefkasten) and [briefkasten-scrape](https://github.com/ndom91/briefkasten-scrape)

## 🎩 Features

- Easy to self-host briefkasten with scrape using Docker 

## 🧺 Prerequisites

To self-host this application, you'll need the following thins:

1. Server / hosting platform for a Next.js application (i.e. Vercel / Netlify)
2. For OAuth login, a developer account at any one of the [providers](https://next-auth.js.org/providers) supported by [NextAuth.js](https://github.com/nextauthjs/next-auth)
3. Database that works with Prisma (i.e. MySQL, Postgres, SQLite, etc.)
4. Image hosting space (Supabase)

These are all relatively straight forward, other than the image hoster. This was chosen to avoid putting the images in the database. The example application at [briefkastenhq.com](https://briefkastenhq.com) is using [Supabase Storage](https://supabase.com), but any other similar provider like Cloudinary or a simple S3 Bucket would also do the job. I chose Supabase, because they have an easy to use SDK, a decent free tier, and I was already using their Postgres service.

After you've got an account setup at all of the above providers, or have your own infrastructure ready to go, you can continue on to the next steps below.


## 🐳 Docker

Thanks to [how to install briefkasten using docker | blog](https://web.archive.org/web/20231004091506/https://mintel.me/how-to-install-briefkasten-using-docker/) .

You can also self-host Briefkasten with Docker. To do so, you must:

1. Install `docker` and `docker-compose`.
2. Clone this repository and copy the `.env.example` to `.env` file in `briefkasten`.
```sh
$ git clone https://github.com/Tuscan-blue/briefkasten.git
$ cd briefkasten
$ cp .env.example .env
$ vim .env
```  

   - Here you also need to fill out the `DATABASE_URL`, `NEXTAUTH_*` and `SUPABASE_*` environment variables at minimum.
   - The `DATABASE_URL` for the postgres container should be `DATABASE_URL=postgres://bkAdmin:briefkasten@postgres:5432/briefkasten?sslmode=disable`
3. Clone the `briefkasten-scrape` repository in a new directory
```sh
$ cd ..
$ git clone https://github.com/Tuscan-blue/briefkasten-scrape.git
$ cd briefkasten-scrape
```
4. Copy `.env.example` to `.env` in `brefkasten-scrape` and edit the file `.env` accordingly
```sh
$ cp .env.example .env
$ vim .env
```
5. Build Docker container
```sh
$ docker build . -t briefkasten-scrape:latest
```
6. start the application
```sh
$ cd ../briefkasten
$ docker compose up
```
7. After the initial start, you still have to manually seed the database. This is most easily done through the app container (`bk-app`).
   1. Run `docker exec -it bk-app /bin/bash` to enter a terminal session inside the container.
   2. Then run `pnpm db:push` inside the container. This will push the database schema from prisma to the configured database.
5. Now your application and database should be up and running at the default `http://localhost:3000`


## 🕸 Related

<img src="public/screenshot_ext.png" align="right" />

### 📲 Save from Android Share Menu

With this open-source application [HTTP Shortcuts](https://http-shortcuts.rmy.ch/), you can create a "Share Menu" item which executes a `POST` request with dynamic input, i.e. a web page's URL and title. This makes it super easy to share items from your phone to Briefkasten! More information in the [docs](https://docs.briefkastenhq.com/docs/getting-started.html#http-shortcuts-android).

### 🌍 Browser Extension

There is a companion browser extension in the works which you can use to add websites to your vault while browsing the web. It can be found at [`ndom91/briefkasten-extension`](https://github.com/ndom91/briefkasten-extension) and in the [Chrome Extension Store](https://chrome.google.com/webstore/detail/briefkasten-bookmarks/aighkhofochfjejmhjfkgjfpkpgmjlnd). More details in that repository.


## 👷 Contributing

This project is open to any and all contributions! Please stick to the ESLint / Prettier settings and I'll be happy to take a look at your issue / PR 😀

## 📝 License

MIT
