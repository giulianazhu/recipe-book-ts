import Rating from "@mui/material/Rating";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  disabled: boolean;
  readOnly: boolean;
  name: string;
  isPending: boolean;
  onChange: () => void;
  value: number;
  size: "small" | "medium" | "large";
  color: string;
}

export default function StarRating({
  disabled = false,
  readOnly = false,
  name = "rating",
  isPending = false,
  onChange,
  value,
  size = "medium",
  color = "yellow",
}: Partial<StarRatingProps>) {
  return (
    <Rating
      name={name}
      disabled={disabled || isPending}
      readOnly={readOnly}
      onChange={onChange}
      value={value}
      icon={<FaStar color={color} />}
      size={size}
    />
  );
}
