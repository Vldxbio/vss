export interface Promocode {
  code: string;
  discount: number;
  minAmount?: number;
  description: { uk: string; ru: string };
  oncePerEmail?: boolean;
}

export const promocodes: Promocode[] = [
  {
    code: "VSS10",
    discount: 10,
    description: { uk: "Знижка 10% на все", ru: "Скидка 10% на всё" },
    oncePerEmail: true,
  },
  {
    code: "NOTHING20",
    discount: 20,
    minAmount: 2000,
    description: { uk: "−20% при замовленні від 2000 ₴", ru: "−20% при заказе от 2000 ₴" },
    oncePerEmail: true,
  },
  {
    code: "FIRSTDROP15",
    discount: 15,
    description: { uk: "−15% перший замовник", ru: "−15% первый заказ" },
    oncePerEmail: true,
  },
];

export interface PromoValidationResult {
  valid: boolean;
  promo?: Promocode;
  error?: "not_found" | "min_amount" | "already_used";
  errorMessage?: { uk: string; ru: string };
}

export function validatePromo(code: string, total: number, email?: string): PromoValidationResult {
  const promo = promocodes.find((p) => p.code.toUpperCase() === code.toUpperCase());

  if (!promo) {
    return {
      valid: false,
      error: "not_found",
      errorMessage: { uk: "Невірний промокод", ru: "Неверный промокод" },
    };
  }

  if (promo.minAmount && total < promo.minAmount) {
    return {
      valid: false,
      promo,
      error: "min_amount",
      errorMessage: {
        uk: `Мінімальна сума ${promo.minAmount} ₴`,
        ru: `Минимальная сумма ${promo.minAmount} ₴`,
      },
    };
  }

  if (promo.oncePerEmail && email && isPromoUsed(email, promo.code)) {
    return {
      valid: false,
      promo,
      error: "already_used",
      errorMessage: {
        uk: "Промокод вже використано",
        ru: "Промокод уже использован",
      },
    };
  }

  return { valid: true, promo };
}

const STORAGE_KEY = "vss-used-promos";

interface UsedPromo {
  email: string;
  code: string;
  usedAt: string;
}

export function isPromoUsed(email: string, code: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const used: UsedPromo[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return used.some(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.code.toUpperCase() === code.toUpperCase()
    );
  } catch {
    return false;
  }
}

export function markPromoUsed(email: string, code: string) {
  if (typeof window === "undefined") return;
  try {
    const used: UsedPromo[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    used.push({ email, code, usedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(used));
  } catch {}
}