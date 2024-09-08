import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Button, Image, Form } from "react-bootstrap";
import Rating from "../components/Ratings";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { id: productId } = useParams();
  // const productData = useGetProductDetailsQuery(productId);
  // console.log(productData);
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));

    navigate("/cart");
  };

  console.log("this is product id", productId);
  console.log("this is product", product);
  //console.log("count in stock", product.countInStock);
  // console.log([...Array(product.countInStock).keys()]);
  return (
    <div>
      <Link to="/">
        <Button className="btn btn-light my-3">Back</Button>
      </Link>
      {isLoading ? (
        <>
          {" "}
          <Loader />
        </>
      ) : error ? (
        <>
          {" "}
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        </>
      ) : (
        <>
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
                <ListGroup.Item>
                  Description :{product.description}
                </ListGroup.Item>
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
                        {product.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock "}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
