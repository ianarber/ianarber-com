import React, { useEffect, useState } from "react";

import ListenPageContainer from "./listen/Container";
import ClientPageContainer from "./clientarea/Container";

const BasePage = () => {
  const [basePage, setBasePage] = useState(null);

  useEffect(() => {
    const { pathname } = window.location;
    const cleanPathname = pathname.replaceAll("/", "");
    let basePage = null;

    if (cleanPathname === "listen") {
      basePage = <ListenPageContainer />;
    } else if (pathname === "reel") {
      basePage = <ClientPageContainer />;
    }

    setBasePage(basePage);
  }, []);

  return basePage;
};

export default BasePage;
