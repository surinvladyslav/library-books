<template>
  <Header/>
  <main>
    <router-view/>
  </main>

<!--  <router-view v-slot="{ Component }">-->
<!--    <transition name="route" mode="out-in">-->
<!--      <component :is="Component" />-->
<!--    </transition>-->
<!--  </router-view>-->
<!--  <Footer/>-->
</template>

<script>
  import Header from "@/components/Header";
  import {mapActions, mapGetters, mapMutations} from 'vuex';
  import Loader from "@/components/Loader";
  import Footer from "@/components/Footer";

  export default {
    name: 'app',
    components: {Footer, Header},
    methods: {
      ...mapActions(['getBooks', 'loginMounted']),
      ...mapMutations(['SET_LOADER']),
    },
    computed: mapGetters(['getLoader']),
    async mounted() {
      this.SET_LOADER(true)
      await this.getBooks()

      if(localStorage.getItem('accessToken')) {
        console.log('china');
        await this.loginMounted()
      }
    }
  }
</script>

<style>
  body {
    font-family: 'Roboto', sans-serif;
    padding: 0;
    color: #2c3e50;
    overflow-y: scroll;
    margin: 0;
  }

  main {
    /*min-height: 100%;*/
    /*position: absolute;*/
    /*transition: all 0.75s ease-out;*/
    /*transition: opacity 0.5s ease;*/
  }

  .route-enter-from {
    opacity: 0;
    /*transform: translateX(100px);*/
  }

  .route-enter-active {
    transition: all .3s ease-out;
  }

  .route-leave-to {
    opacity: 0;
    /*transform: translateX(-100px);*/
  }

  .route-leave-active {
    transition: all .3s ease-in;
  }

  .button {
    color: white;
    border: none;
    text-decoration: none;
    background-color: #27ae60;
    transition: .6s;
    padding: .3rem 1rem;
    border-radius: 3px;
    font-size: 15px;
  }

  .button.danger {
    background-color: #ae2727;
  }

  .button.danger:hover {
    color: white;
    background-color: #ce1f1f;
  }

  .button:hover {
    color: white;
    background-color: #119349;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
</style>