import { ReactNode } from "react";

interface GameLayoutProps {
  ScoreBoardComponent: ReactNode;
  CurrentRoundComponent: ReactNode;
  WinnerModalComponent: ReactNode;
  DartBoardComponent: ReactNode;
  ref: any
}

export const Gamelayout = (props: GameLayoutProps) => {
  const {
    ScoreBoardComponent,
    CurrentRoundComponent,
    WinnerModalComponent,
    DartBoardComponent,
    ref
  } = props;
  return (
    <>
      <div className="grid grid-cols-[250px_auto] h-full">
        <div className="bg-backgroundSecondary">{ScoreBoardComponent}</div>
        <div className="h-[70vh] flex flex-col items-center" ref={ref}>
          {CurrentRoundComponent}
          {DartBoardComponent}
        </div>
      </div>
      {WinnerModalComponent}
    </>
  );
};
