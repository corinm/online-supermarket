import React from "react";
import { Link } from "react-router-dom";
import { Layout, Typography } from "antd";

import Carousel from "./Carousel/Carousel";
import { generateGreeting } from "./helpers";

const PaddedSection = ({ children }) => (
  <div style={{ paddingTop: 30, paddingBottom: 30 }}>{children}</div>
);

const Center = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>{children}</div>
);

const Home = () => {
  return (
    <Layout.Content>
      <PaddedSection>
        <Center>
          <Typography.Title level={2}>{generateGreeting()}</Typography.Title>
        </Center>
        <Center>
          <div>
            Click <Link>here</Link> to start shopping
          </div>
        </Center>
      </PaddedSection>
      <Carousel></Carousel>
    </Layout.Content>
  );
};

export default Home;
