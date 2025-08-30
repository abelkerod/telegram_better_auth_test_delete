import antfu from "@antfu/eslint-config"

export default antfu({
  stylistic: {
    indent: 2,
    quotes: "double",
  },
  typescript: true,
  react: true,
  ignores: [
    "./README.md",
    "./src/routeTree.gen.ts",
    "./src/components/ui/*",
  ],

})
