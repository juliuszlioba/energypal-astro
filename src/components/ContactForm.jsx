import { h, Fragment } from "preact"
import { useForm } from "react-hook-form"
import { useState } from "preact/compat"
import { BsCheck2Circle } from "react-icons/bs"

import { WindTurbine } from "../assets/icons"

export default function ContactForm() {
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const sendData = async (dataLoad) => {
    // console.log({
    //   url: `${__WORDPRESS_API_BASE_URL__}/wp-json/api/v1/enquiry/`,
    //   data: dataLoad,
    // })

    setLoading(true)

    //! TO-DO
    fetch(`${__WORDPRESS_API_BASE_URL__}/wp-json/api/v1/enquiry/`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataLoad),
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false)
        if (result.status === "ok") {
          setSuccess(true)
        }
        return setSubmitError(true)
      })
      .catch((error) => {
        setLoading(false)
        setSubmitError(true)
        console.log(error)
      })
  }

  const onSubmit = () => {
    //Prepare data
    const dataLoad = {
      name: getValues("name"),
      telefonnummer: getValues("phone"),
      email: getValues("email"),
      nachricht: getValues("message"),
    }

    return sendData(dataLoad)
  }

  return (
    <>
      {success ? (
        <div className="grid w-full grid-cols-1 items-center gap-4 py-12">
          <div className="flex items-center gap-4 rounded-lg bg-secondary p-8 text-white">
            <BsCheck2Circle className="h-8 w-8 shrink-0" />
            <span>
              <p class="pb-2 lg:text-xl">
                Ihre nachricht wurde erfolgreich gesendet. Wir melden uns in
                kürze bei Ihnen.
              </p>
              <p class="lg:text-xl">
                Freundliche Grüße
                <br /> Ihr Energypal-Team
              </p>
            </span>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 items-center gap-4 py-12 md:grid-cols-2 lg:grid-cols-6"
        >
          <div className="col-span-6 lg:col-span-2">
            <input
              placeholder="Name"
              {...register("name", {
                required: true,
                minLength: 2,
                pattern: /^[\p{L} ,.'-]+$/u,
              })}
              type="text"
              className={`w-full rounded-xl border border-transparent font-semibold focus:border-primary focus:ring-2 focus:ring-primary lg:rounded-lg lg:p-3 lg:px-4 xl:text-xl ${
                errors.name
                  ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                  : "border-transparent focus:border-primary focus:ring-primary"
              }`}
            />
            {errors.name && (
              <div className="px-4 pt-2 text-red-600 md:col-span-2 md:col-start-2">
                Bitte geben Sie eine gültige Name an.
              </div>
            )}
          </div>
          <div className="col-span-6 lg:col-span-2">
            <input
              placeholder="Telefon"
              {...register("phone", {
                pattern:
                  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{1,3})[-. )]*(\d{3})[-. ]*(\d{1,6})(?: *x(\d+))?\s*$/i,
              })}
              type="text"
              inputMode="tel"
              className={`w-full rounded-xl border border-transparent font-semibold drop-shadow-flat-light focus:border-primary focus:ring-2 focus:ring-primary lg:rounded-lg lg:p-3 lg:px-4  xl:text-xl ${
                errors.phone
                  ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                  : "border-transparent focus:border-primary focus:ring-primary"
              }`}
            />
            {errors.phone && (
              <div className="px-4 pt-2 text-red-600 md:col-span-2 md:col-start-2">
                Bitte geben Sie eine gültige Telefonnummer an.
              </div>
            )}
          </div>
          <div className="col-span-6 lg:col-span-2">
            <input
              placeholder="E-Mail"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
              })}
              type="email"
              inputMode="email"
              className={`w-full rounded-xl border border-transparent font-semibold drop-shadow-flat-light focus:border-primary focus:ring-2 focus:ring-primary lg:rounded-lg lg:p-3 lg:px-4  xl:text-xl ${
                errors.email
                  ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                  : "border-transparent focus:border-primary focus:ring-primary"
              }`}
            />
            {errors.email && (
              <div className="px-4 pt-2 text-red-600 md:col-span-2 md:col-start-2">
                Ungültige E-Mail-Adresse.
              </div>
            )}
          </div>
          <div className="col-span-6 lg:col-span-6">
            <textarea
              placeholder="Nachricht"
              {...register("message", {
                required: true,
              })}
              type="text"
              rows={5}
              className={`w-full rounded-xl border border-transparent font-semibold  drop-shadow-flat-light  focus:ring-2 lg:rounded-lg lg:p-3 lg:px-4  xl:text-xl ${
                errors.message
                  ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                  : "border-transparent focus:border-primary focus:ring-primary"
              }`}
            />
            {errors.message && (
              <div className="px-4 pt-2 text-red-600 md:col-span-2 md:col-start-2">
                Bitte ausfüllen.
              </div>
            )}
          </div>
          <div className="col-span-6 lg:col-span-4">
            <label className="flex gap-3">
              <input
                {...register("consent", { required: true })}
                type="checkbox"
                className="mt-1 h-6 w-6 rounded border border-primary p-0 text-primary"
              />
              <div>
                <div className="text-left text-sm font-semibold">
                  Ich erkläre mich einverstanden, dass meine oben angegebenen
                  personenbezogenen Daten zu Beratungszwecken genutzt werden.{" "}
                  <a
                    href="/datenschutz/"
                    className="text-primary hover:text-complimentary"
                    target="_blank"
                  >
                    Datenschutz
                  </a>
                  .
                </div>
                {errors.consent && (
                  <div className="pt-2 text-left text-red-600">
                    Bitte akzeptieren Sie die Datenschutzbestimmungen, damit wir
                    Ihre Daten in unser System übernehmen können.
                  </div>
                )}
              </div>
            </label>
          </div>
          <div className="col-span-6 lg:col-span-2">
            <button
              className="flex w-full items-center rounded-lg bg-secondary p-4 font-semibold text-white hover:bg-complimentary hover:text-primary xl:text-2xl"
              disabled={loading}
            >
              {loading && <WindTurbine />}
              {loading ? "Wird geladen ..." : "Absenden"}
            </button>
          </div>
        </form>
      )}
    </>
  )
}
