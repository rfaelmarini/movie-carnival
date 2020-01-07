<template>
  <div class="container">
    <div>
      <h4 class="font-weight-light text-center text-lg-left mt-4 mb-0">{{title}}</h4>
      <hr class="mt-2 mb-5">
      <div v-if="movies.length" class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        <div v-for="movie in movies" :key="movie.id" class="col mb-4">
          <div class="movie-card" @click="showDetail(movie)" data-toggle="modal" data-target="#movieDetails">
            <Movie :movie="movie"/>
          </div>
        </div>
      </div>
      <p v-else class="text-center text-muted">No results found.</p>
    </div>
    <div class="modal fade" id="movieDetails" tabindex="-1" role="dialog" aria-labelledby="movieDetailsLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="row">
            <div class="col-md-4">
              <img :src="getImgURL(selectedMovie)" class="card-img" alt="movie">
            </div>
            <div class="col-md-8">
              <div style="margin: 10px">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{selectedMovie.title}}</h5>
                <p class="card-text">{{getOverview(selectedMovie)}}</p>
                <p class="card-text"><small class="text-muted">{{selectedMovie.release_date}} ‧ {{getGenres(selectedMovie)}}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Movie from './Movie.vue'

export default {
  name: 'MoviesList',
  props: {
    title: String,
    movies: Array
  },
  components: {
    Movie
  },
  data() {
    return {
      selectedMovie: {}
    }
  },
  methods: {
    showDetail(movie) {
      this.selectedMovie = movie
    },
    getImgURL(movie) {
      let baseImageUrl = 'https://image.tmdb.org/t/p/w500'
      if (movie.hasOwnProperty('poster_path') && movie.poster_path != null) {
        return baseImageUrl + movie.poster_path
      } else if (movie.hasOwnProperty('backdrop_path') && movie.backdrop_path != null) {
        return baseImageUrl + movie.backdrop_path
      } else {
        return "https://via.placeholder.com/500x700"
      }
    },
    getGenres(movie) {
      if (!movie.hasOwnProperty('genres')){
        return
      }

      if (movie.genres.length == 0) {
        movie.genres.push('Unknown')
      }
      return movie.genres.join(" / ")
    },
    getOverview(movie) {
      if (!movie.hasOwnProperty("overview") || !movie.overview.length) {
        return "Plot unknown"
      }

      return movie.overview
    }
  }
}
</script>

<style scoped>
.movie-card {
  cursor: pointer;
  transition: box-shadow .3s;
}
.movie-card:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2);
}
</style>
