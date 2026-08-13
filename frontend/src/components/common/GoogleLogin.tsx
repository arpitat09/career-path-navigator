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

  onError?: (
    message: string
  ) => void;
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

export default function GoogleLogin({
  onSuccess,
  onError,
}: GoogleLoginProps) {
  const googleButtonRef =
    useRef<HTMLDivElement>(null);

  const successRef =
    useRef(onSuccess);

  const errorRef =
    useRef(onError);

  const [loading, setLoading] =
    useState(false);

  /*
   * Keep the latest callbacks without making
   * the Google initialization effect run again.
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
    const clientId =
      import.meta.env
        .VITE_GOOGLE_CLIENT_ID;

    if (!clientId) {
      console.error(
        "VITE_GOOGLE_CLIENT_ID is missing."
      );

      errorRef.current?.(
        "Google Sign-In is not configured."
      );

      return;
    }

    let cancelled = false;

    const initializeGoogle =
      () => {
        if (
          cancelled ||
          !window.google ||
          !googleButtonRef.current
        ) {
          return;
        }

        /*
         * This component is the ONLY place that
         * initializes Google Identity Services.
         */
        window.google.accounts.id.initialize(
          {
            client_id: clientId,

            callback:
              async (
                response
              ) => {
                try {
                  setLoading(true);

                  const apiUrl =
                    import.meta.env
                      .VITE_API_URL ||
                    "http://localhost:5000";

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

                  const data =
                    await result.json();

                  if (
                    !result.ok ||
                    !data.success
                  ) {
                    throw new Error(
                      data.message ||
                        "Google authentication failed."
                    );
                  }

                  successRef.current?.({
                    token: data.token,
                    user: {
                      id: data._id,
                      name: data.name,
                      email: data.email,
                      picture:
                        data.picture ||
                        "",
                    },
                  });
                } catch (error) {
                  console.error(
                    "Google login error:",
                    error
                  );

                  errorRef.current?.(
                    error instanceof Error
                      ? error.message
                      : "Google authentication failed."
                  );
                } finally {
                  setLoading(false);
                }
              },
          }
        );

        if (
          googleButtonRef.current
        ) {
          googleButtonRef.current.innerHTML =
            "";

          window.google.accounts.id.renderButton(
            googleButtonRef.current,
            {
              theme: "outline",
              size: "large",
              width: 320,
              text: "continue_with",
              shape: "rectangular",
            }
          );
        }
      };

    const existingScript =
      document.getElementById(
        GOOGLE_SCRIPT_ID
      ) as HTMLScriptElement | null;

    if (window.google) {
      initializeGoogle();
      return () => {
        cancelled = true;
      };
    }

    if (existingScript) {
      existingScript.addEventListener(
        "load",
        initializeGoogle,
        { once: true }
      );

      return () => {
        cancelled = true;
        existingScript.removeEventListener(
          "load",
          initializeGoogle
        );
      };
    }

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

    script.onload =
      initializeGoogle;

    script.onerror = () => {
      errorRef.current?.(
        "Unable to load Google Sign-In. Please try again."
      );
    };

    document.head.appendChild(
      script
    );

    return () => {
      cancelled = true;
      script.onload = null;
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-2">

      <div
        ref={googleButtonRef}
        className="flex min-h-[44px] w-full justify-center overflow-hidden"
      />

      {loading && (
        <p className="text-sm text-gray-400">
          Signing in with Google...
        </p>
      )}

    </div>
  );
}