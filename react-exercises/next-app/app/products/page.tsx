/* eslint-disable @next/next/no-img-element */
import styles from "../page.module.css";
import Link from "next/link";

interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const Products = async () => {
  const url = "https://fakestoreapi.com/products";
  const productReq = await fetch(url);
  const productInfo = await productReq.json();

  console.log("rpoodi", productInfo);

  const products = productInfo.map((p: Product) => {
    return (
      <div key={p.id} className={styles.card}>
        <Link href={`/products/${p.id}`}>
          <h3>{p.title}</h3>
          <img src={p.image} alt="product" />
        </Link>
      </div>
    );
  });

  return (
    <div className={styles.main}>
      <h1>The Products page</h1>
      <div className={styles.gallery}>{products}</div>
    </div>
  );
};

export default Products;
