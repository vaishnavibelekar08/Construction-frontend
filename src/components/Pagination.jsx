const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-between mt-3 flex-wrap gap-2">
      <small style={{ color: 'var(--text-muted)' }}>
        Showing <strong style={{ color: 'var(--primary)' }}>{start}–{end}</strong> of <strong style={{ color: 'var(--primary)' }}>{totalItems}</strong> entries
      </small>
      <div className="d-flex gap-1">
        <button
          className="btn btn-sm"
          style={btnStyle(currentPage === 1)}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', padding: '0 6px' }}>…</span>
          ) : (
            <button
              key={p}
              className="btn btn-sm"
              style={p === currentPage ? btnStyleActive() : btnStyle(false)}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          )
        )}
        <button
          className="btn btn-sm"
          style={btnStyle(currentPage === totalPages)}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

const btnStyle = (disabled) => ({
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border-color)',
  color: disabled ? 'var(--text-muted)' : 'var(--text-light)',
  borderRadius: 8,
  minWidth: 34,
  opacity: disabled ? 0.5 : 1,
});

const btnStyleActive = () => ({
  background: 'var(--gradient-primary)',
  border: 'none',
  color: '#000',
  borderRadius: 8,
  minWidth: 34,
  fontWeight: 700,
});

export default Pagination;
