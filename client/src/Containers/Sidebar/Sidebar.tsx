import * as React from "react";

import { Credential } from "../../Components/Credential/Credential";
import { TagSection } from "../../Components/TagSection/TagSection";
import { useAppContext } from "../../Components/Contexts/AppContext";
import "./Sidebar.scss";

export const Sidebar = () => {
  const { state: appState } = useAppContext();
  const { userInfo } = appState;
  const {
    phoneNumber,
    email,
    degree,
    university,
    gpaScore,
    skills,
    interest,
  } = userInfo;
  const formatedSkills = skills ? skills.split(",") : [];
  const formatedInterests = interest ? interest.split(",") : [];
  return (
    <div className="portfoliosSideBar">
      <Credential label="Phone number" value={phoneNumber} />
      <Credential label="Email" value={email} />
      {/* <Credential label="Address" value="House# 111, Block#7" /> */}
      {degree && <Credential label="Degree" value={degree} />}
      {university && <Credential label="University" value={university} />}
      {gpaScore && <Credential label="GPA" value={gpaScore} />}
      {formatedSkills.length && (
        <Credential
          label="Skills"
          value={<TagSection tags={formatedSkills} />}
        />
      )}
      {formatedInterests.length && (
        <Credential
          label="Interest"
          value={<TagSection tags={formatedInterests} />}
        />
      )}
    </div>
  );
};
