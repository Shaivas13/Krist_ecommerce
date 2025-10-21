import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCategoryCard from "../components/cards/ProductCategoryCard";
import ProductCard from "../components/cards/ProductCard";
import HeaderImage from "../utils/Images/HeaderImage.png";
import { category } from "../utils/data";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

const Section = styled.div`
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Img = styled.img`
  width: 90%;
  max-width: 1200px;
  height: 700px;
  object-fit: cover;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  @media (max-width: 750px) {
    gap: 14px;
  }
`;

const Home = () => {
  // Static Best Sellers data (4 products)
  const bestSellers = [
    {
      _id: "1",
      title: "Blue Cotton Shirt",
      name: "Men’s Formal Wear",
      price: { org: 499, mrp: 899, off: 45 },
      image:
        "https://www.urbanofashion.com/cdn/shop/files/shirtden2pc-iceblue-1.jpg",
    },
    {
      _id: "2",
      title: "Red Casual Shirt",
      name: "Men’s Casual Collection",
      price: { org: 599, mrp: 999, off: 40 },
      image: "https://images-static.nykaa.com/media/catalog/product/5/3/5348836ASSFCUMOFU64217_4.jpg",
    },
    {
      _id: "3",
      title: "Smart Watch",
      name: "Tech Accessories",
      price: { org: 1299, mrp: 1999, off: 35 },
      image:
        "https://www.jiomart.com/images/product/original/rvv0jejch6/iloz-stylish-new-luxury-gold-black-men-watch-designer-professional-gold-quartz-fashion-analog-wrist-watch-for-men-product-images-rvv0jejch6-0-202210200514.jpg",
    },
    {
      _id: "4",
      title: "Black Belt",
      name: "Belt Collection",
      price: { org: 999, mrp: 1499, off: 33 },
      image:
        "https://m.media-amazon.com/images/I/71KCjw8zzlL._AC_UY1100_.jpg",
    },
  ];

  return (
    <Container>
      {/* Header Image Section */}
      <Section style={{ alignItems: "center" }}>
        <Img src={HeaderImage} alt="Header" />
      </Section>

      {/* Categories Section */}
      <Section>
        <Title>Shop by Categories</Title>
        <CardWrapper>
          {category.map((cat) => (
            <ProductCategoryCard key={cat.id || cat._id} category={cat} />
          ))}
        </CardWrapper>
      </Section>

      {/* Best Sellers Section */}
      <Section>
        <Title center>Our Bestsellers</Title>
        <CardWrapper>
          {bestSellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </CardWrapper>
      </Section>
    </Container>
  );
};

export default Home;