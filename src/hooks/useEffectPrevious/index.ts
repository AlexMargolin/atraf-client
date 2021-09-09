// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type UseEffectPreviousHook = <E, T>(
  effect: (previous?: T) => void,
  value: T,
) => void
