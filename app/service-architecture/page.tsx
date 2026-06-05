import ServiceArchitectureStack from "@/components/portfolio/service-architecture-stack";

export default function ServiceArchitecturePage() {
  return (
    <main className="min-h-screen bg-[#d8d5cc]">
      <div className="site-container grid min-h-screen grid-cols-1 items-center gap-10 py-16 lg:grid-cols-[1fr_minmax(0,640px)] lg:gap-16">
        <div className="hidden lg:block" aria-hidden="true" />

        <div className="w-full lg:justify-self-end">
          <p className="mb-8 font-sans text-[0.62rem] font-bold uppercase tracking-[0.3em] text-[#1e1c1a]/42">
            Step 1 — Right side bookends
          </p>
          <ServiceArchitectureStack />
        </div>
      </div>
    </main>
  );
}
