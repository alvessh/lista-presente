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
      <h1 className="text-center mb-4 font-bold text-headerText">
        Cadastro de item ✏️
      </h1>
      <form
        onSubmit={handleSubmit}
        className="my-4 mb-16  flex flex-row items-end mr-4 gap-4"
      >
        <div className="text-headerText w-full ">
          <p>Descrição do item</p>
          <input
            type="text"
            className="border-2 border-inputBorder bg-input text-inputText w-full h-10 rounded-md p-2 outline-none "
            value={text}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className=" flex flex-row w-fit h-10 text-center items-center bg-button border-2 text-buttonText border-buttonBorder rounded-md p-2 "
        >
          <p>➕</p>
          <p> Adicionar</p>
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
