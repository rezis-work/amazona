import { sampleProducts } from "./data";
function App() {
  return (
    <div className="">
      <header className=" flex justify-center mb-10">
        <h1 className=" text-3xl">AMAZONA</h1>
      </header>
      <main className=" flex justify-center">
        <ul className="">
          {sampleProducts.map((product) => (
            <li
              key={product.slug}
              className=" mb-10 flex flex-col justify-center items-center gap-2"
            >
              <img className="" src={product.image} alt={product.name} />
              <h2 className="">{product.name}</h2>
              <p className="">{product.price}$</p>
            </li>
          ))}
        </ul>
      </main>
      <footer className="">ALL rights reserved</footer>
    </div>
  );
}

export default App;
