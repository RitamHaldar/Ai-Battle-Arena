import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Bell,
  Settings,
  User,
  Zap,
  SquareTerminal,
  Brain,
  MessageSquare,
  Activity,
  History,
  Target,
  Trophy,
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Award,
} from "lucide-react";

export default function Homepage() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Background pulsing
      gsap.to(".bg-glow", {
        opacity: 0.6,
        scale: 1.1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Staggered load in for main panels
      gsap.from(".animate-panel", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.from(".animate-sidebar-item", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Hover effects handles natively by Tailwind, but let's add a pulse to the winner circle
      gsap.to(".winner-circle", {
        boxShadow: "0 0 20px 5px rgba(6, 182, 212, 0.4)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Animate progress bars
      gsap.from(".progress-bar-fill", {
        width: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 1
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#060a14] text-gray-300 font-sans flex overflow-hidden relative selection:bg-cyan-500 selection:text-white"
    >
      {/* Background ambient light */}
      <div className="bg-glow absolute top-[20%] left-[30%] w-96 h-96 bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="bg-glow absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-gray-800/50 bg-[#0a0f1c]/80 backdrop-blur-xl flex flex-col z-10 relative">
        <div className="h-20 flex items-center px-6 border-b border-gray-800/50">
          <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-widest animate-panel">
            <Zap className="w-5 h-5" /> ETHER_VOID
          </div>
        </div>

        <div className="p-4 flex flex-col gap-6 flex-1">
          {/* Active Unit Badge */}
          <div className="bg-[#12182b] border border-gray-800 rounded-lg p-3 animate-panel relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <SquareTerminal className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">SENTIENT_VOID</p>
                <p className="text-gray-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_theme(colors.emerald.500)]" />
                  SYSTEM ACTIVE
                </p>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {["ARENA", "ARMORY", "RANKINGS", "LOGS"].map((item, idx) => (
              <button
                key={item}
                className={`animate-sidebar-item flex items-center px-4 py-3 rounded-lg text-sm tracking-widest font-medium transition-all ${
                  idx === 0
                    ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400"
                    : "text-gray-500 hover:text-gray-300 hover:bg-[#12182b]"
                }`}
              >
                {idx === 0 && <Target className="w-4 h-4 mr-3" />}
                {idx === 1 && <Brain className="w-4 h-4 mr-3" />}
                {idx === 2 && <Trophy className="w-4 h-4 mr-3" />}
                {idx === 3 && <History className="w-4 h-4 mr-3" />}
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <button className="animate-panel w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-[#060a14] font-bold py-3 px-4 rounded hover:shadow-[0_0_20px_theme(colors.cyan.500/40)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" /> DEPLOY UNIT
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden relative">
        {/* HEADER */}
        <header className="h-20 border-b border-gray-800/50 flex items-center justify-between px-10 shrink-0 sticky top-0 bg-[#060a14]/90 backdrop-blur-md z-20">
          <nav className="flex gap-8 text-sm font-medium animate-panel">
            {["Home", "Battles", "Leaderboard", "History", "Pricing"].map((item, idx) => (
              <a
                href="#"
                key={item}
                className={`hover:text-white transition-colors relative pb-1 ${
                  idx === 1 ? "text-white" : "text-gray-500"
                }`}
              >
                {item}
                {idx === 1 && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_8px_theme(colors.cyan.400)] rounded-full animate-pulse" />
                )}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5 text-gray-400 animate-panel">
            <button className="hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-pink-500" />
            </button>
            <button className="hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white cursor-pointer border border-gray-700">
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-10 max-w-7xl mx-auto w-full flex flex-col gap-8 flex-1">
          {/* Welcome Banner */}
          <div className="animate-panel bg-[#0f1423] border border-gray-800/80 rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-cyan-900/20 to-transparent pointer-events-none" />
            <div className="max-w-2xl relative z-10">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                Battle <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">Multiple AI Agents</span> and<br />
                Find the <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Best Answer</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl">
                Deploy your prompts into the ether. Witness our sentient judge analyze,
                score, and determine which model reigns supreme in clarity and logic.
              </p>
              <button className="bg-cyan-400 text-black px-6 py-3 rounded font-bold hover:bg-cyan-300 transition-all flex items-center gap-2 hover:shadow-[0_0_20px_theme(colors.cyan.400/50)]">
                <Zap className="w-5 h-5" /> Start New Battle
              </button>
            </div>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Col 1: Prompt Input */}
            <div className="animate-panel col-span-1 border border-gray-800/60 bg-[#0a0f1c]/50 rounded-xl p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold tracking-wider text-gray-300">
                <Activity className="w-4 h-4 text-cyan-400" /> YOUR PROMPT
              </div>
              <textarea
                className="w-full h-48 bg-[#060910] border border-gray-800 rounded-lg p-4 text-sm text-gray-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 resize-none mb-6 transition-all shadow-inner shadow-black/50"
                placeholder="Enter your complex query here..."
              ></textarea>

              <div className="space-y-4 text-xs mb-6 flex-1">
                <div>
                  <label className="text-gray-500 block mb-2 font-medium tracking-wide">AGENT COUNT</label>
                  <div className="bg-[#12182b] border border-gray-800 rounded px-3 py-2.5 flex justify-between items-center cursor-pointer hover:border-gray-600 transition-colors">
                    <span>2 Agents (Duo Duel)</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="text-gray-500 block mb-2 font-medium tracking-wide">RESPONSE STYLE</label>
                  <div className="bg-[#12182b] border border-gray-800 rounded px-3 py-2.5 flex justify-between items-center cursor-pointer hover:border-gray-600 transition-colors">
                    <span>Technical & Concise</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-gray-400">Anonymous Mode</span>
                  <div className="w-10 h-5 bg-cyan-900 rounded-full relative cursor-pointer border border-cyan-800">
                    <div className="absolute right-1 top-[2px] w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_5px_theme(colors.cyan.400)]" />
                  </div>
                </div>
              </div>

              <button className="w-full border border-gray-700 text-gray-300 font-medium py-3 rounded hover:bg-[#12182b] hover:text-white transition-all flex items-center justify-center gap-2 group">
                RUN BATTLE <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Col 2: The Fight Arena */}
            <div className="col-span-2 flex flex-col gap-6">
              {/* Cards row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Agent 1 */}
                <div className="animate-panel border border-gray-800/60 bg-[#0f1423] rounded-xl p-5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent" />
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded border border-gray-700 bg-[#0a0f1c] flex items-center justify-center p-1">
                          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=gpt&backgroundColor=transparent" alt="Bot" className="w-full h-full" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0f1423]"></span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          GPT_CORE_v4
                        </h3>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[10px] bg-emerald-900/40 text-emerald-400 px-1.5 py-0.5 rounded tracking-wider">LLM-01</span>
                          <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded tracking-wider">HEURISTIC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-6 min-h-[60px] italic">
                    "Analyzing the parameters of your request..."
                  </p>
                  <div className="mb-4">
                    <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-1.5 rounded-full progress-bar-fill w-[85%] shadow-[0_0_10px_theme(colors.emerald.400)]"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-medium tracking-wide">
                      <span>PROCESSING STREAM</span>
                      <span className="text-emerald-400">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between border-t border-gray-800/80 pt-4 mt-auto">
                    <div className="text-center">
                      <div className="text-white font-bold text-sm">1,240</div>
                      <div className="text-[9px] text-gray-500 tracking-wider">TOKENS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-sm">0.8s</div>
                      <div className="text-[9px] text-gray-500 tracking-wider">SPEED</div>
                    </div>
                    <div className="text-center">
                      <div className="text-emerald-400 font-bold text-sm">98.2</div>
                      <div className="text-[9px] text-gray-500 tracking-wider">CONF.</div>
                    </div>
                  </div>
                </div>

                {/* Agent 2 */}
                <div className="animate-panel border border-gray-800/60 bg-[#0f1423] rounded-xl p-5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent" />
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                         <div className="w-10 h-10 rounded border border-gray-700 bg-[#0a0f1c] flex items-center justify-center p-1">
                          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=claude&backgroundColor=transparent" alt="Bot" className="w-full h-full" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-[#0f1423]"></span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          CLAUDE_NEO
                        </h3>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[10px] bg-purple-900/40 text-purple-400 px-1.5 py-0.5 rounded tracking-wider">LLM-02</span>
                          <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded tracking-wider">SEMANTIC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-6 min-h-[60px] italic">
                    "Synthesis complete. Formulating multifaceted response based on logical notes..."
                  </p>
                  <div className="flex justify-between border-t border-gray-800/80 pt-4 mt-auto opacity-70">
                    <div className="text-center">
                      <div className="text-white font-bold text-sm">982</div>
                      <div className="text-[9px] text-gray-500 tracking-wider">TOKENS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-sm">1.2s</div>
                      <div className="text-[9px] text-gray-500 tracking-wider">SPEED</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 font-bold text-sm">94.5</div>
                      <div className="text-[9px] text-gray-500 tracking-wider">CONF.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Section */}
              <div className="animate-panel flex-1 border border-gray-800/60 bg-[#0a0f1c]/50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse delay-75"></span>
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse delay-150"></span>
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-cyan-500 uppercase">
                    Live Arena Feedback
                  </div>
                </div>
                <div className="space-y-4 text-sm text-gray-300 pl-4 border-l-2 border-gray-800">
                  <p>
                    According to the latest sentient protocols, the proposed solution involves a decentralized mesh network of AI nodes operating on the ETHER layer. This ensures that no single point of failure can destabilize the arena environment...
                  </p>
                  <p className="text-gray-500">
                    Comparatively, the alternative approach suggests a linear cascade of processing which prioritize speed over structural integrity. While 15% faster, it risks a 12% increase in semantic drift during long-form battles.
                  </p>
                </div>
              </div>
            </div>

            {/* Col 3: Evaluation */}
            <div className="animate-panel col-span-1 border border-gray-800/60 bg-[#0f1423] rounded-xl p-6 flex flex-col relative overflow-hidden">
               {/* Background subtle effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-8">
                <div className="text-[10px] font-bold tracking-widest text-gray-500">COMBAT RESULT</div>
                <div className="text-[10px] bg-indigo-900/40 text-indigo-300 border border-indigo-500/30 px-2 py-1 rounded-full flex gap-1 items-center font-bold">
                  WINNER: <span className="text-white">GPT_CORE</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-8">Judge<br/>Evaluation</h2>

              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex justify-between text-[10px] font-bold tracking-widest text-gray-400 mb-2">
                    <span>ACCURACY</span>
                    <span className="text-cyan-400">9.8</span>
                  </div>
                  <div className="w-full bg-[#0a0f1c] rounded-full h-1.5 overflow-hidden">
                    <div className="progress-bar-fill w-[98%] bg-cyan-400 h-1.5 rounded-full shadow-[0_0_8px_theme(colors.cyan.400)]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold tracking-widest text-gray-400 mb-2">
                    <span>CREATIVITY</span>
                    <span className="text-purple-400">7.4</span>
                  </div>
                  <div className="w-full bg-[#0a0f1c] rounded-full h-1.5 overflow-hidden">
                     <div className="progress-bar-fill w-[74%] bg-purple-400 h-1.5 rounded-full shadow-[0_0_8px_theme(colors.purple.400)]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold tracking-widest text-gray-400 mb-2">
                    <span>RELEVANCE</span>
                    <span className="text-cyan-400">9.2</span>
                  </div>
                  <div className="w-full bg-[#0a0f1c] rounded-full h-1.5 overflow-hidden">
                     <div className="progress-bar-fill w-[92%] bg-cyan-400 h-1.5 rounded-full shadow-[0_0_8px_theme(colors.cyan.400)]"></div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0f1c]/50 border border-gray-800 rounded-lg p-5 mb-8">
                <div className="text-[10px] font-bold tracking-widest text-gray-500 mb-3">SENTIENT SUMMARY</div>
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  "GPT_CORE demonstrated superior logical cohesion and adhered strictly to the technical constraints provided. Claude_Neo's response was poetic but lacked the granular data required for this specific tactical request."
                </p>
              </div>

              <div className="mt-auto flex justify-center">
                {/* Circular chart visual approximation */}
                <div className="relative w-32 h-32 flex items-center justify-center winner-circle rounded-full transition-shadow duration-300">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle className="text-gray-800 stroke-current" strokeWidth="6" cx="50" cy="50" r="40" fill="transparent"></circle>
                    <circle className="text-cyan-400 progress-bar-fill stroke-current drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" strokeWidth="6" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="12.56"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white shadow-black drop-shadow-md">95%</span>
                    <span className="text-[8px] text-cyan-400 tracking-widest mt-1 uppercase font-bold">Best Match</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Logs */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-6 animate-panel group">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-bold text-white">Recent Skirmishes</h2>
              </div>
              <a href="#" className="text-xs font-bold tracking-widest text-cyan-500 flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                VIEW GLOBAL LOG <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Python Optimization Logic", model: "GPT_CORE", score: "9.8", time: "2m ago", icon: SquareTerminal },
                { title: "Sci-Fi Short Story Prompt", model: "CLAUDE_NEO", score: "8.9", time: "18m ago", icon: Target },
                { title: "System Architecture Review", model: "GPT_CORE", score: "9.5", time: "42m ago", icon: LayoutDashboard => <div className="w-4 h-4 bg-cyan-500 rounded-sm" /> }
              ].map((log, i) => (
                <div key={i} className="animate-panel bg-[#0f1423] border border-gray-800/60 rounded-xl p-5 hover:border-cyan-500/30 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-8 h-8 rounded bg-[#1a2133] border border-gray-700 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                      <SquareTerminal className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-gray-500 tracking-wider">
                      {log.time}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-4 line-clamp-1">{log.title}</h4>
                  <div className="flex justify-between text-xs font-medium">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <div className="w-4 h-4 rounded-full bg-gray-700 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${log.model}`} alt="" className="w-full h-full" />
                      </div>
                      {log.model}
                    </div>
                    <span className={log.score > 9 ? "text-cyan-400" : "text-purple-400"}>Score: {log.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-8 border-t border-gray-800/40 text-center animate-panel flex flex-col items-center gap-4">
            <div className="text-cyan-500 font-bold tracking-widest text-sm flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" /> ETHER_VOID
            </div>
            <div className="flex gap-6 text-[11px] text-gray-500 font-medium tracking-wide">
              <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Engagement</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Protocol</a>
            </div>
            <p className="text-[10px] text-gray-600 tracking-widest">
              © 2024 SENTIENT VOID OS. ALL RIGHTS RESERVED.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
