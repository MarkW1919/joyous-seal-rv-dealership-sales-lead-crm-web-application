import { type MouseEventHandler } from "react";
import { cn } from "./lib/utils";
import { Switch } from "./ui/switch";

interface OverlayToggle {
  showOverlay: boolean;
  onToggleClick: MouseEventHandler<HTMLDivElement>;
}

export default function OverlayToggle({
  showOverlay,
  onToggleClick,
}: OverlayToggle) {
  return (
    <div
      className="w-[210px] space-x-2 rounded-full fixed bottom-10 left-10 bg-black p-4 flex items-center justify-center cursor-pointer shadow-lg shadow-gray-400"
      onClick={onToggleClick}
    >
      <Switch
        checked={showOverlay}
        className="data-[state=checked]:bg-[#3db6b9]"
      />
      <p
        className={cn("font-bold text-center tracking-wide", {
          "text-[#3db6b9]": showOverlay,
          "text-gray-200": !showOverlay,
        })}
      >
        {`${showOverlay ? "Hide" : "Show"} Overlay`}
      </p>
    </div>
  );
}
