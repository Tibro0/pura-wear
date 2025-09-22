import React, { useEffect, useState } from "react";
import Layout from "./common/Layout";
import ProductImg from "../assets/images/eight.jpg";
import { Link } from "react-router-dom";
import { apiUrl } from "./common/http";

const Shop = () => {
  // Page Title
  useEffect(() => {
    document.title = "Pura Wear | Shop";
  }, []);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [catChecked, setCatChecked] = useState([]);

  const fetchProducts = () => {
    let search = [];
    let params = "";

    if (catChecked.length > 0) {
      search.push(["category", catChecked]);
    }

    if (search.length > 0) {
      params = new URLSearchParams(search);
    }

    fetch(`${apiUrl}/get-products?${params}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setProducts(result.data);
        } else {
          console.log("Something Went Wrong!");
        }
      });
  };

  const fetchCategories = () => {
    fetch(`${apiUrl}/get-categories`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setCategories(result.data);
        } else {
          console.log("Something Went Wrong!");
        }
      });
  };

  const fetchBrands = () => {
    fetch(`${apiUrl}/get-brands`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setBrands(result.data);
        } else {
          console.log("Something Went Wrong!");
        }
      });
  };

  const handleCategory = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCatChecked((pre) => [...pre, value]);
    } else {
      setCatChecked(catChecked.filter((id) => id != value));
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProducts();
  }, [catChecked]);

  return (
    <Layout>
      <div className="container">
        <nav aria-label="breadcrumb" className="py-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="#">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shop
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3 className="mb-3">Categories</h3>
                <ul>
                  {categories &&
                    categories.map((category) => {
                      return (
                        <li className="mb-2" key={`category-${category.id}`}>
                          <input
                            type="checkbox"
                            value={category.id}
                            onClick={handleCategory}
                          />
                          <label htmlFor="" className="ps-2">
                            {category.name}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>

            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3 className="mb-3">Brands</h3>
                <ul>
                  {brands &&
                    brands.map((brand) => {
                      return (
                        <li className="mb-2" key={`brand-${brand.id}`}>
                          <input type="checkbox" value={brand.id} />
                          <label htmlFor="" className="ps-2">
                            {brand.name}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row pb-5">
              {products &&
                products.map((product) => {
                  return (
                    <div
                      className="col-md-4 col-6"
                      key={`product-${product.id}`}
                    >
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
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
