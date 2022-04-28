<template>
  <div class="table__wrapper">
    <p class="table__length"><span>result</span>1-{{ currentBooks.length }} of {{ getBooks.length }}</p>
<!--    {{currentBooks}}-->
    <table>
      <thead>
        <tr>
          <th v-for="th in columns" :key="th">{{ th }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(td, index) in getBooks.reverse()"
          :class="this.getSearchBooks.includes(td) ? 'link show' : 'link hide'"
          :key="td"
        >
          <td>{{ index+1 }}</td>
          <td>
            <img
              class="img"
              v-if="td.image"
              :src="'http://localhost:5000/'+td.image"
            >
            <img
              class="img"
              v-else
              src="../images/default-book.png"
            >
          </td>
          <td @dblclick="change(td._id,{title: 'fklsdjflksd'})">
            {{td.title}}
          </td>
          <td>{{ td.author || '-' }}</td>
          <td>{{ td.year || '-' }}</td>
          <!--        <td >-->
          <!--          <input-->
          <!--            class="table__input"-->
          <!--            type="number"-->
          <!--            :value="td.pages"-->
          <!--            @keyup.enter="change(td._id, {pages: td.pages})"-->
          <!--          />-->
          <!--            {{ td.pages || '-' }}-->
          <!--        </td>-->
          <td
            class="table__delete"
            @click="remove(td._id)">
            delete
          </td>
          <td @dblclick="change(td._id, {have: !td.have || false})">
            {{ td.have ? 'have a book' : 'no book'}}
          </td>
          <td>
            {{ td.year || 0 }}
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="!#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="!#">1</a></li>
        <li class="page-item"><a class="page-link" href="!#">2</a></li>
        <li class="page-item"><a class="page-link" href="!#">3</a></li>
        <li class="page-item"><a class="page-link" href="!#">Next</a></li>
      </ul>
    </nav>
<!--    <ul>-->
<!--      <li v-for="(g,ind) in 2">-->
<!--        <button>{{ ind+1 }}</button>-->
<!--      </li>-->
<!--    </ul>-->
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "DataTable",
  data() {
    return {
      currentBooks: [],
      columns: ['id','image','title','author','year','action','have', 'clicks']
    }
  },
  computed: mapGetters(['getBooks', 'getSearchBooks']),
  methods: {
    ...mapActions(['removeBook', 'changeBook']),
    ...mapMutations(['SET_LOADER']),
    async remove(id) {
      this.SET_LOADER(true)
      await this.removeBook({id})
    },
    async change(id, data) {
      await this.changeBook({id, data})
    },
  },
  mounted() {
    // console.log(this.getBooks);
    // for (let i = 0; i < 10; i++) {
    //   this.currentBooks.push(this.getBooks[i])
    // }
    // console.log(this.currentBooks);
  }
}
</script>

<style scoped>
  .table__wrapper {
    display: flex;
    flex-direction: column;
  }

  table {
    width: 100%;
    margin-bottom: 1rem;
  }

  th {
    text-transform: uppercase;
  }

  .link {
    -webkit-animation: slide 0.8s forwards;
    -webkit-animation-delay: 2s;
    animation: slide 0.8s forwards;
    transition: .8s;
    animation-delay: 2s;
  }

  .link.show {
    opacity: 1;
  }

  .link.hide {
    opacity: 0;
    position: absolute;
    left: -999px;
  }


  td,th {
    font-size: 13px;
    line-height: 13px;
    text-align: center;
    user-select: none;
    cursor: pointer;
    padding: 8px;
    border: 2px solid #27ae60;
  }

  td img {
    width: 50px;
  }

  .table__input {
    width: 100%;
    height: 100%;
    padding: 6px;
    border: none;
    outline: none;
    text-align: center;
  }

  .table__delete {
    cursor: pointer;
    background: none;
    padding: 0;
    text-decoration: underline;
    color: #ae2727;
  }

  .table__delete:hover {
    text-decoration: none;
  }

  .table__length {
    margin-bottom: 5px;
    width: max-content;
    font-size: 16px;
    margin-top: 1rem;
  }

  .table__length span {
    color: #c1c7c6;
    margin-right: .2rem;
    text-transform: uppercase;
    font-size: 16px;
  }

  ul {
    display: flex;
    list-style-type: none;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 0;
  }
</style>