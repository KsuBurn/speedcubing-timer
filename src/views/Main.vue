<template>
  <div>
    <Timer/>
    <ResultList/>
  </div>
</template>

<script>
import Timer from '@/components/Timer.vue';
import ResultList from '@/components/ResultList.vue';

export default {
  name: 'Main',
  components: {
    Timer,
    ResultList,
  },
};
</script>

<style scoped>

</style>
