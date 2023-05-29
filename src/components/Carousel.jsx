import { h, Fragment } from "preact"
import { useState } from "preact/compat"
import { BsChevronRight, BsChevronLeft } from "react-icons/bs/index"

export default function Slider({ children }) {
  const [index, setIndex] = useState(0)

  const nextSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1
      if (index > children.length - 1) {
        index = 0
      }
      return index
    })
  }

  const prevSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex - 1
      if (index < 0) {
        index = children.length - 1
      }
      return index
    })
  }

  const goToSlide = (slide) => {
    setIndex(slide)
  }

  return (
    <>
      <div className="flex justify-center">
        <button className="hidden pr-2 md:pr-6 lg:block" onClick={prevSlide}>
          <BsChevronLeft className="h-10 w-10 rounded-2xl bg-sky p-2 text-xl text-primary hover:bg-complimentary" />
        </button>
        <div className="carousel-container relative flex flex-col">
          <div className="relative flex flex-col">
            <div className="h-full overflow-hidden">
              <div className={`carousel-content grid grid-cols-1`}>
                {children.map((child, itemIndex) => {
                  let position = "opacity-0 pointer-events-none"
                  if (itemIndex === index) {
                    position = "opacity-100"
                  }
                  if (
                    itemIndex === index - 1 ||
                    (index === 0 && itemIndex === children.length - 1)
                  ) {
                    position = "opacity-0 pointer-events-none"
                  }

                  return (
                    <div
                      className={`col-start-1 row-start-1 w-full shrink-0 grow duration-300 ${position}`}
                      key={itemIndex}
                    >
                      {child}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <button className="hidden pl-2 md:pl-6 lg:block" onClick={nextSlide}>
          <BsChevronRight className="h-10 w-10 rounded-2xl bg-sky p-2 text-xl text-primary hover:bg-complimentary" />
        </button>
      </div>
      <div className="mt-8 flex w-full items-center justify-center gap-4">
        <button className="pr-2 md:pr-6 lg:hidden" onClick={prevSlide}>
          <BsChevronLeft className="h-10 w-10 rounded-2xl bg-sky p-2 text-xl text-primary hover:bg-complimentary" />
        </button>
        <div className="flex items-center justify-center gap-4">
          {children.map((item, itemIndex) => {
            return (
              <button
                key={itemIndex}
                onClick={() => goToSlide(itemIndex)}
                className={`h-4 w-4 rounded-full hover:bg-complimentary ${
                  itemIndex === index ? "bg-primary" : "bg-sky"
                }`}
              ></button>
            )
          })}
        </div>
        <button className="pl-2 md:pl-6 lg:hidden" onClick={nextSlide}>
          <BsChevronRight className="h-10 w-10 rounded-2xl bg-sky p-2 text-xl text-primary hover:bg-complimentary" />
        </button>
      </div>
    </>
  )
}
