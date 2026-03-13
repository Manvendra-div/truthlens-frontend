import { MessageCircle } from "lucide-react";
import Link from "next/link";

type PostActionsProps = {
  postId: number;
  commentsCount: number;
};

export function PostActions({ postId, commentsCount }: PostActionsProps) {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <Link
        href={`/post/${postId}#comments`}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-primary"
      >
        <MessageCircle className="h-4 w-4" />
        <span>{commentsCount} {commentsCount === 1 ? "comment" : "comments"}</span>
      </Link>
    </div>
  );
}
