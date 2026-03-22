"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Week4Interactions({ customId }) {
    const containerStyle = {
        background: "#f0fdf4",
        color: "#0f172a",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #bbf7d0",
        minHeight: "400px"
    };

    const renderContent = () => {
        switch (customId) {
            case "week4_hook": return <Hook />;
            case "week4_step1_def": return <Step1Def />;
            case "week4_step2_formula": return <Step2Formula />;
            case "week4_step3_daily": return <Step3Daily />;
            case "week4_step4_activity": return <Step4Activity />;
            case "week4_step5_quiz": return <Step5Quiz />;
            case "week4_summary": return <Summary />;
            default: return null;
        }
    };

    return (
        <div style={containerStyle}>
            {renderContent()}
        </div>
    );
}

function Hook() {
    const [guess, setGuess] = useState(null);

    return (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
            <h2 style={{ marginBottom: "16px", color: "#166534" }}>Will it Rain in Ado-Ekiti Today?</h2>
            <p style={{ fontSize: "16px", marginBottom: "32px", color: "#15803d", maxWidth: "600px", margin: "0 auto 32px" }}>
                "If you have a football match this afternoon, what are the chances it will rain? Life is full of 'maybe.' In Math, we turn that 'maybe' into a number. That number is Probability."
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "32px" }}>
                {/* Weather UI */}
                <div style={{
                    background: "linear-gradient(to bottom, #7dd3fc, #e0f2fe)",
                    width: "300px", height: "180px", borderRadius: "12px",
                    display: "flex", alignItems: "center", justifyContent: "space-around",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)", position: "relative"
                }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "50px", animation: "bounce 2s infinite" }}>☀️</div>
                        <div style={{ fontWeight: "bold", color: "#0284c7" }}>Sunny</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "50px", animation: "wobble 3s infinite" }}>🌧️</div>
                        <div style={{ fontWeight: "bold", color: "#0f172a" }}>Rainy</div>
                    </div>
                </div>
            </div>

            <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", display: "inline-block", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <h4 style={{ marginBottom: "16px", color: "#0f172a" }}>Guess the Outcome:</h4>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                    <button
                        onClick={() => setGuess("Sun")}
                        style={{ padding: "12px 24px", borderRadius: "8px", background: guess === "Sun" ? "#eab308" : "#fef08a", color: guess === "Sun" ? "#fff" : "#854d0e", border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}
                    >
                        ☀️ It Will Be Sunny
                    </button>
                    <button
                        onClick={() => setGuess("Rain")}
                        style={{ padding: "12px 24px", borderRadius: "8px", background: guess === "Rain" ? "#3b82f6" : "#bfdbfe", color: guess === "Rain" ? "#fff" : "#1e3a8a", border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}
                    >
                        🌧️ It Will Rain
                    </button>
                </div>

                {guess && (
                    <div style={{ marginTop: "16px", padding: "12px", background: "#f0fdf4", color: "#166534", borderRadius: "8px" }}>
                        You guessed {guess}! But are you 100% Certain? Let's find out how Math calculates it.
                    </div>
                )}
            </div>

            <style>{`
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes wobble { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-5px) translateY(5px); } }
      `}</style>
        </div>
    );
}

