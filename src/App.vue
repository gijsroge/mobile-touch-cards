<script setup lang="ts">
import MobileCard from "./components/mobile-card.vue";
</script>

<template>
  <div>
    <MobileCard :is-open="true">
      <div class="p-10 bg-white">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          quidem, eum adipisci odio est ipsum eaque, dolore doloribus voluptatum
          eligendi labore error veritatis dolor odit ratione soluta reiciendis
          cum ducimus?
        </p>
      </div>
    </MobileCard>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
