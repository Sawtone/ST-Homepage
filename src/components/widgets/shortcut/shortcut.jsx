import ResolvedIcon from "components/resolvedicon";

export default function Shortcut({ options }) {
  const {
    items = [],
    shape = "square", // "square" | "banner"
    columns = 4,
    gap = 8,
    iconSize = 32,
    style,
  } = options || {};

  const gridTemplateColumns =
    shape === "banner" ? `repeat(${columns}, minmax(0, 1fr))` : `repeat(${columns}, minmax(0, 1fr))`;

  return (
    <div className="w-full" style={{ display: "grid", gridTemplateColumns, gap: `${gap}px`, ...style }}>
      {items.map((item, idx) => {
        const { name, href, icon, description, target = "_blank" } = item || {};
        if (!href) return null;

        const isBanner = shape === "banner";
        const cardBase =
          "group relative overflow-hidden rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors";
        const squareClass = `${cardBase} aspect-square p-3 flex flex-col items-center justify-center text-center`;
        const bannerClass = `${cardBase} h-[72px] md:h-[84px] p-3 flex flex-row items-center justify-start`;

        return (
          <a
            key={`${name || href}-${idx}`}
            href={href}
            target={target}
            rel="noreferrer"
            className={isBanner ? bannerClass : squareClass}
          >
            {icon && (
              <div className={isBanner ? "w-8 h-8 mr-3 flex-shrink-0" : "w-10 h-10 mb-2"}>
                <ResolvedIcon icon={icon} width={iconSize} height={iconSize} alt={name || href} />
              </div>
            )}
            <div className={isBanner ? "flex flex-col min-w-0" : "flex flex-col items-center min-w-0"}>
              {name && (
                <div
                  className={isBanner ? "text-sm font-semibold truncate" : "text-sm font-semibold truncate max-w-full"}
                  title={name}
                >
                  {name}
                </div>
              )}
              {description && (
                <div
                  className={isBanner ? "text-xs opacity-70 truncate" : "text-xs opacity-70 line-clamp-2"}
                  title={description}
                >
                  {description}
                </div>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
}
