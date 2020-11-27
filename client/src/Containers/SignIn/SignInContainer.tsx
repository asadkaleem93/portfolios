import * as React from "react";

import { SignIn } from "./SignIn";
import "./SignInContainer.scss";

export const SignInContainer = () => {
  return (
    <div className="signInContainer">
      <div className="sideImg">
        <img width="100%" height={window.innerHeight} src="./sign-in.jpg" />
      </div>
      <SignIn />
    </div>
  );
};
