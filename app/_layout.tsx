import { Stack } from "expo-router";
import { Provider } from "~context/auth";

export default function Layout() {
  return (
    <Provider>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            headerTitle: "Info",
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
