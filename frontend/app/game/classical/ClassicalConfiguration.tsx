import { Button, Divider } from "@nextui-org/react";
import { useState } from "react";

const ClassicalConfiguration = () => {
  const [toPoints, setToPoints] = useState(101);
  const [checkIn, setCheckIn] = useState("Normal");

  const toPointsOptions = [101, 201, 301, 501, 701, 901];
  const checkInType = ["Normal", "Single", "Double", "Triple"];

  return (
    <div className="flex flex-col items-center">
      <div>Players: </div>
      <Divider />
      <h1>Game</h1>
      <div className="mb-2">
        <div className="flex gap-1">
          {toPointsOptions.map((x) => (
            <Button
              color={x == toPoints ? "primary" : "default"}
              onClick={() => setToPoints(x)}
              key={x}
            >
              {x}
            </Button>
          ))}
        </div>
      </div>
      <Divider />
      <div>Check in</div>
      <div>
        <div className="flex gap-1">
          {checkInType.map((x) => (
            <Button
              onClick={() => setCheckIn(x)}
              color={x == checkIn ? "primary" : "default"}
              key={x}
            >
              {x}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassicalConfiguration;
