import classNames from "classnames";
import { useContext } from "react";
import { SettingsContext } from "utils/contexts/settings";

import Error from "./error";

const ALIASED_WIDGETS = {
  pialert: "netalertx",
  hoarder: "karakeep",
};

export default function StandardizedContainer({
  error = false,
  children,
  service,
  size = "medium", // small, medium, large
  variant = "default", // default, compact, minimal
}) {
  const { settings } = useContext(SettingsContext);

  if (error) {
    if (settings.hideErrors || service.widget.hide_errors) {
      return null;
    }
    return <Error service={service} error={error} />;
  }

  const childrenArray = Array.isArray(children) ? children : [children];

  let visibleChildren = childrenArray;
  let fields = service?.widget?.fields;
  if (typeof fields === "string") fields = JSON.parse(service.widget.fields);
  const type = service?.widget?.type;
  if (fields && type) {
    visibleChildren = childrenArray?.filter((child) =>
      fields.some((field) => {
        let fullField = field;
        if (!field.includes(".")) {
          fullField = `${type}.${field}`;
        }
        let matches = fullField === (child?.props?.field || child?.props?.label);
        if (matches) {
          return true;
        } else if (ALIASED_WIDGETS[type]) {
          matches = fullField.replace(type, ALIASED_WIDGETS[type]) === (child?.props?.field || child?.props?.label);
          return matches;
        }
        return false;
      }),
    );
  }

  // 定义不同尺寸的样式
  const sizeClasses = {
    small: "h-24", // 96px height
    medium: "h-32", // 128px height
    large: "h-40", // 160px height
  };

  // 定义不同变体的样式
  const variantClasses = {
    default: "bg-theme-100/20 dark:bg-white/5 hover:bg-theme-300/20 dark:hover:bg-white/10",
    compact: "bg-theme-100/10 dark:bg-white/3 hover:bg-theme-200/20 dark:hover:bg-white/5",
    minimal: "bg-transparent hover:bg-theme-100/10 dark:hover:bg-white/3",
  };

  return (
    <div
      className={classNames(
        "relative flex flex-col w-full standardized-container",
        sizeClasses[size],
        variantClasses[variant],
        "transition-all duration-200 ease-in-out",
        "rounded-md shadow-md shadow-theme-900/10 dark:shadow-theme-900/20",
        "border border-white/10",
        settings.cardBlur !== undefined && `backdrop-blur${settings.cardBlur.length ? "-" : ""}${settings.cardBlur}`,
        "overflow-hidden",
      )}
    >
      {visibleChildren}
    </div>
  );
}
