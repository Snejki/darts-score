import { SetStateAction, useEffect } from "react";
import { RandomConfigurationRounds, RandomConfigurationType } from "./models/RandomGameModels";
import { ConfigurationParameter } from "~/common/components/ConfigurationParameter/ConfigurationParameter";
import { Button } from "@/components/ui/button";

interface RandomConfigurationProps {
    configuration: RandomConfigurationType;
    setConfiguration: React.Dispatch<SetStateAction<RandomConfigurationType>>;
  }

export const RandomConfiguration = (props: RandomConfigurationProps) => {
    useEffect(() => {
        props.setConfiguration({
            rounds: 10
        });
    }, [])

    const availableNumerOfRounds: RandomConfigurationRounds[] = [5, 10, 15];

    const setNumberOfRounds = (value: RandomConfigurationRounds) => {
        props.setConfiguration((configuration) => ({
            ...configuration,
            rounds: value
        }));
    }


  return (
    <>
     <ConfigurationParameter label="Points to score">
        <div className="flex gap-2">
          {availableNumerOfRounds.map((x) => (
            <Button
              variant={
                x == props.configuration.rounds ? "default" : "secondary"
              }
              onClick={() => setNumberOfRounds(x)}
              key={x}
            >
              {x}
            </Button>
          ))}
        </div>
      </ConfigurationParameter></>
  )
}