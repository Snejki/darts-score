import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { DartBoard } from "~/common/components/DartBoard/DartBoard";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [useSectionColors, setUseSectionColors ]  = useState({});
  
  setTimeout(() => {
    setUseSectionColors({
      "T20": "cyan",
      "S20": "cyan",
      "D20": "cyan",
    });
  }
  , 3000);

  return (
    <div className="font-sans p-4">
      <DartBoard size={750}  customSectionColors={useSectionColors}/>
    </div>
  );
}
