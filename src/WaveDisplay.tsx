import type { QubitState } from './quantum'
import { getProb0, getProb1 } from './quantum'

type Props = {
  state: QubitState
}

const WIDTH = 280
const HEIGHT = 120
const PADDING = { top: 10, bottom: 10, left: 8, right: 8 }
const INNER_W = WIDTH - PADDING.left - PADDING.right
const INNER_H = HEIGHT - PADDING.top - PADDING.bottom
const MID_Y = PADDING.top + INNER_H / 2
const AMP_SCALE = INNER_H / 2 - 4
const POINTS = 200

function wavePath(A: number, phaseOffset: number): string {
  const pts: string[] = []
  for (let i = 0; i <= POINTS; i++) {
    const t = i / POINTS
    const x = PADDING.left + t * INNER_W
    const angle = t * 2 * Math.PI
    const y = MID_Y - A * AMP_SCALE * Math.sin(angle + phaseOffset)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
  }
  return pts.join(' ')
}

export default function WaveDisplay({ state }: Props) {
  const prob0 = getProb0(state)
  const prob1 = getProb1(state)
  const A = Math.sqrt(prob0)
  const B = Math.sqrt(prob1)
  const phi = Math.atan2(state.beta.im, state.beta.re)

  const alphaPath = wavePath(A, 0)
  const betaPath = wavePath(B, phi)

  return (
    <div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" style={{ display: 'block' }}>
        {/* 中心軸 */}
        <line
          x1={PADDING.left} y1={MID_Y}
          x2={WIDTH - PADDING.right} y2={MID_Y}
          stroke="#ddd" strokeWidth={1}
        />

        {/* beta波（赤） */}
        <path d={betaPath} fill="none" stroke="#e24a4a" strokeWidth={1.5} opacity={0.7} />

        {/* alpha波（青） */}
        <path d={alphaPath} fill="none" stroke="#4a90e2" strokeWidth={1.5} opacity={0.7} />
      </svg>

      <div className="wave-legend">
        <span style={{ color: '#4a90e2' }}>— alpha</span>
        <span style={{ color: '#e24a4a' }}>— beta</span>
      </div>
    </div>
  )
}
