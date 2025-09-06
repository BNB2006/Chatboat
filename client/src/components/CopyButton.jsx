import React, { useState } from "react";

export default function CopyButton({ text }) {
  const [done, setDone] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setDone(true);
    setTimeout(() => setDone(false), 1200);
  }

  return (
    <button
      onClick={copy}
      className="text-xs border rounded-md px-2 py-1 cursor-pointer"
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}
