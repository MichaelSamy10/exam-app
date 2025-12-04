import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils/tailwind-merge";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
    hasError?: boolean;
    countries?: CountryEntry[];
  };

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, ...props }, ref) => {
      const [selectedCountry, setSelectedCountry] =
        React.useState<RPNInput.Country>(props.defaultCountry || "EG");

      const nationalNumber = React.useMemo(() => {
        if (!value) return "";
        const code = RPNInput.getCountryCallingCode(selectedCountry);
        return value.replace(`+${code}`, "");
      }, [value, selectedCountry]);

      const handleChange = (val: string) => {
        const code = RPNInput.getCountryCallingCode(selectedCountry);
        const fullNumber = val ? `+${code}${val}` : "";
        onChange?.(fullNumber as RPNInput.Value);
      };

      return (
        <div className="flex items-center border overflow-hidden">
          <div className="flex items-center gap-1 px-3 py-2 text-sm select-none">
            <FlagSelectButton
              value={selectedCountry}
              onChange={setSelectedCountry}
            />
          </div>
          <InputComponent
            ref={ref as React.Ref<HTMLInputElement>}
            value={nationalNumber}
            onChange={(e) => handleChange(e.target.value)}
            className={cn("flex-1 border-none rounded-none", className)}
            {...props}
          />
        </div>
      );
    }
  );

PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input className={cn("", className)} {...props} ref={ref} />
));
InputComponent.displayName = "InputComponent";

const FlagSelectButton = ({
  value: selectedCountry,
  onChange,
}: {
  value: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const allCountries = React.useMemo(() => RPNInput.getCountries(), []);

  const filteredCountries = allCountries.filter((country) => {
    const countryName = country;
    return (
      countryName.toLowerCase().includes(searchValue.toLowerCase()) ||
      RPNInput.getCountryCallingCode(country).toString().includes(searchValue)
    );
  });

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setSearchValue("");
      }}
    >
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 text-sm select-none focus:outline-none">
          <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
            {flags[selectedCountry] &&
              React.createElement(flags[selectedCountry], {
                title: selectedCountry,
              })}
          </span>
          <span>
            {selectedCountry} (+
            {RPNInput.getCountryCallingCode(selectedCountry)})
          </span>
          <ChevronsUpDown className="size-4 opacity-50 -mr-2" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(val) => setSearchValue(val)}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {filteredCountries.map((country) => (
                  <CountrySelectOption
                    key={country}
                    country={country}
                    countryName={country}
                    selectedCountry={selectedCountry}
                    onChange={onChange}
                    onSelectComplete={() => setIsOpen(false)}
                  />
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(
        country
      )}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${
          country === selectedCountry ? "opacity-100" : "opacity-0"
        }`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
