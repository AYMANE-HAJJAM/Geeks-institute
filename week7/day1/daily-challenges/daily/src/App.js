import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function App() {
  const images = [
    {
      url: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp",
      caption: "Hong Kong"
    },
    {
      url: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp",
      caption: "Macao"
    },
    {
      url: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp",
      caption: "Japan"
    },
    {
      url: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg",
      caption: "Las Vegas"
    }
  ];

  return (
    <div className="container mt-4 text-center">
      <Carousel
        showArrows={true}
        showThumbs={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        stopOnHover={false}
        showStatus={false}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-image w-100 h-100">
            <img src={image.url} alt={image.caption} />
            <p className="legend">{image.caption}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
