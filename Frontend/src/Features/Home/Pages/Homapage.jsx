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

  const [winCounts, setWinCounts] = useState(() => JSON.parse(localStorage.getItem("ai_win_counts") || "{}"));
  const lastProcessedResponse = useRef(null);

  useEffect(() => {
    if (response && response.judge && !loading && lastProcessedResponse.current !== response) {
      lastProcessedResponse.current = response;
      const s1 = response.judge.score_1 || 0;
      const s2 = response.judge.score_2 || 0;
      const s3 = response.judge.score_3 || 0;
      
      let winner = null;
      if (s1 >= s2 && s1 >= s3) winner = response.model1;
      else if (s2 >= s1 && s2 >= s3) winner = response.model2;
      else if (s3 >= s1 && s3 >= s2) winner = response.model3;

      if (winner) {
        setWinCounts(prev => {
          const newCounts = { ...prev, [winner.toLowerCase()]: (prev[winner.toLowerCase()] || 0) + 1 };
          localStorage.setItem("ai_win_counts", JSON.stringify(newCounts));
          return newCounts;
        });
      }
    }
  }, [response, loading]);

  const toggleModel = (model) => {
    if (agentCount === 3) return; // Models are fixed in 3X mode
    
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
      className="min-h-screen bg-[#060a14] text-gray-300 font-sans flex overflow-hidden relative selection:bg-cyan-500 selection:text-white grid-bg"
    >
      <div className="bg-glow absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="bg-glow absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse delay-1000" />

      <aside className="w-72 border-r border-white/5 bg-[#0a0f1c]/40 backdrop-blur-2xl flex flex-col z-10 relative shadow-2xl">
        <div className="h-24 flex items-center px-8 border-b border-white/5">
          <div className="flex items-center gap-3 text-cyan-400 font-black tracking-[0.3em] animate-panel group cursor-default">
            <div className="relative">
              <Zap className="w-6 h-6 fill-cyan-400/20 group-hover:fill-cyan-400 transition-all duration-500" />
              <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-20 group-hover:opacity-60 transition-opacity" />
            </div>
            <span className="text-lg">ARENA</span>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-8 flex-1 overflow-y-auto custom-scrollbar">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 animate-panel relative overflow-hidden group transition-all hover:bg-white/10">
            <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-inner">
                <SquareTerminal className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-widest text-white">CONTROL CENTER</span>
                <span className="text-[9px] text-gray-500 font-bold uppercase">System: Online</span>
              </div>
            </div>
          </div>

          <div className="animate-panel space-y-10 mt-2">
            <div>
              <label className="text-gray-500 block mb-5 font-black tracking-[0.3em] text-[9px] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" /> ARENA SETTINGS
              </label>
              <div className="flex gap-3">
                {[2, 3].map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      setAgentCount(count);
                      if (count === 3) {
                        setSelectedModels(["groq", "mystral", "cohere"])
                      } else {
                        setSelectedModels(selectedModels.slice(0, 2));
                      }
                    }}
                    className={`flex-1 py-3 px-4 rounded-xl border text-xs font-black tracking-[0.2em] transition-all duration-500 relative overflow-hidden group ${agentCount === count
                      ? "bg-cyan-500/10 border-cyan-400/50 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                      : "bg-white/5 border-white/10 text-gray-600 hover:border-white/20 hover:text-gray-400"
                      }`}
                  >
                    2 AGENTS
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-gray-500 block mb-5 font-black tracking-[0.3em] text-[9px] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40" /> SELECT MODELS
              </label>
              <div className="flex flex-col gap-3">
                {["groq", "mystral", "cohere"].map((model) => (
                  <div
                    key={model}
                    onClick={() => toggleModel(model)}
                    className={`group relative bg-white/5 border rounded-xl px-4 py-3.5 flex justify-between items-center cursor-pointer transition-all duration-500 hover:scale-[1.02] active:scale-95 ${selectedModels.includes(model)
                      ? "border-cyan-400/40 bg-cyan-500/5 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                      : "border-white/5 hover:border-white/20"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${selectedModels.includes(model) ? "bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" : "bg-gray-800"}`} />
                      <span className={`text-[11px] font-black tracking-[0.15em] transition-colors ${selectedModels.includes(model) ? "text-white" : "text-gray-500 group-hover:text-gray-400"}`}>
                        {model.toUpperCase()}
                      </span>
                    </div>
                    {selectedModels.includes(model) && (
                      <Zap className="w-3.5 h-3.5 text-cyan-400 fill-current opacity-60" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <label className="text-gray-500 block mb-5 font-black tracking-[0.3em] text-[9px] uppercase flex items-center gap-2">
                <Trophy className="w-3 h-3 text-yellow-500/60" /> BATTLE HISTORY
              </label>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(winCounts).length > 0 ? (
                  Object.entries(winCounts).sort((a, b) => b[1] - a[1]).map(([model, count]) => (
                    <div key={model} className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border border-white/5 rounded-lg group/win">
                      <span className="text-[10px] font-black tracking-widest text-gray-400 group-hover/win:text-white transition-colors">{model.toUpperCase()}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black text-cyan-500">{count}</span>
                        <div className="w-1 h-3 bg-cyan-500/20 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-cyan-500 animate-pulse" style={{ height: `${(count / Math.max(...Object.values(winCounts))) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-[9px] text-gray-600 font-bold uppercase italic text-center py-4 border border-dashed border-white/5 rounded-lg">No history recorded</div>
                )}
              </div>
              {Object.keys(winCounts).length > 0 && (
                <button 
                  onClick={() => {
                    setWinCounts({});
                    localStorage.removeItem("ai_win_counts");
                  }}
                  className="w-full text-[8px] font-black tracking-[0.3em] text-gray-600 hover:text-red-400 transition-colors uppercase mt-2"
                >
                  [ CLEAR HISTORY ]
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-white/5">
          <button className="animate-panel w-full bg-white/5 border border-white/10 text-gray-500 text-[11px] font-black py-4 px-6 rounded-xl hover:bg-white/10 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-500 flex items-center justify-center gap-3 tracking-[0.2em] group">
            <Zap className="w-4 h-4 group-hover:fill-current" /> RESET SYSTEM
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden relative custom-scrollbar">
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-12 shrink-0 sticky top-0 bg-[#060a14]/60 backdrop-blur-2xl z-20">
          <nav className="flex gap-10 text-[11px] font-black tracking-[0.2em] uppercase animate-panel">
            <div className="text-white relative pb-2 cursor-default flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              Main Dashboard
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] rounded-full" />
            </div>
            <div className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">History</div>
            <div className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Leaderboard</div>
          </nav>
          <div className="flex items-center gap-8 text-gray-400 animate-panel">
            <div className="flex items-center gap-3 pr-8 border-r border-white/5">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-white tracking-widest uppercase leading-none">PROFILE</span>
                <span className="text-[8px] text-cyan-500 font-bold tracking-widest uppercase">Status: Connected</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] cursor-pointer group">
                <div className="w-full h-full bg-[#060a14] rounded-[10px] flex items-center justify-center text-white transition-all group-hover:bg-transparent">
                  <User className="w-5 h-5" />
                </div>
              </div>
            </div>
            <button onClick={logout} className="hover:text-red-500 transition-all duration-300 transform hover:scale-110 active:scale-90">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto w-full flex flex-col gap-10 flex-1 pb-48">
          <div className="animate-panel bg-[#0f1423]/40 border border-white/5 backdrop-blur-sm rounded-[2.5rem] p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[800px] h-full bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none opacity-50" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-3xl relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase py-1 px-3 bg-cyan-500/10 border border-cyan-500/20 rounded-full">System Live</span>
                <div className="h-px w-20 bg-gradient-to-r from-cyan-500/50 to-transparent" />
              </div>
              <h1 className="text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                Behold the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Ultimate AI</span><br />
                AI Model Comparison <span className="text-white relative">Arena<span className="absolute -bottom-2 left-0 w-full h-1 bg-cyan-500/30 blur-sm" /></span>
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed max-w-2xl font-medium tracking-tight opacity-90">
                Test multiple AI models simultaneously. Evaluate logic, creativity, and execution speed in real-time.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full">
            <div className="w-full">
              <div className={`grid gap-6 ${selectedModels.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
                {selectedModels.map((model, index) => {
                  const modelKey = `model${index + 1}`;
                  const solutionKey = `solution_${index + 1}`;
                  const scoreKey = `score_${index + 1}`;
                  const reasonKey = `reason_${index + 1}`;
                  const score = response?.judge ? response.judge[scoreKey] : null;
                  const isWinner = response?.judge && (
                    (index === 0 && score >= (response.judge.score_2 || 0) && score >= (response.judge.score_3 || 0)) ||
                    (index === 1 && score >= (response.judge.score_1 || 0) && score >= (response.judge.score_3 || 0)) ||
                    (index === 2 && score >= (response.judge.score_1 || 0) && score >= (response.judge.score_2 || 0))
                  );

                  return (
                    <AgentOutput
                      key={model}
                      Response={{
                        agentName: response ? response[modelKey] : model.toUpperCase(),
                        content: response ? response[solutionKey] : null,
                        score: score,
                        reason: response?.judge ? response.judge[reasonKey] : null,
                        loading: loading,
                        isWinner: isWinner
                      }}
                    />
                  );
                })}
                {selectedModels.length === 0 && (
                  <div className="col-span-full min-h-[450px] flex items-center justify-center border-2 border-dashed border-white/5 rounded-[2.5rem] p-24 text-gray-700 text-[11px] font-black tracking-[0.5em] bg-white/[0.02] uppercase group hover:border-cyan-500/20 transition-all duration-700">
                    <div className="flex flex-col items-center gap-8">
                      <div className="relative">
                        <Zap className="w-16 h-16 text-gray-800 transition-all duration-700 group-hover:text-cyan-500/40 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span>AWAITING BATTLE START</span>
                        <div className="h-0.5 w-12 bg-gray-800 group-hover:w-full group-hover:bg-cyan-500/30 transition-all duration-700" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="animate-panel border border-white/5 bg-[#0f1423]/40 backdrop-blur-md rounded-[2.5rem] p-12 flex flex-col lg:flex-row gap-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none blur-3xl" />
              
              <div className="flex-1 max-w-sm">
                <div className="flex items-center justify-between mb-10">
                  <div className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> BATTLE METRICS
                  </div>
                  <div className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1.5 rounded-lg flex gap-2 items-center font-black transition-all hover:bg-cyan-500/20 shadow-lg">
                    <Trophy className="w-4 h-4" /> WINNER: <span className="text-white">
                      {response ? (
                        response.judge?.score_1 >= (response.judge?.score_2 || 0) && response.judge?.score_1 >= (response.judge?.score_3 || 0) ? response.model1.toUpperCase() :
                          response.judge?.score_2 >= (response.judge?.score_3 || 0) ? response.model2.toUpperCase() : response.model3.toUpperCase()
                      ) : (selectedModels[0] || "NULL").toUpperCase()}
                    </span>
                  </div>
                </div>
                <h2 className="text-4xl font-black text-white mb-4 leading-none tracking-tighter uppercase">
                  Battle Result<br />Statistics
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-500 font-black tracking-[0.3em]">EVALUATION SYSTEM v2.0</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
              </div>

              <div className="hidden lg:block w-px bg-white/5" />

              <div className="flex-[2] space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {selectedModels.map((model, idx) => {
                    const scoreKey = `score_${idx + 1}`;
                    const score = response?.judge ? response.judge[scoreKey] : 0;
                    const percentage = (score * 10).toFixed(0);

                    return (
                      <div key={model} className="space-y-5 group/metric">
                        <div className="flex justify-between text-[11px] font-black tracking-[0.2em] text-gray-400 uppercase">
                          <span className="group-hover/metric:text-white transition-colors">{response ? response[`model${idx + 1}`].toUpperCase() : model.toUpperCase()} Reliability</span>
                          <span className={idx === 1 ? "text-purple-400" : "text-cyan-400"}>
                            {score || (idx === 0 ? "9.8" : idx === 1 ? "7.4" : "8.5")}
                          </span>
                        </div>
                        <div className="w-full bg-[#060a14] rounded-full h-2.5 overflow-hidden shadow-inner p-[1px]">
                          <div
                            className={`progress-bar-fill ${idx === 1 ? "bg-gradient-to-r from-purple-600 to-indigo-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]" : "bg-gradient-to-r from-cyan-600 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"} h-full rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: response ? `${percentage}%` : (idx === 0 ? "98%" : idx === 1 ? "74%" : "85%") }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-[#060a14]/60 border border-white/5 rounded-3xl p-8 mt-10 shadow-2xl relative overflow-hidden group/summary">
                  <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/[0.02] opacity-0 group-hover/summary:opacity-100 transition-opacity" />
                  <div className="text-[10px] font-black tracking-[0.4em] text-gray-600 mb-6 uppercase flex items-center gap-3">
                    JUDGE'S ANALYSIS
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <div className="space-y-6 relative z-10">
                    {response?.judge ? (
                      selectedModels.map((model, idx) => {
                        const score = response.judge[`score_${idx + 1}`];
                        const reason = response.judge[`reason_${idx + 1}`];
                        const modelName = response[`model${idx + 1}`];
                        return (
                          <div key={idx} className="border-l-2 border-white/10 pl-6 py-2 hover:border-cyan-500/50 transition-colors">
                            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-2 block">
                              {modelName.toUpperCase()} :: SCORE {score}/10
                            </span>
                            <p className="text-sm text-gray-400 leading-relaxed italic font-medium tracking-tight">
                              "{reason}"
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col gap-4 py-4 opacity-50">
                        <p className="text-sm text-gray-500 leading-relaxed italic font-medium tracking-tight">
                          "Awaiting results... Final analysis will be generated here once models complete their tasks."
                        </p>
                        <div className="flex gap-1">
                          {[1, 2, 3].map(i => <div key={i} className="w-8 h-1 bg-gray-800 rounded-full" />)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden lg:block w-px bg-white/5" />

              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white/[0.02] rounded-[2rem] border border-white/5">
                <div className="relative w-48 h-48 flex items-center justify-center winner-circle rounded-full transition-all duration-700">
                  <svg className="w-full h-full transform -rotate-90 scale-110" viewBox="0 0 100 100">
                    <circle className="text-white/5 stroke-current" strokeWidth="3" cx="50" cy="50" r="44" fill="transparent"></circle>
                    <circle
                      className="text-cyan-500 progress-bar-fill stroke-current drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all duration-1000 ease-in-out"
                      strokeWidth="4"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="44"
                      fill="transparent"
                      strokeDasharray="276.46"
                      strokeDashoffset={response ? 276.46 - (276.46 * (Math.max(response.judge.score_1, response.judge.score_2, response.judge.score_3 || 0) * 10) / 100) : 13.82}
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl font-black text-white tracking-tighter mb-1">
                      {response ? `${(Math.max(response.judge.score_1, response.judge.score_2, response.judge.score_3 || 0) * 10)}%` : "95%"}
                    </div>
                    <div className="text-[9px] text-cyan-400 tracking-[0.3em] font-black px-3 py-1 bg-cyan-900/40 rounded-full border border-cyan-500/20 shadow-lg">AVG SCORE</div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <span className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase">Efficiency Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-72 right-0 p-10 flex justify-center z-40 pointer-events-none">
          <div className="w-full max-w-5xl bg-[#0a0f1c]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-[0_-20px_80px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.1)] pointer-events-auto flex gap-6 items-end animate-panel group/input">
            <div className="flex-1 relative">
              <div className="absolute -top-3 left-6 bg-[#060a14] text-[9px] px-3 py-1 rounded-full border border-white/10 text-cyan-400 font-black tracking-[0.3em] uppercase shadow-lg z-10">PROMPT INPUT</div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows="1"
                className="w-full max-h-48 bg-[#060a14]/60 border border-white/5 rounded-2xl p-5 pr-12 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/40 focus:ring-4 focus:ring-cyan-500/5 resize-none transition-all shadow-inner custom-scrollbar font-medium tracking-tight"
                placeholder="Enter your prompt here..."
              ></textarea>
              <div className="absolute right-4 bottom-4 w-2 h-2 rounded-full bg-gray-800 group-focus-within/input:bg-cyan-500 group-focus-within/input:shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-500" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-[#060a14] h-[64px] px-10 rounded-[1.25rem] font-black text-xs tracking-[0.3em] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-4">
                {loading ? (
                  <>
                    PROCESSING... <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    START BATTLE <Zap className="w-5 h-5 fill-current" />
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
