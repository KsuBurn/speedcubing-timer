<template>
  <div class="mainContainer">
    <div class="currentCube">
      Current cube:
      <span class="currentSettings">{{getCurrenSettings}}</span>
    </div>
    <Scramble :is-showed-scramble="isShowedScramble"/>
    <Timer
      @show-scramble="showScramble"
      @hide-scramble="hideScramble"
    />
    <ResultList/>
  </div>
</template>

<script>
import Timer from '@/components/Timer.vue';
import ResultList from '@/components/ResultList.vue';
import Scramble from '@/components/Scramble.vue';

export default {
  name: 'Main',
  components: {
    Timer,
    ResultList,
    Scramble,
  },

  data() {
    return {
      isShowedScramble: false,
    };
  },

  methods: {
    showScramble() {
      this.isShowedScramble = true;
    },

    hideScramble() {
      this.isShowedScramble = false;
    },
  },

  computed: {
    getCurrenSettings() {
      return this.$store.state.currentSettings;
    },
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
  font-size: 18px
}

.currentSettings {
  font-weight: bold;
}
</style>
