import React, { useEffect, useState, useRef } from "react"
import CardList from './CardList';
import {v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY = 'cardApp.cards'

function App() {
  const [cards, setCards] = useState([])

  const  [name, setName] = useState("");
  const  [desc, setDesc] = useState("");
  const  [atk, setAtk] = useState("");
  const  [def, setDef] = useState("");

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedCards)
      setCards(storedCards)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards))
  }, [cards])

  function handleAddCard(e) {
    e.preventDefault()
    if (!name || !desc || !atk || !def){
      alert(`Faltou algum campo obrigatório.`)
    }
    else{
      clearForm()
      alert(`Eita porra! É o ${name} ${desc}! Ele tem ${atk}/${def}`);
    }

    setCards(prevCards => {
      return [...prevCards, { id: uuidv4(), name: name, desc: desc, atk: atk, def: def}]
    })
  }

  function clearForm() {
    setName("")
    setDesc("")
    setAtk("")
    setDef("")
  }

  function handleClearCard(e) {
    const newCards = cards.filter(card => !card);
    e.preventDefault();
    setCards(newCards)
    alert("Limpado.")
  }
  
  return (
    <div className="card align-middle">
      <div className="card-body">
        <div className="container">
          <form onSubmit={handleAddCard}>
            <div className="row g-2" >
              <div className="col-md-6 mb-3" >
                <label className="form-label" htmlFor="card-input">Nome da Carta</label>
                <input type="text" className="form-control" id="card-input" placeholder="Rei Caveira" onChange={(e) => setName(e.target.value)} value={name}/>
              </div>
              <div className="col-md-12 mb-12" >
                <label className="form-label" htmlFor="desc-input">Descrição</label>
                <textarea type="text" className="form-control" id="desc-input" placeholder="Spooky Scary Skeleton" onChange={(e) => setDesc(e.target.value)} value={desc} />
              </div>
            </div>

            <div className="row g-2">
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="atk-input">Ataque</label>
                <input type="number" className="form-control" id="atk-input" placeholder="2500" onChange={(e) => setAtk(e.target.value)} value={atk} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="def-input">Defesa</label>
                <input type="number" className="form-control" id="def-input" placeholder="1250" onChange={(e) => setDef(e.target.value)} value={def} />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">Salvar</button>
            <button className="btn btn-secondary" onClick={handleClearCard}>Limpar</button>
            <div className="row">
              <div className="col-md-6 mb-3">
                <CardList cards={cards}  />
              </div>
            </div>
          </form>    
        </div>
      </div>
    </div>
  );
}

export default App;
