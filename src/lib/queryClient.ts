import { QueryClient } from "@tanstack/react-query";

// Modified for client-side only operation
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // For external APIs that allow CORS
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    // Remove credentials for static hosting
    // credentials: "include", 
  });

  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
  
  return res;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Simplified query function for client-side only
      queryFn: async ({ queryKey }) => {
        const res = await fetch(queryKey[0] as string);
        
        if (!res.ok) {
          throw new Error(`Error fetching data: ${res.status}`);
        }
        
        return await res.json();
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
