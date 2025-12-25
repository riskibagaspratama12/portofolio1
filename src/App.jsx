import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// Single-file React portfolio (App.jsx)
// - TailwindCSS required (v3 or v4)
// - Install: framer-motion
// Usage: put this file in src/App.jsx of a Vite React project

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path d="M3 7.5v9A2.5 2.5 0 0 0 5.5 19h13a2.5 2.5 0 0 0 2.5-2.5v-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 7.5l-9 6-9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function App() {
  // Mobile menu
  const [open, setOpen] = useState(false);
  // scroll-to-top
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 3D tilt logic for hero card
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, (v) => (v / 50));
  const rotateY = useTransform(x, (v) => (v / -50));

  function handlePointer(e) {
    const rect = cardRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(px);
    y.set(py);
  }

  function resetPointer() {
    x.set(0);
    y.set(0);
  }

  const skills = [
    { name: "React", value: 92 },
    { name: "JavaScript", value: 90 },
    { name: "TailwindCSS", value: 94 },
    { name: "TypeScript", value: 76 },
  ];

  const projects = [
    {
      title: "WeatherNow",
      desc: "Realtime weather UI with search autocomplete and offline caching.",
      tags: ["React", "PWA", "API"],
    },
    {
      title: "Docs Studio",
      desc: "Editable component-driven docs with live previews.",
      tags: ["MDX", "Vite", "Design System"],
    },
  ];

  const certificates = [
    { title: "Frontend Web Developer - Example Academy", year: 2024 },
    { title: "React Specialist - Bootcamp Co.", year: 2023 },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#06060a] via-[#071025] to-[#0b1220] text-slate-100 antialiased">
    {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/30 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-pink-500 flex items-center justify-center font-bold text-black">RBP</div>
            <div>
              <div className="font-semibold">Riski Bagas Pratama</div>
              <div className="text-xs text-slate-400">Frontend Developer</div>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 items-center">
            {[
              ["about", "About"],
              ["skills", "Skills"],
              ["projects", "Projects"],
              ["certificates", "Certificates"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                className="text-slate-300 hover:text-white text-sm"
              >
                {label}
              </button>
            ))}
            <a className="text-sm px-3 py-2 bg-indigo-600 rounded-md" href="#contact">Hire me</a>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="p-2 bg-white/5 rounded-md">{open ? "Close" : "Menu"}</button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/5 bg-black/40">
            <div className="px-6 py-4 flex flex-col gap-2">
              {[
                ["about", "About"],
                ["skills", "Skills"],
                ["projects", "Projects"],
                ["certificates", "Certificates"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <button key={id} onClick={() => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }} className="text-left py-2 text-slate-200">
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-20">
        {/* Hero with 3D interactive card */}
        <section id="about" className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Modern web apps with <span className="text-indigo-400">delightful</span> interactions</h1>
            <p className="mt-4 text-slate-300 max-w-xl">I build fast, accessible, and maintainable frontends using React, Tailwind, and pragmatic design systems. I care about performance and the small details that make interfaces feel alive.</p>

            <div className="mt-6 flex gap-3">
              <a href="#projects" className="px-4 py-2 bg-indigo-600 rounded-md text-sm">See projects</a>
              <a href="#contact" className="px-4 py-2 border border-white/5 rounded-md text-sm">Contact</a>
            </div>

            <div className="mt-8 flex gap-4 text-slate-400 text-sm">
              <div className="p-3 bg-white/3 rounded-md">Jakarta, Indonesia</div>
              <div className="p-3 bg-white/3 rounded-md">Available for freelance</div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <motion.div
              ref={cardRef}
              className="relative w-80 h-80 rounded-2xl bg-linear-to-br from-slate-900/70 to-slate-800/60 border border-white/5 shadow-2xl p-6"
              style={{ perspective: 1200 }}
              onPointerMove={handlePointer}
              onPointerLeave={resetPointer}
            >
              <motion.div
                style={{ rotateX, rotateY }}
                className="w-full h-full rounded-xl bg-linear-to-br from-[#0b1220] to-[#071025] p-4 transform-gpu"
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
              >
                <div className="absolute -inset-0.5 rounded-xl bg-linear-to-b from-indigo-500/10 to-transparent blur-xl opacity-40" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg border border-white/6">
                      <img src="src/assets/logo bagas.png" alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">Riski Bagas Pratama</h3>
                    <p className="text-sm text-slate-300 mt-1">Frontend Engineer & Interaction Designer</p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1 bg-white/3 p-3 rounded-lg">
                      <div className="text-xs text-slate-300">Years</div>
                      <div className="font-semibold">3+</div>
                    </div>
                    <div className="flex-1 bg-white/3 p-3 rounded-lg">
                      <div className="text-xs text-slate-300">Projects</div>
                      <div className="font-semibold">12</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* floating highlights */}
              <motion.div className="absolute -right-6 -top-6 w-36 h-20 rounded-lg bg-indigo-600/30 blur-lg" style={{ transform: "rotate(12deg)" }} />
              <motion.div className="absolute -left-8 bottom-6 w-28 h-12 rounded-lg bg-pink-500/20 blur-lg" style={{ transform: "rotate(-6deg)" }} />
            </motion.div>
          </div>
        </section>

        {/* Skills with animated bars and subtle parallax */}
        <section id="skills">
          <h2 className="text-3xl font-bold">Skills</h2>
          <p className="text-slate-400 mt-2 max-w-xl">Technologies and craft I use on a daily basis.</p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {skills.map((s) => (
                <motion.div key={s.name} whileHover={{ scale: 1.02 }} className="bg-slate-800/40 p-4 rounded-xl border border-white/4">
                  <div className="flex justify-between">
                    <div className="font-medium">{s.name}</div>
                    <div className="text-slate-400">{s.value}%</div>
                  </div>
                  <div className="mt-3 w-full bg-slate-900 h-3 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.value}%` }} transition={{ duration: 1.2 }} className="h-3 rounded-full bg-linear-to-r from-indigo-500 to-pink-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-slate-800/30 rounded-xl border border-white/4">
              <h3 className="font-semibold">How I approach projects</h3>
              <ul className="mt-3 text-slate-300 list-disc list-inside">
                <li>Design-first: prototypes, interactions, and accessibility checks</li>
                <li>Small components, composable patterns, and pragmatic testing</li>
                <li>Measure performance and iterate for delight</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects with 3D hover cards */}
        <section id="projects">
          <h2 className="text-3xl font-bold">Selected Projects</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section id="certificates" className="space-y-4">
          <h2 className="text-3xl font-bold">Certificates</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {certificates.map((c) => (
              <motion.div key={c.title} whileHover={{ y: -6 }} className="p-4 bg-slate-800/40 rounded-lg border border-white/4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{c.title}</div>
                    <div className="text-sm text-slate-400">{c.year}</div>
                  </div>
                  <div className="text-slate-300 text-sm">View</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="pb-12">
          <h2 className="text-3xl font-bold">Contact</h2>
          <p className="text-slate-400 mt-2">Interested in working together? Send a message or email me directly.</p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="p-6 bg-slate-800/40 rounded-xl border border-white/4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-indigo-600/20 flex items-center justify-center">BR</div>
                <div>
                  <div className="font-medium">Riski Bagas Pratama</div>
                  <div className="text-sm text-slate-400">Frontend Developer</div>
                </div>
              </div>

              <div className="mt-6 text-slate-300 space-y-3 text-sm">
                <div className="flex items-center gap-3"><IconMail /> <a href="mailto:bagas@example.com" className="text-indigo-300">bagas@example.com</a></div>
                <div>Jakarta, Indonesia</div>
                <div>Open to freelance & full-time</div>
              </div>
            </motion.div>

            <motion.form initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="p-6 bg-slate-800/40 rounded-xl border border-white/4 grid gap-3" onSubmit={(e) => { e.preventDefault(); alert('Thanks! I would wire this to an email endpoint in production.'); }}>
              <input placeholder="Your name" required className="p-3 rounded-md bg-slate-800/30 outline-none" />
              <input placeholder="Your email" required className="p-3 rounded-md bg-slate-800/30 outline-none" />
              <textarea placeholder="Message" required rows={5} className="p-3 rounded-md bg-slate-800/30 outline-none" />
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 rounded-md">Send message</button>
              </div>
            </motion.form>
          </div>
        </section>

        <footer className="text-center text-slate-400 py-6 border-t border-white/5">© {new Date().getFullYear()} Riski Bagas Pratama • Built with React & Tailwind</footer>
      </main>

      {/* scroll to top */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed right-6 bottom-6 p-3 rounded-full bg-indigo-600 shadow-lg">^</button>
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  // simple 3D hover tilt using pointer position
  const ref = useRef();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, (v) => v / 40);
  const rotateY = useTransform(x, (v) => v / -40);

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(px);
    y.set(py);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ rotateX, rotateY }} className="relative bg-linear-to-br from-slate-900/60 to-slate-800/40 p-5 rounded-xl border border-white/4 shadow-lg transform-gpu">
      <div className="text-sm text-slate-400">{project.tags.join(' • ')}</div>
      <h3 className="mt-3 font-semibold text-lg">{project.title}</h3>
      <p className="mt-2 text-slate-300 text-sm">{project.desc}</p>
      <div className="mt-4 flex gap-2">
        <a className="px-3 py-2 bg-indigo-600 rounded-md text-sm">Live</a>
        <a className="px-3 py-2 border border-white/5 rounded-md text-sm">Details</a>
      </div>
    </motion.div>
  );
}
