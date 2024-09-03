import {
  Canvas,
  Path,
  Circle,
  util,
  Text,
} from "fabric"; // browser
import { useEffect, useRef } from "react";

type normalPointsType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
type multiplierType = "S" | "D" | "T";
type outerType = "OUTER";
type bullType = "BULL";

export type DartScore =
  | {
      Multiplier: multiplierType;
      Value: normalPointsType;
    }
  | outerType | bullType;

interface DartBoardProps {
  size: number;
  onClick: (value: DartScore) => void;
  customSectionColors?: { [id: string]: string };
}

export const DartBoard = (props: DartBoardProps) => {
  const canvasRef = useRef<Canvas | null>(null);

  const center = props.size / 2;

  const bullsEyeRadius = 40;

  const sectionPoints : normalPointsType[] = [
    20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
  ];

  function drawCirclePointSection(radius: number, color: string, points: bullType | outerType) {
    const customColor = props.customSectionColors?.[points] ?? color;

    const circle = new Circle({
      left: center - radius,
      top: center - radius,
      radius: radius,
      fill: customColor,
      stroke: "black",
      selectable: false,
    });


    circle.on("mousedown", () => {
        props.onClick(points);
    });

    circle.on("mouseover", () => {
        circle.set("fill", "blue");
      canvasRef.current?.renderAll();
    });

    circle.on("mouseout", () => {
        circle.set("fill", customColor);
      canvasRef.current?.renderAll();
    });

    canvasRef.current?.add(circle);
  }

  function drawNormalPointSection(
    startAngle: number,
    endAngle: number,
    innerRadius: number,
    outerRadius: number,
    color: string,
    multiplier : "S" | "D" | "T",
    pointValue : 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20,
    id : string
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

    const calculatedColor = props.customSectionColors?.[id] ?? color;

    const section = new Path(path.join(" "), {
      fill: calculatedColor,
      stroke: "black",
      selectable: false,
    });

    section.on("mousedown", () => {
        props.onClick({Multiplier: multiplier, Value: pointValue});
    });

    section.on("mouseover", () => {
      section.set("fill", "blue");
      canvasRef.current?.renderAll();
    });

    section.on("mouseout", () => {
      section.set("fill", calculatedColor);
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

      drawNormalPointSection(
        startAngle,
        endAngle,
        radius * 0.52,
        radius * 0.6,
        multiColors[i % 2],
        "T",
        pointValue,
        `T${pointValue}`
      );
      // Single outer section
      drawNormalPointSection(
        startAngle,
        endAngle,
        radius * 0.6,
        radius * 0.93,
        singleColors[i % 2],
        "S",
        pointValue,
        `S${pointValue}`
      );
      // Double section
      drawNormalPointSection(
        startAngle,
        endAngle,
        radius * 0.93,
        radius,
        multiColors[i % 2],
        "D",
        pointValue,
        `D${pointValue}`
      );
      // Single inner section
      drawNormalPointSection(
        startAngle,
        endAngle,
        radius * 0.1,
        radius * 0.52,
        singleColors[i % 2],
        "S",
        pointValue,
        `S${pointValue}`
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

    drawCirclePointSection(bullsEyeRadius, "green", "OUTER");
    drawCirclePointSection(bullsEyeRadius / 2, "red", "BULL");
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
  }, [props.size, props.customSectionColors]);

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
