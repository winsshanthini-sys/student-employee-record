import { useEffect, useState } from "react";

const emptyForm = {
  full_name: "",
  record_type: "Student",
  id_number: "",
  dept_class: "",
  email: "",
  join_date: "",
};

export default function RecordForm({ editingRecord, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingRecord) {
      setForm({
        full_name: editingRecord.full_name,
        record_type: editingRecord.record_type,
        id_number: editingRecord.id_number,
        dept_class: editingRecord.dept_class,
        email: editingRecord.email,
        join_date: editingRecord.join_date,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingRecord]);

  function handleChange(e) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    if (!editingRecord) setForm(emptyForm);
  }

  return (
    <section className="panel">
      <h2>{editingRecord ? "Edit record" : "Add a record"}</h2>
      <form className="entry-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="full_name">Full name</label>
          <input id="full_name" value={form.full_name} onChange={handleChange} required placeholder="e.g. Ananya Rao" />
        </div>

        <div className="field">
          <label htmlFor="record_type">Type</label>
          <select id="record_type" value={form.record_type} onChange={handleChange} required>
            <option value="Student">Student</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="id_number">ID number</label>
          <input id="id_number" value={form.id_number} onChange={handleChange} required placeholder="e.g. STU-2026-014" />
        </div>

        <div className="field">
          <label htmlFor="dept_class">Department / Class</label>
          <input id="dept_class" value={form.dept_class} onChange={handleChange} required placeholder="e.g. Computer Science" />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={form.email} onChange={handleChange} required placeholder="name@example.com" />
        </div>

        <div className="field">
          <label htmlFor="join_date">Join / Admission date</label>
          <input type="date" id="join_date" value={form.join_date} onChange={handleChange} required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingRecord ? "Save changes" : "Add record"}
          </button>
          {editingRecord && (
            <button type="button" className="btn-ghost" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
