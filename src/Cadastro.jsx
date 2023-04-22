import { useEffect, useState } from "react";
import { insertList, selectList } from "./supabase";

function Cadastro() {
  const [list, setList] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const [text, setText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(text)
    const error = insertList({descricao: text, confirmado: 0});
    
    console.log(error);
    setText('');
    setLoad(false);
  }

  function handleChange(e) {
    const target = e.target;
    setText(target.value);
  }

  useEffect(() => {
      (async () => {
        if (!isLoad) {
          const result = await selectList();
          setList(result);
          setLoad(true);
          
          result.map(e => {
            console.log(e);
          })
        }
      })()

  }, [isLoad, list]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text"  value={text} onChange={handleChange}/>
        <ul className="max-height">
        {list.map(value => (
          <li key={value.id}>{value.descricao}</li>
        ))}
        </ul>
        <button type="submit">Adicionar</button>
      </form>
    </>
  );
}

export default Cadastro;
