<template>
  <form @submit.prevent class="create__book">
    <h4 class="create__title">Login</h4>
    <div class="input__wrapper">
      <input
          class="form-control"
          type="text"
          v-model.trim="admin.username"
          placeholder="username..."
      >
    </div>
    <div class="input__wrapper">
      <input
          type="password"
          v-model.trim="admin.password"
          class="form-control"
          placeholder="password...">
    </div>
    <button class="button" type="submit" @click="adminLogin">Login</button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "Login",
  data() {
    return {
      admin: {
        username: '',
        password: ''
      }
    }
  },
  computed: mapGetters(['getAdmin']),
  methods: {
    ...mapActions(['login']),
    async adminLogin() {
      // if(this.admin.username && this.admin.password) {
        await this.login(this.admin)
      // }
    }
  }
}
</script>

<style scoped>
  .create__book {
    width: 22rem;
    border-radius: 3px;
    border: 2px solid #27ae60;
    padding: 2rem;
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: auto;
  }
  
  @media (max-width: 600px) {
    .create__book {
      min-width: 80%;
    }
  }

  .create__title {
    margin-bottom: .5rem !important;
  }

  form {
    border: 1px solid;
    padding: 30px;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  input {
    width: 100%;
    /*font-size: .8rem;*/
  }

  .create__title {
    margin-bottom: .1rem;
  }

  .input__wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    margin: .2rem 0;
  }

  input,textarea {
    font-size: 13px;
  }

  .button {
    margin-top: .5rem;
  }
</style>