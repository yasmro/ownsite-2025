import { useRef } from "react";
import { useInView, motion } from "motion/react";
import { useTranslations } from "@/lib/i18n/utils";

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

export default function HeroSection() {
  const t = useTranslations("en");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="px-4 w-full h-screen flex items-center justify-center bg-transparent"
    >
      <div className="flex gap-16 items-center justify-between mx-auto max-w-[800px]">
        <motion.figure
          className="flex justify-center h-full"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img
            src="/images/kyoushindohaku2.png"
            className="mix-blend-multiply dark:mix-blend-difference dark:invert dark:grayscale"
            loading="lazy"
            width={132}
            height={437}
            alt="Kyoshindohaku"
          />
        </motion.figure>
        <motion.div
          className="flex flex-col justify-center text-black dark:text-white"
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-4xl font-medium mb-6"
            variants={ITEM_VARIANTS}
          >
            Kyoh-Shin-Doh-Haku
          </motion.h2>
          <motion.p className="mb-6 leading-relaxed" variants={ITEM_VARIANTS}>
            {t("top.hero.lead")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
