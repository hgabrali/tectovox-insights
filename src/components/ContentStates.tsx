import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ArticleCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card">
      <Skeleton className="h-32 rounded-t-lg rounded-b-none" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-3 pt-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}

export function ArticleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ArchiveListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="flex flex-col divide-y">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-start gap-4 py-4">
          <Skeleton className="hidden sm:block h-4 w-16 mt-1" />
          <div className="flex-1 space-y-2">
            <div className="flex gap-2">
              <Skeleton className="h-4 w-16 rounded-full" />
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResultCount({ count }: { count: number }) {
  return (
    <p className="text-sm text-muted-foreground transition-all duration-300">
      <span className="inline-block tabular-nums font-semibold text-foreground transition-all duration-500">{count}</span>
      {" "}{count === 1 ? "result" : "results"}
    </p>
  );
}

export function EmptyState({ message = "No content yet" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="h-20 w-20 rounded-2xl bg-muted/50 flex items-center justify-center">
          <Inbox className="h-10 w-10 text-muted-foreground/40" />
        </div>
        <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-[10px] text-primary font-bold">0</span>
        </div>
      </div>
      <p className="text-muted-foreground font-medium">{message}</p>
      <p className="mt-1 text-xs text-muted-foreground/60">Try adjusting your filters</p>
    </div>
  );
}

export function ErrorState({ message = "Could not load content", onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle className="h-12 w-12 text-destructive/50 mb-4" />
      <p className="text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
