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
            <div :class="['result', {dnf: isDNFActive(item.result)}]">
              <ResultFormat :result="item.result" :penalty-active="isPenaltyActive(item.result)" />
              <span v-if="isPenaltyActive(item.result)" class="penalty">&nbsp;(+2)</span>
            </div>
          </v-list-item-content>

          <ResultSettingsBtn
            :item="item"
            @toggle-dnf="toggleDNF"
            @toggle-penalty="togglePenalty"
            :dnf-active="isDNFActive(item.result)"
            :penalty-active="isPenaltyActive(item.result)"
          />

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
import ResultSettingsBtn from '@/components/ResultSettingsBtn.vue';

export default {
  name: 'ResultList',

  components: {
    ResultFormat,
    CardTemplate,
    ResultSettingsBtn,
  },

  methods: {
    toggleFavorites(result) {
      if (this.getFavorites.find((res) => res === result)) {
        this.$store.commit('removeFromFavorites', result);
      } else {
        this.$store.commit('addToFavorites', result);
      }
    },

    toggleDNF(result) {
      if (this.getDNF.find((res) => res === result)) {
        this.$store.commit('removeFromDNF', result);
      } else {
        this.$store.commit('addToDNF', result);
      }
    },

    togglePenalty(result) {
      if (this.getPenalty.find((res) => res === result)) {
        this.$store.commit('removeFromPenalty', result);
      } else {
        this.$store.commit('addToPenalty', result);
      }
    },

    isDNFActive(result) {
      return !!this.getDNF.find((res) => res === result);
    },

    isPenaltyActive(result) {
      return !!this.getPenalty.find((res) => res === result);
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

    getDNF() {
      return this.$store.state.dnf;
    },

    getPenalty() {
      return this.$store.state.penalty;
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

.result {
  display: flex;
}

.penalty {
  color: #ffe000;
}

.dnf {
  text-decoration: line-through;
  color: #aaaaaa;
}
</style>
