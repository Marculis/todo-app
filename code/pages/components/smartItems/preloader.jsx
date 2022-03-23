import "./preloader.scss";
import loader from "../../../assets/icons/preloader.gif";

const Preloader = () => {
  return (
    <div>
      {" "}
      <img className="preloader" src={loader} alt="" />{" "}
    </div>
  );
};

export default Preloader;
