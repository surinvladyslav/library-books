<template>
  <div class="books">
    <div class="container">
      <div class="books__inner">
        <Book v-for="book in getBooks.reverse()" :book="book" :key="book._id"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters} from 'vuex';
  import Book from "@/components/Book";
  export default {
    name: "Books",
    components: {Book},
    computed: mapGetters(['getBooks', 'getSearchBooks']),
  }
</script>

<style scoped>
  .books {
    margin-top: 1rem;
  }

  .books__inner {
    display: flex;
    flex-wrap: wrap;
    /*justify-content: center;*/
    transition: .6s;
  }

</style>