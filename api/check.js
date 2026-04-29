export default async function handler(req, res) {
  try {
    const { domain } = req.query;

    if (!domain) {
      return res.status(400).json({
        status: "Error",
        category: "-"
      });
    }

    const d = domain.toLowerCase();

    let category = "Other";

    if (d.includes("google")) category = "Search Engine";
    else if (d.includes("facebook")) category = "Social Media";
    else if (d.includes("instagram")) category = "Social Media";
    else if (d.includes("youtube")) category = "Streaming";
    else if (d.includes("amazon")) category = "Ecommerce";
    else if (d.includes("shop")) category = "Ecommerce";
    else if (d.includes("bank")) category = "Banking";
    else if (d.includes("gov")) category = "Government";
    else if (d.includes("edu")) category = "Education";
    else if (d.includes("news")) category = "News";
    else if (d.includes("casino")) category = "Gambling";
    else if (d.includes("bet")) category = "Betting";
    else if (d.includes("crypto")) category = "Crypto";
    else if (d.includes("ai")) category = "AI";

    return res.status(200).json({
      status: "Success",
      category: category
    });

  } catch (err) {
    return res.status(500).json({
      status: "Error",
      category: "-"
    });
  }
}
