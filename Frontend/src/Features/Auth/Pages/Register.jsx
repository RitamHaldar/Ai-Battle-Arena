import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { User, Lock, Mail, ArrowRight, Zap, Target } from 'lucide-react';
import { useNavigate } from 'react-router';
const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const cardRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Background glow animation
            gsap.to(".bg-glow", {
                opacity: 0.5,
                scale: 1.2,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Card entrance
            gsap.from(cardRef.current, {
                y: 80,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out"
            });

            // Input fields stagger
            gsap.from(".animate-input", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.5
            });

            // Elements subtle hover influence
            gsap.from(".logo-badge", {
                rotation: -10,
                scale: 0.8,
                opacity: 0,
                duration: 1,
                ease: "back.out(2)",
                delay: 0.3
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registration Payload:', formData);
        // Implement API call here
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#060a14] text-gray-300 flex items-center justify-center p-6 relative overflow-hidden selection:bg-cyan-500/30">
            {/* Background elements */}
            <div className="bg-glow absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="bg-glow absolute bottom-[-5%] left-[-5%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />

            <div ref={cardRef} className="w-full max-w-lg bg-[#0a0f1c]/60 backdrop-blur-2xl border border-gray-800/60 rounded-[2.5rem] p-12 shadow-2xl relative z-10 overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-10">
                    <div className="logo-badge w-16 h-16 rounded-2xl bg-[#12182b] border border-gray-800 flex items-center justify-center mb-6 shadow-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <Target className="w-8 h-8 text-cyan-400 relative z-10" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-widest mb-2 uppercase text-center">Deploy_New_Unit</h1>
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-gray-800" />
                        <p className="text-[10px] text-gray-500 tracking-[0.4em] font-black uppercase">Grid_Registry_System</p>
                        <span className="h-px w-8 bg-gray-800" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Username Input */}
                    <div className="animate-input space-y-2 md:col-span-2">
                        <label className="block text-[10px] font-black text-gray-600 tracking-[0.3em] uppercase ml-1 italic">Unit_Designation</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 transition-colors group-focus-within:text-cyan-400" />
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Ghost_Protocols"
                                className="w-full bg-[#060a14] border border-gray-800/80 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-gray-700 shadow-inner"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="animate-input space-y-2 md:col-span-2">
                        <label className="block text-[10px] font-black text-gray-600 tracking-[0.3em] uppercase ml-1 italic">Signal_Vector</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 transition-colors group-focus-within:text-cyan-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="operator@void.sentient"
                                className="w-full bg-[#060a14] border border-gray-800/80 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-gray-700 shadow-inner"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="animate-input space-y-2 md:col-span-2">
                        <label className="block text-[10px] font-black text-gray-600 tracking-[0.3em] uppercase ml-1 italic">Cryptographic_Hash</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 transition-colors group-focus-within:text-cyan-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••••••"
                                className="w-full bg-[#060a14] border border-gray-800/80 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-gray-700 shadow-inner"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 pt-4">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 text-[#060a14] font-black text-[10px] tracking-[0.4em] py-5 rounded-2xl flex items-center justify-center gap-4 transition-all hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:scale-[1.01] active:scale-95 group uppercase"
                        >
                            <Zap className="w-4 h-4 fill-current group-hover:rotate-12 transition-transform" />
                            Initialize_Deployment
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </form>

                {/* Footer Links */}
                <div className="mt-12 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4 animate-input">
                    <p onClick={() => navigate("/login")} className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                        Already synced?
                        <span className="text-cyan-400 ml-2 cursor-pointer hover:underline underline-offset-4 decoration-cyan-400/30 transition-all">
                            Recall_Session
                        </span>
                    </p>
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-900/50 border border-gray-800 rounded-lg">
                        <span className="text-[8px] font-black text-gray-600 tracking-tighter uppercase">Protocol</span>
                        <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                        <span className="text-[8px] font-black text-gray-400 tracking-tighter uppercase italic">Ready</span>
                    </div>
                </div>
            </div>

            {/* Tactical Grid Overlay (Subtle) */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1a202c 1px, transparent 1px), linear-gradient(90deg, #1a202c 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>
    );
};

export default Register;
