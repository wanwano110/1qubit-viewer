export type Complex = {
  re: number
  im: number
}

export type QubitState = {
  alpha: Complex  // |0⟩ の振幅
  beta: Complex   // |1⟩ の振幅
}

export function getProb0(state: QubitState): number {
  return state.alpha.re ** 2 + state.alpha.im ** 2
}

export function getProb1(state: QubitState): number {
  return state.beta.re ** 2 + state.beta.im ** 2
}

function normalize(state: QubitState): QubitState {
  const norm = Math.sqrt(getProb0(state) + getProb1(state))
  return {
    alpha: { re: state.alpha.re / norm, im: state.alpha.im / norm },
    beta:  { re: state.beta.re  / norm, im: state.beta.im  / norm },
  }
}

export function Reset(): QubitState {
  return {
    alpha: { re: 1, im: 0 },
    beta:  { re: 0, im: 0 },
  }
}

export function X(state: QubitState): QubitState {
  return normalize({
    alpha: state.beta,
    beta:  state.alpha,
  })
}

export function H(state: QubitState): QubitState {
  const sqrt2 = Math.SQRT2
  return normalize({
    alpha: {
      re: (state.alpha.re + state.beta.re) / sqrt2,
      im: (state.alpha.im + state.beta.im) / sqrt2,
    },
    beta: {
      re: (state.alpha.re - state.beta.re) / sqrt2,
      im: (state.alpha.im - state.beta.im) / sqrt2,
    },
  })
}

export function Z(state: QubitState): QubitState {
  return normalize({
    alpha: state.alpha,
    beta:  { re: -state.beta.re, im: -state.beta.im },
  })
}

export function Measure(state: QubitState): QubitState {
  const rand = Math.random()
  if (rand < getProb0(state)) {
    return { alpha: { re: 1, im: 0 }, beta: { re: 0, im: 0 } }
  } else {
    return { alpha: { re: 0, im: 0 }, beta: { re: 1, im: 0 } }
  }
}
