<template>
  <div class="card h-100">
    <img class="card-img-top" :src="getImgURL(movie)" alt="Movie"/>
    <div class="card-body">
      <h5 class="card-title">{{movie.title}}</h5>
      <h6 class="mb-2 text-muted">{{movie.release_date}} ‧ {{getGenres(movie)}}</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Movie',
  props: {
    movie: Object
  },
  methods: {
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
      if (movie.genres.length == 0) {
        movie.genres.push('Unknown')
      }
      return movie.genres.join(" / ")
    }
  }
}
</script>

<style scoped>

</style>
