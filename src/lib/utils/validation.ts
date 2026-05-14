// Маска телефона +380XXXXXXXXX
export function formatPhone(value: string): string {
  // Удаляем всё кроме цифр
  let digits = value.replace(/\D/g, "");

  // Если начинается с 0 — заменяем на 380
  if (digits.startsWith("0")) {
    digits = "380" + digits.slice(1);
  }
  // Если без префикса — добавляем 380
  else if (!digits.startsWith("380") && digits.length > 0) {
    digits = "380" + digits;
  }

  // Обрезаем до 12 цифр (380 + 9 цифр)
  digits = digits.slice(0, 12);

  // Форматируем: +380 XX XXX XX XX
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `+${digits}`;
  if (digits.length <= 5) return `+${digits.slice(0, 3)} ${digits.slice(3)}`;
  if (digits.length <= 8) return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
  if (digits.length <= 10) return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`;
}

export function validatePhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("380");
}

export function validateEmail(value: string): boolean {
  if (!value) return true; // опционально
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateTelegram(value: string): boolean {
  if (!value) return true; // опционально
  const clean = value.replace("@", "");
  return /^[a-zA-Z0-9_]{4,32}$/.test(clean);
}

export function validateName(value: string): boolean {
  return value.trim().length >= 2;
}