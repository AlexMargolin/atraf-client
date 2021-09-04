export type ClassArg = string | undefined | "undefined"

export type ClassModules = Record<string, string>

export type ClassArgs =
  | ClassArg
  | ClassArg[]
  | Record<ClassArg, boolean>

export type ClassesFunc = (...classes: ClassArgs[]) => string

export type MakeClassesFunc = (modules: ClassModules) => ClassesFunc

export type MakeClassesBound = (
  modules: ClassModules,
  ...args: ClassArgs[]
) => string

export type ParseClassesFunc = (...args: ClassArgs[]) => string[]
