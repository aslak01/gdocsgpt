import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { icons, pictograms } from "carbon-preprocess-svelte";
import { preprocessMeltUI } from "@melt-ui/pp";
import sequence from "svelte-sequential-preprocessor";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sequence([
    vitePreprocess(),
    icons(),
    pictograms(),
    preprocessMeltUI(),
  ]),

  kit: {
    adapter: adapter(),
  },
};

export default config;
