import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { searchticketsHandler } from "./tools/searchtickets.js";
import { createticketHandler } from "./tools/createticket.js";
import { getticketbyidHandler } from "./tools/getticketbyid.js";
import { updateticketHandler } from "./tools/updateticket.js";
import { closeticketHandler } from "./tools/closeticket.js";
import { addticketreplyHandler } from "./tools/addticketreply.js";
import { escalateticketHandler } from "./tools/escalateticket.js";
import { getcustomerprofileHandler } from "./tools/getcustomerprofile.js";

/**
 * Build a fresh MCP server instance.
 *
 * We export a FACTORY rather than a singleton so the HTTP
 * transport can hand each new session its own `McpServer`.
 * The MCP SDK rejects a second `initialize` on the same
 * Server instance, so a per-session factory is mandatory
 * for the streamable-http transport.
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: "Support Ticketing API",
    version: "0.1.0",
  });

  // ---------- Tools ----------
  server.registerTool("searchTickets", {
    description: "Returns tickets matching the given filters, cursor-paginated.",
    inputSchema: { status: z.string().optional(), priority: z.string().optional(), assigneeEmail: z.string().optional(), cursor: z.string().optional(), limit: z.number().optional() },
  }, searchticketsHandler);

  server.registerTool("createTicket", {
    description: "Opens a new ticket on behalf of a customer.",
    inputSchema: { body: z.record(z.any()) },
  }, createticketHandler);

  server.registerTool("getTicketById", {
    description: "Retrieves full details of a single ticket, including its reply thread.",
    inputSchema: { ticketId: z.string() },
  }, getticketbyidHandler);

  server.registerTool("updateTicket", {
    description: "Partially updates a ticket — typically used to change status, reassign, or reprioritize.",
    inputSchema: { ticketId: z.string(), body: z.record(z.any()) },
  }, updateticketHandler);

  server.registerTool("closeTicket", {
    description: "Permanently closes a ticket. Closed tickets are read-only.",
    inputSchema: { ticketId: z.string() },
  }, closeticketHandler);

  server.registerTool("addTicketReply", {
    description: "Adds a reply to the ticket's activity thread, optionally with file attachments and marked as an internal (agent-only) note.\n",
    inputSchema: { ticketId: z.string(), body: z.record(z.any()) },
  }, addticketreplyHandler);

  server.registerTool("escalateTicket", {
    description: "Marks the ticket as ESCALATED and optionally routes it to a specific team.",
    inputSchema: { ticketId: z.string(), body: z.record(z.any()) },
  }, escalateticketHandler);

  server.registerTool("getCustomerProfile", {
    description: "Retrieves a customer's contact info, plan, and open-ticket count — useful context before replying.",
    inputSchema: { customerId: z.string() },
  }, getcustomerprofileHandler);

  // ---------- Resources ----------
  server.registerResource("Ticket", "", {
    description: "",
    mimeType: "application/json",
  }, async (uri) => ({
    contents: [{ uri: uri.href, text: "TODO: return resource contents" }]
  }));

  server.registerResource("Reply", "", {
    description: "",
    mimeType: "application/json",
  }, async (uri) => ({
    contents: [{ uri: uri.href, text: "TODO: return resource contents" }]
  }));

  server.registerResource("TicketDetail", "", {
    description: "",
    mimeType: "application/json",
  }, async (uri) => ({
    contents: [{ uri: uri.href, text: "TODO: return resource contents" }]
  }));

  server.registerResource("CustomerProfile", "", {
    description: "",
    mimeType: "application/json",
  }, async (uri) => ({
    contents: [{ uri: uri.href, text: "TODO: return resource contents" }]
  }));

  // ---------- Prompts ----------
  server.registerPrompt("Support Ticketing MCP - Overview", {
    description: "A customer support ticketing MCP — search/create/update tickets, post replies with attachments, escalate, and look up customer profiles. Used to end-to-end test MCP generation (spec parse into tools, mock server, contract testing, code analysis) with richer schemas than a plain CRUD example: nested objects, arrays of objects, enums, and pagination.\n",
    argsSchema: {},
  }, async (args) => ({
    messages: [{ role: "user" as const, content: { type: "text" as const, text: `` } }]
  }));

  server.registerPrompt("Tickets API", {
    description: "Operations for managing support tickets",
    argsSchema: {},
  }, async (args) => ({
    messages: [{ role: "user" as const, content: { type: "text" as const, text: `` } }]
  }));

  server.registerPrompt("Customers API", {
    description: "Customer profile lookups",
    argsSchema: {},
  }, async (args) => ({
    messages: [{ role: "user" as const, content: { type: "text" as const, text: `` } }]
  }));

  return server;
}
