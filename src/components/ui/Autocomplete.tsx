"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface AutocompleteProps<T> {
  label: string;
  value: T | null;
  onChange: (item: T | null) => void;
  query: string;
  onQueryChange: (q: string) => void;
  items: T[];
  loading?: boolean;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  getSubLabel?: (item: T) => string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  emptyText?: string;
}

export function Autocomplete<T>({
  label, value, onChange, query, onQueryChange, items, loading,
  getKey, getLabel, getSubLabel, placeholder, error, disabled, emptyText,
}: AutocompleteProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const displayValue = value ? getLabel(value) : query;

  return (
    <div ref={ref} className="relative">
      <label className="block text-[9px] font-mono tracking-widest text-vss-mist uppercase mb-1.5">
        {label} {error && <span className="text-vss-paper">*</span>}
      </label>

      <div className="relative">
        <input
          type="text"
          value={displayValue}
          onChange={(e) => {
            onQueryChange(e.target.value);
            if (value) onChange(null);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full h-11 pl-9 pr-9 bg-vss-void border text-sm text-vss-paper placeholder:text-vss-fog focus:border-vss-paper outline-none transition-colors disabled:opacity-50",
            error ? "border-vss-paper" : "border-vss-smoke"
          )}
        />
        <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-vss-fog pointer-events-none" />
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 text-vss-fog transition-transform pointer-events-none",
            open && "rotate-180"
          )}
        />
      </div>

      <AnimatePresence>
        {open && (query.length > 0 || items.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-1 bg-vss-graphite border border-vss-smoke shadow-2xl z-30 max-h-64 overflow-y-auto"
          >
            {loading ? (
              <div className="p-4 text-center">
                <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-vss-fog uppercase">
                  <span className="w-3 h-3 border-2 border-vss-paper border-t-transparent rounded-full animate-spin" />
                  {emptyText || "Loading..."}
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="p-4 text-center text-[11px] font-mono text-vss-fog uppercase tracking-widest">
                {query.length < 2 ? "→ Введіть назву" : "Нічого не знайдено"}
              </div>
            ) : (
              items.map((item) => {
                const isSelected = value && getKey(value) === getKey(item);
                return (
                  <button
                    key={getKey(item)}
                    type="button"
                    onClick={() => {
                      onChange(item);
                      onQueryChange(getLabel(item));
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2.5 transition-colors flex items-start justify-between gap-3 group",
                      isSelected
                        ? "bg-vss-paper text-vss-void"
                        : "text-vss-bone hover:bg-vss-ash hover:text-vss-paper"
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium truncate">{getLabel(item)}</div>
                      {getSubLabel && (
                        <div className={cn(
                          "text-[10px] font-mono tracking-widest mt-0.5 truncate uppercase",
                          isSelected ? "opacity-60" : "text-vss-fog"
                        )}>
                          {getSubLabel(item)}
                        </div>
                      )}
                    </div>
                    {isSelected && <Check size={12} strokeWidth={2.5} className="shrink-0 mt-1" />}
                  </button>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}