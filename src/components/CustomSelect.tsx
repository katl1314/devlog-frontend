import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

export default function CustomSelect({
  options,
  placeholder = "",
  width = 120,
}: {
  options: Option[];
  placeholder?: string;
  width?: number;
}) {
  return (
    <UISelect>
      <SelectTrigger className={`w-[${width}px]`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <CustomSelectItem key={option.value} {...option} />
        ))}
      </SelectContent>
    </UISelect>
  );
}

function CustomSelectItem({ label, value }: Option) {
  return <SelectItem value={value}>{label}</SelectItem>;
}
