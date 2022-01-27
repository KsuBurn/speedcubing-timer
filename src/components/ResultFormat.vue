<template>
  <div>
    <span v-if="normalizeTimer(result).min">{{ normalizeTimer(result).min }} : </span>
    <span>{{ normalizeTimer(result).sec }}</span>
  </div>
</template>

<script>
export default {
  name: 'ResultFormat',

  props: {
    result: Number,
  },

  methods: {
    normalizeTimer(result) {
      let min;
      let sec;

      if (result / 60000 >= 1) {
        min = Math.floor(result / 60000);
        sec = (result - min * 60000) / 1000;
      } else {
        sec = result / 1000;
      }

      return {
        min,
        sec: sec.toFixed(3),
      };
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
}
</style>
