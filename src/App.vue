<script setup lang="ts">
import { ref } from "vue";
import MobileCard from "./components/mobile-card.vue";
const mobileCardProgress = ref(0);
</script>

<template>
  <div>
    <span
      v-if="mobileCardProgress > 0"
      class="fixed inset-0 bg-black z-10"
      :style="{ opacity: mobileCardProgress * 0.5 }"
    ></span>
    <div
      class="container p-4 prose space-y-4 origin-top"
      :style="{ transform: `scale(${1 - mobileCardProgress * 0.1})` }"
    >
      <div class="bg-black/5 rounded p-4 min-h-[17vh]"></div>
      <div class="bg-black/5 rounded p-4 min-h-[17vh]"></div>
      <div class="bg-black/5 rounded p-4 min-h-[17vh]"></div>
      <div class="bg-black/5 rounded p-4 min-h-[17vh]"></div>
      <div class="bg-black/5 rounded p-4 min-h-[17vh]"></div>
    </div>
    <MobileCard
      class="m-2 rounded-xl overflow-hidden flex flex-col p-10 pt-0 bg-black text-white"
      root-class="z-20"
      @progress="(progress: number) => mobileCardProgress = progress"
    >
      <p class="p-3">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        quidem, eum adipisci odio est ipsum eaque, dolore doloribus voluptatum
        eligendi labore error veritatis dolor odit ratione soluta reiciendis cum
        ducimus?
      </p>
      <p class="p-3">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        quidem, eum adipisci odio est ipsum eaque, dolore doloribus voluptatum
        eligendi labore error veritatis dolor odit ratione soluta reiciendis cum
        ducimus?
      </p>
      <p class="p-3">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        quidem, eum adipisci odio est ipsum eaque, dolore doloribus voluptatum
        eligendi labore error veritatis dolor odit ratione soluta reiciendis cum
        ducimus?
      </p>
    </MobileCard>

    <!-- <MobileCard
      :drag-entire-card="true"
      class="bg-gradient-to-r from-black to-blue-900 p-10 m-2 rounded pt-0 h-[80vh] text-white flex flex-col"
    >
      <div class="overflow-auto" data-ignore-drag>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus doloremque omnis porro vel? Quibusdam, enim modi
          doloribus possimus, laborum laboriosam similique ab a nemo odit
          aliquam, delectus atque sapiente adipisci?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus doloremque omnis porro vel? Quibusdam, enim modi
          doloribus possimus, laborum laboriosam similique ab a nemo odit
          aliquam, delectus atque sapiente adipisci?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus doloremque omnis porro vel? Quibusdam, enim modi
          doloribus possimus, laborum laboriosam similique ab a nemo odit
          aliquam, delectus atque sapiente adipisci?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus doloremque omnis porro vel? Quibusdam, enim modi
          doloribus possimus, laborum laboriosam similique ab a nemo odit
          aliquam, delectus atque sapiente adipisci?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus doloremque omnis porro vel? Quibusdam, enim modi
          doloribus possimus, laborum laboriosam similique ab a nemo odit
          aliquam, delectus atque sapiente adipisci?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus doloremque omnis porro vel? Quibusdam, enim modi
          doloribus possimus, laborum laboriosam similique ab a nemo odit
          aliquam, delectus atque sapiente adipisci?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus doloremque omnis porro vel? Quibusdam, enim modi
          doloribus possimus, laborum laboriosam similique ab a nemo odit
          aliquam, delectus atque sapiente adipisci?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus doloremque omnis porro vel? Quibusdam, enim modi
          doloribus possimus, laborum laboriosam similique ab a nemo odit
          aliquam, delectus atque sapiente adipisci?
        </p>
      </div>
    </MobileCard> -->

    <!-- <MobileCard
      :drag-entire-card="true"
      class="bg-gradient-to-r from-black to-blue-900 p-10 m-2 rounded pt-0 text-white flex flex-col"
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        doloremque omnis porro vel? Quibusdam, enim modi doloribus possimus,
        laborum laboriosam similique ab a nemo odit aliquam, delectus atque
        sapiente adipisci?
      </p>
    </MobileCard> -->
  </div>
</template>

<style scoped></style>
