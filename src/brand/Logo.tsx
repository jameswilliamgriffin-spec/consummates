import wordmark from './wordmark.svg'

type LogoProps = { className?: string; title?: string }

export function Logo({ className, title = 'The Consummates' }: LogoProps) {
  return (
    <svg className={className} viewBox="30 30 1707 350" role="img" aria-label={title} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <use href={`${wordmark}#wordmark`} />
    </svg>
  )
}
