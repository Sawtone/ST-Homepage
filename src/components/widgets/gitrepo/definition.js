// 不可违反 import/no-anonymous-default-export，需要先赋值变量再导出
const definition = {
  name: "Git Repository",
  description: "Displays information about a Git repository from GitHub.",
  options: {
    repo: {
      type: "string",
      label: "Repository (e.g., owner/repo)",
      required: true,
      placeholder: "gethomepage/homepage",
    },
    refreshInterval: {
      type: "number",
      label: "Refresh Interval (ms)",
      required: false,
      placeholder: 60000,
    },
  },
};

export default definition;
