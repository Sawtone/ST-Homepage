import classNames from "classnames";
import { useContext } from "react";
import { SettingsContext } from "utils/contexts/settings";
import { createStandardizedLayoutConfig, getPartitionedLayoutClasses } from "utils/layout/standardized";

export default function StandardizedLayout({
  children,
  layout = "horizontal", // horizontal, vertical, grid
  sections = [],
  className = "",
}) {
  const { settings } = useContext(SettingsContext);

  // 获取布局配置
  const layoutConfig = createStandardizedLayoutConfig(sections, layout);
  const layoutClasses = getPartitionedLayoutClasses(layout);

  // 根据分区类型渲染内容
  const renderSectionContent = (section) => {
    if (section.type === "reserved") {
      return (
        <div className="flex items-center justify-center h-full min-h-[200px] text-theme-500 dark:text-theme-400">
          <div className="text-center">
            <div className="text-2xl mb-2">📦</div>
            <div className="text-sm">预留空间</div>
            <div className="text-xs opacity-60">可用于其他组件</div>
          </div>
        </div>
      );
    }

    // 过滤出对应类型的子组件
    const sectionChildren = children.filter((child) => {
      if (section.type === "gitrepo") {
        return child.props?.service?.widget?.type === "gitrepo" && child.props?.service?.widget?.standardized;
      } else if (section.type === "shortcut") {
        return child.props?.service?.widget?.type === "shortcut" && child.props?.service?.widget?.standardized;
      }
      return false;
    });

    return sectionChildren;
  };

  return (
    <div className={classNames(layoutClasses, className)}>
      {layoutConfig.sections.map((section) => (
        <div key={section.id} className={classNames("page-subcontainer mb-6", section.className)}>
          {section.title && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-theme-800 dark:text-theme-200">{section.title}</h3>
            </div>
          )}

          <div
            className={classNames(
              section.layout === "grid"
                ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${section.columns} gap-4`
                : section.layout === "flex"
                  ? "flex flex-wrap gap-4"
                  : `columns-1 md:columns-2 lg:columns-${section.columns} gap-4 space-y-4`,
              section.maxHeight === "sm"
                ? "max-h-64"
                : section.maxHeight === "md"
                  ? "max-h-96"
                  : section.maxHeight === "lg"
                    ? "max-h-[32rem]"
                    : section.maxHeight === "xl"
                      ? "max-h-[40rem]"
                      : section.maxHeight === "full"
                        ? "max-h-screen"
                        : "",
              section.maxHeight !== "auto" && "overflow-y-auto",
              "w-full",
            )}
          >
            {renderSectionContent(section)}
          </div>
        </div>
      ))}
    </div>
  );
}
