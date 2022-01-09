<template>
  <div class="wrap">
    <v-simple-table>
      <tbody>
      <tr>
        <td> Best:</td>
        <td  v-if="bestResult">
          <ResultFormat :result="bestResult"/>
        </td>
      </tr>
      <tr>
        <td>Last:</td>
        <td v-if="lastResult">
          <ResultFormat :result="lastResult"/>
        </td>
      </tr>
      <tr>
        <td>Mean:</td>
        <td v-if="meanResult">
          <ResultFormat :result="meanResult"/>
        </td>
      </tr>
      </tbody>
    </v-simple-table>

    <v-simple-table>
        <tbody>
        <tr
          v-for="(result, index) in resultList"
          :key="index"
        >
          <td>{{ index + 1 }}.</td>
          <td>
            <ResultFormat :result="result"/>
          </td>
        </tr>
        </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import ResultFormat from '@/components/ResultFormat.vue';

export default {
  name: 'ResultList',

  components: {
    ResultFormat,
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
        sec,
      };
    },
  },

  computed: {
    resultList() {
      return this.$store.getters.getResults;
    },

    bestResult() {
      return this.$store.state.bestResult[this.currentCubeType];
    },

    lastResult() {
      return this.$store.state.lastResult[this.currentCubeType];
    },

    currentCubeType() {
      return this.$store.state.currentSettings;
    },

    meanResult() {
      console.log(typeof this.$store.getters.getMeanResult);
      return this.$store.getters.getMeanResult;
    },
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
}
</style>
