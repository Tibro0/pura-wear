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

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

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
                          <input type="checkbox" value={category.id} />
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
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt foe Men</Link>
                    <div className="price">
                      $50
                      <span className="text-decoration-line-through">$80</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt foe Men</Link>
                    <div className="price">
                      $50
                      <span className="text-decoration-line-through">$80</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt foe Men</Link>
                    <div className="price">
                      $50
                      <span className="text-decoration-line-through">$80</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt foe Men</Link>
                    <div className="price">
                      $50
                      <span className="text-decoration-line-through">$80</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt foe Men</Link>
                    <div className="price">
                      $50
                      <span className="text-decoration-line-through">$80</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt foe Men</Link>
                    <div className="price">
                      $50
                      <span className="text-decoration-line-through">$80</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
