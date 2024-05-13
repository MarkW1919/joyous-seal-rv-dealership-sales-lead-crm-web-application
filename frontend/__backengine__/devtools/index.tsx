import { type MouseEventHandler } from "react";
import useLocalStorageState from "use-local-storage-state";
import Components from "./Components";
import Hooks from "./Hooks";
import OverlayToggle from "./OverlayToggle";
import Pages from "./Pages";

const isDevelopment = process.env.NODE_ENV === "development";

export default function DevTools() {
  const [showOverlay, setShowOverlay] = useLocalStorageState("engine-overlay", {
    defaultValue: false,
  });
  const [showHooks, setShowHooks] = useLocalStorageState("engine-hooks", {
    defaultValue: false,
  });

  if (!isDevelopment) {
    return null;
  }

  const handleToggleClick: MouseEventHandler<HTMLDivElement> = () => {
    setShowOverlay((previous) => !previous);
  };

  const handleShowHooksClick: MouseEventHandler<HTMLButtonElement> = () => {
    setShowHooks(true);
  };

  const handleShowComponentsClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setShowHooks(false);
  };

  return (
    <>
      <Pages showOverlay={showOverlay} />
      {!showHooks && (
        <Components
          showOverlay={showOverlay}
          onShowHooksClick={handleShowHooksClick}
        />
      )}
      {showHooks && (
        <Hooks
          showOverlay={showOverlay}
          onShowComponentsClick={handleShowComponentsClick}
        />
      )}
      <OverlayToggle
        showOverlay={showOverlay}
        onToggleClick={handleToggleClick}
      />
    </>
  );
}
