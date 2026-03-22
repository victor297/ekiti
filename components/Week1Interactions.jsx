"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Week1Interactions({ customId }) {
    if (customId === "week1_hook") return <Hook />;
    if (customId === "week1_step1_defining") return <Step1Defining />;
    if (customId === "week1_step2_collect") return <Step2Collect />;
    if (customId === "week1_step3_tally") return <Step3Tally />;
    if (customId === "week1_step4_freq_table") return <Step4FreqTable />;
    if (customId === "week1_step5_quiz") return <Step5Quiz />;
    if (customId === "week1_challenge") return <PracticeChallenge />;

    return null;
}

function Hook() {
    const [started, setStarted] = useState(false);

    if (started) {
        return (
            <div style={{ textAlign: "center", padding: 40 }}>
                <h2>Mission Accepted!</h2>
                <p>You are now a certified Data Detective. Proceed to your first lesson.</p>
            </div>
        );
    }

    return (
        <div style={{ background: "#f8fafc", borderRadius: 12, padding: 24, textAlign: "center" }}>
            <h2 style={{ color: "#0f172a", marginBottom: 16 }}>Introduction: The "Why?"</h2>
            <div style={{ background: "#000", borderRadius: 12, overflow: "hidden", position: "relative", marginBottom: 24 }}>
                <video
                    src="https://videos.pexels.com/video-files/30129759/12711718_640_360_50fps.mp4"
                    controls
                    style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
                    poster="https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
            </div>
            <p style={{ fontSize: 18, color: "#334155", fontStyle: "italic", marginBottom: 24 }}>
                "Have you ever wondered how the government knows how many bags of rice are sold in Ekiti every month?
                Or how your principal knows which house is winning Inter-house sports? They use Statistics!"
            </p>
            <button
                onClick={() => setStarted(true)}
                className="button primary"
                style={{ fontSize: 18, padding: "12px 32px", borderRadius: 30, background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", border: "none" }}
            >
                🕵🏽‍♂️ Become a Data Detective
            </button>
        </div>
    );
}

function Step1Defining() {
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState({});

    const questions = [
        { id: 1, text: "The number of students in JSS 2", type: "Discrete" },
        { id: 2, text: "The weight of a yam", type: "Continuous" },
        { id: 3, text: "The height of students", type: "Continuous" },
        { id: 4, text: "Number of chairs in a classroom", type: "Discrete" }
    ];

    const handleAnswer = (qId, type, correctType) => {
        if (answered[qId]) return;
        const isCorrect = type === correctType;
        setAnswered(prev => ({ ...prev, [qId]: isCorrect ? "correct" : "incorrect" }));
        if (isCorrect) {
            setScore(s => s + 1);
            toast.success("Correct!", { icon: "✅" });
        } else {
            toast.error("Incorrect. Try to think if it's counted or measured.", { icon: "❌" });
        }
    };

    return (
        <div style={{ padding: 24 }}>
            <div style={{ background: "#e0f2fe", borderLeft: "4px solid #0ea5e9", padding: "16px", marginBottom: "24px", borderRadius: "0 8px 8px 0" }}>
                <h3 style={{ margin: "0 0 8px 0", color: "#0369a1" }}>Definition</h3>
                <p style={{ margin: 0, fontSize: "16px", color: "#0f172a" }}>
                    <b>Data</b> is simply information. When we collect facts, numbers, or measurements, we are collecting data.
                </p>
            </div>

            <h3 style={{ marginBottom: "16px" }}>Categorization Activity</h3>
            <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr" }}>
                {questions.map((q) => (
                    <div key={q.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "16px", fontWeight: "500" }}>{q.text}</span>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button
                                onClick={() => handleAnswer(q.id, "Discrete", q.type)}
                                disabled={answered[q.id]}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "6px",
                                    border: answered[q.id] === "correct" && q.type === "Discrete" ? "none" :
                                        answered[q.id] === "incorrect" && q.type !== "Discrete" ? "none" : "1px solid #cbd5e1",
                                    background: answered[q.id] === "correct" && q.type === "Discrete" ? "#22c55e" :
                                        answered[q.id] === "incorrect" && q.type !== "Discrete" ? "#ef4444" : "#fff",
                                    color: answered[q.id] ? "#fff" : "#334155",
                                    fontWeight: "600",
                                    cursor: answered[q.id] ? "default" : "pointer"
                                }}
                            >
                                Discrete (Counted)
                            </button>
                            <button
                                onClick={() => handleAnswer(q.id, "Continuous", q.type)}
                                disabled={answered[q.id]}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "6px",
                                    border: answered[q.id] === "correct" && q.type === "Continuous" ? "none" :
                                        answered[q.id] === "incorrect" && q.type !== "Continuous" ? "none" : "1px solid #cbd5e1",
                                    background: answered[q.id] === "correct" && q.type === "Continuous" ? "#22c55e" :
                                        answered[q.id] === "incorrect" && q.type !== "Continuous" ? "#ef4444" : "#fff",
                                    color: answered[q.id] ? "#fff" : "#334155",
                                    fontWeight: "600",
                                    cursor: answered[q.id] ? "default" : "pointer"
                                }}
                            >
                                Continuous (Measured)
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: "24px", fontSize: "18px", fontWeight: "600", textAlign: "right", color: "#0f172a" }}>
                Score: {score} / {questions.length}
            </div>
        </div>
    );
}

