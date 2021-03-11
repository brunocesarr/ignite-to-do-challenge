import '../styles/header.scss'

export function Header(): JSX.Element {
  return (
    <header className="header">
      <div>
        <img src="/logo.svg" alt="to.do"/>
      </div>
    </header>
  )
}