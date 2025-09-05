import { httpProxy } from "utils/proxy/http";

export default async function handler(req, res) {
  const { repo = "gethomepage/homepage" } = req.query;

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_PAT;
  if (!token) {
    return res.status(500).json({ error: "Missing GitHub token in environment (.env)" });
  }

  const url = new URL(`https://api.github.com/repos/${repo}`);

  const [status, contentType, data] = await httpProxy(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "homepage-gitrepo-widget",
    },
  });

  if (contentType) res.setHeader("Content-Type", contentType);
  return res.status(status).send(data);
}


