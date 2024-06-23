<template>
  <div id="'app">
  <nav>
    <router-link to="/">Популярные фильмы</router-link> |
    <router-link to="/search">Поиск фильмов</router-link> |
    <router-link to="/watched">Просмотренные</router-link>
  </nav>
  <router-view/>
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  name: 'App'
});
</script>

<style>
nav {
  display: flex;
  gap: 10px;
}
</style>
