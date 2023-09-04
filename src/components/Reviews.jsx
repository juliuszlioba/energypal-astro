import { h, Fragment } from "preact";
import Carousel from "./Carousel";

const reviews = [
  {
    id: "1",
    name: "Anna",
    score: "10",
    review:
      "Dank der großartigen Hilfe vom Energypal-Team spare ich jetzt jede Menge Kosten! Vielen Dank für die nette Beratung!",
    image: "/assets/images/person-1_150x150.jpg",
  },
  {
    id: "2",
    name: "Waltraud",
    score: "10",
    review:
      "Als Pensionistin ist das Geld bei mir öfter knapp. Ich hätte es nie gedacht, dass ein Wechsel so einfach ist!",
    image: "/assets/images/person-2_150x150.jpg",
  },
  {
    id: "3",
    name: "Daniel",
    score: "10",
    review:
      "Vielen Dank für die nette Beratung! Unkompliziert und einfach. Ich spare jeden Monat Geld. Ich wünschte ich hätte schon eher gewechselt.",
    image: "/assets/images/person-3_150x150.jpg",
  },
  {
    id: "4",
    name: "Weber",
    score: "10",
    review:
      "Kompetent und unkompliziert. Wir sind sehr zufrieden mit der Beratung und können EnergyPal uneingeschränkt weiterempfehlen!",
    image: "/assets/images/person-4_150x150.jpg",
  },
];

export default function Reviews() {
  return (
    <div className="py-12 drop-shadow-flat-light">
      <Carousel>
        {reviews.map((review, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-6 rounded-lg bg-white py-16 px-6 md:flex-row md:px-12 md:py-24 lg:px-24"
            >
              <div className="drop-shadow-flat-light">
                <img src={review.image} className="rounded-full" />
              </div>
              <div className="text-center md:text-left">
                <div className="flex justify-center gap-2 md:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="h-6 w-6 text-yellow-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="h-6 w-6 text-yellow-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="h-6 w-6 text-yellow-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="h-6 w-6 text-yellow-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="h-6 w-6 text-yellow-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </div>
                <p className="mt-4 max-w-prose md:text-lg">{review.review}</p>
                <p className="mt-4 max-w-prose text-primary">
                  &#8212; {review.name}
                </p>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
