import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductArt from '../components/ProductArt'
export default function HomePage() {
  const navigate = useNavigate()
  return <>
    <Header />
    <main className="home-page">
      <section className="hero-section" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><i /> ACESSIBILIDADE QUE APROXIMA</div>
          <h1>Encontre seus pertences pelo <em>som.</em></h1>
          <p>Conheça o LumiTag: um conceito de localizador sonoro com quatro botões e quatro etiquetas adesivas. Grave mensagens com a sua própria voz e descubra onde estão os objetos importantes do dia a dia.</p>
          <div className="hero-actions"><button className="primary-btn" onClick={() => navigate('/login')}>Conhecer produto <span>→</span></button><span className="fiction-note">Produto conceitual • Demonstração visual</span></div>
        </div>
        <div className="hero-visual"><ProductArt /></div>
      </section>
      <section className="home-info" id="sobre">
        <div><div className="eyebrow"><i /> COMO FUNCIONA</div><h2>Quatro botões. Quatro objetos. <em>Mais autonomia.</em></h2></div>
        <p>Cada botão corresponde a uma etiqueta sonora que pode ser fixada em um pertence. Pelo aplicativo conceitual, a pessoa grava uma mensagem personalizada para cada etiqueta. Ao acionar o botão correspondente, o localizador toca o áudio gravado para ajudar a identificar e encontrar o objeto.</p>
      </section>
      <section className="home-banner" id="destaques">
        <div><div className="eyebrow">SUA VOZ • SEUS OBJETOS • SUA ROTINA</div><h2>O som que ajuda você a encontrar.</h2><p>Personalize os quatro áudios com nomes, referências e instruções que façam sentido para você. Chaves, carteira, mochila ou qualquer pertence que queira localizar.</p><button className="primary-btn" onClick={() => navigate('/produto')}>Ver LumiTag <span>→</span></button></div>
        <div className="big-watermark">4×4</div>
      </section>
      <p className="final-disclaimer"><b>AVISO:</b> A NexStore e o LumiTag são fictícios e fazem parte de um projeto demonstrativo. O hardware, aplicativo, gravação de áudio, conexão entre os dispositivos, preços, avaliações, estoque, frete e opções de compra são conceituais. Esta página não controla dispositivos reais nem realiza compras ou pagamentos verdadeiros.</p>
    </main>
    <Footer />
  </>
}
