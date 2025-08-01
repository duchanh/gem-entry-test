import { useState } from "react";
import clsx from "clsx";
import IconMinus from "./IconMinus";
import IconPlus from "./IconPlus";
import ButtonStep from "./ButtonStep";

type UnitType = "%" | "px";

const UnitValueInput = () => {
  const [unit, setUnit] = useState<UnitType>("%");
  const [value, setValue] = useState<string>("1");
  const numericValue = parseFloat(value) || 0;

  /**
   * Thay đổi unit
   */
  const handleChangeUnit = (newUnit: UnitType) => {
    if (newUnit === "%" && numericValue > 100) {
      setValue("100");
    }
    setUnit(newUnit);
  };

  /**
   * Thay đổi giá trị bằng nút +/-
   */
  const handleChangeStepValue = (step: number) => {
    let newValue = numericValue + step;
    if (unit === "%" && newValue > 100) newValue = 100;
    if (newValue < 0) newValue = 0;
    setValue(newValue.toString());
  };

  /**
   * Xử lý khi nhập input
   */
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/,/g, ".");
    setValue(val);
  };

  /**
   * Xử lý khi blur input
   */
  const handleBlurValue = (e: React.FocusEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/,/g, ".");
    let cleanValue = "";
    let dotCount = 0;

    for (const char of val) {
      if (/[0-9]/.test(char)) {
        const testValue = cleanValue + char;
        const numCheck = parseFloat(testValue);
        // Nếu unit là % và phần nguyên >= 100 thì dừng
        if (unit === "%" && Math.floor(numCheck) >= 100) {
          break;
        }
        cleanValue += char;
      } else if (char === "." && dotCount === 0) {
        if (unit === "%" && parseFloat(cleanValue) >= 100) {
          break;
        }
        // Nếu gặp dấu . và chưa có trước đó
        cleanValue += ".";
        dotCount++;
      } else {
        // Gặp ký tự không hợp lệ thì dừng
        break;
      }
    }

    let num = parseFloat(cleanValue);
    if (isNaN(num)) num = 0;
    if (num < 0) num = 0; 

    setValue(num.toString());
  };

  // Disable nút -
  const isDisabledMinus = numericValue <= 0;

  // Disable nút +
  const isDisabledPlus = unit === "%" && numericValue >= 100;

  return (
    <div className="flex flex-col gap-4">
      {/* Unit Switch */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-[#AAA] leading-[20px]">Unit</div>
        <div className="flex p-0.5 gap-0.5 bg-[#212121] rounded-lg w-35">
          {["%", "px"].map((u) => (
            <div
              key={u}
              onClick={() => handleChangeUnit(u as UnitType)}
              className={clsx(
                "h-8 flex items-center justify-center flex-1 text-xs cursor-pointer rounded-md text-[#AAAAAA]",
                {
                  "bg-[#424242] text-[#F9F9F9]": unit === u,
                }
              )}
            >
              {u}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-[#AAA] leading-[20px]">Value</div>
        <div className="flex h-8 bg-[#212121] rounded-lg w-35">
          {/* Nút trừ */}
          <ButtonStep
            isDisabled={isDisabledMinus}
            handleChangeStepValue={() => handleChangeStepValue(-1)}
            className="rounded-l-lg"
            toolTipLabel="Value must greater than 0"
          >
            <IconMinus fill={isDisabledMinus ? "#AAA" : "#F9F9F9"} />
          </ButtonStep>

          {/* Ô input */}
          <input
            value={value}
            onChange={handleChangeValue}
            onBlur={handleBlurValue}
            className="px-2 w-18 text-center outline-none text-xs leading-[20px] text-[#F9F9F9] bg-transparent"
          />

          {/* Nút cộng */}
          <ButtonStep
            isDisabled={isDisabledPlus}
            handleChangeStepValue={() => handleChangeStepValue(1)}
            className="rounded-r-lg"
            toolTipLabel="Value must smaller than 100"
          >
            <IconPlus fill={isDisabledPlus ? "#AAA" : "#F9F9F9"} />
          </ButtonStep>
        </div>
      </div>
    </div>
  );
};

export default UnitValueInput;
