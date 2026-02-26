import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-accent/3 blur-[100px]" />

      <main className="z-10 flex w-full max-w-lg flex-col items-center px-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="mb-2 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-bold tracking-widest text-accent uppercase">
          New Era of Training
        </div>

        <h1 className="mt-4 text-6xl font-black tracking-tighter text-foreground sm:text-8xl">
          FIT<span className="text-accent italic">TY</span>
        </h1>

        <p className="mt-8 max-w-sm text-lg font-medium leading-relaxed text-muted">
          Fitness made simple: your path to <span className="text-foreground font-bold">Health</span> and <span className="text-accent underline decoration-2 underline-offset-4 font-bold">Happiness</span>
        </p>

        <div className="mt-16 flex w-full flex-col gap-4">
          <Link
            href="/auth/login"
            className="btn-primary flex items-center justify-center gap-3 text-lg"
          >
            Get Started
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <p className="text-xs text-muted/60">
            Join thousands of beginners leveling up their strength.
          </p>
        </div>
      </main>

      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </div>
  );
}
