import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";

type CommentSectionProps = {
  postId: number | string;
};

export function CommentSection({ postId }: CommentSectionProps) {
  return (
    <section className="rounded-md bg-muted/10 border">
      <div className="p-4">
        <CommentList postId={postId} />
      </div>
      <CommentForm postId={postId} />
    </section>
  );
}

