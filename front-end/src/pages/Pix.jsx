import { Link } from 'react-router-dom'
export default function PixSurpresaPage() {
  return (
    <main className="surprise-page">
      <div className="surprise-card">
        <div className="eyebrow">NEXSTORE</div>
        <h1>Aprovado, obs: não houve cobrança</h1>
        <div>
          <div className="donkey-emoji">✅</div>
        </div>
        <p>Calma, não era um Pix de verdade</p>
        <Link className="primary-btn" to="/">Voltar para a loja →</Link>
      </div>
    </main>
  )
}
