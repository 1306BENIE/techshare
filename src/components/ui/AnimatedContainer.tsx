import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
}

type AnimatedFormProps = HTMLMotionProps<"form"> & {
  children: ReactNode;
  className?: string;
};

type AnimatedButtonProps = HTMLMotionProps<"button"> & {
  children: ReactNode;
  className?: string;
};

export function AnimatedContainer({
  children,
  className = "",
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedForm({
  children,
  className = "",
  ...props
}: AnimatedFormProps) {
  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.form>
  );
}

export function AnimatedInput({
  children,
  className = "",
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedButton({
  children,
  className = "",
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
