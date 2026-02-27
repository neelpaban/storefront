// /src/lib/device.js
import { headers } from "next/headers";

export async function isMobileDevice() {
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || "";
  return /android|iphone|ipod|mobile/i.test(userAgent);
}