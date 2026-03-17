import { categoryConfig, contentTypeConfig, type Category, type ContentType } from "@/lib/data";
import { type Filters, type DateRange } from "@/hooks/use-content-filters";
import { X } from "lucide-react";

interface FilterBarProps {
  filters: Filters;
  setFilter: (key: keyof Filters, value: string | null) => void;
  clearFilters: () => void;
  showCategoryFilter?: boolean;
}

const dateOptions: { value: DateRange; label: string }[] = [
  { value: "all", label: "All time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
];

const sortOptions: { value: "date" | "relevance"; label: string }[] = [
  { value: "date", label: "Date" },
  { value: "relevance", label: "Relevance" },
];

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-muted/80"
      }`}
    >
      {children}
    </button>
  );
}

export function FilterBar({ filters, setFilter, clearFilters, showCategoryFilter = false }: FilterBarProps) {
  const hasActiveFilters = filters.category || filters.type || filters.date !== "all" || filters.sort !== "date";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {/* Category filter (homepage only) */}
        {showCategoryFilter && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Topic</span>
            <Pill active={!filters.category} onClick={() => setFilter("category", null)}>All</Pill>
            {Object.entries(categoryConfig).map(([key, val]) => (
              <Pill key={key} active={filters.category === key} onClick={() => setFilter("category", filters.category === key ? null : key)}>
                {val.label}
              </Pill>
            ))}
          </div>
        )}

        {/* Content type filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Type</span>
          <Pill active={!filters.type} onClick={() => setFilter("type", null)}>All</Pill>
          {Object.entries(contentTypeConfig).map(([key, val]) => {
            const Icon = val.icon;
            return (
              <Pill key={key} active={filters.type === key} onClick={() => setFilter("type", filters.type === key ? null : key)}>
                <span className="flex items-center gap-1.5">
                  <Icon className="h-3 w-3" />
                  {val.label}
                </span>
              </Pill>
            );
          })}
        </div>

        {/* Date filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</span>
          {dateOptions.map((opt) => (
            <Pill key={opt.value} active={filters.date === opt.value} onClick={() => setFilter("date", opt.value)}>
              {opt.label}
            </Pill>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sort</span>
          {sortOptions.map((opt) => (
            <Pill key={opt.value} active={filters.sort === opt.value} onClick={() => setFilter("sort", opt.value)}>
              {opt.label}
            </Pill>
          ))}
        </div>

        {/* Clear */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <X className="h-3 w-3" /> Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
