import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { FaTrash } from "react-icons/fa";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    console.log("remove from cart request", id);
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div>
      <Row>
        <Col md={8}>
          <h1 style={{ margin: "2rem" }}>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.length > 0 &&
                cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={1}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) => {
                            addToCartHandler(item, Number(e.target.value));
                          }}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>{item.price}</Col>
                      <Col md={2}>
                        {Number(item.qty * item.price).toFixed(2)}
                      </Col>

                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item variant="flush">
                <h3>
                  Total Items : {cartItems.reduce((acc, i) => acc + i.qty, 0)}
                </h3>
                <h4>
                  Price :{" "}
                  {Number(
                    cartItems.reduce((acc, i) => acc + i.qty * i.price, 0)
                  ).toFixed(2)}
                </h4>

                <Button type="button" onClick={checkoutHandler}>
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
