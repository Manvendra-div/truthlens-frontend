"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionBadge } from "@/components/prediction-badge";
import { useState } from "react";
import { runPrediction } from "@/lib/api";
import type { Prediction } from "@/types/prediction";
import { toast } from "sonner";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import Image from "next/image";

export default function Home() {
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
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 md:px-6 md:py-14">
      <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="inline-flex rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/10">
              AI + community to fact-check your feed
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Shine a light on misinformation with{" "}
              <span className="text-primary">TruthLens</span>.
            </h1>
            <p className="text-sm text-muted-foreground md:text-base">
              Paste any headline or article, get an instant AI authenticity
              score, and see what the community thinks. TruthLens combines a
              fine-tuned BERT model with crowdsourced discussion to verify
              what&apos;s real.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="px-6">
              <Link href="/create">Start analyzing news</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-6">
              <Link href="/feed">View community feed</Link>
            </Button>
          </div>
        </div>

        <Card className="border-border/70 bg-card/80 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg">
              Try the prediction demo
            </CardTitle>
            <p className="text-xs text-muted-foreground md:text-sm">
              Paste a headline or short paragraph and see how TruthLens scores
              it.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <PredictionBadge prediction={prediction} />
            </div>
            <Button
              className="w-full"
              onClick={handleDemoPredict}
              disabled={isLoading || !demoText.trim()}
            >
              {isLoading ? "Analyzing…" : "Run demo prediction"}
            </Button>
          </CardContent>
        </Card>
      </section>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted-foreground md:text-sm">
        <div className="sm:col-span-12 overflow-hidden rounded-md border border-transparent hover:border-border hover:bg-card transition duration-300">
          <div className="relative h-52 w-full mask-y-from-50% mask-x-from-90% select-none">
            <Image alt="" height={800} width={800} src={"/grid.svg"} className="-z-10 w-full"/>
            <div className="absolute bg-background top-10 left-8 sm:left-10 p-4 h-52 border w-80 sm:w-[60%] rounded-md z-10">
              <span className="text-sm sm:text-lg flex gap-2 items-center text-foreground font-medium leading-tight">
                 <Newspaper className="stroke-2 w-6 h-6"/> Apple Invites App Updated, Here's What's New
              </span>
              <p className="text-xs sm:text-base leading-relaxed mt-2">
                With the latest version of the Apple Invites app on the iPhone,
                released today, the app's Home Screen widget has received a
                small but useful enhancement.In August, the app
                gained a Home Screen widget that counts down the days until an
                upcoming event
              </p>
            
            </div>
            <div className="scale-90 sm:scale-125 absolute bottom-5 sm:bottom-10 -right-10 sm:right-20 w-72 z-10">
              <PredictionBadge
                decoy={true}
                prediction={{
                  label: "Real",
                  fake_confidence: 35.46,
                  real_confidence: 64.54,
                }}
              />
            </div>
          </div>

          <dt className="font-medium text-foreground px-4">
            AI fake news detection
          </dt>
          <dd className="px-4 mb-4">
            Fine-tuned BERT model flags suspicious claims with confidence
            scores.
          </dd>
        </div>
        <div className="sm:col-span-6 p-4 rounded-md border border-transparent hover:border-border hover:bg-card transition duration-300">
          <dt className="font-medium text-foreground">Community discussion</dt>
          <dd>Threaded comments, likes, and reactions on every post.</dd>
        </div>
        <div className="sm:col-span-6 p-4 rounded-md border border-transparent hover:border-border hover:bg-card transition duration-300">
          <dt className="font-medium text-foreground">
            Crowdsourced verification
          </dt>
          <dd>
            Surface trustworthy sources and challenge misleading narratives
            together.
          </dd>
        </div>
      </dl>

      <section className="grid grid-cols-1 gap-6 border-t pt-8 md:grid-cols-3">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold tracking-tight md:text-base">
            Built for modern newsrooms
          </h2>
          <p className="text-xs text-muted-foreground md:text-sm">
            Track breaking stories, detect coordinated misinformation, and share
            transparent evidence with your audience.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold tracking-tight md:text-base">
            Designed for readers
          </h2>
          <p className="text-xs text-muted-foreground md:text-sm">
            Follow topics, bookmark posts, and see confidence scores before you
            share.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold tracking-tight md:text-base">
            Privacy-respecting by default
          </h2>
          <p className="text-xs text-muted-foreground md:text-sm">
            Your analysis history lives in your account. We never sell or resell
            your reading patterns.
          </p>
        </div>
      </section>
    </div>
  );
}
