"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Week6Interactions({ customId }) {
    const containerStyle = {
        background: "#fdf4ff",
        color: "#0f172a",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #f5d0fe",
        minHeight: "400px"
    };

    const renderContent = () => {
        switch (customId) {
            case "week6_hook": return <Hook />;
            case "week6_step1_formula": return <Step1Formula />;
            case "week6_step2_marble": return <Step2Marble />;
            case "week6_step3_experimental": return <Step3Experimental />;
            case "week6_step4_spinner": return <Step4Spinner />;
            case "week6_step5_quiz": return <Step5Quiz />;
            case "week6_summary": return <Summary />;
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
    const [selected, setSelected] = useState(null);

    const handleSelect = (bag) => {
        setSelected(bag);
        if (bag === "B") {
            toast.success("Logic wins! Bag B gives you a 1/5 chance compared to Bag A's 1/10.", { duration: 4000 });
        } else {
            toast.error("Not quite! Bag A has more sweets, but a LOWER chance of chocolate (1/10).", { duration: 4000 });
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px", color: "#86198f" }}>The "Luck vs. Logic" Challenge</h2>
            <p style={{ fontSize: "16px", marginBottom: "32px", color: "#701a75", maxWidth: "600px", margin: "0 auto 32px" }}>
                "If you want the chocolate, which bag should you pick from? Logic tells us Bag B is better. But why? Because the Probability is higher! Today, we learn the math behind the 'Better Choice'."
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", marginBottom: "32px" }}>

                <div
                    onClick={() => !selected && handleSelect("A")}
                    style={{
                        background: "#fff", padding: "24px", borderRadius: "16px", width: "220px",
                        border: selected === "A" ? "4px solid #ef4444" : "2px solid #e2e8f0",
                        cursor: selected ? "default" : "pointer", transition: "transform 0.2s",
                        transform: !selected ? "scale(1)" : (selected === "A" ? "scale(1.05)" : "scale(0.95)"),
                        opacity: selected && selected !== "A" ? 0.6 : 1
                    }}>
                    <h3 style={{ color: "#0f172a", marginBottom: "8px" }}>Bag A</h3>
                    <div style={{ fontSize: "60px", marginBottom: "16px" }}>🛍️</div>
                    <div style={{ fontSize: "14px", color: "#475569", fontWeight: "bold" }}>10 Sweets Total</div>
                    <div style={{ fontSize: "14px", color: "#d97706" }}>Contains 1 Chocolate</div>
                    {selected === "A" && <div style={{ marginTop: "16px", color: "#ef4444", fontWeight: "bold" }}>P = 1/10</div>}
                </div>

                <div
                    onClick={() => !selected && handleSelect("B")}
                    style={{
                        background: "#fff", padding: "24px", borderRadius: "16px", width: "220px",
                        border: selected === "B" ? "4px solid #22c55e" : "2px solid #e2e8f0",
                        cursor: selected ? "default" : "pointer", transition: "transform 0.2s",
                        transform: !selected ? "scale(1)" : (selected === "B" ? "scale(1.05)" : "scale(0.95)"),
                        opacity: selected && selected !== "B" ? 0.6 : 1
                    }}>
                    <h3 style={{ color: "#0f172a", marginBottom: "8px" }}>Bag B</h3>
                    <div style={{ fontSize: "60px", marginBottom: "16px" }}>🎒</div>
                    <div style={{ fontSize: "14px", color: "#475569", fontWeight: "bold" }}>5 Sweets Total</div>
                    <div style={{ fontSize: "14px", color: "#d97706" }}>Contains 1 Chocolate</div>
                    {selected === "B" && <div style={{ marginTop: "16px", color: "#22c55e", fontWeight: "bold" }}>P = 1/5 (Higher Chance!)</div>}
                </div>

            </div>

            {!selected && <p style={{ fontWeight: "bold", color: "#86198f", animation: "pulse 1.5s infinite" }}>Click on the bag you think is better!</p>}
            {selected && (
                <button onClick={() => setSelected(null)} style={{ background: "transparent", color: "#86198f", border: "1px solid #86198f", padding: "8px 16px", borderRadius: "20px", cursor: "pointer" }}>
                    ↻ Reset Choice
                </button>
            )}

            <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
        </div>
    );
}

function Step1Formula() {
    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "24px", color: "#86198f" }}>Step 1: The Master Formula (Revision)</h2>

            <div style={{ background: "#fff", padding: "32px", borderRadius: "16px", display: "inline-block", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", border: "2px solid #f5d0fe" }}>
                <p style={{ margin: "0 0 24px 0", color: "#0f172a", fontSize: "18px" }}>To calculate probability, we always follow this simple ratio:</p>

                <div style={{ background: "#fdf4ff", padding: "24px", borderRadius: "12px", fontSize: "20px", border: "1px dashed #d946ef", color: "#86198f", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
                    <strong>P(Event) = </strong>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ borderBottom: "3px solid #86198f", paddingBottom: "8px", marginBottom: "8px", fontWeight: "bold" }}>Number of Successful Outcomes</span>
                        <span style={{ fontWeight: "bold" }}>Total Number of Possible Outcomes</span>
                    </div>
                </div>

                <div style={{ marginTop: "24px", background: "#fef3c7", padding: "16px", borderRadius: "8px", color: "#b45309", fontSize: "14px", textAlign: "left", borderLeft: "4px solid #f59e0b" }}>
                    <strong>💡 Platform Tip:</strong> Always ensure the <strong>Total</strong> is the denominator (the bottom number).
                </div>
            </div>
        </div>
    );
}

function Step2Marble() {
    const [selectedMarbles, setSelectedMarbles] = useState(0);
    const totalReds = 3;

    const handleClick = (color) => {
        if (color !== 'red') {
            toast.error("That's not a Red marble! We are targeting Red.");
            return;
        }
        if (selectedMarbles < totalReds) {
            setSelectedMarbles(s => s + 1);
            toast.success("Correct! Red Marble added to Result.");
        }
    };

    const marbles = [
        { id: 1, c: 'blue', render: "🔵" }, { id: 2, c: 'blue', render: "🔵" },
        { id: 3, c: 'red', render: "🔴" }, { id: 4, c: 'yellow', render: "🟡" },
        { id: 5, c: 'blue', render: "🔵" }, { id: 6, c: 'red', render: "🔴" },
        { id: 7, c: 'yellow', render: "🟡" }, { id: 8, c: 'blue', render: "🔵" },
        { id: 9, c: 'red', render: "🔴" }, { id: 10, c: 'blue', render: "🔵" }
    ];

    return (
        <div>
            <h2 style={{ marginBottom: "16px", color: "#86198f", textAlign: "center" }}>Step 2: Solving "The Marble Bag" Problem</h2>
            <p style={{ color: "#701a75", textAlign: "center", marginBottom: "24px" }}>
                You have a bag containing 5 Blue marbles, 3 Red marbles, and 2 Yellow marbles.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>

                {/* Rules Box */}
                <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0", width: "300px" }}>
                    <h4 style={{ marginBottom: "16px", color: "#0f172a" }}>Procedural Steps:</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.8", color: "#475569" }}>
                        <li style={{ marginBottom: "8px" }}>1️⃣ <strong style={{ color: "#0f172a" }}>Find the Total:</strong> 5+3+2 = 10.</li>
                        <li style={{ marginBottom: "8px" }}>2️⃣ <strong style={{ color: "#0f172a" }}>Target Event:</strong> Pick a Red marble.</li>
                        <li>3️⃣ <strong style={{ color: "#0f172a" }}>Apply Formula:</strong> P(Red) = ? / 10</li>
                    </ul>
                </div>

                {/* Interactive Box */}
                <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px dashed #d946ef", width: "400px", textAlign: "center" }}>
                    <p style={{ fontWeight: "bold", marginBottom: "16px" }}>Click all RED marbles in the bag:</p>

                    <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "24px" }}>
                        {marbles.map(m => (
                            <div
                                key={m.id}
                                onClick={() => handleClick(m.c)}
                                style={{
                                    fontSize: "32px", cursor: "pointer", transition: "transform 0.1s",
                                    opacity: (m.c === 'red' && selectedMarbles >= totalReds) ? 0.3 : 1
                                }}
                                onMouseOver={e => e.currentTarget.style.transform = "scale(1.2)"}
                                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                            >
                                {m.render}
                            </div>
                        ))}
                    </div>

                    <div style={{ background: selectedMarbles === 3 ? "#dcfce7" : "#f1f5f9", padding: "16px", borderRadius: "8px", border: selectedMarbles === 3 ? "2px solid #22c55e" : "1px solid #cbd5e1" }}>
                        <h4 style={{ marginBottom: "8px", color: "#0f172a" }}>Result: P(Red)</h4>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px", fontWeight: "bold", gap: "16px" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <span style={{ borderBottom: "2px solid #0f172a", paddingBottom: "4px", color: selectedMarbles === 3 ? "#166534" : "#ef4444" }}>{selectedMarbles}</span>
                                <span>10</span>
                            </div>
                            {selectedMarbles === 3 && (
                                <span style={{ color: "#166534" }}>= 0.3</span>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function Step3Experimental() {
    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px", color: "#86198f" }}>Step 3: Experimental vs. Theoretical Probability</h2>
            <p style={{ color: "#475569", marginBottom: "32px" }}>The difference between what should happen mathematically vs what actually happens.</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center", marginBottom: "32px" }}>

                <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", width: "300px", borderTop: "4px solid #3b82f6", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                    <h3 style={{ color: "#1e40af", marginBottom: "16px" }}>Theoretical</h3>
                    <p style={{ color: "#334155", textAlign: "left", lineHeight: "1.6" }}>
                        What <strong>should</strong> happen logically.<br /><br />
                        <em>e.g., Tossing a coin gives an exact 1/2 chance for Heads mathematically.</em>
                    </p>
                </div>

                <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", width: "300px", borderTop: "4px solid #f59e0b", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                    <h3 style={{ color: "#b45309", marginBottom: "16px" }}>Experimental</h3>
                    <p style={{ color: "#334155", textAlign: "left", lineHeight: "1.6" }}>
                        What <strong>actually happened</strong> when you tried it.<br /><br />
                        <em>e.g., You tossed it 10 times and somehow got Heads 7 times.</em>
                    </p>
                </div>

            </div>

            <div style={{ background: "#f0fdf4", padding: "24px", borderRadius: "12px", border: "1px dashed #22c55e", maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
                <h4 style={{ color: "#166534", marginBottom: "12px" }}>⚖️ The Law of Large Numbers</h4>
                <p style={{ color: "#15803d", marginBottom: "16px" }}>
                    The more times you try an experiment, the closer the Experimental result gets to the Theoretical result!
                </p>
                <div style={{ background: "#fff", padding: "12px", borderRadius: "8px", fontSize: "14px", color: "#475569", borderLeft: "4px solid #0ea5e9" }}>
                    <strong>Local Flair:</strong> What is the probability that the striker from Ado-Ekiti FC scores a penalty if he usually misses 2 out of 10? <span style={{ color: "#0284c7", fontWeight: "bold" }}>Experimental P(Miss) = 2/10. So P(Score) = 8/10 (or 4/5!).</span>
                </div>
            </div>
        </div>
    );
}

function Step4Spinner() {
    const [valG, setValG] = useState("");
    const [valT, setValT] = useState("");
    const [simplified, setSimplified] = useState(false);

    const checkVals = () => {
        if (valG === "4" && valT === "8") {
            toast.success("Perfect inputs! 4/8.");
        } else {
            toast.error("Not quite! Count the Green sections and the Total sections carefully.");
        }
    };

    const handleSimplify = () => {
        if (valG === "4" && valT === "8") {
            setSimplified(true);
            toast.success("Simplified directly to 1/2 !", { icon: "✨" });
        } else {
            toast.error("Please enter the correct fraction (4 then 8) before simplifying.");
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px", color: "#86198f" }}>Step 4: The "Spin the Wheel" Challenge</h2>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", alignItems: "center" }}>

                <div style={{
                    width: "250px", height: "250px", borderRadius: "50%",
                    background: "conic-gradient(#22c55e 0deg 90deg, #3b82f6 90deg 180deg, #ef4444 180deg 225deg, #eab308 225deg 270deg, #22c55e 270deg 360deg)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)", border: "4px solid #fff", position: "relative"
                }}>
                    {/* Visual separators */}
                    <div style={{ position: "absolute", top: 0, left: "50%", bottom: 0, width: "2px", background: "#fff", transform: "translateX(-50%)" }} />
                    <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "2px", background: "#fff", transform: "translateY(-50%)" }} />
                    <div style={{ position: "absolute", top: "14.6%", left: "14.6%", right: "14.6%", bottom: "14.6%", border: "2px solid #fff", borderRadius: "50%", pointerEvents: "none", opacity: 0 }} /* just a trick if we needed more lines */ />
                    {/* Diagonals */}
                    <div style={{ position: "absolute", top: 0, left: "49%", bottom: 0, width: "2px", background: "#fff", transform: "rotate(45deg)" }} />
                    <div style={{ position: "absolute", top: 0, left: "49%", bottom: 0, width: "2px", background: "#fff", transform: "rotate(-45deg)" }} />

                    <div style={{ position: "absolute", top: "50%", left: "50%", width: "20px", height: "20px", background: "#0f172a", borderRadius: "50%", transform: "translate(-50%,-50%)" }} />
                </div>

                <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0", width: "320px", textAlign: "left" }}>
                    <h4 style={{ marginBottom: "16px", color: "#0f172a" }}>Task: Probability of landing on Green.</h4>

                    <div style={{ marginBottom: "12px" }}>
                        <label style={{ display: "block", fontSize: "14px", color: "#475569", marginBottom: "4px" }}>Step A: How many green sections?</label>
                        <input type="number" value={valG} onChange={e => setValG(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} placeholder="Enter number..." />
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "14px", color: "#475569", marginBottom: "4px" }}>Step B: How many total sections?</label>
                        <input type="number" value={valT} onChange={e => setValT(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} placeholder="Enter number..." />
                    </div>

                    <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
                        <button onClick={checkVals} style={{ flex: 1, padding: "8px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}>Verify</button>
                        <button onClick={handleSimplify} style={{ flex: 1, padding: "8px", background: "#d946ef", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>✨ Simplify Me</button>
                    </div>

                    {simplified && (
                        <div style={{ background: "#f0fdf4", padding: "16px", borderRadius: "8px", border: "1px dashed #22c55e", textAlign: "center" }}>
                            <div style={{ color: "#166534", fontSize: "14px", marginBottom: "8px" }}>Divide top and bottom by HCF (4):</div>
                            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#15803d" }}>4/8 &rarr; 1/2</div>
                            <div style={{ color: "#166534", fontSize: "14px", marginTop: "4px" }}>or 0.5</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Step5Quiz() {
    const [currentQ, setCurrentQ] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        {
            q: "In a class of 40 students, 24 are girls. If a student is picked at random, what is the probability it is a boy?\n(Hint: Total - Girls = Boys)",
            opts: ["24/40", "16/40", "16/24"],
            ans: 1,
            feedback: "Correct! 40 - 24 = 16 Boys. Formula is required/total -> 16/40."
        },
        {
            q: "A die is rolled once. What is the probability of getting a number greater than 4 (i.e., 5 or 6)?",
            opts: ["1/6", "2/6 (Simplified to 1/3)", "4/6"],
            ans: 1,
            feedback: "Perfect! The valid numbers are 5 and 6 (2 outcomes). Total outcomes is 6. So 2/6."
        },
        {
            q: "You toss a coin 50 times and get 30 Tails. What is the Experimental Probability of getting Tails?",
            opts: ["1/2", "30/50 (Simplified to 3/5)", "20/50"],
            ans: 1,
            feedback: "Spot on! In experimental probability, we use the actual tracked result (30) over the actual number of tries (50)."
        },
        {
            q: "The word 'EKITI' is written on cards and placed in a box. What is the probability of picking the letter 'I'?",
            opts: ["1/5", "2/5", "2/3"],
            ans: 1,
            feedback: "Correct! E-K-I-T-I has 5 letters. There are two 'I's. So 2/5."
        }
    ];

    const handleOpt = (idx) => {
        if (idx === questions[currentQ].ans) {
            toast.success(questions[currentQ].feedback, { icon: "✅" });
            setScore(s => s + 1);
        } else {
            toast.error("Incorrect. Read the hint or ratio carefully.", { icon: "❌" });
        }

        if (currentQ < questions.length - 1) {
            setTimeout(() => setCurrentQ(q => q + 1), 2500); // slightly longer due to complex feedback
        } else {
            setTimeout(() => setShowResult(true), 2500);
        }
    };

    if (showResult) {
        return (
            <div style={{ textAlign: "center", padding: "40px", background: "#fff", borderRadius: "16px", border: "1px solid #f5d0fe" }}>
                <h2 style={{ marginBottom: "16px", color: "#86198f" }}>The Data Scientist Quiz Complete</h2>
                <p style={{ fontWeight: "bold", fontSize: "24px", color: "#10b981", margin: "24px 0" }}>Final Score: {score} / {questions.length}</p>
                <div style={{ display: "inline-block", background: "#fdf4ff", color: "#86198f", padding: "10px 24px", borderRadius: "30px", fontSize: "14px", fontWeight: "bold" }}>
                    Proceed to Rewards
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ marginBottom: "24px", color: "#86198f", borderBottom: `1px solid #fdf4ff`, paddingBottom: "12px" }}>
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
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = "#d946ef"; e.currentTarget.style.background = "#fdf4ff"; }}
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
                width: "150px", height: "150px", margin: "0 auto 32px",
                background: "linear-gradient(135deg, #a21caf 0%, #701a75 100%)",
                borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 20px 40px rgba(162, 28, 175, 0.3)", transform: "rotate(10deg)"
            }}>
                <div style={{ fontSize: "60px", transform: "rotate(-10deg)" }}>🕍</div>
            </div>
            <h1 style={{ marginBottom: "8px", fontSize: "32px", color: "#0f172a" }}>PROBABILITY ARCHITECT</h1>
            <h3 style={{ marginBottom: "24px", color: "#d946ef" }}>Ultimate Badge Unlocked!</h3>
            <p style={{ fontSize: "18px", color: "#475569", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
                You've moved from guessing to calculating! You can now predict outcomes using marbles, dice, and even classroom data. The foundational tools of Statistics are officially yours.
            </p>
        </div>
    );
}
