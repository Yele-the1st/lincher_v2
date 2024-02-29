import { FC } from "react";
import { motion } from "framer-motion";
import { Quotes } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface indexProps {
  quote: string;
  name: string;
}

const email = "yele.olabode@gmail.com";

const testimonials: indexProps[][] = [
  [
    {
      name: "Jane S.",
      quote:
        "Lincher has been an absolute game-changer for me. As someone transitioning into the tech industry, I was overwhelmed by the amount of information out there. Thanks to their curated courses and personalized guidance, I've been able to navigate my learning journey with confidence. Highly recommend!",
    },
  ],
  [
    {
      name: "Michael L.",
      quote:
        "I can't thank Lincher enough for their amazing courses and support. Their expert-led tutorials helped me bridge the gap between theory and practice, allowing me to apply what I've learned directly to my work. It's truly been a transformative experience.",
    },
  ],
  [
    {
      name: "Ahmed A.",
      quote:
        "Switching careers into tech can be daunting, but Lincher made the transition seamless for me. Their courses provided me with the skills and knowledge I needed to land my dream job in tech. I'm forever grateful for their support and guidance.",
    },
  ],
];

const ReveiwsSection = ({}) => {
  return (
    <div>
      <section
        id="testimonials"
        className="container relative space-y-12 py-24 sm:py-32"
      >
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-bold">{`Testimonials`}</h1>
          <p className="mx-auto max-w-2xl leading-relaxed">
            I always love to hear from the users of Lincher with feedback or
            support. Here are some of the messages I&apos;ve received. If you
            have any feedback, feel free to drop me an email at{" "}
            <a href="#" className="underline">
              {email}
            </a>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-y-0">
          {testimonials.map((columnGroup, groupIndex) => (
            <div key={groupIndex} className="space-y-8">
              {columnGroup.map((testimonial, index) => (
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.25 },
                  }}
                  className={cn(
                    "relative overflow-hidden rounded-lg bg-secondary p-5 shadow-lg",
                    index > 0 && "hidden lg:block"
                  )}
                >
                  <Quotes
                    size={64}
                    className="absolute -right-3 bottom-0 opacity-20"
                  />
                  <blockquote className="italic leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 font-medium">
                    {testimonial.name}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReveiwsSection;
