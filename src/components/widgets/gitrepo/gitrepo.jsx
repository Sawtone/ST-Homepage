import useSWR from "swr";

export default function GitRepo({ options }) {
  const { repo = "gethomepage/homepage", apiPath = "/api/widgets/gitrepo", refreshInterval = 60000, style } = options || {};

  const url = `${apiPath}?repo=${encodeURIComponent(repo)}`;

  const { data, error, isLoading } = useSWR(url, (u) => fetch(u).then((r) => r.json()), {
    refreshInterval,
  });

  if (error) return <div className="flex items-center justify-center">加载失败</div>;
  if (isLoading || !data) return <div className="flex items-center justify-center">加载中...</div>;

  if (data?.error) return <div className="flex items-center justify-center">{String(data.error)}</div>;

  const {
    full_name,
    description,
    stargazers_count,
    forks_count,
    open_issues_count,
    language,
    license,
    html_url,
    updated_at,
  } = data || {};

  return (
    <div className="flex flex-col gap-1" style={style}>
      <a className="text-base font-semibold hover:underline" href={html_url} target="_blank" rel="noreferrer">
        {full_name}
      </a>
      {description && <div className="text-sm opacity-70 line-clamp-2">{description}</div>}
      <div className="flex items-center gap-3 text-sm opacity-80">
        <span>⭐ {stargazers_count}</span>
        <span>🍴 {forks_count}</span>
        <span>🐞 {open_issues_count}</span>
        {language && <span>{language}</span>}
        {license?.spdx_id && <span>{license.spdx_id}</span>}
      </div>
      {updated_at && (
        <div className="text-xs opacity-60">更新于 {new Date(updated_at).toLocaleString()}</div>
      )}
    </div>
  );
}