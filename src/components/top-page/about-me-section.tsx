import { useRef } from "react";
import { useInView, motion } from "motion/react";

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function AboutMeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="w-full h-screen px-8 backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        className="flex gap-16 items-center justify-center w-full max-w-[800px] text-black dark:text-white"
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="flex-shrink-0" variants={ITEM_VARIANTS}>
          <img
            src="/images/toplogo.svg"
            className="mix-blend-multiply dark:mix-blend-difference dark:invert dark:grayscale"
            loading="lazy"
            width={78}
            height={270}
            alt="Yu Ohno"
          />
        </motion.div>
        <motion.div variants={CONTAINER_VARIANTS}>
          <motion.h2
            className="text-3xl font-medium mb-6"
            variants={ITEM_VARIANTS}
          >
            大野 優 ／ Yu Ohno
          </motion.h2>
          <motion.p className="mb-6 leading-relaxed" variants={ITEM_VARIANTS}>
            本業はフロントエンドを中心としたエンジニアです。たまにSaaSのインテグレーションとかバックエンドとかデザインにも携わることがあります。ユーザーがどのような人なのか、何につまづいているのかを考えたうえで、UI/UXを提案、エンジニアリングで実現することが好きです。
          </motion.p>
          <motion.a
            href="/about"
            variants={ITEM_VARIANTS}
            className="underline underline-offset-8"
          >
            詳しく見る
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
