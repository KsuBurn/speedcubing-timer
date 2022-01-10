<template>
  <div class="wrap">
    <v-card class="resultsCard">
      <v-card-title class="subheading font-weight-bold">
        Results
      </v-card-title>
      <v-list dense class="resultsList">
        <v-list-item
          v-for="(item) in resultList"
          :key="item.index"
        >
          <v-list-item-content>{{ item.index }}.</v-list-item-content>
          <v-list-item-content class="align-end">
            <ResultFormat :result="item.result"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <v-card class="statsCard">
      <v-card-title class="subheading font-weight-bold">
        Stats
      </v-card-title>
      <v-list dense>
        <v-list-item v-for="(item, index) in stats" :key="index">
          <v-list-item-content>{{ item.name }}:</v-list-item-content>
          <v-list-item-content class="align-end">
            <ResultFormat :result="item.result"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import ResultFormat from '@/components/ResultFormat.vue';

export default {
  name: 'ResultList',

  components: {
    ResultFormat,
  },

  computed: {
    resultList() {
      const results = this.$store.getters.getResults.map((item, index) => ({
        index: index + 1,
        result: item,
      }));
      return results.reverse();
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

    averageResult() {
      return this.$store.getters.getAverageResult;
    },

    stats() {
      return [
        {
          name: 'Best',
          result: this.bestResult,
        },
        {
          name: 'Last',
          result: this.lastResult,
        },
        {
          name: 'Average',
          result: this.averageResult,
        },
      ];
    },
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
  justify-content: space-around;
  height: 30vh;
}

.statsCard {
  width: 40%;
  height: fit-content;
}

.resultsCard {
  width: 40%;
  max-height: 90%;
  height: min-content;
}

.resultsList {
  max-height: 200px;
  overflow-y: auto;
}
</style>
