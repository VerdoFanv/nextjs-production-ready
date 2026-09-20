'use client'

import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/app/lib/utils'

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

type MotionBoxProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  variant?: 'fade' | 'fadeUp' | 'scale'
  reduceMotion?: boolean
  children?: ReactNode
}

function MotionBox({
  className,
  variant = 'fadeUp',
  reduceMotion = false,
  children,
  ...props
}: MotionBoxProps) {
  const variantsMap = {
    fade: fadeIn,
    fadeUp: fadeInUp,
    scale: scaleIn,
  } as const
  const variants = variantsMap[variant]

  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function MotionStagger({
  className,
  children,
  ...props
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function MotionItem({ className, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      className={cn(className)}
      variants={fadeInUp}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  )
}

export {
  motion,
  fadeIn,
  fadeInUp,
  scaleIn,
  staggerContainer,
  MotionBox,
  MotionStagger,
  MotionItem,
}
