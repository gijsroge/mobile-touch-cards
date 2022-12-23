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
      class="mx-auto p-4 prose space-y-4 origin-top"
      :style="{ transform: `scale(${1 - mobileCardProgress * 0.1})` }"
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ea
        molestias ratione praesentium non amet saepe inventore, quam deleniti
        odit eligendi officiis minus, quas quae corrupti omnis, accusantium
        voluptates a!
      </p>
      <button>test</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ea
        molestias ratione praesentium non amet saepe inventore, quam deleniti
        odit eligendi officiis minus, quas quae corrupti omnis, accusantium
        voluptates a!
      </p>
      <button>test</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ea
        molestias ratione praesentium non amet saepe inventore, quam deleniti
        odit eligendi officiis minus, quas quae corrupti omnis, accusantium
        voluptates a!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ea
        molestias ratione praesentium non amet saepe inventore, quam deleniti
        odit eligendi officiis minus, quas quae corrupti omnis, accusantium
        voluptates a!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ea
        molestias ratione praesentium non amet saepe inventore, quam deleniti
        odit eligendi officiis minus, quas quae corrupti omnis, accusantium
        voluptates a!
      </p>
    </div>
    <MobileCard
      class="mx-2 rounded-t-xl overflow-hidden flex flex-col p-10 max-h-[95vh] pt-0 bg-black text-white"
      root-class="z-20"
      @progress="(progress: number) => mobileCardProgress = progress"
    >
      <div class="space-y-2" data-ignore-drag>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          quidem, eum adipisci odio est ipsum eaque, dolore doloribus voluptatum
          eligendi labore error veritatis dolor odit ratione soluta reiciendis
          cum ducimus?
        </p>

        <a class="block" href="#">button</a>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          quidem, eum adipisci odio est ipsum eaque, dolore doloribus voluptatum
          eligendi labore error veritatis dolor odit ratione soluta reiciendis
          cum ducimus?
        </p>

        <a class="block" href="#">button</a>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          quidem, eum adipisci odio est ipsum eaque, dolore doloribus voluptatum
          eligendi labore error veritatis dolor odit ratione soluta reiciendis
          cum ducimus?
        </p>
      </div>
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
