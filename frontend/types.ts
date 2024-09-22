// Request and response types
type RequestBody = Record<string, any>;

type Responses = 
  | Record<string, any>  // For single object responses
  | Record<string, any>[] // For array responses
  | string;              // For plain text or JWT responses

// Endpoint definition
type Endpoint = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  requestBody?: RequestBody;
  response: Responses;
  authRequired?: boolean;
};

// API Category definition
type ApiCategory = {
  id: string;
  title: string;
  description: string;
  endpoints: Endpoint[];
};

// Complete API reference
type ApiReference = ApiCategory[];
