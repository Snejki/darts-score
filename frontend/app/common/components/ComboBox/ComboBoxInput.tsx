import * as React from "react";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboBoxInputProps {
  options: { id: string; name: string }[];
  value: { id: string; name: string } | undefined;
  onChange: (value: { id: string; name: string }) => void;
  onInputChange: (value: string) => void
}

export const ComboBoxInput = (props: ComboBoxInputProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >Pick a player</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." onInput={e => props.onInputChange((e.target as HTMLInputElement ).value)}/>
          <CommandEmpty>No players found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {props.options.map((option) => (
                <CommandItem key={option.id  } value={option.id} onSelect={() => {
                  props.onChange(option);
                  setOpen(false);
                }}>
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};