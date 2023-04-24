import { useEffect, useState } from "react";
import { selectList, updateItem } from "./supabase";
import ItemCard from "./components/ItemCard";

export default function App() {
  const [list, setList] = useState([]);
  const [indexList, setIndexList] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        const result = await selectList();
        setList(result);
        console.log(result.length);
        let qtdPages = result.length / 5;
        console.log(qtdPages);
        if (qtdPages % 1 != 0) qtdPages = Math.trunc(qtdPages) + 1;
        setPages(qtdPages);

        setLoaded(true);
      }
    })();
  }, [isLoaded]);

  async function handleConfirmItem(itemId) {
    console.log("ItemId ->", itemId);
    const item = list.find((item) => item.id === itemId);

    const confirmResult = window.confirm(
      `Você deseja confirmar o presente ${item.descricao}?. Ao selecionar o item não será possível alterar!`
    );

    if (!confirmResult) return;
    item.confirmado = 1;

    console.log("Item ->", item);

    await updateItem(itemId, item);

    console.log("Item atualizado ->", item);
    setLoaded(false);
  }

  function handleWarning() {
    window.alert(
      "Não é possível desmarcar o item, pois já foi marcado por outra pessoa. Dúvidas entre em contato com os Noivos!"
    );
  }

  return (
    <main>
      <div className="mb-8 text-headerText font-bold">
        <h1 className="text-center mb-4">Lista de presentes 👰🤵</h1>
        <p>
          Lista feita no intuito de organizar os presentes para o casamento!
        </p>
      </div>
      <div className="list-container">
        <div className="flex flex-row align-middle justify-between items-center text-headerText">
          {indexList > 1 ? (
            <button
              className="flex flex-row w-fit h-10 text-center items-center bg-button border-2 text-buttonText border-buttonBorder rounded-md p-2"
              onClick={() => setIndexList(indexList - 1)}
            >
              <p>⬅️</p> Voltar
            </button>
          ) : (
            <button className="flex flex-row w-fit h-10 text-center items-center bg-button border-2 text-buttonText border-buttonBorder rounded-md p-2 opacity-25">
              <p>⬅️</p> Voltar
            </button>
          )}
          <p>
            {indexList} / {pages}{" "}
          </p>
          {indexList === pages ? (
            <button
              className="flex flex-row w-fit h-10 text-center items-center bg-button border-2 text-buttonText border-buttonBorder rounded-md p-2 opacity-25"
            >
              Passar<p>➡️</p>
            </button>
          ) : (
            <button
              className="flex flex-row w-fit h-10 text-center items-center bg-button border-2 text-buttonText border-buttonBorder rounded-md p-2"
              onClick={() => setIndexList(indexList + 1)}
            >
              Passar<p>➡️</p>
            </button>
          )}
        </div>
        <ul>
          {list.map((value, index) => {
            if (index >= indexList * 5) return;
            if (index < indexList * 5 - 5) return;
            return (
              <ItemCard
                handleConfirmItem={handleConfirmItem}
                handleWarning={handleWarning}
                id={value.id}
                selected={value.confirmado}
                description={value.descricao}
                key={value.id}
              />
            );
          })}
        </ul>
      </div>
    </main>
  );
}


