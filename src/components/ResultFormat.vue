<template>
  <div>
    <p v-if="normalizeTimer(result).min">{{ normalizeTimer(result).min }} : </p>
    <p>{{ normalizeTimer(result).sec }}</p>
  </div>
</template>

<script>
export default {
  name: 'ResultFormat',

  props: {
    result: Number,
    penaltyActive: Boolean,
  },

  methods: {
    normalizeTimer(res) {
      let result = res;
      let min;
      let sec;

      if (this.penaltyActive) {
        result += 2000;
      }

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
