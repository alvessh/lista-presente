import { useEffect, useState } from "react";
import { selectList, updateItem } from "./supabase";
import ItemCard from "./components/ItemCard";

function App() {
  const [list, setList] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        const result = await selectList();
        setList(result);
        setLoaded(true);
      }
    })();
  }, [isLoaded]);

  async function handleConfirmItem(itemId) {
    console.log("ItemId ->", itemId);
    const item = list.find((item) => item.id === itemId);

    const confirmResult = window.confirm(
      `Deseja marcar o item "${item.descricao}"? Ao fazer isso não será possível desmarcar!`
    );

    if (!confirmResult) return;
    item.confirmado = 1;

    console.log("Item ->", item);

    await updateItem(itemId, item);

    console.log("Item atualizado ->", item);
    setLoaded(false);
  }

  function handleWarning() {
    window.alert("Não é possível desmarcar um item!");
  }

  return (
    <>
      <div className="mb-8 text-[#432ca8]">
        <h1 className="text-center mb-4">Lista de presentes 👰🤵</h1>
        <p>
          Lista feita no intuito de organizar os presentes para o casamento!
        </p>
      </div>
      <div className="list-container">
        <ul>
          {list.map((value) => (
            <ItemCard
              handleConfirmItem={handleConfirmItem}
              handleWarning={handleWarning}
              id={value.id}
              selected={value.confirmado}
              description={value.descricao}
              key={value.id}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
