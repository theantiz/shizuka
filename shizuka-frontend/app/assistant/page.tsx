'use client';

import { useState } from 'react';
import { postEmailReply } from '@/lib/api';
import { motion } from 'framer-motion';
import { CherryBlossomBackground } from '@/components/Layout/CherryBlossomBackground';
import { BrandingHeader } from '@/components/Layout/BrandingHeader';
import { EmailForm } from '@/components/EmailForm/EmailForm';
import { ReplyPanel } from '@/components/ReplyPanel/ReplyPanel';
import { CustomizeForm } from '@/components/CustomizeForm/CustomizeForm';
import { LoadingOverlay } from '@/components/LoadingOverlay/LoadingOverlay';
import type { Tone, CustomizeOptions } from '@/lib/types';

const defaultCustomize: CustomizeOptions = {
  subject: '',
  formality: 'neutral',
  styles: [],
  addJapaneseClosing: false,
  includeSignature: false,
};

function buildDemoReply(email: string, tone: Tone, opts: CustomizeOptions): string {
  const toneMap: Record<Tone, string> = {
    casual: 'casual and friendly',
    neutral: 'neutral',
    formal: 'formal',
    'very-polite': 'very polite and respectful',
  };

  const styleLabel =
    opts.styles.length > 0
      ? opts.styles
          .map((s) =>
            s
              .split('-')
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' ')
          )
          .join(', ')
      : 'balanced';

  const subject = opts.subject || 'Re: Your email';
  const formalityNote =
    opts.formality === 'keigo'
      ? ' (in keigo / honorific form)'
      : ` (in ${opts.formality} form)`;

  const lines = [
    `Subject: ${subject}`,
    '',
    `Thank you for your email. I appreciate you taking the time to write.`,
    '',
    `Here is a ${toneMap[tone]}${formalityNote} response, kept ${styleLabel.toLowerCase()}:`,
    '',
    `I have reviewed your message regarding "${email.slice(0, 80).trim() || 'your inquiry'}…" and would be glad to help. Could you share a few more details so I can assist you accurately?`,
    '',
  ];

  if (opts.addJapaneseClosing) {
    lines.push('ご返信をお待ちしております。');
    lines.push('');
  }

  if (opts.includeSignature) {
    lines.push('Best regards,');
    lines.push('Shizuka – AI Email Assistant');
  }

  return lines.join('\n');
}

export default function AssistantPage() {
  const [email, setEmail] = useState('');
  const [tone, setTone] = useState<Tone>('neutral');
  const [customize, setCustomize] = useState<CustomizeOptions>(defaultCustomize);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (email.trim().length === 0) return;

    setLoading(true);
    setReply('');

    try {
      const responseText = await postEmailReply({
        emailContent: email,
        tone: tone,
      });

      setReply(responseText);
    } catch (e) {
      setReply(
        `Failed to generate reply.\n\n$${String(e instanceof Error ? e.message : e)}
`.
          replace('$', '')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CherryBlossomBackground />

      <main className="relative min-h-screen w-full px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
        <div className="mx-auto w-full max-w-2xl">
          <BrandingHeader />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            className="glass-card mt-8 rounded-3xl border border-white/70 p-4 shadow-2xl shadow-sakura-200/40 sm:p-6 lg:p-8"
          >
            <div className="space-y-5">
              <EmailForm
                value={email}
                onChange={setEmail}
                tone={tone}
                onToneChange={setTone}
                onGenerate={handleGenerate}
                disabled={loading}
              />
              <ReplyPanel reply={reply} />
              <CustomizeForm options={customize} onChange={setCustomize} />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center text-xs text-muted-foreground"
          >
            Shizuka respects your privacy — emails are processed locally for this demo.
          </motion.p>
        </div>
      </main>

      <LoadingOverlay visible={loading} />
    </>
  );
}
