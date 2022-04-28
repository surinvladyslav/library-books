import { createStore } from 'vuex'
import axios from "axios";
import instance from "@/api/index";
import router from '@/router'


export default createStore({
    state: {
      admin: null,
      loader: false,
      books: [],
      searchBooks: [],
      book: {},
    },
    mutations: {
      SET_BOOKS: (state, books) => {
          state.books = books;
      },
      SET_SEARCH_BOOKS: (state, searchBooks) => {
        state.searchBooks = searchBooks;
      },
      SET_LOADER: (state, loader) => {
        state.loader = loader;
      },
      SET_BOOK: (state, book) => {
        state.book = book;
      },
      SET_ADMIN: (state, admin) => {
        state.admin = admin;
      },
    },
    getters: {
      getBooks: (state) => state.books,
      getSearchBooks: (state) => state.searchBooks,
      getingBook: (state) => state.book,
      getLoader: (state) => state.loader,
      getAdmin: (state) => state.admin,
    },
    actions: {
      async searchingBooks(ctx, search) {
        try {
            const books = ctx.state.books.filter(book => {
                return book.title && book.title.toLowerCase().includes(search.toLowerCase())
            })
            setTimeout(() => {
                ctx.commit('SET_LOADER', false);
            },500)
            ctx.commit('SET_SEARCH_BOOKS', books);
        } catch(err) {
            console.log(err)
        }
      },
      async getBooks(ctx) {
        try {
          const res = await instance.get(`/books`)
          const data = await res.data
          ctx.commit('SET_BOOKS', data);
          ctx.commit('SET_LOADER', false);
          ctx.commit('SET_SEARCH_BOOKS', data);
        } catch(err) {
          console.log(err)
        }
      },
      async getBook(ctx, id) {
        try {
            const res = await instance.get(`/books/${id}`)
            const data = await res.data
            ctx.commit('SET_LOADER', false);
            ctx.commit('SET_BOOK', data);
        } catch(err) {
            console.log(err)
        }
      },
      async removeBook(ctx, {id}) {
        try {
            const res = await instance.delete(`/books/${id}`);
            const data = await res.data
            ctx.commit('SET_LOADER', false);
            ctx.dispatch('getBooks')
        } catch(err) {
            console.log(err)
        }
      },
      async changeBook(ctx, {id, data}) {
        try {
            const res = await instance.put(`/books/${id}`, data)
            const data = await res.data
            console.log(data);
            ctx.commit('SET_LOADER', false);
            ctx.dispatch('getBooks')
        } catch(err) {
            console.log(err)
        }
      },
      async createBook(ctx, data) {
        try {
            console.log(data);
            const res = await instance.post(`/book`, data)
            const data = await res.data
            console.log(data);
            ctx.commit('SET_LOADER', false);
            ctx.dispatch('getBooks')
        } catch(err) {
            console.log(err)
        }
      },
      async login(ctx, data) {
        try {
            console.log(data);
            const res = await axios.post(`http://localhost:5000/admin/login`, data)
          localStorage.setItem('accessToken', res.data.accessToken)
          ctx.commit('SET_ADMIN', res.data);
          ctx.commit('SET_LOADER', false);
          router.push({path: '/admin', name: 'admin'})
        } catch(err) {
          console.log(err)
        }
      },
      async loginMounted(ctx) {
        try {
            const res = await instance.post(`/admin/loginmounted`)
            // localStorage.setItem('accessToken', res.data.accessToken)
            console.log(res);
            ctx.commit('SET_ADMIN', res.data);
            // ctx.commit('SET_LOADER', false);
            router.push({path: '/admin', name: 'admin'})
        } catch(err) {
            console.log(err)
        }
      },
      async logout(ctx, id) {
        try {
            await instance.get(`/admin/logout/${id}`)
            localStorage.removeItem('accessToken')
            router.push({path: '/', name: 'books'})
            ctx.commit('SET_ADMIN', null);
            ctx.commit('SET_LOADER', false);
        } catch(err) {
            console.log(err)
        }
      },
    }
});