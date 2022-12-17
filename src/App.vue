<script setup lang="ts">
import { ref } from "vue";
import MobileCard from "./components/mobile-card.vue";

const mobileCardProgress = ref(0);
</script>

<template>
  <div>
    <span
      class="fixed inset-0 bg-black"
      :style="{ opacity: mobileCardProgress * 0.5 }"
    ></span>
    <MobileCard
      class="m-2 rounded-xl overflow-hidden h-[90vh] flex flex-col"
      @progress="(progress: number) => mobileCardProgress = progress"
    >
      <div class="p-10 bg-black grow text-white">
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

<style scoped></style>
