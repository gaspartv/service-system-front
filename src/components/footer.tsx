export default function Footer() {
  return (
    <div className="flex flex-col gap-4">
      <p>Dúvidas?</p>
      <div className="flex flex-row">
        <div className="w-96">
          <p>Perguntas frequentes</p>
          <p>Preferências de cookies</p>
        </div>
        <div className="w-96">
          <p>Central de Ajuda</p>
          <p>Informações corporativas</p>
        </div>
        <div className="w-96">
          <p>Termos de Uso</p>
        </div>
        <div className="w-96">
          <p>Privacidade</p>
        </div>
      </div>
      <div>
        <select>
          <option>Português</option>
          <option>Inglês</option>
        </select>
      </div>
    </div>
  )
}
