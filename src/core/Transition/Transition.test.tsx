import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { makeClasses } from "@/hooks";
import Transition, { classNames } from "./Transition";
import { CSSProperties, MutableRefObject } from "react";

/**
 * Component data-testid identifier.
 */
const testId = "transition-component-element";

/**
 * Component root class.
 */
const rootClass = "transition-component-class";

const classes = makeClasses(null);

beforeAll(() => {
  // Mock Element.getAnimations
  window.HTMLElement.prototype.getAnimations = jest
    .fn()
    .mockReturnValue(["animation"]);
});

describe("<Transition/>", () => {
  test("should be able to assign child ref", () => {
    const refFunc = jest.fn();
    const refObj: MutableRefObject<HTMLDivElement> = {
      current: null,
    };

    // Object type Ref
    render(
      <Transition in={true}>
        <div ref={refObj}>child</div>
      </Transition>,
    );
    expect(refObj.current).not.toBeNull();

    // Function type Ref
    render(
      <Transition in={true}>
        <div ref={refFunc}>child</div>
      </Transition>,
    );
    expect(refFunc).toHaveBeenCalledTimes(1);
  });

  test("should not allow more than a single root child", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(
        <Transition>
          <div>child 1</div>
          <div>child 2</div>
        </Transition>,
      );
    }).toThrowError();
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalled();
  });

  test("should not render children before @in is true", () => {
    render(
      <Transition in={false}>
        <div data-testid={testId}>{testId}</div>
      </Transition>,
    );

    expect(screen.queryByText(testId)).not.toBeInTheDocument();
  });

  test("should render children when @in is true", () => {
    render(
      <Transition in={true}>
        <div data-testid={testId}>{testId}</div>
      </Transition>,
    );

    expect(screen.queryByText(testId)).toBeInTheDocument();
  });
});
