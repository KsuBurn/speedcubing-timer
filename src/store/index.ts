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
    favorites: [],
  },
  mutations: {
    saveScramble(state, payload) {
      state.scramble = payload;
    },

    changeSettings(state, payload) {
      state.currentSettings = payload;
    },

    saveResult(state: any, payload) {
      if (payload.cubeType in state.results) {
        state.results[payload.cubeType] = [...state.results[payload.cubeType], {
          result: payload.result,
          dnf: false,
          penalty: false,
        }];
      } else {
        state.results[payload.cubeType] = [{
          result: payload.result,
          dnf: false,
          penalty: false,
        }];
      }
    },

    deleteResult(state: any, payload) {
      const cubeType = state.currentSettings;
      const resultList = state.results[cubeType];

      state.results[cubeType] = resultList.filter((item: any) => item.result !== payload);
    },

    changeBestResult(state: any) {
      const cubeType = state.currentSettings;

      // eslint-disable-next-line array-callback-return,consistent-return
      const resultsArr = [];
      // eslint-disable-next-line for-direction,no-plusplus
      for (let i = 0; i < state.results[cubeType].length; i += 1) {
        if (!state.results[cubeType][i].dnf) {
          resultsArr.push(state.results[cubeType][i].result);
        }
      }

      if (!resultsArr.length) {
        state.bestResult[cubeType] = 0;
        return;
      }
      const bestResult = Math.min.apply(null, resultsArr);
      // eslint-disable-next-line max-len
      state.bestResult[cubeType] = state.results[cubeType].find((item: any) => item.result === bestResult).result;
    },

    changeLastResult(state: any) {
      const cubeType = state.currentSettings;
      if (!state.results[cubeType].length) {
        return;
      }
      // eslint-disable-next-line max-len
      state.lastResult[cubeType] = state.results[cubeType][state.results[cubeType].length - 1].result;
    },

    addToFavorites(state: any, payload) {
      state.favorites.push(payload);
    },

    removeFromFavorites(state: any, payload) {
      state.favorites = state.favorites.filter((item: any) => item.result !== payload.result);
    },

    changeDNF(state: any, payload) {
      const cubeType = state.currentSettings;
      state.results[cubeType] = state.results[cubeType].map((item: any) => {
        if (item.result === payload) {
          return {
            ...item,
            dnf: !item.dnf,
          };
        }
        return item;
      });
    },

    changePenalty(state: any, payload) {
      const cubeType = state.currentSettings;
      state.results[cubeType] = state.results[cubeType].map((item: any) => {
        if (item.result === payload.result) {
          return {
            ...item,
            result: item.penalty ? item.result - 2000 : item.result + 2000,
            penalty: !item.penalty,
          };
        }
        return item;
      });

      state.favorites = state.favorites.map((item: any) => {
        if (item.result === payload.result) {
          return {
            ...item,
            result: item.penalty ? item.result - 2000 : item.result + 2000,
            penalty: !item.penalty,
          };
        }
        return item;
      });
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
      const cubeType = state.currentSettings;
      const resultsArr = [];
      // eslint-disable-next-line for-direction,no-plusplus
      for (let i = 0; i < state.results[cubeType].length; i += 1) {
        if (!state.results[cubeType][i].dnf) {
          resultsArr.push(state.results[cubeType][i].result);
        }
      }

      if (resultsArr.length) {
        // eslint-disable-next-line max-len
        const resultSum = resultsArr.reduce((prevValue: number, curValue: number) => prevValue + curValue, 0);

        return resultSum / resultsArr.length;
      }
      return 0;
    },
  },
  actions: {},
  modules: {},
});
