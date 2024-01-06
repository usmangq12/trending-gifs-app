import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./src/store/api";
import { Navigator } from "./Navigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <ApiProvider api={api}>
      <PaperProvider>
        <SafeAreaProvider>
          <Navigator />
        </SafeAreaProvider>
      </PaperProvider>
    </ApiProvider>
  );
}
