export default function ProductArt({ compact = false }) {
  const tags = [
    { number: '1', label: 'CHAVES', color: 'violet' },
    { number: '2', label: 'CARTEIRA', color: 'blue' },
    { number: '3', label: 'MOCHILA', color: 'green' },
    { number: '4', label: 'CONTROLE', color: 'orange' },
  ]
  return (
    <div className={`product-art finder-art ${compact ? 'small-art' : ''}`} aria-label="Conceito do localizador LumiTag com controle de quatro botões e quatro etiquetas sonoras">
      <div className="art-glow" /><div className="art-orbit" /><div className="art-orbit orbit-two" />
      <div className="finder-device">
        <div className="finder-brand">LUMI<span>TAG</span></div>
        <div className="finder-caption">LOCALIZADOR SONORO</div>
        <div className="finder-buttons">
          {tags.map(tag => <div className={`finder-button ${tag.color}`} key={tag.number}><b>{tag.number}</b>{!compact && <small>{tag.label}</small>}</div>)}
        </div>
        <div className="finder-device-footer">4 BOTÕES • 4 LOCALIZADORES</div>
      </div>
      {!compact && <div className="tag-display">{tags.map(tag => <div className={`tag-chip ${tag.color}`} key={tag.number}><span className="tag-dot" /><span><b>TAG {tag.number}</b><small>{tag.label}</small></span><span className="sound-mark">)))</span></div>)}</div>}
      {!compact && <div className="fiction-stamp">PRODUTO CONCEITUAL</div>}
    </div>
  )
}
