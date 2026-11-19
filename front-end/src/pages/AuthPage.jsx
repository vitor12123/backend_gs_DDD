
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AuthPage({ initialMode = 'login' }) {
  const location = useLocation()
  const navigate = useNavigate()

  const [mode, setMode] = useState(
    location.pathname === '/signin' ? 'signup' : initialMode
  )

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cpf, setCpf] = useState('')
  const [cep, setCep] = useState('')
  const [error, setError] = useState('')

  const API = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '')

  const [contador, setContador] = useState(0)
  const [bloqueado, setBloqueado] = useState(false)

  function submit(e) {
    e.preventDefault()

    if (!username.trim() || !password.trim()) {
      setError('Preencha o nome de usuário e a senha.')
      return
    }

    if (mode === 'signup') {
      if (!cpf.trim() || !cep.trim()) {
        setError('Preencha o CPF e o CEP.')
        return
      }

      if (cpf.length !== 11) {
        setError('O CPF deve conter 11 números.')
        return
      }

      if (cep.length !== 8) {
        setError('O CEP deve conter 8 números.')
        return
      }
    }

    if (bloqueado) {
      setError('Aguarde o desbloqueio para tentar novamente.')
      return
    }

    verificarLogin()
  }

  async function verificarLogin() {
    const rota = mode === 'signup' ? '/cadastro' : '/verificarLogin'

    const dados = {
      email: username,
      senha: password
    }

    if (mode === 'signup') {
      dados.cpf = cpf
      dados.cep = cep
    }

    try {
      const resposta = await fetch(`${API}${rota}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      })

      if (!resposta.ok) {
        setError('Erro ao consultar o servidor.')
        return
      }

      const resultado = await resposta.json()

      if (resultado === true) {
        if (mode === 'signup') {
          setError('Cadastro realizado com sucesso!')
          setMode('login')
          setCpf('')
          setCep('')
        } else {
          sessionStorage.setItem('nexstore_usuario', username.trim())
          window.dispatchEvent(new Event('nexstore-auth-change'))
          navigate('/produto')
        }
      } else {
        const novasTentativas = contador + 1

        setContador(novasTentativas)
        setError('Usuário ou senha incorretos.')

        if (novasTentativas >= 3) {
          setBloqueado(true)
          setError('Limite de tentativas atingido. Aguarde 5 minutos.')

          setTimeout(() => {
            setContador(0)
            setBloqueado(false)
            setError('')
          }, 300000)
        }
      }
    } catch (error) {
      setError('Não foi possível conectar ao servidor.')
    }
  }

  return (
    <>
      <Header />

      <main className="auth-wrap">
        <section className="auth-card">

          <button
            className="back-link"
            onClick={() => navigate('/')}
          >
            ← Voltar para a NexStore
          </button>

          <div className="auth-logo brand">
            <span className="brand-mark">N</span>
            <span>NEX<span>STORE</span></span>
          </div>

          <div className="eyebrow">
            {mode === 'login' ? 'BEM-VINDO DE VOLTA' : 'CRIE SUA CONTA'}
          </div>

          <h1>
            {mode === 'login' ? 'Entre na sua conta' : 'Faça seu cadastro'}
          </h1>

          <p className="auth-sub">
            Acesso demonstrativo para navegar pela loja fictícia.
          </p>

          {mode === 'signup' && (
            <div className="auth-disclaimer">
              <strong>⚠ Atenção: projeto demonstrativo!</strong>
              <p>
                Utilize somente dados fictícios. Não informe seu CPF,
                CEP, senha ou qualquer informação pessoal verdadeira.
              </p>
            </div>
          )}

          <form onSubmit={submit}>

            <label>
              Nome de usuário
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Seu usuário"
                autoComplete="off"
              />
            </label>

            <label>
              Senha
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Sua senha"
                autoComplete="new-password"
              />
            </label>

            {mode === 'signup' && (
              <>
                <label>
                  CPF (somente números)
                  <input
                        type="text"
                        value={cpf}
                        onChange={e => setCpf(e.target.value.replace(/\D/g, '').slice(0, 11))}
                    />
                </label>

                <label>
                  CEP (somente números)
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cep}
                    onChange={e =>
                      setCep(e.target.value.replace(/\D/g, '').slice(0, 8))
                    }
                    placeholder="00000000"
                    maxLength={8}
                    autoComplete="off"
                  />
                </label>
              </>
            )}

            {error && <p className="form-error">{error}</p>}

            {bloqueado && (
              <div className="limite-tentativas">
                Limite de tentativas atingido!
                Tente novamente mais tarde.
              </div>
            )}

            <button
              className="primary-btn full-btn"
              type="submit"
              disabled={bloqueado}
            >
              {mode === 'login' ? 'Entrar' : 'Criar conta'}
              <span>→</span>
            </button>

          </form>

          <p className="auth-switch">
            {mode === 'login' ? 'Não tem conta? ' : 'Já tem uma conta? '}

            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setError('')
              }}
            >
              {mode === 'login' ? 'Cadastre-se' : 'Faça login'}
            </button>
          </p>

          <p className="auth-disclaimer">
            A NexStore é fictícia. Utilize exclusivamente dados inventados
            para realizar os testes. Os dados preenchidos são enviados
            ao servidor demonstrativo do projeto.
          </p>

        </section>
      </main>

      <Footer />
    </>
  )
}
