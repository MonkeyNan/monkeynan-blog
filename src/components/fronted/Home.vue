<template lang="html">
  <div class="home_wrapper" v-loading="loading2" element-loading-text="加载中">
    <article v-for="item in items">
      <header>
        <div>
          <router-link :to="{path:`/article/${item._id}`}" class="home_title">{{ item.title }}
          </router-link>
        </div>
        <div>
          <p class="home_creatAt"></p>
        </div>
      </header>
    </article>
  </div>
</template>
