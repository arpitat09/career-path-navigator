import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  ShieldCheck,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCourseById,
} from "../../components/services/courses";

import {
  userPurchaseKey,
  userPurchasedCoursesKey,
} from "../../components/services/userScopedStorage";


/* =========================================================
   PLATFORM PLAN
========================================================= */

const PLATFORM_ID =
  "careerpath-platform";

const platformPlan = {
  id: PLATFORM_ID,

  title:
    "Complete Career Platform",

  description:
    "Unlock the complete CareerPath AI platform, including advanced career tools, engineering courses, mock interviews, GitHub insights, and certificates.",

  price: 999,

  thumbnail:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
};


/* =========================================================
   CURRENT USER
========================================================= */

function getCurrentUser() {
  try {
    const raw =
      localStorage.getItem("user");

    if (!raw) {
      return null;
    }

    const user =
      JSON.parse(raw);

    return user &&
      typeof user === "object"
      ? user
      : null;
  } catch {
    return null;
  }
}


/* =========================================================
   SAVE COURSE PURCHASE
========================================================= */

function saveCoursePurchase(
  courseId: string
) {
  /*
   * User-specific purchase key
   *
   * coursePurchased_USERID_COURSEID
   */

  const purchaseKey =
    userPurchaseKey(courseId);

  if (purchaseKey) {
    localStorage.setItem(
      purchaseKey,
      "true"
    );
  }


  /*
   * User-specific purchased-course list
   *
   * purchasedCourses_USERID
   */

  const purchasedCoursesKey =
    userPurchasedCoursesKey();

  if (!purchasedCoursesKey) {
    return;
  }

  try {
    const existing =
      JSON.parse(
        localStorage.getItem(
          purchasedCoursesKey
        ) || "[]"
      );

    const purchasedIds =
      Array.isArray(existing)
        ? existing.filter(
          (
            id
          ): id is string =>
            typeof id === "string"
        )
        : [];


    /*
     * Avoid duplicate course IDs
     */

    if (
      !purchasedIds.includes(
        courseId
      )
    ) {
      purchasedIds.push(
        courseId
      );
    }


    localStorage.setItem(
      purchasedCoursesKey,
      JSON.stringify(
        purchasedIds
      )
    );
  } catch {
    /*
     * If existing data is corrupted,
     * recreate the purchased list.
     */

    localStorage.setItem(
      purchasedCoursesKey,
      JSON.stringify([
        courseId,
      ])
    );
  }
}


/* =========================================================
   COMPONENT
========================================================= */

