import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Computer Science Student",
    initials: "AS",
    rating: 5,
    text: "CareerPath AI helped me understand which skills I actually needed for my target role. The roadmap made my preparation much more structured.",
  },
  {
    name: "Rahul Mehta",
    role: "Final Year Engineering Student",
    initials: "RM",
    rating: 5,
    text: "The AI mentor and resume analysis features are extremely useful. I was able to identify gaps in my resume and improve my interview preparation.",
  },
  {
    name: "Priya Nair",
    role: "Aspiring Software Developer",
    initials: "PN",
    rating: 5,
    text: "Instead of searching through multiple websites, I can manage my career preparation in one place. The personalized roadmap is my favorite feature.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#050816] py-24"
    >
      {/* Background Glow */}

      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300">
            TESTIMONIALS
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Students Love CareerPath AI
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            See how students are using CareerPath AI to improve their
            skills, prepare for placements, and build their careers.
          </p>

        </div>


        {/* Testimonials */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {testimonials.map((testimonial) => (

            <div
              key={testimonial.name}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/40 hover:bg-indigo-500/5"
            >

              {/* Quote Icon */}

              <div className="absolute right-7 top-7">

                <Quote
                  size={32}
                  className="text-indigo-500/20"
                />

              </div>


              {/* Stars */}

              <div className="flex gap-1">

                {Array.from({
                  length: testimonial.rating,
                }).map((_, index) => (

                  <Star
                    key={index}
                    size={17}
                    className="fill-indigo-400 text-indigo-400"
                  />

                ))}

              </div>


              {/* Text */}

              <p className="mt-6 min-h-[140px] leading-8 text-gray-300">
                "{testimonial.text}"
              </p>


              {/* User */}

              <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 font-semibold text-indigo-300">
                  {testimonial.initials}
                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    {testimonial.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {testimonial.role}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}