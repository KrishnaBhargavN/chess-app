export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className="py-4 px-8 bg-green-400 hover:bg-green-500 text-white font-bold  rounded text-2xl self-center"
      onClick={onClick}
    >
      <h1 className="text-4xl font-bold text-white">{children}</h1>
    </button>
  );
};
