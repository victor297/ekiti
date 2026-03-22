"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Week2Interactions({ customId }) {
    const [isDarkMode, setIsDarkMode] = useState(true); // Default high-contrast dark mode as requested

    const containerStyle = {
        background: isDarkMode ? "#0f172a" : "#f8fafc",
        color: isDarkMode ? "#f8fafc" : "#0f172a",
        padding: "24px",
        borderRadius: "12px",
        transition: "all 0.3s ease",
        border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
        minHeight: "400px"
    };

    const TopBar = () => (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`, paddingBottom: "10px" }}>
            <span style={{ fontWeight: "bold", fontSize: "14px", color: isDarkMode ? "#94a3b8" : "#64748b" }}>
                🎨 The Data Artist
            </span>
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{
                    background: "transparent",
                    border: `1px solid ${isDarkMode ? "#475569" : "#cbd5e1"}`,
                    color: isDarkMode ? "#f8fafc" : "#0f172a",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "12px"
                }}
            >
                {isDarkMode ? "☀️ Light Mode" : "🌙 Night Mode"}
            </button>
        </div>
    );

    const renderContent = () => {
        switch (customId) {
            case "week2_intro": return <Intro isDark={isDarkMode} />;
            case "week2_step1_pictogram": return <Step1Pictogram isDark={isDarkMode} />;
            case "week2_step2_barchart": return <Step2BarChart isDark={isDarkMode} />;
            case "week2_step3_piechart": return <Step3PieChart isDark={isDarkMode} />;
            case "week2_step4_practice": return <Step4Practice isDark={isDarkMode} />;
            case "week2_step5_quiz": return <Step5Quiz isDark={isDarkMode} />;
            case "week2_summary": return <Summary isDark={isDarkMode} />;
            default: return null;
        }
    };

    return (
        <div style={containerStyle}>
            <TopBar />
            {renderContent()}
        </div>
    );
}

function Intro({ isDark }) {
    const [flashing, setFlashing] = useState(false);

    return (
        <div>
            <h2 style={{ marginBottom: "16px" }}>Introduction: From Tables to Pictures</h2>
            <p style={{ fontSize: "16px", marginBottom: "24px", color: isDark ? "#cbd5e1" : "#475569" }}>
                Look at this frequency table of students' favourite subjects in Ikole-Ekiti. Now look at the Bar Chart. Which one tells you the 'winner' faster?
            </p>

            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {/* Table Side */}
                <div style={{ flex: "1 1 min-content", background: isDark ? "#1e293b" : "#fff", padding: "16px", borderRadius: "8px", border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}` }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: isDark ? "#334155" : "#f1f5f9" }}>
                                <th style={{ padding: "12px", textAlign: "left" }}>Subject</th>
                                <th style={{ padding: "12px", textAlign: "right" }}>Students</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[{ s: "Math", c: 45 }, { s: "English", c: 20 }, { s: "Basic Sci", c: 35 }].map((row, i) => (
                                <tr key={i} style={{ borderBottom: `1px solid ${isDark ? "#334155" : "#e2e8f0"}` }}>
                                    <td style={{ padding: "12px" }}>{row.s}</td>
                                    <td style={{ padding: "12px", textAlign: "right" }}>{row.c}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Chart Side */}
                <div style={{ flex: "1 1 min-content", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", background: isDark ? "#1e293b" : "#fff", padding: "16px", borderRadius: "8px", border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`, minHeight: "200px" }}>
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-end", height: "150px" }}>
                        <div style={{ width: "40px", height: "100%", background: "#3b82f6", borderRadius: "4px 4px 0 0", transition: "all 0.3s", opacity: flashing ? 1 : 0.8, boxShadow: flashing ? "0 0 20px #3b82f6" : "none", animation: flashing ? "pulse 1s infinite alternate" : "none" }} />
                        <div style={{ width: "40px", height: "40%", background: "#94a3b8", borderRadius: "4px 4px 0 0" }} />
                        <div style={{ width: "40px", height: "70%", background: "#64748b", borderRadius: "4px 4px 0 0" }} />
                    </div>
                    <div style={{ display: "flex", gap: "16px", marginTop: "8px", fontSize: "12px", color: isDark ? "#cbd5e1" : "#475569" }}>
                        <span style={{ width: "40px", textAlign: "center" }}>Math</span>
                        <span style={{ width: "40px", textAlign: "center" }}>Eng</span>
                        <span style={{ width: "40px", textAlign: "center" }}>Sci</span>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "24px", textAlign: "center" }}>
                <button
                    onClick={() => setFlashing(!flashing)}
                    style={{ padding: "12px 24px", borderRadius: "8px", background: "#f59e0b", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}
                >
                    {flashing ? "Stop Animation" : "Find the Winner (Flash Layout)"}
                </button>
            </div>
            <style>{`@keyframes pulse { from { transform: scale(1); } to { transform: scale(1.05); } }`}</style>
        </div>
    );
}

