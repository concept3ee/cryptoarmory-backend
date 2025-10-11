export interface ApiConfig {
  baseUrl?: string;
  authToken?: string;
}

export interface WithdrawRequest {
  amount: number;
  accountNumber: string;
  bankName: string;
  recipientName: string;
}

export interface WithdrawResponse {
  id: string;
  status: string;
  amount: number;
  createdAt: string;
}

const defaultConfig: Required<ApiConfig> = {
  baseUrl: (import.meta as any).env?.VITE_API_BASE_URL ?? 'http://localhost:4000',
  authToken: ''
};

export function createApi(config: ApiConfig = {}) {
  const cfg: Required<ApiConfig> = { ...defaultConfig, ...config } as Required<ApiConfig>;

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(cfg.authToken ? { Authorization: `Bearer ${cfg.authToken}` } : {})
    };

    const response = await fetch(`${cfg.baseUrl}${path}`, { ...init, headers });
    const text = await response.text();
    const payload = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const error = new Error(payload?.message || 'Request failed');
      (error as any).status = response.status;
      (error as any).payload = payload;
      throw error;
    }
    return payload as T;
  }

  return {
    // Auth
    async me() {
      return request('/api/auth/me');
    },
    async updateProfile(body: { firstName: string; lastName: string }) {
      return request('/api/auth/profile', { method: 'PUT', body: JSON.stringify(body) });
    },
    async changePassword(body: { currentPassword: string; newPassword: string }) {
      return request('/api/auth/change-password', { method: 'PUT', body: JSON.stringify(body) });
    },

    // Investments
    async investmentSummary() {
      return request('/api/investments/summary');
    },
    async listPlans() {
      return request('/api/investments/plans');
    },
    async createInvestment(body: { planId: string; amount: number }) {
      return request('/api/investments', { method: 'POST', body: JSON.stringify(body) });
    },
    async uploadInvestmentProof(investmentId: string, file: File) {
      const form = new FormData();
      form.append('file', file);
      return fetch(`${cfg.baseUrl}/api/investments/${investmentId}/proof`, {
        method: 'POST',
        headers: cfg.authToken ? { Authorization: `Bearer ${cfg.authToken}` } as any : undefined,
        body: form,
      }).then(r => r.json());
    },

    // Transactions: Withdraw
    async withdraw(body: WithdrawRequest): Promise<WithdrawResponse> {
      return request<WithdrawResponse>('/api/transactions/withdraw', {
        method: 'POST',
        body: JSON.stringify(body)
      });
    },
    async withdrawalHistory() {
      return request('/api/transactions/withdrawals');
    },

    // Notifications
    async notifications() {
      return request('/api/notifications');
    },
    async notificationsUnread() {
      return request('/api/notifications/unread-count');
    },
    async notificationsMarkRead(id: string) {
      return request(`/api/notifications/${id}/read`, { method: 'POST' });
    },
    async notificationsReadAll() {
      return request('/api/notifications/read-all', { method: 'POST' });
    },
  };
}

export type ApiClient = ReturnType<typeof createApi>;



