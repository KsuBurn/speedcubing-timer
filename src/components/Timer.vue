<template>
  <div class="wrap">
    <div :style="{color: timerColor}">
      <p class="min" v-show="min">
        {{ timeForView.min }} :
      </p>
      <p class="sec">{{ timeForView.sec }}.</p>
      <p class="msec">{{ timeForView.msec }}</p>
    </div>

    <div>
      <v-btn
        elevation="2"
        @click="startTimer"
      >
        start
      </v-btn>
      <v-btn
        elevation="2"
        @click="stopTimer"
      >
        stop
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timer',

  props: {
    showScramble: Function,
    hideScramble: Function,
  },

  data() {
    return {
      min: 0,
      sec: 0,
      msec: 0,
      timeForView: {
        min: '00',
        sec: '00',
        msec: '000',
      },
      allTime: 0,
      timerId: undefined,
      isTimerStarted: false,
      timerReadyId: undefined,
      startPressTime: 0,
      endPressTime: 0,
      pressed: false,
      timerColor: 'black',
    };
  },

  methods: {
    startTimer() {
      this.$emit('hide-scramble');
      this.resetTimer();
      this.isTimerStarted = true;
      let startTime = new Date();

      this.timerId = setInterval(() => {
        this.msec = new Date().getTime() - startTime.getTime();

        if (this.msec >= 1000) {
          this.sec += 1;
          this.msec = 0;
          startTime = new Date();
        }

        if (this.sec === 60) {
          this.min += 1;
          this.sec = 0;
        }

        this.normalizeTimeForView();
      }, 1);
    },

    stopTimer() {
      if (this.isTimerStarted) {
        clearInterval(this.timerId);
        const allTime = this.msec + this.sec * 1000 + this.min * 1000 * 60;
        this.saveTime(allTime);
        this.isTimerStarted = false;
        this.$emit('show-scramble');
      }
    },

    resetTimer() {
      this.min = 0;
      this.sec = 0;
      this.msec = 0;

      this.timeForView.min = '00';
      this.timeForView.sec = '00';
      this.timeForView.msec = '000';
    },

    saveTime(result) {
      const cubeType = this.$store.state.currentSettings;
      this.$store.commit('saveResult', { cubeType, result });
    },

    normalizeTimeForView() {
      if (this.msec <= 9) {
        this.timeForView.msec = `00${this.msec}`;
      }

      if (this.msec >= 10 && this.msec <= 99) {
        this.timeForView.msec = `0${this.msec}`;
      }

      if (this.msec > 999) {
        this.timeForView.msec = '000';
      }

      if (this.msec >= 100) {
        this.timeForView.msec = `${this.msec}`;
      }

      if (this.sec <= 9) {
        this.timeForView.sec = `0${this.sec}`;
      }

      if (this.sec >= 10) {
        this.timeForView.sec = `${this.sec}`;
      }

      if (this.min <= 9) {
        this.timeForView.min = `0${this.min}`;
      }

      if (this.min >= 10) {
        this.timeForView.min = `${this.min}`;
      }
    },
  },

  mounted() {
    document.addEventListener('keyup', (evt) => {
      if (evt.code === 'Space') {
        this.pressed = false;
        this.endPressTime = new Date().getTime();
        this.timerColor = 'black';

        if (this.endPressTime - this.startPressTime < 2000) {
          clearInterval(this.timerReadyId);
          this.stopTimer();
        } else {
          this.startTimer();
        }
      }
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.code === 'Space' && !this.pressed) {
        this.stopTimer();
        this.startPressTime = new Date().getTime();
        this.pressed = true;
        this.timerColor = 'red';

        this.timerReadyId = setTimeout(() => {
          this.timerColor = 'green';
          this.resetTimer();
        }, 1500);
      }
    });
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  text-align: center;
}

.min,
.sec,
.msec {
  display: inline;
}

.min,
.sec {
  font-size: 70px;
}

.msec {
  font-size: 50px;
}
</style>
