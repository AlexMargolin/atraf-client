/**
 * Generate intersection observer threshold value
 * @param {number} steps
 */
const createThreshold = (steps: number): number | number[] => {
  if (!Number.isInteger(steps) || 0 >= steps) {
    return 0
  }

  const threshold = []
  const inc = 1 / steps

  for (let i = 0; i <= steps; i++) {
    threshold.push(i * inc)
  }

  return threshold
}

export default createThreshold
