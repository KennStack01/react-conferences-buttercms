import React from "react";
import Layout from "../containers/Layout";
import MapContainerComponent from "../components/MapContainer";

const IndexPage = () => {
  return (
    <Layout menuItems={[]}>
      <div className="w-full min-h-min">
        <h1 className="text-5xl font-bold my-6 text-center">
          React Conferences
        </h1>

        <MapContainerComponent />
      </div>
    </Layout>
  );
};

export default IndexPage;
