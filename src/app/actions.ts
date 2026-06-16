"use server";

export type EnquiryState = { status: "idle" | "success" | "error" };

/**
 * Lead capture for the contact form. Validates the required fields and returns
 * a success/error state. In production, forward the payload to a CRM or email
 * provider where the comment is.
 */
export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const validEmail = /.+@.+\..+/.test(email);

  if (!name || !validEmail) {
    return { status: "error" };
  }

  // TODO: forward { name, email, phone, budget, type, area, message } to your
  // CRM / email provider here.
  await new Promise((resolve) => setTimeout(resolve, 700));

  return { status: "success" };
}
