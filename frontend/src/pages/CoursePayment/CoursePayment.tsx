import {
  ArrowLeft,
  CreditCard,
  Lock,
  ShieldCheck,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { getCourseById } from "../../components/services/courses";

const PLATFORM_ID = "careerpath-platform";

const platformPlan = {
  id: PLATFORM_ID,
  title: "Complete Career Platform",
  description:
    "Unlock the complete CareerPath AI platform, including advanced career tools, engineering courses, mock interviews, GitHub insights, and certificates.",
  price: 999,
  thumbnail:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
};

function getCurrentUser() {
  try {
    return JSON.parse(
      localStorage.getItem("user") || "null"
    );
  } catch {
    return null;
  }
}

export default function CoursePayment() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const isPlatformPlan = courseId === PLATFORM_ID;

  const normalCourse = useMemo(
    () =>
      !isPlatformPlan && courseId
        ? getCourseById(courseId)
        : undefined,
    [courseId, isPlatformPlan]
  );

  const product = isPlatformPlan
    ? platformPlan
    : normalCourse;

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const [processing, setProcessing] =
    useState(false);

  useEffect(() => {
    if (!isPlatformPlan) return;

    const user = getCurrentUser();
    const userId = user?.id || user?._id;

    if (!userId) return;

    const purchased =
      localStorage.getItem(
        `careerpathPremium_${userId}`
      ) === "true";

    if (purchased) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [isPlatformPlan, navigate]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] px-6 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Course Not Found
          </h1>

          <Link
            to="/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3"
          >
            <ArrowLeft size={18} />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    const user = getCurrentUser();
    const userId = user?.id || user?._id;

    if (!userId) {
      navigate("/login", {
        replace: true,
      });
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      if (isPlatformPlan) {
        localStorage.setItem(
          `careerpathPremium_${userId}`,
          "true"
        );

        localStorage.setItem(
          `careerpathPremiumPlan_${userId}`,
          JSON.stringify({
            id: PLATFORM_ID,
            title: platformPlan.title,
            price: platformPlan.price,
            purchasedAt:
              new Date().toISOString(),
          })
        );
      } else {
        localStorage.setItem(
          `coursePurchased_${product.id}`,
          "true"
        );
      }

      navigate(
        `/courses/${product.id}/success`
      );
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <header className="border-b border-white/10 bg-[#080b18]">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <Link
            to={
              isPlatformPlan
                ? "/"
                : `/courses/${product.id}`
            }
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
          >
            <ArrowLeft size={17} />
            {isPlatformPlan
              ? "Back to Home"
              : "Back to Course"}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-10">
          <p className="text-sm text-indigo-400">
            Secure Checkout
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Complete Your Purchase
          </h1>

          <p className="mt-3 text-gray-400">
            {isPlatformPlan
              ? "Unlock the complete CareerPath AI platform with lifetime access."
              : "Purchase this course to unlock all lessons, practice questions and projects."}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section className="rounded-2xl border border-white/10 bg-[#111827] p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">
                <CreditCard
                  size={22}
                  className="text-indigo-400"
                />
              </div>

              <div>
                <h2 className="font-bold">
                  Payment Method
                </h2>

                <p className="text-sm text-gray-500">
                  Choose how you want to pay
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {[
                ["card", "Card", "Credit / Debit Card"],
                ["upi", "UPI", "Google Pay / PhonePe / etc."],
                ["netbanking", "Net Banking", "Pay through your bank"],
              ].map(([value, title, subtitle]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setPaymentMethod(value)
                  }
                  className={`rounded-xl border p-4 text-left transition ${
                    paymentMethod === value
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <CreditCard
                    size={20}
                    className="text-indigo-400"
                  />

                  <p className="mt-3 text-sm font-medium">
                    {title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {subtitle}
                  </p>
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter cardholder name"
                    className="w-full rounded-xl border border-white/10 bg-[#080b18] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full rounded-xl border border-white/10 bg-[#080b18] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full rounded-xl border border-white/10 bg-[#080b18] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      CVV
                    </label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={3}
                      className="w-full rounded-xl border border-white/10 bg-[#080b18] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="mt-8">
                <label className="mb-2 block text-sm text-gray-300">
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="example@upi"
                  className="w-full rounded-xl border border-white/10 bg-[#080b18] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-indigo-500"
                />
              </div>
            )}

            {paymentMethod === "netbanking" && (
              <div className="mt-8">
                <label className="mb-2 block text-sm text-gray-300">
                  Select Bank
                </label>

                <select className="w-full rounded-xl border border-white/10 bg-[#080b18] px-4 py-3 text-white outline-none focus:border-indigo-500">
                  <option value="">
                    Select your bank
                  </option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            <div className="mt-8 flex gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
              <ShieldCheck
                size={20}
                className="shrink-0 text-emerald-400"
              />

              <div>
                <p className="text-sm font-medium text-emerald-300">
                  Secure Demo Payment
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  This is a dummy checkout for your project
                  demonstration. No real payment is processed.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={processing}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {processing ? (
                "Processing Payment..."
              ) : (
                <>
                  <Lock size={18} />
                  Pay ₹{product.price}
                </>
              )}
            </button>
          </section>

          <aside>
            <div className="sticky top-6 overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">
                  {isPlatformPlan
                    ? "Platform Plan"
                    : "Course"}
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  {product.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {product.description}
                </p>

                <div className="my-6 border-t border-white/10" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Price
                    </span>
                    <span>₹{product.price}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Access
                    </span>
                    <span>Lifetime</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Certificate
                    </span>
                    <span className="text-emerald-400">
                      Included
                    </span>
                  </div>
                </div>

                <div className="my-6 border-t border-white/10" />

                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="text-2xl font-bold">
                    ₹{product.price}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}