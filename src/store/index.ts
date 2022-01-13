import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    results: {
      '3x3x3': [],
      '2x2x2': [],
      '5x5x5': [],
      '7x7x7': [],
    },
    bestResult: {
      '3x3x3': 0,
      '2x2x2': 0,
      '5x5x5': 0,
      '7x7x7': 0,
    },
    lastResult: {
      '3x3x3': 0,
      '2x2x2': 0,
      '5x5x5': 0,
      '7x7x7': 0,
    },
    currentSettings: '3x3x3',
    scramble: [],
  },
  mutations: {
    changeSettings(state, payload) {
      state.currentSettings = payload;
    },

    saveResult(state: any, payload) {
      if (payload.cubeType in state.results) {
        state.results[payload.cubeType] = [...state.results[payload.cubeType], payload.result];
      } else {
        state.results[payload.cubeType] = [payload.result];
      }

      state.bestResult[payload.cubeType] = Math.min.apply(null, state.results[payload.cubeType]);
      state.lastResult[payload.cubeType] = payload.result;
    },

    saveScramble(state, payload) {
      state.scramble = payload;
    },
  },
  getters: {
    getResults(state: any) {
      if (state.currentSettings in state.results) {
        return state.results[state.currentSettings];
      }
      return [];
    },

    getAverageResult(state: any): number {
      const allResults = state.results[state.currentSettings];

      if (allResults.length) {
        // eslint-disable-next-line max-len
        const average = (allResults.reduce((prevValue: number, curValue: number) => prevValue + curValue, 0)) / allResults.length;
        return Number(average.toFixed(3));
      }
      return 0;
    },
  },
  actions: {},
  modules: {},
});
