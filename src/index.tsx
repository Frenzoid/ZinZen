import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import * as serviceWorkerRegistration from "./service-worker/serviceWorkerRegistration";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
