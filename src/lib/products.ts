import { Product } from "@/types/product";

function parseCsv(csv: string): Product[] {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));

  return lines
    .slice(1)
    .map((line) => {
      // Handle quoted fields that may contain commas
      const fields: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          inQuotes = !inQuotes;
        } else if (ch === "," && !inQuotes) {
          fields.push(current.trim());
          current = "";
        } else {
          current += ch;
        }
      }
      fields.push(current.trim());

      const row: Record<string, string> = {};
      headers.forEach((h, i) => {
        row[h] = fields[i] ?? "";
      });

      // Stock resolution (backwards-compatible):
      //   New sheets:  "stock" column with a number (e.g. 25)
      //   Old sheets:  "inStock" boolean column (TRUE/FALSE)
      //   Neither:     treat as unlimited (9999)
      let stock: number;
      if ("stock" in row && row.stock !== "") {
        stock = parseInt(row.stock, 10);
        if (isNaN(stock)) stock = 0;
      } else if ("inStock" in row) {
        stock = row.inStock.toUpperCase() === "TRUE" ? 9999 : 0;
      } else {
        stock = 9999;
      }

      return {
        id: row.id ?? "",
        name: row.name ?? "",
        description: row.description ?? "",
        price: parseFloat(row.price ?? "0") || 0,
        imageUrl: row.imageUrl ?? "",
        category: row.category ?? "",
        stock,
      } satisfies Product;
    })
    .filter((p) => p.id && p.name);
}

export async function fetchProducts(): Promise<Product[]> {
  const sheetId = process.env.GOOGLE_SHEETS_PRODUCT_ID;
  if (!sheetId) {
    console.warn("GOOGLE_SHEETS_PRODUCT_ID is not set — returning empty product list.");
    return [];
  }

  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`Failed to fetch products: ${res.status} ${res.statusText}`);
      return [];
    }
    const csv = await res.text();
    return parseCsv(csv);
  } catch (err) {
    console.error("Error fetching products from Google Sheets:", err);
    return [];
  }
}
