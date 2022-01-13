<template>
  <div class="mainContainer">
    <v-select
      class="input"
      :items="typeOfCubes"
      label="Type"
      :value="getCurrentCubeType"
      @change="changeTypeOfCubes"
    ></v-select>
  </div>
</template>

<script>
import { typeOfCubes } from '@/constants';

export default {
  name: 'Settings',

  data: () => ({
    typeOfCubes,
  }),

  methods: {
    changeTypeOfCubes(value) {
      this.$store.commit('changeSettings', value);
    },
  },

  computed: {
    getCurrentCubeType() {
      return this.$store.state.currentSettings;
    },
  },
};
</script>

<style scoped>
.mainContainer {
  padding: 15px;
}

.input {
  width: 40%;
}
</style>
