/**
 * Public API service for unauthenticated endpoints
 * Used by landing page and other public-facing features
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class PublicApiService {
  /**
   * Submit lead from landing page contact form
   * @param {Object} leadData - Lead information
   * @returns {Promise<Object>} API response
   */
  async submitLead(leadData) {
    try {
      const response = await fetch(`${API_URL}/public/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit inquiry");
      }

      return data;
    } catch (error) {
      console.error("Error submitting lead:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const publicApi = new PublicApiService();