function Step2Collect() {
    const [slide, setSlide] = useState(0);

    const slides = [
        { title: "1. Observation", text: "Watching how many cars pass the school gate.", icon: "👀", color: "#fef08a" },
        { title: "2. Interview", text: "Asking your classmates their favorite food (Pounded Yam vs. Jollof Rice).", icon: "🎤", color: "#bfdbfe" },
        { title: "3. Questionnaires", text: "Sending a digital form (like this platform!).", icon: "📝", color: "#bbf7d0" },
    ];

    return (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ background: slides[slide].color, height: "300px", borderRadius: "16px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "24px", transition: "background 0.3s ease", padding: "20px" }}>
                <div style={{ fontSize: "80px", marginBottom: "16px" }}>{slides[slide].icon}</div>
                <h2 style={{ margin: "0 0 16px 0", color: "#1e293b" }}>{slides[slide].title}</h2>
                <p style={{ fontSize: "18px", color: "#334155", maxWidth: "400px" }}>{slides[slide].text}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                <button
                    className="button secondary"
                    disabled={slide === 0}
                    onClick={() => setSlide(s => s - 1)}
                >
                    &larr; Previous
                </button>
                <button
                    className="button primary"
                    disabled={slide === slides.length - 1}
                    onClick={() => setSlide(s => s + 1)}
                >
                    Next &rarr;
                </button>
            </div>
            <div style={{ marginTop: "24px", display: "flex", justifyContent: "center", gap: "8px" }}>
                {slides.map((_, i) => (
                    <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: i === slide ? "#334155" : "#cbd5e1" }} />
                ))}
            </div>
        </div>
    );
}

