import { GrainGradient, MeshGradient } from '@paper-design/shaders-react'

const QUALITY = { minPixelRatio: 1, maxPixelCount: 900_000 }
const METALS: Record<string, string[]> = {
  silver: ['#F4F6F8', '#BFC8D0', '#8C97A1', '#E3E8ED'],
  gold: ['#F8E7B0', '#D3AC55', '#A57828', '#F2D589'],
  platinum: ['#F7F3FB', '#D8D2E8', '#B6C5D6', '#E9DAEC'],
}
export default function Backdrop({ preset }: { preset: string }) {
  const style = { width: '100%', height: '100%' }
  if (preset === 'setlist') return <GrainGradient {...QUALITY} style={style} colorBack="#E9CF93" colors={['#F6E6B8', '#C8A04F', '#A87E33', '#FBF1D3']} shape="wave" softness={0.8} intensity={0.42} noise={0.28} speed={0.5} />
  if (preset === 'contact') return <MeshGradient {...QUALITY} style={style} colors={['#0B2A1D', '#14A672', '#F0C46C', '#1C7F5A']} distortion={1} swirl={0.8} speed={0.4} grainOverlay={0.18} />
  return <MeshGradient {...QUALITY} style={style} colors={METALS[preset]} distortion={0.85} swirl={0.45} speed={0.2} grainOverlay={0.08} />
}
