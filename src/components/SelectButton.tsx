export function ChangeStartOrEndPositionButton({
  lable,
  value,
  isDisabled,
  onClick,
}: {
  lable: string;
  value: string;
  isDisabled?: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={lable} className=" text-xs text-gray-400 ml-1">
        {lable}
      </label>
      <button
        disabled={isDisabled}
        className="bg-gray-700 cursor-pointer disabled:bg-gray-900 hover:bg-gray-800 transition ease-in active:ring-0 active:border-0 p-2 min-w-[200px] sm:min-w-full "
        id={lable}
        onClick={onClick}
      >{value}</button>
    </div>
  );
}
