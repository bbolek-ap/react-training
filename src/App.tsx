import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header";
import ProjectList from "./components/project-list";
import Input from "./components/input";

function App() {
  console.log("Test Codemod");
  return (
    <div>
      <Header></Header>
      <ProjectList />
    </div>
  );
}

export default App;
