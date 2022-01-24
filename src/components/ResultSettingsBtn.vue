<template>
  <div>
    <v-menu
      top
      :offset-y="offset"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>

      <v-list class="btnsList">
        <v-list-item>
          <v-btn
            small
            text
          >
            DNF
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            small
            text
          >
            +2
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            icon
            @click="deleteResult(item.index - 1)"
          >
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'ResultSettingsBtn',

  props: {
    item: Object,
  },

  data() {
    return {
      offset: true,
    };
  },

  methods: {
    deleteResult(index) {
      this.$store.commit('deleteResult', index);
    },
  },
};
</script>

<style scoped>
.v-list-item {
  justify-content: center;
}
</style>
