'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  Languages,
  Wand2,
  ShieldCheck,
  ArrowRight,
  Flower2,
} from 'lucide-react';
import { CherryBlossomBackground } from '@/components/Layout/CherryBlossomBackground';
import { SakuraIcon } from '@/components/SakuraIcon';

const features = [
  {
    
    title: 'Instant Replies',
    jp: '即座の返信',
    desc: 'Paste any email and get a polished draft in seconds — no staring at a blank screen.',
  },
  {
    
    title: 'Bilingual Tone',
    jp: 'バイリンガル対応',
    desc: 'Switch between Casual, Formal, and 敬語 with Japanese closings and signatures.',
  },
  {
    
    title: 'Custom Style',
    jp: 'カスタムスタイル',
    desc: 'Short & Direct, Detailed, Friendly, or Concise Professional — tune every reply.',
  },
  {
    
    title: 'Privacy First',
    jp: 'プライバシー重視',
    desc: 'Your emails stay yours. Nothing is stored or shared without your consent.',
  },
];

const steps = [
  {
    n: '1',
    title: 'Paste',
    jp: '貼り付ける',
    desc: 'Drop in the email you received.',
  },
  {
    n: '2',
    title: 'Tune',
    jp: '調整する',
    desc: 'Pick a tone and customize the style.',
  },
  {
    n: '3',
    title: 'Send',
    jp: '送信する',
    desc: 'Copy your perfect reply and go.',
  },
];

interface FeatureCardProps {
  feature: { title: string; jp: string; desc: string };
  className: string;
  rotation: number;
  delay: number;
}

function FeatureCard({ feature, className, rotation, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -6, rotate: 0, scale: 1.03 }}
      className={`glass-subtle absolute z-10 rounded-2xl border border-white/60 p-6 shadow-md shadow-sakura-200/30 transition-shadow hover:shadow-xl hover:shadow-sakura-300/50 ${className}`}
    >
     
      <h3 className="text-lg font-semibold text-foreground">
        {feature.title}
        <span className="ml-2 font-jp text-sm font-normal text-muted-foreground">
          {feature.jp}
        </span>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {feature.desc}
      </p>
    </motion.div>
  );
}

