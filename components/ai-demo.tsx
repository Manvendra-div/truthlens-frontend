"use client";

import { ReactNode, useState } from "react";
import { PredictionBadge } from "./prediction-badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Prediction } from "@/types/prediction";
import { runPrediction } from "@/lib/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function AiDemo({ children }: { children: ReactNode }) {
  const [demoText, setDemoText] = useState("");
  const [prediction, setPrediction] = useState<Prediction | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoPredict = async () => {
    if (!demoText.trim()) return;
    try {
      setIsLoading(true);
      const result = await runPrediction({ text: demoText });
      setPrediction(result);
    } catch {
      toast.error("Unable to run prediction right now.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base md:text-lg">
            Try the prediction demo
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground md:text-sm">
            Paste a headline or short paragraph and see how TruthLens scores it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Input
            placeholder="e.g. Scientists confirm water on Mars in new NASA report"
            value={demoText}
            onChange={(event) => setDemoText(event.target.value)}
          />
        </div>
        <div className="space-y-2 rounded-lg bg-muted/40 p-3 text-xs md:text-sm">
          <p className="mb-1 font-medium uppercase tracking-wide text-muted-foreground">
            AI verdict
          </p>
          <PredictionBadge decoy={true} prediction={prediction} />
        </div>
        <Button
          className="w-full"
          onClick={handleDemoPredict}
          disabled={isLoading || !demoText.trim()}
        >
          {isLoading ? "Analyzing…" : "Run demo prediction"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
