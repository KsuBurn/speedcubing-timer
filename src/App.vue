<template>
  <v-app>
    <div id="app">
      <v-tabs
        background-color="cyan"
        slider-color="#177bd1"
        dark
        flat
      >
        <v-spacer></v-spacer>
        <router-link to="/">
          <v-tab class="tab">
            <v-icon>mdi-av-timer</v-icon>
          </v-tab>
        </router-link>
        <v-spacer></v-spacer>
        <router-link to="/settings">
          <v-tab class="tab">
            <v-icon>mdi-cog</v-icon>
          </v-tab>
        </router-link>
        <v-spacer></v-spacer>
        <router-link to="/favorites">
          <v-tab class="tab">
            <v-icon>mdi-heart</v-icon>
          </v-tab>
        </router-link>
        <v-spacer></v-spacer>
      </v-tabs>
      <router-view/>
    </div>
  </v-app>
</template>

<style>
#app {
  height: 100%;
}

a {
  text-decoration: none;
}

.tab {
  height: 100%;
}
</style>
