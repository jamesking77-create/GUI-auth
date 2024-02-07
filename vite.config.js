import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { styleImport } from "vite-plugin-style-import";
export default defineConfig({
  plugins: [
    react(),
    // styleImport({
    //   libs: [
    //     {
    //       libraryName: "react-datepicker",
    //       esModule: true,
    //       resolveStyle: () => "react-datepicker/dist/react-datepicker.css",
    //     },
    //   ],
    // }),
  ],
});
