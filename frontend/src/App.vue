<template>
  <div id="app" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy">
    <nav class="navbar sticky-top navbar-dark bg-primary">
      <a class="navbar-brand">Movies Carnival</a>
      <form class="form-inline">
        <input v-model="searchText" @input="searchMovie" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      </form>
    </nav>
    <MoviesList :movies="movies" :title="title"/>
    <div v-if="isLoading" class="text-center" style="margin-top: 50px">
      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import MoviesList from './components/MoviesList.vue'

export default {
  name: 'app',
  components: {
    MoviesList
  },
  data () {
    return {
      isLoading: true,
      isFirstLoad: true,
      movies: [],
      title: "Upcoming movies",
      searchText: "",
      timerId: null,
      page: 1,
      lastPage: 1
    }
  },
  mounted() {
    this.getUpcomingMovies()
  },
  computed: {
    busy() {
      return this.isFirstLoad || this.page > this.lastPage || this.isLoading
    }
  },
  methods: {
    loadMore() {
      this.page ++
      if (this.searchText.length > 0) {
        this.findMoviesByName(this.searchText)
      } else {
        this.getUpcomingMovies()
      }
    },
    getUpcomingMovies() {
      this.isLoading = true
      this.title = "Upcoming movies";
      this.$http.get("http://localhost:8000/movie/upcoming?page=" + this.page)
        .then(resp => {
          if (this.page > 1) {
            this.movies = this.movies.concat(resp.data.results)
          } else {
            this.movies = resp.data.results
          }
          this.lastPage = resp.data.total_pages
          this.isLoading = false
          this.isFirstLoad = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    findMoviesByName(name) {
      this.isLoading = true
      this.title = "Searched by '" + name + "'";
      this.$http.get("http://localhost:8000/movie/search?name=" + name +"&page=" + this.page)
        .then(resp => {
          if (this.page > 1) {
            this.movies = this.movies.concat(resp.data.results)
          } else {
            this.movies = resp.data.results
          }
          this.lastPage = resp.data.total_pages
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    searchMovie() {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.timerId = setTimeout(() => {
        this.page = 1
        this.movies = [];
        if (this.searchText.length > 0) {
          this.findMoviesByName(this.searchText)
        } else {
          this.getUpcomingMovies()
        }

        this.timerId = null;
      }, 500);
    }
  }
}
</script>

<style>

</style>
