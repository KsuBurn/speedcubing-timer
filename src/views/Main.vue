<template>
  <div class="mainContainer">
    <div>
      <div class="currentCube">
        Current cube:
        <span class="currentSettings">{{ getCurrenSettings }}</span>
      </div>
      <div class="cubeLayout">
        <Modal btnTitle="Show cube layout" v-model="dialog">
          <template v-slot:default="{ showContent }">
            <div class="modalContentWrap" v-if="showContent">
              <CubeLayout />
            </div>
          </template>
        </Modal>
      </div>
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
import CubeLayout from '@/components/CubeLayout.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'Main',
  components: {
    Modal,
    CubeLayout,
    Timer,
    ResultList,
    Scramble,
  },

  data() {
    return {
      isShowedScramble: false,
      dialog: false,
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

  mounted() {
    this.showScramble();
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

.modalContentWrap {
  padding: 15px;
}

.cubeLayout {
  float: right;
  margin-bottom: 20px;
}
</style>