function DecorativePetal({
  className,
  size,
  delay,
}: {
  className: string;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute z-0 ${className}`}
      animate={{ y: [0, -12, 0], rotate: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size }}>
        <path
          d="M12 2c2 3 5 4 5 8 0 2-2 4-5 4s-5-2-5-4c0-4 3-5 5-8z"
          fill="#ffb3c8"
        />
      </svg>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <>
      <CherryBlossomBackground />

      <main className="relative min-h-screen w-full">
        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center justify-between px-6 py-6 sm:px-10"
        >
          <div className="flex items-center gap-2">
            <SakuraIcon className="h-7 w-7" />
            <span className="font-jp text-xl font-bold text-sakura-700">シズカ</span>
          </div>
          <Link
            href="/assistant"
            className="rounded-full border border-sakura-200 bg-white/60 px-5 py-2 text-sm font-medium text-sakura-700 backdrop-blur-sm transition-all hover:bg-sakura-50 hover:shadow-sm hover:shadow-sakura-200"
          >
            Open App
          </Link>
        </motion.nav>

        {/* Hero — split layout with animated email-to-reply visual */}
        <section className="mx-auto max-w-6xl px-6 pt-8 sm:pt-12 lg:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            {/* Left: copy + CTAs */}
            <div className="flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mb-6 flex items-center gap-2 rounded-full border border-sakura-200 bg-white/60 px-4 py-1.5 backdrop-blur-sm"
              >
                <Flower2 className="h-4 w-4 text-sakura-500" />
                <span className="text-xs font-medium text-sakura-600">
                  AIメールアシスタント
                </span>
              </motion.div>

              <div className="flex items-baseline gap-4">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                  className="font-jp text-2xl font-bold text-sakura-300 sm:text-3xl"
                >
                  静かな返信
                </motion.h1>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xs text-muted-foreground"
                >
                  calm replies
                </motion.span>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                className="mt-3 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]"
              >
                Reply to any email with{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-sakura-500 to-sakura-400 bg-clip-text text-transparent">
                    calm confidence
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-sakura-400 to-sakura-300"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                  />
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
                className="mt-5 max-w-md text-balance text-lg leading-relaxed text-muted-foreground"
              >
                Shizuka drafts polished, tone-perfect email replies in seconds —
                inspired by the calm of cherry blossoms.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Link href="/assistant">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sakura-500 to-sakura-400 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-sakura-300/50"
                  >
                    Start drafting
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-full border border-sakura-200 bg-white/60 px-7 py-3.5 text-base font-medium text-sakura-700 backdrop-blur-sm transition-all hover:bg-sakura-50"
                >
                  See how it works
                </a>
              </motion.div>

              {/* mini stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 flex gap-8"
              >
                {[
                  { num: '4', label: 'Tone levels' },
                  { num: '2', label: 'Languages' },
                  { num: '∞', label: 'Replies' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-jp text-2xl font-bold text-sakura-600">
                      {s.num}
                    </div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: animated email-to-reply visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="relative h-[26rem] lg:h-[30rem]"
            >
              {/* glowing backdrop */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sakura-200/40 blur-3xl"
              />

              {/* Original email card (top, tilted) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-card absolute left-0 top-0 z-20 w-[88%] rounded-2xl border border-white/70 p-5 shadow-xl shadow-sakura-200/40"
                style={{ rotate: '-3deg' }}
              >
                <div className="flex items-center gap-2 border-b border-sakura-100 pb-2">
                  <span className="h-2 w-2 rounded-full bg-sakura-300" />
                  <span className="h-2 w-2 rounded-full bg-sakura-200" />
                  <span className="h-2 w-2 rounded-full bg-sakura-100" />
                  <span className="ml-1 text-[10px] font-medium text-muted-foreground">
                    incoming
                  </span>
                </div>
                <p className="mt-3 text-[11px] font-medium text-muted-foreground">
                  From: client@antiz.xyz
                </p>
                <p className="mt-1 text-xs font-semibold text-foreground">
                  Subject: Project timeline update needed
                </p>
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full rounded-full bg-sakura-100/70" />
                  <div className="h-1.5 w-[85%] rounded-full bg-sakura-100/70" />
                  <div className="h-1.5 w-[70%] rounded-full bg-sakura-100/70" />
                </div>
              </motion.div>

              {/* Arrow / transformation indicator */}
              <motion.div
                animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-[42%] top-[38%] z-30 flex flex-col items-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sakura-400 to-sakura-500 shadow-lg shadow-sakura-300/50">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="mt-1 font-jp text-[10px] text-sakura-500">生成</span>
              </motion.div>

              {/* Generated reply card (bottom, tilted opposite) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="glass-card absolute bottom-0 right-0 z-20 w-[88%] rounded-2xl border border-white/70 p-5 shadow-xl shadow-sakura-200/40"
                style={{ rotate: '3deg' }}
              >
                <div className="flex items-center gap-2 border-b border-sakura-100 pb-2">
                  <span className="h-2 w-2 rounded-full bg-green-300" />
                  <span className="ml-1 text-[10px] font-medium text-green-600">
                    reply ready
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-foreground">
                  Thank you for the update. I have reviewed the timeline and
                  I am comfortable with the proposed schedule.
                </p>
                <p className="mt-2 font-jp text-xs leading-relaxed text-foreground">
                  ご確認いただきありがとうございます。
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-sakura-100 px-2.5 py-0.5 text-[10px] font-medium text-sakura-700">
                    Formal
                  </span>
                  <span className="rounded-full bg-sakura-100 px-2.5 py-0.5 text-[10px] font-medium text-sakura-700">
                    Friendly
                  </span>
                  <span className="rounded-full bg-sakura-100 px-2.5 py-0.5 text-[10px] font-medium text-sakura-700">
                    日本語
                  </span>
                </div>
              </motion.div>

              {/* floating petals around the visual */}
              <DecorativePetal className="left-[5%] top-[45%]" size={18} delay={0} />
              <DecorativePetal className="right-[8%] top-[20%]" size={14} delay={0.8} />
              <DecorativePetal className="left-[15%] bottom-[8%]" size={16} delay={1.5} />
              <DecorativePetal className="right-[12%] bottom-[35%]" size={12} delay={2} />
            </motion.div>
          </div>
        </section>

        {/* Features — scattered petals layout */}
        <section className="mx-auto mt-24 max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Everything you need to reply well
            </h2>
            <p className="mt-2 text-muted-foreground">
              落ち着いた、効率的なメールワークフロー
            </p>
          </motion.div>

          {/* Desktop: asymmetric scattered arrangement */}
          <div className="relative hidden min-h-[34rem] lg:block">
            {/* decorative center sakura */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="h-40 w-40 rounded-full bg-gradient-to-br from-sakura-100/60 to-sakura-200/40 blur-2xl" />
            </motion.div>


            {/* Card 1 — top left, large */}
            <FeatureCard
              feature={features[0]}
              className="left-0 top-0 w-[44%]"
              rotation={-2.5}
              delay={0}
            />

            {/* Card 2 — top right, medium, shifted down */}
            <FeatureCard
              feature={features[1]}
              className="right-0 top-20 w-[42%]"
              rotation={2}
              delay={0.1}
            />

            {/* Card 3 — bottom left, medium, shifted down */}
            <FeatureCard
              feature={features[2]}
              className="left-[8%] bottom-0 w-[40%]"
              rotation={1.5}
              delay={0.2}
            />

            {/* Card 4 — bottom right, large */}
            <FeatureCard
              feature={features[3]}
              className="right-0 bottom-6 w-[44%]"
              rotation={-2}
              delay={0.3}
            />

            {/* connecting petal accents */}
            <DecorativePetal className="left-[42%] top-12" size={16} delay={0.5} />
            <DecorativePetal className="right-[44%] top-1/2" size={12} delay={0.8} />
            <DecorativePetal className="left-[46%] bottom-16" size={14} delay={1.1} />
          </div>

          {/* Mobile / tablet: clean staggered stack */}
          <div className="space-y-5 lg:hidden">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-subtle rounded-2xl border border-white/60 p-6 shadow-sm transition-shadow hover:shadow-md hover:shadow-sakura-200/40"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sakura-100 to-sakura-200">
                  
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {f.title}
                  <span className="ml-2 font-jp text-sm font-normal text-muted-foreground">
                    {f.jp}
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto mt-24 max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Three steps to a perfect reply
            </h2>
            <p className="mt-2 text-muted-foreground">三つの簡単なステップ</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sakura-400 to-sakura-500 text-xl font-bold text-white shadow-lg shadow-sakura-300/50">
                  {s.n}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {s.title}
                  <span className="ml-2 font-jp text-sm font-normal text-muted-foreground">
                    {s.jp}
                  </span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-28 max-w-3xl px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl border border-white/70 p-10 text-center shadow-2xl shadow-sakura-200/40 sm:p-14"
          >
            <SakuraIcon className="mx-auto h-12 w-12" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground">
              Ready to write calmer replies?
            </h2>
            <p className="mt-3 text-muted-foreground">
              返信を書くストレスを、今日で終わりにしましょう。
            </p>
            <Link href="/assistant" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sakura-500 to-sakura-400 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-sakura-300/50"
              >
                Open Shizuka
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/50 px-6 py-8 backdrop-blur-sm">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-2">
              <SakuraIcon className="h-5 w-5" />
              <span className="font-jp text-sm font-semibold text-sakura-700">シズカ</span>
              <span className="text-sm text-muted-foreground">— AI Email Assistant</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Crafted with calm. Made for focused communication.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
