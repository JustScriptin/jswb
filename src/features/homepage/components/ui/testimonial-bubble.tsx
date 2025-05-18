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
    <div className="bg-white/10 p-6 rounded-lg max-w-xs">
      <p className="text-white/90 text-sm leading-relaxed">{text}</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-white text-sm font-medium">{name}</div>
          <div className="text-white/60 text-xs">{role}</div>
        </div>
      </div>
    </div>
  );
});
TestimonialBubble.displayName = "TestimonialBubble";
