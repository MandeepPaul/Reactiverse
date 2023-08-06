import React from "react";
import PageHeader from "./components/PageHeader";
import CustomCard from "./components/CustomCard";

import componentsImage from "./assets/images/components.png";
import stateImage from "./assets/images/state.png";
import eventsImage from "./assets/images/events.png";

interface Concept {
  title: string;
  image: string;
  description: string;
}

const concepts: Concept[] = [
  {
    title: "Components",
    image: componentsImage,
    description:
      "Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Components can receive data via props, and they can render dynamic output using JSX.",
  },
  {
    title: "State",
    image: stateImage,
    description:
      "State is data that may change over time. As it changes, the UI should be updated to reflect the updated data. Each component can maintain its own state and multiple components can share state.",
  },
  {
    title: "Events",
    image: eventsImage,
    description:
      "Event handlers are added via props to (built-in) components. You pass functions as values to such event handlers to control which functions get executed for which event.",
  },
];

const App: React.FC = () => {
  return (
    <div>
      <PageHeader />
      <ul id="concepts">
        <CustomCard
          title={concepts[0].title}
          image={concepts[0].image}
          description={concepts[0].description}
        />
        <CustomCard
          title={concepts[1].title}
          image={concepts[1].image}
          description={concepts[1].description}
        />
        <CustomCard
          title={concepts[2].title}
          image={concepts[2].image}
          description={concepts[2].description}
        />
      </ul>
    </div>
  );
};

export default App;
