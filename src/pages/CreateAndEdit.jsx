import axios from 'axios'
import { useFormik } from 'formik'
import { useCallback, useEffect } from 'react'
import { Link, useMatch, useNavigate } from 'react-router-dom'

const CreateAndEdit = () => {
  const match = useMatch('/admin/employee/:id')
  const isEdit = !!match
  console.log('isEdit', isEdit)
  const navigate = useNavigate()
  const employeeInfo = useFormik({
    enableReinitialize: isEdit,
    initialValues: {
      "maNhanVien": 0,
      "tenNhanVien": "string",
      "chucVu": "string",
      "heSoChucVu": 0,
      "luongCoBan": 0,
      "soGioLamTrongThang": 0
    },
    onSubmit: async (values) => {
      // values dữ liệu input từ form
      console.log(values)

      let urlAPI = 'https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/ThemNhanVien';
      let method = 'post'
      if (isEdit) {
        //nếu là cập nhật thì đổi urlAPI và method tương ứng với update
        urlAPI = 'https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${match?.params?.id}'
        method = 'put'
      }

      //gọi API thêm sản phẩm
      try {
        // post(urlAPI , input)
        const res = await axios[method](urlAPI, values)
        console.log(res.data)
        //nếu thành công
        alert('Lưu dữ liệu thành công')
        //chuyển hướng về tranh danh sách 
        navigate('/admin/employees')

      } catch (error) {
        console.log(error)
        alert('Lưu dữ liệu thất bại')
      }


    }
  })

  const getEmployeeDetailAPI = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${match?.params?.id}`)
      employeeInfo.setValues(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [match?.params?.id])

  //gọi API khi giá trị id thay đổi
  useEffect(() => {
    if (isEdit) {
      getEmployeeDetailAPI()
    }
  }, [match?.params?.id])
  return (
    <div className="container-fluid py-4 px-3 px-md-4 bg-light min-vh-100">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1">
            {isEdit ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên'}
          </h3>
          <p className="text-muted small mb-0">
            {isEdit
              ? 'Cập nhật thông tin nhân viên trong hệ thống'
              : 'Nhập thông tin để tạo hồ sơ nhân viên mới'}
          </p>
        </div>
        <Link to="/admin/employees" className="btn btn-outline-secondary">
          Quay lại danh sách
        </Link>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <form onSubmit={employeeInfo.handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="maNhanVien" className="form-label fw-semibold">
                  Mã nhân viên
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="maNhanVien"
                  name="maNhanVien"
                  placeholder="Nhập mã nhân viên"
                  disabled={isEdit}
                  value={employeeInfo.values.maNhanVien}
                  onChange={employeeInfo.handleChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="tenNhanVien" className="form-label fw-semibold">
                  Họ và tên
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tenNhanVien"
                  name="tenNhanVien"
                  placeholder="Nhập họ và tên"
                  value={employeeInfo.values.tenNhanVien}
                  onChange={employeeInfo.handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="chucVu" className="form-label fw-semibold">
                  Chức vụ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="chucVu"
                  name="chucVu"
                  placeholder="Ví dụ: DEV, Marketing"
                  value={employeeInfo.values.chucVu}
                  onChange={employeeInfo.handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="heSoChucVu" className="form-label fw-semibold">
                  Hệ số chức vụ
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="heSoChucVu"
                  name="heSoChucVu"
                  placeholder="Nhập hệ số chức vụ"
                  min="0"
                  step="0.1"
                  value={employeeInfo.values.heSoChucVu}
                  onChange={employeeInfo.handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="luongCoBan" className="form-label fw-semibold">
                  Lương cơ bản
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="luongCoBan"
                    name="luongCoBan"
                    placeholder="Nhập lương cơ bản"
                    min="0"
                    value={employeeInfo.values.luongCoBan}
                    onChange={employeeInfo.handleChange}
                    required
                  />
                  <span className="input-group-text">₫</span>
                </div>
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="soGioLamTrongThang"
                  className="form-label fw-semibold"
                >
                  Số giờ làm trong tháng
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="soGioLamTrongThang"
                    name="soGioLamTrongThang"
                    placeholder="Nhập số giờ làm"
                    min="0"
                    value={employeeInfo.values.soGioLamTrongThang}
                    onChange={employeeInfo.handleChange}
                    required
                  />
                  <span className="input-group-text">giờ</span>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Link to="/admin/employees" className="btn btn-light border">
                Hủy
              </Link>
              <button type="submit" className="btn btn-danger px-4">
                {isEdit ? 'Cập nhật nhân viên' : 'Thêm nhân viên'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateAndEdit
