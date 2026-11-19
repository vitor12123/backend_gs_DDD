import { useEffect, useState } from 'react'

export default function PaymentBox({ onClose }) {
  const [method, setMethod] = useState('')
  const [holder, setHolder] = useState('')
  const [number, setNumber] = useState('')
  const [message, setMessage] = useState('')
  const [approved, setApproved] = useState(false)
  const [pixUrl, setPixUrl] = useState('')
  useEffect(() => {
    if (method === 'pix') setPixUrl(`${window.location.origin}/pix-surpresa`)
  }, [method])
  function confirmCard(e) {
    e.preventDefault()
    if (!holder.trim()) { setMessage('Informe o nome do titular.'); return }
    if (number.replace(/\D/g, '').length < 12) { setMessage('O número precisa ter pelo menos 12 dígitos.'); return }
    setApproved(true)
    setMessage('Simulação aprovada! Nenhum pagamento real foi realizado.')
    setHolder('')
    setNumber('')
  }
  const digits = number.replace(/\D/g, '')
  return (
    <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <section className="payment-modal">
        <button className="modal-close" onClick={onClose} aria-label="Fechar">×</button>
        <div className="eyebrow">FINALIZAR COMPRA DEMONSTRATIVA</div>
        <h2>Escolha a forma de pagamento</h2>
        <div className="payment-options">
          <button className={method === 'credit' ? 'selected' : ''} onClick={() => {setMethod('credit');setMessage('');setApproved(false)}}><i className="radio-dot"/> Cartão de crédito</button>
          <button className={method === 'debit' ? 'selected' : ''} onClick={() => {setMethod('debit');setMessage('');setApproved(false)}}><i className="radio-dot"/> Cartão de débito</button>
          <button className={method === 'pix' ? 'selected' : ''} onClick={() => {setMethod('pix');setMessage('');setApproved(false)}}><i className="radio-dot"/> Pix</button>
        </div>
        {(method === 'credit' || method === 'debit') && !approved && (
          <form className="card-form" onSubmit={confirmCard}>
            <div className="card-warning"><b>Use somente dados inventados.</b> Nunca informe dados de cartões reais. Esta loja é fictícia e não processa pagamentos.</div>
            <label>Nome do titular<input value={holder} onChange={e => setHolder(e.target.value)} placeholder="NOME FICTÍCIO" /></label>
            <label>Número do cartão<input inputMode="numeric" value={number} onChange={e => setNumber(e.target.value.replace(/\D/g, '').slice(0, 19))} placeholder="Somente números" /></label>
            <small className="muted">{digits.length}/12 dígitos mínimos</small>
            <button className="buy-btn" type="submit">Confirmar simulação</button>
          </form>
        )}
        {method === 'pix' && (
          <div className="pix-demo">
            <div className="card-warning"><b>ATENÇÃO!</b> Use a câmera normal do celular para escanear o QR Code. Não utilize o aplicativo do banco! Este QR Code abre uma página-surpresa e não realiza pagamento.</div>
            <img className="qr-image" alt="QR Code para abrir a página surpresa da NexStore" src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=12&data=${encodeURIComponent(pixUrl)}`} />
            <p>Escaneie com a câmera do celular para abrir a surpresa.</p>
            <a href="/pix" target="_blank" rel="noreferrer">Testar página de pix neste dispositivo ↗</a>
          </div>
        )}
        {message && <p className={approved ? 'success-message' : 'form-error'}>{message}</p>}
        <p className="auth-disclaimer">Simulação fictícia. Não há cobrança, transação bancária ou armazenamento de dados de cartão.</p>
      </section>
    </div>
  )
}
