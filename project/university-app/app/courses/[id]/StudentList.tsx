interface Props {
  courseId: number;
}

export default async function StudentList({ courseId }: Props) {
  const res = await fetch(`/api/courses/${courseId}/students`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p>Nepavyko gauti studentų sąrašo.</p>;
  }

  const students = await res.json();

  if (!Array.isArray(students) || students.length === 0) {
    return <p>Šiame kurse dar nėra studentų.</p>;
  }

  return (
    <ul style={{ listStyle: "none", paddingLeft: 0, marginBottom: "8px" }}>
      {students.map((s: any) => (
        <li
          key={s.id}
          style={{
            padding: "8px 10px",
            borderRadius: "10px",
            background: "#020617",
            border: "1px solid #1f2937",
            marginBottom: "6px",
          }}
        >
          <strong>{s.name || "Be vardo"}</strong>{" "}
          <span style={{ color: "#9ca3af" }}>({s.email})</span>{" "}
          <span style={{ fontSize: "12px", color: "#6b7280" }}>– {s.role}</span>
        </li>
      ))}
    </ul>
  );
}
