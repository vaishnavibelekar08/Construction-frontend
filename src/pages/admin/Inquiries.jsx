import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import Pagination from "../../components/Pagination";
import api from "../../api/axios";

const PER_PAGE = 10;

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const load = () => {
    api
      .get("/inquiries")
      .then((r) => {
        setInquiries(r.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };
  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    setDeleting(id);
    await api.delete(`/inquiries/${id}`);
    setInquiries((prev) => prev.filter((i) => i.inquiry_id !== id));
    setDeleting(null);
  };

  return (
    <AdminLayout title="Inquiries Management">
      <div className="card-dark p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 style={{ color: "var(--primary)", margin: 0 }}>
            Customer Inquiries ({inquiries.length})
          </h5>
        </div>
        {loading ? (
          <div className="text-center py-4">
            <div
              className="spinner-border"
              style={{ color: "var(--primary)" }}
            ></div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-inbox"
              style={{ fontSize: "3rem", color: "var(--text-muted)" }}
            ></i>
            <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>
              No inquiries yet.
            </p>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Budget</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries
                    .slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
                    .map((inq, i) => (
                      <tr key={inq.inquiry_id}>
                        <td>{(currentPage - 1) * PER_PAGE + i + 1}</td>
                        <td style={{ fontWeight: 600 }}>{inq.name}</td>
                        <td>{inq.phone}</td>
                        <td>{inq.email || "—"}</td>
                        <td
                          style={{
                            maxWidth: 150,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {inq.address || "—"}
                        </td>
                        <td>
                          <span
                            style={{
                              background: "rgba(200,134,10,0.1)",
                              color: "var(--primary)",
                              padding: "2px 8px",
                              borderRadius: 50,
                              fontSize: "0.75rem",
                            }}
                          >
                            {inq.project_type || "General"}
                          </span>
                        </td>
                        <td style={{ fontSize: "0.85rem" }}>
                          {inq.budget || "—"}
                        </td>
                        <td
                          style={{
                            maxWidth: 200,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {inq.message || "—"}
                        </td>
                        <td style={{ fontSize: "0.8rem" }}>
                          {new Date(inq.created_at).toLocaleDateString("en-IN")}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm"
                            style={{
                              background: "rgba(220,53,69,0.15)",
                              color: "#ea868f",
                              border: "1px solid rgba(220,53,69,0.3)",
                              borderRadius: 8,
                            }}
                            onClick={() => handleDelete(inq.inquiry_id)}
                            disabled={deleting === inq.inquiry_id}
                          >
                            {deleting === inq.inquiry_id ? (
                              <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                              <i className="bi bi-trash"></i>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalItems={inquiries.length}
              itemsPerPage={PER_PAGE}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminInquiries;
