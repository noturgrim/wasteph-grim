import { db } from "../db/index.js";
import { clientsShowcaseTable } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";

/**
 * Clients Showcase Service
 * Handles business logic for client showcase items
 */

class ClientsShowcaseService {
  /**
   * Get all active client showcases (public)
   */
  async getActiveClientsShowcase() {
    const clients = await db
      .select()
      .from(clientsShowcaseTable)
      .where(eq(clientsShowcaseTable.isActive, true))
      .orderBy(desc(clientsShowcaseTable.createdAt));

    return clients;
  }

  /**
   * Get all client showcases (admin - includes inactive)
   */
  async getAllClientsShowcase() {
    const clients = await db
      .select()
      .from(clientsShowcaseTable)
      .orderBy(desc(clientsShowcaseTable.createdAt));

    return clients;
  }

  /**
   * Get client showcase by ID
   */
  async getClientsShowcaseById(id) {
    const [client] = await db
      .select()
      .from(clientsShowcaseTable)
      .where(eq(clientsShowcaseTable.id, id))
      .limit(1);

    return client || null;
  }

  /**
   * Create new client showcase
   */
  async createClientsShowcase(clientData, userId) {
    const [client] = await db
      .insert(clientsShowcaseTable)
      .values({
        ...clientData,
        createdBy: userId,
      })
      .returning();

    return client;
  }

  /**
   * Update client showcase
   */
  async updateClientsShowcase(id, clientData) {
    const [updated] = await db
      .update(clientsShowcaseTable)
      .set({
        ...clientData,
        updatedAt: new Date(),
      })
      .where(eq(clientsShowcaseTable.id, id))
      .returning();

    return updated;
  }

  /**
   * Delete client showcase
   */
  async deleteClientsShowcase(id) {
    const [deleted] = await db
      .delete(clientsShowcaseTable)
      .where(eq(clientsShowcaseTable.id, id))
      .returning();

    return deleted;
  }

  /**
   * Toggle client showcase active status
   */
  async toggleClientsShowcaseStatus(id) {
    const client = await this.getClientsShowcaseById(id);
    
    if (!client) {
      throw new Error("Client showcase not found");
    }

    const [updated] = await db
      .update(clientsShowcaseTable)
      .set({
        isActive: !client.isActive,
        updatedAt: new Date(),
      })
      .where(eq(clientsShowcaseTable.id, id))
      .returning();

    return updated;
  }
}

export default new ClientsShowcaseService();
