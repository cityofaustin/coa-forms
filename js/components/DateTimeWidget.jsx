import React from "react";
import classnames from "classnames";

export default function DateTimeWidget(props) {
  return (
    <input
      type="datetime-local"
      id={props.id}
      name={props.id}
      disabled={props.disabled}
      maxLength={props.schema.maxLength}
      autoComplete={props.options.autocomplete || false}
      className={classnames(props.options.widgetClassNames)}
      value={typeof props.value === "undefined" ? "" : props.value}
      onBlur={() => props.onBlur(props.id)}
      onChange={event =>
        props.onChange(event.target.value ? event.target.value : undefined)
      }
    />
  );
}
