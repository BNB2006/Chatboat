import { Check, Copy } from "lucide-react";
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
      className="cursor-pointer text-xs flex items-center gap-1"
    >
      {done ? <Check size={18}/> : <Copy size={14}/>}{done ? "Cpoied" : "Copy"}
    </button>
  );
}
