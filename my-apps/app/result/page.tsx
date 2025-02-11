
"use client"; // 追加

import ClientResult from "../../components/ClientResult"; // クライアントコンポーネントをインポート

const ResultPage = () => {
  return (
    <div>
      <h1>診断結果</h1>
      <ClientResult />
    </div>
  );
};

export default ResultPage;
