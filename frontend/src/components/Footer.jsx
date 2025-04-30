import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex justify-around pb-7">
      <div className="">
        <h4 className="text-lg font-semibold">Quick Links</h4>
        <ul>
          <h6 className="text-slate-600">
            <Link to={"/"}>Home</Link>
          </h6>
          <h6 className="text-slate-600">
            <Link to={"/Services"}>Services</Link>
          </h6>
          <h6 className="text-slate-600">
            <Link to={"/Aboutus"}>About us</Link>
          </h6>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Contact us</h4>
        <ul>
          <li className="flex items-center">
            <img src="/call.png" alt="" className="w-4 h-4" />
            <h6 className="text-slate-600">&nbsp;011XXXXXXX</h6>
          </li>
          <li className="flex items-center">
            <img src="mail.png" alt="" className="w-4 h-4" />
            <h6 className="text-slate-600">&nbsp;name@gmail.com</h6>
          </li>
          <li className="flex items-center">
            <img src="location.png" alt="" className="w-4 h-4" />
            <h6 className="text-slate-600">&nbsp;Pambaimadu,Vavuniya</h6>
          </li>
        </ul>
      </div>
      <div className="">
        <h4 className="text-lg font-semibold">Hours</h4>
        <table className="text-slate-600">
          <tr className="leading-tight">
            <td className="pr-4">• Monday</td>
            <td>8.30am-4.00pm</td>
          </tr>
          <tr className="leading-tight">
            <td className="pr-4">• Tuesday</td>
            <td>8.30am-4.00pm</td>
          </tr>
          <tr className="leading-tight">
            <td className="pr-4">• Wednesday</td>
            <td>8.30am-4.00pm</td>
          </tr>
          <tr className="leading-tight">
            <td className="pr-4">• Thursday</td>
            <td>8.30am-4.00pm</td>
          </tr>
          <tr className="leading-tight">
            <td className="pr-4">• Friday</td>
            <td>8.30am-4.00pm</td>
          </tr>
          <tr className="leading-tight">
            <td className="pr-4">• Saturday</td>
            <td>9.00am-12.00pm</td>
          </tr>
          <tr className="leading-tight">
            <td className="pr-4">• Sunday</td>
            <td>Closed</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
