import {
  FireIcon as FlameIconRaw,
  TrashIcon as Trash,
  ChevronDownIcon as ChevronDown,
  ChevronUpIcon as ChevronUp,
  CalendarIcon as Calendar,
  StarIcon as Star,
  PlusIcon as Plus,
  BoltIcon as Bolt,
  CheckIcon as Check,
} from "@heroicons/react/24/solid";
import { Swords } from "./custom/Swords";
import { TargetIcon as Target } from "./custom/Target";

export const Icon = ({ className = "h-5 w-5", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...props}
  />
);

export const SwordIcon = (props) => <Swords className={props.className} {...props} />;
export const FlameIcon = (props) => <FlameIconRaw className={props.className} {...props} />;
export const TargetIcon = (props) => <Target className={props.className} {...props} />;
export const PlusIcon = (props) => <Plus className={props.className} {...props} />;
export const CheckIcon = (props) => <Check className={props.className} {...props} />;
export const TrashIcon = (props) => <Trash className={props.className} {...props} />;
export const StarIcon = (props) => <Star className={props.className} {...props} />;
export const ZapIcon = (props) => <Bolt className={props.className} {...props} />;
export const ChevronDownIcon = (props) => <ChevronDown className={props.className} {...props} />;
export const ChevronUpIcon = (props) => <ChevronUp className={props.className} {...props} />;
export const CalendarIcon = (props) => <Calendar className={props.className} {...props} />;