function Step1Pictogram({ isDark }) {
    const [buses, setBuses] = useState([]);

    const addBus = () => {
        if (buses.length >= 4) {
            toast.error("Too many! Remember, each bus equals 10.");
            if (buses.length === 4) setBuses([...buses, 1]); // allow the mistake to show the 5th icon temporarily
            return;
        }
        setBuses([...buses, 1]);
    };

    const removeBus = () => {
        setBuses(buses.slice(0, -1));
    };

    return (
        <div>
            <h2 style={{ marginBottom: "16px" }}>Step 1: The Pictogram (The Icon Map)</h2>
            <p style={{ color: isDark ? "#cbd5e1" : "#475569", marginBottom: "24px", fontSize: "16px" }}>
                A Pictogram uses pictures or symbols to represent data. Each picture has a Key (the value of one icon).<br /><br />
                <strong style={{ color: "#38bdf8" }}>Key: 🚌 = 10 students.</strong>
            </p>

            <div style={{ background: isDark ? "#1e293b" : "#f1f5f9", padding: "24px", borderRadius: "8px", textAlign: "center" }}>
                <h3 style={{ marginBottom: "16px" }}>Task: "Represent 40 students who take the bus to school."</h3>

                <div style={{ minHeight: "80px", border: `2px dashed ${isDark ? "#475569" : "#cbd5e1"}`, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", padding: "16px", marginBottom: "24px" }}>
                    {buses.length === 0 && <span style={{ color: isDark ? "#475569" : "#94a3b8" }}>Drop icons here</span>}
                    {buses.map((_, i) => (
                        <span key={i} style={{ fontSize: "40px", animation: "popIn 0.3s ease-out" }}>🚌</span>
                    ))}
                </div>

                <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                    <button
                        onClick={addBus}
                        style={{ padding: "12px 24px", cursor: "pointer", borderRadius: "8px", border: "1px solid #38bdf8", background: "transparent", color: "#38bdf8", fontWeight: "bold", fontSize: "16px" }}
                    >
                        + Add Bus Icon (Drag/Click)
                    </button>
                    <button
                        onClick={removeBus}
                        disabled={buses.length === 0}
                        style={{ padding: "12px 24px", cursor: buses.length === 0 ? "default" : "pointer", borderRadius: "8px", border: "1px solid #ef4444", background: "transparent", color: buses.length === 0 ? "gray" : "#ef4444", fontWeight: "bold", fontSize: "16px" }}
                    >
                        - Remove
                    </button>
                </div>
            </div>

            {buses.length === 4 && (
                <div style={{ marginTop: "16px", padding: "12px", background: "rgba(34, 197, 94, 0.2)", color: "#22c55e", borderRadius: "8px", textAlign: "center", fontWeight: "bold" }}>
                    Correct! 4 buses × 10 students = 40 students.
                </div>
            )}

            <style>{`@keyframes popIn { 0% { transform: scale(0); } 80% { transform: scale(1.2); } 100% { transform: scale(1); } }`}</style>
        </div>
    );
}

function Step2BarChart({ isDark }) {
    const [data, setData] = useState({ math: 20, eng: 40, sci: 60 });

    const maxFreq = 100;

    const handleInput = (subject, val) => {
        const num = parseInt(val) || 0;
        if (num <= 100) setData({ ...data, [subject]: num });
    };

    return (
        <div>
            <h2 style={{ marginBottom: "16px" }}>Step 2: The Bar Chart (The Comparison King)</h2>

            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "24px" }}>
                <div style={{ flex: "1 1 auto" }}>
                    <ul style={{ color: isDark ? "#cbd5e1" : "#475569", lineHeight: "1.8", paddingLeft: "20px" }}>
                        <li>Bar charts use vertical or horizontal bars.</li>
                        <li>The height represents the <strong>Frequency</strong>.</li>
                        <li>Bars must be of <strong>equal width</strong>.</li>
                        <li>There must be <strong>equal gaps</strong> between the bars.</li>
                        <li>Axes must be clearly labelled.</li>
                    </ul>
                </div>
            </div>

            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 200px", background: isDark ? "#1e293b" : "#f1f5f9", padding: "16px", borderRadius: "8px" }}>
                    <h4 style={{ marginBottom: "16px" }}>Mini Spreadsheet</h4>
                    {Object.entries(data).map(([key, val]) => (
                        <div key={key} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center" }}>
                            <span style={{ textTransform: "capitalize", width: "80px" }}>{key}</span>
                            <input
                                type="number"
                                value={val}
                                onChange={(e) => handleInput(key, e.target.value)}
                                style={{ width: "80px", padding: "8px", borderRadius: "4px", border: `1px solid ${isDark ? "#475569" : "#cbd5e1"}`, background: isDark ? "#0f172a" : "#fff", color: isDark ? "#fff" : "#000" }}
                            />
                        </div>
                    ))}
                    <p style={{ fontSize: "12px", color: isDark ? "#94a3b8" : "gray", marginTop: "16px" }}>*Max value is 100</p>
                </div>

                <div style={{ flex: "2 1 300px", background: isDark ? "#1e293b" : "#f1f5f9", padding: "16px", borderRadius: "8px", display: "flex", flexDirection: "column" }}>
                    <div style={{ position: "relative", height: "200px", borderLeft: `2px solid ${isDark ? "#94a3b8" : "#64748b"}`, borderBottom: `2px solid ${isDark ? "#94a3b8" : "#64748b"}`, display: "flex", alignItems: "flex-end", justifyContent: "space-around", padding: "0 16px" }}>

                        {/* Y-axis Label */}
                        <div style={{ position: "absolute", left: "-30px", top: "50%", transform: "translateY(-50%) rotate(-90deg)", color: isDark ? "#94a3b8" : "#64748b", fontSize: "12px", fontWeight: "bold" }}>
                            Frequency
                        </div>

                        {Object.entries(data).map(([key, val]) => (
                            <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40px" }}>
                                <div style={{ color: isDark ? "#cbd5e1" : "#475569", fontSize: "12px", marginBottom: "4px" }}>{val}</div>
                                <div
                                    style={{
                                        width: "100%",
                                        height: `${(val / maxFreq) * 160}px`,
                                        background: key === "math" ? "#f43f5e" : key === "eng" ? "#0ea5e9" : "#10b981",
                                        transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        borderRadius: "4px 4px 0 0"
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 16px 0", color: isDark ? "#94a3b8" : "#64748b", fontSize: "12px", fontWeight: "bold" }}>
                        <span style={{ marginLeft: "10px" }}>Math</span>
                        <span>English</span>
                        <span>Science</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Step3PieChart({ isDark }) {
    return (
        <div>
            <h2 style={{ marginBottom: "16px" }}>Step 3: The Pie Chart (The Proportion Slice)</h2>
            <p style={{ color: isDark ? "#cbd5e1" : "#475569", marginBottom: "24px", fontSize: "16px" }}>
                A Pie Chart is a circle divided into "slices." To draw it, we must convert our frequency into degrees.
            </p>

            <div style={{ background: isDark ? "#1eb4a" : "#eff6ff", borderLeft: "4px solid #3b82f6", padding: "24px", borderRadius: "0 8px 8px 0", marginBottom: "24px", background: isDark ? "#1e293b" : "#eff6ff" }}>
                <h3 style={{ color: "#3b82f6", marginBottom: "16px" }}>The Formula</h3>
                <div style={{ background: isDark ? "#0f172a" : "#fff", padding: "16px", borderRadius: "8px", textAlign: "center", fontFamily: "monospace", fontSize: "18px", border: `1px solid ${isDark ? "#334155" : "#bfdbfe"}` }}>
                    <strong>Angle of Sector</strong> = (Frequency of Item / Total Frequency) × 360°
                </div>
            </div>

            <div style={{ padding: "24px", border: `1px dashed ${isDark ? "#475569" : "#cbd5e1"}`, borderRadius: "8px" }}>
                <h4 style={{ marginBottom: "12px" }}>Worked Example:</h4>
                <p style={{ color: isDark ? "#cbd5e1" : "#475569", lineHeight: "1.8" }}>
                    If 10 out of 40 students like Math:<br />
                    Angle = (10 / 40) × 360°<br />
                    Angle = 0.25 × 360°<br />
                    <strong style={{ color: "#22c55e", fontSize: "20px" }}>Angle = 90°</strong> (A right-angle slice!)
                </p>
            </div>
        </div>
    );
}

function Step4Practice({ isDark }) {
    const [hint, setHint] = useState(false);
    const [success, setSuccess] = useState(null); // null, true, false

    const towns = [
        { name: "Ado", tons: 500, color: "#f43f5e", angle: 180 },
        { name: "Ikole", tons: 300, color: "#0ea5e9", angle: 108 },
        { name: "Omuo", tons: 200, color: "#10b981", angle: 72 }
    ];

    /* 
      Ado: 500/1000 * 360 = 180 deg (50%)
      Ikole: 300/1000 * 360 = 108 deg (30%)
      Omuo: 200/1000 * 360 = 72 deg (20%)
    */

    const handleSliceClick = (townName) => {
        if (townName === "Ikole") {
            setSuccess(true);
            toast.success("Correct! Ikole is exactly 108°");
        } else {
            setSuccess(false);
            toast.error(`Incorrect. That is the slice for ${townName}.`);
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: "16px" }}>Step 4: Interactive Practice "The Ekiti Harvest"</h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center" }}>

                <div style={{ flex: "1 1 200px" }}>
                    <p style={{ color: isDark ? "#cbd5e1" : "#475569", marginBottom: "16px" }}>The platform presents data on Yam production in three Ekiti towns:</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", color: isDark ? "#e2e8f0" : "#1e293b", fontWeight: "bold", fontSize: "16px" }}>
                        <li style={{ marginBottom: "8px" }}>Ado: 500 Tons</li>
                        <li style={{ color: "#0ea5e9", marginBottom: "8px" }}>Ikole: 300 Tons</li>
                        <li style={{ marginBottom: "8px" }}>Omuo: 200 Tons</li>
                        <li style={{ borderTop: `1px solid ${isDark ? "#475569" : "#cbd5e1"}`, paddingTop: "8px", marginTop: "8px" }}>Total: 1,000 Tons</li>
                    </ul>

                    <div style={{ background: isDark ? "#1e293b" : "#f1f5f9", padding: "16px", borderRadius: "8px", borderLeft: "4px solid #f59e0b" }}>
                        <h4 style={{ margin: "0 0 8px 0" }}>Task:</h4>
                        <p style={{ margin: 0, color: isDark ? "#cbd5e1" : "#475569" }}>Click on the correct slice of the Pie Chart that represents <strong>Ikole</strong>.</p>
                    </div>

                    <div style={{ marginTop: "16px" }}>
                        <button
                            onClick={() => setHint(true)}
                            style={{ background: isDark ? "#334155" : "#e2e8f0", color: isDark ? "#f8fafc" : "#0f172a", border: "none", padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "12px" }}
                        >
                            💡 Hint Button
                        </button>
                        {hint && <p style={{ marginTop: "8px", color: "#f59e0b", fontSize: "14px", fontWeight: "bold" }}>Hint: Calculate the angle first! 300/1000 × 360 = ?</p>}
                    </div>
                </div>

                {/* Visual representation of Pie Chart via discrete interactive blocks to accurately capture clicks */}
                <div style={{ flex: "1 1 200px", display: "flex", justifyContent: "center", position: "relative" }}>
                    {/* We will build a CSS pie chart layout using conic-gradient, but we need clickable regions. 
              Since exact SVG pie slices is complex inline, we'll emulate the UI choice by providing the slices 
              as clear color-coded buttons that visually represent the chart proportion in a row or flex block. 
              Wait, pie charts can be made with conic-gradient, but making them clickable per slice in pure CSS is tricky.
              Let's create an intuitive layout.
          */}

                    <div style={{ width: "240px", height: "240px", borderRadius: "50%", background: `conic-gradient(#f43f5e 0% 50%, #0ea5e9 50% 80%, #10b981 80% 100%)`, position: "relative", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>

                        {/* Overlay buttons to make them clickable. Absolutely positioning invisible or semi-visible buttons over regions */}
                        {/* Ado: 50% Right side. Ikole: 30% Left-bottom. Omuo: 20% Left-top. Actually:
                Ado starts at 0deg (top right to bottom right) -> right half.
                Ikole starts at 180deg (bottom left to mid left) -> 180 to 288.
                Omuo starts at 288deg to 360 -> mid left to top left.
             */}

                        {/* Ado Overlay */}
                        <div onClick={() => handleSliceClick("Ado")} style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "240px", borderRadius: "0 120px 120px 0", cursor: "pointer" }} />

                        {/* Ikole and Omuo Overlays (Approximated via flex blocks on the left half) */}
                        <div style={{ position: "absolute", top: 0, left: 0, width: "120px", height: "120px", borderRadius: "120px 0 0 0", cursor: "pointer" }} onClick={() => handleSliceClick("Omuo")} />

                        <div style={{ position: "absolute", bottom: 0, left: 0, width: "120px", height: "120px", borderRadius: "0 0 0 120px", cursor: "pointer" }} onClick={() => handleSliceClick("Ikole")} />

                        {/* Labels overlay */}
                        <div style={{ position: "absolute", top: "50%", left: "75%", transform: "translate(-50%, -50%)", color: "white", fontWeight: "bold", textShadow: "1px 1px 2px #000", pointerEvents: "none" }}>180°</div>
                        <div style={{ position: "absolute", top: "75%", left: "30%", transform: "translate(-50%, -50%)", color: "white", fontWeight: "bold", textShadow: "1px 1px 2px #000", pointerEvents: "none" }}>108°</div>
                        <div style={{ position: "absolute", top: "25%", left: "30%", transform: "translate(-50%, -50%)", color: "white", fontWeight: "bold", textShadow: "1px 1px 2px #000", pointerEvents: "none" }}>72°</div>
                    </div>

                </div>

            </div>

            {success !== null && (
                <div style={{ marginTop: "24px", padding: "16px", background: success ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)", color: success ? "#22c55e" : "#ef4444", borderRadius: "8px", textAlign: "center", fontWeight: "bold", fontSize: "18px" }}>
                    {success ? "Amazing job! You analyzed the data properly." : "Oops! Look at the hint and try matching the angle to the correct slice."}
                </div>
            )}
        </div>
    );
}

function Step5Quiz({ isDark }) {
    const [currentQ, setCurrentQ] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        {
            q: "In a Bar Chart, what does the 'height' of the bar represent?",
            opts: ["The name of the item.", "The frequency (how many).", "The width of the paper."],
            ans: 1,
            feedback: "Correct! Height represents Frequency."
        },
        {
            q: "If 1 Tree icon = 50 trees, how many icons do you need to represent 250 trees?",
            opts: ["4", "5", "10"],
            ans: 1,
            feedback: "Spot on! 250 divided by 50 is 5."
        },
        {
            q: "What is the total number of degrees in a Pie Chart?",
            opts: ["90°", "180°", "360°"],
            ans: 2,
            feedback: "Perfect! A full circle is always 360 degrees."
        },
        {
            q: "True or False: In a Bar Chart, the bars should be touching each other.",
            opts: ["True", "False"],
            ans: 1,
            feedback: "Correct! That's False. Touching bars are for Histograms, which you'll learn later!"
        }
    ];

    const handleOpt = (idx) => {
        if (idx === questions[currentQ].ans) {
            toast.success(questions[currentQ].feedback, { icon: "✅" });
            setScore(s => s + 1);
        } else {
            toast.error("Incorrect!", { icon: "❌" });
        }

        if (currentQ < questions.length - 1) {
            setTimeout(() => setCurrentQ(q => q + 1), 1500);
        } else {
            setTimeout(() => setShowResult(true), 1500);
        }
    };

    if (showResult) {
        return (
            <div style={{ textAlign: "center", padding: "40px", background: isDark ? "#1e293b" : "#f8fafc", borderRadius: "16px" }}>
                <h2 style={{ marginBottom: "16px" }}>Quiz Complete!</h2>
                <p style={{ fontSize: "18px", color: isDark ? "#cbd5e1" : "#475569" }}>You have finished the Final Boss.</p>
                <p style={{ fontWeight: "bold", fontSize: "24px", color: "#10b981", margin: "24px 0" }}>Final Score: {score} / {questions.length}</p>
                <div style={{ display: "inline-block", background: "rgba(59, 130, 246, 0.2)", color: "#3b82f6", padding: "8px 16px", borderRadius: "30px", fontSize: "14px", fontWeight: "bold" }}>
                    Proceed to Summary & Reward
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h3 style={{ marginBottom: "24px", color: isDark ? "#94a3b8" : "#64748b", borderBottom: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`, paddingBottom: "12px" }}>
                Question {currentQ + 1} of {questions.length}
            </h3>
            <p style={{ fontSize: "20px", fontWeight: "600", marginBottom: "32px", color: isDark ? "#f8fafc" : "#0f172a" }}>
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
                            background: isDark ? "#1e293b" : "#fff",
                            border: `2px solid ${isDark ? "#334155" : "#e2e8f0"}`,
                            color: isDark ? "#f8fafc" : "#0f172a",
                            borderRadius: "12px",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.background = isDark ? "#0f172a" : "#eff6ff"; }}
                        onMouseOut={(e) => { e.currentTarget.style.borderColor = isDark ? "#334155" : "#e2e8f0"; e.currentTarget.style.background = isDark ? "#1e293b" : "#fff"; }}
                    >
                        {String.fromCharCode(65 + i)}. {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}

function Summary({ isDark }) {
    return (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{
                width: "150px",
                height: "150px",
                margin: "0 auto 32px",
                background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px rgba(245, 158, 11, 0.4)",
                animation: "float 3s ease-in-out infinite"
            }}>
                <div style={{ fontSize: "60px" }}>🎨</div>
            </div>
            <h1 style={{ marginBottom: "16px", fontSize: "32px", color: isDark ? "#f8fafc" : "#0f172a" }}>DATA VIZ PRO</h1>
            <p style={{ fontSize: "18px", color: isDark ? "#cbd5e1" : "#475569", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
                You've learned to turn numbers into art! You now know how to use Pictograms for icons, Bar Charts for comparison, and Pie Charts for parts of a whole.
            </p>

            <style>{`@keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }`}</style>
        </div>
    );
}
