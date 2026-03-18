import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

/**
 * Custom Chakra UI system.
 *
 * In Chakra v3, component styles are defined as "recipes". Each recipe
 * has a `base` (always applied) and size/variant variants.
 *
 * To extend a component's default recipe, define it here. Chakra merges
 * your overrides with the defaults from `defaultConfig`.
 *
 * Example — adding default horizontal padding to all buttons:
 */
const config = defineConfig({
  theme: {
    recipes: {
      button: {
        base: {
          px: 6,
          fontWeight: 'semibold',
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
