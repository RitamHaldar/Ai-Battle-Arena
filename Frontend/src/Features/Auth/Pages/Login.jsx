import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { User, Lock, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
const Login = () => {
    const [formData, setFormData] = useState({
        credential: '',
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
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Card entrance
            gsap.from(cardRef.current, {
                y: 60,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out"
            });

            // Input fields stagger
            gsap.from(".animate-input", {
                x: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.4
            });

            // Button glow
            gsap.to(".login-btn", {
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                duration: 1.5,
                repeat: -1,
                yoyo: true
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
        console.log('Login Payload:', formData);
        // Implement API call here
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#060a14] text-gray-300 flex items-center justify-center p-6 relative overflow-hidden selection:bg-cyan-500/30">
            {/* Background elements */}
            <div className="bg-glow absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="bg-glow absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none" />

            <div ref={cardRef} className="w-full max-w-md bg-[#0a0f1c]/60 backdrop-blur-xl border border-gray-800/60 rounded-3xl p-10 shadow-2xl relative z-10">
                {/* Logo & Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 mb-6 group transition-all hover:scale-110">
                        <Zap className="w-7 h-7 text-cyan-400 fill-cyan-400 group-hover:animate-pulse" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2 uppercase">Systems_Login</h1>
                    <p className="text-sm text-gray-500 tracking-widest font-medium">SECURE_ACCESS_GRANTED :: V.2.04</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Credential Input */}
                    <div className="animate-input space-y-2">
                        <label className="block text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase ml-1">Identity_Key</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 transition-colors group-focus-within:text-cyan-400" />
                            <input
                                type="text"
                                name="credential"
                                value={formData.credential}
                                onChange={handleChange}
                                placeholder="Username or Email"
                                className="w-full bg-[#060a14] border border-gray-800/80 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-gray-700 shadow-inner"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="animate-input space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="block text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase">Cipher_Protocol</label>
                            <span className="text-[9px] text-cyan-600 cursor-pointer hover:text-cyan-400 transition-colors uppercase font-bold tracking-widest">Recalibrate?</span>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 transition-colors group-focus-within:text-cyan-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full bg-[#060a14] border border-gray-800/80 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-gray-700 shadow-inner"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="login-btn w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-[#060a14] font-black text-xs tracking-[0.3em] py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 group uppercase"
                    >
                        Initialize_Session <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </form>

                {/* Footer Links */}
                <div className="mt-10 pt-8 border-t border-gray-800/50 text-center animate-input">
                    <p onClick={() => navigate("/register")} className="text-xs text-gray-500 font-medium">
                        New unit in the grid?
                        <span className="text-cyan-400 ml-2 cursor-pointer hover:underline underline-offset-4 decoration-cyan-400/30 weight-bold tracking-wider">
                            Register_Credential
                        </span>
                    </p>
                </div>

                {/* Status Indicator */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-[#12182b] border border-gray-800 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[8px] font-black text-gray-500 tracking-[0.2em] uppercase">Security_Active</span>
                </div>
            </div>

            {/* Tactical Grid Overlay (Subtle) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cyan 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
    );
};

export default Login;
