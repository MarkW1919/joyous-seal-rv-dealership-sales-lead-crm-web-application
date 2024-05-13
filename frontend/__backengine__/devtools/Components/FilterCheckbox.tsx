import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "../ui/checkbox";

interface FilterCheckboxProps {
  filterComponents: boolean;
  setFilterComponents: (value: boolean) => void;
}

function FilterCheckbox({
  filterComponents,
  setFilterComponents,
}: FilterCheckboxProps) {
  const handleCheckedChange = (checked: CheckedState) => {
    if (checked === "indeterminate") {
      return;
    }

    setFilterComponents(checked);
  };

  return (
    <div className="text-white flex items-center space-x-1 py-2 justify-center">
      <Checkbox
        id="filter"
        checked={filterComponents}
        onCheckedChange={handleCheckedChange}
        className="bg-white data-[state=checked]:bg-[#3db6b9] h-5 w-5"
      />
      <label
        htmlFor="filter"
        className="cursor-pointer text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Current page
      </label>
    </div>
  );
}

export default FilterCheckbox;
