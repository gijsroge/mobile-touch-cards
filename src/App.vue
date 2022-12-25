<script setup lang="ts">
import { ref } from "vue";
import MobileSheet from "./components/mobile-sheet.vue";

const MobileSheetProgress = ref(0);
</script>

<template>
  <div>
    <span
      v-if="MobileSheetProgress > 0"
      class="fixed inset-0 bg-black z-10"
      :style="{ opacity: MobileSheetProgress * 0.5 }"
    ></span>
    <div
      class="mx-auto p-4 prose space-y-4 origin-top"
      :style="{ transform: `scale(${1 - MobileSheetProgress * 0.1})` }"
    >
      <div class="bg-black/5 rounded p-4 min-h-[17vh]"></div>
      <div class="bg-black/5 rounded p-4 min-h-[17vh]"></div>
      <div class="bg-black/5 rounded p-4 min-h-[17vh]"></div>
      <div class="bg-black/5 rounded p-4 min-h-[17vh]"></div>
      <div class="bg-black/5 rounded p-4 min-h-[17vh]"></div>
    </div>
    <div class="md:flex justify-end">
      <MobileSheet
        class="mx-2 rounded-t-xl md:max-w-[400px] overflow-hidden flex flex-col px-8 pb-6 max-h-[80vh] bg-black text-white"
        root-class="z-20"
        @progress="(progress: number) => MobileSheetProgress = progress"
      >
        <div class="overflow-auto space-y-3" data-ignore-drag>
          <p class="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            quidem, eum adipisci odio est ipsum eaque, dolore doloribus
            voluptatum eligendi labore error veritatis dolor odit ratione soluta
            reiciendis cum ducimus?...
          </p>
          <p class="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            quidem, eum adipisci odio est ipsum eaque, dolore doloribus
            voluptatum eligendi labore error veritatis dolor odit ratione soluta
            reiciendis cum ducimus?
          </p>
          <p class="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            quidem, eum adipisci odio est ipsum eaque, dolore doloribus
            voluptatum eligendi labore error veritatis dolor odit ratione soluta
            reiciendis cum ducimus?
          </p>
          <p class="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            quidem, eum adipisci odio est ipsum eaque, dolore doloribus
            voluptatum eligendi labore error veritatis dolor odit ratione soluta
            reiciendis cum ducimus?
          </p>
        </div>
      </MobileSheet>
    </div>

    <!-- <MobileSheet
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
    </MobileSheet> -->

    <!-- <MobileSheet
      :drag-entire-card="true"
      class="bg-gradient-to-r from-black to-blue-900 p-10 m-2 rounded pt-0 text-white flex flex-col"
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        doloremque omnis porro vel? Quibusdam, enim modi doloribus possimus,
        laborum laboriosam similique ab a nemo odit aliquam, delectus atque
        sapiente adipisci?
      </p>
    </MobileSheet> -->
  </div>
</template>

<style scoped></style>
