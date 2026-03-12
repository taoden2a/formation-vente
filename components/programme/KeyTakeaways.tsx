"use client";

import { LightbulbIcon } from "@/components/ui/Icons";

interface KeyTakeawaysProps {
  items: string[];
  className?: string;
}

export function KeyTakeaways({ items, className = "" }: KeyTakeawaysProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`key-takeaways-card rounded-2xl p-6 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
          <LightbulbIcon size={20} className="text-amber-400" />
        </div>
        <h4 className="text-lg font-semibold text-white">À retenir</h4>
      </div>

      {/* Items */}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
          >
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-amber-400">{index + 1}</span>
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
