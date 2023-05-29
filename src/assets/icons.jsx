import { h } from "preact"

const WindTurbineLoading = () => {
  return (
    <div className="flex flex-row items-center rounded-xl bg-sky-lightest bg-opacity-40 py-1 pr-7 pl-3">
      <div className="relative h-[60px] w-[60px] -translate-y-2 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 125 125"
          className="absolute z-10 animate-spin-slow"
        >
          <circle
            strokeWidth={3}
            stroke="#000"
            fill="none"
            cx="62.5"
            cy="62.5"
            r="5.33"
          />
          <circle fill="none" cx="62.5" cy="62.5" r="37.5" />
          <path
            stroke="#000"
            fill="none"
            strokeWidth={3}
            d="M67.83 62.5H100s-3.2-6.89-19.64-6.49c-7.42.18-11.84 1.28-14.43 2.4M59.63 58.01 43.42 30.22s-4.34 6.23 4.29 20.23c3.89 6.31 7.23 9.71 9.5 11.39M59.9 67.16 43.77 95.08s7.56.68 15.44-13.76c3.55-6.51 4.82-11.01 5.14-13.82"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 125 125"
          className="relative z-0"
        >
          <path
            strokeWidth={3}
            fill="none"
            stroke="#000"
            d="m60.26 67.97-3.7 55.5h11.88l-3.89-55.43"
            shapeRendering="geometricPrecision"
          />
        </svg>
      </div>
      <div className="text-lg font-semibold">Wird geladen ...</div>
    </div>
  )
}

const WindTurbine = () => {
  return (
    <div className="relative h-[62px] w-[62px] -translate-y-2 overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 125 125"
        className="absolute z-10 animate-spin-slow"
      >
        <circle
          strokeWidth={3}
          stroke="#fff"
          fill="none"
          cx="62.5"
          cy="62.5"
          r="5.33"
        />
        <circle fill="none" cx="62.5" cy="62.5" r="37.5" />
        <path
          stroke="#fff"
          fill="none"
          strokeWidth={3}
          d="M67.83 62.5H100s-3.2-6.89-19.64-6.49c-7.42.18-11.84 1.28-14.43 2.4M59.63 58.01 43.42 30.22s-4.34 6.23 4.29 20.23c3.89 6.31 7.23 9.71 9.5 11.39M59.9 67.16 43.77 95.08s7.56.68 15.44-13.76c3.55-6.51 4.82-11.01 5.14-13.82"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 125 125"
        className="relative z-0"
      >
        <path
          strokeWidth={3}
          fill="none"
          stroke="#fff"
          d="m60.26 67.97-3.7 55.5h11.88l-3.89-55.43"
          shapeRendering="geometricPrecision"
        />
      </svg>
    </div>
  )
}

export { WindTurbineLoading, WindTurbine }