function Step1Def() {
    return (
        <div>
            <h2 style={{ marginBottom: "24px", color: "#166534" }}>Step 1: Defining Probability</h2>
            <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", borderLeft: "4px solid #22c55e", marginBottom: "32px" }}>
                <p style={{ margin: 0, fontSize: "16px", color: "#0f172a", lineHeight: "1.6" }}>
                    <strong>Probability</strong> is the branch of mathematics that measures the likelihood or chance of an event occurring.
                </p>
            </div>

            <h3 style={{ marginBottom: "16px", color: "#15803d", textAlign: "center" }}>The Probability Scale</h3>
            <p style={{ textAlign: "center", marginBottom: "32px", color: "#475569" }}>It always falls between <strong>0 and 1</strong>.</p>

            <div style={{ position: "relative", height: "120px", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 auto 40px", maxWidth: "800px", padding: "0 20px" }}>

                {/* Background Line */}
                <div style={{ position: "absolute", top: "50%", left: "40px", right: "40px", height: "8px", background: "linear-gradient(to right, #ef4444, #eab308, #22c55e)", transform: "translateY(-50%)", borderRadius: "4px" }} />

                {/* Impossible */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 2 }}>
                    <div style={{ width: "24px", height: "24px", background: "#ef4444", borderRadius: "50%", border: "4px solid #fff", boxShadow: "0 0 10px rgba(0,0,0,0.2)", marginBottom: "8px" }} />
                    <strong style={{ color: "#ef4444", fontSize: "24px" }}>0</strong>
                    <span style={{ fontWeight: "bold" }}>Impossible</span>
                    <span style={{ fontSize: "12px", color: "#64748b", textAlign: "center", width: "120px", marginTop: "4px" }}>(Human flying by flapping arms)</span>
                </div>

                {/* Even Chance */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 2 }}>
                    <div style={{ width: "24px", height: "24px", background: "#eab308", borderRadius: "50%", border: "4px solid #fff", boxShadow: "0 0 10px rgba(0,0,0,0.2)", marginBottom: "8px" }} />
                    <strong style={{ color: "#eab308", fontSize: "24px" }}>0.5</strong>
                    <span style={{ fontWeight: "bold" }}>Even Chance</span>
                    <span style={{ fontSize: "12px", color: "#64748b", textAlign: "center", width: "120px", marginTop: "4px" }}>(Coin toss)</span>
                </div>

                {/* Certain */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 2 }}>
                    <div style={{ width: "24px", height: "24px", background: "#22c55e", borderRadius: "50%", border: "4px solid #fff", boxShadow: "0 0 10px rgba(0,0,0,0.2)", marginBottom: "8px" }} />
                    <strong style={{ color: "#22c55e", fontSize: "24px" }}>1</strong>
                    <span style={{ fontWeight: "bold" }}>Certain</span>
                    <span style={{ fontSize: "12px", color: "#64748b", textAlign: "center", width: "120px", marginTop: "4px" }}>(Sun rising tomorrow)</span>
                </div>
            </div>
        </div>
    );
}

