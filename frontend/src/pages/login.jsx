import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState, useContext } from "react";
import services from "../services";
import { AuthContext } from "../services/authContent";
import { Navigate, useNavigate } from "react-router-dom";

// you should design your register page and api
function LoginPage() {
  const [formData, setFormData] = useState({
    accountName: "",
    passWord: "",
  });
  const [message, setMessage] = useState("");
  const { setIsLogin, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleTextInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleFormSubmit = (event) => {
    services.user.login({ formData }).then((data) => {
      if (data && data.accountName) {
        //login success
        setUserData(data);
        setIsLogin(true);
        navigate("/posts");
      }
    });
    setFormData(() => ({
      accountName: "",
      passWord: "",
    }));
    event.preventDefault();
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="accountName" className="sr-only">
                  nickName
                </label>
                <input
                  name="accountName"
                  type="text"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="account name"
                  value={formData.accountName}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="passWord" className="sr-only">
                  passWord
                </label>
                <input
                  name="passWord"
                  type="text"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="password"
                  value={formData.passWord}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <pre>{message}</pre>
    </>
  );
}

export default LoginPage;
