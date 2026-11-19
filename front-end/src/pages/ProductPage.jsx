import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductArt from '../components/ProductArt'
import PaymentBox from '../components/PaymentBox'
const sponsored = [
  {icon:'🔑',name:'LumiTag Extra',desc:'Etiqueta sonora adesiva adicional para outro pertence.',price:'R$ 39,90'},
  {icon:'🔋',name:'LumiCharge',desc:'Base de carregamento conceitual para o controle de quatro botões.',price:'R$ 59,90'},
  {icon:'🧷',name:'LumiFix',desc:'Kit demonstrativo de suportes e adesivos para fixar suas etiquetas.',price:'R$ 24,90'}
]
const examples = [
  {number:'1',name:'Chaves',audio:'“Suas chaves estão perto da porta.”',color:'violet'},
  {number:'2',name:'Carteira',audio:'“Sua carteira está na gaveta.”',color:'blue'},
  {number:'3',name:'Mochila',audio:'“Sua mochila está ao lado da mesa.”',color:'green'},
  {number:'4',name:'Controle remoto',audio:'“O controle está no sofá.”',color:'orange'}
]
export default function ProductPage() {
  const navigate = useNavigate()
  const [qty,setQty] = useState(1)
  const [payment,setPayment] = useState(false)
  const [cep,setCep] = useState('')
  const [shipping,setShipping] = useState('')
  const [comprando,setComprando] = useState(false)
  const [erroCompra,setErroCompra] = useState('')
  const API = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '')
  const emailLogado = sessionStorage.getItem('nexstore_usuario') || ''

  async function comprarAgora() {
    if (!emailLogado) {
      navigate('/login')
      return
    }

    setComprando(true)
    setErroCompra('')
    try {
      const resposta = await fetch(`${API}/compras`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailLogado,
          nomeProduto: 'LumiTag',
          quantidade: qty
        })
      })

      console.log("EMAIL:", emailLogado);
      console.log("PRODUTO:", 'LumiTag');
      console.log("QUANTIDADE:", qty);

      if (!resposta.ok) {
        const detalhe = await resposta.text()
        throw new Error(detalhe || 'Não foi possível registrar seu pedido.')
      }

      setPayment(true)
    } catch (e) {
      setErroCompra(e.message || 'Não foi possível conectar ao servidor.')
    } finally {
      setComprando(false)
    }
  }
  return <>
    <Header />
    <main className="shop-page">
      <div className="breadcrumbs"><button onClick={() => navigate('/')}>Início</button> / <strong>Acessibilidade</strong> / LumiTag</div>
      <div className="shop-alert"><b>PRODUTO CONCEITUAL</b> O LumiTag é uma proposta fictícia. O hardware e o aplicativo ainda não estão conectados a dispositivos reais.</div>
      <h1 className="product-heading">LumiTag — Localizador sonoro com 4 botões e 4 etiquetas (conceito)</h1>
      <div className="product-layout">
        <section className="gallery"><ProductArt /><div className="gallery-thumbs"><div className="thumb active"><ProductArt compact /></div><div className="thumb"><span className="thumb-controller">🔊</span></div><div className="thumb"><span className="thumb-controller">🏷️</span></div></div></section>
        <section className="buy-panel">
          <div className="seller-line">Vendido por <b>NexStore Concept</b> <span className="fiction-pill">VENDEDOR FICTÍCIO</span></div>
          <div className="rating">★★★★★ <span>4,9</span> <small>(128 avaliações ilustrativas)</small></div>
          <div className="panel-divider" /><div className="availability">● Disponibilidade conceitual <span>Produto demonstrativo</span></div>
          <p className="old-price">De R$ 399,90</p><div className="price-line"><div><div className="price">R$ 299,90</div><small>Preço fictício à vista</small></div><span className="discount">25% OFF</span></div>
          <p className="pix-line">ou <b>12x de R$ 24,99</b> sem juros (simulação)</p>
          <div className="panel-divider" /><h3>O que acompanha o conceito?</h3>
          <ul className="product-includes"><li><b>1 controle</b> com quatro botões identificados.</li><li><b>4 etiquetas sonoras</b> adesivas para fixar nos pertences.</li><li><b>Aplicativo conceitual</b> para gravar uma mensagem personalizada para cada etiqueta.</li></ul>
          <div className="panel-divider" /><h3>Exemplo de personalização</h3><p className="muted">Cada botão aciona a etiqueta correspondente. Os áudios abaixo são exemplos de mensagens que o próprio cliente poderia gravar.</p>
          <div className="tag-examples">{examples.map(item => <div className={`tag-example ${item.color}`} key={item.number}><span className="example-number">{item.number}</span><span><b>{item.name}</b><small>{item.audio}</small></span></div>)}</div>
          <div className="panel-divider" /><h3>Forma de pagamento</h3><p className="muted">Escolha uma opção para iniciar a demonstração.</p>
          <div className="payment-options"><button onClick={() => setPayment(true)}>▣ Cartão de crédito</button><button onClick={() => setPayment(true)}>▤ Cartão de débito</button><button onClick={() => setPayment(true)}>◇ Pix</button></div>
          <div className="qty-row"><span>Quantidade</span><div><button onClick={() => setQty(Math.max(1,qty-1))}>−</button>{qty}<button onClick={() => setQty(Math.min(5,qty+1))}>+</button></div></div>
          <button className="buy-btn" onClick={comprarAgora} disabled={comprando}>{comprando ? 'Registrando pedido...' : 'Comprar agora — demonstração'}</button>
          {erroCompra && <p className="form-error">{erroCompra}</p>}
          <div className="shipping"><b>Calcular frete demonstrativo</b><div><input value={cep} onChange={e => setCep(e.target.value.replace(/\D/g,'').slice(0,8))} placeholder="CEP fictício" /><button onClick={() => setShipping(cep.length === 8 ? 'Frete ilustrativo: R$ 19,90 • entrega em 3 a 5 dias fictícios.' : 'Digite 8 números para simular o frete.')}>Calcular</button></div>{shipping && <small className="muted">{shipping}</small>}</div>
          <p className="secure-note">🔒 Ambiente demonstrativo. Nenhum pedido, pagamento ou dado bancário real é processado.</p>
        </section>
      </div>
      <section className="sponsored"><div className="section-heading"><div><div className="eyebrow">ACESSÓRIOS CONCEITUAIS</div><h2>Você também pode gostar</h2></div><span>ITENS FICTÍCIOS</span></div><div className="sponsored-grid">{sponsored.map(item => <article className="sponsored-card" key={item.name}><div className="sponsored-art"><span className="fiction-pill">FICTÍCIO</span><span className="fake-device">{item.icon}</span></div><div className="sponsored-info"><h3>{item.name}</h3><p>{item.desc}</p><b>{item.price}</b><small>Preço demonstrativo, sem venda real</small></div></article>)}</div></section>
      <p className="final-disclaimer"><b>IMPORTANTE:</b> Esta é uma loja fictícia para demonstração. Não informe dados reais. O formulário de cartão aceita apenas nome fictício e número inventado com pelo menos 12 dígitos; esses dados ficam somente temporariamente na tela e não são enviados nem armazenados.</p>
    </main>
    <Footer />
    {payment && <PaymentBox onClose={() => setPayment(false)} />}
  </>
}
