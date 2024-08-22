import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { Canvas, Rect, Triangle, Path, Circle, Point, util, Text } from 'fabric'; // browser
import { useEffect, useRef, useState } from "react";


interface DartBoardProps {
    size: number
}

export const DartBoard = (props: DartBoardProps) => {
    const canvasRef = useRef<Canvas | null>(null);

    const centerX = 450;
    const centerY = 450;

    const radius = [380, 350];
    const bullsEyeRadius = 40;

    const sectionPoints = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

    const onClick = () => {

    }

    function createSection(startAngle, endAngle, innerRadius, outerRadius, color, multiplier, pointValue) {
        const path = [];
        for (let angle = startAngle; angle <= endAngle; angle++) {
            const rad = util.degreesToRadians(angle);
            const x = centerX + Math.cos(rad) * outerRadius;
            const y = centerX + Math.sin(rad) * outerRadius;
            path.push(`${angle === startAngle ? 'M' : 'L'} ${x} ${y}`);
        }
        for (let angle = endAngle; angle >= startAngle; angle--) {
            const rad = util.degreesToRadians(angle);
            const x = centerX + Math.cos(rad) * innerRadius;
            const y = centerX + Math.sin(rad) * innerRadius;
            path.push(`L ${x} ${y}`);
        }
        path.push('Z');
        const section = new Path(path.join(' '), {
            fill: color,
            stroke: "black",
            selectable: false,
        });
        section.id = "12";

        section.on('mousedown', () => {
            console.log(`Points: ${pointValue * multiplier}`);
        });

        section.on("mouseover", () => {
            section.set("fill", "blue");
            canvasRef.current?.renderAll();
        })

        section.on("mouseout", () => {
            section.set("fill", color);
            canvasRef.current?.renderAll();
        })

        canvasRef.current?.add(section);
    }


    const singleColors= ["black", "white"];
    const multiColors= ["red", "green"];

    const drawDartBoard = () => {
        const sectionAngle = 360 / 20;
        const radius = 400;

        for (let i = 0; i < 20; i++) {
            const startAngle = (i * sectionAngle) + 270 - sectionAngle/2;
            const endAngle = startAngle + sectionAngle;

            const pointValue = sectionPoints[i];
            

            createSection(startAngle, endAngle, radius * 0.52, radius * 0.6, multiColors[i % 2], 3, pointValue);
            // Single outer section
            createSection(startAngle, endAngle, radius * 0.6, radius * 0.93, singleColors[i % 2], 1, pointValue);
            // Double section
            createSection(startAngle, endAngle, radius * 0.93, radius, multiColors[i % 2], 2, pointValue);
            // Single inner section
            createSection(startAngle, endAngle, radius * 0.1, radius * 0.52, singleColors[i % 2], 1, pointValue);


            const angle = (startAngle + endAngle) / 2;
            const rad = util.degreesToRadians(angle);
            const labelRadius = radius * 1.05;  // Slightly outside the double section
            const x = centerX + Math.cos(rad) * labelRadius;
            const y = centerX + Math.sin(rad) * labelRadius;

            const label = new Text(`${pointValue}`, {
                left: x,
                top: y,
                originX: 'center',
                originY: 'center',
                fontSize: 48,
                fontWeight: 'bold',
                fill: '#000',
                selectable: false,
                angle: angle + 90
            });

            // Rotate the text to be upright
            if (angle > 90 && angle < 270) {
                label.set({ angle: angle - 90 });
            }
            canvasRef.current?.add(label);

        }
            
    
               
        const bullseyeOuter = new Circle({
            left: centerX - bullsEyeRadius,
            top: centerY - bullsEyeRadius,
            radius: bullsEyeRadius,
            fill: "green",
            stroke: "black",
            selectable: false,
            touchCornerSize: 0,
            angle: 0,
            cornerSize: 0
        });
    
        const bullseyeInner = new Circle({
            left: centerX - (bullsEyeRadius / 2),
            top: centerY - (bullsEyeRadius / 2),
            radius: bullsEyeRadius / 2,
            fill: "red",
            stroke: "black",
            touchCornerSize: 0,
            angle: 0,
            cornerSize: 0,
        });
        
        canvasRef.current?.add(bullseyeOuter);
        canvasRef.current?.add(bullseyeInner);

    }

    useEffect(() => {
        console.log('init canvas'); // displayed twice with <React.StrictMode>

            canvasRef.current = new Canvas('dartboard', {
                height: 900,
                width: 900,
                selection: false,
                hoverCursor: "pointer",
                perPixelTargetFind: true
            });

            drawDartBoard();

    return () => canvasRef.current?.dispose()
    }, [])

    useEffect(() => {
        console.log(canvasRef.current?.getObjects)
    }, [canvasRef.current])

    const testmethod = () => {
        const objects = canvasRef.current?.getObjects();

        for(const object of objects)
        {
            console.log(object);
            if(object.id == "12") {
                console.log("ANY")
                object.set("fill", "blue");
                canvasRef.current?.renderAll();
            }
        }
    }

    return(
      <div>
        <button onClick={testmethod}>ADD</button>
        <canvas id="dartboard" />
      </div>
    );
};

const doubleConfiguration = {
    startRadius: 300,
    endRadius: 250  ,
    colors: ["red", "blue"]
};

const tripleConfiguration = {
    startRadius: 300,
    endRadius: 250  ,
    colors: ["red", "blue"]
}

const upperSingleConfiguration = {
    startRadius: 300,
    endRadius: 250  ,
    colors: ["red", "blue"]
}

const lowerSingleConfiguration = {
    startRadius: 300,
    endRadius: 250  ,
    colors: ["red", "blue"]
}

//todo: kolorowanie wybranego elementu i jak jest zmiana to reset tego ostatniego elementu
// redner tylko jednego elementu a nie wszystkich
