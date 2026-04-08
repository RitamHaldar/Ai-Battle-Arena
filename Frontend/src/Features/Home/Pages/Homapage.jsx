import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { User, Zap, SquareTerminal, LogOut, Trophy, Loader2 } from "lucide-react";
import AgentOutput from "../Component/AgentOutput";
import { useAuth } from "../../Auth/Hooks/useAuth";
import { useHome } from "../Hooks/useHome";
import { useSelector } from "react-redux";
export default function Homepage() {
  const { logout } = useAuth()
  const { handleGetresposne } = useHome()
  const { response, loading } = useSelector(state => state.home)
  const containerRef = useRef(null);
  const [selectedModels, setSelectedModels] = useState([]);
  const [agentCount, setAgentCount] = useState(2);
  const [prompt, setPrompt] = useState("");

  const toggleModel = (model) => {
    if (agentCount === 3) {
      setSelectedModels(["groq", "mystral", "cohere"]);
    }
    setSelectedModels((prev) => {
      if (prev.includes(model)) {
        return prev.filter((m) => m !== model);
      }
      if (prev.length < agentCount) {
        return [...prev, model];
      }
      return prev;
    });
  };
  async function handleSubmit() {
    if (selectedModels.length < agentCount) {
      alert(`Please select exactly ${agentCount} agents.`);
      return;
    }
    const message = prompt
    setPrompt("")
    await handleGetresposne(
      message,
      agentCount,
      selectedModels[0].toLowerCase(),
      selectedModels[1].toLowerCase(),
      (selectedModels[2] || "none").toLowerCase()
    );
  }
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".bg-glow", {
        opacity: 0.6,
        scale: 1.1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.from(".animate-panel", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.to(".winner-circle", {
        boxShadow: "0 0 20px 5px rgba(6, 182, 212, 0.4)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

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
      <div className="bg-glow absolute top-[20%] left-[30%] w-96 h-96 bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="bg-glow absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      <aside className="w-64 border-r border-gray-800/50 bg-[#0a0f1c]/80 backdrop-blur-xl flex flex-col z-10 relative">
        <div className="h-20 flex items-center px-6 border-b border-gray-800/50">
          <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-widest animate-panel">
            <Zap className="w-5 h-5" /> AI_BATTLE_ARENA
          </div>
        </div>

        <div className="p-4 flex flex-col gap-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="bg-[#12182b] border border-gray-800 rounded-lg p-3 animate-panel relative overflow-hidden group mb-2">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <SquareTerminal className="w-4 h-4" />
              </div>
              Arena
            </div>
          </div>

          <div className="animate-panel space-y-8 mt-4 px-1">
            <div>
              <label className="text-gray-500 block mb-4 font-medium tracking-[0.2em] text-[8px] uppercase">ARENA.CAPACITY</label>
              <div className="flex gap-2">
                {[2, 3].map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      setAgentCount(count);
                      if (selectedModels.length > count) {
                        setSelectedModels(selectedModels.slice(0, count));
                      }
                      if (count === 3) {
                        setSelectedModels(["groq", "mystral", "cohere"])
                      }
                    }}
                    className={`flex-1 py-1.5 px-2 rounded border text-[9px] font-bold tracking-widest transition-all duration-300 ${agentCount === count
                      ? "bg-cyan-500/10 border-cyan-400/60 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                      : "bg-[#060a14] border-gray-800/60 text-gray-600 hover:border-gray-700"
                      }`}
                  >
                    {count}X
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-800/40 pt-8">
              <label className="text-gray-500 block mb-4 font-medium tracking-[0.2em] text-[8px] uppercase italic">ACTIVE_MODELS</label>
              <div className="flex flex-col gap-2">
                {["groq", "mystral", "cohere"].map((model) => (
                  <div
                    key={model}
                    onClick={() => {
                      if (agentCount !== 3) {
                        toggleModel(model)
                      }
                    }}
                    className={`group relative bg-[#060a14] border rounded-lg px-3 py-2.5 flex justify-between items-center cursor-pointer transition-all duration-300 ${selectedModels.includes(model)
                      ? "border-cyan-400/40 bg-cyan-500/5 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
                      : "border-gray-800/60 hover:border-gray-700"
                      }`}
                  >
                    <span className={`text-[10px] font-bold tracking-widest transition-colors ${selectedModels.includes(model) ? "text-cyan-400" : "text-gray-600 group-hover:text-gray-500"}`}>
                      {model.toUpperCase()}
                    </span>
                    {selectedModels.includes(model) && (
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_theme(colors.cyan.400)]" />
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[8px] text-gray-700 tracking-wider">SELECT EXACTLY {agentCount} AGENTS</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-800/40">
          <button className="animate-panel w-full bg-[#12182b] border border-gray-800 text-gray-500 text-[10px] font-bold py-2.5 px-4 rounded hover:bg-[#1a213a] hover:text-cyan-400 transition-all duration-300 flex items-center justify-center gap-2 tracking-widest">
            <Zap className="w-3 h-3" /> DEPLOY_INIT
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden relative">
        <header className="h-20 border-b border-gray-800/50 flex items-center justify-between px-10 shrink-0 sticky top-0 bg-[#060a14]/90 backdrop-blur-md z-20">
          <nav className="flex gap-8 text-sm font-medium animate-panel">
            <div
              className={`hover:text-white transition-colors relative pb-1 text-gray-500`}
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_8px_theme(colors.cyan.400)] rounded-full animate-pulse" />
            </div>
          </nav>
          <div className="flex items-center gap-5 text-gray-400 animate-panel">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white cursor-pointer border border-gray-700">
              <User className="w-4 h-4" />
            </div>
            <button onClick={logout} className="hover:text-red-500 transition-colors">
              <LogOut />
            </button>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full flex flex-col gap-8 flex-1 pb-44">
          <div className="animate-panel bg-[#0f1423] border border-gray-800/80 rounded-2xl p-10 relative overflow-hidden mb-2">
            <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-cyan-900/20 to-transparent pointer-events-none" />
            <div className="max-w-2xl relative z-10">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
                Battle <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">Multiple AI Agents</span> and<br />
                Find the <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Best Answer</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl opacity-80">Deploy your prompts. Let our AI judge score every response and reveal which model truly wins on logic, clarity, and performance.</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <div className="w-full">
              <div className={`grid gap-4 ${selectedModels.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
                {selectedModels.map((model, index) => {
                  const modelKey = `model${index + 1}`;
                  const solutionKey = `solution_${index + 1}`;
                  const scoreKey = `score_${index + 1}`;
                  const reasonKey = `reason_${index + 1}`;

                  return (
                    <AgentOutput
                      key={model}
                      Response={{
                        agentName: response ? response[modelKey] : model.toUpperCase(),
                        content: response ? response[solutionKey] : null,
                        score: response?.judge ? response.judge[scoreKey] : null,
                        reason: response?.judge ? response.judge[reasonKey] : null,
                        loading: loading
                      }}
                    />
                  );
                })}
                {selectedModels.length === 0 && (
                  <div className="col-span-full min-h-[400px] flex items-center justify-center border border-dashed border-gray-800/30 rounded-xl p-20 text-gray-700 text-[10px] font-black tracking-[0.4em] bg-gray-900/5 uppercase">
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <Zap className="w-10 h-10 text-gray-800 animate-pulse" />
                        <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-10 animate-pulse" />
                      </div>
                      AWAITING_ARENA_INITIALIZATION
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="animate-panel border border-gray-800/60 bg-[#0f1423] rounded-xl p-8 flex flex-col md:flex-row gap-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-indigo-900/10 to-transparent pointer-events-none blur-3xl opacity-50" />

              <div className="flex-1 max-w-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">COMBAT RESULT</div>
                  <div className="text-[9px] bg-cyan-900/40 text-cyan-400 border border-cyan-500/30 px-2 py-1 rounded flex gap-2 items-center font-black transition-all hover:bg-cyan-900/60">
                    <Trophy className="w-3.5 h-3.5" /> WINNER: <span className="text-white">
                      {response ? (
                        response.judge?.score_1 >= (response.judge?.score_2 || 0) && response.judge?.score_1 >= (response.judge?.score_3 || 0) ? response.model1.toUpperCase() :
                          response.judge?.score_2 >= (response.judge?.score_3 || 0) ? response.model2.toUpperCase() : response.model3.toUpperCase()
                      ) : (selectedModels[0] || "NULL").toUpperCase()}
                    </span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 leading-tight tracking-tight uppercase">
                  Arena_Combat<br />Metrics_Log
                </h2>
                <p className="text-xs text-gray-500 font-bold tracking-widest">JUDGE_SENTIENT_V.2.0.4</p>
              </div>

              <div className="w-full md:w-px bg-gray-800/50" />

              <div className="flex-[2] space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {selectedModels.map((model, idx) => {
                    const scoreKey = `score_${idx + 1}`;
                    const score = response?.judge ? response.judge[scoreKey] : 0;
                    const percentage = (score * 10).toFixed(0);

                    return (
                      <div key={model} className="space-y-4">
                        <div className="flex justify-between text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                          <span>{response ? response[`model${idx + 1}`].toUpperCase() : model.toUpperCase()} Reliability</span>
                          <span className={idx === 1 ? "text-purple-400" : "text-cyan-400"}>
                            {score || (idx === 0 ? "9.8" : idx === 1 ? "7.4" : "8.5")}
                          </span>
                        </div>
                        <div className="w-full bg-[#060a14] rounded-full h-2 overflow-hidden shadow-inner shadow-black">
                          <div
                            className={`progress-bar-fill ${idx === 1 ? "bg-purple-500 shadow-[0_0_10px_theme(colors.purple.500)]" : "bg-cyan-500 shadow-[0_0_10px_theme(colors.cyan.500)]"} h-2 rounded-full transition-all duration-1000`}
                            style={{ width: response ? `${percentage}%` : (idx === 0 ? "98%" : idx === 1 ? "74%" : "85%") }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-[#060a14]/60 border border-gray-800/60 rounded-xl p-6 mt-8 shadow-inner shadow-black/80">
                  <div className="text-[9px] font-black tracking-[0.3em] text-gray-600 mb-4 uppercase">SENTIENT_VIRTUAL_SUMMARY</div>
                  <div className="space-y-4">
                    {response?.judge ? (
                      selectedModels.map((model, idx) => {
                        const score = response.judge[`score_${idx + 1}`];
                        const reason = response.judge[`reason_${idx + 1}`];
                        const modelName = response[`model${idx + 1}`];
                        return (
                          <div key={idx} className="border-l-2 border-gray-800 pl-4 py-1">
                            <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-1 block">
                              {modelName.toUpperCase()} :: SCORE {score}/10
                            </span>
                            <p className="text-xs text-gray-400 leading-relaxed italic font-medium">
                              "{reason}"
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-xs text-gray-500 leading-relaxed italic font-medium opacity-50">
                        "Awaiting combat data... Post-execution analysis will be rendered here upon final throughput validation."
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-px bg-gray-800/50" />

              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="relative w-40 h-40 flex items-center justify-center winner-circle rounded-full transition-shadow duration-300">
                  <svg className="w-full h-full transform -rotate-90 scale-110" viewBox="0 0 100 100">
                    <circle className="text-gray-900 stroke-current" strokeWidth="4" cx="50" cy="50" r="42" fill="transparent"></circle>
                    <circle
                      className="text-cyan-400 progress-bar-fill stroke-current drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-1000"
                      strokeWidth="5"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      strokeDasharray="263.8"
                      strokeDashoffset={response ? 263.8 - (263.8 * (Math.max(response.judge.score_1, response.judge.score_2, response.judge.score_3 || 0) * 10) / 100) : 13.19}
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl font-black text-white tracking-tighter">
                      {response ? `${(Math.max(response.judge.score_1, response.judge.score_2, response.judge.score_3 || 0) * 10)}%` : "95%"}
                    </div>
                    <div className="text-[8px] text-cyan-400 tracking-[0.2em] mt-1.5 uppercase font-black px-2 py-0.5 bg-cyan-900/30 rounded">BEST_SYNC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-64 right-0 p-8 flex justify-center z-40 pointer-events-none">
          <div className="w-full max-w-4xl bg-[#0a0f1c]/90 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 shadow-[0_-20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(6,182,212,0.1)] pointer-events-auto flex gap-4 items-end animate-panel">
            <div className="flex-1 relative">
              <div className="absolute -top-3 left-4 bg-gray-900 text-[8px] px-2 py-0.5 rounded border border-gray-800 text-cyan-400 font-bold tracking-widest uppercase">TACTICAL_INPUT</div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows="1"
                className="w-full max-h-40 bg-[#060910] border border-gray-800/80 rounded-xl p-4 text-sm text-gray-200 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 resize-none transition-all shadow-inner shadow-black/80"
                placeholder="Initialize sentient query..."
              ></textarea>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#060a14] h-[52px] px-8 rounded-xl font-black text-xs tracking-[0.2em] hover:shadow-[0_0_30px_theme(colors.cyan.500/40)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  RUNNING... <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  RUN_BATTLE <Zap className="w-4 h-4 fill-current group-hover:animate-pulse" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
