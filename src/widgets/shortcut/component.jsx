import ResolvedIcon from "components/resolvedicon";
import Container from "components/services/widget/container";
import StandardizedContainer from "components/services/widget/standardized-container";

export default function Component({ service }) {
  const { widget } = service;
  const {
    items = [],
    shape = "square",
    columns = 4,
    gap = 8,
    iconSize = 32,
    standardized = false,
    size = "medium",
    variant = "default",
  } = widget || {};

  const gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;

  // 标准化模式渲染
  if (standardized) {
    return (
      <StandardizedContainer service={service} size={size} variant={variant}>
        <div
          className="w-full h-full p-4"
          style={{
            display: "grid",
            gridTemplateColumns,
            gap: `${gap}px`,
            alignContent: "center",
          }}
        >
          {items.map((item, idx) => {
            const { name, href, icon, description, target = "_blank" } = item || {};
            if (!href) return null;

            const isBanner = shape === "banner";
            const cardBase =
              "group relative overflow-hidden rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors";
            const squareClass = `${cardBase} aspect-square p-2 flex flex-col items-center justify-center text-center`;
            const bannerClass = `${cardBase} h-full p-2 flex flex-row items-center justify-start`;

            return (
              <a
                key={`${name || href}-${idx}`}
                href={href}
                target={target}
                rel="noreferrer"
                className={isBanner ? bannerClass : squareClass}
              >
                {icon && (
                  <div className={isBanner ? "w-6 h-6 mr-2 flex-shrink-0" : "w-8 h-8 mb-1"}>
                    <ResolvedIcon icon={icon} width={iconSize} height={iconSize} alt={name || href} />
                  </div>
                )}
                <div className={isBanner ? "flex flex-col min-w-0 flex-1" : "flex flex-col items-center min-w-0"}>
                  {name && (
                    <div
                      className={
                        isBanner ? "text-sm font-semibold truncate" : "text-sm font-semibold truncate max-w-full"
                      }
                      title={name}
                    >
                      {name}
                    </div>
                  )}
                  {description && (
                    <div
                      className={isBanner ? "text-xs opacity-70 truncate mt-1" : "text-xs opacity-70 line-clamp-2 mt-1"}
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
      </StandardizedContainer>
    );
  }

  // 原有模式渲染
  return (
    <Container service={service}>
      <div className="w-full" style={{ display: "grid", gridTemplateColumns, gap: `${gap}px` }}>
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
                    className={
                      isBanner ? "text-sm font-semibold truncate" : "text-sm font-semibold truncate max-w-full"
                    }
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
    </Container>
  );
}
