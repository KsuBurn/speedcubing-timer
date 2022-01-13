<template>
  <v-dialog
    v-model="dialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        {{ btnTitle }}
      </v-btn>
    </template>
    <template>
      <v-card>
        <v-btn
          icon
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <slot :show-content="dialog"></slot>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    btnTitle: String,
  },

  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style scoped>

</style>
