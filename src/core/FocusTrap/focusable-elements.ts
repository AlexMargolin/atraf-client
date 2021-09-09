export const focusableElementsSelector = [
  "embed",
  "iframe",
  "object",
  "a[href]",
  "area[href]",
  "input:not([disabled])",
  "button:not([disabled])",
  "select:not([disabled])",
  "*[contenteditable=true]",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ")
