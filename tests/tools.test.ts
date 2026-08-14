import { describe, it, expect } from "vitest";
import { searchticketsHandler } from "../src/tools/searchtickets";
import { createticketHandler } from "../src/tools/createticket";
import { getticketbyidHandler } from "../src/tools/getticketbyid";
import { updateticketHandler } from "../src/tools/updateticket";
import { closeticketHandler } from "../src/tools/closeticket";
import { addticketreplyHandler } from "../src/tools/addticketreply";
import { escalateticketHandler } from "../src/tools/escalateticket";
import { getcustomerprofileHandler } from "../src/tools/getcustomerprofile";

describe("searchTickets", () => {
  it("returns a content array", async () => {
    const result = await searchticketsHandler({} as any);
    expect(result).toBeTruthy();
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
  });
});

describe("createTicket", () => {
  it("returns a content array", async () => {
    const result = await createticketHandler({} as any);
    expect(result).toBeTruthy();
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
  });
});

describe("getTicketById", () => {
  it("returns a content array", async () => {
    const result = await getticketbyidHandler({} as any);
    expect(result).toBeTruthy();
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
  });
});

describe("updateTicket", () => {
  it("returns a content array", async () => {
    const result = await updateticketHandler({} as any);
    expect(result).toBeTruthy();
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
  });
});

describe("closeTicket", () => {
  it("returns a content array", async () => {
    const result = await closeticketHandler({} as any);
    expect(result).toBeTruthy();
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
  });
});

describe("addTicketReply", () => {
  it("returns a content array", async () => {
    const result = await addticketreplyHandler({} as any);
    expect(result).toBeTruthy();
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
  });
});

describe("escalateTicket", () => {
  it("returns a content array", async () => {
    const result = await escalateticketHandler({} as any);
    expect(result).toBeTruthy();
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
  });
});

describe("getCustomerProfile", () => {
  it("returns a content array", async () => {
    const result = await getcustomerprofileHandler({} as any);
    expect(result).toBeTruthy();
    expect(result.content).toBeDefined();
    expect(Array.isArray(result.content)).toBe(true);
  });
});

