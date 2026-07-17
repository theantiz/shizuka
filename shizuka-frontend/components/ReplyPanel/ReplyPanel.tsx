'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check, Reply } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ReplyPanelProps {
  reply: string;
}

export function ReplyPanel({ reply }: ReplyPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!reply) return;
    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-subtle rounded-2xl border border-white/60 p-5 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sakura-100 text-xs font-bold text-sakura-700">
          2
        </span>
        <h2 className="text-base font-semibold text-foreground">
          Generated Reply{' '}
          <span className="font-jp text-muted-foreground">/ 返信内容</span>
        </h2>
      </div>

      <Textarea
        value={reply}
        readOnly
        placeholder="Reply will appear here…"
        className="min-h-[160px] resize-y border-white/70 bg-white/70 text-sm leading-relaxed"
      />

      <div className="mt-4 flex justify-end">
        <motion.div
          whileHover={{ scale: reply ? 1.02 : 1, y: reply ? -2 : 0 }}
          whileTap={{ scale: reply ? 0.98 : 1 }}
        >
          <Button
            onClick={handleCopy}
            disabled={!reply}
            variant="secondary"
            className="border border-sakura-200 bg-white/70 text-sakura-700 hover:bg-sakura-50 hover:text-sakura-800"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy to Clipboard
                <span className="ml-2 font-jp text-sm opacity-80">コピーする</span>
              </>
            )}
          </Button>
        </motion.div>
      </div>

      {!reply && (
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Reply className="h-3.5 w-3.5" />
          <span>Your generated reply will show up here</span>
        </div>
      )}
    </motion.section>
  );
}
