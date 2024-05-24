/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-async-client-component */

import styles from "../../page.module.css";
import { Product } from "../page";
import Link from "next/link";

const getData = async (id: string) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  const productReq = await fetch(`${url}`);
  const productInfo = await productReq.json();

  return productInfo;
};

const OneProduct = async ({ params: { id } }: { params: { id: string } }) => {
  const data: Product = await getData(id);

  console.log("produc", data);

  return (
    <div className={styles.main}>
      <h1>The Product page</h1>
      <div className={styles.product}>
        <div className={styles.desc}>
          <img src={data.image} alt="image" />
          <div>
            <strong>
              <p>{data.title}</p>
            </strong>
            <p>{data.description}</p>
            <p>Category: {data.category}</p>
            <p>Price: {data.price} €</p>
            <p>
              Rating: {data.rating.rate} (Count: {data.rating.count})
            </p>
          </div>
        </div>
      </div>
      <Link href="/products">Back</Link>
    </div>
  );
};

export default OneProduct;
