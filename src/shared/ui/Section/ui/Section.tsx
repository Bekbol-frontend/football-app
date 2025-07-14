import type { ComponentProps } from "react";
import styles from "./Section.module.scss";
import { clsx } from "@/shared/lib/clsx";

function Section({
  children,
  className = "",
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={clsx([styles.section, className])} {...props}>
      {children}
    </section>
  );
}

export default Section;
