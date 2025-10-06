import Header from "./components/header";
import Card from "./components/card";
import Contact from "./components/contact";

// Import Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faGlobe, faUniversity } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="font-sans">
      <Header />

      <div className="flex flex-col gap-6 m-6">
        <Card
          icon={<FontAwesomeIcon icon={faBuilding} />}
          title="About the Company"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <Card
          icon={<FontAwesomeIcon icon={faGlobe} />}
          title="Our Values"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <Card
          icon={<FontAwesomeIcon icon={faUniversity} />}
          title="Our Mission"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </div>

      <Contact />
    </div>
  );
}

export default App;
