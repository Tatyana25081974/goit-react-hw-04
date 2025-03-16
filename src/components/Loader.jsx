import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <PuffLoader color="#007bff" size={80} />
    </div>
  );
};

export default Loader;