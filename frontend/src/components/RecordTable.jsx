function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function RecordTable({
  records,
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  onEdit,
  onDelete,
}) {
  return (
    <section className="panel">
      <h2>All records</h2>

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search by name, ID, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All types</option>
          <option value="Student">Students only</option>
          <option value="Employee">Employees only</option>
        </select>
      </div>

      {records.length === 0 ? (
        <div className="empty-state">No records match. Add one above or clear your search.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>ID</th>
              <th>Dept / Class</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.full_name}</td>
                <td>
                  <span className={`tag ${rec.record_type.toLowerCase()}`}>{rec.record_type}</span>
                </td>
                <td>{rec.id_number}</td>
                <td>{rec.dept_class}</td>
                <td>{rec.email}</td>
                <td>{formatDate(rec.join_date)}</td>
                <td>
                  <div className="row-actions">
                    <button className="btn-edit" onClick={() => onEdit(rec)}>
                      Edit
                    </button>
                    <button className="btn-del" onClick={() => onDelete(rec)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
