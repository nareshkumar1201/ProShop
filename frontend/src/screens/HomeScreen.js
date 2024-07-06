import { Row, Col } from "react-bootstrap";
import Products from "../products";
const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products </h1>
      <Row>
        {Products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            {product.name}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
