import { h, Fragment } from "preact"
import Carousel from "./Carousel"

import { BsStarFill } from "react-icons/bs"

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
]

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
                  <BsStarFill className="h-6 w-6 text-yellow-400" />
                  <BsStarFill className="h-6 w-6 text-yellow-400" />
                  <BsStarFill className="h-6 w-6 text-yellow-400" />
                  <BsStarFill className="h-6 w-6 text-yellow-400" />
                  <BsStarFill className="h-6 w-6 text-yellow-400" />
                </div>
                <p className="mt-4 max-w-prose md:text-lg">{review.review}</p>
                <p className="mt-4 max-w-prose text-primary">
                  &#8212; {review.name}
                </p>
              </div>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}
