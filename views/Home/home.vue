<template>
  <div class="mt-16">
    <div>
      <v-row>
        <v-col cols="6">
          <h1 class="title">WELCOME</h1>
          <h2 class="subtitle">To Pokedex</h2>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col class="d-flex justify-center align-center" cols="4">
              <div>
                <v-img
                  class="mx-auto py-auto"
                  :width="200"
                  :src="imageFirstResponse"
                />
              </div>
            </v-col>
            <v-col class="d-flex justify-center align-center" cols="4">
              <div>
                <v-img
                  class="mx-auto mt-10"
                  :width="200"
                  :src="imageSecondResponse"
                />
              </div>
            </v-col>
            <v-col navigateTo cols="4">
              <NuxtLink to="/pokedex">
                <v-img
                  class="ml-auto mt-3"
                  :width="200"
                  src="/capa_pokedex.png"
                />
              </NuxtLink>
            </v-col>
          </v-row>
          <v-col cols="auto"> </v-col>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const maxIdPokemon = 300;
const firstSortedIdPokemon = Math.floor(Math.random() * maxIdPokemon);
const secondSortedIdPokemon = Math.floor(Math.random() * maxIdPokemon);
const imageFirstResponse = ref("");
const imageSecondResponse = ref("");

const requestPokemonId = async () => {
  try {
    const responseFirst = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${firstSortedIdPokemon}/`
    );
    const responseSecond = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${secondSortedIdPokemon}/`
    );
    imageFirstResponse.value =
      responseFirst.data.sprites.versions["generation-v"][
        "black-white"
      ].animated.front_default;
    imageSecondResponse.value =
      responseSecond.data.sprites.versions["generation-v"][
        "black-white"
      ].animated.front_default;
  } catch (error) {
    console.log(error);
  }
};
requestPokemonId();
</script>

<style scoped>
.title {
  font-size: 7rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.015625em;
}

.subtitle {
  font-size: 3.75rem;
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.0083333333em;
}
</style>
