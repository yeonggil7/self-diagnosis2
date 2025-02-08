"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { questions } from "../questions";

const departments = ["SS", "CP", "青年部", "家庭局", "壮年部"];

const FormPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<number[]>(new Array(questions.length).fill(1));

  const handleOptionChange = (index: number, value: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = value;
    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("名前を入力してください！");
      return;
    }
    if (!department) {
      alert("部署を選択してください！");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "responses"), {
        name,
        department,
        answers: selectedOptions,
        timestamp: new Date(),
      });

      router.push(`/result?id=${docRef.id}`);
    } catch (error) {
      console.error("送信エラー:", error);
    }
  };

  return (
    <div className="container">
      <h1>アンケートフォーム</h1>

      <form onSubmit={handleSubmit} className="form">
        {/* 🔹 名前入力欄 */}
        <div className="input-group">
          <label><strong>名前：</strong></label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="名前を入力"
          />
        </div>

        {/* 🔹 部署選択 */}
        <div className="input-group">
          <label><strong>部署：</strong></label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
            <option value="">部署を選択</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* 🔹 質問リスト */}
        {questions.map((question, index) => (
          <div key={index} className="question-card">
            <p className="question-title">{question.title}</p>
            <div className="options">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`option-button ${selectedOptions[index] === option.value ? "selected" : ""}`}
                  onClick={() => handleOptionChange(index, option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* 🔹 送信ボタン */}
        <button type="submit" className="submit-button">送信</button>
      </form>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
          font-family: "Arial", sans-serif;
        }
        .form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .input-group {
          margin-bottom: 15px;
          width: 100%;
          text-align: left;
        }
        input, select {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border: 2px solid #0070f3;
          border-radius: 5px;
          background: #f9f9f9;
          transition: 0.3s;
        }
        input:focus, select:focus {
          border-color: #005bb5;
          background: #fff;
        }
        .question-card {
          background: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 15px;
          width: 100%;
          text-align: center;
        }
        .question-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 12px;
          color: #333;
        }
        .options {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }
        .option-button {
          padding: 10px 15px;
          font-size: 16px;
          border: 2px solid #ddd;
          border-radius: 5px;
          background: #fff;
          cursor: pointer;
          transition: 0.3s;
        }
        .option-button:hover {
          background: #f0f0f0;
        }
        .selected {
          background: #0070f3;
          color: white;
          border-color: #005bb5;
        }
        .submit-button {
          background: #0070f3;
          color: white;
          border: none;
          padding: 12px 20px;
          font-size: 18px;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 15px;
        }
        .submit-button:hover {
          background: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default FormPage;
