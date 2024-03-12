import { Outlet } from "react-router-dom";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useContext, useEffect } from "react";
import { Store } from "./Store";
function App() {
  const {
    state: { mode },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    // Set the background color based on the mode
    const backgroundColor = mode === "dark" ? "black" : "white";
    const textColor = mode === "light" ? "black" : "white";
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;

    // Save the current mode to localStorage to persist between sessions
    localStorage.setItem("mode", mode);
  }, [mode]);

  const switchModeHandler = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    dispatch({ type: "SWICH_MODE" });
    // It's also good practice to ensure the new mode is immediately applied
    // in case there are any asynchronous delays with state updates
    document.body.style.backgroundColor =
      newMode === "dark" ? "black" : "white";
    localStorage.setItem("mode", newMode);
  };

  return (
    <div className=" flex flex-col h-full">
      <header className="">
        <Navbar modeHandle={switchModeHandler} mode={mode} />
      </header>
      <main className="">
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
