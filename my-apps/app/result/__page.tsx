"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const questionLabels = ["伝道", "BS前管理", "証", "BS中管理", "講義", "教育", "器運営"];

const ResultPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResultContent />
    </Suspense>
  );
};

const ResultContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<{ subject: string; value: number }[]>([]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const docRef = doc(db, "responses", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const answers = docSnap.data().answers;
            const formattedData = answers.map((value: number, index: number) => ({
              subject: questionLabels[index],
              value,
            }));
            setData(formattedData);
          }
        } catch (error) {
          console.error("データ取得エラー:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  return (
    <div className="container">
      <h1>診断結果</h1>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar name="スコア" dataKey="value" stroke="#0070f3" fill="#0070f3" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultPage;
