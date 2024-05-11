"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Button from "@/components/Button";
import Link from "next/link";
import React, { useState } from "react";
import InputFieldPage from "./generate-text/page";
import URLInputForm from "@/components/URLInputForm";

function Home() {
  const [showInput, setShowInput] = useState(false);
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-5xl px-4 md:text-8xl lg:text-9xl font-extrabold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        <span className="text-purple-500">In</span>Sightify
      </motion.h1>
      <br />
      <motion.h4
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-base px-4 md:text-2xl lg:text-2xl font-medium text-neutral-700 dark:text-white max-w-8xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Your Portal to Quick Video Summaries! <br />
        <Highlight className="text-black dark:text-white">
          From URL To Summary in Seconds!
        </Highlight>
      </motion.h4>
      {showInput ? (
        <URLInputForm />
      ) : (
        <Button onClick={() => setShowInput(true)}></Button>
      )}
    </HeroHighlight>
  );
}
export default Home;
