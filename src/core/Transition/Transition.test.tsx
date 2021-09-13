import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react"
import { makeClasses } from "@/hooks"
import Transition, { classNames } from "./Transition"
import { CSSProperties, MutableRefObject } from "react"

/**
 * Component data-testid identifier.
 */
const testId = "transition-component-element"

/**
 * Component root class.
 */
const rootClass = "transition-component-class"

const classes = makeClasses(null)

beforeAll(() => {
  // Mock Element.getAnimations
  window.HTMLElement.prototype.getAnimations = jest
    .fn()
    .mockReturnValue(["animation"])
})

describe("<Transition/>", () => {
  test("should be able to assign child ref", () => {
    const refFunc = jest.fn()
    const refObj: MutableRefObject<HTMLDivElement> = {
      current: null,
    }

    // Object type Ref
    render(
      <Transition in={true}>
        <div ref={refObj}>child</div>
      </Transition>,
    )
    expect(refObj.current).not.toBeNull()

    // Function type Ref
    render(
      <Transition in={true}>
        <div ref={refFunc}>child</div>
      </Transition>,
    )
    expect(refFunc).toHaveBeenCalledTimes(1)
  })

  test("should not allow more than a single root child", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, "error").mockImplementation(() => {})

    expect(() => {
      render(
        <Transition>
          <div>child 1</div>
          <div>child 2</div>
        </Transition>,
      )
    }).toThrowError()
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalled()
  })

  test("should not render children before @in is true", () => {
    render(
      <Transition in={false}>
        <div data-testid={testId}>{testId}</div>
      </Transition>,
    )

    expect(screen.queryByText(testId)).not.toBeInTheDocument()
  })

  test("should render children when @in is true", () => {
    render(
      <Transition in={true}>
        <div data-testid={testId}>{testId}</div>
      </Transition>,
    )

    expect(screen.queryByText(testId)).toBeInTheDocument()
  })

  test("should add correct transition enter classes", async () => {
    const style: CSSProperties = {
      // as long as the value is greater than 1, the test isn't affected.
      // what determines the transition class toggle time is the transition event listener, which is triggered manually in the test
      // see classOnAnimate for implementation.
      transitionDuration: "1",
    }

    render(
      <Transition in={true}>
        <div data-testid={testId} style={style} className={rootClass}>
          child
        </div>
      </Transition>,
    )

    // initial enter classes
    expect(screen.getByTestId(testId)).toHaveClass(
      classes([
        rootClass,
        classNames.enter.active,
        classNames.enter.from,
      ]),
      {
        exact: true,
      },
    )

    // transition enter classes
    await waitFor(() =>
      expect(screen.getByTestId(testId)).toHaveClass(
        classes([
          rootClass,
          classNames.enter.active,
          classNames.enter.to,
        ]),
        {
          exact: true,
        },
      ),
    )

    // should remove all transition enter classes on transition end
    fireEvent.transitionEnd(screen.getByTestId(testId))

    // should remove transition classes
    expect(screen.getByTestId(testId)).toHaveClass(rootClass, {
      exact: true,
    })
  })

  test("should add correct transition leave classes", async () => {
    const style: CSSProperties = {
      // as long as the value is greater than 1, the test isn't affected.
      // what determines the transition class toggle time is the transition event listener, which is triggered manually in the test
      // see classOnAnimate for implementation.
      transitionDuration: "1",
    }

    const Child = (
      <div data-testid={testId} style={style} className={rootClass}>
        child
      </div>
    )

    // initial render
    const { rerender } = render(
      <Transition in={true}>{Child}</Transition>,
    )

    await new Promise(resolve => setTimeout(resolve, 100))
    // should remove all transition enter classes on transition end
    fireEvent.transitionEnd(screen.getByTestId(testId))

    // make sure all enter classes were removed
    await waitFor(() =>
      expect(screen.getByTestId(testId)).toHaveClass(rootClass, {
        exact: true,
      }),
    )

    // re-render with false @in prop
    rerender(<Transition in={false}>{Child}</Transition>)

    expect(screen.getByTestId(testId)).toHaveClass(
      classes([
        rootClass,
        classNames.leave.active,
        classNames.leave.from,
      ]),
      {
        exact: true,
      },
    )

    await waitFor(() =>
      expect(screen.getByTestId(testId)).toHaveClass(
        classes([
          rootClass,
          classNames.leave.active,
          classNames.leave.to,
        ]),
        {
          exact: true,
        },
      ),
    )

    // should remove the element from the DOM
    fireEvent.transitionEnd(screen.getByTestId(testId))
    expect(screen.queryByTestId(testId)).not.toBeInTheDocument()
  })
})
