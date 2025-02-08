"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { questions } from "../questions";

const ResultPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [name, setName] = useState(""); // 🔹 Firestore から取得する名前
  const [data, setData] = useState<{ subject: string; A: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const docRef = doc(db, "responses", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const fetchedData = docSnap.data();
            console.log("取得したデータ:", fetchedData);

            setName(fetchedData.name); // 🔹 名前をセット

            const chartData = questions.map((q, index) => ({
              subject: q.title,
              A: fetchedData.answers[index],
              fullMark: 5,
            }));

            setData(chartData);
          } else {
            console.log("データがありません。");
          }
        } catch (error) {
          console.error("データ取得エラー:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{name ? `${name}さんの結果` : "結果ページ"}</h1> {/* 🔹 名前を表示 */}

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis domain={[1, 5]} />
            <Radar name="評価" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <p>データがありません。</p>
      )}
    </div>
  );
};

export default ResultPage;
