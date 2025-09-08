import genericProxyHandler from "utils/proxy/handlers/generic";

// 服务小部件定义：通过通用代理从 GitHub 获取仓库信息
// 支持 endpoint: repo（基础信息） 与 commits（最近提交）
const widget = {
  api: "{url}{endpoint}",
  proxyHandler: genericProxyHandler,

  // 将 services.yaml 中的 widget.url 设为 https://api.github.com/repos/{owner}/{repo}
  // 这样 endpoint 为 "" 或 "commits" 时分别命中 仓库信息/提交列表
  mappings: {
    // 使用一个无害的查询参数以避免空 endpoint 被拒绝
    repo: { endpoint: "?t=1" },
    commits: { endpoint: "/commits?per_page=2" },
  },
  headers: {
    Accept: "application/vnd.github+json",
    "User-Agent": "homepage-gitrepo-service-widget",
    "X-GitHub-Api-Version": "2022-11-28",
  },
};

export default widget;
