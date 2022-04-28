<template>
  <router-link
    :class="this.getSearchBooks.includes(book) ? 'link show' : 'link hide'"
    :to="{ path: '/books/'+ this.book._id}"
  >
    <div class="book">
      <img
        class="img"
        v-if="book.image"
        :src="'http://localhost:5000/'+book.image"
        alt="Introduction to Algorithms"
      >
      <img
          class="img"
          v-else
          src="../images/default-book.png"
          alt="Introduction to Algorithms"
      >
      <div class="book__title">
        <p class="text title">{{book.title}}</p>
        <p class="text autor">{{book.author}}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Book",
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  computed: mapGetters(['getBooks', 'getSearchBooks']),
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .book {
    opacity: 1;
    text-align: center;
    cursor: pointer;
    height: 100%;
    display: flex;
    min-height: 10rem;
    flex-direction: column;
    align-items: center;
    margin: 0.3rem;
    min-width: 8rem;
    padding: 15px;
    justify-content: space-between;
    transition: .6s;
    border-radius: 3px;
  }

  .book__title {
    display: flex;
    flex-direction: column;
  }

  .link {
    -webkit-animation: slide 0.5s forwards;
    -webkit-animation-delay: 2s;
    animation: slide 0.6s forwards;
    transition: .6s;
    animation-delay: 2s;
  }

  .link.show {
    opacity: 1;
  }

  .link.hide {
    opacity: 0;
    position: absolute;
    left: -100%;
  }

  .book:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .img {
    width: auto;
    height: 128px;
    max-width: 110px;
    cursor: pointer;
  }

  .text.title {
    margin-top: 5px;
  }

  .text {
    color: #2c3e50;
    font-size: 12px !important;
    line-height: 1.5 !important;
    width: 100%;
    text-align: center;
    font-family: 'PT Sans', Arial, sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-decoration: none !important;
    text-overflow: ellipsis;
    margin: 0;
  }
</style>