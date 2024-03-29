<template>
  <header>
    <div class="container">
      <div class="header__inner">
        <router-link class="logo" to="/">Library<span class="logo plus">++</span></router-link>
        <form class="navbar-form navbar-right" @submit.prevent>
          <input
              class="form-control"
              v-model.trim="search"
              @input="findBook"
              type="text"
              placeholder="Find a book..."
          >
          <svg @click="clearInput" :class="!getLoader && search !== '' ? 'clear__input loader' : 'clear__input loader hide'" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 16C6.91667 16 5.88021 15.7891 4.89062 15.3672C3.90104 14.9453 3.04948 14.3776 2.33594 13.6641C1.6224 12.9505 1.05469 12.099 0.632812 11.1094C0.210938 10.1198 0 9.08333 0 8C0 6.91667 0.210938 5.88021 0.632812 4.89062C1.05469 3.90104 1.6224 3.04948 2.33594 2.33594C3.04948 1.6224 3.90104 1.05469 4.89062 0.632812C5.88021 0.210938 6.91667 0 8 0C9.08333 0 10.1198 0.210938 11.1094 0.632812C12.099 1.05469 12.9505 1.6224 13.6641 2.33594C14.3776 3.04948 14.9453 3.90104 15.3672 4.89062C15.7891 5.88021 16 6.91667 16 8C16 9.08333 15.7891 10.1198 15.3672 11.1094C14.9453 12.099 14.3776 12.9505 13.6641 13.6641C12.9505 14.3776 12.099 14.9453 11.1094 15.3672C10.1198 15.7891 9.08333 16 8 16ZM11.6875 5.76562C11.8958 5.56771 12 5.32292 12 5.03125C12 4.73958 11.8984 4.49219 11.6953 4.28906C11.4922 4.08594 11.2448 3.98438 10.9531 3.98438C10.6615 3.98438 10.4167 4.08854 10.2188 4.29688L7.98438 6.51562L5.76562 4.29688C5.56771 4.08854 5.32292 3.98438 5.03125 3.98438C4.73958 3.98438 4.49219 4.08594 4.28906 4.28906C4.08594 4.49219 3.98438 4.73958 3.98438 5.03125C3.98438 5.32292 4.08854 5.56771 4.29688 5.76562L6.51562 8L4.29688 10.2188C4.08854 10.4167 3.98438 10.6615 3.98438 10.9531C3.98438 11.2448 4.08594 11.4922 4.28906 11.6953C4.49219 11.8984 4.73958 12 5.03125 12C5.32292 12 5.56771 11.8958 5.76562 11.6875L7.98438 9.46875L10.2188 11.6875C10.4167 11.8958 10.6615 12 10.9531 12C11.2448 12 11.4922 11.8984 11.6953 11.6953C11.8984 11.4922 12 11.2448 12 10.9531C12 10.6615 11.8958 10.4167 11.6875 10.2188L9.46875 8L11.6875 5.76562Z" fill="#E7E8E9"/>
          </svg>
          <Loader :class="getLoader ? 'loader' : 'loader hide'"/>
        </form>
        {{getAdmin ? getAdmin.admin.username : ''}}

        <button
            class="button danger"
            @click="logoutAdmin"
            v-if="getAdmin"
        >Logout</button>
        <router-link class="button" v-else to="/login">Login</router-link>
      </div>
    </div>
  </header>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";
import Loader from "@/components/Loader";

export default {
  name: "Header",
  components: {Loader},
  data() {
    return {
      search: '',
    }
  },
  computed: mapGetters(['getAdmin', 'getSearchBooks', 'getLoader']),
  methods: {
    ...mapActions(['searchingBooks', 'logout']),
    ...mapMutations(['SET_LOADER']),
    findBook() {
      this.SET_LOADER(true)
      this.searchingBooks(this.search)
    },
    clearInput() {
      this.search = ''
      this.searchingBooks(this.search)
    },
    logoutAdmin() {
      this.logout(this.getAdmin.admin._id)
    }
  }
}
</script>

<style scoped>
  .loader {
    top: 19%;
    width: 24px;
    transition: transform .25s cubic-bezier(0.34, 1.56, 0.64, 1),opacity .2s ease;
    height: 24px;
    opacity: 1;
    border: 2px solid currentColor;
    --slide-transition: 450ms cubic-bezier(0.25, 1, 0.5, 1);
    right: 10px;
    left: unset;
    border-right-color: transparent;
  }

  .loader.hide {
    opacity: 0;
  }

  .clear__input {
    top: 50%;
    transform: translateY(-50%);
    transition: transform .25s cubic-bezier(0.34, 1.56, 0.64, 1),opacity .2s ease;
    opacity: 1;
    width: 15px;
    right: 15px;
    z-index: 100500;
    border: none;
    cursor: pointer !important;
    position: absolute;
    border-right-color: transparent;
  }

  .clear__input path {
    transition: .5s !important;
  }

  .clear__input:hover path {
    fill: #d0d0d0;
  }

  header {
    border-bottom: 2px solid #27ae60;
    padding: .5rem 0;
  }

  .header__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-family: arial, sans-serif;
    font-size: 25px;
    text-decoration: none;
    font-weight: bold;
    user-select: none;
    color: black;
  }

  .logo.plus {
    color: #27ae60;
  }

  .navbar-form {
    width: 100%;
    position: relative;
    margin: 0 1rem;
  }

  .form-control {
    width: 100%;
    height: 40px;
    border-radius: 2rem;
    padding: 6px 12px;
    background-color: #fff;
    color: black !important;
    background-image: none;
    border: 2px solid #27ae60;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  }

  .form-control, output {
    display: block;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
  }

</style>