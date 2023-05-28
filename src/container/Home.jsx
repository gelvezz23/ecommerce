import Card from "../components/Card";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <div>
      <Carousel />
      <div className="container text-center">
        {" "}
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Home;
