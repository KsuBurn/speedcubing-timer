<template>
  <div class="wrap">
    <CardTemplate title="Results" cardClass="resultsCard">
      <v-list dense class="resultsList">
        <v-list-item
          v-for="(item) in resultList"
          :key="item.index"
        >
          <v-list-item-content>{{ item.index }}.</v-list-item-content>
          <v-list-item-content class="align-end">
            <ResultFormat :result="item.result"/>
          </v-list-item-content>
          <v-btn
            icon
            @click="deleteResult(item.index - 1)"
          >
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="toggleFavorites(item.result)"
          >
            <v-icon v-if="!!getFavorites.find((res) => res === item.result)" color="red">
              mdi-heart
            </v-icon>
            <v-icon v-else>mdi-heart-outline</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </CardTemplate>

    <CardTemplate title="Stats" cardClass="statsCard">
      <v-list dense>
        <v-list-item
          v-for="(item, index) in stats"
          :key="index"
        >
          <v-list-item-content>{{ item.name }}:</v-list-item-content>
          <v-list-item-content class="align-end">
            <ResultFormat :result="item.result"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </CardTemplate>
  </div>
</template>

<script>
import ResultFormat from '@/components/ResultFormat.vue';
import CardTemplate from '@/components/CardTemplate.vue';

export default {
  name: 'ResultList',

  components: {
    ResultFormat,
    CardTemplate,
  },

  methods: {
    deleteResult(index) {
      this.$store.commit('deleteResult', index);
    },

    toggleFavorites(result) {
      if (this.getFavorites.find((res) => res === result)) {
        this.$store.commit('removeFromFavorites', result);
      } else {
        this.$store.commit('addToFavorites', result);
      }
    },
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

    getFavorites() {
      return this.$store.state.favorites;
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
  max-height: 170px;
  overflow-y: auto;
}
</style>
