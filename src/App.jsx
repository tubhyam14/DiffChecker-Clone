import { useState } from "react";

import "./App.css";

import Header from "./components/Header/Header";
import Toolbar from "./components/Toolbar/Toolbar";
import Editor from "./components/Editor/Editor";
import DiffViewer from "./components/DiffViewer/DiffViewer";

function App() {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [compareNow, setCompareNow] = useState(false);

  function handleCompare() {
    setCompareNow(true);
  }

  function handleClear() {
    setLeftText("");
    setRightText("");
    setCompareNow(false);
  }
  
  function mergeLeftToRight() {
  setRightText(leftText);
}

function mergeRightToLeft() {
  setLeftText(rightText);
}
  return (
    <div className="app">

      <Header />

      <Toolbar
        onCompare={handleCompare}
    onClear={handleClear}
    onMergeLeft={mergeLeftToRight}
    onMergeRight={mergeRightToLeft}
      />

      <div className="editor-container">

        <Editor
          title="Original"
          value={leftText}
          onChange={setLeftText}
        />

        <Editor
          title="Modified"
          value={rightText}
          onChange={setRightText}
        />

      </div>

      {compareNow && (
        <DiffViewer
          leftText={leftText}
          rightText={rightText}
        />
      )}

    </div>
  );
}

export default App;
