import {
  useEffect,
  useRef,
  useState,
} from "react";

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleLoginProps {
  onSuccess: (data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      picture?: string;
    };
  }) => void;

  onError?: (message: string) => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (
              response: GoogleCredentialResponse
            ) => void;
        }) => void;

          renderButton: (
            element: HTMLElement,
            options: {
              theme?: string;
              size?: string;
              width?: number;
              text?: string;
              shape?: string;
            }
          ) => void;

          cancel?: () => void;
        };
      };
    };
  }
}

const GOOGLE_SCRIPT_ID =
  "google-identity-services-script";

/*
 * Google Identity Services should only be
 * initialized once for the application.
 *
 * We keep the latest callback separately so
 * React remounting does not leave us with an
 * old callback.
 */

let googleClientInitialized = false;

let latestCredentialHandler:
  | ((
      response: GoogleCredentialResponse
    ) => void)
  | null = null;

/*
 * Load Google Identity Services.
 */

function loadGoogleScript(): Promise<void> {
  if (window.google) {
    return Promise.resolve();
  }

  const existingScript =
    document.getElementById(
      GOOGLE_SCRIPT_ID
    ) as HTMLScriptElement | null;

  if (existingScript) {
    return new Promise(
      (resolve, reject) => {
        existingScript.addEventListener(
          "load",
          () => resolve(),
          { once: true }
        );

        existingScript.addEventListener(
          "error",
          () =>
            reject(
              new Error(
                "Google Identity Services failed to load."
              )
            ),
          { once: true }
        );
      }
    );
  }

  return new Promise(
    (resolve, reject) => {
      const script =
        document.createElement(
          "script"
        );

      script.id =
        GOOGLE_SCRIPT_ID;

      script.src =
        "https://accounts.google.com/gsi/client";

      script.async = true;
      script.defer = true;

      script.onload = () => {
        resolve();
      };

      script.onerror = () => {
        reject(
          new Error(
            "Unable to load Google Sign-In."
          )
        );
      };

      document.head.appendChild(
        script
      );
    }
  );
}

export default function GoogleLogin({
  onSuccess,
  onError,
}: GoogleLoginProps) {
  const buttonRef =
    useRef<HTMLDivElement>(null);

  const successRef =
    useRef(onSuccess);

  const errorRef =
    useRef(onError);

  const [loading, setLoading] =
    useState(false);

  /*
   * Always keep latest callbacks.
   */

  useEffect(() => {
    successRef.current =
      onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    errorRef.current =
      onError;
  }, [onError]);

  useEffect(() => {
    let cancelled = false;

    const clientId =
      import.meta.env
        .VITE_GOOGLE_CLIENT_ID;

    /*
     * Check Client ID.
     */

    if (!clientId) {
      console.error(
        "VITE_GOOGLE_CLIENT_ID is missing."
      );

      errorRef.current?.(
        "Google Sign-In is not configured."
      );

      return;
    }

    /*
     * Handle Google credential.
     */

    const handleCredentialResponse =
      async (
        response: GoogleCredentialResponse
      ) => {
        if (cancelled) {
          return;
        }

        if (!response?.credential) {
          errorRef.current?.(
            "Google credential was not received."
          );

          return;
        }

        try {
          setLoading(true);

          const apiUrl =
            import.meta.env.VITE_API_URL ||
            "http://localhost:5000";

          console.log(
            "Google credential received."
          );

          console.log(
            "Sending Google credential to:",
            `${apiUrl}/api/auth/google`
          );

          const result =
            await fetch(
              `${apiUrl}/api/auth/google`,
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  credential:
                    response.credential,
                }),
              }
            );

          let data;

          try {
            data =
              await result.json();
          } catch {
            throw new Error(
              "Invalid response from authentication server."
            );
          }

          console.log(
            "Google backend response:",
            data
          );

          if (
            !result.ok ||
            !data.success
          ) {
            throw new Error(
              data.message ||
                "Google authentication failed."
            );
          }

          /*
           * Build user object.
           */

          const user = {
            id: String(data._id),
            name:
              data.name ||
              "Google User",
            email: data.email,
            picture:
              data.picture || "",
          };

          /*
           * Send result to Login.tsx.
           */

          successRef.current?.({
            token: data.token,
            user,
          });
        } catch (error) {
          console.error(
            "Google login error:",
            error
          );

          const message =
            error instanceof Error
              ? error.message
              : "Google authentication failed.";

          errorRef.current?.(
            message
          );
        } finally {
          setLoading(false);
        }
      };

    /*
     * Store the latest credential handler.
     */

    latestCredentialHandler =
      handleCredentialResponse;

    /*
     * Initialize Google.
     */

    const initializeGoogle =
      async () => {
        try {
          await loadGoogleScript();

          if (
            cancelled ||
            !window.google ||
            !buttonRef.current
          ) {
            return;
          }

          /*
           * Initialize only once.
           */

          if (
            !googleClientInitialized
          ) {
            window.google.accounts.id.initialize(
              {
                client_id: clientId,

                callback: (
                  response
                ) => {
                  latestCredentialHandler?.(
                    response
                  );
                },
              }
            );

            googleClientInitialized =
              true;

            console.log(
              "Google Identity Services initialized."
            );
          }

          /*
           * Clear existing button.
           */

          buttonRef.current.innerHTML =
            "";

          /*
           * Render Google button.
           */

          window.google.accounts.id.renderButton(
            buttonRef.current,
            {
              theme: "outline",
              size: "large",
              width: 320,
              text: "continue_with",
              shape: "rectangular",
            }
          );

          console.log(
            "Google Sign-In button rendered."
          );
        } catch (error) {
          console.error(
            "Google initialization error:",
            error
          );

          errorRef.current?.(
            error instanceof Error
              ? error.message
              : "Unable to load Google Sign-In."
          );
        }
      };

    initializeGoogle();

    return () => {
      cancelled = true;

      /*
       * Do not clear the global Google
       * initialization because another
       * component may reuse it.
       */

      if (
        latestCredentialHandler ===
        handleCredentialResponse
      ) {
        latestCredentialHandler =
          null;
      }
    };
  }, []);

  return (
    <div
      className="
        flex
        w-full
        flex-col
        items-center
        gap-2
      "
    >
      <div
        ref={buttonRef}
        className="
          flex
          min-h-[44px]
          w-full
          justify-center
          overflow-hidden
        "
      />

      {loading && (
        <p className="text-sm text-gray-400">
          Signing in with Google...
        </p>
      )}
    </div>
  );
}