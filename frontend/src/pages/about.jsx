import reactLogo from "../assets/react.svg";
import myself from "/myself.jpg";
import viteLogo from "/vite.svg";
export default function About() {
  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-64 h-96 border-r-2 border-black pr-3">
        <img src={myself} alt="Website owner's picture"></img>
      </div>
      <div className=" pl-3 text-lg">
        大家好，我是陳威儒，目前為臺灣大學電機系大四生。
      </div>
    </div>
  );
}
