import { useState, useEffect, createRef } from "preact/compat";
import Cookies from "js-cookie";

export const CookiesConsent = () => {
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const consentRef = createRef<HTMLInputElement>();

  const handleAllAccept = () => {
    // @ts-ignore
    gtag("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "granted",
    });
    Cookies.set("consent", "granted", { expires: 31 });
    setOpen(false);
  };

  const handleAllReject = () => {
    // @ts-ignore
    gtag("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied",
    });
    Cookies.set("consent", "denied", { expires: 31 });
    setOpen(false);
  };

  const handelSaveSettings = () => {
    consentRef.current!.checked ? handleAllAccept() : handleAllReject();
  };

  useEffect(() => {
    const consent = Cookies.get("consent");
    if (!consent) {
      setOpen(true);
    }
  }, []);

  return (
    <>
      <button
        class="text-primary hover:text-secondary hover:underline hover:underline-offset-4 lg:text-lg"
        onClick={() => setOpen(!open)}
      >
        Cookie Einstellungen
      </button>

      {open && (
        <div
          className={`fixed bottom-0 left-0 z-50 m-4 flex max-w-5xl flex-col gap-2 rounded-xl bg-sky-lightest p-4 drop-shadow-flat`}
        >
          <div className="items font-pt-sans flex items-center gap-2 text-2xl">
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"  className="shrink-0"> <path d="M21.598 11.064a1.006 1.006 0 0 0-.854-.172A2.938 2.938 0 0 1 20 11c-1.654 0-3-1.346-3.003-2.937.005-.034.016-.136.017-.17a.998.998 0 0 0-1.254-1.006A2.963 2.963 0 0 1 15 7c-1.654 0-3-1.346-3-3 0-.217.031-.444.099-.716a1 1 0 0 0-1.067-1.236A9.956 9.956 0 0 0 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10c0-.049-.003-.097-.007-.16a1.004 1.004 0 0 0-.395-.776zM12 20c-4.411 0-8-3.589-8-8a7.962 7.962 0 0 1 6.006-7.75A5.006 5.006 0 0 0 15 9l.101-.001a5.007 5.007 0 0 0 4.837 4C19.444 16.941 16.073 20 12 20z"></path> <circle cx="12.5" cy="11.5" r="1.5"></circle> <circle cx="8.5" cy="8.5" r="1.5"></circle> <circle cx="7.5" cy="12.5" r="1.5"></circle> <circle cx="15.5" cy="15.5" r="1.5"></circle> <circle cx="10.5" cy="16.5" r="1.5"></circle> </svg>
            Wir verwenden Cookies
          </div>
          <div className="space-y-2">
            <p>
              Mit Klick auf <strong>„Alle Cookies erlauben“</strong> stimmen Sie
              zu, dass Cookies, gemäß unserer{" "}
              <a href="/datenschutz">
                <span className="text-primary hover:text-secondary hover:underline hover:underline-offset-4">
                  Cookie Policy
                </span>
              </a>
              , der Datenschutzinformation und den{" "}
              <strong>„Datenschutzeinstellungen“</strong> auf dieser Website
              verwendet werden dürfen.
            </p>

            {openSettings ? (
              <p class="pb-4">
                Sie können einzeln für jeden Zweck entscheiden, ob Sie Cookies
                zulassen möchten.
              </p>
            ) : (
              <p class="pb-4">
                Sie können unter „Datenschutzeinstellungen“ einzeln für jeden
                Zweck entscheiden, ob Sie Cookies zulassen möchten.
              </p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2 md:flex-row">
            <button
              className="flex flex-initial items-center rounded-lg bg-secondary px-6 py-4 text-lg text-white shadow-lg duration-150 hover:bg-complimentary hover:text-primary md:px-16 md:py-2"
              onClick={handleAllAccept}
            >
              Alle Cookies erlauben
            </button>
            <button
              className="flex flex-initial items-center rounded-lg bg-secondary px-6 py-4 text-lg text-white shadow-lg duration-150 hover:bg-complimentary hover:text-primary md:px-16 md:py-2"
              onClick={handleAllReject}
            >
              Ich stimme nicht zu
            </button>

            {openSettings ? (
              <button
                className="flex flex-initial items-center rounded-lg bg-secondary px-6 py-4 text-lg text-white shadow-lg duration-150 hover:bg-complimentary hover:text-primary md:px-16 md:py-2"
                onClick={handelSaveSettings}
              >
                Einstellungen speichern
              </button>
            ) : (
              <button
                className="text-lgxl flex flex-initial items-center rounded-lg bg-secondary px-6 py-4 text-white shadow-lg duration-150 hover:bg-complimentary hover:text-primary md:px-16 md:py-2"
                onClick={() => setOpenSettings(!openSettings)}
              >
                Datenschutzeinstellungen
              </button>
            )}
          </div>

          {openSettings && (
            <div className="flex flex-col items-start gap-1">
              <h2 className="font-pt-sans pb-2 text-lg">Options</h2>
              <div className="flex flex-col items-start gap-1">
                <label>
                  <input
                    type="checkbox"
                    disabled={true}
                    checked={true}
                    className="mr-2 h-5 w-5 rounded-md border-primary bg-gray-100 text-secondary focus:border-transparent focus:ring-4 focus:ring-primary focus:ring-offset-0"
                  />
                  <span>
                    Notwendig{" "}
                    <i class="text-sm">
                      (Notwendige Cookies dienen dazu, um den technischen
                      Betrieb einer Website zu ermöglichen und diese für Sie
                      funktional nutzbar zu machen. Diese Cookies ordnen Ihrem
                      Browser eine zufällig generierte ID zu. Somit ist eine
                      direkte Identifizierung ausgeschlossen.)
                    </i>
                  </span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={false}
                    className="mr-2 h-5 w-5 rounded-md border-primary bg-gray-100 text-secondary focus:border-transparent focus:ring-4 focus:ring-primary focus:ring-offset-0"
                    ref={consentRef}
                  />
                  <span>
                    Marketing und Statistik{" "}
                    <i class="text-sm">
                      (Marketing-Cookies stammen von externen Werbeunternehmen
                      und werden verwendet, um Informationen über die vom
                      Benutzer besuchten Webseiten zu sammeln. Statistik-Cookies
                      sammeln Informationen darüber, wie Webseiten genutzt
                      werden, um deren Attraktivität, Inhalt und Funktionalität
                      zu verbessern. Eine Nutzung erfolgt nur mit Ihrer
                      Einwilligung und zwar nur solange Sie das jeweilige Cookie
                      nicht deaktiviert haben.)
                    </i>
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
