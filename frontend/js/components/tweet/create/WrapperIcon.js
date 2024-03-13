import { Icon } from "../Icon.js";

export function WrapperIcon() {
  return `
    <!-- Tweet icons with hover animation -->
        ${Icon({ src: "twwets/circle.svg", alt: "circle" })}
        ${Icon({ src: "twwets/filter.svg", alt: "filter" })}
        ${Icon({ src: "twwets/calendar.svg", alt: "calendar" })}
        ${Icon({ src: "twwets/location.svg", alt: "location" })}
        ${Icon({ src: "twwets/information.svg", alt: "information" })}
        `;
}
