import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "./lib/utils";

interface HelpTooltipProps {
  children: React.ReactNode;
  className?: string;
}

function HelpTooltip({ children, className }: HelpTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger className="text-black rounded-full bg-white h-4 w-4 text-sm flex items-center justify-center">
          ?
        </TooltipTrigger>
        <TooltipContent
          className={cn("text-sm text-black text-center", className)}
        >
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default HelpTooltip;
