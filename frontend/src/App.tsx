import Container from "./components/Container";
import Footer from "./components/Footer";
import ListProducts from "./components/ListProducts";
import Navbar from "./components/Navbar";
import Row from "./components/Row";
import { sampleProducts } from "./data";
function App() {
  return (
    <div className=" flex flex-col h-full">
      <header className="">
        <Navbar />
      </header>
      <main className="">
        <Container>
          <Row>
            <ListProducts products={sampleProducts} />
          </Row>
        </Container>
      </main>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
