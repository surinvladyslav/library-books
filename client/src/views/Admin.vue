<template>
  <div class="container">
    <div class="wrapper">
      <DataTable/>
      <CreateBook/>
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable";
import CreateBook from "@/components/CreateBook";

export default {
  name: "Admin",
  components: {CreateBook, DataTable}
}
</script>

<style scoped>
 @media (min-width: 1024px) {
   .wrapper {
     display: flex;
     align-items: flex-start;
     grid-gap: 2rem;
   }
 }
</style>