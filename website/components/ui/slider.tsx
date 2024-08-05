import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & { onChange?: (value: [number, number]) => void }
>(({ className, onChange, ...props }, ref) => {
  const [value, setValue] = React.useState<[number, number]>([0, 150]);

  const handleValueChange = (newValue: [number, number]) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="w-full">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        value={value}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-offwhite dark:bg-slate-800 cursor-pointer">
          <SliderPrimitive.Range className="absolute h-full bg-grey dark:bg-slate-50" />
        </SliderPrimitive.Track>
        {value.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block h-4 w-4 rounded-full border-2 border-slate-900 bg-offwhite ring-2 ring-grey 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 
            disabled:pointer-events-none disabled:opacity-50 dark:border-slate-50 dark:bg-slate-950 dark:focus-visible:ring-slate-300 cursor-pointer transition-all duration-100"
          />
        ))}
      </SliderPrimitive.Root>
      <div className="flex mt-2 justify-between">
        <p className="text-grey text-sm font-interlight">$0</p>
        <p className="text-grey text-sm font-interlight">$150</p>
      </div>
      <div className="flex mt-2 text-offwhite font-inter text-base">
        <p className="font-inter text-pricerange text-grey self-center mr-1.5">From</p>
        <input
          className="bg-lightmidnight text-offwhite w-14 p-2 h-8 font-inter placeholder:font-inter placeholder:text-grey rounded-md 
          focus:outline-none focus:ring-1 focus:ring-offwhite transition-all duration-100 mr-1.5" 
          value={`$${value[0]}`}
          readOnly
        />
        <p className="font-inter text-pricerange text-grey self-center mr-1.5">to</p>
        <input
          className="bg-lightmidnight text-offwhite w-14 p-2 h-8 font-inter placeholder:font-inter placeholder:text-grey rounded-md 
          focus:outline-none focus:ring-1 focus:ring-offwhite transition-all duration-100" 
          value={`$${value[1]}`}
          readOnly
        />
      </div>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };