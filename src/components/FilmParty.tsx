import { DotOrbit, GodRays } from '@paper-design/shaders-react'

// Loaded only for the final part of the scroll film, when the dress becomes light.
export default function FilmParty() {
  return (
    <>
      <GodRays
        minPixelRatio={1} maxPixelCount={1_400_000}
        className="film__party-layer"
        colorBack="#2F473A" colorBloom="#E6C98A"
        colors={['#C8A86BCC', '#F6F1E999', '#E8A9A0AA', '#9FD3B566']}
        density={0.42} spotty={0.25} midSize={0.12} midIntensity={0.2}
        intensity={0.65} bloom={0.5} offsetY={-0.95} scale={1.2} speed={0.9}
      />
      <DotOrbit
        minPixelRatio={1} maxPixelCount={2_400_000}
        className="film__party-layer film__party-layer--glitter"
        colorBack="#00000000"
        colors={['#F6F1E9', '#E6C98A', '#C8A86B', '#F3D9C9']}
        size={0.55} sizeRange={0.85} spreading={1} stepsPerColor={2}
        scale={0.95} speed={1.6}
      />
    </>
  )
}
