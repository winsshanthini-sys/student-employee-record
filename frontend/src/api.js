const BASE_URL = "http://127.0.0.1:8000/api/records/";

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function fetchRecords({ search = "", recordType = "all" } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (recordType && recordType !== "all") params.set("record_type", recordType);

  const url = params.toString() ? `${BASE_URL}?${params.toString()}` : BASE_URL;
  const res = await fetch(url);
  const data = await handleResponse(res);
  // DRF pagination wraps results in { results: [...] }
  return Array.isArray(data) ? data : data.results;
}

export async function createRecord(payload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateRecord(id, payload) {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteRecord(id) {
  const res = await fetch(`${BASE_URL}${id}/`, { method: "DELETE" });
  return handleResponse(res);
}
