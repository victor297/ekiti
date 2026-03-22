"use client";

import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function Week5Interactions({ customId }) {
    const containerStyle = {
        background: "#fffbeb",
        color: "#0f172a",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #fde68a",
        minHeight: "400px"
    };

    const renderContent = () => {
        switch (customId) {
            case "week5_hook": return <Hook />;
            case "week5_step1_vocab": return <Step1Vocab />;
            case "week5_step2_coin": return <Step2Coin />;
            case "week5_step3_die": return <Step3Die />;
            case "week5_step4_real": return <Step4Real />;
            case "week5_step5_quiz": return <Step5Quiz />;
            case "week5_interaction": return <Challenge30s />;
            default: return null;
        }
    };

    return (
        <div style={containerStyle}>
            {renderContent()}
        </div>
    );
}

// Reusable functions for Audio/Vibration
const playSound = (type) => {
    try {
        if (typeof window !== "undefined" && window.AudioContext) {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            if (type === "coin") {
                osc.type = "sine";
                osc.frequency.setValueAtTime(2000, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.2);
            } else if (type === "die") {
                osc.type = "square";
                osc.frequency.setValueAtTime(300, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.05);
                osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

                // play multiple clicks to sound like rattling
                for (let i = 0; i < 4; i++) {
                    setTimeout(() => {
                        if (ctx.state === "running") {
                            /* we simplify with just one synth beep to avoid complexity, but it works */
                        }
                    }, i * 40);
                }
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.15);
            }
        }
    } catch (e) { }
};

const triggerVibration = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([50, 50, 50]);
    }
};

function Hook() {
    const [dieResult, setDieResult] = useState("?");

    const handleRoll = () => {
        playSound("die");
        triggerVibration();
        setDieResult("🎲");
        setTimeout(() => {
            setDieResult(Math.floor(Math.random() * 6) + 1);
        }, 400);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px", color: "#b45309" }}>The Hook: "The Ludo Battle"</h2>

            {/* Video of generic Ludo to simulate the neighborhood block */}
            <div style={{ background: "#000", borderRadius: "12px", overflow: "hidden", maxWidth: "500px", margin: "0 auto 24px" }}>
                <video
                    src="https://videos.pexels.com/video-files/5961623/5961623-uhd_2160_4096_25fps.mp4"
                    controls
                    style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
                    poster="https://images.pexels.com/photos/5961623/pexels-photo-5961623.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
            </div>

            <p style={{ fontSize: "16px", marginBottom: "24px", color: "#78350f" }}>
                "In Ludo, why does it feel like getting a '6' takes forever, but getting a '1' is so easy? Is it bad luck, or is it just Math? Today, we find out!"
            </p>

            <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", display: "inline-block", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <div style={{
                    width: "100px", height: "100px", background: "#f59e0b", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: dieResult === "🎲" ? "60px" : "48px", fontWeight: "bold",
                    borderRadius: "16px", margin: "0 auto 16px", boxShadow: "0 4px 15px rgba(245, 158, 11, 0.4)",
                    transition: "transform 0.1s"
                }}>
                    {dieResult}
                </div>

                <button
                    onClick={handleRoll}
                    style={{ padding: "12px 32px", borderRadius: "30px", background: "#b45309", color: "#fff", border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}
                >
                    Roll the Die (Feel the Shake!)
                </button>
            </div>
        </div>
    );
}

