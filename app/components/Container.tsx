export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-container px-md md:px-lg lg:px-xl">
      {children}
    </div>
  );
}
