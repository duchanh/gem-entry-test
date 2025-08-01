const Tooltip = ({ label }: { label: string }) => {
  return (
    <div className="absolute flex items-center justify-center w-[163px] h-[26px] bg-[#212121] text-[#F9F9F9] text-xs bottom-[calc(100%+8px)] left-1/2 transform -translate-x-1/2  rounded tooltip">
      {label}
    </div>
  );
};

export default Tooltip;
