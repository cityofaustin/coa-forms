import React from "react";
import { format, parse } from "date-fns";

export default function DateTimeWidget(props) {
  const date = parse(props.value);

  return <span>{format(date, "MMMM Mo, YYYY - h:mm A")}</span>;
}
