import { ReactNode } from "react";

interface ConfigurationParameterProps {
  label: string;
  children: ReactNode;
  error?: string
}

export const ConfigurationParameter = (props: ConfigurationParameterProps) => {
  const { label, children, error } = props;
  return (
    <div>
      <div className="grid grid-cols-[200px_auto]">
        <span>{label}</span>
        <div>{children}</div>
      </div>
      <div className="flex justify-center text-red-700">{error}</div>
    </div>
  );
};
