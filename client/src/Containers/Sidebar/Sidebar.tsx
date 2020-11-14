import * as React from "react";

import { Credential } from "../../Components/Credential/Credential";
import { TagSection } from "../../Components/TagSection/TagSection";
import "./Sidebar.scss";

export const Sidebar = () => {
  return (
    <div className="portfoliosSideBar">
      <Credential label="Phone number" value="+923327222555" />
      <Credential label="Email" value="rasikh_asad@live.comasdadasdas" />
      <Credential label="Address" value="House# 111, Block#7" />
      <Credential label="Degree" value="Software Engineering" />
      <Credential label="University" value="Comsats" />
      <Credential label="GPA" value="3" />
      <Credential
        label="Skills"
        value={
          <TagSection
            tags={[
              "Javascript",
              "React",
              "React-Native",
              "Node",
              "Redux",
              "React-Higcharts",
              "D3",
              "GraphQl",
              "Magento 1",
              "Magento 2",
            ]}
          />
        }
      />
      <Credential
        label="Interest"
        value={<TagSection tags={["Sports", "Traveling", "Books", "Hiking"]} />}
      />
    </div>
  );
};
