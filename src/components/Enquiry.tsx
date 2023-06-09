import { h, Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/compat";
import { useForm, SubmitHandler } from "react-hook-form";
import { Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";

import { WindTurbine } from "../assets/icons";

type Inputs = {
  access_key: string;
  botcheck: boolean;
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
  kwh_gas: number;
  kwh_electricity: number;
  plz: number;
};

export default function Enquiry({ version = "" }) {
  const {
    register,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [openForm, setOpenForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [hausholdPersons, setHausholdPersons] = useState(0);
  const [hausholdSize, setHausholdSize] = useState(0);

  const [defaultTab, setDefaultTab] = useState(0);

  const formRef = useRef(null);

  useEffect(() => {
    register("kwh_gas", {
      required: true,
      pattern: /^[0-9]+$/i,
      value: 0,
    });
    register("kwh_electricity", {
      required: true,
      pattern: /^[0-9]+$/i,
      value: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendData = async (dataLoad: any) => {
    setLoading(true);

    fetch(import.meta.env.PUBLIC_MAILER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataLoad, null, 2),
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        if (result.status === "ok") {
          setSuccess(true);
        }
        return setSubmitError(true);
      })
      .catch((error) => {
        setLoading(false);
        setSubmitError(true);
        console.log(error);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    //Prepare data
    const dataLoad = {
      plz: data.plz,
      telefonnummer: data.phone,
      email: data.email,
      strom_haushaltgroesse: hausholdPersons,
      strom_jahresverbrauch: data.kwh_electricity,
      gas_haushaltgroesse: hausholdSize,
      gas_jahresverbrauch: data.kwh_gas,
      access_key: data.access_key,
      botcheck: data.botcheck,
    };

    return sendData(dataLoad);
  };

  const handleInputChange = (value: string) => {
    if (value.length > 0 && !openForm) {
      setOpenForm(true);
    }
  };

  const handleHausholdPersonsChange = ({
    action,
  }: {
    action: "add" | "subtract";
  }) => {
    const currentHausholdPersons = hausholdPersons;

    if (action === "add") {
      setHausholdPersons(hausholdPersons + 1);
      setValue("kwh_electricity", (currentHausholdPersons + 1) * 1300);
    }
    if (action === "subtract" && hausholdPersons > 0) {
      setHausholdPersons(hausholdPersons - 1);
      setValue("kwh_electricity", (currentHausholdPersons - 1) * 1300);
    }
    return;
  };

  const handleHausholdSizeChange = ({
    action,
  }: {
    action: "add" | "subtract";
  }) => {
    const currentHausholdSize = hausholdSize;

    if (action === "add") {
      setHausholdSize(hausholdSize + 30);
      setValue("kwh_gas", (currentHausholdSize + 30) * 140);
    }
    if (action === "subtract" && hausholdSize > 29) {
      setHausholdSize(hausholdSize - 30);
      setValue("kwh_gas", (currentHausholdSize - 30) * 140);
    }
    return;
  };

  const handleHausholdSizeManualChange = ({ value }: { value: any }) => {
    console.log(parseInt(value));

    if (!value) {
      setValue("kwh_gas", 0);
      trigger("kwh_gas");
      return;
    }

    setHausholdSize(parseInt(value));
    setValue("kwh_gas", parseInt(value) * 140);
    trigger("kwh_gas");
    return;
  };

  const handleConsumptionManualChange = ({
    value,
    type,
  }: {
    value: any;
    type: any;
  }) => {
    type === "gas" && setValue("kwh_gas", parseInt(value));
    type === "gas" && trigger("kwh_gas");
    type === "electricity" && setValue("kwh_electricity", parseInt(value));
    type === "electricity" && trigger("kwh_electricity");
    return;
  };

  if (version === "form-long") {
    return (
      <>
        {success ? (
          <div className="grid w-full grid-cols-1 items-center gap-4 py-12">
            <div className="flex items-center gap-4 rounded-lg bg-secondary p-8 text-white">
              {/* prettier-ignore */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 shrink-0" > <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="hidden"
              {...register("access_key", {
                value: import.meta.env.PUBLIC_MAILER_API_KEY,
              })}
            />
            <input
              type="checkbox"
              id=""
              className="hidden"
              style={{ display: "none" }}
              {...register("botcheck")}
            ></input>
            <div class="grid grid-cols-6 items-center gap-8 py-12">
              <div className="col-span-full rounded-xl bg-sky-lightest bg-opacity-50 md:col-span-3 xl:col-span-2">
                <Tab.Group>
                  <Tab.List className="flex">
                    <Tab as={Fragment}>
                      {({ selected }: { selected: any }) => (
                        <button
                          className={`inline-flex w-full items-center gap-3 rounded-t-xl px-6 pb-4 pt-5 ${
                            selected
                              ? "bg-sky-lightest text-primary hover:bg-complimentary hover:text-primary"
                              : "bg-transparent text-primary hover:bg-complimentary hover:text-primary"
                          }`}
                        >
                          {/* prettier-ignore */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                          </svg>
                          <span className="text-xl font-semibold">Strom</span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }: { selected: any }) => (
                        <button
                          className={`inline-flex w-full items-center gap-3 rounded-t-xl px-6 pb-4 pt-5 ${
                            selected
                              ? "bg-sky-lightest text-primary hover:bg-complimentary hover:text-primary"
                              : "bg-transparent text-primary hover:bg-complimentary hover:text-primary"
                          }`}
                        >
                          {/* prettier-ignore */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                          </svg>
                          <span className="text-xl font-semibold">Gas</span>
                        </button>
                      )}
                    </Tab>
                  </Tab.List>

                  <Tab.Panels>
                    <Tab.Panel>
                      <div className="flex flex-col gap-4 rounded-b-xl rounded-tr-xl bg-sky-lightest px-6 py-5">
                        <p class="mt-4 text-center text-lg font-semibold text-secondary md:text-left lg:text-2xl">
                          Ihr Jahresverbrauch
                        </p>
                        <p class="whitespace-nowrap text-left font-semibold text-primary xl:text-xl">
                          Haushaltgröße
                        </p>
                        <div class="flex items-center justify-between rounded-xl border border-transparent bg-white drop-shadow-flat-light">
                          <button
                            className="rounded-l-xl p-3 hover:bg-complimentary lg:px-4"
                            // @ts-ignore
                            onCLick={(e) => {
                              e.preventDefault();
                              handleHausholdPersonsChange({
                                action: "subtract",
                              });
                            }}
                          >
                            {/* prettier-ignore */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>
                          </button>
                          <p className="font-semibold lg:p-3 xl:text-xl">
                            {hausholdPersons}{" "}
                            {hausholdPersons > 1 ? "Personen" : "Person"}
                          </p>
                          <button
                            className="rounded-r-xl p-3 hover:bg-complimentary lg:px-4"
                            // @ts-ignore
                            onCLick={(e) => {
                              e.preventDefault();
                              handleHausholdPersonsChange({ action: "add" });
                            }}
                          >
                            {/* prettier-ignore */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </button>
                        </div>
                        <p class="whitespace-nowrap text-left font-semibold text-primary xl:text-xl">
                          Jahresverbrauch (KwH)
                        </p>
                        <div>
                          <input
                            placeholder="KwH"
                            type="number"
                            inputMode="numeric"
                            className={`w-full rounded-xl border border-transparent text-center font-semibold drop-shadow-flat-light focus:border-primary focus:ring-2 focus:ring-primary lg:rounded-lg lg:p-3 lg:px-4 xl:text-xl ${
                              errors.plz
                                ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                                : "border-transparent focus:border-primary focus:ring-primary"
                            }`}
                            value={getValues("kwh_electricity") || ""}
                            onChange={(e) => {
                              handleConsumptionManualChange({
                                type: "electricity",
                                // @ts-ignore
                                value: e.target.value,
                              });
                            }}
                          />
                          {errors.kwh_electricity && (
                            <div className="pt-1 text-left text-sm text-red-600">
                              Bitte geben Sie eine gültige Nummer an.
                            </div>
                          )}
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="flex flex-col gap-4 rounded-b-xl rounded-tl-xl bg-sky-lightest px-6 py-5">
                        <p class="mt-4 text-center text-lg font-semibold text-secondary md:text-left lg:text-2xl">
                          Ihr Jahresverbrauch
                        </p>
                        <p class="whitespace-nowrap text-left font-semibold text-primary xl:text-xl">
                          Haushaltgröße
                        </p>
                        <div class="flex items-center justify-between rounded-xl bg-white drop-shadow-flat-light">
                          <button
                            className="rounded-l-xl p-3 hover:bg-complimentary lg:px-4"
                            // @ts-ignore
                            onCLick={(e: any) => {
                              e.preventDefault();
                              handleHausholdSizeChange({ action: "subtract" });
                            }}
                          >
                            {/* prettier-ignore */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>
                          </button>
                          <div className="inline-flex items-center">
                            <input
                              value={hausholdSize || 0}
                              type="number"
                              inputMode="numeric"
                              className="w-1/2 border-transparent px-0 text-right font-semibold lg:py-3 xl:text-xl"
                              onChange={(e) => {
                                // @ts-ignore
                                if (e.target.value > 0) {
                                  handleHausholdSizeManualChange({
                                    // @ts-ignore
                                    value: e.target.value,
                                  });
                                }
                              }}
                            />
                            <p className="w-1/2 text-left font-semibold xl:text-xl">
                              m&#178;
                            </p>
                          </div>
                          <button
                            className="rounded-r-xl p-3 hover:bg-complimentary lg:px-4"
                            // @ts-ignore
                            onCLick={(e) => {
                              e.preventDefault();
                              handleHausholdSizeChange({ action: "add" });
                            }}
                          >
                            {/* prettier-ignore */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </button>
                        </div>
                        <p class="whitespace-nowrap text-left font-semibold text-primary xl:text-xl">
                          Jahresverbrauch (KwH)
                        </p>
                        <div>
                          <input
                            placeholder="KwH"
                            type="number"
                            inputMode="numeric"
                            className={`w-full rounded-xl border border-transparent text-center font-semibold drop-shadow-flat-light focus:border-primary focus:ring-2 focus:ring-primary lg:rounded-lg lg:p-3 lg:px-4 xl:text-xl`}
                            value={getValues("kwh_gas") || ""}
                            onChange={(e) => {
                              handleConsumptionManualChange({
                                type: "gas",
                                // @ts-ignore
                                value: e.target.value,
                              });
                            }}
                          />
                          {errors.kwh_gas && (
                            <div className="pt-1 text-left text-sm text-red-600">
                              Bitte geben Sie eine gültige Nummer an.
                            </div>
                          )}
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>

              <div className="col-span-full grid grid-cols-1 items-center gap-4 md:col-span-3 md:grid-cols-2 lg:grid-cols-5 xl:col-span-4">
                <div className="md:col-span-2">
                  <input
                    placeholder="PLZ"
                    {...register("plz", {
                      required: true,
                      minLength: 4,
                      maxLength: 4,
                      pattern: /^[0-9]+$/i,
                    })}
                    type="text"
                    inputMode="numeric"
                    className={`w-full rounded-xl border border-transparent font-semibold drop-shadow-flat-light focus:border-primary focus:ring-2 focus:ring-primary lg:rounded-lg lg:p-3 lg:px-4 xl:text-xl ${
                      errors.plz
                        ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                        : "border-transparent focus:border-primary focus:ring-primary"
                    }`}
                  />
                  {errors.plz && (
                    <div className="pt-1 text-left text-sm text-red-600">
                      Bitte geben Sie eine 4-stellige PLZ an.
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <input
                    placeholder="Telefonnummer"
                    {...register("phone", {
                      pattern:
                        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{1,3})[-. )]*(\d{3})[-. ]*(\d{1,6})(?: *x(\d+))?\s*$/i,
                    })}
                    type="text"
                    inputMode="tel"
                    className={`w-full rounded-xl border border-transparent font-semibold drop-shadow-flat-light focus:border-primary focus:ring-2 focus:ring-primary lg:rounded-lg lg:p-3 lg:px-4 xl:text-xl ${
                      errors.phone
                        ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                        : "border-transparent focus:border-primary focus:ring-primary"
                    }`}
                  />
                  {errors.phone && (
                    <div className="pt-1 text-left text-sm text-red-600">
                      Bitte geben Sie eine gültige Telefonnummer an.
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 lg:col-span-5">
                  <input
                    placeholder="E-Mail"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                    })}
                    type="email"
                    inputMode="email"
                    className={`w-full rounded-xl border border-transparent font-semibold drop-shadow-flat-light focus:border-primary focus:ring-2 focus:ring-primary lg:rounded-lg lg:p-3 lg:px-4 xl:text-xl ${
                      errors.email
                        ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                        : "border-transparent focus:border-primary focus:ring-primary"
                    }`}
                  />
                  {errors.email && (
                    <div className="pt-1 text-left text-sm text-red-600">
                      Ungültige E-Mail-Adresse.
                    </div>
                  )}
                </div>

                <div className="md:col-span-3">
                  <label className="flex gap-3">
                    <input
                      {...register("consent", { required: true })}
                      type="checkbox"
                      className="mt-1 h-6 w-6 rounded border border-primary p-0 text-primary"
                    />
                    <div>
                      <div className="text-left text-sm font-semibold">
                        Ich erkläre mich einverstanden, dass meine oben
                        angegebenen personenbezogenen Daten zu Beratungszwecken
                        genutzt werden.{" "}
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
                        <div className="pt-1 text-left text-sm text-red-600">
                          Bitte akzeptieren Sie die Datenschutzbestimmungen,
                          damit wir Ihre Daten in unser System übernehmen
                          können.
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <button
                    className="flex items-center rounded-xl bg-secondary p-4 font-semibold text-white hover:bg-complimentary hover:text-primary xl:text-2xl"
                    disabled={loading}
                  >
                    {loading && <WindTurbine />}
                    {loading
                      ? "Wird geladen ..."
                      : "Sparpotential berechnen lassen"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </>
    );
  }

  return (
    <>
      {success ? (
        <div
          className={`flex flex-col gap-3 rounded-lg border border-primary bg-secondary px-6 py-5`}
        >
          <div className="flex items-center justify-center gap-3 text-white md:justify-start">
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 shrink-0" > <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
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
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <input
            type="hidden"
            {...register("access_key", {
              value: import.meta.env.PUBLIC_MAILER_API_KEY,
            })}
          />
          <input
            type="checkbox"
            id=""
            className="hidden"
            style={{ display: "none" }}
            {...register("botcheck")}
          ></input>

          <div class="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            {!openForm ? (
              <div
                className={`flex w-full rounded-xl border border-sky bg-sky-lightest md:flex-col xl:flex-row ${
                  openForm ? "md:w-1/2 xl:w-1/3" : "md:w-1/3"
                } `}
              >
                <button
                  className={`inline-flex w-full items-center gap-3 rounded-xl bg-transparent px-6 py-5 text-primary hover:bg-complimentary hover:text-primary xl:py-8`}
                  onClick={(e) => {
                    e.preventDefault();
                    setDefaultTab(0);
                    setOpenForm(true);
                  }}
                >
                  {/* prettier-ignore */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  <span className="text-xl font-semibold">Strom</span>
                </button>
                <button
                  className={`inline-flex w-full items-center gap-3 rounded-xl bg-transparent px-6 py-5 text-primary hover:bg-complimentary hover:text-primary xl:py-8`}
                  onClick={(e) => {
                    e.preventDefault();
                    setDefaultTab(1);
                    setOpenForm(true);
                  }}
                >
                  {/* prettier-ignore */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                  </svg>
                  <span className="text-xl font-semibold">Gas</span>
                </button>
              </div>
            ) : (
              <div
                className={`rounded-xl bg-sky-lightest bg-opacity-50 ${
                  openForm ? "md:w-1/2 xl:w-1/3" : "md:w-1/3"
                }`}
              >
                <Tab.Group defaultIndex={defaultTab}>
                  <Tab.List className="flex">
                    <Tab as={Fragment}>
                      {({ selected }: { selected: any }) => (
                        <button
                          className={`inline-flex w-full items-center gap-3 rounded-t-xl px-6 pb-4 pt-5 ${
                            selected
                              ? "bg-sky-lightest text-primary hover:bg-complimentary hover:text-primary"
                              : "bg-transparent text-primary hover:bg-complimentary hover:text-primary"
                          }`}
                        >
                          {/* prettier-ignore */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                          </svg>
                          <span className="text-xl font-semibold">Strom</span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }: { selected: any }) => (
                        <button
                          className={`inline-flex w-full items-center gap-3 rounded-t-xl px-6 pb-4 pt-5 ${
                            selected
                              ? "bg-sky-lightest text-primary hover:bg-complimentary hover:text-primary"
                              : "bg-transparent text-primary hover:bg-complimentary hover:text-primary"
                          }`}
                        >
                          {/* prettier-ignore */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                          </svg>
                          <span className="text-xl font-semibold">Gas</span>
                        </button>
                      )}
                    </Tab>
                  </Tab.List>

                  <Tab.Panels>
                    <Tab.Panel>
                      <div className="flex flex-col gap-4 rounded-b-xl rounded-tr-xl bg-sky-lightest px-6 py-5">
                        <p class="mt-4 text-center text-lg font-semibold text-secondary md:text-left lg:text-2xl">
                          Ihr Jahresverbrauch
                        </p>
                        <p class="whitespace-nowrap text-left font-semibold text-primary xl:text-xl">
                          Haushaltgröße
                        </p>
                        <div class="flex items-center justify-between rounded-xl border border-transparent bg-white drop-shadow-flat-light">
                          <button
                            className="rounded-l-xl p-3 hover:bg-complimentary lg:px-4"
                            // @ts-ignore
                            onCLick={(e) => {
                              e.preventDefault();
                              handleHausholdPersonsChange({
                                action: "subtract",
                              });
                            }}
                          >
                            {/* prettier-ignore */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>
                          </button>
                          <p className="font-semibold lg:p-3 xl:text-xl">
                            {hausholdPersons}{" "}
                            {hausholdPersons > 1 ? "Personen" : "Person"}
                          </p>
                          <button
                            className="rounded-r-xl p-3 hover:bg-complimentary lg:px-4"
                            // @ts-ignore
                            onCLick={(e) => {
                              e.preventDefault();
                              handleHausholdPersonsChange({ action: "add" });
                            }}
                          >
                            {/* prettier-ignore */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </button>
                        </div>
                        <p class="whitespace-nowrap text-left font-semibold text-primary xl:text-xl">
                          Jahresverbrauch (KwH)
                        </p>
                        <div>
                          <input
                            placeholder="KwH"
                            type="number"
                            inputMode="numeric"
                            className={`w-full rounded-xl border border-transparent text-center font-semibold drop-shadow-flat-light focus:border-primary focus:ring-2 focus:ring-primary lg:rounded-lg lg:p-3 lg:px-4 xl:text-xl`}
                            value={getValues("kwh_electricity") || ""}
                            onChange={(e) => {
                              handleConsumptionManualChange({
                                type: "electricity",
                                // @ts-ignore
                                value: e.target.value,
                              });
                            }}
                          />
                          {errors.kwh_electricity && (
                            <div className="pt-1 text-left text-sm text-red-600">
                              Bitte geben Sie eine gültige Nummer an.
                            </div>
                          )}
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="flex flex-col gap-4 rounded-b-xl rounded-tl-xl bg-sky-lightest px-6 py-5">
                        <p class="mt-4 text-center text-lg font-semibold text-secondary md:text-left lg:text-2xl">
                          Ihr Jahresverbrauch
                        </p>
                        <p class="whitespace-nowrap text-left font-semibold text-primary xl:text-xl">
                          Haushaltgröße
                        </p>
                        <div class="flex items-center justify-between rounded-xl bg-white drop-shadow-flat-light">
                          <button
                            className="rounded-l-xl p-3 hover:bg-complimentary lg:px-4"
                            // @ts-ignore
                            onCLick={(e) => {
                              e.preventDefault();
                              handleHausholdSizeChange({ action: "subtract" });
                            }}
                          >
                            {/* prettier-ignore */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>
                          </button>
                          <div className="inline-flex items-center">
                            <input
                              value={hausholdSize || 0}
                              type="number"
                              inputMode="numeric"
                              className="w-1/2 border-transparent px-0 text-right font-semibold lg:py-3 xl:text-xl"
                              onChange={(e) => {
                                // @ts-ignore
                                if (e.target.value > 0) {
                                  handleHausholdSizeManualChange({
                                    // @ts-ignore
                                    value: e.target.value,
                                  });
                                }
                              }}
                            />
                            <p className="w-1/2 text-left font-semibold xl:text-xl">
                              m&#178;
                            </p>
                          </div>
                          <button
                            className="rounded-r-xl p-3 hover:bg-complimentary lg:px-4"
                            // @ts-ignore
                            onCLick={(e) => {
                              e.preventDefault();
                              handleHausholdSizeChange({ action: "add" });
                            }}
                          >
                            {/* prettier-ignore */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </button>
                        </div>
                        <p class="whitespace-nowrap text-left font-semibold text-primary xl:text-xl">
                          Jahresverbrauch (KwH)
                        </p>
                        <div>
                          <input
                            placeholder="KwH"
                            type="number"
                            inputMode="numeric"
                            className={`w-full rounded-xl border border-transparent text-center font-semibold drop-shadow-flat-light focus:border-primary focus:ring-2 focus:ring-primary lg:rounded-lg lg:p-3 lg:px-4 xl:text-xl ${
                              errors.plz
                                ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                                : "border-transparent focus:border-primary focus:ring-primary"
                            }`}
                            value={getValues("kwh_gas") || ""}
                            onChange={(e) => {
                              handleConsumptionManualChange({
                                type: "gas",
                                // @ts-ignore
                                value: e.target.value,
                              });
                            }}
                          />
                          {errors.kwh_gas && (
                            <div className="pt-1 text-left text-sm text-red-600">
                              Bitte geben Sie eine gültige Nummer an.
                            </div>
                          )}
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            )}

            <div
              className={`flex w-full flex-col gap-4 rounded-xl border border-sky bg-sky-lightest px-6 py-5 ${
                openForm ? "md:w-1/2 xl:w-2/3" : "md:w-2/3"
              }`}
            >
              <div className="grid grid-cols-12 items-start justify-center gap-3 md:justify-start">
                <div className="col-span-full md:col-span-4 xl:col-span-2">
                  <div className="inline-flex w-full items-center gap-3">
                    <input
                      {...register("plz", {
                        required: true,
                        minLength: 4,
                        maxLength: 4,
                        pattern: /^[0-9]+$/i,
                      })}
                      type="text"
                      placeholder="PLZ"
                      inputMode="numeric"
                      className={`w-full min-w-[7rem] shrink rounded-xl border border-transparent font-semibold drop-shadow-flat-light focus:ring-2 lg:p-3 lg:px-4 xl:text-xl ${
                        errors.plz
                          ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                          : "border-sky focus:border-primary focus:ring-primary"
                      }`}
                      onChange={(e) => {
                        // @ts-ignore
                        setValue("plz", e.target.value);
                        trigger("plz");
                        // @ts-ignore
                        handleInputChange(e.target.value);
                      }}
                    />
                  </div>
                  {errors.plz && (
                    <div className="pt-1 text-left text-sm text-red-600">
                      Bitte geben Sie eine{" "}
                      <span className="whitespace-nowrap">4-stellige</span> PLZ
                      an.
                    </div>
                  )}
                </div>

                <div className="col-span-full md:col-span-8 xl:col-span-4">
                  <div className="inline-flex w-full items-center gap-3">
                    <input
                      {...register("phone", {
                        pattern:
                          /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{1,3})[-. )]*(\d{3})[-. ]*(\d{1,6})(?: *x(\d+))?\s*$/i,
                      })}
                      type="text"
                      inputMode="tel"
                      placeholder="Rufnummer"
                      className={`w-full min-w-[7rem] shrink rounded-xl border border-transparent font-semibold drop-shadow-flat-light focus:ring-2 lg:p-3 lg:px-4 xl:text-xl ${
                        errors.phone
                          ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                          : "border-sky focus:border-primary focus:ring-primary"
                      }`}
                      onChange={(e) => {
                        // @ts-ignore
                        setValue("phone", e.target.value);
                        trigger("phone");
                        // @ts-ignore
                        handleInputChange(e.target.value);
                      }}
                    />
                  </div>
                  {errors.phone && (
                    <div className="pt-1 text-left text-sm text-red-600">
                      Bitte geben Sie eine gültige Telefonnummer an.
                    </div>
                  )}
                </div>

                <div className="col-span-full xl:col-span-6">
                  <div className="inline-flex w-full items-center gap-3">
                    <input
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                      })}
                      type="email"
                      placeholder="E-Mail"
                      inputMode="email"
                      className={`w-full min-w-[7rem] shrink rounded-xl border border-transparent font-semibold drop-shadow-flat-light focus:ring-2 lg:p-3 lg:px-4 xl:text-xl ${
                        errors.email
                          ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                          : "border-sky focus:border-primary focus:ring-primary"
                      }`}
                      onChange={(e) => {
                        // @ts-ignore
                        setValue("email", e.target.value);
                        trigger("email");
                        // @ts-ignore
                        handleInputChange(e.target.value);
                      }}
                    />
                  </div>
                  {errors.email && (
                    <div className="pt-1 text-left text-sm text-red-600">
                      Ungültige E-Mail-Adresse.
                    </div>
                  )}
                </div>
              </div>

              <Transition
                show={openForm}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="mt-2 grid grid-cols-12 items-start justify-center gap-3 md:justify-start">
                  <div className="col-span-full grid grid-cols-12 items-center gap-3">
                    <div className="col-span-12 lg:col-span-5">
                      <label>
                        <div className="flex items-center gap-3">
                          <input
                            {...register("consent", { required: true })}
                            type="checkbox"
                            className={`"mt-1 h-6 w-6 rounded border p-0 text-primary ${
                              errors.consent
                                ? "border-red-600"
                                : "border-primary"
                            }`}
                          />
                          <div className="flex items-center gap-3">
                            <div className="text-left text-sm font-semibold">
                              Ich erkläre mich einverstanden, dass meine oben
                              angegebenen personenbezogenen Daten zu
                              Beratungszwecken genutzt werden.{" "}
                              <a
                                href="/datenschutz/"
                                className="text-primary hover:text-complimentary"
                                target="_blank"
                              >
                                Datenschutz
                              </a>
                              .
                            </div>
                          </div>
                        </div>
                        {errors.consent && (
                          <div className="pt-1 text-left text-sm text-red-600">
                            Bitte akzeptieren Sie die Datenschutzbestimmungen,
                            damit wir Ihre Daten in unser System übernehmen
                            können.
                          </div>
                        )}
                      </label>
                    </div>

                    <div className="col-span-12 lg:col-span-7">
                      <button
                        className="flex w-full items-center rounded-xl bg-secondary p-4 font-semibold text-white hover:bg-complimentary hover:text-primary xl:text-2xl"
                        disabled={loading}
                      >
                        {loading && <WindTurbine />}
                        {loading
                          ? "Wird geladen ..."
                          : "Sparpotential berechnen lassen"}
                      </button>
                    </div>
                  </div>

                  <div className="col-span-full pt-2 text-center font-semibold">
                    <div className="inline-flex items-center gap-3 text-secondary">
                      {/* prettier-ignore */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      100% kostenlos und unverbindlich
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
