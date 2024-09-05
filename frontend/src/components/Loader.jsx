import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div>
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "2rem",
          height: "2rem",
          margin: "auto",
          display: "block",
        }}
      ></Spinner>
    </div>
  );
};

export default Loader;
