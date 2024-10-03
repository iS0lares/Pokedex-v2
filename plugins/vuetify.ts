// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            normal: "#878787",
            fighting: "#FFD500",
            flying: "#7F99FF",
            poison: "#7B00FF",
            ground: "#A0611E",
            rock: "#AF9201",
            bug: "#848400",
            ghost: "#6C007E",
            steel: "#4B7E9F",
            fire: "#FF7B00",
            water: "#0090B1",
            grass: "#1BB400",
            electric: "#FFE100",
            psychic: "#FF65BA",
            ice: "#00D0C2",
            dragon: "#A28EA3",
            dark: "#363636",
            fairy: "#FFB5DE",
            stellar: "#8C5FC4",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
