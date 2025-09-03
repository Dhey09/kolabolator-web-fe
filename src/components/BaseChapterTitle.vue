<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel key="1" header="This is panel header 1">
      <div class="flex justify-between items-center">
        <div>
          <a-img />
        </div>
        <div>
          Judul
        </div>
        <div>
          Action
        </div>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>
<script setup>
import { ref, watch } from "vue";
const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
const activeKey = ref(["1"]);
watch(activeKey, (val) => {
});
</script>
