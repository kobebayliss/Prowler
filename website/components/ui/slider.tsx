import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [value, setValue] = React.useState<[number, number]>([20, 80]);

  return (
    <div className="w-full">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        value={value}
        onValueChange={(newValue) => setValue(newValue)}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-offwhite dark:bg-slate-800">
          <SliderPrimitive.Range className="absolute h-full bg-grey dark:bg-slate-50" />
        </SliderPrimitive.Track>
        {value.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block h-4 w-4 rounded-full border-2 border-slate-900 bg-offwhite ring-2 ring-grey transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
          />
        ))}
      </SliderPrimitive.Root>
      <div className="flex mt-4 justify-between text-offwhite font-inter text-base">
        <p>{`From $${value[0]}`}</p>
        <p>{`To $${value[1]}`}</p>
      </div>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