function Step3Tally() {
    const [fruits, setFruits] = useState([
        { id: 1, type: "Apple", icon: "🍎", checked: false },
        { id: 2, type: "Orange", icon: "🍊", checked: false },
        { id: 3, type: "Apple", icon: "🍎", checked: false },
        { id: 4, type: "Apple", icon: "🍏", checked: false },
        { id: 5, type: "Apple", icon: "🍎", checked: false },
        { id: 6, type: "Orange", icon: "🍊", checked: false },
        { id: 7, type: "Apple", icon: "🍏", checked: false },
    ]);

    const tallyCount = (type) => fruits.filter(f => f.type === type && f.checked).length;

    const generateTallyString = (count) => {
        let str = "";
        const b = Math.floor(count / 5);
        const r = count % 5;
        for (let i = 0; i < b; i++) str += "<s>////</s> "; // simple representation, real "slashed" text would be ideal, but standard html works. Let's use strikethrough logic.
        str += "/".repeat(r);
        return str;
    };

    const handleFruitClick = (id) => {
        setFruits(fruits.map(f => f.id === id ? { ...f, checked: true } : f));
    };

    const allChecked = fruits.every(f => f.checked);

    return (
        <div style={{ padding: 24, background: "#fff", borderRadius: 12 }}>
            <p style={{ fontSize: 16 }}>
                <b>The Concept:</b> Raw data is messy. We use Tally Marks to organize it quickly.<br />
                <b>The Rule:</b> Four vertical lines and one diagonal "slash" for the 5th count.
            </p>
            <div style={{ background: "#f1f5f9", padding: 24, borderRadius: 12, marginBottom: 24, textAlign: "center" }}>
                <h4 style={{ margin: "0 0 16px 0" }}>Interactive Task</h4>
                <p>A farmer in Ikole harvested these fruits. Click each fruit to tally it below!</p>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", fontSize: "40px" }}>
                    {fruits.map(f => (
                        <div
                            key={f.id}
                            onClick={() => !f.checked && handleFruitClick(f.id)}
                            style={{
                                cursor: f.checked ? "default" : "pointer",
                                opacity: f.checked ? 0.3 : 1,
                                transition: "transform 0.2s, opacity 0.2s",
                                transform: f.checked ? "scale(0.8)" : "scale(1)"
                            }}
                        >
                            {f.icon}
                        </div>
                    ))}
                </div>
            </div>

            <table className="data-table" style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #e2e8f0" }}>
                <thead>
                    <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                        <th style={{ padding: "12px", borderBottom: "2px solid #e2e8f0" }}>Fruit</th>
                        <th style={{ padding: "12px", borderBottom: "2px solid #e2e8f0" }}>Tally</th>
                        <th style={{ padding: "12px", borderBottom: "2px solid #e2e8f0" }}>Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Apple (🍎/🍏)</td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0", fontSize: 18, letterSpacing: 2 }}>
                            <span dangerouslySetInnerHTML={{ __html: generateTallyString(tallyCount("Apple")) }} />
                        </td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0", fontWeight: "bold" }}>{tallyCount("Apple")}</td>
                    </tr>
                    <tr>
                        <td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Orange (🍊)</td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0", fontSize: 18, letterSpacing: 2 }}>
                            <span dangerouslySetInnerHTML={{ __html: generateTallyString(tallyCount("Orange")) }} />
                        </td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0", fontWeight: "bold" }}>{tallyCount("Orange")}</td>
                    </tr>
                </tbody>
            </table>
            {allChecked && (
                <div style={{ marginTop: 16, padding: 12, background: "#dcfce7", color: "#166534", borderRadius: 8, textAlign: "center", fontWeight: "bold" }}>
                    Great job! You have fully organized the data.
                </div>
            )}
        </div>
    );
}

