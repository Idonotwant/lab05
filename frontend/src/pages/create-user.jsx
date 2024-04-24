import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import services from "../services";
import iu from "/IU.png";
import PhotoIcon from "@heroicons/react/20/solid";

// you should design your register page and api
function CreateUserPage() {
  const [formData, setFormData] = useState({
    accountName: "",
    nickName: "",
    passWord: "",
    checkPassWord: "",
    picture: null,
  });
  const [message, setMessage] = useState("");

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleTextInputChange = ({ target: { name, value } }) => {
    // const { name, value } = event.target
    // obj = { ...prev }; obj[name] = value

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleFileInputChange = (e) => {
    // const { name, value } = event.target
    // obj = { ...prev }; obj[name] = value
    setFormData((prev) => ({
      ...prev,
      picture: e.target.files[0],
    }));
  };

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleFormSubmit = (event) => {
    services.user.createOne({ formData }).then((data) => {
      setMessage(JSON.stringify(data, null, 2));
    });
    setFormData(() => ({
      accountName: "",
      nickName: "",
      passWord: "",
      checkPassWord: "",
      picture: null,
    }));
    event.preventDefault();
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create an account
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
                <label htmlFor="nickName" className="sr-only">
                  nickName
                </label>
                <input
                  name="nickName"
                  type="text"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="name seen on post"
                  value={formData.nickName}
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
                  placeholder="passWord"
                  value={formData.passWord}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="checkPassWord" className="sr-only">
                  checkPassWord
                </label>
                <input
                  name="checkPassWord"
                  type="text"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="check password"
                  value={formData.checkPassWord}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>

            <div className="mt-2 flex flex-row rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <input
                id="picture"
                name="picture"
                type="file"
                onChange={handleFileInputChange}
              />

              {formData.picture && (
                <img
                  src={URL.createObjectURL(formData.picture)}
                  className=" h-32"
                ></img>
              )}
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
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUserPage;
