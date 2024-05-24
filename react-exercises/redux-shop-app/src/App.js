import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart } from "./cartSlice";

const ItemCard = ({ id, img, title, price, desc, category }) => {
  const dispatch = useDispatch();

  const addToCart = (id) => {
    dispatch(addCart({ id, img, title, price }));
  };

  return (
    <div className="item-card" key={id}>
      <button className="buy-button" onClick={() => addToCart(id)}>
        Buy
      </button>
      <div className="item-info">
        <div className="img-price">
          <img src={img} alt="product" height="100px" />
          <h3>{title}</h3>
          <h4>{price} €</h4>
        </div>
        <p>{desc}</p>
        <h5>{category}</h5>
      </div>
    </div>
  );
};

const CartItem = ({ id, img, title, price }) => {
  const dispatch = useDispatch();

  const removeFromCart = (id) => {
    dispatch(removeCart({ id: id }));
  };

  return (
    <div className="cart-item">
      <button className="remove-button" onClick={() => removeFromCart(id)}>
        x
      </button>
      <img src={img} alt="cart-item" />
      <div className="product-price">
        <p>{title}</p>
        <p>{price} €</p>
      </div>
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);

  const { cart } = useSelector((state) => state);

  useEffect(() => {
    axios
      .get("http://fakestoreapi.com/products")
      .then((res) => setProducts(res.data));
  }, []);

  // console.log("products", products);

  return (
    <main className="App">
      <section className="products">
        <h2>Products</h2>
        <div className="all-cards">
          {products.map((p) => (
            <ItemCard
              key={p.id}
              id={p.id}
              img={p.image}
              title={p.title}
              price={p.price}
              desc={p.description}
              category={p.category}
            />
          ))}
        </div>
      </section>
      <aside className="cart">
        <h2>Cart</h2>
        {cart?.map((i) => (
          <CartItem
            key={i.id}
            id={i.id}
            img={i.img}
            title={i.title}
            price={i.price}
          />
        ))}
      </aside>
    </main>
  );
};

export default App;
