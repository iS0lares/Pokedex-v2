<template>
  <VApp class="background-color-app">
    <VMain>
      <v-container>
        <v-app class="background-color-app">
          <Navbar />
          <div>
            <slot />
          </div>
        </v-app>
      </v-container>
    </VMain>
  </VApp>
</template>

<script setup>
import Navbar from "~/components/NavBar.vue";
</script>

<style>
.background-color-app {
  background: #f6f8fc !important;
  background-repeat: repeat !important;
  background-size: cover !important;
}
</style>
