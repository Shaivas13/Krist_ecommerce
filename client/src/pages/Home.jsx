import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCategoryCard from "../components/cards/ProductCategoryCard";
import ProductCard from "../components/cards/ProductCard";
import HeaderImage from "../utils/Images/HeaderImage.png";
import { category } from "../utils/data";
import axios from "axios";

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

  @media (max-width: 768px) {
    height: 300px;
  }
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

const Loader = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
`;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products"); // your backend URL
        // Map img -> image and convert category array -> string
        const fixedProducts = res.data.map((p) => ({
          ...p,
          image: p.img || p.image,
          category: Array.isArray(p.category) && p.category.length > 0 ? p.category[0] : p.category,
        }));
        setProducts(fixedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        {loading ? (
          <Loader>Loading products...</Loader>
        ) : (
          <CardWrapper>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </CardWrapper>
        )}
      </Section>
    </Container>
  );
};

export default Home;
