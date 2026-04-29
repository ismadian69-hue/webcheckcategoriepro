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

    const cleanDomain = domain
      .toLowerCase()
      .replace("https://", "")
      .replace("http://", "")
      .split("/")[0]
      .trim();

    const url = "https://" + cleanDomain;

    let status = "Offline";
    let ssl = "No";
    let title = "-";
    let category = "Website";

    try {
      const response = await fetch(url, {
        redirect: "follow",
        headers: {
          "user-agent": "Mozilla/5.0"
        }
      });

      const html = await response.text();

      status = "Online";
      ssl = "Yes";

      const match = html.match(/<title[^>]*>(.*?)<\/title>/i);

      if (match && match[1]) {
        title = match[1]
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 60);
      }

    } catch (e) {
      status = "Offline";
      ssl = "No";
      title = "-";
    }

    const d = cleanDomain;
    const t = title.toLowerCase();

    if (
      d.includes("google") ||
      d.includes("chrome") ||
      d.includes("android") ||
      d.includes("about.google") ||
      t.includes("google")
    ) {
      category = "Search Engine";
    }

    else if (
      d.includes("facebook") ||
      d.includes("instagram") ||
      d.includes("twitter") ||
      d.includes("x.com") ||
      d.includes("t.co") ||
      d.includes("linkedin") ||
      d.includes("snapchat") ||
      t.includes("twitter")
    ) {
      category = "Social Media";
    }

    else if (
      d.includes("youtube") ||
      d.includes("netflix") ||
      d.includes("spotify") ||
      d.includes("twitch") ||
      d.includes("hulu")
    ) {
      category = "Streaming";
    }

    else if (
      d.includes("amazon") ||
      d.includes("ebay") ||
      d.includes("shop") ||
      d.includes("aliexpress") ||
      d.includes("etsy")
    ) {
      category = "Ecommerce";
    }

    else if (
      d.includes("github") ||
      d.includes("gitlab") ||
      d.includes("bitbucket") ||
      d.includes("stackoverflow")
    ) {
      category = "Developer";
    }

    else if (
      d.includes("mediafire") ||
      d.includes("dropbox") ||
      d.includes("mega") ||
      d.includes("drive.google") ||
      d.includes("onedrive")
    ) {
      category = "Cloud Storage";
    }

    else if (
      d.includes("reuters") ||
      d.includes("cnn") ||
      d.includes("bbc") ||
      d.includes("nytimes") ||
      d.includes("news")
    ) {
      category = "News";
    }

    else if (
      d.includes("bank") ||
      d.includes("visa") ||
      d.includes("mastercard") ||
      d.includes("paypal")
    ) {
      category = "Banking";
    }

    else if (
      d.includes("casino") ||
      d.includes("bet") ||
      d.includes("poker")
    ) {
      category = "Gambling";
    }

    else if (
      d.includes("crypto") ||
      d.includes("binance") ||
      d.includes("coinbase") ||
      d.includes("blockchain")
    ) {
      category = "Crypto";
    }

    else if (
      d.includes(".gov") ||
      d.includes("gov.")
    ) {
      category = "Government";
    }

    else if (
      d.includes(".edu") ||
      d.includes("edu.")
    ) {
      category = "Education";
    }

    else if (
      d.includes("ai") ||
      d.includes("openai") ||
      d.includes("chatgpt")
    ) {
      category = "AI";
    }

    else {
      category = "Website";
    }

    return res.status(200).json({
      status,
      category,
      ssl,
      title
    });

  } catch (error) {
    return res.status(500).json({
      status: "Error",
      category: "-",
      ssl: "-",
      title: "-"
    });
  }
}
