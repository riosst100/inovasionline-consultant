"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type FormState = { error?: string } | undefined;

export async function createProject(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  if (!session?.user || session.user.role !== "USER") {
    return { error: "Silakan masuk sebagai klien terlebih dahulu." };
  }

  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (!title || !category || !description) {
    return { error: "Semua field wajib diisi." };
  }

  const project = await prisma.project.create({
    data: {
      userId: session.user.id,
      title,
      category,
      description,
    },
  });

  revalidatePath("/dashboard");
  redirect(`/dashboard/project/${project.id}`);
}

export async function sendOffer(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Hanya admin yang dapat mengirim penawaran." };
  }

  const projectId = String(formData.get("projectId") || "");
  const estimasiWaktu = String(formData.get("estimasiWaktu") || "").trim();
  const budget = String(formData.get("budget") || "").trim();
  const scopeOfWork = String(formData.get("scopeOfWork") || "").trim();

  if (!projectId || !estimasiWaktu || !budget || !scopeOfWork) {
    return { error: "Semua field penawaran wajib diisi." };
  }

  const previousOffers = await prisma.offer.count({ where: { projectId } });

  await prisma.$transaction([
    prisma.offer.create({
      data: {
        projectId,
        round: previousOffers + 1,
        estimasiWaktu,
        budget,
        scopeOfWork,
      },
    }),
    prisma.project.update({
      where: { id: projectId },
      data: { status: "OFFERED" },
    }),
  ]);

  revalidatePath(`/admin/project/${projectId}`);
  revalidatePath(`/dashboard/project/${projectId}`);
}

export async function respondToOffer(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  if (!session?.user || session.user.role !== "USER") {
    return { error: "Tidak diizinkan." };
  }

  const offerId = String(formData.get("offerId") || "");
  const projectId = String(formData.get("projectId") || "");
  const action = String(formData.get("action") || "");

  const offer = await prisma.offer.findUnique({ where: { id: offerId } });
  if (!offer) return { error: "Penawaran tidak ditemukan." };

  if (action === "accept") {
    await prisma.$transaction([
      prisma.offer.update({ where: { id: offerId }, data: { status: "ACCEPTED" } }),
      prisma.project.update({ where: { id: projectId }, data: { status: "ACCEPTED" } }),
    ]);
  } else if (action === "reject") {
    await prisma.$transaction([
      prisma.offer.update({ where: { id: offerId }, data: { status: "REJECTED" } }),
      prisma.project.update({ where: { id: projectId }, data: { status: "REJECTED" } }),
    ]);
  } else if (action === "negotiate") {
    const message = String(formData.get("message") || "").trim();
    const proposedBudget = String(formData.get("proposedBudget") || "").trim();
    const proposedWaktu = String(formData.get("proposedWaktu") || "").trim();

    if (!message) return { error: "Pesan negosiasi tidak boleh kosong." };

    await prisma.$transaction([
      prisma.negotiation.create({
        data: {
          offerId,
          sender: "USER",
          message,
          proposedBudget: proposedBudget || undefined,
          proposedWaktu: proposedWaktu || undefined,
        },
      }),
      prisma.offer.update({ where: { id: offerId }, data: { status: "NEGOTIATING" } }),
      prisma.project.update({ where: { id: projectId }, data: { status: "NEGOTIATING" } }),
    ]);
  }

  revalidatePath(`/dashboard/project/${projectId}`);
  revalidatePath(`/admin/project/${projectId}`);
}

export async function adminReplyNegotiation(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Tidak diizinkan." };
  }

  const offerId = String(formData.get("offerId") || "");
  const projectId = String(formData.get("projectId") || "");
  const message = String(formData.get("message") || "").trim();
  const proposedBudget = String(formData.get("proposedBudget") || "").trim();
  const proposedWaktu = String(formData.get("proposedWaktu") || "").trim();

  if (!message) return { error: "Pesan balasan tidak boleh kosong." };

  await prisma.negotiation.create({
    data: {
      offerId,
      sender: "ADMIN",
      message,
      proposedBudget: proposedBudget || undefined,
      proposedWaktu: proposedWaktu || undefined,
    },
  });

  revalidatePath(`/dashboard/project/${projectId}`);
  revalidatePath(`/admin/project/${projectId}`);
}

export async function updateProjectStatus(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Tidak diizinkan." };
  }

  const projectId = String(formData.get("projectId") || "");
  const status = String(formData.get("status") || "");

  await prisma.project.update({
    where: { id: projectId },
    data: { status: status as never },
  });

  revalidatePath(`/admin/project/${projectId}`);
  revalidatePath("/admin");
}
