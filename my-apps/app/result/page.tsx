
"use client"; // 追加
import { Suspense } from "react";
import ClientResult from "../../components/ClientResult";

const ResultPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ClientResult />
    </Suspense>
  );
};

export default ResultPage;
