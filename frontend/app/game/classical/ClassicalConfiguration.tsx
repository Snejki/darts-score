import { Button } from "@/components/ui/button";
import { SetStateAction, useEffect } from "react";
import {
  checkInType,
  ClassicalConfigurationType,
  pointsToScoreType,
} from "./ClassicalTypes";
import { ConfigurationParameter } from "~/common/components/ConfigurationParameter/ConfigurationParameter";

interface ClassicalConfigurationProps {
  configuration: ClassicalConfigurationType;
  setConfiguration: React.Dispatch<SetStateAction<ClassicalConfigurationType>>;
}

const ClassicalConfiguration = (props: ClassicalConfigurationProps) => {
  useEffect(() => {
    props.configuration.checkIn = "All";
    props.configuration.pointsToScore = 301;
  }, []);

  const setPointsToScore = (value: pointsToScoreType) => {
    props.setConfiguration((configuration) => ({
      ...configuration,
      pointsToScore: value,
    }));
  };

  const setCheckIn = (value: checkInType) => {
    props.setConfiguration((configuration) => ({
      ...configuration,
      checkIn: value,
    }));
  };

  const availableScores: pointsToScoreType[] = [101, 201, 301, 501, 701, 901];
  const checkInTypes: checkInType[] = ["All", "Single", "Double", "Triple"];

  return (
    <>
      <ConfigurationParameter label="Points to score">
        <div className="flex gap-2">
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
      </ConfigurationParameter>
      <ConfigurationParameter label="Check In">
        <div className="flex gap-2">
          {checkInTypes.map((x) => (
            <Button
              onClick={() => setCheckIn(x)}
              variant={
                x == props.configuration.checkIn ? "default" : "secondary"
              }
              key={x}
            >
              {x}
            </Button>
          ))}
        </div>
      </ConfigurationParameter>
    </>
  );
};

export default ClassicalConfiguration;
