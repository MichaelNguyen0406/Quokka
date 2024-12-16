import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import LayoutDefault from "./components/layouts/layoutDefault";
import { Fragment } from "react";

function App() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        let Layout = LayoutDefault;
        if (route.layout) {
          Layout = route.layout;
        } else if (route.layout === null) {
          Layout = Fragment;
        }
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
