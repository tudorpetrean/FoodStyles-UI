import React from "react";
import logo from "./logo.svg";
import { ToDo } from "./features/toDo/toDo";
import "./App.css";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <ToDo />
        </MantineProvider>
      </header>
    </div>
  );
}

export default App;
