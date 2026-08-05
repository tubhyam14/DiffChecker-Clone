import "./Toolbar.css";

export default function Toolbar({
  onCompare,
  onMergeLeft,
  onMergeRight,
  onClear,
}) {
  return (
    <div className="toolbar">
      <button onClick={onCompare}>
        Compare
      </button>

      <button onClick={onMergeLeft}>
        Merge Left
      </button>

      <button onClick={onMergeRight}>
        Merge Right
      </button>

      <button onClick={onClear}>
        Clear
      </button>
    </div>
  );
}
