import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Prediction } from "@/types/prediction";
import PredictionVote from "./pred-vote/prediction-vote";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect, useState } from "react";

export function PredictionBadge({
  prediction,
  decoy,
}: {
  prediction?: Prediction;
  decoy?: boolean;
}) {
  if (!prediction) {
    return (
      <Badge variant="outline" className="text-[11px]">
        No prediction yet
      </Badge>
    );
  }
  const isReal = prediction.label === "Real";
  const [confidencePct, setconfidencePct] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setconfidencePct(
        Math.round(
          isReal ? prediction.real_confidence : prediction.fake_confidence,
        ),
      );
    }, 200);
  }, []);

  if (decoy) {
    return (
      <div className="flex flex-col gap-2  border bg-card border-border/70 rounded-md p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-2">
          <Badge
            variant={isReal ? "success" : "destructive"}
            className="text-[11px] uppercase tracking-wide"
          >
            {isReal ? "Real News" : "Fake News"} {confidencePct}%
          </Badge>
        </div>
        <Progress
          value={confidencePct}
          className={isReal ? "bg-emerald-500/10" : "bg-red-500/10"}
        />
      </div>
    );
  } else {
    return (
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <div className="flex flex-col gap-2  border bg-card border-border/70 rounded-md p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-2">
              <Badge
                variant={isReal ? "success" : "destructive"}
                className="text-[11px] uppercase tracking-wide"
              >
                {isReal ? "Real News" : "Fake News"} {confidencePct}%
              </Badge>
            </div>
            <Progress
              value={confidencePct}
              className={isReal ? "bg-emerald-500/10" : "bg-red-500/10"}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Vote for this prediction
            </span>
            <PredictionVote />
          </div>
        </PopoverContent>
      </Popover>
    );
  }
}
