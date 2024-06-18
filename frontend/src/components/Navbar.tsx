import { Link } from "react-router-dom";
import SmallButton from "./SmallButton";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between border-b border-b-stone-900 bg-zinc-900">
      <div className="p-4 font-bold text-white">
        <Link to={"/"}>Play Chess</Link>
      </div>
      <div className="flex flex-col justify-center text-white p-2">
        <SmallButton
          onClick={() => {
            navigate("/signin");
          }}
          name="Login"
        />
      </div>
    </div>
  );
}
export default Navbar;
