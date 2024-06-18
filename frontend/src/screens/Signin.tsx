import { Link } from "react-router-dom";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";

function Signin() {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="items-center flex flex-col justify-center gap-8 w-1/5">
        <div className="text-4xl font-bold text-white">Signin</div>
        <div className="text-slate-400">
          Don't have an account?{" "}
          <span className="underline">
            <Link to={"/signup"}>Signup</Link>
          </span>
        </div>
        <div className="w-full">
          <InputBox placeholder="Username" type="text" />
        </div>
        <div className="w-full">
          <InputBox placeholder="password" type="password" />
        </div>
        <div>
          <BigButton name="Signin" />
        </div>
      </div>
    </div>
  );
}
export default Signin;
