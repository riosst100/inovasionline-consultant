"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export type FormState = { error?: string } | undefined;

export async function registerUser(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");
  const company = String(formData.get("company") || "").trim();
  const phone = String(formData.get("phone") || "").trim();

  if (!name || !email || !password) {
    return { error: "Nama, email, dan password wajib diisi." };
  }
  if (password.length < 8) {
    return { error: "Password minimal 8 karakter." };
  }
  if (password !== confirmPassword) {
    return { error: "Konfirmasi password tidak cocok." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Email sudah terdaftar. Silakan masuk." };
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      company: company || undefined,
      phone: phone || undefined,
      role: "USER",
    },
  });

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}

export async function loginUser(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "Email atau password salah." };
    }
    throw err;
  }
}

export async function loginAdmin(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.role !== "ADMIN") {
    return { error: "Akun admin tidak ditemukan." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "Email atau password salah." };
    }
    throw err;
  }
}

export async function logout() {
  const { signOut } = await import("@/lib/auth");
  await signOut({ redirectTo: "/" });
  redirect("/");
}
