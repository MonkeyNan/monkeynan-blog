<template lang="html">
  <div class="about" v-loading="loading2" element-loading-text="加载中">
    <div v-if="shows">
      <h2>Monkeynan</h2>
      <p>前端小白一步一步的往上爬</p>
      <p><a href="https://github.com/MonkeyNan"></a>
      </p>
      <p>关于网站</p>
      <p>本站服务端采用 express + mongoDB</p>
      <p>客户端采用vue</p>
      <p>主要技术栈：express, mongoolass, vue2, vue2-router, vuex, axios, es6, element ui</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shows: false,
      loading2: true
    }
  },
  mounted() {
    this.$store.dispatch('changeHeadLine', '关于')
    setTimeout(() => {
      this.$store.dispatch('showProgress', 100);
      this.shows = true;
      this.loading2 = false;
    }, 300)
  }
}
</script>

<style lang="css" scoped>
  .about {
    margin: auto;
  }
  .about a {
    color: #4078c0;
    display: inline-block;
    padding: 0.2rem 0.4rem;
    font-size: 1.6rem;
  }
  .about a:first-child {
    padding-left: 0;
  }
  .about p {
    font-size: 1.6rem;
    line-height: 1.6rem;
  }
  .about a, .about p, .about h2 {
    margin: 1rem auto;
  }
  .about h2 {
    font-weight: 400;
    font-size: 3rem;
    align-self: center;
    margin-top: 2rem;
  }
  @media screen and (max-width: 480px) {
    .about a, .about p {
      font-size: 1.4rem;
    }
    .about h2 {
      margin-top: auto;
      font-size: 2.2rem;
    }
  }
</style>
