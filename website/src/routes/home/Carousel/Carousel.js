import React from "react";
import { Carousel as AntCarousel } from "antd";

import woman from "./joshua-rawson-harris-YNaSz-E7Qss-unsplash.jpg";
import hatAndShortsGuy from "./nielson-caetano-salmeron-AQql9zLz9mk-unsplash.jpg";
import coolDude from "./aiman-zenn-CVU_BwsEoJg-unsplash.jpg";
import dinosaurs from "./anton-nikolov-OxkCAkVYbwU-unsplash.jpg";

const images = [
  {
    alt: "Woman selecting packed food",
    src: woman,
    attribution: "Photo by Joshua Rawson on Unsplash",
  },
  {
    alt: "A guy wearing a hat and shorts in a supermarket",
    src: hatAndShortsGuy,
    attribution: "Photo by Nielson Caetano-Salmeron on Unsplash",
  },
  {
    alt: "Man squatting on floor between grocery items",
    src: coolDude,
    attribution: "Photo by Aiman Zenn on Unsplash",
  },
  {
    alt: "Some royalty-free dinosaurs. Nice",
    src: dinosaurs,
    attribution: "Photo by Anton Nikolov on Unsplash",
  },
];

const Image = ({ src, alt, attribution }) => (
  <div style={{ position: "relative", textAlign: "center" }}>
    <img
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height: "auto",
      }}
    ></img>
    <div style={{ position: "absolute", bottom: 8, right: 16 }}>
      {attribution}
    </div>
  </div>
);

const Carousel = () => (
  <AntCarousel autoplay>
    {images.map((image) => (
      <Image {...image} />
    ))}
  </AntCarousel>
);

export default Carousel;
