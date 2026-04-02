const cards = [
  {
    icon: '⚡',
    title: 'AI completion',
    description: 'Context-aware suggestions that understand your whole codebase, not just the current file.',
  },
  {
    icon: '↩',
    title: 'Smart refactoring',
    description: 'One-click structural improvements. Rename, extract, restructure while preserving semantics.',
  },
  {
    icon: '⊕',
    title: 'Real-time collab',
    description: 'Conflict-free multiplayer editing. See every cursor and every change, live.',
  },
  {
    icon: '▪',
    title: 'Built-in terminal',
    description: 'Full PTY terminal with history, autocomplete, and direct code execution.',
  },
]

export default function Landing() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', width: '100%' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        :root{
          --bg:#0a0a0a;--s1:#111111;--s2:#161616;--s3:#1c1c1c;
          --border:#242424;--border2:#2a2a2a;
          --text:#ebebeb;--muted:#666;--subtle:#333;
          --accent:#e8e0d0;--accent2:#c8bfaf;
          --green:#3d9970;
        }
        html, body, #root { margin:0; padding:0; width:100%; min-height:100vh; background:var(--bg); }
        html{scroll-behavior:smooth}
        body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;overflow-x:hidden}

        nav{
          position:fixed;top:0;left:0;right:0;z-index:100;height:58px;
          padding:0 2rem;display:flex;align-items:center;justify-content:space-between;
          background:rgba(10,10,10,.9);border-bottom:1px solid var(--border);
          backdrop-filter:blur(16px);
        }
        .logo{display:flex;align-items:center;gap:9px;font-size:14px;font-weight:600;color:#fff;letter-spacing:-.01em;text-decoration:none}
        .logo-mark{
          width:26px;height:26px;border-radius:6px;border:1px solid var(--border2);
          background:var(--s2);display:flex;align-items:center;justify-content:center;
          font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--accent);
        }
        .nav-r{display:flex;align-items:center;gap:4px}
        .nl{padding:6px 13px;border-radius:6px;font-size:13px;color:var(--muted);cursor:pointer;transition:color .2s,background .2s;text-decoration:none}
        .nl:hover{color:var(--text);background:#ffffff07}
        .btn{
          padding:7px 15px;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;
          background:var(--text);color:#0a0a0a;transition:opacity .2s;text-decoration:none;border:none;display:inline-block;
        }
        .btn:hover{opacity:.85}
        .btn-ghost{background:none;border:1px solid var(--border2);color:var(--text);padding:7px 15px;border-radius:6px;font-size:13px;font-weight:400;cursor:pointer;transition:background .2s;text-decoration:none;display:inline-block}
        .btn-ghost:hover{background:#ffffff07}

        .hero{
          min-height:100vh;width:100%;display:flex;flex-direction:column;
          align-items:center;justify-content:center;
          padding:110px 2rem 80px;text-align:center;
        }
        .badge{
          display:inline-flex;align-items:center;gap:7px;margin-bottom:28px;
          padding:5px 13px 5px 8px;border-radius:99px;
          border:1px solid var(--border2);background:var(--s2);
          font-size:12px;color:var(--muted);
          animation:up .5s ease both;
        }
        .badge-dot{width:6px;height:6px;border-radius:50%;background:var(--green);flex-shrink:0}
        h1{
          font-size:clamp(2.2rem,5.5vw,4.2rem);font-weight:600;
          line-height:1.07;letter-spacing:-.035em;color:#fff;
          max-width:800px;animation:up .55s .08s ease both;
        }
        h1 em{font-style:normal;color:var(--accent2)}
        .sub{
          max-width:460px;margin:22px auto 0;color:var(--muted);
          font-size:15px;line-height:1.7;animation:up .55s .14s ease both;
        }
        .cta-row{
          display:flex;align-items:center;gap:10px;margin-top:36px;
          flex-wrap:wrap;justify-content:center;animation:up .55s .2s ease both;
        }
        .btn-lg{padding:10px 22px;font-size:14px}
        .divider{width:1px;height:32px;background:var(--border)}
        .stats{
          display:flex;align-items:center;gap:28px;margin-top:52px;
          flex-wrap:wrap;justify-content:center;animation:up .55s .26s ease both;
        }
        .stat{text-align:center}
        .sn{font-size:20px;font-weight:600;color:#fff;letter-spacing:-.02em}
        .sl{font-size:11px;color:var(--muted);margin-top:3px}

        .mock-wrap{max-width:820px;margin:60px auto 0;border-radius:12px;overflow:hidden;border:1px solid var(--border2);background:var(--s1);animation:up .6s .32s ease both;width:100%}
        .mock-bar{display:flex;align-items:center;gap:7px;padding:11px 14px;border-bottom:1px solid var(--border);background:#0d0d0d}
        .d{width:9px;height:9px;border-radius:50%}
        .dr{background:#ff5f57}.dy{background:#febc2e}.dg{background:#28c840}
        .tabs{display:flex;gap:2px;margin-left:10px}
        .tab{padding:3px 11px;border-radius:4px;font-size:11.5px;font-family:'JetBrains Mono',monospace;color:var(--muted)}
        .tab.on{background:var(--s3);color:var(--accent)}
        .mock-body{display:flex;height:280px}
        .ln{width:44px;padding:14px 0;background:#0d0d0d;border-right:1px solid var(--border);font-family:'JetBrains Mono',monospace;font-size:11px;color:#2a2a2a;flex-shrink:0}
        .l{height:19px;padding-right:10px;text-align:right;line-height:19px}
        .code{flex:1;padding:14px 16px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:19px;overflow:hidden}
        .kw{color:#c8a882}.fn{color:#d4b896}.st{color:#7db87d}.cm{color:#2e2e2e}.nm{color:#d4956a}.ty{color:#9abfbf}.va{color:var(--text)}
        .cur{display:inline-block;width:2px;height:13px;background:var(--accent);animation:blink 1s infinite;vertical-align:middle;margin-left:1px}
        .term{border-top:1px solid var(--border);padding:10px 14px;background:#080808;font-family:'JetBrains Mono',monospace;font-size:11.5px;color:#7db87d}

        .video-section{width:100%;padding:0 2rem 80px;display:flex;justify-content:center;align-items:center}
        .video-wrap{width:100%;max-width:820px;border-radius:12px;overflow:hidden;border:1px solid var(--border2);background:#000}
        .video-wrap video{width:100%;height:auto;display:block}

        .features{padding:96px 2rem;max-width:1040px;margin:0 auto;width:100%}
        .label{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:500;margin-bottom:14px}
        .ttl{font-size:clamp(1.5rem,3vw,2.2rem);font-weight:600;color:#fff;letter-spacing:-.025em;max-width:480px;line-height:1.15}
        .ttl-sub{color:var(--muted);margin-top:10px;max-width:400px;font-size:14px;line-height:1.65}
        .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:var(--border);border-radius:10px;overflow:hidden;border:1px solid var(--border);margin-top:52px}
        .card{background:var(--s1);padding:26px;transition:background .2s}
        .card:hover{background:var(--s2)}
        .ci{width:32px;height:32px;border-radius:7px;border:1px solid var(--border2);background:var(--s3);display:flex;align-items:center;justify-content:center;font-size:15px;margin-bottom:18px}
        .card h3{font-size:13px;font-weight:500;color:#fff;margin-bottom:6px}
        .card p{font-size:12.5px;color:var(--muted);line-height:1.55}

        .hiw{padding:96px 2rem;max-width:1040px;margin:0 auto;width:100%}
        .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:52px;background:var(--border);border-radius:10px;overflow:hidden;border:1px solid var(--border)}
        .step{background:var(--s1);padding:32px 26px}
        .snum{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--green);margin-bottom:18px;display:block;letter-spacing:.05em}
        .step h3{font-size:14px;font-weight:500;color:#fff;margin-bottom:7px}
        .step p{font-size:13px;color:var(--muted);line-height:1.55}

        .cta-s{padding:72px 2rem 100px;text-align:center;width:100%}
        .cta-box{max-width:620px;margin:0 auto;border-radius:14px;border:1px solid var(--border2);background:var(--s1);padding:60px 44px}
        .cta-box h2{font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:600;color:#fff;letter-spacing:-.025em;margin-bottom:12px}
        .cta-box p{color:var(--muted);margin-bottom:32px;font-size:14px}
        .cta-row2{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}

        footer{border-top:1px solid var(--border);padding:28px 2rem;width:100%;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
        .fl{display:flex;align-items:center;gap:18px}
        .fl a{font-size:12.5px;color:var(--muted);text-decoration:none;transition:color .2s}
        .fl a:hover{color:var(--text)}
        .fr{font-size:12px;color:var(--subtle)}

        .reveal{opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s ease}
        .reveal.on{opacity:1;transform:none}
        @keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @media(max-width:640px){.steps{grid-template-columns:1fr}.divider{display:none}.mock-body{height:200px}}
      `}</style>

      {/* NAV */}
      <nav>
        <a className="logo" href="/">
          <div className="logo-mark">&lt;/&gt;</div>
          Code-lm
        </a>
        <div className="nav-r">
          <a className="nl" href="#">Features</a>
          <a className="nl" href="#">Pricing</a>
          <a className="nl" href="#">Docs</a>
          <a className="nl" href="/login">Sign in</a>
          <a className="btn" href="/signup">Open editor</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="badge">
          <span className="badge-dot" />
          v1.0.4 now available
        </div>

        <h1>Code and collaborate<br /><em>in real time</em></h1>

        <p className="sub">
          The AI-powered editor that connects. High-performance, obsidian-grade
          development experience for modern teams.
        </p>

        <div className="cta-row">
          <a className="btn btn-lg" href="/signup">Start coding</a>
          <a className="btn-ghost btn-lg" href="/login">Try demo</a>
        </div>

        <div className="stats">
          <div className="stat"><div className="sn">12k+</div><div className="sl">Developers</div></div>
          <div className="divider" />
          <div className="stat"><div className="sn">&lt;50ms</div><div className="sl">Sync latency</div></div>
          <div className="divider" />
          <div className="stat"><div className="sn">99.9%</div><div className="sl">Uptime</div></div>
          <div className="divider" />
          <div className="stat"><div className="sn">40+</div><div className="sl">Languages</div></div>
        </div>

        {/* EDITOR MOCKUP */}
        <div className="mock-wrap">
          <div className="mock-bar">
            <div className="d dr" /><div className="d dy" /><div className="d dg" />
            <div className="tabs">
              <div className="tab on">main.ts</div>
              <div className="tab">server.ts</div>
              <div className="tab">utils.ts</div>
            </div>
          </div>
          <div className="mock-body">
            <div className="ln">
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(n => (
                <div className="l" key={n}>{n}</div>
              ))}
            </div>
            <div className="code">
              <div><span className="cm">// real-time collaborative session</span></div>
              <div><span className="kw">import</span> <span className="va">{"{ createSession }"}</span> <span className="kw">from</span> <span className="st">'@code-lm/core'</span></div>
              <div>&nbsp;</div>
              <div><span className="kw">interface</span> <span className="ty">SessionConfig</span> <span className="va">{"{"}</span></div>
              <div>&nbsp;&nbsp;<span className="va">users</span><span className="kw">:</span> <span className="ty">User</span><span className="va">[]</span></div>
              <div>&nbsp;&nbsp;<span className="va">language</span><span className="kw">:</span> <span className="ty">string</span></div>
              <div>&nbsp;&nbsp;<span className="va">aiAssist</span><span className="kw">:</span> <span className="ty">boolean</span></div>
              <div><span className="va">{"}"}</span></div>
              <div>&nbsp;</div>
              <div><span className="kw">async function</span> <span className="fn">main</span><span className="va">{"() {"}</span></div>
              <div>&nbsp;&nbsp;<span className="kw">const</span> <span className="va">session</span> <span className="kw">=</span> <span className="kw">await</span> <span className="fn">createSession</span><span className="va">{"({"}</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="va">language:</span> <span className="st">'typescript'</span><span className="va">,</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="va">aiAssist:</span> <span className="nm">true</span><span className="va">,</span></div>
              <div>&nbsp;&nbsp;<span className="va">{"})"}  <span className="cur" /></span></div>
            </div>
          </div>
          <div className="term">
            <span style={{ color: 'var(--muted)' }}>$ </span>npx code-lm start &nbsp;
            <span style={{ color: 'var(--muted)' }}>·</span>&nbsp;
            <span style={{ color: '#7db87d' }}>✓</span> 3 users connected &nbsp;
            <span style={{ color: 'var(--muted)' }}>·</span>&nbsp; AI ready
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <div className="video-section">
        <div className="video-wrap">
          <video src="video.mp4" autoPlay muted loop playsInline />
        </div>
      </div>

      {/* FEATURES */}
      <section className="  flex flex-col items-center justify-center mt-10 mb-10   ">
        <div className=" text-center text-white">Features</div>
        <h2 className=" text-center">Everything you need to ship faster</h2>
        <p className=" text-center">A professional-grade editor built for the way modern teams actually work.</p>
        <div className="grid grid-cols-4 gap-4">
          {cards.map((f, i) => (
            <div className="card flex flex-col items-center justify-center" key={i}>
              <div className=" text-center text-white">{f.icon}</div>
              <h3 className="text-center text-white">{f.title}</h3>
              <p className="text-center text-white">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="flex flex-col items-center justify-center border mt-10 mb-10 border-gray-300">
        <div style={{ textAlign: 'center' }}>
          <div className="mb-10" style={{ display: 'inline-block' }}>How it works</div>
          <h2 className="ttl" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '360px' }}>
            Three steps to shipping
          </h2>
        </div> 
        <div className="steps flex flex-col items-center justify-center border-2 border-white">
          {[
            { n: '01', t: 'Connect your repo', d: 'Import from GitHub or GitLab, or start a blank project. Ready in seconds.' },
            { n: '02', t: 'Code with your team', d: 'Share a link. Collaborators join instantly. AI suggestions flow for everyone.' },
            { n: '03', t: 'Deploy instantly', d: 'One-click staging or production. Integrated CI/CD with live preview URLs.' },
          ].map((s, i) => (
            <div className="step" key={i} style={i === 1 ? { borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' } : {}}>
              <span className="snum">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center justify-center mt-10">
        <div className="cta-box">
          <h2>Ready to build the future?</h2>
          <p>Join 12,000+ developers who ship faster with Code-lm.</p>
          <div className="cta-row2">
            <a className="btn btn-lg" href="/signup">Get started for free</a>
            <a className="btn-ghost btn-lg" href="/pricing">View pricing</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="fl">
          <a className="logo" href="/">
            <div className="logo-mark">&lt;/&gt;</div>
            Code-lm
          </a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Status</a>
          <a href="#">Docs</a>
        </div>
        <div className="fr">© 2026 Code-lm</div>
      </footer>

      {/* SCROLL REVEAL */}
      <script dangerouslySetInnerHTML={{ __html: `
        const io = new IntersectionObserver(
          e => e.forEach(x => x.isIntersecting && (x.target.classList.add('on'), io.unobserve(x.target))),
          { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach(el => io.observe(el));
      `}} />
    </div>
  );
}