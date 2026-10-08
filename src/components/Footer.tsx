import { Logo } from '../brand/Logo'
import { FacebookLogo } from '../brand/Social'
import { contact } from '../content'
import { scrollToHash } from '../lib/motion'

export function Footer() {
  const go = (e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); scrollToHash(e.currentTarget.getAttribute('href')!) }
  return (
    <footer className="footer">
      <div className="footer__logo"><Logo /></div>
      <div className="footer__row">
        <p>Live wedding &amp; party band · West Midlands</p>
        <nav aria-label="Footer">
          <a href="#band" onClick={go}>The band</a>
          <a href="#packages" onClick={go}>Packages</a>
          <a href="#faq" onClick={go}>FAQ</a>
          <a className="footer__fb" href={contact.facebook} target="_blank" rel="noopener"><FacebookLogo />Facebook</a>
          <a href={contact.instagram} target="_blank" rel="noopener">Instagram</a>
          <a href="#top" onClick={go}>Back to top ↑</a>
        </nav>
        <p>© {new Date().getFullYear()} The Consummates</p>
      </div>
    </footer>
  )
}
