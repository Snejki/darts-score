import {
  Canvas,
  Path,
  Circle,
  util,
  Text,
} from "fabric"; // browser
import { useEffect, useRef } from "react";

export type DartScore =
  | {
      Multiplier: "S" | "D" | "T";
      Value:
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20;
    }
  | "OUTER"
  | "BULL";

interface DartBoardProps {
  size: number;
  onClick: (value: DartScore) => void;
}

export const DartBoard = (props: DartBoardProps) => {
  const canvasRef = useRef<Canvas | null>(null);

  const center = props.size / 2;

  console.log(props.size)

  const bullsEyeRadius = 40;

  const sectionPoints = [
    20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
  ];

  function createSection(
    startAngle: number,
    endAngle: number,
    innerRadius: number,
    outerRadius: number,
    color: string,
    multiplier : "S" | "D" | "T",
    pointValue : 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  ) {
    const path = [];
    for (let angle = startAngle; angle <= endAngle; angle++) {
      const rad = util.degreesToRadians(angle);
      const x = center + Math.cos(rad) * outerRadius;
      const y = center + Math.sin(rad) * outerRadius;
      path.push(`${angle === startAngle ? "M" : "L"} ${x} ${y}`);
    }
    for (let angle = endAngle; angle >= startAngle; angle--) {
      const rad = util.degreesToRadians(angle);
      const x = center + Math.cos(rad) * innerRadius;
      const y = center + Math.sin(rad) * innerRadius;
      path.push(`L ${x} ${y}`);
    }

    const section = new Path(path.join(" "), {
      fill: color,
      stroke: "black",
      selectable: false,
    });
    //section.id = "12";

    section.on("mousedown", () => {
        props.onClick({Multiplier: multiplier, Value: pointValue});
    });

    section.on("mouseover", () => {
      section.set("fill", "blue");
      canvasRef.current?.renderAll();
    });

    section.on("mouseout", () => {
      section.set("fill", color);
      canvasRef.current?.renderAll();
    });

    canvasRef.current?.add(section);
  }

  const singleColors = ["black", "white"];
  const multiColors = ["red", "green"];

  const drawDartBoard = () => {
    const sectionAngle = 360 / 20;
    const radius = 0.9 * props.size / 2;

    for (let i = 0; i < 20; i++) {
      const startAngle = i * sectionAngle + 270 - sectionAngle / 2;
      const endAngle = startAngle + sectionAngle;

      const pointValue = sectionPoints[i];

      createSection(
        startAngle,
        endAngle,
        radius * 0.52,
        radius * 0.6,
        multiColors[i % 2],
        "T",
        pointValue
      );
      // Single outer section
      createSection(
        startAngle,
        endAngle,
        radius * 0.6,
        radius * 0.93,
        singleColors[i % 2],
        "S",
        pointValue
      );
      // Double section
      createSection(
        startAngle,
        endAngle,
        radius * 0.93,
        radius,
        multiColors[i % 2],
        "D",
        pointValue
      );
      // Single inner section
      createSection(
        startAngle,
        endAngle,
        radius * 0.1,
        radius * 0.52,
        singleColors[i % 2],
        "S",
        pointValue
      );

      const angle = (startAngle + endAngle) / 2;
      const rad = util.degreesToRadians(angle);
      const labelRadius = radius * 1.05; // Slightly outside the double section
      const x = center + Math.cos(rad) * labelRadius;
      const y = center + Math.sin(rad) * labelRadius;

      const label = new Text(`${pointValue}`, {
        left: x,  
        top: y,
        originX: "center",
        originY: "center",
        fontSize: 42,
        fontWeight: "bold",
        fill: "#000",
        selectable: false,
        angle: angle + 90,
      });

      if (angle > 90 && angle < 270) {
        label.set({ angle: angle - 90 });
      }
      canvasRef.current?.add(label);
    }

    const bullseyeOuter = new Circle({
      left: center - bullsEyeRadius,
      top: center - bullsEyeRadius,
      radius: bullsEyeRadius,
      fill: "green",
      stroke: "black",
      selectable: false,
      touchCornerSize: 0,
      angle: 0,
      cornerSize: 0,
    });

    bullseyeOuter.on("mousedown", () => {
        props.onClick("OUTER");
    });

    bullseyeOuter.on("mouseover", () => {
        bullseyeOuter.set("fill", "blue");
      canvasRef.current?.renderAll();
    });

    bullseyeOuter.on("mouseout", () => {
        bullseyeOuter.set("fill", "green");
      canvasRef.current?.renderAll();
    });

    const bullseyeInner = new Circle({
      left: center - bullsEyeRadius / 2,
      top: center - bullsEyeRadius / 2,
      radius: bullsEyeRadius / 2,
      fill: "red",
      stroke: "black",
      touchCornerSize: 0,
      angle: 0,
      cornerSize: 0,
      selectable: false
    });

    bullseyeInner.on("mousedown", () => {
        props.onClick("BULL");
    });

    bullseyeInner.on("mouseover", () => {
        bullseyeInner.set("fill", "blue");
      canvasRef.current?.renderAll();
    });

    bullseyeInner.on("mouseout", () => {
        bullseyeInner.set("fill", "red");
      canvasRef.current?.renderAll();
    });

    canvasRef.current?.add(bullseyeOuter);
    canvasRef.current?.add(bullseyeInner);
  };

  useEffect(() => {
    canvasRef.current = new Canvas("dartboard", {
      height: props.size,
      width: props.size,
      selection: false,
      hoverCursor: "pointer",
      perPixelTargetFind: true,
    });

    drawDartBoard();

    return () => canvasRef.current?.dispose();
  }, [props.size]);

  return (
    <div>
      <canvas id="dartboard" />
    </div>
  );
};

const doubleConfiguration = {
  startRadius: 300,
  endRadius: 250,
  colors: ["red", "blue"],
};

const tripleConfiguration = {
  startRadius: 300,
  endRadius: 250,
  colors: ["red", "blue"],
};

const upperSingleConfiguration = {
  startRadius: 300,
  endRadius: 250,
  colors: ["red", "blue"],
};

const lowerSingleConfiguration = {
  startRadius: 300,
  endRadius: 250,
  colors: ["red", "blue"],
};

//todo: kolorowanie wybranego elementu i jak jest zmiana to reset tego ostatniego elementu
// redner tylko jednego elementu a nie wszystkich
