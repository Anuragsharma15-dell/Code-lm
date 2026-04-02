import React, { useEffect } from "react";

export default function DocsPage() {
  useEffect(() => {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((el) => {
      el.addEventListener("click", function () {
        navItems.forEach((x) => x.classList.remove("active"));
        this.classList.add("active");
      });
    });

    const headings = document.querySelectorAll("hr[id]");
    const tocLinks = document.querySelectorAll(".toc-link");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            tocLinks.forEach((l) => {
              l.classList.toggle(
                "text-[#a89880] border-[#a89880]",
                l.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    headings.forEach((h) => observer.observe(h));
  }, []);

  return (
    <div className="flex bg-[#0c0c0c] text-[#e8e8e8] min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-[260px] fixed h-full border-r border-[#222] bg-[#111] flex flex-col overflow-y-auto">
        <div className="flex items-center gap-2 px-5 py-5 border-b border-[#222]">
          <div className="w-6 h-6 border border-[#2a2a2a] rounded flex items-center justify-center text-[9px] text-[#d4c9b8]">
            &lt;/&gt;
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Code-lm</div>
            <div className="text-[10px] text-[#5a5a5a]">Documentation</div>
          </div>
        </div>

        <nav className="text-sm">
          <div className="py-4">
            <div className="px-5 text-[10px] uppercase text-[#5a5a5a] mb-2">Getting Started</div>
            <a href="#introduction" className="nav-item px-5 py-1 block text-[#5a5a5a] hover:text-white">Introduction</a>
            <a href="#installation" className="nav-item px-5 py-1 block text-[#5a5a5a] hover:text-white">Installation</a>
            <a href="#quickstart" className="nav-item px-5 py-1 block text-[#5a5a5a] hover:text-white">Quick start</a>
            <a href="#configuration" className="nav-item px-5 py-1 block text-[#5a5a5a] hover:text-white">Configuration</a>
          </div>
        </nav>

        <div className="mt-auto px-5 py-4 border-t border-[#222] text-xs text-[#5a5a5a]">v1.0.4</div>
      </aside>

      {/* MAIN */}
      <div className="ml-[260px] flex-1">
        <div className="sticky top-0 h-[52px] border-b border-[#222] bg-black/80 backdrop-blur px-8 flex items-center justify-between">
          <div className="bg-[#161616] border border-[#222] px-3 py-1 rounded text-sm text-[#5a5a5a]">
            🔍 Search docs...
          </div>
        </div>

        <div className="max-w-[780px] mx-auto px-8 py-12">
          <h1 className="text-3xl font-semibold text-white mb-3">Code-lm Documentation</h1>
          <p className="text-[#5a5a5a] mb-10">Everything you need to set up Code-lm.</p>

          <hr id="introduction" className="my-10 border-[#222]" />
          <h2 className="text-xl font-semibold mb-3">Introduction</h2>
          <p className="text-[#b0b0b0]">Code-lm is a real-time collaborative editor.</p>

          <hr id="installation" className="my-10 border-[#222]" />
          <h2 className="text-xl font-semibold mb-3">Installation</h2>
          <pre className="bg-[#111] p-4 rounded border border-[#222]">
{`git clone repo
cd project
npm install`}
          </pre>

          <hr id="quickstart" className="my-10 border-[#222]" />
          <h2 className="text-xl font-semibold mb-3">Quick Start</h2>
          <p className="text-[#b0b0b0]">Run backend and frontend.</p>

          <hr id="configuration" className="my-10 border-[#222]" />
          <h2 className="text-xl font-semibold mb-3">Configuration</h2>
          <pre className="bg-[#111] p-4 rounded border border-[#222]">
{`PORT=3000
JWT_SECRET=secret`}
          </pre>
        </div>
      </div>

      {/* TOC */}
      <div className="hidden xl:block fixed right-0 top-[52px] w-[200px] border-l border-[#222] px-5 py-6 text-sm">
        <div className="text-xs uppercase text-[#5a5a5a] mb-3">On this page</div>
        <a href="#introduction" className="toc-link block py-1">Introduction</a>
        <a href="#installation" className="toc-link block py-1">Installation</a>
      </div>
    </div>
  );
}