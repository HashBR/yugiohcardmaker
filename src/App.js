import React, { useEffect, useState, useRef } from "react"
import CardList from './CardList';
import {v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY = 'cardApp.cards'

function App() {
  const [cards, setCards] = useState([])
  const cardNameRef = useRef([])
  const cardDescRef = useRef([])
  const cardAtkRef = useRef([])
  const cardDefRef = useRef([])

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedCards)
      setCards(storedCards)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards))
  }, [cards])

  function handleAddCard(e) {
    const name = cardNameRef.current.value
    const desc = cardDescRef.current.value
    const atk = cardAtkRef.current.value
    const def = cardDefRef.current.value

    if (name === '')
      return
    setCards(prevCards => {
      return [...prevCards, { id: uuidv4(), name: name, desc: desc, atk: atk, def: def}]
    })
    // Aqui eh o que volta depois que eu mando
    cardNameRef.current.value = null
    cardDescRef.current.value = null
    cardAtkRef.current.value = null
    cardDefRef.current.value = null
  }

  function handleClearCard(e) {
    const newCards = cards.filter(card => !card)
    setCards(newCards)
  }

  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
  })()

  return (
    <div className="container">
      <form className="needs-validation" noValidate>
        <div className="row g-2" >
          <div className="col-md-6 mb-3" >
            <label className="form-label" htmlFor="card-input">Nome da Carta</label>
            <input type="text" className="form-control" id="card-input" placeholder="Rei Caveira" required ref={cardNameRef} />
            <div className="invalid-feedback">
              Preencha o nome da carta.
            </div>
          </div>
          <div className="col-md-6 mb-3" >
            <label className="form-label" htmlFor="desc-input">Descrição</label>
            <input type="text" className="form-control" id="desc-input" placeholder="Spooky Scary Skeleton" required ref={cardDescRef}/>
            <div className="invalid-feedback">
              Escreva a descrição.
            </div>
          </div>
        </div>

        <div className="row g-2">
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="atk-input">Ataque</label>
            <input type="number" className="form-control" id="atk-input" placeholder="2500" required ref={cardAtkRef}  />
            <div className="invalid-feedback">
              Tem que ser número.
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="def-input">Defesa</label>
            <input type="number" className="form-control" id="def-input" placeholder="1250" required ref={cardDefRef}/>
            <div className="invalid-feedback">
              Tem que ser número.
            </div>
          </div>
        </div>
        <button className="btn btn-primary" type="submit" onClick={handleAddCard}>Salvar</button>
        <button className="btn btn-secondary" onClick={handleClearCard}>Limpar</button>
        <div className="row">
          <div className="col-md-6 mb-3">
            <CardList cards={cards}  />
          </div>
        </div>
      </form>    
    </div>
  );
}

export default App;
