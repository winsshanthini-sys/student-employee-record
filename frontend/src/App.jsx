import { useEffect, useState, useCallback } from "react";
import RecordForm from "./components/RecordForm.jsx";
import RecordTable from "./components/RecordTable.jsx";
import { fetchRecords, createRecord, updateRecord, deleteRecord } from "./api.js";

export default function App() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [editingRecord, setEditingRecord] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadRecords = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchRecords({ search, recordType: typeFilter });
      setRecords(data);
      setError("");
    } catch (err) {
      setError("Couldn't reach the backend. Is the Django server running on port 8000?");
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter]);

  useEffect(() => {
    const timeout = setTimeout(loadRecords, 250); // debounce search typing
    return () => clearTimeout(timeout);
  }, [loadRecords]);

  async function handleSubmit(formData) {
    try {
      if (editingRecord) {
        await updateRecord(editingRecord.id, formData);
        setEditingRecord(null);
      } else {
        await createRecord(formData);
      }
      await loadRecords();
    } catch (err) {
      setError("Save failed — check the ID number is unique and all fields are filled in.");
    }
  }

  async function handleDelete(record) {
    if (!window.confirm(`Delete the record for ${record.full_name}? This can't be undone.`)) return;
    try {
      await deleteRecord(record.id);
      await loadRecords();
    } catch (err) {
      setError("Delete failed.");
    }
  }

  const total = records.length;
  const students = records.filter((r) => r.record_type === "Student").length;
  const employees = records.filter((r) => r.record_type === "Employee").length;

  return (
    <div className="wrap">
      <header className="masthead">
        <h1>Roster</h1>
        <div className="tagline">
          A record book for students and employees — React frontend, Django REST backend.
        </div>
      </header>

      <div className="stats-row">
        <div className="stat">
          <span className="num">{total}</span>
          <span className="label">total records</span>
        </div>
        <div className="stat">
          <span className="num">{students}</span>
          <span className="label">students</span>
        </div>
        <div className="stat">
          <span className="num">{employees}</span>
          <span className="label">employees</span>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <RecordForm
        editingRecord={editingRecord}
        onSubmit={handleSubmit}
        onCancel={() => setEditingRecord(null)}
      />

      <RecordTable
        records={records}
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        onEdit={setEditingRecord}
        onDelete={handleDelete}
      />

      {loading && <div className="loading-note">Loading…</div>}

      <footer>Records are stored in the Django backend (SQLite database).</footer>
    </div>
  );
}
