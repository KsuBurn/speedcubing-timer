<template>
  <div class="mainContainer">
    <div>
      <div class="currentCube">
        Current cube:
        <span class="currentSettings">{{ getCurrenSettings }}</span>
      </div>
    </div>
    <Scramble :scramble="scramble"/>

    <Timer
      @get-scramble="getScramble"
    />
    <ResultList/>
  </div>
</template>

<script>
import Timer from '@/components/Timer.vue';
import ResultList from '@/components/ResultList.vue';
import Scramble from '@/components/Scramble.vue';
import CubeLayout from '@/components/CubeLayout.vue';
import Modal from '@/components/Modal.vue';
import { movesModifiers, scrambleLen, standardCubeSides } from '@/constants';

export default {
  name: 'Main',
  components: {
    Timer,
    ResultList,
    Scramble,
  },

  data() {
    return {
      newScramble: false,
      dialog: false,
      scramble: [],
    };
  },

  methods: {
    getRandomSide(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    getScramble() {
      this.scramble = [];
      let preMove = null;
      let prePreMove = null;
      for (let i = 0; i < scrambleLen; i += 1) {
        let move = this.getRandomSide(standardCubeSides);
        while (move === preMove || move === prePreMove) {
          move = this.getRandomSide(standardCubeSides);
        }
        prePreMove = preMove;
        preMove = move;
        this.scramble.push(move + this.getRandomSide(movesModifiers));
      }

      this.$store.commit('saveScramble', this.scramble);
    },
  },

  computed: {
    getCurrenSettings() {
      return this.$store.state.currentSettings;
    },
  },

  mounted() {
    this.getScramble();
  },
};
</script>

<style scoped>
.mainContainer {
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 50px);
  padding: 15px;
}

.currentCube {
  text-align: right;
  font-size: 18px;
}

.currentSettings {
  font-weight: bold;
}
</style>
