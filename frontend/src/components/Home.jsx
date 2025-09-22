import React, { useEffect } from "react";
import LatestProducts from "./common/LatestProducts";
import FeaturedProducts from "./common/FeaturedProducts";
import Hero from "./common/Hero";
import Layout from "./common/Layout";

const Home = () => {
  // Page Title
    useEffect(() => {
      document.title = "Pura Wear | Home";
    }, []);

  return (
    <Layout>
      <Hero/>
      <LatestProducts />
      <FeaturedProducts />
    </Layout>
  );
};

export default Home;
