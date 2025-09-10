import { useTranslation } from "next-i18next";

import Block from "components/services/widget/block";
import Container from "components/services/widget/container";
import StandardizedContainer from "components/services/widget/standardized-container";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();
  const { widget } = service;

  const { refreshInterval = 60000, standardized = true, size = "medium", variant = "default" } = widget;

  const { data: repoData, error: repoError } = useWidgetAPI(widget, "repo", { refreshInterval });
  const { data: commitsData, error: commitsError } = useWidgetAPI(widget, "commits", { refreshInterval });

  if (repoError || commitsError) {
    if (standardized) {
      return (
        <StandardizedContainer service={service} error={repoError ?? commitsError} size={size} variant={variant} />
      );
    }
    return <Container service={service} error={repoError ?? commitsError} />;
  }

  if (!repoData) {
    if (standardized) {
      return (
        <StandardizedContainer service={service} size={size} variant={variant}>
          <div className="flex flex-col justify-center items-center h-full p-4">
            <div className="h-4 w-32 bg-white/10 rounded animate-pulse mb-2" />
            <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
          </div>
        </StandardizedContainer>
      );
    }

    if (widget.style === "card" || widget.compact) {
      return (
        <Container service={service}>
          <div className="flex flex-col gap-1 w-full">
            <div className="h-4 w-40 bg-white/10 rounded" />
            <div className="h-3 w-3/4 bg-white/5 rounded" />
            <div className="flex gap-4 text-xs opacity-60">
              <div className="h-3 w-10 bg-white/5 rounded" />
              <div className="h-3 w-10 bg-white/5 rounded" />
              <div className="h-3 w-10 bg-white/5 rounded" />
            </div>
          </div>
        </Container>
      );
    }

    return (
      <Container service={service}>
        <Block label="gitrepo.repo" />
        <Block label="gitrepo.stars" />
        <Block label="gitrepo.issues" />
      </Container>
    );
  }

  const fullName = repoData.full_name;
  const stars = repoData.stargazers_count;
  const issues = repoData.open_issues_count;
  const htmlUrl = repoData.html_url;
  const description = repoData.description;
  const language = repoData.language;

  // 标准化模式渲染
  if (standardized) {
    const commitOne = (commitsData && commitsData[0]?.commit?.message) || "";
    console.log("Standard");

    return (
      <StandardizedContainer service={service} size={size} variant={variant}>
        <div className="flex flex-col justify-between h-full p-4">
          {" "}
          {/* justify-between */}
          {/* 标题区域 */}
          <div>
            {" "}
            {/* className="flex-1" */}
            <a
              className="text-sm font-semibold hover:underline text-theme-800 dark:text-theme-200 block mb-1"
              href={htmlUrl}
              target="_blank"
              rel="noreferrer"
            >
              {fullName}
            </a>
            {description && (
              <div className="text-xs opacity-75 line-clamp-2 text-theme-600 dark:text-theme-300 mb-2">
                {description}
              </div>
            )}
          </div>
          {/* 底部信息区域 */}
          <div className="flex items-center justify-between text-xs">
            <div className="mt-1 flex items-center gap-3 opacity-80 text-xs">
              <span className="flex items-center gap-1">⭐ {stars}</span>
              <span className="flex items-center gap-1">🐞 {issues}</span>
              {language && (
                <span className="px-1.5 py-0.5 bg-theme-200/50 dark:bg-theme-700/50 rounded text-xs">{language}</span>
              )}
            </div>

            {commitOne && (
              <div className="text-xs opacity-60 truncate max-w-[120px]" title={commitOne.split("\n")[0]}>
                {commitOne.split("\n")[0]}
              </div>
            )}
          </div>
        </div>
      </StandardizedContainer>
    );
  }

  if (widget.style == "card" || widget.compact) {
    const commitOne = (commitsData && commitsData[0]?.commit?.message) || "";
    const commitTwo = (commitsData && commitsData[1]?.commit?.message) || "";

    console.log("Card");
    return (
      <Container service={service}>
        <div className="flex flex-col gap-1 w-full">
          <a className="text-sm font-semibold hover:underline" href={htmlUrl} target="_blank" rel="noreferrer">
            {fullName}
          </a>
          {description && <div className="text-[0.85rem] opacity-75 line-clamp-2">{description}</div>}
          <div className="flex items-center gap-4 text-sm opacity-80 mt-1">
            <span>⭐ {stars}</span>
            <span>🐞 {issues}</span>
            {language && <span>{language}</span>}
          </div>
          {commitOne && <div className="text-xs opacity-60 mt-1">{commitOne.split("\n")[0]}</div>}
          {commitTwo && <div className="text-xs opacity-60">{commitTwo.split("\n")[0]}</div>}
        </div>
      </Container>
    );
  }

  console.log("Block");
  return (
    <Container service={service}>
      <Block
        label="gitrepo.repo"
        value={
          <a href={htmlUrl} target="_blank" rel="noreferrer">
            {fullName}
          </a>
        }
      />
      {description && <Block label="gitrepo.description" value={description} />}
      <Block label="gitrepo.stars" value={t("common.number", { value: stars })} />
      <Block label="gitrepo.issues" value={t("common.number", { value: issues })} />
      {language && <Block label="gitrepo.language" value={language} />}
      {commitsData && commitsData.length > 0 && (
        <Block label="gitrepo.latestCommit" value={(commitsData[0]?.commit?.message || "").split("\n")[0]} />
      )}
      {commitsData && commitsData.length > 1 && (
        <Block label="gitrepo.latestCommit2" value={(commitsData[1]?.commit?.message || "").split("\n")[0]} />
      )}
    </Container>
  );
}
