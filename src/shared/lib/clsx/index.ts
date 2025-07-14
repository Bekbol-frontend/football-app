export type CLSX_MODS = Record<string, boolean>;

export function clsx(classNames: string[], mods: CLSX_MODS = {}): string {
  return [
    ...classNames,
    ...Object.entries(mods)
      .filter(([_, val]) => Boolean(val))
      .map(([key]) => key),
  ]
    .join(" ")
    .trim();
}
