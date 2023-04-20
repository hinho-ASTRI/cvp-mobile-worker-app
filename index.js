import "expo-router/entry";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
require("react-native-ui-lib/config").setConfig({ appScheme: "default" });
import i18next from "./assets/languages/i18n-js";

const queryClient = new QueryClient();

export function App() {
  const ctx = require.context("./app");
  return (
    <QueryClientProvider client={queryClient}>
      <ExpoRoot context={ctx} />
    </QueryClientProvider>
  );
}

registerRootComponent(App);
