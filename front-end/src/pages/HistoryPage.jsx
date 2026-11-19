import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const API = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '')

function formatarData(valor) {
  if (!valor) return 'Data não informada'
  const data = new Date(valor)
  return Number.isNaN(data.getTime()) ? valor : data.toLocaleString('pt-BR')
}

export default function HistoryPage() {
  const navigate = useNavigate()
  const email = sessionStorage.getItem('nexstore_usuario') || ''
  const [compras, setCompras] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!email) {
      navigate('/login', { replace: true })
      return
    }

    async function buscarHistorico() {
      try {
        const resposta = await fetch(`${API}/compras/historico?email=${encodeURIComponent(email)}`)
        if (!resposta.ok) throw new Error('Não foi possível consultar seu histórico.')
        const dados = await resposta.json()
        setCompras(Array.isArray(dados) ? dados : [])

        console.log("HISTÓRICO RECEBIDO DO BACKEND:", dados);
      } catch (e) {
        setErro(e.message || 'Erro ao carregar o histórico.')
      } finally {
        setCarregando(false)
      }
    }

    buscarHistorico()
  }, [email, navigate])

  return <>
    <Header />
    <main className="history-page">
      <button className="back-link" onClick={() => navigate('/produto')}>← Voltar para a loja</button>
      <div className="eyebrow">SUA CONTA</div>
      <h1>Histórico de compras</h1>
      <p className="history-subtitle">Pedidos demonstrativos associados a {email}.</p>

      {carregando && <p className="history-feedback">Carregando suas compras...</p>}
      {!carregando && erro && <p className="form-error">{erro}</p>}
      {!carregando && !erro && compras.length === 0 && (
        <section className="history-empty">
          <div className="history-empty-icon">🛒</div>
          <h2>Você ainda não tem compras</h2>
          <p>Quando você fizer um pedido demonstrativo, ele aparecerá aqui.</p>
          <button className="buy-btn history-shop-button" onClick={() => navigate('/produto')}>Conhecer o LumiTag</button>
        </section>
      )}
      {!carregando && !erro && compras.length > 0 && (
        <section className="history-list">
          {compras.map((compra, index) => {
            const id = compra.idCompra ?? compra.id_compra ?? compra.id ?? index
            const nome = compra.nomeProduto ?? compra.nome_produto ?? compra.produto ?? 'LumiTag'
            const quantidade = compra.quantidade ?? 1
            const data = compra.dataCompra ?? compra.data_compra ?? compra.data
            const status = compra.status ?? 'CONFIRMADO'
            return <article className="history-card" key={id}>
              <div className="history-product-icon">📦</div>
              <div className="history-order-info">
                <h2>{nome}</h2>
                <p>Pedido #{id} · Quantidade: {quantidade}</p>
                <small>{formatarData(data)}</small>
              </div>
              <span className={`history-status ${String(status).toLowerCase()}`}>{status}</span>
            </article>
          })}
        </section>
      )}
      <p className="history-disclaimer">A NexStore é uma loja fictícia. Os pedidos são registros de demonstração e não representam compras ou pagamentos reais.</p>
    </main>
    <Footer />
  </>
}
