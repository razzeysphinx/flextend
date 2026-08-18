import { beforeEach, describe, expect, it, vi } from "vitest";
import { createClient } from "./client";
import { createAppointment } from "./data";

vi.mock("./client", () => ({
  createClient: vi.fn(),
}));

const mockedCreateClient = vi.mocked(createClient);

describe("createAppointment", () => {
  let from: ReturnType<typeof vi.fn>;
  let insert: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    insert = vi.fn().mockResolvedValue({ data: null, error: null });
    from = vi.fn().mockReturnValue({ insert });
    mockedCreateClient.mockReturnValue({ from } as never);
  });

  it("inserts a pending request without asking for the inserted row", async () => {
    await createAppointment({
      patient_name: "  Juan Dela Cruz  ",
      patient_phone: " 09212265302 ",
      patient_email: " juan@example.com ",
      service_title: " Physical Therapy Evaluation ",
      preferred_date: "",
      notes: "  Requested from the landing page  ",
    });

    expect(from).toHaveBeenCalledWith("appointments");
    expect(insert).toHaveBeenCalledOnce();
    expect(insert).toHaveBeenCalledWith({
      patient_name: "Juan Dela Cruz",
      patient_phone: "09212265302",
      patient_email: "juan@example.com",
      service_title: "Physical Therapy Evaluation",
      preferred_date: null,
      notes: "Requested from the landing page",
      status: "pending",
    });
  });

  it("surfaces the database error to the caller", async () => {
    insert.mockResolvedValueOnce({
      data: null,
      error: { message: "insert denied by policy" },
    });

    await expect(
      createAppointment({
        patient_name: "Juan Dela Cruz",
        patient_phone: "09212265302",
        service_title: "Physical Therapy Evaluation",
      })
    ).rejects.toThrow("insert denied by policy");
  });
});