function Step1Vocab() {
    const vocabs = [
        { title: "The Experiment", desc: "The action you perform (e.g., Tossing a coin)." },
        { title: "The Outcome", desc: "A single possible result (e.g., Getting a 'Head')." },
        { title: "The Sample Space (S)", desc: "The set of ALL possible outcomes." }
    ];

    return (
        <div>
            <h2 style={{ marginBottom: "24px", color: "#b45309", textAlign: "center" }}>Step 1: Understanding "Events" and "Outcomes"</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px", margin: "0 auto 32px" }}>
                {vocabs.map((v, i) => (
                    <div key={i} style={{ background: "#fff", padding: "16px 24px", borderRadius: "8px", borderLeft: "4px solid #f59e0b", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                        <h4 style={{ color: "#b45309", marginBottom: "4px" }}>{v.title}</h4>
                        <p style={{ color: "#475569", margin: 0 }}>{v.desc}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" }}>
                <div style={{ background: "#e0f2fe", padding: "20px", borderRadius: "12px", textAlign: "center", border: "1px dashed #0284c7" }}>
                    <div style={{ fontSize: "30px", marginBottom: "8px" }}>🪙</div>
                    <h4 style={{ marginBottom: "8px" }}>For a Coin:</h4>
                    <div style={{ fontFamily: "monospace", fontSize: "16px", color: "#0369a1", background: "#fff", padding: "8px", borderRadius: "4px" }}>{`{Head, Tail}`}</div>
                    <p style={{ marginTop: "8px", fontSize: "14px", fontWeight: "bold" }}>(Total = 2)</p>
                </div>

                <div style={{ background: "#fef3c7", padding: "20px", borderRadius: "12px", textAlign: "center", border: "1px dashed #d97706" }}>
                    <div style={{ fontSize: "30px", marginBottom: "8px" }}>🎲</div>
                    <h4 style={{ marginBottom: "8px" }}>For a Ludo Die:</h4>
                    <div style={{ fontFamily: "monospace", fontSize: "16px", color: "#b45309", background: "#fff", padding: "8px", borderRadius: "4px" }}>{`{1, 2, 3, 4, 5, 6}`}</div>
                    <p style={{ marginTop: "8px", fontSize: "14px", fontWeight: "bold" }}>(Total = 6)</p>
                </div>
            </div>
        </div>
    );
}

function Step2Coin() {
    const [history, setHistory] = useState([]);

    const handleToss = () => {
        playSound("coin");
        const isHead = Math.random() > 0.5;
        setTimeout(() => {
            setHistory(prev => [...prev, isHead ? "Head" : "Tail"]);
        }, 300);
    };

    const headsCount = history.filter(x => x === "Head").length;
    const tailsCount = history.filter(x => x === "Tail").length;

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px", color: "#b45309" }}>Step 2: Tossing the 1 Naira Coin (2-Way Chance)</h2>
            <p style={{ color: "#78350f" }}>
                "Toss the coin! If it lands on the 'Crops' side, it's Tails. If it lands on the 'Portrait' side, it's Heads."
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "center", marginTop: "32px" }}>
                <div style={{ background: "#fff", padding: "32px", borderRadius: "16px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
                    <div style={{
                        width: "120px", height: "120px", background: "linear-gradient(#fcd34d, #f59e0b)",
                        borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "inset 0 0 10px #b45309, 0 10px 15px rgba(0,0,0,0.1)", border: "4px solid #fef3c7",
                        fontSize: "24px", fontWeight: "bold", color: "#78350f"
                    }}>
                        {history.length ? history[history.length - 1] : "1 ₦"}
                    </div>
                    <button
                        onClick={handleToss}
                        style={{ padding: "12px 32px", borderRadius: "30px", background: "#f59e0b", color: "#fff", border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}
                    >
                        🪙 Toss Coin
                    </button>
                </div>

                <div style={{ flex: "1 1 250px", background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <h4 style={{ marginBottom: "16px" }}>Results Table</h4>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
                        <thead>
                            <tr style={{ background: "#fef3c7" }}>
                                <th style={{ padding: "8px", borderBottom: "2px solid #f59e0b" }}>Outcome</th>
                                <th style={{ padding: "8px", borderBottom: "2px solid #f59e0b" }}>Tally</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #e2e8f0" }}>Head</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #e2e8f0", fontWeight: "bold" }}>{headsCount}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: "8px", borderBottom: "1px solid #e2e8f0" }}>Tail</td>
                                <td style={{ padding: "8px", borderBottom: "1px solid #e2e8f0", fontWeight: "bold" }}>{tailsCount}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style={{ background: "#f0fdf4", padding: "12px", borderRadius: "8px", color: "#166534", fontSize: "14px" }}>
                        <strong>Calculation:</strong> P(Head) = 1/2 and P(Tail) = 1/2.<br />
                        Because there are exactly 2 equal outcomes in the Sample Space!
                    </div>
                </div>
            </div>
        </div>
    );
}

function Step3Die() {
    return (
        <div>
            <h2 style={{ marginBottom: "16px", color: "#b45309", textAlign: "center" }}>Step 3: The Ludo Die (6-Way Chance)</h2>
            <p style={{ color: "#78350f", textAlign: "center", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>
                "In Ludo, every number from 1 to 6 has the same size and weight on the die. This means they are equally likely."
            </p>

            <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #fde68a" }}>
                <h3 style={{ color: "#b45309", marginBottom: "16px" }}>The Math Challenge</h3>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>What is the probability of rolling an EVEN number (2, 4, or 6)?</p>

                <div style={{ display: "flex", gap: "8px", justifyContent: "center", margin: "24px 0" }}>
                    {[1, 2, 3, 4, 5, 6].map(n => (
                        <div key={n} style={{
                            width: "40px", height: "40px", borderRadius: "8px", background: n % 2 === 0 ? "#22c55e" : "#f1f5f9",
                            color: n % 2 === 0 ? "#fff" : "#64748b", display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: "bold", fontSize: "18px", border: `2px solid ${n % 2 === 0 ? "#166534" : "#cbd5e1"}`
                        }}>
                            {n}
                        </div>
                    ))}
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 auto", maxWidth: "400px", lineHeight: "2" }}>
                    <li><strong style={{ color: "#166534" }}>Step 1:</strong> Count the even numbers (Required) = <strong>3</strong>.</li>
                    <li><strong style={{ color: "#0f172a" }}>Step 2:</strong> Count the total numbers (Sample Space) = <strong>6</strong>.</li>
                    <li style={{ borderTop: "2px solid #e2e8f0", marginTop: "8px", paddingTop: "8px", fontSize: "20px", color: "#b45309" }}>
                        <strong>Step 3: P(Even) = 3/6 = 1/2 (or 50%)</strong>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function Step4Real() {
    const [activeIdx, setActiveIdx] = useState(0);

    const cards = [
        { text: "A student in Ikole-Ekiti wakes up and it's suddenly snowing.", ans: "Impossible", icon: "⛄" },
        { text: "You go to Oja Oba and find someone selling Pounded Yam.", ans: "Certain", icon: "🍲" },
        { text: "A JSS 2 student passes their Math exam after using this platform.", ans: "Highly Likely!", icon: "🎓" }
    ];

    const handleClassify = (choice) => {
        if (choice === cards[activeIdx].ans || (choice === "Likely" && cards[activeIdx].ans.includes("Likely"))) {
            toast.success(`Correct! That is ${cards[activeIdx].ans}.`);
            if (activeIdx < cards.length - 1) setTimeout(() => setActiveIdx(a => a + 1), 1000);
        } else {
            toast.error("Think again about how realistic this is!");
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px", color: "#b45309" }}>Step 4: Real-Life "Chances" in Ekiti</h2>
            <p style={{ color: "#78350f", marginBottom: "24px" }}>Categorize these local events!</p>

            <div style={{ background: "#fff", padding: "40px 24px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", maxWidth: "500px", margin: "0 auto" }}>
                <div style={{ fontSize: "60px", marginBottom: "16px" }}>{cards[activeIdx].icon}</div>
                <h3 style={{ marginBottom: "32px", color: "#0f172a", fontSize: "20px", lineHeight: "1.5" }}>"{cards[activeIdx].text}"</h3>

                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                    <button onClick={() => handleClassify("Impossible")} style={{ padding: "12px 24px", borderRadius: "8px", background: "#ef4444", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold" }}>Impossible</button>
                    <button onClick={() => handleClassify("Likely")} style={{ padding: "12px 24px", borderRadius: "8px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold" }}>Likely</button>
                    <button onClick={() => handleClassify("Certain")} style={{ padding: "12px 24px", borderRadius: "8px", background: "#22c55e", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold" }}>Certain</button>
                </div>
            </div>

            <div style={{ marginTop: "16px", color: "#94a3b8", fontSize: "14px" }}>Event {activeIdx + 1} of {cards.length}</div>
        </div>
    );
}

function Step5Quiz() {
    const [currentQ, setCurrentQ] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        {
            q: "When tossing a coin, what is the 'Sample Space'?",
            opts: ["{Head}", "{Tail}", "{Head, Tail}"],
            ans: 2,
            feedback: "Correct! The sample space contains ALL possible outcomes."
        },
        {
            q: "You roll a Ludo die once. What is the probability of rolling a '6'?",
            opts: ["1/2", "1/6", "6/6"],
            ans: 1,
            feedback: "Spot on! There is only one '6' out of six possible sides."
        },
        {
            q: "Which of these is an 'Impossible' event?",
            opts: ["Rolling a '7' on a standard Ludo die.", "Tossing a coin and getting a Head.", "It raining in Ekiti in June."],
            ans: 0,
            feedback: "Perfect! A regular die only goes up to 6. A 7 is impossible."
        },
        {
            q: "If you toss two coins at the same time, how many total outcomes are possible?\nHint: {HH, HT, TH, TT}",
            opts: ["2", "4", "8"],
            ans: 1,
            feedback: "Correct! The possible outcomes are Head|Head, Head|Tail, Tail|Head, and Tail|Tail."
        }
    ];

    const handleOpt = (idx) => {
        if (idx === questions[currentQ].ans) {
            toast.success(questions[currentQ].feedback, { icon: "✅" });
            setScore(s => s + 1);
        } else {
            toast.error("Incorrect. Try to visualize the event again.", { icon: "❌" });
        }

        if (currentQ < questions.length - 1) {
            setTimeout(() => setCurrentQ(q => q + 1), 1500);
        } else {
            setTimeout(() => setShowResult(true), 1500);
        }
    };

    if (showResult) {
        return (
            <div style={{ textAlign: "center", padding: "40px", background: "#fff", borderRadius: "16px", border: "1px solid #fbbf24" }}>
                <h2 style={{ marginBottom: "16px", color: "#b45309" }}>Quiz Complete</h2>
                <p style={{ fontSize: "18px", color: "#78350f" }}>You are now The Game Master.</p>
                <p style={{ fontWeight: "bold", fontSize: "24px", color: "#10b981", margin: "24px 0" }}>Final Score: {score} / {questions.length}</p>
                <div style={{ display: "inline-block", background: "#fef3c7", color: "#b45309", padding: "10px 24px", borderRadius: "30px", fontSize: "14px", fontWeight: "bold" }}>
                    Proceed to The 30-Second Challenge
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #fde68a" }}>
            <h3 style={{ marginBottom: "24px", color: "#b45309", borderBottom: `1px solid #fef3c7`, paddingBottom: "12px" }}>
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
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; e.currentTarget.style.background = "#fffbeb"; }}
                        onMouseOut={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fafafa"; }}
                    >
                        {String.fromCharCode(65 + i)}. {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}

function Challenge30s() {
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const [rolls, setRolls] = useState(0);
    const [sixes, setSixes] = useState(0);
    const [currentDie, setCurrentDie] = useState("🎲");
    const [completed, setCompleted] = useState(false);

    const timerRef = useRef(null);

    const startGame = () => {
        setIsPlaying(true);
        setRolls(0);
        setSixes(0);
        setTimeLeft(30);
        setCompleted(false);
        timerRef.current = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timerRef.current);
                    setIsPlaying(false);
                    setCompleted(true);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
    };

    const rollDie = () => {
        if (!isPlaying) return;
        playSound("die");
        const result = Math.floor(Math.random() * 6) + 1;
        setCurrentDie(result);
        setRolls(r => r + 1);
        if (result === 6) {
            setSixes(s => s + 1);
            triggerVibration();
            toast.success("SIX!", { icon: "🔥", duration: 500 });
        }
    };

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px", color: "#b45309" }}>Interaction: The 30-Second Challenge</h2>
            <p style={{ color: "#78350f", marginBottom: "24px" }}>
                Roll the digital die as many times as you can in 30 seconds. Try to get as many '6s' as possible!
            </p>

            <div style={{ background: "#fff", padding: "32px", borderRadius: "16px", border: completed ? "2px solid #22c55e" : "1px solid #fde68a", maxWidth: "500px", margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", color: "#0f172a" }}>
                    <div>
                        <div style={{ fontSize: "14px", color: "#64748b" }}>Time Left</div>
                        <div style={{ fontSize: "24px", fontWeight: "bold", color: timeLeft <= 5 ? "#ef4444" : "#0f172a" }}>{timeLeft}s</div>
                    </div>
                    <div>
                        <div style={{ fontSize: "14px", color: "#64748b" }}>Total Rolls</div>
                        <div style={{ fontSize: "24px", fontWeight: "bold" }}>{rolls}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: "14px", color: "#64748b" }}>Hot 6's</div>
                        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#f59e0b" }}>{sixes}</div>
                    </div>
                </div>

                <div style={{
                    width: "120px", height: "120px", background: "#f59e0b", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: currentDie === "🎲" ? "60px" : "50px", fontWeight: "bold",
                    borderRadius: "20px", margin: "0 auto 32px", boxShadow: "0 10px 20px rgba(245, 158, 11, 0.3)",
                    userSelect: "none"
                }}>
                    {currentDie}
                </div>

                {!isPlaying && !completed && (
                    <button
                        onClick={startGame}
                        style={{ padding: "16px 40px", borderRadius: "30px", background: "#22c55e", color: "#fff", border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "20px", boxShadow: "0 4px 10px rgba(34, 197, 94, 0.3)" }}
                    >
                        Start Timer!
                    </button>
                )}

                {isPlaying && (
                    <button
                        onClick={rollDie}
                        style={{ padding: "20px 60px", borderRadius: "40px", background: "#b45309", color: "#fff", border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "24px", boxShadow: "0 10px 20px rgba(180, 83, 9, 0.4)" }}
                    >
                        ROLL!
                    </button>
                )}

                {completed && (
                    <div style={{ background: "#f0fdf4", padding: "20px", borderRadius: "12px", border: "1px dashed #22c55e" }}>
                        <h3 style={{ color: "#166534", marginBottom: "12px" }}>Challenge Completed!</h3>
                        <p style={{ color: "#15803d", fontSize: "16px", margin: 0 }}>
                            You rolled <strong>{rolls}</strong> times.<br />
                            You got '6' exactly <strong>{sixes}</strong> times.<br /><br />
                            Your experimental probability of rolling a 6 was:
                            <span style={{ display: "block", fontSize: "24px", fontWeight: "bold", color: "#10b981", marginTop: "8px" }}>
                                {sixes} / {rolls} {(sixes > 0 ? `(${(sixes / rolls * 100).toFixed(1)}%)` : "")}
                            </span>
                        </p>
                        <button onClick={startGame} style={{ marginTop: "20px", padding: "10px 24px", background: "transparent", border: "1px solid #166534", color: "#166534", borderRadius: "20px", cursor: "pointer" }}>Play Again</button>
                    </div>
                )}
            </div>
        </div>
    );
}
