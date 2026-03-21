import { Button } from "@/components/ui/button";
import { PredictionBadge } from "@/components/prediction-badge";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import Image from "next/image";
import AiDemo from "@/components/ai-demo";

export default function Home() {
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
        <AiDemo />
      </section>
      <section className="flex flex-col gap-4 my-12 sm:my-20">
        <h1 className="text-xl font-medium tracking-tight sm:text-3xl text-muted-foreground">Everything you need to spot the <span className="text-foreground">truth</span></h1>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted-foreground md:text-sm">
          <div className="sm:col-span-12 rounded-md border hover:border-primary hover:bg-card transition-all duration-300 overflow-hidden bg-accent/40 group">
            <div className="relative h-52 w-full mask-y-from-60% mask-x-from-96% select-none">
              <Image
                alt=""
                height={800}
                width={800}
                src={"/grid.svg"}
                className="absolute -top-10 -z-10 w-full h-auto"
              />
              <div className="absolute bg-background top-10 left-8 sm:left-10 p-4 h-52 border w-80 sm:w-[60%] rounded-md z-10">
                <span className="text-sm sm:text-lg flex gap-2 items-center text-foreground font-medium leading-tight">
                  <Newspaper className="stroke-2 w-6 h-6" /> Apple Invites App
                  Updated, Here's What's New
                </span>
                <p className="text-xs sm:text-base leading-relaxed mt-2">
                  With the latest version of the Apple Invites app on the
                  iPhone, released today, the app's Home Screen widget has
                  received a small but useful enhancement.In August, the app
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

            <div className="h-16 flex flex-col justify-end overflow-hidden px-4 pt-0 pb-4">
              <dt className="font-medium text-foreground transition-all duration-500 group-hover:-translate-y-1 pt-4">
                AI fake news detection
              </dt>
              <dd className="max-h-0 group-hover:max-h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-xs text-muted-foreground">
                Fine-tuned BERT model flags suspicious claims with confidence
                scores.
              </dd>
            </div>
          </div>
          <div className="sm:col-span-6 p-4 rounded-md border hover:border-primary hover:bg-card transition duration-300 bg-accent/40">
            <dt className="font-medium text-foreground">
              Community discussion
            </dt>
            <dd>Threaded comments, likes, and reactions on every post.</dd>
          </div>
          <div className="sm:col-span-6 p-4 rounded-md border hover:border-primary hover:bg-card transition duration-300 bg-accent/40">
            <dt className="font-medium text-foreground">
              Crowdsourced verification
            </dt>
            <dd>
              Surface trustworthy sources and challenge misleading narratives
              together.
            </dd>
          </div>
        </dl>
      </section>

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
