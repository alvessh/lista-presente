export default function ItemCard({
  id,
  selected,
  description,
  handleWarning,
  handleConfirmItem,
  handleDelete,
}) {
  return (
    <li >
      {!!handleDelete ? (
        <button
          className="bg-card h-fit p-4 border-4 border-cardBorder text-cardText font-bold border-r-8s rounded-md w-full  text-left "
          onClick={() => handleDelete(id)}
        >
          {description} <p className="text-sm text-cardSubText">🗑️ Clique para apagar</p>
        </button>
      ) : selected === 0 ? (
        <button
          className="bg-card  p-4 border-4 border-cardBorder text-cardText font-bold border-r-8s rounded-md w-full h-fit text-left "
          onClick={() => handleConfirmItem(id)}
        >
          <input type="checkbox"  />
          {description}
        </button>
      ) : (
        <button
          className="bg-card  p-4 border-4 border-cardBorder text-cardText font-bold border-r-8s rounded-md w-full h-fit text-left opacity-40"
          onClick={() => handleWarning()}
        >
          <input type="checkbox" defaultChecked />
          {description}
        </button>
      )}
    </li>
  );
}
