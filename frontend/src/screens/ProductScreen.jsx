import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Button, Image } from "react-bootstrap";
import Rating from "../components/Ratings";
//import ProductsData from "../products";
const ProductScreen = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState({});
  console.log("this is product id", productId);
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      console.log(data);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);
  // const product = ProductsData.find((p) => p._id === productId);
  // console.log(product.name);
  // console.log(product);
  return (
    <div>
      <Link to="/">
        <Button className="btn btn-light my-3">Back</Button>
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price {product.price}</ListGroup.Item>
            <ListGroup.Item>Description :{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Price :</Col>
                <Col>
                  <strong> &#8377; {`${product.price}`}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>status :</Col>
                <Col>
                  <strong>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock "}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className="btn-block"
                type="button"
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
