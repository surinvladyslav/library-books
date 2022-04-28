<template>
  <div class="container">
    <div class="wrapper">
<!--      <div class="img">-->
      <img
          class="img"
          v-if="getingBook.image"
          :src="'http://localhost:5000/'+getingBook.image"
          alt="Introduction to Algorithms"
      >
      <img
          class="img"
          v-else
          src="../images/default-book.png"
          alt="Introduction to Algorithms"
      >
<!--      </div>-->
      <div>
        <h4>{{getingBook.title}}</h4>
        <div class="about__book_list">
          <div class="about__book">
            <p class="about__book_title">author:</p>
            <p class="about__book_data">{{getingBook.author}}</p>
          </div>
          <div class="about__book">
            <p class="about__book_title">year:</p>
            <p class="about__book_data">{{getingBook.year}}</p>
          </div>
          <div class="about__book">
            <p class="about__book_title">pages:</p>
            <p class="about__book_data">{{getingBook.pages}}</p>
          </div>
          <div class="about__book">
            <p class="about__book_title">clicks:</p>
            <p class="about__book_data">{{getingBook.year}}</p>
          </div>
        </div>
        <button class="button">
<!--          Want read!-->
          {{getingBook.have ? 'book at school' : 'the book is busy'}}
        </button>

        <h5 class="book__title">About book:</h5>
        <p>{{getingBook.text}}</p>
      </div>
    </div>


  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "AboutBook",
  computed: mapGetters(['getingBook']),
  methods: {
    ...mapActions(['getBook']),
    ...mapMutations(['SET_LOADER']),
  },
  async mounted() {
    this.SET_LOADER(true)
    await this.getBook(this.$route.params.id)
  }
}
</script>

<style scoped>
  .wrapper {
    display: flex;
    margin-top: 2rem;
  }

  .about__book_list {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }

  .about__book {
    display: flex;
    align-items: center;
  }

  .about__book_title {
    text-transform: capitalize;
    margin: 0;
    margin-right: .2rem;
    font-size: 15px;
  }

  .about__book_data {
    margin: 0;
    font-size: 14px;
    font-family: 'PT Sans', Arial, sans-serif;
  }

  .book__title {
    margin-top: 1rem;
    font-size: 17px;
  }

  .img {
    max-width: 60%;
    margin-right: 2rem;
    background-color: aqua;
  }
</style>