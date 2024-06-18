import { Link } from "react-router-dom";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";

function Signup() {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="items-center flex flex-col justify-center gap-8 w-1/5">
        <div className="text-4xl font-bold text-white">Signup</div>
        <div className="text-slate-400">
          Already have an account?{" "}
          <span className="underline">
            <Link to={"/signup"}>Signin</Link>
          </span>
        </div>
        <div className="w-full">
          <InputBox placeholder="Username" type="text" />
        </div>
        <div className="w-full">
          <InputBox placeholder="Email" type="email" />
        </div>
        <div className="w-full">
          <InputBox placeholder="Password" type="password" />
        </div>
        <div>
          <BigButton name="Signup" />
        </div>
      </div>
    </div>
  );
}
export default Signup;
