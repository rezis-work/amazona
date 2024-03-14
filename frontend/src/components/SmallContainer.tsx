export default function Container({ children }: React.PropsWithChildren) {
  return (
    <div className=" mt-20 my-3 w-[350px] md:w-[600px] mx-auto">{children}</div>
  );
}
