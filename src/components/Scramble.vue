<template>
  <div class="scramble">
    <div v-if="isShowedScramble">
      <span v-for="(item, index) in scramble" :key="index" class="cubeSide">
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
import {
  scrambleLen,
  standardCubeSides,
  movesModifiers,
} from '@/constants';

export default {
  name: 'Scramble',

  props: {
    isShowedScramble: Boolean,
  },

  data() {
    return {
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

  watch: {
    isShowedScramble() {
      if (this.isShowedScramble) {
        this.getScramble();
      }
    },
  },
};
</script>

<style scoped>
.scramble {
  margin: 0 auto;
  font-size: 18px;
  font-weight: bold;
  height: 28px;
  text-align: center;
}

.cubeSide {
  margin: 0 10px;
}
</style>
