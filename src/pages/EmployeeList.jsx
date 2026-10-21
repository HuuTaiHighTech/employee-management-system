import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'




const EmployeeList = () => {
  const [arrEmployees, setArrEmployees] = useState([])
  const [isDeleting, setIsDeleting] = useState(false)
  
  const getAllEmployeeAPI = async () => {
    try {
      const res = await axios.get(
        'https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
      )
      setArrEmployees(res.data)
    } catch (error) {
      throw new Error('Không thể tải danh sách nhân viên từ API.', { cause: error })
    }
  }

  useEffect(() => {
    getAllEmployeeAPI()
  }, [])

  const handleDeleteEmployee = async (maNhanVien) => {
    setIsDeleting(true)
    try {
      await axios.delete(
        `https://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${encodeURIComponent(maNhanVien)}`,
      )
      setArrEmployees((employees) =>
        employees.filter((employee) => employee.maNhanVien !== maNhanVien),
      )
      alert('Đã xóa nhân viên thành công!')
    } catch (error) {
      alert(
        'Xóa thất bại: ' +
        (error.response?.data?.message || error.message),
      )
    } finally {
      setIsDeleting(false)
    }
  }



  return (
    <div className="">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1">Quản lý nhân viên</h3>
          <p className="text-muted small mb-0">
            Danh sách nhân viên trong hệ thống
          </p>
        </div>
        <Link
          to="/admin/employee"
          className="btn btn-danger rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm border-0"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Thêm nhân viên</span>
        </Link>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ minWidth: '900px' }}>
            <thead className="table-light text-muted small text-uppercase">
              <tr>
                <th scope="col" className="py-3 px-3 text-center" style={{ width: '64px' }}>
                  STT
                </th>
                <th scope="col" className="py-3 px-3" style={{ width: '140px' }}>
                  Mã nhân viên
                </th>
                <th scope="col" className="py-3 px-3">
                  Họ và tên
                </th>
                <th scope="col" className="py-3 px-3">
                  Chức vụ
                </th>
                <th scope="col" className="py-3 px-3 text-center" style={{ width: '140px' }}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {
                arrEmployees.map((employee, index) => (
                  <tr key={employee.maNhanVien}>
                    <td className="text-center text-muted">{index + 1}</td>
                    <td className="px-3 fw-semibold text-secondary">
                      {employee.maNhanVien}
                    </td>
                    <td className="px-3 fw-semibold text-dark">
                      {employee.tenNhanVien}
                    </td>
                    <td className="px-3">
                      <span className="badge rounded-pill bg-light text-dark border">
                        {employee.chucVu}
                      </span>
                    </td>
                    <td className="px-3 text-center">
                      <div className="d-inline-flex align-items-center gap-1">
                        <Link
                          to={`/admin/employee/${employee.maNhanVien}`}
                          className="btn btn-sm btn-light text-success rounded-circle p-2"
                          title="Chỉnh sửa nhân viên"
                          aria-label={`Chỉnh sửa ${employee.tenNhanVien}`}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-light text-danger rounded-circle p-2"
                          title="Xóa nhân viên"
                          aria-label={`Xóa ${employee.tenNhanVien}`}
                          onClick={() => handleDeleteEmployee(employee.maNhanVien)}
                          disabled={isDeleting}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="card-footer bg-white py-3 px-4 border-top">
          <span className="small text-muted">
            Tổng số: <strong>{arrEmployees.length}</strong> nhân viên
          </span>
        </div>
      </div>
    </div>
  )
}

export default EmployeeList
