/* eslint-disable max-lines */
import { MutableRefObject } from "react"
import Modal, { classNames, ModalHandle } from "./"
import userEvent from "@testing-library/user-event"
import { act, render, screen, waitFor } from "@testing-library/react"

/**
 * Component Root Class
 */
const rootClass = classNames.root

/**
 * Component data-testid identifier.
 */
const testID = "modal-test-id"

beforeAll(() => {
  window.HTMLElement.prototype.getAnimations = jest
    .fn()
    .mockReturnValue(["animation"])

  window.requestAnimationFrame = jest
    .fn()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .mockImplementation(() => {})
})

describe("<Modal/>", () => {
  test("should render root attributes", () => {
    render(<Modal defaultVisible data-testid={testID} />)
    expect(screen.queryByTestId(testID)).toBeInTheDocument()
  })

  test("should assign custom class name", () => {
    const customClass = "custom-modal-class"
    const className = `${rootClass} ${customClass}`

    render(
      <Modal
        defaultVisible
        data-testid={testID}
        className={customClass}
      />,
    )

    const element = screen.getByTestId(testID)
    expect(element).toHaveClass(className, { exact: true })
  })

  test("should render children", () => {
    const childTestId = "child-test-id"

    render(
      <Modal defaultVisible data-testid={testID}>
        <div data-testid={childTestId}>{childTestId}</div>
      </Modal>,
    )

    expect(screen.queryByTestId(childTestId)).toBeInTheDocument()
  })

  test("should not be in the document when not visible", () => {
    render(<Modal data-testid={testID} />)

    expect(screen.queryByTestId(testID)).not.toBeInTheDocument()
  })

  test("should close the modal when Escape is pressed", async () => {
    render(<Modal defaultVisible data-testid={testID} />)

    const element = screen.getByTestId(testID)

    userEvent.keyboard("{Escape}")
    await waitFor(() => expect(element).not.toBeInTheDocument())
  })

  test("should not close the modal when Escape is pressed and is @persistent", () => {
    render(<Modal persistent defaultVisible data-testid={testID} />)

    const element = screen.getByTestId(testID)

    userEvent.keyboard("{Escape}")
    expect(element).toBeInTheDocument()
  })

  test("should close modal when clicked outside", async () => {
    render(<Modal defaultVisible data-testid={testID} />)

    userEvent.click(document.body)
    await waitFor(() =>
      expect(screen.queryByTestId(testID)).not.toBeInTheDocument(),
    )
  })

  test("should not close modal when clicked outside and is @persistent", () => {
    render(<Modal defaultVisible persistent data-testid={testID} />)

    const element = screen.getByTestId(testID)

    userEvent.click(document.body)
    expect(element).toBeInTheDocument()
  })

  test("should not close modal when clicked inside", () => {
    const contentTestId = "modal-content-test-id"
    render(
      <Modal data-testid={testID} defaultVisible={true}>
        <div data-testid={contentTestId}>modal-content</div>
      </Modal>,
    )

    const element = screen.getByTestId(contentTestId)

    userEvent.click(element)
    expect(element).toBeInTheDocument()
  })

  test("should lock focus inside the modal (forward)", () => {
    render(
      <>
        <input type='text' data-testid='input-outside-trap' />
        <Modal defaultVisible>
          <input type='text' data-testid='input-1' />
        </Modal>
      </>,
    )

    const dialog = screen.getByRole("dialog")

    // default focus
    expect(dialog).toHaveFocus()

    userEvent.tab()
    expect(screen.queryByTestId("input-1")).toHaveFocus()

    // focus should return to the dialog
    userEvent.tab()
    expect(dialog).toHaveFocus()

    userEvent.tab()
    expect(screen.queryByTestId("input-1")).toHaveFocus()
  })

  test("should lock focus inside the modal (backwards)", () => {
    render(
      <>
        <input type='text' data-testid='input-outside-trap' />
        <Modal defaultVisible>
          <input type='text' data-testid='input-1' />
        </Modal>
      </>,
    )

    const dialog = screen.getByRole("dialog")

    // default focus
    expect(dialog).toHaveFocus()

    userEvent.tab({ shift: true })
    expect(screen.queryByTestId("input-1")).toHaveFocus()

    userEvent.tab({ shift: true })
    expect(dialog).toHaveFocus()

    userEvent.tab({ shift: true })
    expect(screen.queryByTestId("input-1")).toHaveFocus()
  })

  test("should render activator and toggle modal", async () => {
    const activatorTestId = "activator-test-id"

    render(
      <Modal
        data-testid={testID}
        __activator={<button data-testid={activatorTestId} />}
      />,
    )

    const activator = screen.getByTestId(activatorTestId)

    userEvent.click(activator)
    await waitFor(() =>
      expect(screen.queryByTestId(testID)).toBeInTheDocument(),
    )

    userEvent.click(activator)
    await waitFor(() =>
      expect(screen.queryByTestId(testID)).not.toBeInTheDocument(),
    )
  })

  test("should return focus to activator on modal close", async () => {
    const activatorTestId = "activator-test-id"

    render(
      <Modal
        data-testid={testID}
        __activator={<button data-testid={activatorTestId} />}
      />,
    )

    const activator = screen.getByTestId(activatorTestId)

    // should not be rendered initially
    expect(screen.queryByTestId(testID)).not.toBeInTheDocument()

    // should be rendered when activator is clicked
    userEvent.click(activator)
    await waitFor(() =>
      expect(screen.getByTestId(testID)).toBeInTheDocument(),
    )

    // should close the modal
    userEvent.keyboard("{Escape}")
    await waitFor(() =>
      expect(screen.queryByTestId(testID)).not.toBeInTheDocument(),
    )
    await waitFor(() => expect(activator).toHaveFocus())
  })

  test("should expose imperative handle methods", async () => {
    const ref: MutableRefObject<ModalHandle> = {
      current: null,
    }

    render(<Modal ref={ref} data-testid={testID} />)

    act(() => ref.current.open())
    await waitFor(() =>
      expect(screen.queryByTestId(testID)).toBeInTheDocument(),
    )

    act(() => ref.current.close())
    await waitFor(() =>
      expect(screen.queryByTestId(testID)).not.toBeInTheDocument(),
    )

    act(() => ref.current.toggle())
    await waitFor(() =>
      expect(screen.queryByTestId(testID)).toBeInTheDocument(),
    )

    act(() => ref.current.toggle())
    await waitFor(() =>
      expect(screen.queryByTestId(testID)).not.toBeInTheDocument(),
    )
  })

  test("should toggle body class modifier", async () => {
    const ref: MutableRefObject<ModalHandle> = {
      current: null,
    }

    render(<Modal ref={ref} data-testid={testID} />)
    expect(document.body).not.toHaveClass(classNames.active)

    act(() => ref.current.open())
    await waitFor(() =>
      expect(document.body).toHaveClass(classNames.active),
    )

    act(() => ref.current.close())
    await waitFor(() =>
      expect(document.body).not.toHaveClass(classNames.active),
    )
  })
})
