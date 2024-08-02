import { Button } from "@/components/ui/button";
import { SetStateAction, useEffect } from "react";
import { checkInType, ClassicalConfigurationType, pointsToScoreType } from "./ClassicalTypes";

interface ClassicalConfigurationProps {
  configuration: ClassicalConfigurationType,
  setConfiguration: React.Dispatch<SetStateAction<ClassicalConfigurationType>>
}

const ClassicalConfiguration = (props: ClassicalConfigurationProps) => {
  useEffect(() => {
      props.configuration.checkIn = "All";
      props.configuration.pointsToScore = 301;
  }, [])


  const setPointsToScore = (value: pointsToScoreType) => {
    props.setConfiguration(configuration => ({...configuration, pointsToScore: value}));
  }

  const setCheckIn = (value: checkInType) => {
    props.setConfiguration(configuration => ({...configuration, checkIn: value}));
  }

  const availableScores: pointsToScoreType[] = [101, 201, 301, 501, 701, 901];
  const checkInTypes : checkInType[] = ["All", "Single", "Double", "Triple"];

  return (<>
   <h1>Points to score:</h1>
      <div>
          {availableScores.map((x) => (
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
          {checkInTypes.map((x) => (
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