function Step4FreqTable() {
    return (
        <div style={{ padding: 24, textAlign: "center" }}>
            <p style={{ fontSize: 16, marginBottom: 24 }}>
                A teacher walks through converting tallies into a final Frequency Table.<br />
                <b>Key Formula:</b> The total frequency (∑f) must equal the total number of items collected.
            </p>
            <div style={{ background: "#000", borderRadius: 12, overflow: "hidden", maxWidth: 640, margin: "0 auto" }}>
                <video
                    src="https://videos.pexels.com/video-files/3196238/3196238-uhd_2160_3840_25fps.mp4"
                    controls
                    style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
                    poster="https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
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
            q: "Which of these is an example of Discrete Data?",
            opts: ["The weight of a bag of cocoa.", "The number of siblings you have.", "The temperature in Ikere-Ekiti today."],
            ans: 1,
            feedback: "Correct! You can't have 2.5 siblings!"
        },
        {
            q: "In a tally system, what does a group with a diagonal line (<s>////</s>) represent?",
            opts: ["4", "5", "6"],
            ans: 1,
            feedback: "Great job! That's a bundle of 5."
        },
        {
            q: "A researcher asks 50 people their age. What method of data collection is this?",
            opts: ["Observation", "Experiment", "Interview/Survey"],
            ans: 2,
            feedback: "Exactly! Directly asking people is a survey or interview."
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
            <div style={{ textAlign: "center", padding: 40, background: "#f8fafc", borderRadius: 16 }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>🏆</div>
                <h2>Congratulations, Detective!</h2>
                <p style={{ fontSize: 18 }}>You have mastered Data Collection.</p>
                <p style={{ fontWeight: "bold", fontSize: 20, color: "#10b981", margin: "16px 0" }}>Score: {score} / {questions.length}</p>
                <div style={{ display: "inline-block", background: "#e0e7ff", color: "#4338ca", padding: "8px 16px", borderRadius: 30, fontSize: 14 }}>
                    Next Step: Unlock Data Representation (Bar Charts & Pie Charts)
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
            <h3 style={{ marginBottom: 24 }}>Question {currentQ + 1} of {questions.length}</h3>
            <p style={{ fontSize: 18, fontWeight: "600", marginBottom: 24, color: "#0f172a" }}>{questions[currentQ].q}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {questions[currentQ].opts.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => handleOpt(i)}
                        style={{
                            padding: "16px",
                            textAlign: "left",
                            background: "#fff",
                            border: "2px solid #e2e8f0",
                            borderRadius: "12px",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = "#fbbf24"}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                    >
                        {["A", "B", "C"][i]}. {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}

function PracticeChallenge() {
    const rawData = [
        "Iyan", "Rice", "Beans", "Amala", "Iyan", "Rice", "Rice", "Iyan", "Amala", "Beans",
        "Iyan", "Iyan", "Rice", "Beans", "Amala", "Iyan", "Rice", "Iyan", "Beans", "Rice",
        "Iyan", "Amala", "Rice", "Iyan", "Beans", "Rice", "Iyan", "Iyan", "Amala", "Rice"
    ];
    const [dataList, setDataList] = useState(rawData.map((item, i) => ({ id: i, item, checked: false })));
    const [phase, setPhase] = useState("tally"); // 'tally' or 'analysis'

    const foods = ["Iyan", "Rice", "Beans", "Amala"];

    const generateTallyString = (count) => {
        let str = "";
        const b = Math.floor(count / 5);
        const r = count % 5;
        for (let i = 0; i < b; i++) str += "<s>////</s> ";
        str += "/".repeat(r);
        return str;
    };

    const handleTally = (id) => {
        setDataList(prev => prev.map(d => d.id === id ? { ...d, checked: true } : d));
        // Play sound logic could be added here
        toast.success("Tally appended", { icon: "📝", style: { fontSize: 12, padding: "8px" }, position: "bottom-right", duration: 500 });
    };

    const doneTallying = dataList.every(d => d.checked);

    // Analysis state
    const [ansMode, setAnsMode] = useState("");
    const [ansRange, setAnsRange] = useState("");
    const [ansCheck, setAnsCheck] = useState("");

    if (phase === "analysis") {
        return (
            <div style={{ padding: 24 }}>
                <h3 style={{ marginBottom: "20px" }}>Analytical Questions</h3>

                <div style={{ marginBottom: "20px", background: "#f8fafc", padding: "20px", borderRadius: "12px" }}>
                    <h4>1. Mode (Most Popular)</h4>
                    <p>Which food should the Principal buy the most of?</p>
                    <input type="text" placeholder="Type answer..." value={ansMode} onChange={e => setAnsMode(e.target.value)} style={{ padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                    {ansMode.toLowerCase() === "iyan" || ansMode.toLowerCase() === "pounded yam" ? <span style={{ color: "green", marginLeft: "10px" }}>✅ Correct!</span> : null}
                </div>

                <div style={{ marginBottom: "20px", background: "#f8fafc", padding: "20px", borderRadius: "12px" }}>
                    <h4>2. Range Calculation</h4>
                    <p>What is the difference between the most popular (12) and least popular (4) food?</p>
                    <input type="number" placeholder="Result..." value={ansRange} onChange={e => setAnsRange(e.target.value)} style={{ padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                    {ansRange === "8" ? <span style={{ color: "green", marginLeft: "10px" }}>✅ Correct!</span> : null}
                </div>

                <div style={{ marginBottom: "20px", background: "#f8fafc", padding: "20px", borderRadius: "12px" }}>
                    <h4>3. Data Check</h4>
                    <p>If the total frequency was 28 instead of 30, what happened?</p>
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <label><input type="radio" name="check" value="A" onChange={e => setAnsCheck(e.target.value)} /> A. The Math is wrong</label>
                        <label><input type="radio" name="check" value="B" onChange={e => setAnsCheck(e.target.value)} /> B. Missing data</label>
                        <label><input type="radio" name="check" value="C" onChange={e => setAnsCheck(e.target.value)} /> C. Both A and B</label>
                    </div>
                    {ansCheck === "B" || ansCheck === "C" ? <span style={{ color: "green", marginTop: "10px", display: "block" }}>✅ That's right! Likely some students didn't vote.</span> : null}
                </div>

            </div>
        );
    }

    return (
        <div style={{ padding: 24 }}>
            <div style={{ background: "#fef3c7", padding: "16px", borderRadius: "8px", marginBottom: "24px" }}>
                <strong>The Scenario:</strong> The Principal of your school wants to buy lunch for the 30 students in the JSS 2 Athletics Team. She asks them what they want. Here is the "Raw Data" they gave her!
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px", maxHeight: "150px", overflowY: "auto", background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "2px solid #e2e8f0" }}>
                {dataList.map(d => (
                    <button
                        key={d.id}
                        onClick={() => !d.checked && handleTally(d.id)}
                        style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            border: "1px solid #cbd5e1",
                            background: d.checked ? "#cbd5e1" : "#fff",
                            color: d.checked ? "#f8fafc" : "#0f172a",
                            cursor: d.checked ? "default" : "pointer",
                            fontWeight: 500,
                            boxShadow: d.checked ? "none" : "0 2px 4px rgba(0,0,0,0.05)"
                        }}
                    >
                        {d.item}
                    </button>
                ))}
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#e0e7ff" }}>
                        <th style={{ padding: "12px", textAlign: "left" }}>Food Item</th>
                        <th style={{ padding: "12px", textAlign: "left" }}>Tally Marks</th>
                        <th style={{ padding: "12px", textAlign: "left" }}>Frequency (f)</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map(food => {
                        const count = dataList.filter(d => d.item === food && d.checked).length;
                        return (
                            <tr key={food} style={{ borderBottom: "1px solid #e2e8f0" }}>
                                <td style={{ padding: "12px", fontWeight: 500 }}>{food === "Iyan" ? "Pounded Yam (Iyan)" : food === "Rice" ? "Jollof Rice" : food}</td>
                                <td style={{ padding: "12px", fontSize: "20px" }}>
                                    <span dangerouslySetInnerHTML={{ __html: generateTallyString(count) }} />
                                </td>
                                <td style={{ padding: "12px", fontSize: "18px", fontWeight: "bold" }}>{count || ""}</td>
                            </tr>
                        );
                    })}
                    <tr style={{ background: "#f8fafc", fontWeight: "bold" }}>
                        <td style={{ padding: "12px" }}>Total (N)</td>
                        <td style={{ padding: "12px" }}></td>
                        <td style={{ padding: "12px", fontSize: "18px" }}>{dataList.filter(d => d.checked).length}</td>
                    </tr>
                </tbody>
            </table>

            {doneTallying && (
                <div style={{ marginTop: "24px", textAlign: "center" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#dcfce7", color: "#166534", padding: "12px 24px", borderRadius: "30px", fontWeight: "bold", marginBottom: "16px" }}>
                        ✅ Data Verified! Total reached 30.
                    </div>
                    <div>
                        <button className="button primary" onClick={() => setPhase("analysis")} style={{ padding: "12px 32px", fontSize: "16px" }}>
                            Proceed to Analysis &rarr;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
