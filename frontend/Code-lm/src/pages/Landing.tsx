export default function Landing() {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-200 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />
  
        <header className="relative container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight text-white">Code-lm</div>
          <nav className="flex items-center gap-3">
            <a href="/login" className="px-4 py-2 rounded-lg text-sm text-neutral-400 hover:text-white transition">
              Sign In
            </a>
            <a
              href="/signup"
              className="px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white shadow-lg shadow-indigo-500/20 transition"
            >
              Open Editor
            </a>
          </nav>
        </header>
  
        <main className="relative container mx-auto px-6">
          {/* Hero Section */}
          <section className="py-24 text-center">
            <p className="mb-4 text-xs text-indigo-400 tracking-widest uppercase">
              v1.0.4 Now Available
            </p>
  
            <h1 className="text-5xl md:text-7xl font-semibold text-white leading-tight">
              Code Smarter with <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">AI</span>
            </h1>
  
            <p className="max-w-2xl mx-auto mt-6 text-neutral-400 text-lg">
              The AI-powered code editor that thinks with you. High-performance,
              obsidian-grade development experience.
            </p>
  
            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                href="/signup"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-xl shadow-indigo-500/20 hover:scale-105 transition"
              >
                Start Coding
              </a>
              <a
                href="/login"
                className="px-6 py-3 rounded-xl border border-neutral-700 hover:bg-neutral-800 transition"
              >
                Try Demo
              </a>
            </div>
          </section>
  
          {/* Feature Cards */}
          <section className="grid md:grid-cols-2 gap-6 mb-20">
            {[
              {
                title: "AI Code Completion",
                desc: "Predicts your next move with high accuracy so you can focus on logic.",
              },
              {
                title: "Smart Refactoring",
                desc: "One-click structural improvements that maintain semantic integrity.",
              },
              {
                title: "Real-time Collaboration",
                desc: "Pair program in a low-latency environment built for global teams.",
              },
              {
                title: "Built-in Terminal",
                desc: "GPU-accelerated terminal with integrated command suggestions.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 backdrop-blur hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 transition"
              >
                <h3 className="text-white font-medium text-lg mb-3 group-hover:text-indigo-400 transition">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </section>
  
          {/* How It Works */}
          <section className="py-20 text-center">
            <h2 className="text-neutral-400 text-xs tracking-[0.3em] uppercase mb-12">
              How It Works
            </h2>
  
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Connect Source",
                  desc: "Import your repo or start fresh.",
                },
                {
                  step: "02",
                  title: "Collaborate with AI",
                  desc: "Chat, refactor, and ship features.",
                },
                {
                  step: "03",
                  title: "Deploy Instantly",
                  desc: "One-click staging or production.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-neutral-800 p-8 bg-neutral-900/40 hover:scale-[1.02] transition"
                >
                  <div className="text-indigo-400 text-sm mb-3">{item.step}</div>
                  <div className="text-white font-medium text-lg mb-2">{item.title}</div>
                  <p className="text-neutral-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
  
          {/* CTA */}
          <section className="py-16 text-center">
            <div className="rounded-3xl border border-neutral-800 p-12 bg-gradient-to-br from-neutral-900/60 to-neutral-900/30 backdrop-blur">
              <h3 className="text-white text-3xl mb-4 font-semibold">
                Ready to build the future?
              </h3>
              <p className="text-neutral-400 mb-6">
                Join developers building faster with Stitch Code.
              </p>
  
              <div className="flex items-center justify-center gap-4">
                <a
                  href="/signup"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-105 transition"
                >
                  Get Started for Free
                </a>
                <a
                  href="/login"
                  className="px-6 py-3 rounded-xl border border-neutral-700 hover:bg-neutral-800 transition"
                >
                  View Pricing
                </a>
              </div>
            </div>
          </section>
        </main>
  
        <footer className="py-10 text-center text-xs text-neutral-500">
          © 2026 Stitch Code
        </footer>
      </div>
    );
  }
  