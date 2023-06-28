import React, { useEffect, useState } from "react";
import loginSignupImage from "./assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [entries, setEntries] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    const storedEntries = localStorage.getItem("entries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmpassword } = data;
    console.log(data);

    if( !isChecked || !name || !email || !password || !confirmpassword) {
      alert("Fill all Details");
      return;
    }

    if( password !== confirmpassword) {
      alert("Password Didn't Match");
      return;
    }

    const emailCheck = entries.filter((ele)=> ele.email === email);
    console.log(emailCheck);

    if(emailCheck.length){

      alert("Email Already Exist");
      return;
    }

    setEntries([...entries, { name, email, password, confirmpassword }]);
    setData({
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
    setIsChecked(false);

  };

  return (
    <div className="p-3 md:p-4 ">
      <div className="w-full max-w-sm bg-purple-900 m-auto flex flex-col py-4 rounded-md">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shodow-md m-auto relative">
          <img src={loginSignupImage} alt="signUp" className="w-full h-full " />
        </div>

        <form
          className="w-full px-2 py-3 flex flex-col"
          onSubmit={handleSubmit}
        >
          <label htmlFor="Name" className="text-white"> Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleOnChange}
            className="mt-1 mb-3 w-full bg-slate-200 px-2 py-1 rounded-sm focus-within:outline-purple-300"
          />

          <label htmlFor="email" className="text-white"> Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleOnChange}
            value={data.email}
            className="mt-1 mb-3 w-full bg-slate-200 px-2 py-1 rounded-sm focus-within:outline-purple-300"
          />

          <label htmlFor="password" className="text-white"> Password</label>
          <div className=" flex mt-1 mb-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:border-purple-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              className="w-full bg-slate-200 border-none focus:outline-none"
            />
            <span
              className="m-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword" className="text-white">Confirm Password</label>
          <div className=" flex mt-1 mb-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:border-purple-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              onChange={handleOnChange}
              value={data.confirmpassword}
              className="w-full bg-slate-200 border-none focus:outline-none"
            />
            <span
              className="m-2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <div className="w-full flex items-center justify-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <button
              type="submit"
              className="w-full max-w-[150px] m-auto bg-purple-500 hover:bg-white hover:text-purple-500 cursor-pointer text-white py-1 rounded-xl text-lg mt-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div>
        <div className=" w-full max-w-md m-auto rounded-sm mt-4">
          <div className="w-full max-w-md p-4 bg-purple-900 border border-gray-200 rounded-lg shadow sm:p-8 ">
            <div  className="flex items-center justify-between mb-4">
              <h5  className="text-xl font-bold leading-none text-white ">Latest Users</h5>
            </div>
            <div  className="flow-root">
              <ul  className="divide-y divide-gray-200 ">
                {entries[0] &&
                  entries.map((el, ind) => {
                    return (
                      <li key={ind} class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                          <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-white">
                              {el.name}
                            </p>
                            <p class="text-sm  text-white">{el.email}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
