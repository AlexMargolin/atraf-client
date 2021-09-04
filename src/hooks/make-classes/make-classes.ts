import {
  ClassArg,
  MakeClassesFunc,
  MakeClassesBound,
  ParseClassesFunc,
} from "./"

/**
 * Accepts various type of arguments and returns an array of the "truthy" ones.
 *
 * @param args
 * @return array
 */
const parseClasses: ParseClassesFunc = (...args) => {
  const classes: ClassArg[] = []

  args.forEach(value => {
    if ("string" === typeof value) {
      classes.push(value)
    } else if (value instanceof Array) {
      value.forEach(str => {
        classes.push(str)
      })
    } else if ("object" === typeof value) {
      for (const key in value) {
        if ("undefined" !== key && value[key]) {
          classes.push(key)
        }
      }
    }
  })

  return classes.filter(cls => cls && "undefined" !== cls)
}

/**
 * Accepts an optional exported CSS Modules object as its first argument and returns a new function.
 * The new function accepts "className" string | string[] | { [string]: bool } as its argument(s)
 * and includes only those with a "truthy" values.
 * if the className doesnt exist in exported modules, it will be used as is.
 *
 * @param modules
 * @return function
 */
const makeClasses: MakeClassesFunc = modules => {
  /**
   * Classes function with a bound modules argument.
   * @param modules
   * @param args
   */
  const classesFunc: MakeClassesBound = (modules, ...args) => {
    const classes = parseClasses(...args).map(
      cls => (modules && modules[cls]) || cls,
    )

    return classes.join(" ")
  }

  return classesFunc.bind(null, modules)
}

export default makeClasses
