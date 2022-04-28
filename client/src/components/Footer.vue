<template>
  <footer>
    <div class="container">
      <div class="footer__inner">
        <p>©{{ new Date().getFullYear() }} <span class="sh">Library</span><span>++</span>, Inc.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
  footer {
    background-color: #ffffff;
    border-top: 1px solid #27ae60;
    margin-top: 1rem;
    height: 55px;
    position: relative;
    width: 100%;
  }

  p {
    margin: 0;
    font-size: 12px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 0;
    font-family: arial, sans-serif;
    text-decoration: none;
    font-weight: bold;
  }

  p .sh {
    color: black;
  }

  p span {
    color: #27ae60;
  }
</style>