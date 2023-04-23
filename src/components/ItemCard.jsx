export default function ItemCard({
  id,
  selected,
  description,
  handleWarning,
  handleConfirmItem,
  handleDelete,
}) {
  return (
    <li>
      {!!handleDelete ? (
        <button
          className="bg-[#0e023a] h-16 p-4 border-4 border-[#0a0422] text-[#5d5f80] border-r-8s rounded-md w-full  text-left "
          onClick={() => handleDelete(id)}
        >
          {description}
        </button>
      ) : selected === 0 ? (
        <button
          className="bg-[#0e023a] p-4 border-4 border-[#0a0422] text-[#5d5f80] border-r-8s rounded-md w-full h-16 text-left "
          onClick={() => handleConfirmItem(id)}
        >
          <input type="checkbox" />
          {description}
        </button>
      ) : (
        <button
          className="bg-[#0e023a] p-4 border-4 border-[#0a0422] text-[#5d5f80] border-r-8s rounded-md w-full h-16 text-left opacity-40"
          onClick={() => handleWarning()}
        >
          <input type="checkbox" checked />
          {description}
        </button>
      )}
    </li>
  );
}
