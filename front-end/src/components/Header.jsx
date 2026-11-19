import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AUTH_KEY = 'nexstore_usuario'

export default function Header() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(() => sessionStorage.getItem(AUTH_KEY) || '')

  useEffect(() => {
    const atualizar = () => setUsuario(sessionStorage.getItem(AUTH_KEY) || '')
    window.addEventListener('nexstore-auth-change', atualizar)
    window.addEventListener('storage', atualizar)
    return () => {
      window.removeEventListener('nexstore-auth-change', atualizar)
      window.removeEventListener('storage', atualizar)
    }
  }, [])

  return (
    <header className="header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="NexStore início">
          <span className="brand-mark">N</span><span>NEX<span>STORE</span></span>
        </Link>
        <nav><a href="/#inicio">Início</a><a href="/#sobre">Como funciona</a><a href="/#destaques">Personalização</a></nav>
        <div className="header-actions">
          {usuario ? (
            <button className="cart-button" onClick={() => navigate('/historico')} aria-label="Abrir histórico de compras" title="Histórico de compras">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h2l2.1 11.1a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 8H6"/><circle cx="10" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>
            </button>
          ) : (
            <button className="login-button" onClick={() => navigate('/login')}>Entrar <span>↗</span></button>
          )}
        </div>
      </div>
    </header>
  )
}
