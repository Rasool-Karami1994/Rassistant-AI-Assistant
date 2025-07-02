import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateStringToPodcastReleaseFormatHandler = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
  return formattedDate;
};
export const formatNumber = (num: number): string =>
  num.toLocaleString("en-US");
export const formatAmount = (amount: number | string) => {
  const num = Number(amount);
  return isNaN(num) ? amount : num.toLocaleString();
};
export const convertToPersianDigits = (value: string | number): string => {
  return value.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
};
export const convertToEnglishDigits = (value: string | number): string => {
  return value
    .toString()
    .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
};
export function timeAgoInPersian(dateInput: string | Date): string {
  const now: Date = new Date();
  const then: Date = new Date(dateInput);

  const diffMs: number = now.getTime() - then.getTime();
  const diffSec: number = Math.floor(diffMs / 1000);
  const diffMin: number = Math.floor(diffSec / 60);
  const diffHrs: number = Math.floor(diffMin / 60);
  const diffDays: number = Math.floor(diffHrs / 24);

  const toPersianDigits = (num: number): string =>
    num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  if (diffSec < 60) return 'چند لحظه پیش';
  if (diffMin < 60) return `${toPersianDigits(diffMin)} دقیقه پیش`;
  if (diffHrs < 24) return `${toPersianDigits(diffHrs)} ساعت پیش`;
  if (diffDays < 30) return `${toPersianDigits(diffDays)} روز پیش`;

  const diffMonths: number = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${toPersianDigits(diffMonths)} ماه پیش`;

  const diffYears: number = Math.floor(diffMonths / 12);
  return `${toPersianDigits(diffYears)} سال پیش`;
}