function Step2Formula() {
    const [targetNum, setTargetNum] = useState(4);

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px", color: "#166534" }}>Step 2: The Formula for Success</h2>

            <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", marginBottom: "32px", display: "inline-block", textAlign: "left", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px dashed #22c55e" }}>
                <p style={{ margin: "0 0 16px 0", color: "#0f172a" }}>To find the probability of an event (E), we use this simple ratio:</p>
                <div style={{ background: "#f0fdf4", padding: "16px", borderRadius: "8px", fontFamily: "monospace", fontSize: "18px", border: "1px solid #bbf7d0", color: "#166534", textAlign: "center" }}>
                    <strong>P(E) = </strong>
                    <span style={{ display: "inline-block", verticalAlign: "middle", textAlign: "center", marginLeft: "8px" }}>
                        <span style={{ display: "block", borderBottom: "2px solid #166534", paddingBottom: "4px", marginBottom: "4px" }}>Number of required outcomes</span>
                        <span style={{ display: "block" }}>Total number of possible outcomes</span>
                    </span>
                </div>
            </div>

            <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ marginBottom: "16px", color: "#1e293b" }}>Example: Rolling a standard six-sided die</h3>
                <p style={{ marginBottom: "16px", color: "#475569" }}>
                    What is the probability of getting a <select value={targetNum} onChange={e => setTargetNum(e.target.value)} style={{ padding: "4px 8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#f8fafc" }}>
                        {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                    </select> ?
                </p>

                <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                        <div key={num} style={{
                            width: "50px", height: "50px", borderRadius: "8px",
                            background: num == targetNum ? "#22c55e" : "#f1f5f9",
                            color: num == targetNum ? "#fff" : "#64748b",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "24px", fontWeight: "bold", border: `2px solid ${num == targetNum ? "#166534" : "#cbd5e1"}`
                        }}>
                            {num}
                        </div>
                    ))}
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 auto", maxWidth: "400px", textAlign: "left", fontSize: "16px", color: "#0f172a" }}>
                    <li style={{ marginBottom: "12px" }}>✅ <strong>Required Outcome:</strong> Only one (the number {targetNum}).</li>
                    <li style={{ marginBottom: "12px" }}>🎲 <strong>Total Outcomes:</strong> Six (1, 2, 3, 4, 5, 6).</li>
                    <li style={{ borderTop: "2px solid #e2e8f0", paddingTop: "12px", fontSize: "20px", color: "#166534" }}>
                        <strong>Result: P(getting a {targetNum}) = 1 / 6</strong>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function Step3Daily() {
    const [activeIdx, setActiveIdx] = useState(0);

    const cards = [
        { title: "Agriculture", desc: "Farmers use probability to decide when to plant crops based on the chance of the first rain in Ekiti.", icon: "🌱", bg: "#dcfce7", border: "#22c55e" },
        { title: "Games & Sports", desc: "Understanding your 'odds' in a game of Ludo or forecasting an Inter-House Sports relay race.", icon: "🎲", bg: "#fef3c7", border: "#f59e0b" },
        { title: "Insurance & Health", desc: "Doctors use probability to decide if a treatment will work for a patient.", icon: "🩺", bg: "#e0e7ff", border: "#6366f1" },
        { title: "Business", desc: "Shopkeepers at Oja Oba estimate the probability of a product selling out so they know how much to stock.", icon: "🛒", bg: "#fce7f3", border: "#ec4899" }
    ];

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px", color: "#166534" }}>Step 3: Importance in Daily Life</h2>
            <p style={{ color: "#475569", marginBottom: "24px" }}>Swipe through practical applications of Probability in Ekiti State:</p>

            <div style={{
                maxWidth: "400px", margin: "0 auto",
                background: cards[activeIdx].bg,
                border: `2px solid ${cards[activeIdx].border}`,
                borderRadius: "16px", padding: "40px 24px",
                minHeight: "250px", display: "flex", flexDirection: "column", justifyContent: "center",
                transition: "background 0.3s ease", position: "relative", overflow: "hidden"
            }}>
                <div style={{ fontSize: "60px", marginBottom: "16px" }}>{cards[activeIdx].icon}</div>
                <h3 style={{ marginBottom: "12px", color: "#0f172a" }}>{cards[activeIdx].title}</h3>
                <p style={{ color: "#334155", fontSize: "16px", lineHeight: "1.6" }}>{cards[activeIdx].desc}</p>

                {/* Animated Background Element */}
                <div style={{ position: "absolute", top: "-20px", right: "-20px", fontSize: "100px", opacity: 0.1, pointerEvents: "none" }}>{cards[activeIdx].icon}</div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "24px" }}>
                <button
                    onClick={() => setActiveIdx(prev => Math.max(0, prev - 1))}
                    disabled={activeIdx === 0}
                    style={{ padding: "10px 20px", borderRadius: "30px", background: activeIdx === 0 ? "#e2e8f0" : "#1e293b", color: activeIdx === 0 ? "#94a3b8" : "#fff", border: "none", cursor: activeIdx === 0 ? "default" : "pointer" }}
                >
                    &larr; Prev
                </button>
                <button
                    onClick={() => setActiveIdx(prev => Math.min(cards.length - 1, prev + 1))}
                    disabled={activeIdx === cards.length - 1}
                    style={{ padding: "10px 20px", borderRadius: "30px", background: activeIdx === cards.length - 1 ? "#e2e8f0" : "#1e293b", color: activeIdx === cards.length - 1 ? "#94a3b8" : "#fff", border: "none", cursor: activeIdx === cards.length - 1 ? "default" : "pointer" }}
                >
                    Next &rarr;
                </button>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
                {cards.map((_, i) => (
                    <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: i === activeIdx ? "#1e293b" : "#cbd5e1" }} />
                ))}
            </div>
        </div>
    );
}

