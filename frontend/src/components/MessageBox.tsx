export default function MessageBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={` p-4 
      ${
        className
          ? className
          : "bg-red-100 border-l-4 border-red-500 text-red-700"
      }`}
      role="alert"
    >
      {children}
    </div>
  );
}
