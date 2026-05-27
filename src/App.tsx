import { useState } from 'react'
import type { QubitState } from './quantum'
import { Reset, X, H, Z, Measure, getProb0, getProb1 } from './quantum'
import BlochSphere from './BlochSphere'
import WaveDisplay from './WaveDisplay'

function fmt(n: number): string {
  return n.toFixed(4)
}

function App() {
  const [state, setState] = useState<QubitState>(Reset())

  const prob0 = getProb0(state)
  const prob1 = getProb1(state)

  return (
    <div style={{ fontFamily: 'monospace', padding: '2rem', maxWidth: '480px' }}>
      <h1 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>1Qubit State Viewer</h1>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <button onClick={() => setState(s => X(s))}>X</button>
        <button onClick={() => setState(s => H(s))}>H</button>
        <button onClick={() => setState(s => Z(s))}>Z</button>
        <button onClick={() => setState(s => Measure(s))}>Measure</button>
        <button onClick={() => setState(Reset())}>Reset</button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <BlochSphere state={state} />
        <WaveDisplay state={state} />
      </div>

      <section style={{ marginBottom: '1.5rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <span>|0⟩ : {(prob0 * 100).toFixed(1)}%</span>
          <div style={{ background: '#ddd', height: '12px', borderRadius: '4px', marginTop: '4px' }}>
            <div style={{ background: '#4a90e2', height: '100%', width: `${prob0 * 100}%`, borderRadius: '4px', transition: 'width 0.2s' }} />
          </div>
        </div>
        <div>
          <span>|1⟩ : {(prob1 * 100).toFixed(1)}%</span>
          <div style={{ background: '#ddd', height: '12px', borderRadius: '4px', marginTop: '4px' }}>
            <div style={{ background: '#e24a4a', height: '100%', width: `${prob1 * 100}%`, borderRadius: '4px', transition: 'width 0.2s' }} />
          </div>
        </div>
      </section>

      <section style={{ fontSize: '0.85rem', lineHeight: '1.8' }}>
        <div>alpha: re={fmt(state.alpha.re)}  im={fmt(state.alpha.im)}</div>
        <div>beta:  re={fmt(state.beta.re)}  im={fmt(state.beta.im)}</div>
      </section>
    </div>
  )
}

export default App
