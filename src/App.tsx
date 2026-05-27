import { useState } from 'react'
import type { QubitState } from './quantum'
import { Reset, X, H, Z, Measure, getProb0, getProb1 } from './quantum'
import BlochSphere from './BlochSphere'
import WaveDisplay from './WaveDisplay'
import './App.css'

function fmt(n: number): string {
  return n.toFixed(4)
}

function App() {
  const [state, setState] = useState<QubitState>(Reset())

  const prob0 = getProb0(state)
  const prob1 = getProb1(state)

  return (
    <div className="app">
      <h1>1Qubit State Viewer</h1>

      <div className="gate-buttons">
        <button onClick={() => setState(s => X(s))}>X</button>
        <button onClick={() => setState(s => H(s))}>H</button>
        <button onClick={() => setState(s => Z(s))}>Z</button>
        <button onClick={() => setState(s => Measure(s))}>Measure</button>
        <button onClick={() => setState(Reset())}>Reset</button>
      </div>

      <div className="viewer">
        <BlochSphere state={state} />
        <WaveDisplay state={state} />
      </div>

      <div className="prob-bars">
        <div className="prob-bar-row">
          <span>|0⟩ : {(prob0 * 100).toFixed(1)}%</span>
          <div className="prob-bar-track">
            <div className="prob-bar-fill-0" style={{ width: `${prob0 * 100}%` }} />
          </div>
        </div>
        <div className="prob-bar-row">
          <span>|1⟩ : {(prob1 * 100).toFixed(1)}%</span>
          <div className="prob-bar-track">
            <div className="prob-bar-fill-1" style={{ width: `${prob1 * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="state-values">
        <div>alpha: re={fmt(state.alpha.re)}  im={fmt(state.alpha.im)}</div>
        <div>beta:  re={fmt(state.beta.re)}  im={fmt(state.beta.im)}</div>
      </div>
    </div>
  )
}

export default App
