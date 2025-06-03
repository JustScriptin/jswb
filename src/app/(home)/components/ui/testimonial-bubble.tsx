"use client";

import { memo } from "react";

type TestimonialBubbleProps = {
  name: string;
  role: string;
  text: string;
};

/**
 * Testimonial Bubble component
 *
 * Displays a user testimonial with avatar and role
 */
export const TestimonialBubble = memo(function TestimonialBubble({
  name,
  role,
  text,
}: TestimonialBubbleProps) {
  return (
    <div className="bg-white/15 backdrop-blur-sm p-6 rounded-[var(--radius-lg)] max-w-xs border border-white/10">
      <p className="text-white/95 text-sm leading-relaxed font-medium">
        {text}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-[var(--radius-full)] bg-white/20 flex items-center justify-center text-white font-semibold text-sm">
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-white text-sm font-semibold">{name}</div>
          <div className="text-white/80 text-xs">{role}</div>
        </div>
      </div>
    </div>
  );
});
TestimonialBubble.displayName = "TestimonialBubble";
