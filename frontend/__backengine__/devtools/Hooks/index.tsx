import { type MouseEventHandler } from "react";
import hooksMetadata from "../../hooks/metadata.json";
import HelpTooltip from "../HelpTooltip";

interface HooksProps {
  showOverlay: boolean;
  onShowComponentsClick: MouseEventHandler<HTMLButtonElement>;
}

function Hooks({ showOverlay, onShowComponentsClick }: HooksProps) {
  if (!showOverlay) {
    return null;
  }

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-10 w-52 z-50 bg-[#1C1C25] rounded-md pt-3 pb-5 px-6 shadow-lg shadow-gray-400">
      <div className="flex space-x-2 items-center w-full justify-center">
        <h3 className="text-[#3db6b9] font-bold text-center tracking-wide">
          Hooks
        </h3>
        <HelpTooltip className="mr-8">
          <div>
            Hooks are how you connect your components to the backend.
            <br />
            Components can use hooks to fetch data and perform actions.
          </div>
        </HelpTooltip>
      </div>
      <div className="text-white mt-2 space-y-2 overflow-y-auto max-h-[calc(100vh/3)]">
        {hooksMetadata.map((hook) => (
          <div className="bg-white/10 p-2 text-center text-xs overflow-x-auto">
            {hook.hookName.replace("use", "")}
          </div>
        ))}
      </div>
      <button
        className="w-full text-gray-300 text-xs mt-4 hover:text-white"
        onClick={onShowComponentsClick}
      >
        View Components
      </button>
    </div>
  );
}

export default Hooks;
