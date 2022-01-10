<template>
  <v-app>
    <div id="app">
      <v-toolbar
        dense
      >
        <v-spacer></v-spacer>
        <router-link to="/">
          <v-btn icon>
            <v-icon>mdi-av-timer</v-icon>
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <router-link to="/settings">
          <v-btn icon>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
      </v-toolbar>
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
</style>
