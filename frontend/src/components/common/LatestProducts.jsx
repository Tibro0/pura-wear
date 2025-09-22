import React, { useEffect, useState } from "react";
import ProductImg from "../../assets/images/eight.jpg";
import { Link } from "react-router-dom";
import { apiUrl } from "./http";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  const latestProducts = async () => {
    await fetch(apiUrl + "/get-latest-products", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.data);
      });
  };

  useEffect(() => {
    latestProducts();
  }, []);

  return (
    <section className="section-2 pt-5">
      <div className="container">
        <h2>New Arrivals</h2>
        <div className="row mt-4">
          {products &&
            products.map((product) => {
              return (
                <div className="col-md-3 col-6" key={`product-${product.id}`}>
                  <div className="product card border-0">
                    <div className="card-img">
                      <Link to="/product">
                        {product.image_url == "" ? (
                          <img src="https://placehold.co/315x362" />
                        ) : (
                          <img src={product.image_url} className="w-100" />
                        )}
                      </Link>
                    </div>
                    <div className="card-body pt-3">
                      <Link to="/product">{product.title}</Link>
                      <div className="price">
                        ${product.price}&nbsp;
                        {product.compare_price && (
                          <span className="text-decoration-line-through">
                            ${product.compare_price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
