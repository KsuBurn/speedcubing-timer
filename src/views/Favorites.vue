<template>
  <div class="favoriteWrap">
    <CardTemplate title="Favorite results" cardClass="resultsCard">
      <v-list dense>
        <v-list-item
          v-for="(item, index) in favoritesList"
          :key="index"
        >
          <v-list-item-content>{{ index + 1 }}.</v-list-item-content>
          <v-list-item-content class="align-end">
            <ResultFormat :result="item.result"/>
          </v-list-item-content>
          <v-btn
            icon
            @click="toggleFavorites(item)"
          >
            <v-icon v-if="!!favoritesList.find((res) => res.result === item.result)" color="red">
              mdi-heart
            </v-icon>
            <v-icon v-else>mdi-heart-outline</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </CardTemplate>
  </div>
</template>

<script>
import CardTemplate from '@/components/CardTemplate.vue';
import ResultFormat from '@/components/ResultFormat.vue';

export default {
  name: 'Favorites',

  components: {
    CardTemplate,
    ResultFormat,
  },

  computed: {
    favoritesList() {
      return this.$store.state.favorites;
    },
  },

  methods: {
    toggleFavorites(item) {
      if (this.favoritesList.find((res) => res.result === item.result)) {
        this.$store.commit('removeFromFavorites', item);
      } else {
        this.$store.commit('addToFavorites', item);
      }
    },
  },
};
</script>

<style scoped>
.favoriteWrap {
  padding: 15px;
}
</style>
