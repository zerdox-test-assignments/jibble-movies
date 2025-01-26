# jibble-movies

## Features

- Scaffolded with official create-vue
- Search movies from the API. Control the endpoint in `.env` file
- Ky is used as a lightweight fetch wrapper, alternative to axios
- Storage saved movies using `pinia-plugin-persistedstate`
- Fully typesafe, with strict TS and ESLint rules
- Examples of unit tests as well as e2e tests. Low code coupling makes it easy to unit test
- Example of using UI framework, Vuetify
- Some Scss styles, though, I don't rely on preprocessor features
- Repo is an example of FSD architecture implementation: https://feature-sliced.design
- Commit names are Conventional Commits

See code in action: `npm run dev`
Test it: `npm run test`

## JibbleGroup Frontend Developer Assessment

### Objective

Create a movie listing app using Vue.js. The app must retrieve a list of movies from the mock
API and render them.

### User stories

1. I want to see a list of movies from the provided API (see notes below).
2. Each item shows the movie title, year and IMDB id.
3. I can browse the list using pagination (10 items per page).
4. I can search for movies by title.
5. I can star/unstar a move from the list and keep starred ones in a “Favorites” section.

### Requirements

- The app must be written in Vue 3 using the Composition API.
- All scripts must be written in TypeScript.
- Use any CSS-preprocessor (Sass or LESS).
- Use at least one browser storage to persist the data.
- Essential features of the app must be testable with automated unit and optionally
  end-to-end tests.
- The result must be published in a public Github repository. It would be nice if it can be
  deployed to and served from Heroku/Firebase, etc.

### Mock API

https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}&page=${page}
