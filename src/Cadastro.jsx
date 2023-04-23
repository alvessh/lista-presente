import { useEffect, useState } from "react";
import { deleteById, insertList, selectList } from "./supabase";
import ItemCard from "./components/ItemCard";

function Cadastro() {
  const [list, setList] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        const result = await selectList();
        setList(result);
        setLoaded(true);
      }
    })();
  }, [isLoaded]);

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(text);
    const error = await insertList({ descricao: text, confirmado: 0 });

    setText("");
    setLoaded(false);
  }

  function handleChange(e) {
    const target = e.target;
    setText(target.value);
  }

  async function handleDelete(valueId) {
    const confirmResult = window.confirm("Deseja apagar o item da lista?");

    if (confirmResult) {
      const error = await deleteById(valueId);
      console.log(error);
    }

    setLoaded(false);
  }

  return (
    <>
      <h1 className="text-center mb-4 text-[#432ca8]">Cadastro de item ✏️</h1>
      <form
        onSubmit={handleSubmit}
        className="my-8 px-4 flex flex-row items-center"
      >
        <input
          type="text"
          className="border-2 border-[#0e023a] w-full h-10 rounded-md mr-4 p-2"
          value={text}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-[#0a0422] border-2 text-[#5d5f80] border-[#0e023a] rounded-md p-2"
        >
          Adicionar
        </button>
      </form>
      <ul className="max-height">
        {list.map((value) => (
          <ItemCard
            handleDelete={() => handleDelete(value.id)}
            description={value.descricao}
            id={value.id}
            key={value.id}
            selected={value.selected}
          />
        ))}
      </ul>
    </>
  );
}

export default Cadastro;
