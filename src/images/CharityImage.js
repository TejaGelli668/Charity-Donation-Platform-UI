import React from "react";
import HealthCareImage from "./health_care.jpeg";
import EducationImage from "./education.avif";
import ElderlyCareImage from "./elderly_care.jpeg";

export const imageMap = {
  Education: EducationImage,
  "Elderly Care": ElderlyCareImage,
  Healthcare: HealthCareImage,
};

const CharityImage = ({
  category,
  style = { height: 200, width: 400 },
  alt,
}) => {
  const Image = imageMap[category];
  return <img src={Image} style={style} alt={alt || category} />;
};

export default CharityImage;
