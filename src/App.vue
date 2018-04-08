<template>
  <div id="app">
    <div class="container bg-white my-3 p-3 rounded box-shadow">
      <PageHeader />
      <notifications />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue'

export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style>

</style>
