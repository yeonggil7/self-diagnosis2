"use client"; // 追加

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "../app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const ClientResult = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<{ subject: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const docRef = doc(db, "responses", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data().answers);
        }
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <h1>結果</h1>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={data}>
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