export default function CoursePayment() {
  const {
    courseId,
  } = useParams();

  const navigate =
    useNavigate();


  /* -------------------------------------------------------
     PLATFORM OR NORMAL COURSE
  ------------------------------------------------------- */

  const isPlatformPlan =
    courseId === PLATFORM_ID;


  /* -------------------------------------------------------
     FIND COURSE
  ------------------------------------------------------- */

  const normalCourse =
    useMemo(
      () =>
        !isPlatformPlan &&
          courseId
          ? getCourseById(
            courseId
          )
          : undefined,
      [
        courseId,
        isPlatformPlan,
      ]
    );


  /* -------------------------------------------------------
     PRODUCT
  ------------------------------------------------------- */

  const product =
    isPlatformPlan
      ? platformPlan
      : normalCourse;


  /* -------------------------------------------------------
     PAYMENT STATE
  ------------------------------------------------------- */

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState<
    "card" | "upi"
  >("card");


  const [
    processing,
    setProcessing,
  ] = useState(false);


  const [
    paymentComplete,
    setPaymentComplete,
  ] = useState(false);


  /* =======================================================
     PLATFORM PURCHASE CHECK
  ======================================================= */

  useEffect(() => {
    if (!isPlatformPlan) {
      return;
    }

    const user =
      getCurrentUser();

    const userId =
      user?.id ||
      user?._id;

    if (!userId) {
      return;
    }

    const purchased =
      localStorage.getItem(
        `careerpathPremium_${userId}`
      ) === "true";


    if (purchased) {
      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );
    }
  }, [
    isPlatformPlan,
    navigate,
  ]);


  /* =======================================================
     PRODUCT NOT FOUND
  ======================================================= */

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] px-6 text-white">

        <div className="text-center">

          <h1 className="text-3xl font-bold">
            Course Not Found
          </h1>

          <p className="mt-3 text-gray-400">
            The course you are looking for
            could not be found.
          </p>

          <Link
            to="/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium transition hover:bg-indigo-500"
          >
            <ArrowLeft
              size={18}
            />

            Back to Courses
          </Link>

        </div>

      </div>
    );
  }


  /* =======================================================
     PAYMENT HANDLER
  ======================================================= */

  const handlePayment =
    () => {

      const user =
        getCurrentUser();

      const userId =
        user?.id ||
        user?._id;


      /*
       * User must be logged in
       */

      if (!userId) {
        navigate(
          "/login",
          {
            replace: true,
          }
        );

        return;
      }


      /*
       * Prevent duplicate clicks
       */

      if (processing) {
        return;
      }


      setProcessing(
        true
      );


      /*
       * Demo payment processing
       */

      setTimeout(() => {

        try {

          /* ===============================================
             COMPLETE PLATFORM PURCHASE
          =============================================== */

          if (
            isPlatformPlan
          ) {

            localStorage.setItem(
              `careerpathPremium_${userId}`,
              "true"
            );


            localStorage.setItem(
              `careerpathPremiumPlan_${userId}`,
              JSON.stringify({
                id:
                  PLATFORM_ID,

                title:
                  platformPlan.title,

                price:
                  platformPlan.price,

                purchasedAt:
                  new Date().toISOString(),
              })
            );

          }


          /* ===============================================
             COMPLETE COURSE PURCHASE
          =============================================== */

          else {

            /*
             * THIS IS THE IMPORTANT FIX.
             *
             * Save the course using the
             * currently logged-in user's ID.
             */

            saveCoursePurchase(
              product.id
            );


            /*
             * Also keep the old key for
             * backwards compatibility.
             *
             * Existing old purchases won't
             * break anything.
             */

            localStorage.setItem(
              `coursePurchased_${product.id}`,
              "true"
            );


            /*
             * Save purchase information
             * for reference.
             */

            localStorage.setItem(
              `coursePurchaseInfo_${userId}_${product.id}`,
              JSON.stringify({
                courseId:
                  product.id,

                title:
                  product.title,

                price:
                  product.price,

                purchasedAt:
                  new Date().toISOString(),

                paymentMethod,
              })
            );
          }


          setPaymentComplete(
            true
          );


          /*
           * Go to payment success page
           */

          setTimeout(() => {

            navigate(
              `/courses/${product.id}/success`,
              {
                replace: true,
              }
            );

          }, 500);

        } catch (error) {

          console.error(
            "Payment error:",
            error
          );

          setProcessing(
            false
          );
        }

      }, 1500);
    };


  /* =======================================================
     PAYMENT PAGE
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="border-b border-white/10 bg-[#080b18]">

        <div className="mx-auto max-w-6xl px-6 py-5">

          <Link
            to={
              isPlatformPlan
                ? "/"
                : `/courses/${product.id}`
            }
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >

            <ArrowLeft
              size={17}
            />

            {isPlatformPlan
              ? "Back to Home"
              : "Back to Course"}

          </Link>

        </div>

      </header>


      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* =================================================
            TITLE
        ================================================= */}

        <div className="mb-10">

          <p className="text-sm font-medium text-indigo-400">
            Secure Checkout
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Complete Your Purchase
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            {isPlatformPlan
              ? "Unlock the complete CareerPath AI platform with lifetime access."
              : "Purchase this course to unlock all lessons, practice questions and projects."}
          </p>

        </div>


        {/* =================================================
            GRID
        ================================================= */}

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">


          {/* =================================================
              LEFT - PAYMENT
          ================================================= */}

          <section className="rounded-3xl border border-white/10 bg-[#111827] p-6 md:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">

                <CreditCard
                  size={22}
                  className="text-indigo-400"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Payment Method
                </h2>

                <p className="text-sm text-gray-500">
                  Choose how you want to pay
                </p>

              </div>

            </div>


            {/* =================================================
                PAYMENT METHODS
            ================================================= */}

            <div className="mt-8 grid gap-4 md:grid-cols-2">


              {/* CARD */}

              <button
                type="button"
                onClick={() =>
                  setPaymentMethod(
                    "card"
                  )
                }
                className={`rounded-2xl border p-5 text-left transition ${paymentMethod === "card"
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <CreditCard
                      size={20}
                      className={
                        paymentMethod === "card"
                          ? "text-indigo-400"
                          : "text-gray-400"
                      }
                    />

                    <span className="font-semibold">
                      Card
                    </span>

                  </div>

                  {paymentMethod ===
                    "card" && (
                      <CheckCircle2
                        size={19}
                        className="text-indigo-400"
                      />
                    )}

                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Credit or debit card
                </p>

              </button>


              {/* UPI */}

              <button
                type="button"
                onClick={() =>
                  setPaymentMethod(
                    "upi"
                  )
                }
                className={`rounded-2xl border p-5 text-left transition ${paymentMethod === "upi"
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-5 w-5 items-center justify-center rounded border border-current text-[9px]">
                      UPI
                    </div>

                    <span className="font-semibold">
                      UPI
                    </span>

                  </div>

                  {paymentMethod ===
                    "upi" && (
                      <CheckCircle2
                        size={19}
                        className="text-indigo-400"
                      />
                    )}

                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Google Pay, PhonePe, Paytm
                </p>

              </button>

            </div>


            {/* =================================================
                CARD DETAILS
            ================================================= */}

            {paymentMethod ===
              "card" && (

                <div className="mt-8 space-y-5">

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Card Number
                    </label>

                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500"
                    />

                  </div>


                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>

                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Expiry Date
                      </label>

                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500"
                      />

                    </div>


                    <div>

                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        CVV
                      </label>

                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        className="w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500"
                      />

                    </div>

                  </div>


                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Cardholder Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter cardholder name"
                      className="w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500"
                    />

                  </div>

                </div>
              )}


            {/* =================================================
                UPI DETAILS
            ================================================= */}

            {paymentMethod ===
              "upi" && (

                <div className="mt-8">

                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    UPI ID
                  </label>

                  <input
                    type="text"
                    placeholder="example@upi"
                    className="w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500"
                  />

                  <p className="mt-2 text-xs text-gray-600">
                    Enter your UPI ID to continue.
                  </p>

                </div>
              )}


            {/* =================================================
                SECURITY
            ================================================= */}

            <div className="mt-8 flex gap-3 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4">

              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-emerald-400"
              />

              <div>

                <p className="text-sm font-medium text-emerald-300">
                  Secure Payment
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Your payment information is
                  protected and handled securely.
                </p>

              </div>

            </div>


            {/* =================================================
                PAYMENT BUTTON
            ================================================= */}

            <button
              type="button"
              disabled={
                processing ||
                paymentComplete
              }
              onClick={
                handlePayment
              }
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {processing ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  Processing Payment...
                </>
              ) : paymentComplete ? (
                <>
                  <CheckCircle2
                    size={18}
                  />

                  Payment Successful
                </>
              ) : (
                <>
                  <Lock
                    size={17}
                  />

                  Pay ₹
                  {Number(
                    product.price || 0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </>
              )}

            </button>

          </section>


          {/* =================================================
              RIGHT - ORDER SUMMARY
          ================================================= */}

          <aside className="h-fit rounded-3xl border border-white/10 bg-[#111827] p-6">

            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Order Summary
            </p>


            {/* PRODUCT IMAGE */}

            <div className="mt-5 overflow-hidden rounded-2xl">

              <img
                src={
                  product.thumbnail
                }
                alt={
                  product.title
                }
                className="h-48 w-full object-cover"
              />

            </div>


            {/* PRODUCT INFO */}

            <div className="mt-5">

              <p className="text-xs text-indigo-400">
                CareerPath AI
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {
                  product.title
                }
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {
                  product.description
                }
              </p>

            </div>


            {/* COURSE DETAILS */}

            {!isPlatformPlan &&
              normalCourse && (

                <div className="mt-6 space-y-3 border-t border-white/10 pt-5">

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Modules
                    </span>

                    <span className="text-gray-300">
                      {
                        normalCourse.modulesCount
                      }
                    </span>

                  </div>


                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Lessons
                    </span>

                    <span className="text-gray-300">
                      {
                        normalCourse.lessonsCount
                      }
                    </span>

                  </div>


                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Access
                    </span>

                    <span className="text-emerald-400">
                      Lifetime
                    </span>

                  </div>

                </div>
              )}


            {/* INCLUDED */}

            <div className="mt-6 border-t border-white/10 pt-5">

              <p className="text-sm font-semibold">
                What's Included
              </p>

              <div className="mt-4 space-y-3">

                {[
                  "Video lectures",
                  "Written lessons",
                  "Practice questions",
                  "Projects and assignments",
                  "Progress tracking",
                  "Course completion certificate",
                ].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-gray-400"
                    >

                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-emerald-400"
                      />

                      {item}

                    </div>
                  )
                )}

              </div>

            </div>


            {/* PRICE */}

            <div className="mt-6 border-t border-white/10 pt-5">

              <div className="flex items-center justify-between">

                <span className="text-sm text-gray-500">
                  Total
                </span>

                <span className="text-2xl font-bold">
                  ₹
                  {Number(
                    product.price || 0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

            </div>


            {/* SECURITY NOTE */}

            <div className="mt-5 flex gap-2 text-xs leading-5 text-gray-600">

              <Lock
                size={14}
                className="mt-0.5 shrink-0"
              />

              <span>
                Secure checkout. Your course
                access is linked to your account
                after successful purchase.
              </span>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}