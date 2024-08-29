import clsx from "clsx";

interface TablerIconProps {
  className?: string;
  iconName: string;
  color?: string;
}

/**
 * Tabler Icons are available by default.
 * You can browse the list of available icons at:
 * https://tabler.io/icons
 */
export const TablerIcon = ({ iconName, className, color }: TablerIconProps) => {
  return (
    <span
      className={clsx("ti", `ti-${iconName}`, className)}
      style={{ color }}
    ></span>
  );
};

/**
 * By default only the Tabler Icons are available.
 * 
 * If you want to use Google Material Icons, you need to edit the `index.html` and replace the font link to the Tabler Icons with the Google Material Icons.
 * 
 * e.g. replace
```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.5.0/dist/tabler-icons.min.css"
/>
```
by
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
```
 */

export const GoogleMaterialIcon = ({
  iconName,
  className,
  color,
}: TablerIconProps) => {
  return (
    <span
      className={clsx("material-symbols-outlined", className)}
      style={{ color }}
    >
      {iconName}
    </span>
  );
};

/**
 * By default the Tabler Icons are used.
 */
export const FontIcon = TablerIcon;
