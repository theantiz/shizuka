'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { CustomizeOptions, Formality, StylePill } from '@/lib/types';

interface CustomizeFormProps {
  options: CustomizeOptions;
  onChange: (opts: CustomizeOptions) => void;
}

const formalityOptions: { value: Formality; label: string; jp?: string }[] = [
  { value: 'casual', label: 'Casual' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'keigo', label: 'Keigo', jp: '敬語' },
];

const stylePills: { value: StylePill; label: string }[] = [
  { value: 'short-direct', label: 'Short & Direct' },
  { value: 'detailed', label: 'Detailed' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'concise-professional', label: 'Concise Professional' },
];

export function CustomizeForm({ options, onChange }: CustomizeFormProps) {
  const [open, setOpen] = useState(false);

  const toggleStyle = (pill: StylePill) => {
    const has = options.styles.includes(pill);
    onChange({
      ...options,
      styles: has
        ? options.styles.filter((s) => s !== pill)
        : [...options.styles, pill],
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-subtle rounded-2xl border border-white/60 p-5 shadow-sm sm:p-6"
    >
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sakura-100 text-xs font-bold text-sakura-700">
            3
          </span>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-foreground">
              Customize Reply{' '}
              <span className="font-jp text-muted-foreground">/ カスタマイズ</span>
            </h2>
            <p className="font-jp text-xs text-muted-foreground">返信オプション</p>
          </div>
          <CollapsibleTrigger asChild>
            <button
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-sakura-700 transition-colors hover:bg-sakura-50 lg:hidden"
              aria-label={open ? 'Collapse' : 'Expand'}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {open ? 'Hide' : 'Show'}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
              />
            </button>
          </CollapsibleTrigger>
        </div>

        {/* Desktop: always visible. Mobile: collapsible. */}
        <div className="hidden lg:block">
          <CustomizeBody
            options={options}
            onChange={onChange}
            toggleStyle={toggleStyle}
            formalityOptions={formalityOptions}
            stylePills={stylePills}
          />
        </div>

        <CollapsibleContent className="lg:hidden">
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <CustomizeBody
                    options={options}
                    onChange={onChange}
                    toggleStyle={toggleStyle}
                    formalityOptions={formalityOptions}
                    stylePills={stylePills}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CollapsibleContent>
      </Collapsible>
    </motion.section>
  );
}

interface CustomizeBodyProps {
  options: CustomizeOptions;
  onChange: (opts: CustomizeOptions) => void;
  toggleStyle: (pill: StylePill) => void;
  formalityOptions: { value: Formality; label: string; jp?: string }[];
  stylePills: { value: StylePill; label: string }[];
}

function CustomizeBody({
  options,
  onChange,
  toggleStyle,
  formalityOptions,
  stylePills,
}: CustomizeBodyProps) {
  return (
    <div className="mt-5 space-y-5">
      {/* Subject line */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Subject Line <span className="font-jp">/ 件名</span>
        </label>
        <Input
          value={options.subject}
          onChange={(e) => onChange({ ...options, subject: e.target.value })}
          placeholder="Enter custom subject…"
          className="border-white/70 bg-white/70 focus-visible:ring-sakura-400"
        />
      </div>

      {/* Formality */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Formality Level <span className="font-jp">/ 敬語レベル</span>
        </label>
        <Select
          value={options.formality}
          onValueChange={(v) => onChange({ ...options, formality: v as Formality })}
        >
          <SelectTrigger className="border-white/70 bg-white/70 focus:ring-sakura-400">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-sakura-100">
            {formalityOptions.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
                {f.jp && (
                  <span className="font-jp text-muted-foreground"> / {f.jp}</span>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Style pills */}
      <div>
        <label className="mb-2 block text-xs font-medium text-muted-foreground">
          Style
        </label>
        <div className="flex flex-wrap gap-2">
          {stylePills.map((pill) => {
            const active = options.styles.includes(pill.value);
            return (
              <button
                key={pill.value}
                type="button"
                onClick={() => toggleStyle(pill.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-sakura-500 to-sakura-400 text-white shadow-sm shadow-sakura-300/50'
                    : 'border border-sakura-200 bg-white/60 text-sakura-700 hover:bg-sakura-50'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Checkboxes */}
      <div className="space-y-3 rounded-xl border border-white/60 bg-white/40 p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <Checkbox
            checked={options.addJapaneseClosing}
            onCheckedChange={(v) =>
              onChange({ ...options, addJapaneseClosing: v === true })
            }
            className="border-sakura-300 data-[state=checked]:bg-sakura-500 data-[state=checked]:border-sakura-500"
          />
          <div>
            <span className="text-sm font-medium text-foreground">
              Add Japanese closing line
            </span>
            <p className="font-jp text-xs text-muted-foreground">
              日本語の結びを追加
            </p>
          </div>
        </label>

        <label className="flex cursor-pointer items-start gap-3">
          <Checkbox
            checked={options.includeSignature}
            onCheckedChange={(v) =>
              onChange({ ...options, includeSignature: v === true })
            }
            className="border-sakura-300 data-[state=checked]:bg-sakura-500 data-[state=checked]:border-sakura-500"
          />
          <div>
            <span className="text-sm font-medium text-foreground">
              Include signature
            </span>
            <p className="font-jp text-xs text-muted-foreground">署名を含める</p>
          </div>
        </label>
      </div>
    </div>
  );
}
