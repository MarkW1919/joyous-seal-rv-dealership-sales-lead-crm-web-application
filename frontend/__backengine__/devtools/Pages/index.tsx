import pagesMetadata from "../../pages.json";
import HelpTooltip from "../HelpTooltip";
import Page from "./Page";

interface PagesProps {
  showOverlay: boolean;
}

function Pages({ showOverlay }: PagesProps) {
  if (!showOverlay) {
    return null;
  }

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-10 w-52 z-50 bg-[#1C1C25] rounded-md pt-3 pb-5 px-6 shadow-lg shadow-gray-400">
      <div className="flex space-x-2 items-center w-full justify-center">
        <h3 className="text-[#3db6b9] font-bold text-center tracking-wide">
          Pages
        </h3>
        <HelpTooltip className="ml  -8">
          <div>Pages are the different screens in your app.</div>
        </HelpTooltip>
      </div>
      <div className="text-white mt-2 space-y-2 overflow-y-auto max-h-[calc(100vh/3)]">
        {pagesMetadata.map((page, index) => (
          <Page key={page.name} page={page} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Pages;
