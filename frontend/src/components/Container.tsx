export default function Container({ children }: React.PropsWithChildren) {
  return <div className=" my-3 xl:w-[1200px] mx-auto">{children}</div>;
}
