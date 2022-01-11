<template>
  <v-card :class="cardClass">
    <v-card-title class="subheading font-weight-bold">
      {{ title }}
    </v-card-title>
   <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: 'CardTemplate',

  props: {
    title: String,
    cardClass: String,
  },
};
</script>

<style scoped>

</style>
