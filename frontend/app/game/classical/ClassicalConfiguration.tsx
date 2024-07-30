import { Button } from "@/components/ui/button";
import { SetStateAction, useEffect, useState } from "react";
import { ClassicalConfigurationType } from "./ClassicalTypes";

interface ClassicalConfigurationProps {
  configuration: ClassicalConfigurationType,
  setConfiguration: React.Dispatch<SetStateAction<ClassicalConfigurationType>>
}

const ClassicalConfiguration = (props: ClassicalConfigurationProps) => {
  useEffect(() => {
      props.configuration.checkIn = "All";
      props.configuration.pointsToScore = 301;
  }, [])


  const setPointsToScore = (value: number) => {
    props.setConfiguration(configuration => ({...configuration, pointsToScore: value}));
  }

  const setCheckIn = (value: string) => {
    props.setConfiguration(configuration => ({...configuration, checkIn: value}));
  }

  const toPointsOptions = [101, 201, 301, 501, 701, 901];
  const checkInType = ["All", "Single", "Double", "Triple"];

  return (<>
   <h1>Points to score:</h1>
      <div>
          {toPointsOptions.map((x) => (
            <Button
              variant={
                x == props.configuration.pointsToScore ? "default" : "secondary"
              }
              onClick={() => setPointsToScore(x)}
              key={x}
            >
              {x}
            </Button>
          ))}
      </div>
      <div>Check in</div>
      <div>
        <div className="flex gap-1">
          {checkInType.map((x) => (
            <Button
              onClick={() => setCheckIn(x)}
              variant={x == props.configuration.checkIn ? "default" : "secondary"}
              key={x}
            >
              {x}
            </Button>
          ))}
        </div>
      </div>
  </>
  );
};

export default ClassicalConfiguration;
