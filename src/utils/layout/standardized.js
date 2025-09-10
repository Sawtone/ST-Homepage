// 标准化布局工具函数

/**
 * 获取标准化容器的样式类名
 * @param {string} size - 尺寸: small, medium, large
 * @param {string} variant - 变体: default, compact, minimal
 * @param {object} settings - 设置对象
 * @returns {string} 样式类名字符串
 */
export function getStandardizedContainerClasses(size = "medium", variant = "default", settings = {}) {
  const sizeClasses = {
    small: "h-24", // 96px height
    medium: "h-32", // 128px height
    large: "h-40", // 160px height
  };

  const variantClasses = {
    default: "bg-theme-100/20 dark:bg-white/5 hover:bg-theme-300/20 dark:hover:bg-white/10",
    compact: "bg-theme-100/10 dark:bg-white/3 hover:bg-theme-200/20 dark:hover:bg-white/5",
    minimal: "bg-transparent hover:bg-theme-100/10 dark:hover:bg-white/3",
  };

  const baseClasses = [
    "relative flex flex-col w-full standardized-container",
    sizeClasses[size],
    variantClasses[variant],
    "transition-all duration-200 ease-in-out",
    "rounded-md shadow-md shadow-theme-900/10 dark:shadow-theme-900/20",
    "border border-white/10",
    "overflow-hidden",
  ];

  // 添加模糊效果
  if (settings.cardBlur !== undefined) {
    baseClasses.push(`backdrop-blur${settings.cardBlur.length ? "-" : ""}${settings.cardBlur}`);
  }

  return baseClasses.join(" ");
}

/**
 * 获取页面子容器的样式类名
 * @param {string} layout - 布局: grid, flex, masonry
 * @param {number} columns - 列数
 * @param {number} gap - 间距
 * @param {string} maxHeight - 最大高度
 * @returns {string} 样式类名字符串
 */
export function getPageSubContainerClasses(layout = "grid", columns = 3, gap = 4, maxHeight = "auto") {
  const layoutClasses = {
    grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-${gap}`,
    flex: `flex flex-wrap gap-${gap}`,
    masonry: `columns-1 md:columns-2 lg:columns-${columns} gap-${gap} space-y-${gap}`,
  };

  const maxHeightClasses = {
    auto: "",
    sm: "max-h-64",
    md: "max-h-96",
    lg: "max-h-[32rem]",
    xl: "max-h-[40rem]",
    full: "max-h-screen",
  };

  const baseClasses = ["page-subcontainer mb-6", layoutClasses[layout], maxHeightClasses[maxHeight]];

  if (maxHeight !== "auto") {
    baseClasses.push("overflow-y-auto");
  }

  return baseClasses.join(" ");
}

/**
 * 获取分区布局的样式类名
 * @param {string} layout - 布局: horizontal, vertical, grid
 * @returns {string} 样式类名字符串
 */
export function getPartitionedLayoutClasses(layout = "horizontal") {
  const layoutClasses = {
    horizontal: "flex flex-col lg:flex-row gap-6",
    vertical: "flex flex-col gap-6",
    grid: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",
  };

  return `partitioned-layout w-full ${layoutClasses[layout]}`;
}

/**
 * 检查组件是否应该使用标准化模式
 * @param {object} widget - 组件配置
 * @returns {boolean} 是否使用标准化模式
 */
export function shouldUseStandardizedMode(widget) {
  return widget?.standardized === true;
}

/**
 * 获取组件的标准化配置
 * @param {object} widget - 组件配置
 * @returns {object} 标准化配置对象
 */
export function getStandardizedConfig(widget) {
  return {
    size: widget?.size || "medium",
    variant: widget?.variant || "default",
    standardized: widget?.standardized || false,
  };
}

/**
 * 创建标准化布局配置
 * @param {Array} sections - 分区配置数组
 * @param {string} layout - 整体布局
 * @returns {object} 布局配置对象
 */
export function createStandardizedLayoutConfig(sections = [], layout = "horizontal") {
  const defaultSections = [
    {
      id: "gitrepo-section",
      title: "Git Repositories",
      type: "gitrepo",
      layout: "grid",
      columns: 3,
      maxHeight: "md",
      className: "flex-1",
    },
    {
      id: "shortcut-section",
      title: "Quick Shortcuts",
      type: "shortcut",
      layout: "grid",
      columns: 4,
      maxHeight: "sm",
      className: "flex-1",
    },
    {
      id: "reserved-section",
      title: "Reserved Space",
      type: "reserved",
      layout: "flex",
      maxHeight: "sm",
      className: "flex-1",
    },
  ];

  return {
    layout,
    sections: sections.length > 0 ? sections : defaultSections,
  };
}
