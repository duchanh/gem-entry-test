import clsx from "clsx";
import { useState } from "react";

import Tooltip from "./Tooltip";

interface IButtonStepProps {
  isDisabled: boolean;
  className: string;
  toolTipLabel: string;
  ariaLabel: string,
  handleChangeStepValue: () => void;
  children?: React.ReactNode;
}
const ButtonStep = ({
  isDisabled,
  children,
  className,
  toolTipLabel,
  ariaLabel,
  handleChangeStepValue,
}: IButtonStepProps) => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setTooltipOpen(true);
      }}
      onMouseLeave={() => setTooltipOpen(false)}
    >
      <button
        aria-label={ariaLabel}
        disabled={isDisabled}
        className={clsx(
          "flex items-center justify-center w-9 min-w-9 h-full cursor-pointer hover:bg-[#3B3B3B]",
          { "pointer-events-none": isDisabled },
          className
        )}
        onClick={handleChangeStepValue}
      >
        {children}
      </button>
      {isDisabled && tooltipOpen && <Tooltip label={toolTipLabel} />}
    </div>
  );
};

export default ButtonStep;
