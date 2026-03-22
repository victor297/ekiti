"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Week3Interactions({ customId }) {
    const containerStyle = {
        background: "#f8fafc",
        color: "#0f172a",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        minHeight: "400px"
    };

    const renderContent = () => {
        switch (customId) {
            case "week3_intro": return <Intro />;
            case "week3_step1_plot": return <Step1Plot />;
            case "week3_step2_interpret": return <Step2Interpret />;
            case "week3_step3_everyday": return <Step3Everyday />;
            case "week3_step4_practice": return <Step4Practice />;
            case "week3_step5_quiz": return <Step5Quiz />;
            case "week3_summary": return <Summary />;
            default: return null;
        }
    };

    return (
        <div style={containerStyle}>
            {renderContent()}
        </div>
    );
}

function Intro() {
    const [sliceValue, setSliceValue] = useState(50); // percentage 0 to 100

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px", color: "#1e293b" }}>Introduction: The Power of the "Circle"</h2>
            <p style={{ fontSize: "16px", marginBottom: "32px", color: "#475569", maxWidth: "600px", margin: "0 auto 32px" }}>
                "A Bar Chart shows us how many, but a Pie Chart shows us the share of the whole. If Ekiti State has 100 Naira, how much goes to schools vs. hospitals? A Pie Chart tells that story instantly!"
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", alignItems: "center" }}>
                <div style={{
                    width: "250px",
                    height: "250px",
                    borderRadius: "50%",
                    background: `conic-gradient(#3b82f6 0% ${sliceValue}%, #10b981 ${sliceValue}% 100%)`,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    transition: "background 0.1s linear",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative"
                }}>
                    <div style={{ width: "80px", height: "80px", background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "20px" }}>
                        ₦100
                    </div>
                </div>

                <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", width: "300px", textAlign: "left" }}>
                    <h4 style={{ marginBottom: "16px" }}>Adjust the Budget:</h4>

                    <div style={{ marginBottom: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "bold", color: "#3b82f6" }}>
                            <span>Schools</span>
                            <span>₦{sliceValue}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", color: "#10b981" }}>
                            <span>Hospitals</span>
                            <span>₦{100 - sliceValue}</span>
                        </div>
                    </div>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliceValue}
                        onChange={(e) => setSliceValue(parseInt(e.target.value))}
                        style={{ width: "100%", accentColor: "#3b82f6" }}
                    />
                </div>
            </div>
        </div>
    );
}

