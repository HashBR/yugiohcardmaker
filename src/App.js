import React, { useEffect, useState } from "react"
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
    // Codigo comentado para exibir alerta se clicasse em submit quando faltava algo.
    // Agora ele só verifica no submit se tem alguma coisa faltando.
    // if (requiredChecker()){
    //   if (requiredChecker().length === "1"){
    //     alert(`Faltou o seguinte campo: ${requiredChecker()}`)
    //   }
    //   if (requiredChecker().length > "1"){
    //     alert(`Faltaram os seguintes campos: ${requiredChecker().join(", ")}`)
    //   }
    // }
    //else{
    clearForm()
    //alert(`Eita porra! É o ${name} ${desc}! Ele tem ${atk}/${def}`);
    setCards(prevCards => {
      return [...prevCards, { id: uuidv4(), name: name, desc: desc, atk: atk, def: def}]
      })
    //} 
  }

// Devolve uma array com o que falta
  function requiredChecker() {
    var missinginputs = []
    if (!name){
      missinginputs.push("Nome")
    }
    if (!desc){
      missinginputs.push("Descrição")
    }
    if (!atk){
      missinginputs.push("Ataque")
    }
    if (!def){
      missinginputs.push("Defesa")
    }
    else {
      missinginputs = ""
    }
    return missinginputs
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
    console.log("clear")
    //alert("Limpado.")
  }

  function descLimiter() {
    return (desc.length > 200)
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
                <label className="col-11 form-label" htmlFor="desc-input">Descrição</label>
                <span className="col-1">{desc.length}</span>
                <textarea type="text" className="form-control" id="desc-input" placeholder="Spooky Scary Skeleton" onChange={(e) => setDesc(e.target.value)} value={desc} />
                {descLimiter() && <span className="text-danger">Estourado o limite de caracteres!</span>}
              </div>
            </div>

            <div className="row g-2">
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="atk-input">Ataque</label>
                <input type="text" className="form-control" id="atk-input" placeholder="2500" onChange={(e) => setAtk(e.target.value.replace(/[^0-9]/g, ""))} value={atk} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="def-input">Defesa</label>
                <input type="text" className="form-control" id="def-input" placeholder="1250" onChange={(e) => setDef(e.target.value.replace(/[^0-9]/g, ""))} value={def} />
              </div>
            </div>
            <button className="btn btn-primary" disabled={requiredChecker() || descLimiter()} type="submit">Salvar</button>
            <button className="btn btn-secondary" onClick={handleClearCard}>Apagar cartas salvas</button>
          </form>    
          <div className="row">
                <CardList cards={cards}  />
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
