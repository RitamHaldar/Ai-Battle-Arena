import React from 'react'
import { Loader2, TrendingUp, ShieldCheck } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

const AgentOutput = ({ Response }) => {
    const { agentName, content, score, reason, loading } = Response;

    return (
        <div className="animate-panel border border-gray-800/60 bg-[#0a0f1c]/50 backdrop-blur-sm rounded-xl p-6 relative overflow-hidden group flex flex-col h-full transition-all duration-500 hover:border-cyan-500/30">
            <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${score >= 9 ? 'from-emerald-500 via-cyan-500' : 'from-cyan-500 via-indigo-500'} to-transparent opacity-50 group-hover:opacity-100 transition-opacity`} />

            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-1.5 px-1.5 py-0.5 rounded-full bg-gray-900/40 border border-gray-800/40">
                    <span className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                    <span className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-yellow-500 animate-pulse delay-75' : 'bg-emerald-500'}`}></span>
                    <span className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-yellow-500 animate-pulse delay-150' : 'bg-emerald-500'}`}></span>
                </div>
                <div className="text-[9px] font-bold tracking-[0.2em] text-cyan-500 uppercase flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] ${loading ? 'animate-ping' : ''}`} />
                    {loading ? 'PROCESSING_STREAM' : 'SECURE_DATA'}
                </div>
            </div>

            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-11 h-11 rounded border border-gray-700 bg-[#0a0f1c] flex items-center justify-center p-1 shadow-inner shadow-black/50">
                            <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${agentName}&backgroundColor=transparent`} alt="Bot" className="w-full h-full" />
                        </div>
                        <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 ${loading ? 'bg-yellow-500' : 'bg-emerald-500'} rounded-full border-2 border-[#0a0f1c] shadow-[0_0_10px_rgba(16,185,129,0.4)]`}></span>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-wide uppercase">
                            {agentName}
                        </h3>
                        <div className="flex gap-2 mt-1">
                            <span className="text-[9px] bg-emerald-900/30 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded tracking-widest font-bold uppercase flex items-center gap-1">
                                <ShieldCheck className="w-2.5 h-2.5" /> SECURE
                            </span>
                            {score && (
                                <span className="text-[9px] bg-cyan-900/30 text-cyan-400 border border-cyan-500/20 px-1.5 py-0.5 rounded tracking-widest font-bold uppercase flex items-center gap-1">
                                    <TrendingUp className="w-2.5 h-2.5" /> SCORE: {score}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 text-sm text-gray-300/90 pl-4 border-l-2 border-gray-800 group-hover:border-cyan-500/40 transition-colors duration-500 flex-1 py-1 overflow-y-auto custom-scrollbar">
                {loading ? (
                    <div className="flex flex-col gap-3 py-2">
                        <div className="h-4 bg-gray-800/50 rounded animate-pulse w-full"></div>
                        <div className="h-4 bg-gray-800/50 rounded animate-pulse w-[90%]"></div>
                        <div className="h-4 bg-gray-800/50 rounded animate-pulse w-[75%]"></div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-2">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Awaiting complete throughput...
                        </div>
                    </div>
                ) : content ? (
                    <div className="space-y-4 prose prose-invert prose-sm max-w-none prose-pre:bg-[#060a14] prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-xl">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]} 
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                p: ({node, ...props}) => <p className="leading-relaxed font-medium tracking-tight mb-2" {...props} />,
                                code: ({node, inline, className, children, ...props}) => {
                                    return (
                                        <code className={`${className} bg-gray-900 px-1.5 py-0.5 rounded text-cyan-400 text-[11px]`} {...props}>
                                            {children}
                                        </code>
                                    )
                                },
                                pre: ({node, ...props}) => <pre className="overflow-x-auto p-4 custom-scrollbar" {...props} />
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                        {reason && (
                            <div className="mt-4 pt-4 border-t border-gray-800/50">
                                <span className="text-[8px] font-bold tracking-[0.2em] text-gray-500 uppercase block mb-2">JUDGE_REASONING</span>
                                <p className="text-xs text-gray-400 italic">"{reason}"</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="leading-relaxed italic font-medium tracking-tight opacity-50">
                            "Initialize system to capture agent transmission. Waiting for tactical command..."
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                            <div className="w-1 h-1 rounded-full bg-gray-700" />
                            STANDBY_MODE
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AgentOutput
