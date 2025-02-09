"use client"; // クライアントコンポーネントとして扱う

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "../firebase"; // Firestoreのインポート
import { collection, doc, getDoc } from "firebase/firestore";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, ResponsiveContainer } from "recharts";

const ResultPageContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<{ subject: string; score: number }[]>([]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const docRef = doc(collection(db, "responses"), id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const responseData = docSnap.data();
          const formattedData = [
            { subject: "伝道", score: responseData.answers[0] },
            { subject: "BS前管理", score: responseData.answers[1] },
            { subject: "証", score: responseData.answers[2] },
            { subject: "BS中管理", score: responseData.answers[3] },
            { subject: "講義", score: responseData.answers[4] },
            { subject: "教育", score: responseData.answers[5] },
            { subject: "器運営", score: responseData.answers[6] },
          ];
          setData(formattedData);
        }
      };

      fetchData();
    }
  }, [id]);

  return (
    <div style={{ width: "100%", height: 500, textAlign: "center" }}>
      <h1>診断結果</h1>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <p>データを読み込んでいます...</p>
      )}
    </div>
  );
};

const ResultPage = () => {
  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <ResultPageContent />
    </Suspense>
  );
};

export default ResultPage;
