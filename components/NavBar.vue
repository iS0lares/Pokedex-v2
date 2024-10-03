<template>
  <div class="w-50">
    <v-app-bar rounded="lg">
      <v-row class="w-100 ml-4">
        <v-col cols="auto">
          <v-btn class="text-capitalize text-h6" @click="navigateTo('/')">
            Home
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn class="text-capitalize text-h6" @click="navigateTo('pokedex')">
            Pokedex
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
