import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact({
    compat: true
  }), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  }), alpinejs()]
});