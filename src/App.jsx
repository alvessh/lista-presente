import { useEffect, useState } from "react";
import { selectList, updateItem } from "./supabase";
import ItemCard from "./components/ItemCard";

export default function App() {
  const [list, setList] = useState([]);
  const [indexList, setIndexList] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoaded, setLoaded] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        const result = await selectList();
        let qtdPages = result.length / 5;
        if (qtdPages % 1 != 0) qtdPages = Math.trunc(qtdPages) + 1;

        setPages(qtdPages);
        setList(result);
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

  const filteredList =
    text.length > 0
      ? list.filter((item) => {
          const itemStr = new String(item.descricao);
          return itemStr.toLowerCase().includes(text.toLowerCase());
        })
      : list;

  const qtdPages = filteredList.length / 5;
  const countPages = qtdPages % 1 != 0 ? Math.trunc(qtdPages) + 1 : qtdPages;

  return (
    <main className="flex flex-col w-full justify-between gap-16">
      <header className="mb-8 text-headerText font-bold">
        <h1 className="text-center mb-4">Lista de presentes 👰🤵</h1>
        <p>
          Lista feita no intuito de organizar os presentes para o casamento!
        </p>
      </header>

      <div className="list-container w-full">
        <form className="my-4 mb-16  flex flex-row items-end mr-4 gap-4">
          <div className="text-headerText w-full ">
            <p>Filtro 🔍</p>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border-2 border-inputBorder bg-input text-inputText w-full h-10 rounded-md p-2 outline-none "
            />
          </div>
        </form>

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
            {indexList} / {countPages}{" "}
          </p>
          {indexList === pages ? (
            <button className="flex flex-row w-fit h-10 text-center items-center bg-button border-2 text-buttonText border-buttonBorder rounded-md p-2 opacity-25">
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
          {filteredList.map((value, index) => {
            if (index >= indexList * 5) return;
            if (index < indexList * 5 - 5) return;
            return (
              <ItemCard
                key={value.id + ""}
                handleConfirmItem={handleConfirmItem}
                handleWarning={handleWarning}
                id={value.id}
                selected={value.confirmado}
                description={value.descricao}
              />
            );
          })}
        </ul>
      </div>
      <footer className="text-headerText flex flex-row gap-2">
        <div className="flex flex-row gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#404040"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <a href="https://github.com/alvessh" target="_blank">
            alvessh
          </a>
        </div>
        <a>-</a>
        <div className="flex flex-row gap-2">
          <a href="https://github.com/FriedrichMatheus" target="_blank">
            FriedrichMatheus
          </a>
        </div>
        <a>-</a>
        <div className="flex flex-row gap-2">
          <a href="https://github.com/giovanageile" target="_blank">
            geilegiovana
          </a>
        </div>
      </footer>
    </main>
  );
}
