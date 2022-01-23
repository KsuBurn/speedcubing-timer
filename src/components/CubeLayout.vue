<template>
  <div class='wrap'>
    <div class="side side1">
      <div id="0" class="sticker"></div>
      <div id="1" class="sticker"></div>
      <div id="2" class="sticker"></div>
      <div id="3" class="sticker"></div>
      <div id="4" class="sticker"></div>
      <div id="5" class="sticker"></div>
      <div id="6" class="sticker"></div>
      <div id="7" class="sticker"></div>
      <div id="8" class="sticker"></div>
    </div>
    <div class="side side2">
      <div id="9" class="sticker"></div>
      <div id="10" class="sticker"></div>
      <div id="11" class="sticker"></div>
      <div id="21" class="sticker"></div>
      <div id="22" class="sticker"></div>
      <div id="23" class="sticker"></div>
      <div id="33" class="sticker"></div>
      <div id="34" class="sticker"></div>
      <div id="35" class="sticker"></div>
    </div>
    <div class="side side3">
      <div id="12" class="sticker"></div>
      <div id="13" class="sticker"></div>
      <div id="14" class="sticker"></div>
      <div id="24" class="sticker"></div>
      <div id="25" class="sticker"></div>
      <div id="26" class="sticker"></div>
      <div id="36" class="sticker"></div>
      <div id="37" class="sticker"></div>
      <div id="38" class="sticker"></div>
    </div>
    <div class="side side4">
      <div id="15" class="sticker"></div>
      <div id="16" class="sticker"></div>
      <div id="17" class="sticker"></div>
      <div id="27" class="sticker"></div>
      <div id="28" class="sticker"></div>
      <div id="29" class="sticker"></div>
      <div id="39" class="sticker"></div>
      <div id="40" class="sticker"></div>
      <div id="41" class="sticker"></div>
    </div>
    <div class="side side5">
      <div id="18" class="sticker"></div>
      <div id="19" class="sticker"></div>
      <div id="20" class="sticker"></div>
      <div id="30" class="sticker"></div>
      <div id="31" class="sticker"></div>
      <div id="32" class="sticker"></div>
      <div id="42" class="sticker"></div>
      <div id="43" class="sticker"></div>
      <div id="44" class="sticker"></div>
    </div>
    <div class="side side6">
      <div id="45" class="sticker"></div>
      <div id="46" class="sticker"></div>
      <div id="47" class="sticker"></div>
      <div id="48" class="sticker"></div>
      <div id="49" class="sticker"></div>
      <div id="50" class="sticker"></div>
      <div id="51" class="sticker"></div>
      <div id="52" class="sticker"></div>
      <div id="53" class="sticker"></div>
    </div>
  </div>
</template>

<script>
import {
  classMap,
  stickerColorMap,
  initialStickerPositions,
  moves,
} from '@/constants';

export default {
  name: 'CubeLayout',

  props: {
    scramble: Array,
  },

  methods: {
    applyMove(initialState, moveToApply) {
      const modifiedState = [];
      for (let i = 0; i < moveToApply.length; i += 1) {
        const newIndex = moveToApply[i];
        modifiedState.push(initialState[newIndex]);
      }

      return modifiedState;
    },

    applyLayout(layout) {
      layout.forEach((elem, idx) => {
        const colorClass = classMap[stickerColorMap[elem]];
        const sticker = document.getElementById(idx);
        sticker.className = 'sticker';
        sticker.classList.add(`${colorClass}Color`);
      });
    },

    convertScrambleForLayout(scramble) {
      return scramble.map((elem) => {
        if (elem[1] === '2') {
          return elem[0] + elem[0];
        }
        if (elem[1] === '\'') {
          return elem[0] + elem[0] + elem[0];
        }
        return elem;
      })
        .join('')
        .split('');
    },

    getCubeLayout() {
      const scrambleForLayout = this.convertScrambleForLayout(this.scramble);
      let targetLayout = initialStickerPositions;

      for (let i = 0; i < scrambleForLayout.length; i += 1) {
        targetLayout = this.applyMove(targetLayout, moves[scrambleForLayout[i]]);
      }

      this.applyLayout(targetLayout);
    },
  },

  watch: {
    scramble() {
      this.getCubeLayout();
    },
  },
};
</script>

<style scoped>
.wrap {
  display: grid;
  grid-template-columns: repeat(4, 90px);
  grid-template-rows: repeat(3, 90px);
  justify-content: center;
}

.side {
  border: solid #aaaaaa 1px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.side1 {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border-bottom: none;
}

.side2 {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  border-right: none;
}

.side3 {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

.side4 {
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  border-left: none;
}

.side5 {
  grid-column: 4 / 5;
  grid-row: 2 / 3;
  border-left: none;
}

.side6 {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  border-top: none;
}

.sticker {
  display: inline-flex;
  border: solid #aaaaaa 1px;
  width: 100%;
  height: 100%;
}

.side1 > .sticker {
  border-bottom: none;
}

.side6 > .sticker {
  border-top: none;
}

.redColor {
  background: red;
}

.yellowColor {
  background: yellow;
}

.greenColor {
  background: #00ff00;
}

.orangeColor {
  background: orange;
}

.whiteColor {
  background: white;
}

.blueColor {
  background: blue;
}
</style>
