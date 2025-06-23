import {createFileRoute} from "@tanstack/react-router";
import Intro from "../components/intro";
import HowToOrder from "../components/how-to-order";
import Navbar from "../components/navbar";
import OurMenu from "../components/our-menu";
import Locator from "../components/locator";
import Footer from "../components/footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div id="main">
      <Navbar />
      <div id="intro">
        <Intro />
      </div>
      <div id="how-to-order">
        <HowToOrder />
      </div>
      <div id="our-menu">
        <OurMenu />
      </div>
      <div id="locator">
        <Locator />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
