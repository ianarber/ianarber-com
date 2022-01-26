import React from "react";
import { render } from "react-dom";

import BasePage from "../pages/BasePage";

const reactRoot = document.getElementById("react-root");

if (reactRoot) {
  render(<BasePage />, document.getElementById("react-root"));
}
