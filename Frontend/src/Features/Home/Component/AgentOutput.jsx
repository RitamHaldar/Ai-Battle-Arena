import React from 'react'

const AgentOutput = ({ Response }) => {
    return (
        <div className="animate-panel border border-gray-800/60 bg-[#0a0f1c]/50 backdrop-blur-sm rounded-xl p-6 relative overflow-hidden group flex flex-col h-full transition-all duration-500 hover:border-cyan-500/30">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500/50 via-emerald-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

            {/* Status Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-1.5 px-1.5 py-0.5 rounded-full bg-gray-900/40 border border-gray-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse delay-75"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse delay-150"></span>
                </div>
                <div className="text-[9px] font-bold tracking-[0.2em] text-cyan-500 uppercase flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-ping" />
                    LIVE_FEED
                </div>
            </div>

            {/* Agent Identity */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-11 h-11 rounded border border-gray-700 bg-[#0a0f1c] flex items-center justify-center p-1 shadow-inner shadow-black/50">
                            <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${Response.agentName}&backgroundColor=transparent`} alt="Bot" className="w-full h-full" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0a0f1c] shadow-[0_0_10px_rgba(16,185,129,0.4)]"></span>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-wide">
                            {Response.agentName}
                        </h3>
                        <div className="flex gap-2 mt-1">
                            <span className="text-[9px] bg-emerald-900/30 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded tracking-widest font-bold uppercase">SECURE</span>
                            <span className="text-[9px] bg-gray-800/80 text-gray-500 px-1.5 py-0.5 rounded tracking-widest font-bold uppercase">READY</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Response Display Box (Mirroring the removed Feedback style) */}
            <div className="space-y-4 text-sm text-gray-300/90 pl-4 border-l-2 border-gray-800 group-hover:border-emerald-500/40 transition-colors duration-500 flex-1 py-1">
                <p className="leading-relaxed italic font-medium tracking-tight">
                    "Synchronizing with SENTIENT_VOID protocols... Analyzing multi-vector parameters of current query logic. Formulating optimized response stream based on tactical constraints."
                </p>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    Awaiting complete throughput...
                </div>
            </div>
        </div>
    )
}

export default AgentOutput
