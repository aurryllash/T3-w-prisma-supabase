export default function PageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex justify-center mb-20">
      <div className="h-full w-full border-x border-slate-400 md:max-w-screen-xl">
        {children}
      </div>
    </main>
  );
};