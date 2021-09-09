import FocusTrap from "./FocusTrap"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"

const testId = "focus-trap-component"

describe("<FocusTrap />", () => {
  test("should render root attributes", () => {
    render(<FocusTrap data-testid={testId} />)

    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  test("should render children", () => {
    render(
      <FocusTrap>
        <div data-testid={testId} />
      </FocusTrap>,
    )

    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  test("should render additional class name", () => {
    render(<FocusTrap data-testid={testId} className='test-class' />)
    expect(screen.getByTestId(testId)).toHaveClass("test-class")
  })

  test("should trap focus (root not included)", () => {
    render(
      <>
        <FocusTrap>
          <input type='text' data-testid='input-1' />
          <input type='text' data-testid='input-2' />
        </FocusTrap>
        <input type='text' data-testid='input-3' />
      </>,
    )

    const firstElement = screen.getByTestId("input-1")
    const secondElement = screen.getByTestId("input-2")

    userEvent.tab()
    expect(firstElement).toHaveFocus()

    userEvent.tab()
    expect(secondElement).toHaveFocus()

    userEvent.tab()
    expect(firstElement).toHaveFocus()
  })

  test("should trap focus (including root element)", () => {
    render(
      <>
        <FocusTrap includeSelf data-testid='root-element'>
          <input type='text' data-testid='input-1' />
          <input type='text' data-testid='input-2' />
        </FocusTrap>
        <input type='text' data-testid='input-3' />
      </>,
    )

    const rootElement = screen.getByTestId("root-element")
    const firstElement = screen.getByTestId("input-1")
    const secondElement = screen.getByTestId("input-2")

    expect(rootElement).toHaveAttribute("tabindex", "0")

    userEvent.tab()
    expect(rootElement).toHaveFocus()

    userEvent.tab()
    expect(firstElement).toHaveFocus()

    userEvent.tab()
    expect(secondElement).toHaveFocus()

    userEvent.tab()
    expect(rootElement).toHaveFocus()

    userEvent.tab()
    expect(firstElement).toHaveFocus()
  })

  test("should trap focus while moving backwards", () => {
    render(
      <>
        <FocusTrap data-testid='root-element'>
          <input type='text' data-testid='input-1' />
          <input type='text' data-testid='input-2' />
        </FocusTrap>
        <input type='text' data-testid='input-3' />
      </>,
    )

    const firstElement = screen.getByTestId("input-1")
    const secondElement = screen.getByTestId("input-2")
    const thirdElement = screen.getByTestId("input-3")

    // not trapped yet
    userEvent.tab({ shift: true })
    expect(thirdElement).toHaveFocus()

    // trapped
    userEvent.tab({ shift: true })
    expect(secondElement).toHaveFocus()

    userEvent.tab({ shift: true })
    expect(firstElement).toHaveFocus()

    userEvent.tab({ shift: true })
    expect(secondElement).toHaveFocus()
  })

  test("should trap focus while moving backwards (root included)", () => {
    render(
      <>
        <FocusTrap includeSelf data-testid='root-element'>
          <input type='text' data-testid='input-1' />
          <input type='text' data-testid='input-2' />
        </FocusTrap>
        <input type='text' data-testid='input-3' />
      </>,
    )

    const rootElement = screen.getByTestId("root-element")
    const firstElement = screen.getByTestId("input-1")
    const secondElement = screen.getByTestId("input-2")
    const thirdElement = screen.getByTestId("input-3")

    userEvent.tab({ shift: true })
    expect(thirdElement).toHaveFocus()

    // trapped
    userEvent.tab({ shift: true })
    expect(secondElement).toHaveFocus()

    userEvent.tab({ shift: true })
    expect(firstElement).toHaveFocus()

    userEvent.tab({ shift: true })
    expect(rootElement).toHaveFocus()

    userEvent.tab({ shift: true })
    expect(secondElement).toHaveFocus()
  })

  test("should not focus on disabled fields", () => {
    render(
      <FocusTrap>
        <input type='text' disabled data-testid='input-1' />
        <input type='text' data-testid='input-2' />
      </FocusTrap>,
    )

    const secondElement = screen.getByTestId("input-2")

    userEvent.tab()
    expect(secondElement).toHaveFocus()
  })
})
