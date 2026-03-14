import type { Comment } from "@/types/comment";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Info, Trash2, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

type CommentItemProps = {
  comment: Comment;
  canDelete?: boolean;
  onDelete?: (id: number) => void;
};

export function CommentItem({
  comment,
  canDelete,
  onDelete,
}: CommentItemProps) {
  const createdAt = new Date(comment.created_at).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  
  return (
    <li className="flex gap-2.5">
      <div className="bg-accent rounded-full p-2 h-fit w-fit">
        <User2 className="w-6 h-6" />
      </div>
      <div className="w-full text-sm">
        <div className="flex items-center gap-2 p-1">
          <span className="text-sm leading-tight">{comment.user==undefined ? <Skeleton className="w-16 h-6"/>: comment.user.username}</span>
          <span className="text-[11px] text-muted-foreground leading-relaxed">{createdAt}</span>
        </div>
        <div className="group flex flex-col gap-1 rounded-b-full rounded-tr-full border border-border/60 bg-muted/40 px-3 py-2 text-sm md:px-3.5 md:py-2.5">
          <div className="flex items-start justify-between gap-3">
            <p className="flex-1 text-base leading-relaxed text-foreground">
              {comment.content}
            </p>
            {canDelete && onDelete && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground"
                  >
                    <EllipsisVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="text-destructive hover:bg-destructive/10 group"
                    onClick={() => onDelete(comment.id)}
                  >
                    <Trash2 className="stroke-destructive group-hover:stroke-destructive size-4" />
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Info className="size-4" />
                    Info
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
      {/* <span className="text-[11px] text-muted-foreground">{createdAt}</span> */}
    </li>
  );
}
