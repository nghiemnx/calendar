type LegendDotProps = {
  tone: 'solar' | 'lunar' | 'holiday'
}

export default function LegendDot({ tone }: LegendDotProps) {
  return <i className={`legend-dot ${tone}-dot`} aria-hidden="true" />
}
