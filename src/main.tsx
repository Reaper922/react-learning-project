// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider, createRouter} from "@tanstack/react-router";

import {ThemeProvider, CssBaseline} from "@mui/material";
import theme from "./theme";

import {LanguageProvider} from "./LanguageContext";

import {routeTree} from "./routeTree.gen";

const router = createRouter({routeTree});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
