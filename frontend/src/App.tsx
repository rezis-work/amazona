import { Outlet } from "react-router-dom";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className=" flex flex-col h-full">
      <header className="">
        <Navbar />
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
