"use client"; // クライアントコンポーネントとして明示

import { useSearchParams } from "./next/navigation";
import { useState, useEffect } from "react";
import { db } from "../app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const ClientResult = () => {
  const searchParams = useSearchParams(); // クライアントコンポーネントなのでOK
  const id = searchParams.get("id");
  const [data, setData] = useState<{ subject: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, "responses", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const responseData = docSnap.data();
          if (responseData.answers && Array.isArray(responseData.answers)) {
            setData([
              { subject: "伝道", value: responseData.answers[0] },
              { subject: "BS前管理", value: responseData.answers[1] },
              { subject: "証", value: responseData.answers[2] },
              { subject: "BS中管理", value: responseData.answers[3] },
              { subject: "講義", value: responseData.answers[4] },
              { subject: "教育", value: responseData.answers[5] },
              { subject: "器運営", value: responseData.answers[6] },
            ]);
          }
        }
      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div style={{ width: "100%", height: 500, textAlign: "center" }}>
      {loading ? (
        <p>データを読み込んでいます...</p>
      ) : data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Score" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <p>データがありません。</p>
      )}
    </div>
  );
};

export default ClientResult;
