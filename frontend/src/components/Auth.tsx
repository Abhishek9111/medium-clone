import { SignUpInput } from "mediumclone";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type == "signin" ? "signin" : "signup"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
    } catch (err) {
      console.log("error", err);
    }
  }
  function handleClickButton() {
    if (type == "signin") {
      navigate("/signup");
    } else {
      navigate("/signin");
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="px-10">
          <div>
            <div className="font-extrabold mt-4 text-3xl">
              {type == "signup" ? "Create an account" : "Login to your account"}
            </div>
            <div className="text-slate-400">
              {type == "signin"
                ? "Already have an account?"
                : "Don't have a account"}
              <button
                className="pl-1 hover:underline"
                onClick={handleClickButton}
              >
                {type == "signin" ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
          <div className="pt-8 space-y-2">
            <LabelledInput
              type="text"
              label="Email"
              placeholder="test@example.ccom"
              onChange={(e) => {
                // setPostInputs((c: any) => ({
                //   ...c,
                //   username: e.target.value,
                // }));
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="Password"
              type={"password"}
              onChange={(e) => {
                // setPostInputs((c: any) => ({
                //   ...c,
                //   username: e.target.value,
                // }));
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              type="button"
              className="text-white w-full  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={sendRequest}
            >
              {type == "signin" ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
interface LabelledInputType {
  label: String;
  placeholder: String;
  type?: String;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputType): any {
  return (
    <div>
      <div
        id="first_name"
        className="block mb-2 text-sm  text-gray-900 font-semibold"
      >
        {label}
      </div>
      <input
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        type={type || "text"}
        onChange={onChange}
        required
      />
    </div>
  );
}
``;
