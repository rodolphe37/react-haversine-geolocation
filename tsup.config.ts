import { defineConfig } from 'tsup';


export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true, // génère les .d.ts (typages)
  sourcemap: true,
  clean: true,
});