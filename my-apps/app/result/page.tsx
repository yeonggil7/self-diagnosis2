"use client"; // ← 追加

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import RadarChartComponent from "@/components/RadarChartComponent";

const ResultPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<{ subject: string; A: number }[]>([]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const docRef = doc(collection(db, "responses"), id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data()?.answers || []);
        }
      };
      fetchData();
    }
  }, [id]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1>結果</h1>
        {data.length > 0 ? <RadarChartComponent data={data} /> : <p>データがありません。</p>}
      </div>
    </Suspense>
  );
};

export default ResultPage;
