<template>
  <div class="mainContainer">
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
.mainContainer {
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 50px);
}
</style>
