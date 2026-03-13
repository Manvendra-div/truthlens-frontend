import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-6 text-center text-sm text-destructive">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        <span className="font-medium">
          {message ?? "Something went wrong loading this data."}
        </span>
      </div>
      {onRetry && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="mt-1 border-destructive/40 text-destructive hover:bg-destructive/10"
          onClick={onRetry}
        >
          Try again
        </Button>
      )}
    </div>
  );
}

