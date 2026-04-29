export default async function handler(req, res) {
  try {
    const { domain } = req.query;

    if (!domain) {
      return res.status(400).json({
        status: "Error",
        category: "-",
        ssl: "-",
        title: "-"
      });
    }

    const url = "https://" + domain;

    let status = "Offline";
    let title = "-";
    let ssl = "Yes";
    let category = "Other";

    try {
      const response = await fetch(url, {
        redirect: "follow"
      });

      const html = await response.text();

      status = "Online";

      const match = html.match(/<title>(.*?)<\/title>/i);
      if (match) title = match[1].trim().slice(0, 60);

    } catch {
      status = "Offline";
      ssl = "No";
    }

    const d = domain.toLowerCase();
    const t = title.toLowerCase();

    if (d.includes("google") || t.includes("google")) category = "Search Engine";
    else if (d.includes("facebook") || d.includes("instagram")) category = "Social Media";
    else if (d.includes("youtube") || d.includes("netflix")) category = "Streaming";
    else if (d.includes("amazon") || d.includes("shop")) category = "Ecommerce";
    else if (d.includes("bank")) category = "Banking";
    else if (d.includes("casino") || d.includes("bet")) category = "Gambling";
    else if (d.includes("crypto")) category = "Crypto";
    else if (d.includes("gov")) category = "Government";
    else if (d.includes("edu")) category = "Education";
    else if (d.includes("ai")) category = "AI";

    return res.status(200).json({
      status,
      category,
      ssl,
      title
    });

  } catch (e) {
    return res.status(500).json({
      status: "Error",
      category: "-",
      ssl: "-",
      title: "-"
    });
  }
}
