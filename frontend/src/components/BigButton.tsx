function BigButton({ name }: { name: string }) {
  return (
    <div>
      <button className="py-2 px-4 bg-green-400 hover:bg-green-500 text-white font-bold  rounded text-base self-center">
        <div className="text-2xl">{name}</div>
      </button>
    </div>
  );
}
export default BigButton;
