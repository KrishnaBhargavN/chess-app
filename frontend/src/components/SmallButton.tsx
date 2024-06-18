function SmallButton({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="py-1 px-2 bg-green-400 hover:bg-green-500 text-white font-bold  rounded text-base self-center"
      >
        <div className="font-semibold text-white">{name}</div>
      </button>
    </div>
  );
}
export default SmallButton;
