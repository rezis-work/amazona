export default function Navbar() {
  return (
    <div className=" bg-primaryColor text-textPrimary py-3 px-3 xl:px-32 flex justify-between items-center">
      <h1 className="">AMAZONA</h1>
      <nav className=" flex gap-3">
        <a href="/cart">Cart</a>
        <a href="/shop">Shop</a>
        <a href="/signin">Signin</a>
      </nav>
    </div>
  );
}
