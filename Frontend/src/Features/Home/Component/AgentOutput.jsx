import React from 'react'
import { Loader2, TrendingUp, ShieldCheck, Trophy } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

const AgentOutput = ({ Response }) => {
    const { agentName, content, score, reason, loading, isWinner } = Response;

    return (
        <div className={`animate-panel border ${isWinner ? 'border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.2)]' : 'border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.3)]'} bg-[#0a0f1c]/40 backdrop-blur-md rounded-[2rem] p-8 relative overflow-hidden group flex flex-col h-full transition-all duration-700 hover:border-cyan-500/30 group/card`}>
            {/* Top accent bar */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isWinner ? 'from-cyan-400 via-blue-500' : (score >= 9 ? 'from-emerald-500 via-cyan-500' : 'from-cyan-500 via-indigo-500')} to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-700`} />
            
            {/* Inner glow effect */}
            <div className={`absolute -top-24 -left-24 w-48 h-48 ${isWinner ? 'bg-cyan-500/10' : 'bg-cyan-500/5'} rounded-full blur-[60px] pointer-events-none group-hover:bg-cyan-500/10 transition-colors duration-700`} />

            <div className="flex justify-between items-center mb-8 relative z-10">
                <div className="flex gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5 shadow-inner">
                    <span className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'} shadow-[0_0_8px_rgba(16,185,129,0.4)]`}></span>
                    <span className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse delay-75' : 'bg-emerald-500'} shadow-[0_0_8px_rgba(16,185,129,0.4)]`}></span>
                    <span className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse delay-150' : 'bg-emerald-500'} shadow-[0_0_8px_rgba(16,185,129,0.4)]`}></span>
                </div>
                {isWinner ? (
                    <div className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase flex items-center gap-2 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-bounce-slow">
                        <Trophy className="w-3.5 h-3.5 fill-current" />
                        ARENA WINNER
                    </div>
                ) : (
                    <div className="text-[10px] font-black tracking-[0.3em] text-cyan-500 uppercase flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full bg-cyan-400 ${loading ? 'animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'shadow-[0_0_4px_rgba(6,182,212,0.4)]'}`} />
                        {loading ? 'GENERATING...' : 'COMPLETED'}
                    </div>
                )}
            </div>

            <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="relative group/avatar">
                        <div className="w-14 h-14 rounded-2xl border border-white/10 bg-[#060a14] flex items-center justify-center p-1.5 shadow-2xl transition-all duration-500 group-hover/avatar:border-cyan-500/40 group-hover/avatar:scale-105">
                            <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${agentName}&backgroundColor=transparent`} alt="Bot" className="w-full h-full" />
                        </div>
                        <span className={`absolute -bottom-1 -right-1 w-4 h-4 ${loading ? 'bg-yellow-500' : 'bg-emerald-500'} rounded-full border-[3px] border-[#0a0f1c] shadow-lg`}></span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <h3 className="text-lg font-black text-white flex items-center gap-2 tracking-tight uppercase group-hover:text-cyan-400 transition-colors duration-500">
                            {agentName}
                        </h3>
                        <div className="flex gap-2.5">
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full tracking-[0.15em] font-black uppercase flex items-center gap-1.5">
                                <ShieldCheck className="w-3 h-3" /> VERIFIED
                            </span>
                            {score && (
                                <span className="text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full tracking-[0.15em] font-black uppercase flex items-center gap-1.5">
                                    <TrendingUp className="w-3 h-3" /> SCORE: {score}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6 text-sm text-gray-300/90 pl-6 border-l border-white/5 group-hover:border-cyan-500/30 transition-colors duration-700 flex-1 py-2 overflow-y-auto custom-scrollbar relative z-10">
                {loading ? (
                    <div className="flex flex-col gap-4 py-2">
                        <div className="h-4 bg-white/5 rounded-full animate-pulse w-full"></div>
                        <div className="h-4 bg-white/5 rounded-full animate-pulse w-[92%]"></div>
                        <div className="h-4 bg-white/5 rounded-full animate-pulse w-[85%]"></div>
                        <div className="h-4 bg-white/5 rounded-full animate-pulse w-[70%]"></div>
                        <div className="flex items-center gap-3 text-[10px] text-gray-500 font-black tracking-[0.3em] uppercase mt-4">
                            <p className="text-gray-600 text-sm font-medium tracking-tight animate-pulse">Processing response...</p>
                        </div>
                    </div>
                ) : content ? (
                    <div className="space-y-6 prose prose-invert prose-sm max-w-none prose-pre:bg-[#060a14] prose-pre:border prose-pre:border-white/5 prose-pre:rounded-2xl">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]} 
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                p: ({node, ...props}) => <p className="leading-relaxed font-medium tracking-tight mb-4 text-gray-300/80" {...props} />,
                                code: ({node, inline, className, children, ...props}) => {
                                    return (
                                        <code className={`${className} bg-white/5 px-2 py-0.5 rounded text-cyan-400 text-[11px] font-black border border-white/5`} {...props}>
                                            {children}
                                        </code>
                                    )
                                },
                                pre: ({node, ...props}) => <pre className="overflow-x-auto p-5 custom-scrollbar shadow-inner" {...props} />,
                                h1: ({node, ...props}) => <h1 className="text-xl font-black text-white mb-4 tracking-tighter uppercase" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-lg font-black text-white/90 mb-3 tracking-tighter uppercase" {...props} />,
                                li: ({node, ...props}) => <li className="mb-2 list-disc ml-4 text-gray-400" {...props} />
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                        {reason && (
                            <div className="mt-8 pt-6 border-t border-white/5 bg-white/[0.01] -mx-6 px-6 rounded-b-[2rem]">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-1 h-1 rounded-full bg-indigo-500" />
                                    <span className="text-[9px] font-black tracking-[0.3em] text-gray-500 uppercase block">EVALUATION ANALYSIS</span>
                                </div>
                                <p className="text-xs text-gray-400 italic leading-relaxed font-medium">"{reason}"</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center h-full gap-4 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                        <p className="text-gray-600 text-sm font-medium tracking-tight">Awaiting prompt...</p>
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-700" />)}
                            </div>
                            <span className="text-[10px] text-gray-600 font-black tracking-[0.4em] uppercase">SYSTEM READY</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AgentOutput
