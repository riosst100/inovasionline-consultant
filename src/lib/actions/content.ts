"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type FormState = { error?: string } | undefined;

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Tidak diizinkan.");
  }
}

// ===== Programmer (Tim) =====

export async function createProgrammer(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Tidak diizinkan." };
  }

  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const skills = String(formData.get("skills") || "").trim();
  const linkedin = String(formData.get("linkedin") || "").trim();
  const order = Number(formData.get("order") || 0);

  if (!name || !role || !skills) {
    return { error: "Nama, role, dan skills wajib diisi." };
  }

  await prisma.programmer.create({
    data: { name, role, skills, linkedin: linkedin || undefined, order },
  });

  revalidatePath("/admin/team");
  revalidatePath("/");
}

export async function updateProgrammer(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Tidak diizinkan." };
  }

  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const skills = String(formData.get("skills") || "").trim();
  const linkedin = String(formData.get("linkedin") || "").trim();
  const order = Number(formData.get("order") || 0);

  if (!id || !name || !role || !skills) {
    return { error: "Nama, role, dan skills wajib diisi." };
  }

  await prisma.programmer.update({
    where: { id },
    data: { name, role, skills, linkedin: linkedin || undefined, order },
  });

  revalidatePath("/admin/team");
  revalidatePath("/");
}

export async function deleteProgrammer(id: string) {
  await requireAdmin();
  await prisma.programmer.delete({ where: { id } });
  revalidatePath("/admin/team");
  revalidatePath("/");
}

// ===== Portfolio =====

export async function createPortfolioItem(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Tidak diizinkan." };
  }

  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const link = String(formData.get("link") || "").trim();
  const order = Number(formData.get("order") || 0);

  if (!title || !category || !description) {
    return { error: "Judul, kategori, dan deskripsi wajib diisi." };
  }

  await prisma.portfolioItem.create({
    data: { title, category, description, link: link || undefined, order },
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/");
}

export async function updatePortfolioItem(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Tidak diizinkan." };
  }

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const link = String(formData.get("link") || "").trim();
  const order = Number(formData.get("order") || 0);

  if (!id || !title || !category || !description) {
    return { error: "Judul, kategori, dan deskripsi wajib diisi." };
  }

  await prisma.portfolioItem.update({
    where: { id },
    data: { title, category, description, link: link || undefined, order },
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/");
}

export async function deletePortfolioItem(id: string) {
  await requireAdmin();
  await prisma.portfolioItem.delete({ where: { id } });
  revalidatePath("/admin/portfolio");
  revalidatePath("/");
}
