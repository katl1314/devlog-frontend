import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

// tailwind의 경우 동적 클래스를 사용할 수 없다.

type WidthKey = 1 | 2 | 3 | 4 | 5;
type widthType = Record<WidthKey, string>;
const width: widthType = {
  1: "w-[100px]",
  2: "w-[110px]",
  3: "w-[120px]",
  4: "w-[130px]",
  5: "w-[150px]",
};

export default function CustomSelect({
  options,
  placeholder = "",
  size = 5,
  defaultValue,
  onValueChange,
}: {
  options: Option[];
  placeholder?: string;
  size: keyof typeof width;
  defaultValue?: string;
  onValueChange?: (prevState: string) => void;
}) {
  return (
    <UISelect defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className={cn(width[size])}>
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
