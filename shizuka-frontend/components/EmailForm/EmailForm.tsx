'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { Tone } from '@/lib/types';

interface EmailFormProps {
  value: string;
  onChange: (v: string) => void;
  tone: Tone;
  onToneChange: (t: Tone) => void;
  onGenerate: () => void;
  disabled?: boolean;
}

const tones: { value: Tone; label: string; jp: string }[] = [
  { value: 'casual', label: 'Casual', jp: 'カジュアル' },
  { value: 'neutral', label: 'Neutral', jp: 'ニュートラル' },
  { value: 'formal', label: 'Formal', jp: 'フォーマル' },
  { value: 'very-polite', label: 'Very Polite', jp: '非常に丁寧' },
];

export function EmailForm({
  value,
  onChange,
  tone,
  onToneChange,
  onGenerate,
  disabled,
}: EmailFormProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-subtle rounded-2xl border border-white/60 p-5 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sakura-100 text-xs font-bold text-sakura-700">
          1
        </span>
        <h2 className="text-base font-semibold text-foreground">
          Original Email <span className="font-jp text-muted-foreground">/ 元のメール</span>
        </h2>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your email…"
        className="min-h-[140px] resize-y border-white/70 bg-white/70 text-sm leading-relaxed focus-visible:ring-sakura-400"
      />

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Select Tone / トーンを選択
          </label>
          <Select value={tone} onValueChange={(v) => onToneChange(v as Tone)}>
            <SelectTrigger className="border-white/70 bg-white/70 focus:ring-sakura-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-sakura-100">
              {tones.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label} <span className="font-jp text-muted-foreground">/ {t.jp}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <motion.div
          whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          className="w-full sm:w-auto"
        >
          <Button
            onClick={onGenerate}
            disabled={disabled || value.trim().length === 0}
            className="group relative w-full overflow-hidden bg-gradient-to-r from-sakura-500 to-sakura-400 text-white shadow-md shadow-sakura-300/50 transition-all hover:shadow-lg hover:shadow-sakura-400/60 sm:w-auto"
            size="lg"
          >
            <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
            Generate Reply
            <span className="ml-2 font-jp text-sm opacity-90">返信を生成する</span>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
