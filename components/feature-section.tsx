"use client";
import { useState } from "react";
import { Cuboid, Users2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = {
  newsroom: {
    tag: "For publishers",
    tagClass: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    title:
      "Track breaking stories, detect coordinated misinformation, and share transparent evidence with your audience.",
    body: "TruthLens plugs directly into your workflow — flag suspicious articles before publication, monitor trending claims in real time, and build reader trust with transparent AI credibility scores.",
    stats: [
      { value: "2×", label: "Faster fact checks" },
      { value: "BERT", label: "Fine-tuned model" },
      { value: "Auto", label: "News ingestion" },
    ],
  },
  readers: {
    tag: "For the community",
    tagClass:
      "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    title: "Read smarter. Question more. Contribute to the truth.",
    body: "Every post on TruthLens comes with an AI credibility badge — real vs fake, with confidence scores. Like posts, leave comments, and help surface reliable journalism through collective signal.",
    stats: [
      { value: "Live", label: "Credibility badges" },
      { value: "Threaded", label: "Comments & likes" },
      { value: "Open", label: "Community feed" },
    ],
  },
  privacy: {
    tag: "Privacy first",
    tagClass:
      "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    title:
      "Your data stays yours. No trackers, no ad targeting, no selling your activity.",
    body: "Authentication uses HTTP-only JWT cookies — never exposed to JavaScript. Passwords are SHA-256 prehashed before bcrypt. No third-party analytics or advertising SDKs are included.",
    stats: [
      { value: "HTTP", label: "Only cookies" },
      { value: "bcrypt", label: "Password hashing" },
      { value: "Zero", label: "Ad trackers" },
    ],
  },
};

type TabKey = keyof typeof tabs;

export default function FeaturesSection() {
  const [active, setActive] = useState<TabKey>("newsroom");
  const [visible, setVisible] = useState(true);

  const switchTab = (key: TabKey) => {
    if (key === active) return;
    setVisible(false);
    setTimeout(() => {
      setActive(key);
      setVisible(true);
    }, 220);
  };

  const t = tabs[active];

  return (
    <section className="my-6 sm:my-8">
      <div className="border rounded-lg p-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {(
            [
              ["newsroom", Cuboid, "Built for modern newsrooms"],
              ["readers", Users2, "Designed for readers"],
              ["privacy", Lock, "Privacy-respecting by default"],
            ] as const
          ).map(([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => switchTab(key)}
              className={cn(
                "flex items-center justify-center gap-2 p-3 border rounded-md text-sm font-medium transition-all duration-200",
                active === key
                  ? "bg-background border-foreground/30 hover:border-primary text-foreground"
                  : "bg-accent/40 border-border text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        <div
          className={cn(
            "border rounded-lg p-6 min-h-37 transition-all duration-200",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          <span
            className={cn(
              "inline-flex text-xs font-medium px-3 py-1 rounded-full mb-3",
              t.tagClass,
            )}
          >
            {t.tag}
          </span>
          <p className="text-sm font-medium leading-relaxed mb-2">{t.title}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t.body}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 mt-4 sm:h-40 bg-linear-to-b from-accent via-transparent to-accent rounded-md border">
            {t.stats.map((s, i) => (
              <div
                key={s.label}
                className={cn(i != t.stats.length - 1 ? "border-b sm:border-b-0 sm:border-r" : "","flex flex-col justify-center items-center p-2.5")}
              >
                <div className="text-xl font-medium">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
