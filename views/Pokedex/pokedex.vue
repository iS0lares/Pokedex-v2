<template>
  <div class="mt-16">
    <v-row no-gutters class="ml-0">
      <v-col :cols="!isPokemonSelected ? '12' : '7'" class="pa-0">
        <v-text-field
          label="Search pokemon here!"
          append-inner-icon="mdi-pokeball"
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
            cols="12"
            class="d-flex justify-center"
            v-if="isPokemonsLoading"
          >
            <v-progress-circular indeterminate color="red" />
          </v-col>
          <v-col
            v-for="item in eachPokemonDetails"
            :key="item.id"
            :cols="!isPokemonSelected ? '3' : '4'"
            class="my-13 d-flex justify-center"
          >
            <v-card class="pokemon-card" @click="getPokemonOnCard(item)" hover>
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
      <v-col :cols="!isPokemonSelected ? '12' : '5'">
        <v-col cols="12" class="d-flex h-auto justify-center flex-column">
          <v-card v-if="pokemonSelected" class="pokemon-card-selected ml-5">
            <div class="pokemon-selected-image-wrapper">
              <v-img
                :src="
                  pokemonSelected.sprites.other['official-artwork']
                    .front_default
                "
                class="pokemon-selected-image"
              ></v-img>
            </div>
            <v-card-title class="pokemon-number mt-0 mb-0 pb-0"
              >N°{{ pokemonSelected.id }}</v-card-title
            >
            <p class="pokemon-name-selected text-capitalize font-weight-bold">
              {{ pokemonSelected.name }}
            </p>
            <v-row justify="center" class="mt-2">
              <v-col cols="12" class="d-flex flex-row justify-center">
                <v-sheet
                  v-for="type in typeOfPokemonSelected"
                  :key="type"
                  :color="type"
                  :width="100"
                  class="pokemon-type-selected pa-2 mx-2"
                  rounded
                  >{{ type.toUpperCase() }}</v-sheet
                >
              </v-col>
            </v-row>
            <v-row class="flex-column">
              <v-col cols="6" class="mx-auto pb-0">
                <p class="text-h5 font-weight-black">POKÉDEX ENTRY</p>
              </v-col>
              <v-col cols="6" class="mx-auto">
                <p class="pokemon-selected-subtext">
                  {{ pokemonSubtext.replace(/[\n\f]/g, " ") }}
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p class="text-h5 font-weight-black">ABILITIES</p>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col
                v-for="moves in movesOfPokemonSelected"
                :key="moves"
                cols="5"
                class="mb-5"
              >
                <v-chip
                  class="w-100 chip-abilities font-weight-bold text-h6 pa-6 text-capitalize"
                  >{{ moves }}</v-chip
                >
              </v-col>
            </v-row>
            <v-row justify="center" class="mb-5">
              <v-col cols="5"
                ><v-chip class="w-100 font-weight-bold text-h6 pa-6"
                  >{{ pokemonSelected.height }} M</v-chip
                ></v-col
              >
              <v-col cols="5"
                ><v-chip class="w-100 font-weight-bold text-h6 pa-6"
                  >{{ pokemonSelected.weight }} Kg</v-chip
                ></v-col
              >
            </v-row>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
const allPokemons: any = ref("");
const eachPokemonDetails: any = ref([]);
const isPokemonSelected = ref(false);
const pokemonSelected: any = ref("");
const isPokemonsLoading: Ref<boolean, boolean> = ref(true);
const typeOfPokemonSelected = ref("");
const movesOfPokemonSelected: any = ref("");
const pokemonSubtext: any = ref("");

const getPokemons = async () => {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`
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
    isPokemonsLoading.value = false;
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

const getPokemonOnCard = async (pokemonData: any) => {
  if (pokemonData) {
    getTypeOfPokemonSelected(pokemonData);
    pokemonSubtext.value = await getSubtextFromPokemonSelected(pokemonData.id);
    getMovesOfPokemon(pokemonData);
    const isSamePokemon = pokemonData.id === pokemonSelected.value?.id;
    isPokemonSelected.value = !isSamePokemon;
    console.log(pokemonData);
    pokemonSelected.value = isSamePokemon ? null : pokemonData;
  }
};

const getTypeOfPokemonSelected = (pokemonData: any) => {
  typeOfPokemonSelected.value = pokemonData.types.map(
    (value: any) => value.type.name
  );
};

const getMovesOfPokemon = (pokemonData: any) => {
  movesOfPokemonSelected.value = pokemonData.abilities.map(
    (value: any) => value.ability.name
  );
};

const getSubtextFromPokemonSelected = async (idPokemon: any) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`
    );
    return response.data.flavor_text_entries[1].flavor_text;
  } catch (error) {
    console.log(error);
  }
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
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
}

.pokemon-selected-image-wrapper {
  position: absolute;
  top: -17%;
  left: 50%;
  transform: translateX(-50%);
}

.pokemon-image {
  width: 10rem;
  height: 7rem;
}

.pokemon-card-selected {
  margin-top: 20%;
  top: -15%;
  width: 37%;
  height: auto;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  padding-top: 4%;
  overflow: visible;
}

.pokemon-selected-image {
  width: 14rem;
  height: 14rem;
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

.pokemon-name-selected {
  font-size: 35px;
  color: #060c25;
}

.pokemon-type {
  font-size: 12px;
  color: white;
  text-transform: uppercase;
}

.chip-abilities {
  border: 1px solid grey;
  background: #f7f8fa;
}

.pokemon-selected-subtext {
  font-size: 20px;
  font-weight: 300;
  color: #060c25;
}

.pokemon-type-selected {
  font-size: 17px;
  font-weight: bold;
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
