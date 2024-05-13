import { MouseEventHandler, useState } from "react";
import componentsMetadata from "../../components.json";
import pagesMetadata from "../../pages.json";
import FilterCheckbox from "./FilterCheckbox";
import Component from "./Component";
import HelpTooltip from "../HelpTooltip";

function filterComponentsMetadata(filterComponents: boolean) {
  if (filterComponents) {
    const page = pagesMetadata.find(
      (element) => element.path === window.location.pathname
    );
    if (!page) {
      return componentsMetadata;
    }
    return page.components;
  }

  return componentsMetadata;
}

interface ComponentsProps {
  showOverlay: boolean;
  onShowHooksClick: MouseEventHandler<HTMLButtonElement>;
}

function Components({ showOverlay, onShowHooksClick }: ComponentsProps) {
  const [filterComponents, setFilterComponents] = useState(true);

  if (!showOverlay) {
    return null;
  }

  const componentsMetadata = filterComponentsMetadata(filterComponents);

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-10 w-52 z-50 bg-[#1C1C25] rounded-md pt-3 pb-5 px-6 shadow-lg shadow-gray-400">
      <div className="flex space-x-2 items-center w-full justify-center">
        <h3 className="text-[#3db6b9] font-bold text-center tracking-wide">
          Components
        </h3>
        <HelpTooltip className="mr-8">
          <div>
            Components are reusable UI elements.
            <br />
            Place components on pages to build your app.
          </div>
        </HelpTooltip>
      </div>
      <FilterCheckbox
        filterComponents={filterComponents}
        setFilterComponents={setFilterComponents}
      />
      <div className="text-white mt-2 space-y-2 overflow-y-auto max-h-[calc(100vh/3)]">
        {componentsMetadata.map((component) => (
          <Component key={component} component={component} />
        ))}
      </div>
      <button
        className="w-full text-gray-300 text-xs mt-4 hover:text-white"
        onClick={onShowHooksClick}
      >
        View Hooks
      </button>
    </div>
  );
}

export default Components;
