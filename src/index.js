import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserProvider from "./context";

import RouterLayer from "./routes";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <UserProvider>
      <RouterLayer />
    </UserProvider>
  </StrictMode>
);
