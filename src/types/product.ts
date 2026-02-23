export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  /**
   * Tracked unit quantity. 0 = out of stock.
   * Use 9999 for unlimited/untracked items (legacy inStock=TRUE rows).
   */
  stock: number;
}
