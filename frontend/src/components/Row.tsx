export default function Row({ children }: React.PropsWithChildren) {
  return (
    <ul className=" mt-20 list-none grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  justify-items-center items-center">
      {children}
    </ul>
  );
}
