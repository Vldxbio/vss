"use client";

import { useState, useEffect } from "react";

export type CarrierType = "novaposhta" | "ukrposhta";

export interface NPCity {
  Ref: string;
  Description: string;
  AreaDescription: string;
}

export interface NPWarehouse {
  Ref: string;
  Description: string;
  Number: string;
  CategoryOfWarehouse: string;
  CityRef: string;
}

const NP_API_URL = "/api/novaposhta";

async function npRequest(modelName: string, calledMethod: string, methodProperties: Record<string, any>): Promise<any[]> {
  try {
    const res = await fetch(NP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modelName, calledMethod, methodProperties }),
    });
    if (!res.ok) throw new Error("NP API error");
    const json = await res.json();
    if (!json.success) {
      console.warn("NP API:", json.errors);
      return [];
    }
    return json.data || [];
  } catch (e) {
    console.error("NP fetch error:", e);
    return [];
  }
}

// Нова Пошта
export function useNPCitySearch(query: string) {
  const [cities, setCities] = useState<NPCity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setCities([]);
      return;
    }
    let cancelled = false;
    setLoading(true);

    const timer = setTimeout(async () => {
      const data = await npRequest("Address", "searchSettlements", {
        CityName: query.trim(),
        Limit: "10",
      });
      if (cancelled) return;
      const flat: NPCity[] = [];
      data.forEach((entry: any) => {
        if (entry.Addresses && Array.isArray(entry.Addresses)) {
          entry.Addresses.forEach((addr: any) => {
            if (addr.MainDescription) {
              flat.push({
                Ref: addr.DeliveryCity || addr.Ref || "",
                Description: addr.MainDescription,
                AreaDescription: addr.Area || "",
              });
            }
          });
        }
      });
      if (flat.length === 0) {
        const fb = await npRequest("Address", "getCities", { FindByString: query.trim(), Limit: "10" });
        if (cancelled) return;
        fb.forEach((c: any) => flat.push({ Ref: c.Ref, Description: c.Description, AreaDescription: c.AreaDescription || "" }));
      }
      setCities(flat.slice(0, 10));
      setLoading(false);
    }, 400);

    return () => { cancelled = true; clearTimeout(timer); };
  }, [query]);

  return { cities, loading };
}

export function useNPWarehouses(cityRef: string | null, type: "branch" | "postomat") {
  const [warehouses, setWarehouses] = useState<NPWarehouse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cityRef) { setWarehouses([]); return; }
    let cancelled = false;
    setLoading(true);
    (async () => {
      const data = await npRequest("AddressGeneral", "getWarehouses", {
        CityRef: cityRef, Limit: "500", Page: "1",
      });
      if (cancelled) return;
      const filtered = data.filter((w: any) => {
        const cat = (w.CategoryOfWarehouse || "").toLowerCase();
        const desc = (w.Description || "").toLowerCase();
        if (type === "postomat") return cat.includes("postomat") || desc.includes("поштомат");
        return !cat.includes("postomat") && !desc.includes("поштомат");
      });
      const mapped: NPWarehouse[] = filtered.map((w: any) => ({
        Ref: w.Ref,
        Description: w.Description,
        Number: w.Number || "",
        CategoryOfWarehouse: w.CategoryOfWarehouse || "",
        CityRef: w.CityRef || cityRef,
      }));
      setWarehouses(mapped);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [cityRef, type]);

  return { warehouses, loading };
}

// Укрпошта
export interface UPCity {
  id: string;
  name: string;
  region: string;
}

export interface UPWarehouse {
  id: string;
  address: string;
  type: string;
}

const UP_CITIES_FALLBACK: UPCity[] = [
  { id: "01001", name: "Київ", region: "Київська обл." },
  { id: "61001", name: "Харків", region: "Харківська обл." },
  { id: "65001", name: "Одеса", region: "Одеська обл." },
  { id: "79001", name: "Львів", region: "Львівська обл." },
  { id: "49001", name: "Дніпро", region: "Дніпропетровська обл." },
  { id: "69001", name: "Запоріжжя", region: "Запорізька обл." },
  { id: "21001", name: "Вінниця", region: "Вінницька обл." },
  { id: "73001", name: "Херсон", region: "Херсонська обл." },
  { id: "76001", name: "Івано-Франківськ", region: "Івано-Франківська обл." },
  { id: "43001", name: "Луцьк", region: "Волинська обл." },
  { id: "46001", name: "Тернопіль", region: "Тернопільська обл." },
  { id: "10001", name: "Житомир", region: "Житомирська обл." },
  { id: "14001", name: "Чернігів", region: "Чернігівська обл." },
  { id: "18001", name: "Черкаси", region: "Черкаська обл." },
  { id: "25001", name: "Кропивницький", region: "Кіровоградська обл." },
  { id: "29001", name: "Хмельницький", region: "Хмельницька обл." },
  { id: "33001", name: "Рівне", region: "Рівненська обл." },
  { id: "36001", name: "Полтава", region: "Полтавська обл." },
  { id: "39001", name: "Кременчук", region: "Полтавська обл." },
  { id: "40001", name: "Суми", region: "Сумська обл." },
  { id: "54001", name: "Миколаїв", region: "Миколаївська обл." },
  { id: "58001", name: "Чернівці", region: "Чернівецька обл." },
  { id: "88001", name: "Ужгород", region: "Закарпатська обл." },
  { id: "85001", name: "Краматорськ", region: "Донецька обл." },
  { id: "84001", name: "Маріуполь", region: "Донецька обл." },
];

export function useUPCitySearch(query: string) {
  const [cities, setCities] = useState<UPCity[]>([]);
  const [loading] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 1) {
      setCities([]);
      return;
    }
    const q = query.trim().toLowerCase();
    const filtered = UP_CITIES_FALLBACK.filter((c) =>
      c.name.toLowerCase().includes(q)
    ).slice(0, 10);
    setCities(filtered);
  }, [query]);

  return { cities, loading };
}

export function useUPWarehouses(cityId: string | null) {
  const [warehouses, setWarehouses] = useState<UPWarehouse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cityId) { setWarehouses([]); return; }
    setLoading(true);
    // Mock-список отделений Укрпошты (так как у Укрпошты нет публичного открытого API без регистрации)
    const mock: UPWarehouse[] = [
      { id: `${cityId}-1`, address: `Відділення №1, ${cityId}`, type: "branch" },
      { id: `${cityId}-2`, address: `Відділення №2, ${cityId}`, type: "branch" },
      { id: `${cityId}-3`, address: `Відділення №3, ${cityId}`, type: "branch" },
      { id: `${cityId}-5`, address: `Відділення №5, ${cityId}`, type: "branch" },
      { id: `${cityId}-7`, address: `Відділення №7, ${cityId}`, type: "branch" },
      { id: `${cityId}-12`, address: `Відділення №12, ${cityId}`, type: "branch" },
      { id: `${cityId}-15`, address: `Відділення №15, ${cityId}`, type: "branch" },
      { id: `${cityId}-21`, address: `Відділення №21, ${cityId}`, type: "branch" },
    ];
    setTimeout(() => {
      setWarehouses(mock);
      setLoading(false);
    }, 300);
  }, [cityId]);

  return { warehouses, loading };
}