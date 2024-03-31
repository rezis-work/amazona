import { Outlet } from "react-router-dom";
import Container from "./components/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useContext, useEffect } from "react";
import { Store } from "./Store";

function App() {
  const {
    state: { mode, cart },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    // Set the background color based on the mode
    const backgroundColor = mode === "dark" ? "black" : "white";
    const textColor = mode === "light" ? "black" : "#dee2e6";
    document.body.style.backgroundColor = backgroundColor;

    const text = document.querySelector(".subtotal") as HTMLElement | null;
    if (text) {
      text.style.color = mode === "light" ? "black" : "green";
    }

    document.body.style.color = textColor;
    localStorage.setItem("mode", mode);
  }, [mode]);

  const switchModeHandler = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    dispatch({ type: "SWITCH_MODE" });
    // It's also good practice to ensure the new mode is immediately applied
    // in case there are any asynchronous delays with state updates
    document.body.style.backgroundColor =
      newMode === "dark" ? "black" : "white";
    localStorage.setItem("mode", newMode);
  };

  return (
    <div className=" flex flex-col h-full">
      <ToastContainer position="bottom-center" limit={1} />
      <header className="">
        <Navbar modeHandle={switchModeHandler} mode={mode} cart={cart} />
      </header>
      <main>
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
