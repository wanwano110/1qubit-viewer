import type { QubitState } from './quantum'
import { getProb0 } from './quantum'

type Props = {
  state: QubitState
}

const SIZE = 200
const CENTER = SIZE / 2
const R = 80

export default function BlochSphere({ state }: Props) {
  const prob0 = getProb0(state)

  const theta = 2 * Math.acos(Math.sqrt(Math.min(1, Math.max(0, prob0))))
  const phi = Math.atan2(state.beta.im, state.beta.re)

  const x = Math.sin(theta) * Math.cos(phi)
  const y = Math.cos(theta)
  const z = Math.sin(theta) * Math.sin(phi)

  const svgX = CENTER + R * x
  const svgY = CENTER - R * y

  // 赤道楕円: z軸方向の奥行きを表現するため縦を潰す
  const equatorRx = R
  const equatorRy = R * 0.3

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" style={{ display: 'block', maxWidth: SIZE }}>
      {/* 球の外枠 */}
      <circle cx={CENTER} cy={CENTER} r={R} fill="none" stroke="#aaa" strokeWidth={1.5} />

      {/* 赤道楕円 */}
      <ellipse
        cx={CENTER} cy={CENTER}
        rx={equatorRx} ry={equatorRy}
        fill="none" stroke="#aaa" strokeWidth={1} strokeDasharray="4 3"
      />

      {/* 垂直軸（北極〜南極） */}
      <line x1={CENTER} y1={CENTER - R} x2={CENTER} y2={CENTER + R} stroke="#ddd" strokeWidth={1} />

      {/* 北極ラベル |0⟩ */}
      <text x={CENTER} y={CENTER - R - 6} textAnchor="middle" fontSize={12} fill="#555">|0⟩</text>

      {/* 南極ラベル |1⟩ */}
      <text x={CENTER} y={CENTER + R + 16} textAnchor="middle" fontSize={12} fill="#555">|1⟩</text>

      {/* 状態ベクトル（矢印の軸） */}
      <line
        x1={CENTER} y1={CENTER}
        x2={svgX} y2={svgY}
        stroke="#4a90e2" strokeWidth={2}
      />

      {/* 矢印の先端（arrowhead） */}
      <circle cx={svgX} cy={svgY} r={4} fill="#4a90e2" />

      {/* z成分の参考線（点線） */}
      {Math.abs(z) > 0.01 && (
        <line
          x1={svgX} y1={svgY}
          x2={CENTER + R * x} y2={CENTER}
          stroke="#4a90e2" strokeWidth={1} strokeDasharray="3 3" opacity={0.4}
        />
      )}
    </svg>
  )
}
