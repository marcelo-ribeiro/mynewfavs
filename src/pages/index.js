import { AuthCheck } from "reactfire";
import Favs from "./favs";
import Layout from "./layout";

const Home = () => {
  return (
    <Layout>
      <AuthCheck>
        <Favs />
      </AuthCheck>
    </Layout>
  );
};

export default Home;
