import React from "react";

interface Props {
  title: string;
  image: string;
  description: string;
}

const CustomCard: React.FC<Props> = ({ title, image, description }) => {
  return (
    <li className="concept">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </li>
  );
};

export default CustomCard;
