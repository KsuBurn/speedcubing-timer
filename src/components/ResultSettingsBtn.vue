<template>
  <div>
    <v-menu
      top
      :offset-y="offset"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
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
            @click="$emit('toggle-dnf', item.result)"
            depressed
            :color="dnfActive ? '#ffaaaa' : ''"
          >
            DNF
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            small
            text
            @click="$emit('toggle-penalty', item.result)"
            depressed
            :color="penaltyActive ? '#ffe000' : ''"
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
    dnfActive: Boolean,
    penaltyActive: Boolean,
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
