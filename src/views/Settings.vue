<template>
  <div>
    <v-select
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

  mounted() {
    console.log(this.getCurrentCubeType);
  },
};
</script>

<style scoped>

</style>
