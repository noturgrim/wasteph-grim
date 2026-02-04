import { Wifi, WifiOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * SocketStatusIndicator - Shows real-time connection status
 * Displays in header/navbar to indicate WebSocket connection health
 */
export function SocketStatusIndicator() {
  const { isSocketConnected } = useAuth();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border bg-background">
            {isSocketConnected ? (
              <>
                <Wifi className="h-4 w-4 text-green-600" />
                <span className="text-xs font-medium text-green-600">Live</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">
                  Offline
                </span>
              </>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isSocketConnected
              ? "Real-time updates active"
              : "Real-time updates offline"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
