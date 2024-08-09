"use server";

import { cookies } from "next/headers";

export async function testSetCookie() {
  cookies().set({
    name: "cookiesName",
    value: "cookiesValue",
    maxAge: 365,
    domain: ".jne.co.id",
  });
  return;
}

export async function testGetCookie() {
  return cookies().get("cookiesName")?.value;
}