function Step4Activity() {
    const [flips, setFlips] = useState([]); // 'H' or 'T'

    const totalFlips = 10;

    const handleFlip = () => {
        if (flips.length >= totalFlips) return;
        const isHeads = Math.random() > 0.5;
        setFlips([...flips, isHeads ? 'H' : 'T']);
    };

    const resetFlip = () => setFlips([]);

    const headsCount = flips.filter(f => f === 'H').length;
    const tailsCount = flips.filter(f => f === 'T').length;
    const isDone = flips.length === totalFlips;

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px", color: "#166534" }}>Interactive Activity: "The Virtual Coin Toss"</h2>
            <p style={{ color: "#475569", marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
                Flip the digital coin 10 times to test the Even Chance theory!
            </p>

            <div style={{ background: "#fff", padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0", maxWidth: "500px", margin: "0 auto" }}>

                <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "32px" }}>
                    <div>
                        <div style={{ fontSize: "14px", color: "#64748b", fontWeight: "bold" }}>Heads</div>
                        <div style={{ fontSize: "32px", fontWeight: "bold", color: "#f59e0b" }}>{headsCount}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: "14px", color: "#64748b", fontWeight: "bold" }}>Tails</div>
                        <div style={{ fontSize: "32px", fontWeight: "bold", color: "#3b82f6" }}>{tailsCount}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: "14px", color: "#64748b", fontWeight: "bold" }}>Flips</div>
                        <div style={{ fontSize: "32px", fontWeight: "bold", color: "#0f172a" }}>{flips.length}/{totalFlips}</div>
                    </div>
                </div>

                {/* The Coin visual area */}
                <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px" }}>
                    <div style={{
                        width: "80px", height: "80px", borderRadius: "50%",
                        background: flips.length > 0 ? (flips[flips.length - 1] === 'H' ? "linear-gradient(#f59e0b, #d97706)" : "linear-gradient(#3b82f6, #2563eb)") : "#cbd5e1",
                        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: "bold",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.2)", outline: "4px solid rgba(255,255,255,0.2)", outlineOffset: "-4px",
                        animation: "toss 0.3s ease-out"
                    }}>
                        {flips.length > 0 ? flips[flips.length - 1] : "?"}
                    </div>
                </div>

                {!isDone ? (
                    <button
                        onClick={handleFlip}
                        style={{ padding: "16px 40px", fontSize: "20px", fontWeight: "bold", borderRadius: "30px", background: "#166534", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 4px 10px rgba(22, 101, 52, 0.3)" }}
                    >
                        FLIP COIN!
                    </button>
                ) : (
                    <div style={{ background: "#f0fdf4", padding: "20px", borderRadius: "12px", border: "1px dashed #22c55e", textAlign: "left" }}>
                        <h4 style={{ color: "#166534", marginBottom: "8px" }}>Reflection:</h4>
                        <p style={{ color: "#15803d", fontSize: "15px", lineHeight: "1.6", margin: 0 }}>
                            Did you get exactly 5 Heads? Probably not! You got <strong>{headsCount} Heads.</strong><br /> But as you flip more (like 100 times), the result gets closer to exactly 0.5.
                        </p>
                        <div style={{ textAlign: "center", marginTop: "16px" }}>
                            <button onClick={resetFlip} style={{ background: "transparent", border: "1px solid #166534", color: "#166534", padding: "8px 16px", borderRadius: "20px", cursor: "pointer" }}>↻ Play Again</button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes toss {
          0% { transform: scale(1) translateY(0) rotateX(0); }
          50% { transform: scale(1.3) translateY(-20px) rotateX(180deg); }
          100% { transform: scale(1) translateY(0) rotateX(360deg); }
        }
      `}</style>
        </div>
    );
}

function Step5Quiz() {
    const [currentQ, setCurrentQ] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        {
            q: "What is the probability of an event that is 'Certain' to happen?",
            opts: ["0", "0.5", "1"],
            ans: 2,
            feedback: "Correct! Certainty is represented by 1."
        },
        {
            q: "You have a bag with 3 Red yams and 7 White yams. If you pick one without looking, what is the probability it is Red?",
            opts: ["3/7", "3/10", "7/10"],
            ans: 1,
            feedback: "Spot on! 3 Required Outcomes out of 10 Total Outcomes."
        },
        {
            q: "Which of these numbers cannot be a probability?",
            opts: ["0.2", "1.5", "1/2"],
            ans: 1,
            feedback: "Perfect! Probability can NEVER be greater than 1."
        },
        {
            q: "If the probability of an event happening is 0.8, how likely is it?",
            opts: ["Unlikely", "Likely", "Impossible"],
            ans: 1,
            feedback: "Correct! 0.8 is very close to 1, making it highly Likely."
        }
    ];

    const handleOpt = (idx) => {
        if (idx === questions[currentQ].ans) {
            toast.success(questions[currentQ].feedback, { icon: "✅" });
            setScore(s => s + 1);
        } else {
            toast.error("Incorrect. Remember the probability scale logic.", { icon: "❌" });
        }

        if (currentQ < questions.length - 1) {
            setTimeout(() => setCurrentQ(q => q + 1), 1500);
        } else {
            setTimeout(() => setShowResult(true), 1500);
        }
    };

    if (showResult) {
        return (
            <div style={{ textAlign: "center", padding: "40px", background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                <h2 style={{ marginBottom: "16px", color: "#0f172a" }}>Quiz Complete</h2>
                <p style={{ fontSize: "18px", color: "#475569" }}>You successfully completed the Probability Quiz.</p>
                <p style={{ fontWeight: "bold", fontSize: "24px", color: "#10b981", margin: "24px 0" }}>Final Score: {score} / {questions.length}</p>
                <div style={{ display: "inline-block", background: "#f0fdf4", color: "#166534", padding: "10px 24px", borderRadius: "30px", fontSize: "14px", fontWeight: "bold" }}>
                    Proceed to Summary
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ marginBottom: "24px", color: "#64748b", borderBottom: `1px solid #e2e8f0`, paddingBottom: "12px" }}>
                Question {currentQ + 1} of {questions.length}
            </h3>
            <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "32px", color: "#0f172a", whiteSpace: "pre-wrap" }}>
                {questions[currentQ].q}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {questions[currentQ].opts.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => handleOpt(i)}
                        style={{
                            padding: "20px",
                            textAlign: "left",
                            background: "#fafafa",
                            border: `2px solid #e2e8f0`,
                            color: "#0f172a",
                            borderRadius: "12px",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = "#22c55e"; e.currentTarget.style.background = "#f0fdf4"; }}
                        onMouseOut={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fafafa"; }}
                    >
                        {String.fromCharCode(65 + i)}. {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}

function Summary() {
    return (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{
                width: "120px", height: "120px", margin: "0 auto 24px",
                background: "#166534", color: "#fff", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "50px", boxShadow: "0 10px 20px rgba(22, 101, 52, 0.3)"
            }}>
                🎲
            </div>
            <h1 style={{ marginBottom: "16px", fontSize: "28px", color: "#0f172a" }}>Summary & Next Steps</h1>
            <ul style={{ textAlign: "left", maxWidth: "450px", margin: "0 auto 32px", color: "#475569", fontSize: "16px", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li>Probability helps us make smart guesses about the world.</li>
                <li>It ranges from <strong>0 (Impossible)</strong> to <strong>1 (Certain)</strong>.</li>
                <li>It is calculated by dividing <strong>what we want</strong> by the <strong>total possible options</strong>.</li>
            </ul>

            <div style={{ background: "#e0f2fe", border: "1px dashed #0ea5e9", color: "#0369a1", padding: "20px", borderRadius: "12px", display: "inline-block", maxWidth: "500px" }}>
                <strong>Next Module Coming Up:</strong><br />
                "Experimental vs. Theoretical Probability."
            </div>
        </div>
    );
}
