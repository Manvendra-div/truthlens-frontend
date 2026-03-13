"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PredictionBadge } from "@/components/prediction-badge";
import { runPrediction } from "@/lib/api";
import { usePosts } from "@/hooks/usePosts";
import type { Prediction } from "@/types/prediction";
import { toast } from "sonner";

type CreatePostFormProps = {
  onCreated?: () => void;
};

export function CreatePostForm({ onCreated }: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [prediction, setPrediction] = useState<Prediction | undefined>();
  const [isPredicting, setIsPredicting] = useState(false);
  const { createPostMutation } = usePosts();

  const handlePredict = async () => {
    if (!content.trim()) {
      toast.info("Add content to analyze first.");
      return;
    }
    try {
      setIsPredicting(true);
      const result = await runPrediction({ text: content });
      setPrediction(result);
    } catch {
      toast.error("Prediction failed. Please try again.");
    } finally {
      setIsPredicting(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createPostMutation.mutate(
      { title: title.trim(), content: content.trim() },
      {
        onSuccess: () => {
          toast.success("Post published.");
          setTitle("");
          setContent("");
          setPrediction(undefined);
          onCreated?.();
        },
        onError: () => {
          toast.error("Unable to publish post.");
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border bg-card/70 p-4 shadow-sm md:p-6"
    >
      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Short, factual headline"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Paste the article, tweet, or claim you want to analyze..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={8}
          required
        />
      </div>

      <div className="flex flex-col gap-3 rounded-lg bg-muted/40 p-3 text-sm md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Prediction
          </p>
          <PredictionBadge prediction={prediction} />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="self-start md:self-center"
          onClick={handlePredict}
          disabled={isPredicting || !content.trim()}
        >
          {isPredicting ? "Analyzing…" : "Run AI prediction"}
        </Button>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          disabled={
            createPostMutation.isPending || !title.trim() || !content.trim()
          }
        >
          {createPostMutation.isPending ? "Publishing…" : "Publish post"}
        </Button>
      </div>
    </form>
  );
}
