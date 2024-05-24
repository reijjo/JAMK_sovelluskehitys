import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/index.css";
import { Provider } from "react-redux";
import store from "./utils/store.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
