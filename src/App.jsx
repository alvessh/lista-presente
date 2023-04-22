import { useEffect, useState } from "react";
import { selectList, updateList } from "./supabase";

function App() {
  const [list, setList] = useState([]);
  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    (async () => {
      if (!isLoad) {
        const result = await selectList();
        setList(result);
        setLoad(true);
      }
    })()

  }, [isLoad]);

  async function handleCheckboxChange(itemId) {
    const item = list.find(item => item.id === itemId);
    const updatedListTemp = list.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          confirmado: item.confirmado === 1 ? 0 : 1
        };
      } else {
        return item;
      }
    });
    setList(updatedListTemp);
    if (item.confirmado === 0) {
      const confirmResult = window.confirm(`Você deseja confirmar o presente ${item.descricao}?`);
      if (!confirmResult) {
        setList(list);
      }
    }

    const error = await updateList(itemId, item);
    console.log(error);
  }

  return (
    <>
      <h1>Lista de Presentes Casamento</h1>
      <div className="list-container">
        <ul>
          {list.map(value => (
            <li key={value.id}>
              <input
                type="checkbox"
                checked={value.confirmado === 1}
                onChange={() => handleCheckboxChange(value.id)}
              />
              {value.descricao}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;