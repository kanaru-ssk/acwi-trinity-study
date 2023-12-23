/** @type {import("prettier").Config} */
const config = {
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
  plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
};

export default config;
