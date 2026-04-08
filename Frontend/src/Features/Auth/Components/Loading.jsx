import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Zap, Loader2 } from 'lucide-react';

const Loading = () => {
    const containerRef = useRef(null);
    const zapRef = useRef(null);
    const ringRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".bg-glow", {
                opacity: 0.4,
                scale: 1.3,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            gsap.to(ringRef.current, {
                rotation: 360,
                duration: 3,
                repeat: -1,
                ease: "none"
            });

            gsap.to(zapRef.current, {
                y: -10,
                scale: 1.1,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });

            const tl = gsap.timeline({ repeat: -1 });
            tl.to(".loading-dot", {
                opacity: 0,
                stagger: 0.2,
                duration: 0.5,
                repeat: 0,
                yoyo: true
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#060a14] flex flex-col items-center justify-center overflow-hidden">
            <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative flex items-center justify-center mb-12">
                <div 
                    ref={ringRef}
                    className="absolute w-32 h-32 border-2 border-dashed border-cyan-500/20 rounded-full"
                />
                <div 
                    className="absolute w-28 h-28 border border-indigo-500/40 rounded-full animate-ping opacity-20"
                    style={{ animationDuration: '3s' }}
                />
                
                <div className="relative w-20 h-20 bg-gradient-to-br from-[#0a0f1c] to-[#12182b] border border-cyan-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
                    <div ref={zapRef} className="relative z-10">
                        <Zap className="w-10 h-10 text-cyan-400 fill-cyan-400/20 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent" />
                </div>
            </div>

            <div className="text-center space-y-4">
                <div ref={textRef} className="flex flex-col items-center">
                    <h2 className="text-xs font-black text-cyan-500 tracking-[0.4em] uppercase mb-1">
                        System_Initializing
                    </h2>
                    <div className="flex items-center gap-1.5 h-1">
                        <span className="loading-dot w-1 h-1 bg-cyan-400 rounded-full" />
                        <span className="loading-dot w-1 h-1 bg-cyan-400 rounded-full" />
                        <span className="loading-dot w-1 h-1 bg-cyan-400 rounded-full" />
                    </div>
                </div>

                <div className="flex flex-col gap-2 items-center">
                    <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase opacity-70">
                        Establishing_Secure_Link_V.2.04
                    </p>
                    <div className="w-48 h-0.5 bg-gray-900 rounded-full overflow-hidden relative">
                        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full animate-[loading-bar_2s_infinite]" />
                    </div>
                </div>
            </div>

            <div 
                className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(6,182,212,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.2) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }} 
            />

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes loading-bar {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}} />
        </div>
    );
};

export default Loading;
