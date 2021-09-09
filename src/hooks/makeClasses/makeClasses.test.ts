import { makeClasses } from "@/hooks"

describe("makeClasses (without provided modules)", () => {
  const classes = makeClasses(null)

  test("should generate className from string arguments", () => {
    const className = classes("class-1", "class-2", "class-3")
    expect(className).toBe("class-1 class-2 class-3")
  })

  test("should generate className from an object", () => {
    const className = classes(
      {
        "class-1": true,
        "class-2": true,
      },
      "class-3",
    )
    expect(className).toBe("class-1 class-2 class-3")
  })

  test("should skip classNames with falsy object values", () => {
    const className = classes({
      "class-1": true,
      "class-2": false,
      "class-3": undefined,
      "class-4": null,
    })
    expect(className).toBe("class-1")
  })

  test("should skip classNames with undefined object keys", () => {
    const undefinedKey: string = undefined
    const undefinedKeyStr = "undefined"

    const classesStr = classes({
      "class-1": true,
      [undefinedKey]: true,
      [undefinedKeyStr]: true,
    })
    expect(classesStr).toBe("class-1")
  })
})

describe("makeClasses (with provided modules)", () => {
  const classes = makeClasses({
    "class-1": "class-1-module",
    "class-2": "class-2-module",
    "class-3": "class-3-module",
  })

  test("should generate className from cssModules if present", () => {
    const classesStr = classes("class-1", ["class-2"], {
      "class-3": true,
      "class-without-module": true,
    })

    expect(classesStr).toBe(
      "class-1-module class-2-module class-3-module class-without-module",
    )
  })
})
