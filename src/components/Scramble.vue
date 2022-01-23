<template>
  <div class="scramble">
    <div>
      <span v-for="(item, index) in scramble" :key="index" class="cubeSide">
        {{ item }}
      </span>
    </div>
    <CubeLayout :scramble="scramble" />
  </div>
</template>

<script>
import CubeLayout from '@/components/CubeLayout.vue';

export default {
  name: 'Scramble',

  components: {
    CubeLayout,
  },

  props: {
    newScramble: Boolean,
    scramble: Array,
  },
};
</script>

<style scoped>
.scramble {
  margin: 0 auto;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.cubeSide {
  margin: 0 10px;
}
</style>
