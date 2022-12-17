<script setup lang="ts">
import { ref } from "vue";
import handleAsset from "./assets/handle";
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
      :handle-height="40"
      class="m-2 rounded-xl overflow-hidden flex flex-col"
      @progress="(progress: number) => mobileCardProgress = progress"
    >
      <div class="flex flex-col grow">
        <div
          class="cursor-move drag-handle h-[40px] relative bg-black w-full text-white flex items-center text-center justify-center"
          v-html="handleAsset"
        ></div>

        <div class="p-10 bg-black grow text-white">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            quidem, eum adipisci odio est ipsum eaque, dolore doloribus
            voluptatum eligendi labore error veritatis dolor odit ratione soluta
            reiciendis cum ducimus?
          </p>
        </div>
      </div>
    </MobileCard>
  </div>
</template>

<style scoped></style>
