export function formatPrice(amount: number, currency: "UAH" | "USD" = "UAH") {
  if (currency === "USD") {
    return `$${amount.toFixed(2)}`;
  }
  return `${amount.toLocaleString("uk-UA")} ₴`;
}