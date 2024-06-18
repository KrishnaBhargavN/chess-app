function InputBox({
  placeholder,
  type,
}: {
  placeholder: string;
  type: string;
}) {
  return (
    <div>
      <input
        className="h-10  min-w-full rounded-lg"
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}
export default InputBox;
