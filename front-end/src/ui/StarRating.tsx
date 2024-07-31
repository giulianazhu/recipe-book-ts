import Rating from "@mui/material/Rating";
import { FaStar } from "react-icons/fa";

function CustomIcon() {
  return <FaStar />;
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
}) {
  return (
    <Rating
      name={name}
      disabled={disabled || isPending}
      readOnly={readOnly}
      onChange={onChange}
      value={parseInt(value)}
      icon={<FaStar color={color} />}
      size={size}
    />
  );
}
