interface NavProps {
  mode: string;
  modeHandle: () => void;
}

export default function Navbar({ modeHandle, mode }: NavProps) {
  return (
    <div className=" bg-primaryColor text-textPrimary py-3 px-3 xl:px-32 flex justify-between items-center">
      <h1 className="">AMAZONA</h1>
      <nav className=" flex gap-3">
        <button
          onClick={modeHandle}
          className="px-2 bg-textPrimary text-primaryColor rounded-md"
        >
          <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}></i>
        </button>
        <a href="/cart">Cart</a>
        <a href="/shop">Shop</a>
        <a href="/signin">Signin</a>
      </nav>
    </div>
  );
}
