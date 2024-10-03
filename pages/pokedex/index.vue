<template>
  <div class="mt-16">
    <v-row no-gutters class="ml-0">
      <v-col :cols="!isPokemonSelected ? '12' : '7'" class="pa-0">
        <v-text-field
          label="Search pokemon here!"
          append-inner-icon="mdi-pokeball"
          @click:append-inner="onClick"
          class="mt-11"
          variant="solo"
        ></v-text-field>
        <v-row>
          <v-col>
            <v-btn class="text-h6 pa-0 mt-6" variant="text"
              >Ascending <span class="mdi mdi-chevron-down"
            /></v-btn>
          </v-col>
          <v-col cols="2" class="d-flex justify-end">
            <span class="my-auto">From</span>
            <v-text-field class="pt-4" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="2" class="d-flex justify-end">
            <span class="my-auto">To</span>
            <v-text-field class="pt-4" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-select
              variant="solo"
              prepend-inner-icon="mdi-pokeball"
              density="compact"
              label="Type"
              >Type</v-select
            >
          </v-col>
          <v-col cols="3">
            <v-select
              variant="solo"
              prepend-inner-icon="mdi-pokeball"
              density="compact"
              label="Weaknesses"
              >Weaknesses</v-select
            >
          </v-col>
          <v-col cols="3">
            <v-select
              variant="solo"
              prepend-inner-icon="mdi-pokeball"
              density="compact"
              label="Ability"
              >Ability</v-select
            >
          </v-col>
          <v-col cols="3">
            <v-select
              variant="solo"
              prepend-inner-icon="mdi-pokeball"
              density="compact"
              label="Heigth"
              >Heigth</v-select
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="item in eachPokemonDetails"
            :key="item.id"
            :cols="!isPokemonSelected ? '3' : '4'"
            class="my-13 d-flex justify-center"
          >
            <v-card class="pokemon-card" @click="getPokemonOnCard(item)" hover>
              {{ item.id }}
              <div class="pokemon-image-wrapper">
                <v-img
                  :src="
                    item.sprites.versions['generation-v']['black-white']
                      .animated.front_default
                  "
                  class="pokemon-image"
                ></v-img>
              </div>
              <v-card-title class="pokemon-number mt-2"
                >N°{{ item.id }}</v-card-title
              >
              <v-card-subtitle class="pokemon-name text-capitalize">
                {{ item.name }}
              </v-card-subtitle>
              <v-row justify="center" class="mt-2">
                <v-chip
                  v-for="type in item.types"
                  :key="type.type.name"
                  :color="type.type.name"
                  class="pokemon-type"
                  >{{ type.type.name.toUpperCase() }}</v-chip
                >
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5"> </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
const allPokemons: any = ref("");
const eachPokemonDetails: any = ref([]);
const isPokemonSelected = ref(false);
const onClick = () => {
  console.log("Buscando");
};

const getPokemons = async () => {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=300&offset=0`
    );
    allPokemons.value = res.data.results;
    return allPokemons.value;
  } catch (error) {
    console.log(error);
  }
};

const eachUrlPokemon = async (urlPokemon: string) => {
  try {
    const res = await axios.get(urlPokemon);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getEachPokemon = async () => {
  const allPokemonsRequest = await getPokemons();
  for (let item of allPokemonsRequest) {
    const eachPokemonRequest = await eachUrlPokemon(item.url);
    eachPokemonDetails.value.push(eachPokemonRequest);
  }
};

const getPokemonOnCard = (idPokemon: number): void => {
  console.log(idPokemon);
  isPokemonSelected.value = !isPokemonSelected.value;
};

getEachPokemon();
</script>

<style scoped>
.align-button {
  margin-top: 0.2%;
}
.image-pokemon {
  width: 100%;
  position: relative;
}
.color-number-pokemon {
  color: #8f9396;
}

.pokemon-card {
  width: 80%;
  height: 130%;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-top: 70px;
  overflow: visible;
}

.pokemon-image-wrapper {
  position: absolute;
  top: -17%;
  left: 50%;
  transform: translateX(-50%);
}

.pokemon-image {
  width: 100rem;
  height: 8rem;
}

.pokemon-number {
  font-size: 18px;
  font-weight: bold;
  color: #7a7a7a;
  margin-bottom: 5px;
}

.pokemon-name {
  font-size: 25px;
  font-weight: bold;
  color: #2d2d2d;
  margin-bottom: 10px;
}

.pokemon-type {
  font-size: 12px;
  color: white;
  text-transform: uppercase;
}

.fire {
  background-color: rgb(255, 123, 0);
}

.grass {
  background-color: rgb(27, 180, 0);
}

.bug {
  background-color: rgb(132, 132, 0);
}

.water {
  background-color: rgb(0, 144, 177);
}

.poison {
  background-color: rgb(123, 0, 255);
}

.flying {
  color: black;
  background-color: rgb(127, 153, 255);
}

.normal {
  background-color: rgb(135, 135, 135);
}

.electric {
  color: black;
  background-color: rgb(255, 225, 0);
}

.ground {
  background-color: rgb(160, 97, 30);
}

.fairy {
  color: black;
  background-color: rgb(255, 181, 222);
}

.psychic {
  background-color: rgb(255, 101, 186);
}

.fighting {
  background-color: rgb(255, 213, 0);
}

.rock {
  background-color: rgb(175, 146, 1);
}

.ice {
  background-color: rgb(0, 208, 194);
  color: black;
}

.steel {
  background-color: rgb(75, 126, 159);
}

.ghost {
  background-color: rgb(108, 0, 126);
}

.dragon {
  background: linear-gradient(180deg, #53a4cf 50%, #f16e57 50%);
}

.dark {
  background: rgb(54, 54, 54);
}
</style>
