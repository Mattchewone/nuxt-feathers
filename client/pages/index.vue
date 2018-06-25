<template>
  <section class="container">
    <div>
      <h1 class="title">
        Movies
      </h1>

      <ul>
        <li v-for="movie in movies" :key="movie._id">
          {{ movie.title }} ({{ movie.year }})
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

const pageSize = 25

export default {
  name: 'movies-page',
  data () {
    return {
      currentPage: 1,
      rowsPerPage: pageSize
    }
  },
  computed: {
    ...mapGetters('movies', {
      findMoviesInStore: 'find'
    }),
    ...mapState('movies', {
      loading: 'isFindPending',
      moviePagination: 'pagination'
    }),

    movies () {
      const { moviePagination: { default: moviePaginationDefault } } = this

      return this.findMoviesInStore({ query: { _id: { $in: moviePaginationDefault.ids } } }).data
    }
  },
  watch: {
    currentPage: {
      handler (val) {
        this.searchMovies()
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('movies', {
      findMovies: 'find'
    }),

    searchMovies () {
      let { currentPage, rowsPerPage } = this
      let skip = (currentPage - 1) * rowsPerPage

      const query = {
        $skip: skip,
        $limit: rowsPerPage,
        $sort: { year: 1 }
      }

      this.findMovies({ query })
    }
  },
  // Preload activeTags on the data object (not in the vuex store) as we are not returning ojects with _id
  asyncData ({ store, query, redirect }) {
    let skip = 0

    // Pagination
    if (query.page) {
      skip = (query.page - 1) * pageSize
    }

    const finalQuery = Object.assign({ $sort: { year: 1 } }, { $skip: skip, $limit: pageSize })

    return Promise.all([
      store.dispatch('movies/find', { query: finalQuery })
        .catch(_ => {})
    ])
      .catch(error => {
        redirect('/login')
      })
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
