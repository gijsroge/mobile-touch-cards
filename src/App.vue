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
    <!-- <MobileCard
      :handle-height="50"
      class="m-2 rounded-xl overflow-hidden flex flex-col"
      @progress="(progress: number) => mobileCardProgress = progress"
    >
      <div class="flex flex-col grow">
        <div
          class="cursor-move drag-handle h-[50px] relative bg-black w-full text-white flex items-center text-center justify-center"
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
    </MobileCard> -->

    <MobileCard
      :drag-entire-card="false"
      class="bg-gradient-to-r from-black to-blue-900 p-10 pt-0 text-white h-screen flex flex-col"
      slide-from="bottom"
    >
      <div class="overflow-auto">
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
    </MobileCard>
  </div>
</template>

<style scoped></style>