function Step1Plot() {
    const steps = [
        { num: 1, title: "Sum the Data", desc: "Find the Total Frequency (N)." },
        { num: 2, title: "Calculate the Angle", desc: "Convert each item into degrees using: Angle = (Freq / Total Freq) × 360°" },
        { num: 3, title: "Draw the Circle", desc: "Use a compass (or the digital 'Circle Tool')." },
        { num: 4, title: "Measure the Sectors", desc: "Use a protractor starting from the 12 o'clock position (0°)." }
    ];

    return (
        <div>
            <h2 style={{ marginBottom: "24px", color: "#1e293b", textAlign: "center" }}>Step 1: How to Plot a Pie Chart (The Process)</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                {steps.map((s, idx) => (
                    <div key={idx} style={{ background: "#fff", padding: "24px", borderRadius: "12px", borderTop: "4px solid #3b82f6", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                        <div style={{ fontSize: "32px", fontWeight: "bold", color: "#e2e8f0", marginBottom: "8px" }}>0{s.num}</div>
                        <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "#0f172a" }}>{s.title}</h3>
                        <p style={{ color: "#475569", lineHeight: "1.6", fontSize: "14px" }}>{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Step2Interpret() {
    const rules = [
        { title: "Half (180°)", desc: "Exactly half of the data.", angle: 180, color: "#f43f5e" },
        { title: "Quarter (90°)", desc: "Exactly one-fourth (1/4) of the data.", angle: 90, color: "#f59e0b" },
        { title: "The Largest Slice", desc: "The Mode (the most common item).", angle: 250, color: "#8b5cf6" }
    ];

    return (
        <div>
            <h2 style={{ marginBottom: "16px", color: "#1e293b", textAlign: "center" }}>Step 2: Interpreting the Slices</h2>
            <p style={{ fontSize: "16px", marginBottom: "32px", color: "#475569", textAlign: "center" }}>
                "You don't always need the numbers to understand a Pie Chart. Just look at the size!"
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" }}>
                {rules.map((rule, idx) => (
                    <div key={idx} style={{ background: "#fff", padding: "24px", borderRadius: "12px", width: "250px", textAlign: "center", border: `2px solid ${rule.color}33` }}>
                        <div style={{
                            width: "100px",
                            height: "100px",
                            margin: "0 auto 16px",
                            borderRadius: "50%",
                            background: `conic-gradient(${rule.color} 0deg ${rule.angle}deg, #e2e8f0 ${rule.angle}deg 360deg)`
                        }} />
                        <h4 style={{ color: rule.color, marginBottom: "8px" }}>{rule.title}</h4>
                        <p style={{ fontSize: "14px", color: "#475569" }}>{rule.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Step3Everyday() {
    const uses = [
        { title: "Government Budgets", desc: "How the Governor allocates funds to different local governments.", icon: "🏛️", color: "#3b82f6" },
        { title: "Agriculture", desc: "A farmer showing the percentage of his land used for Yam, Cassava, and Cocoa.", icon: "🌾", color: "#10b981" },
        { title: "Climate", desc: "Showing the percentage of rainy days vs. sunny days in a year.", icon: "⛅", color: "#0ea5e9" },
        { title: "Business", desc: "A trader at Oja Oba seeing which product brings the most profit.", icon: "🛍️", color: "#8b5cf6" }
    ];

    return (
        <div>
            <h2 style={{ marginBottom: "16px", color: "#1e293b", textAlign: "center" }}>Step 3: Statistics in Everyday Life</h2>
            <p style={{ fontSize: "16px", marginBottom: "32px", color: "#475569", textAlign: "center" }}>Why are we learning this? Real-world applications in Ekiti:</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                {uses.map((use, idx) => (
                    <div key={idx} style={{ background: "#fff", padding: "20px", borderRadius: "12px", display: "flex", alignItems: "flex-start", gap: "16px", border: "1px solid #e2e8f0", transition: "transform 0.2s", cursor: "default" }} onMouseOver={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
                        <div style={{ fontSize: "32px", background: `${use.color}22`, width: "60px", height: "60px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {use.icon}
                        </div>
                        <div>
                            <h4 style={{ color: "#0f172a", marginBottom: "4px" }}>{use.title}</h4>
                            <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5" }}>{use.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Step4Practice() {
    const [angle, setAngle] = useState(0);
    const [isDone, setIsDone] = useState(false);

    // Election Data = 40 total. Tunde = 20 (50% = 180deg). Ekene = 10 (25% = 90deg). Sola = 10 (25% = 90deg).

    const handleAngleChange = (e) => {
        const val = parseInt(e.target.value);
        setAngle(val);
        if (val === 180 && !isDone) {
            setIsDone(true);
            toast.success("Perfect! 180° is a straight cut across the circle.");
            // Teacher Notification simulation
            toast("Teacher Notification: Student achieved Tunde's angle properly.", { icon: "📊", position: "bottom-left" });
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: "16px", color: "#1e293b" }}>Interactive Practice: "The Ekiti Election"</h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center" }}>
                <div style={{ flex: "1 1 250px", background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <h4 style={{ marginBottom: "16px", color: "#0ea5e9" }}>Class Captain Votes</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px 0", fontSize: "16px", color: "#475569" }}>
                        <li style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}><strong style={{ color: "#f43f5e" }}>Tunde:</strong> <span>20 votes</span></li>
                        <li style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}><strong style={{ color: "#f59e0b" }}>Ekene:</strong> <span>10 votes</span></li>
                        <li style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}><strong style={{ color: "#10b981" }}>Sola:</strong> <span>10 votes</span></li>
                        <li style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e2e8f0", paddingTop: "8px", fontWeight: "bold", color: "#0f172a" }}><span>Total:</span> <span>40 votes</span></li>
                    </ul>

                    <div style={{ background: "#f0fdf4", padding: "16px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
                        <h5 style={{ margin: "0 0 8px", color: "#166534" }}>Task: Draw Tunde's Slice</h5>
                        <p style={{ margin: "0 0 8px", fontSize: "14px", color: "#15803d" }}>Calculation: (20/40) × 360° = ...</p>
                        <p style={{ margin: 0, fontSize: "14px", color: "#15803d", fontWeight: "bold" }}>Slide the protractor until it hits exactly 180°</p>
                    </div>
                </div>

                <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", alignItems: "center", background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", color: angle === 180 ? "#10b981" : "#3b82f6" }}>
                        Current Angle: {angle}°
                    </div>

                    <div style={{
                        width: "250px",
                        height: "250px",
                        borderRadius: "50%",
                        background: `conic-gradient(#f43f5e 0deg ${angle}deg, #f1f5f9 ${angle}deg 360deg)`,
                        position: "relative",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                        marginBottom: "32px",
                        border: "2px solid #cbd5e1"
                    }}>
                        {/* Protractor visual overlay line */}
                        <div style={{ position: "absolute", top: 0, left: "50%", width: "2px", height: "50%", background: "#0f172a", transformOrigin: "bottom center" }} />
                        <div style={{ position: "absolute", top: 0, left: "50%", width: "4px", height: "50%", background: "#f43f5e", transformOrigin: "bottom center", transform: `translate(-50%) rotate(${angle}deg)`, opacity: isDone ? 1 : 0.8 }} />
                    </div>

                    <div style={{ width: "100%", padding: "0 16px", position: "relative" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>
                            <span>0°</span>
                            <span>180°</span>
                            <span>360°</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={angle}
                            onChange={handleAngleChange}
                            disabled={isDone}
                            style={{ width: "100%", accentColor: isDone ? "#10b981" : "#f43f5e", cursor: isDone ? "default" : "pointer" }}
                        />
                    </div>
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
            q: "What is the first step in plotting a Pie Chart?",
            opts: ["Drawing the circle.", "Finding the total sum of the data.", "Coloring the slices."],
            ans: 1,
            feedback: "Correct! You must find the Total Frequency (N) first."
        },
        {
            q: "If an item has a frequency of 5 out of a total of 20, what is its angle?\n(Hint: 5/20 is 1/4. What is 1/4 of 360?)",
            opts: ["45°", "90°", "100°"],
            ans: 1,
            feedback: "Great job! A quarter of a circle is 90°."
        },
        {
            q: "Looking at a Pie Chart, you see a slice that takes up exactly half the circle. What is its angle?",
            opts: ["90°", "180°", "360°"],
            ans: 1,
            feedback: "Perfect! Half of 360 is 180°."
        },
        {
            q: "Which of these is a benefit of using a Pie Chart in real life?",
            opts: ["It shows exactly how many items are in a list.", "It makes it easy to compare parts of a whole at a glance.", "It is the only way to do Math."],
            ans: 1,
            feedback: "Correct! Pie charts are best for seeing the 'share of the whole' visually."
        }
    ];

    const handleOpt = (idx) => {
        if (idx === questions[currentQ].ans) {
            toast.success(questions[currentQ].feedback, { icon: "✅" });
            setScore(s => s + 1);
        } else {
            toast.error("Incorrect. Try looking closely at the concept.", { icon: "❌" });
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
                <h2 style={{ marginBottom: "16px", color: "#0f172a" }}>Evaluation Complete</h2>
                <p style={{ fontSize: "18px", color: "#475569" }}>You've finished the Pie Chart Final Quiz.</p>
                <p style={{ fontWeight: "bold", fontSize: "24px", color: "#10b981", margin: "24px 0" }}>Final Score: {score} / {questions.length}</p>
                <div style={{ display: "inline-block", background: "#e0f2fe", color: "#0369a1", padding: "10px 24px", borderRadius: "30px", fontSize: "14px", fontWeight: "bold" }}>
                    Proceed to The Graduation
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
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.background = "#eff6ff"; }}
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
                width: "150px",
                height: "150px",
                margin: "0 auto 32px",
                background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
                borderRadius: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
                animation: "jump 2s ease-in-out infinite"
            }}>
                <div style={{ fontSize: "60px" }}>🎓</div>
            </div>
            <h1 style={{ marginBottom: "8px", fontSize: "32px", color: "#0f172a" }}>THE EKITI ANALYST</h1>
            <h3 style={{ marginBottom: "24px", color: "#166534" }}>Badge Unlocked!</h3>
            <p style={{ fontSize: "18px", color: "#475569", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
                You are now a Data Expert! You can collect it (Tally), organize it (Tables), and present it (Charts). Data is the language of the future.
            </p>

            <style>{`@keyframes jump { 0%, 100% { transform: translateY(0px) rotate(0deg); } 25% { transform: translateY(-20px) rotate(5deg); } 75% { transform: translateY(-10px) rotate(-5deg); } }`}</style>
        </div>
    );
}
