<template>
  <form class="create__book" @submit.prevent="" enctype="multipart/form-data">
    <h4 class="create__title">Create Book</h4>
    <div class="inputs__wrapper">
      <div class="input__wrapper">
       <input
           class="form-control"
           type="text"
           v-model.trim="book.title"
           placeholder="Book title"
       >
      </div>
      <div class="input__wrapper">
       <input type="number" v-model.trim="book.year" class="form-control" placeholder="Book year">
      </div>
    </div>
       <div class="inputs__wrapper">
         <div class="input__wrapper">
           <input type="text" v-model.trim="book.author" class="form-control" placeholder="Book author">
         </div>
         <div class="input__wrapper">
           <input type="number" v-model.trim="book.pages" class="form-control" placeholder="Book pages">
         </div>
       </div>
       <div class="input__wrapper">
         <div v-if="!showImage">
           <input type="file" class="form-control" ref="file" @change="onFileChange">
         </div>
         <div class="img__wrapper" v-else>
           <img class="img" :src="showImage" />
           <button class="button danger" @click="removeImage">remove</button>
         </div>
       </div>
       <div class="input__wrapper">
         <textarea class="form-control" v-model="book.text" placeholder="Book description" rows="3"></textarea>
       </div>
       <div class="input__wrapper">
         <input class="checkbox" v-model="book.have" type="checkbox" id="have" checked>
         <label class="form-label" for="have">Have a book</label>
       </div>
    <button class="button" type="submit" @click="create(this.book)">Create</button>
  </form>
</template>

<script>
import axios from "axios";
import {mapActions, mapMutations} from "vuex";
import instance from "@/api";

export default {
  name: "CreateBook",
  data() {
    return {
      book: {
        title: '',
        pages: '',
        text: '',
        year: '',
        author: '',
        file: null,
        have: true
      },
      showImage: null,
    }
  },
  methods: {
    ...mapMutations(['SET_LOADER']),
    ...mapActions(['createBook']),
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.book.file = files[0];
      this.createImage(files[0], this.book);
    },
    async createImage(file, book) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.showImage = e.target.result;
      };
      reader.readAsDataURL(file);

      let formData = new FormData();
      formData.append('file', file);
      formData.append('title', this.book.title);
      formData.append('year', this.book.year);
      formData.append('author', this.book.author);
      formData.append('pages', this.book.pages);
      formData.append('text', this.book.text);

      try {
        await instance.post('/book', formData).then((res) => {
          console.log(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    },
    removeImage: function (e) {
      this.showImage = null;
      this.book.file = null;
    },
    async create(book) {
      // if(this.$v.$invalid) {
      //   this.$v.touch()
      //   return
      // }
      console.log(book);
      this.SET_LOADER(true)
      await this.createBook(book)
    },
  }
}
</script>

<style scoped>
.create__book {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  margin-top: 2.6rem;
  width: 60%;
  border-radius: 3px;
  border: 2px solid #27ae60;
  padding: 1rem;
}

@media (max-width: 1024px) {
  .create__book {
    width: 100%;
  }
}

.create__title {
  margin-bottom: .1rem;
}

.inputs__wrapper {
  width: 100%;
  display: flex;
}

.input__wrapper {
  display: flex;
  align-items: center;
  margin: .2rem 0;
  width: 100%;
  margin: .1rem;
}

input,textarea {
  font-size: 13px;
}

.form-label {
  font-size: 13px;
  margin: 0;
  user-select: none;
  margin-left: .2rem;
}

.img__wrapper {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.img {
  max-width: 7rem;
  height: auto;
}

.checkbox {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

.button {
  margin-top: .2rem;
}
</style>