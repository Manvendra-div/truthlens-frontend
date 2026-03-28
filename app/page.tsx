import { Button } from "@/components/ui/button";
import { PredictionBadge } from "@/components/prediction-badge";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Newspaper } from "lucide-react";
import Image from "next/image";
import AiDemo from "@/components/ai-demo";
import FeaturesSection from "@/components/feature-section";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:px-6 md:py-14">
      <section className="grid grid-cols-1 items-center gap-10 justify-center">
        <div className="space-y-6">
          <div className="gap-3 text-balance flex flex-col justify-center items-center text-center">
            <Badge className="ring-1 bg-primary/10 font-medium ring-primary text-xs sm:text-sm">
              AI + community to fact-check your feed
            </Badge>
            <h1 className="text-2xl font-semibold tracking-tight md:text-6xl">
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

          <div className="flex flex-wrap gap-4 justify-center">
            <AiDemo>
              <Button
                size="lg"
                className="bg-linear-to-b relative from-primary to-indigo-700 overflow-hidden"
              >
                Try AI Prediction <ArrowUpRight />
                <Image
                  alt="Noise"
                  height={100}
                  width={100}
                  src={"/noise.svg"}
                  className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-40 w-full"
                />
              </Button>
            </AiDemo>
            <Button asChild size="lg">
              <Link href="/create">Start an article</Link>
            </Button>
            <Button asChild variant="link" size="lg">
              <Link href="/feed">
                View community feed <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4 mt-10 sm:mt-20 mb-6 sm:mb-8 z-10">
        <h1 className="text-xl font-semibold tracking-tight sm:text-3xl text-muted-foreground">
          Everything you need to spot the{" "}
          <span className="text-foreground">truth</span>
        </h1>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted-foreground md:text-sm">
          <div className="sm:col-span-12 rounded-md border hover:border-primary hover:bg-card transition-all duration-300 overflow-hidden bg-accent/60 group">
            <div className="relative h-42 sm:h-52 w-full mask-y-from-60% mask-x-from-96% select-none">
              <Image
                alt=""
                height={800}
                width={800}
                src={"/grid.svg"}
                className="absolute -top-10 -z-10 w-full h-auto"
              />
              <div className="absolute bg-background top-10 left-8 sm:left-10 p-4 h-52 border w-112.5 sm:w-[60%] rounded-md z-10">
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

            <div className="h-24 sm:h-20 flex flex-col justify-end overflow-hidden px-4 pt-0 pb-4">
              <dt className="font-medium text-base sm:text-lg text-foreground transition-all duration-500 group-hover:-translate-y-1 pt-4">
                AI fake news detection
              </dt>
              <dd className="max-h-0 group-hover:max-h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-xs sm:text-sm text-muted-foreground">
                Fine-tuned BERT model flags suspicious claims with confidence
                scores.
              </dd>
            </div>
          </div>
          <div className="sm:col-span-6 rounded-md border hover:border-primary hover:bg-card transition-all duration-300 overflow-hidden bg-accent/40 group">
            <div className="relative h-42 sm:h-52 w-full mask-y-from-60% mask-x-from-96% select-none">
              <Image
                alt=""
                height={800}
                width={800}
                src={"/grid.svg"}
                className="absolute -top-10 -z-10 w-full h-auto"
              />
            </div>
            <div className="h-24 sm:h-20 flex flex-col justify-end overflow-hidden px-4 pt-0 pb-4">
              <dt className="font-medium text-base sm:text-lg text-foreground transition-all duration-500 group-hover:-translate-y-1 pt-4">
                Community discussion
              </dt>
              <dd className="max-h-0 group-hover:max-h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-xs sm:text-sm text-muted-foreground">
                Threaded comments, likes, and reactions on every post.
              </dd>
            </div>
          </div>
          <div className="sm:col-span-6 rounded-md border hover:border-primary hover:bg-card transition-all duration-300 overflow-hidden bg-accent/40 group">
            <div className="relative h-42 sm:h-52 w-full mask-y-from-60% mask-x-from-96% select-none">
              <Image
                alt=""
                height={800}
                width={800}
                src={"/grid.svg"}
                className="absolute -top-10 -z-10 w-full h-auto"
              />
            </div>
            <div className="h-24 sm:h-20 flex flex-col justify-end overflow-hidden px-4 pt-0 pb-4">
              <dt className="font-medium text-base sm:text-lg text-foreground transition-all duration-500 group-hover:-translate-y-1 pt-4">
                Crowdsourced verification
              </dt>
              <dd className="max-h-0 group-hover:max-h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-xs sm:text-sm text-muted-foreground">
                Surface trustworthy sources and challenge misleading narratives
                together.
              </dd>
            </div>
          </div>
        </dl>
      </section>

      <FeaturesSection />
    </div>
  );
}
