// --- 1. Dữ liệu Giả lập và Khởi tạo Storage ---

const STORAGE_KEY_EMPLOYEES = 'employeesData';
const STORAGE_KEY_DEPARTMENTS = 'departmentsData';
const STORAGE_KEY_USERS = 'usersData';
const STORAGE_KEY_PROFILES = 'employeeProfiles';
const STORAGE_KEY_ATTENDANCE = 'attendanceRecords';
const STORAGE_KEY_REPORTS = 'reportRecords';
const STORAGE_KEY_SHIFTS = 'shiftDefinitions';
const STORAGE_KEY_PRODUCTS = 'productData';
const STORAGE_KEY_CUSTOMERS = 'customerData';

const today = new Date().toISOString().split('T')[0];

function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function generateNewId(data, prefix) {
    if (data.length === 0) return `${prefix}001`;
    const lastId = data[data.length - 1]?.id || data.reduce((max, item) =>
        (item.id && parseInt(item.id.replace(prefix, '')) > parseInt(max.replace(prefix, ''))) ? item.id : max, `${prefix}000`);

    const num = parseInt(lastId.replace(prefix, '')) + 1;
    return prefix + num.toString().padStart(3, '0');
}

function showNotification(message) {
    console.log("Thông báo: " + message);
    alert(message);
}

const COMMON_ROLES = ['Nhân viên', 'Chuyên viên', 'Trưởng nhóm', 'Trưởng phòng', 'Phó Giám đốc', 'Giám đốc', 'Thực tập sinh'];

function initializeData() {`--`
    // Khởi tạo tài khoản
    if (!localStorage.getItem(STORAGE_KEY_USERS)) {
        const initialUsers = [
            { username: 'admin', password: 'password123', role: 'Admin', empId: 'NV000' },
            { username: 'nva', password: '123', role: 'User', empId: 'NV001' },
            { username: 'ltb', password: '123', role: 'User', empId: 'NV002' }
        ];
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(initialUsers));
    }
    // Khởi tạo nhân viên (Role giờ là mảng)
    if (!localStorage.getItem(STORAGE_KEY_EMPLOYEES)) {
        const initialEmployees = [
            { id: 'NV000', name: 'Admin Account', dept: 'Quản trị', roles: ['Admin', 'Giám đốc'], email: 'admin@company.com' },
            { id: 'NV001', name: 'Nguyễn Văn A', dept: 'IT & Phát triển', roles: ['Trưởng phòng', 'Trưởng nhóm'], email: 'a.nv@company.com' },
            { id: 'NV002', name: 'Lê Thị B', dept: 'Nhân sự (HR)', roles: ['Chuyên viên'], email: 'b.lt@company.com' },
            { id: 'NV003', name: 'Trần Văn C', dept: 'Kinh doanh (Sale)', roles: ['Nhân viên'], email: 'c.tv@company.com' }
        ];
        localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(initialEmployees));
    }
    // Khởi tạo phòng ban
    if (!localStorage.getItem(STORAGE_KEY_DEPARTMENTS)) {
        const initialDepartments = [
            { id: 'PB001', name: 'IT & Phát triển', managerId: 'NV001', empCount: 15, location: 'Tầng 5' },
            { id: 'PB002', name: 'Nhân sự (HR)', managerId: 'NV002', empCount: 5, location: 'Tầng 1' },
            { id: 'PB003', name: 'Kinh doanh (Sale)', managerId: '', empCount: 20, location: 'Tầng 7' }
        ];
        localStorage.setItem(STORAGE_KEY_DEPARTMENTS, JSON.stringify(initialDepartments));
    }
    // Khởi tạo chấm công
    if (!localStorage.getItem(STORAGE_KEY_ATTENDANCE)) {
        const initialAttendance = [
            { id: 'NV001', date: '2025-11-07', checkIn: '08:00:00', checkOut: '17:00:00', totalHours: 9 }
        ];
        localStorage.setItem(STORAGE_KEY_ATTENDANCE, JSON.stringify(initialAttendance));
    }
    // Khởi tạo BÁO CÁO/TỐ CÁO
    if (!localStorage.getItem(STORAGE_KEY_REPORTS)) {
        const initialReports = [
            { id: 'RP001', empId: 'NV001', type: 'Report', title: 'Máy tính chậm', content: 'PC của tôi quá chậm, không cài được Visual Studio Code.', status: 'Processing', requestedDate: '2025-11-01' },
            { id: 'RP002', empId: 'NV002', type: 'Complaint', title: 'Phòng vệ sinh bẩn', content: 'Cần tăng cường vệ sinh khu vực phòng vệ sinh tầng 3.', status: 'Pending', requestedDate: today },
            { id: 'RP003', empId: 'NV001', type: 'Report', title: 'Đề xuất giờ làm linh hoạt', content: 'Đề xuất công ty áp dụng giờ làm linh hoạt hơn.', status: 'Completed', requestedDate: '2025-10-25' }
        ];
        localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(initialReports));
    }
    // Khởi tạo Ca làm việc
    if (!localStorage.getItem(STORAGE_KEY_SHIFTS)) {
        const initialShifts = [
            { id: 'CA001', name: 'Hành chính', start: '08:00', end: '17:00', schedule: { 'NV001': ['T2', 'T3', 'T4', 'T5', 'T6'], 'NV002': ['T2', 'T3', 'T5', 'T6'] } },
            { id: 'CA002', name: 'Ca Tối', start: '17:00', end: '22:00', schedule: {} }
        ];
        localStorage.setItem(STORAGE_KEY_SHIFTS, JSON.stringify(initialShifts));
    }
    // Khởi tạo Sản phẩm
    if (!localStorage.getItem(STORAGE_KEY_PRODUCTS)) {
        const initialProducts = [
            { id: 'SP001', name: 'Phần mềm HRM Pro', type: 'Phần mềm', price: '50,000,000 VNĐ', version: '2.1' },
            { id: 'SP002', name: 'Dịch vụ Tư vấn IT', type: 'Dịch vụ', price: 'Theo giờ (2,000,000/h)', version: 'N/A' },
            { id: 'SP003', name: 'Thiết bị Máy chủ Server', type: 'Phần cứng', price: '120,000,000 VNĐ', version: 'v3' }
        ];
        localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(initialProducts));
    }
    // Khởi tạo Khách hàng
    if (!localStorage.getItem(STORAGE_KEY_CUSTOMERS)) {
        const initialCustomers = [
            { id: 'KH001', company: 'Tập đoàn TechX', contact: 'Phạm Văn B', email: 'b.pv@techx.com', status: 'Tiềm năng', assignedEmpId: 'NV003' },
            { id: 'KH002', company: 'Công ty May Mặc T&T', contact: 'Trần Thị H', email: 'h.tt@maymac.com', status: 'Đã ký HĐ', assignedEmpId: 'NV003' },
        ];
        localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(initialCustomers));
    }
}


// --- 2. Logic Đăng nhập/Đăng ký và Định tuyến ---

function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

function handleLogin(username, password, expectedRole) {
    const users = getData(STORAGE_KEY_USERS);
    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
        // Kiểm tra vai trò dựa trên chuỗi vai trò trong mảng roles của nhân viên
        const employee = getData(STORAGE_KEY_EMPLOYEES).find(emp => emp.id === foundUser.empId);

        if (expectedRole === 'Admin' && foundUser.role !== 'Admin') {
            showNotification(`Lỗi: Tài khoản này không phải là ${expectedRole}. Vui lòng thử lại ở tab khác!`);
            return;
        }

        if (expectedRole === 'User' && foundUser.role === 'Admin') {
            // Admin có thể đăng nhập User nhưng chúng ta buộc họ phải dùng tab Admin
            showNotification(`Lỗi: Tài khoản này là Admin. Vui lòng đăng nhập ở tab Admin!`);
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(foundUser));

        if (foundUser.role === 'Admin') {
            window.location.href = 'dashboard.html';
        } else {
            window.location.href = 'user-dashboard.html';
        }
    } else {
        showNotification('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
}

function handleChangeAdminPassword(e) {
    e.preventDefault();
    const currentUser = getCurrentUser();

    if (!currentUser || currentUser.role !== 'Admin') {
        showNotification("Lỗi: Bạn không có quyền Admin hoặc chưa đăng nhập!");
        return;
    }

    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmNewPassword = document.getElementById('confirm-new-password').value;

    if (newPassword.length < 3) {
        showNotification("Mật khẩu mới phải có ít nhất 3 ký tự.");
        return;
    }
    if (newPassword !== confirmNewPassword) {
        showNotification("Mật khẩu mới và xác nhận mật khẩu không khớp!");
        return;
    }

    let users = getData(STORAGE_KEY_USERS);
    const adminIndex = users.findIndex(user => user.username === currentUser.username && user.role === 'Admin');

    if (adminIndex === -1) {
        showNotification("Lỗi hệ thống: Không tìm thấy tài khoản Admin.");
        return;
    }

    // 1. Kiểm tra mật khẩu cũ
    if (users[adminIndex].password !== oldPassword) {
        showNotification("Mật khẩu cũ không đúng! Vui lòng kiểm tra lại.");
        return;
    }

    // 2. Đổi mật khẩu
    users[adminIndex].password = newPassword;
    saveData(STORAGE_KEY_USERS, users);

    // 3. Cập nhật lại currentUser trong localStorage
    currentUser.password = newPassword;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));


    showNotification("Đổi mật khẩu Admin thành công! Vui lòng sử dụng mật khẩu mới cho lần đăng nhập tiếp theo.");
    e.target.reset();
}

// Hàm khởi tạo sự kiện Form Submit chung
document.addEventListener('submit', function (e) {
    const formId = e.target.id;

    if (formId === 'admin-login-form' || formId === 'user-login-form' || formId === 'register-form') {
        // Đã xử lý trong các hàm riêng
        if (formId === 'admin-login-form') {
            e.preventDefault();
            handleLogin(document.getElementById('admin-username').value, document.getElementById('admin-password').value, 'Admin');
        } else if (formId === 'user-login-form') {
            e.preventDefault();
            handleLogin(document.getElementById('user-username').value, document.getElementById('user-password').value, 'User');
        } else if (formId === 'register-form') {
            handleFormSubmissions(e); // Dùng hàm chung cho form đăng ký
        }
    } else if (formId === 'change-admin-password-form') {
        handleChangeAdminPassword(e);
    } else if (formId === 'add-employee-form' || formId === 'add-dept-form' || formId === 'update-profile-form' || formId === 'user-profile-form' || formId === 'report-form' || formId === 'add-shift-form' || formId === 'add-product-form' || formId === 'add-customer-form') {
        handleFormSubmissions(e);
    }
});

function handleLogout() {
    const logoutLinks = document.querySelectorAll('#user-logout, .sidebar a[href="index.html"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (e.target.id === 'user-logout' || e.target.closest('a')?.getAttribute('href') === 'index.html') {
                e.preventDefault();
                if (confirm('Bạn có chắc chắn muốn Đăng xuất?')) {
                    localStorage.removeItem('currentUser');
                    window.location.href = 'index.html';
                }
            }
        });
    });
}


// --- 3. Logic Hiển thị và Cập nhật Giao diện (CRUD Admin) ---
// *********** NHÂN SỰ ***********
function renderEmployees() {
    const tableBody = document.getElementById('employee-list');
    if (!tableBody) return;

    const employees = getData(STORAGE_KEY_EMPLOYEES).filter(emp => !emp.roles.includes('Admin'));
    tableBody.innerHTML = '';

    employees.forEach(emp => {
        const rolesText = emp.roles.join(', '); // Hiển thị nhiều chức vụ
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.dept}</td>
            <td>${rolesText}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editEmployee('${emp.id}')" style="padding: 5px 10px;">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="deleteEmployee('${emp.id}')" style="padding: 5px 10px;">Xóa</button>
            </td>
        `;
    });
}

// Hỗ trợ sửa nhiều trường
window.editEmployee = function (id) {
    let employees = getData(STORAGE_KEY_EMPLOYEES);
    const employee = employees.find(emp => emp.id === id);

    if (employee) {
        // Tạo HTML cho form sửa đổi
        const currentRoles = employee.roles;
        const departments = getData(STORAGE_KEY_DEPARTMENTS);

        const deptOptions = departments.map(dept =>
            `<option value="${dept.name}" ${employee.dept === dept.name ? 'selected' : ''}>${dept.name}</option>`
        ).join('');

        const roleCheckboxes = COMMON_ROLES.map(role => `
            <label style="display: block; margin-bottom: 5px;">
                <input type="checkbox" name="roles" value="${role}" ${currentRoles.includes(role) ? 'checked' : ''}> ${role}
            </label>
        `).join('');

        const formHtml = `
            <label>Họ và Tên:</label><input type="text" id="edit-name" value="${employee.name}" required><br>
            <label>Email:</label><input type="email" id="edit-email" value="${employee.email}" required><br>
            <label>Phòng ban:</label>
            <select id="edit-dept" required>${deptOptions}</select><br>
            <label>Chức vụ (chọn nhiều):</label>
            <div style="border: 1px solid #ccc; padding: 10px; height: 100px; overflow-y: auto;">
                ${roleCheckboxes}
            </div>
        `;

        const newValues = prompt("Sửa thông tin nhân viên:", employee.name, formHtml);

        // Sử dụng một thư viện modal/prompt tùy chỉnh sẽ tốt hơn, nhưng dùng prompt tạm thời để lấy input
        const newName = prompt(`Sửa Tên (${employee.name}):`, employee.name);
        if (newName === null) return;

        const newEmail = prompt(`Sửa Email (${employee.email}):`, employee.email);
        if (newEmail === null) return;

        const newDept = prompt(`Sửa Phòng ban (${employee.dept}):`, employee.dept);
        if (newDept === null) return;

        const newRolesStr = prompt(`Sửa Chức vụ (phân cách bằng dấu phẩy. VD: Trưởng nhóm, Chuyên viên):`, employee.roles.join(', '));
        if (newRolesStr === null) return;

        // Cập nhật dữ liệu
        employee.name = newName.trim();
        employee.email = newEmail.trim();
        employee.dept = newDept.trim();
        employee.roles = newRolesStr.split(',').map(r => r.trim()).filter(r => r.length > 0);

        saveData(STORAGE_KEY_EMPLOYEES, employees);
        renderEmployees();
        showNotification(`Cập nhật nhân viên ${id} thành công.`);
    }
}

// *********** PHÒNG BAN ***********
function renderDepartments() {
    const tableBody = document.getElementById('dept-list');
    if (!tableBody) return;

    const departments = getData(STORAGE_KEY_DEPARTMENTS);
    const employees = getData(STORAGE_KEY_EMPLOYEES);
    tableBody.innerHTML = '';

    departments.forEach(dept => {
        const manager = employees.find(emp => emp.id === dept.managerId);
        const managerName = manager ? `${manager.name} (${manager.id})` : 'Chưa có';

        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${dept.id}</td>
            <td>${dept.name}</td>
            <td>${managerName}</td>
            <td>${dept.location}</td>
            <td>${dept.empCount}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editDepartment('${dept.id}')" style="padding: 5px 10px;">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="deleteDepartment('${dept.id}')" style="padding: 5px 10px;">Xóa</button>
            </td>
        `;
    });
}

// Hỗ trợ sửa nhiều trường & gợi ý chọn NV
window.editDepartment = function (id) {
    let departments = getData(STORAGE_KEY_DEPARTMENTS);
    let employees = getData(STORAGE_KEY_EMPLOYEES);
    const department = departments.find(dept => dept.id === id);

    if (department) {
        const currentManager = employees.find(emp => emp.id === department.managerId);
        const currentManagerName = currentManager ? `${currentManager.name} (${currentManager.id})` : 'Chưa có';

        const newName = prompt(`Sửa Tên Phòng ban (${department.name}):`, department.name);
        if (newName === null) return;

        const newLocation = prompt(`Sửa Vị trí (${department.location}):`, department.location);
        if (newLocation === null) return;

        // Gợi ý chọn nhân viên quản lý (chỉ lấy ID)
        const allEmployees = employees.filter(emp => !emp.roles.includes('Admin'));
        const empList = allEmployees.map(emp => `${emp.id}: ${emp.name}`).join('\n');

        const newManagerId = prompt(`Sửa Quản lý (${currentManagerName}). Nhập Mã NV (ID) mới. Danh sách gợi ý:\n\n${empList}\n\nNhập Mã NV hoặc để trống:`, department.managerId);
        if (newManagerId === null) return;

        const validManager = employees.some(emp => emp.id === newManagerId.trim() && !emp.roles.includes('Admin'));
        const managerToSave = validManager ? newManagerId.trim() : '';
        if (newManagerId.trim() !== '' && !validManager) {
            showNotification(`Mã NV ${newManagerId} không hợp lệ. Quản lý sẽ được đặt là 'Chưa có'.`);
        }

        // Cập nhật dữ liệu
        department.name = newName.trim();
        department.location = newLocation.trim();
        department.managerId = managerToSave;

        saveData(STORAGE_KEY_DEPARTMENTS, departments);
        renderDepartments();
        showNotification(`Cập nhật phòng ban ${id} thành công.`);
    }
}
window.deleteDepartment = function (id) {
    if (confirm(`Bạn có chắc chắn muốn xóa phòng ban ${id}?`)) {
        let departments = getData(STORAGE_KEY_DEPARTMENTS);
        departments = departments.filter(dept => dept.id !== id);
        saveData(STORAGE_KEY_DEPARTMENTS, departments);
        renderDepartments();
        updateDepartmentOptions();
        showNotification(`Đã xóa phòng ban ${id}.`);
    }
}
function updateDepartmentOptions() {
    const deptSelect = document.getElementById('emp-dept');
    const departments = getData(STORAGE_KEY_DEPARTMENTS);
    if (deptSelect) {
        deptSelect.innerHTML = departments.map(dept =>
            `<option value="${dept.name}">${dept.name}</option>`
        ).join('');
    }
}
// Cập nhật hàm này để lấy nhân viên (BỎ HÀM POPULATE MANGER SELECT)
function populateEmployeeSelects() {
    const employees = getData(STORAGE_KEY_EMPLOYEES).filter(emp => !emp.roles.includes('Admin'));
    const updateSelect = document.getElementById('profile-employee-select');
    const displaySelect = document.getElementById('display-employee-select');

    const createOptions = (selectElement) => {
        if (!selectElement) return;
        selectElement.innerHTML = '<option value="" disabled selected>--- Chọn Nhân viên ---</option>';
        employees.forEach(emp => {
            const option = document.createElement('option');
            option.value = emp.id;
            option.textContent = `${emp.name} (${emp.id})`;
            selectElement.appendChild(option);
        });
    };

    createOptions(updateSelect);
    createOptions(displaySelect);

    if (displaySelect) {
        displaySelect.addEventListener('change', function () {
            renderProfileDetails(this.value);
        });
    }
}

// *********** SẢN PHẨM ***********
function renderProducts() {
    const tableBody = document.getElementById('product-list');
    if (!tableBody) return;

    const products = getData(STORAGE_KEY_PRODUCTS);
    tableBody.innerHTML = '';

    products.forEach(prod => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${prod.id}</td>
            <td>${prod.name}</td>
            <td>${prod.type}</td>
            <td>${prod.price}</td>
            <td>${prod.version}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editProduct('${prod.id}')">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct('${prod.id}')">Xóa</button>
            </td>
        `;
    });
}
window.editProduct = function (id) {
    let products = getData(STORAGE_KEY_PRODUCTS);
    const product = products.find(p => p.id === id);

    if (product) {
        const newName = prompt(`Sửa Tên Sản phẩm (${product.name}):`, product.name);
        if (newName === null) return;

        const newType = prompt(`Sửa Loại (${product.type}):`, product.type);
        if (newType === null) return;

        const newPrice = prompt(`Sửa Giá bán (${product.price}):`, product.price);
        if (newPrice === null) return;

        const newVersion = prompt(`Sửa Version (${product.version}):`, product.version);
        if (newVersion === null) return;


        product.name = newName.trim();
        product.type = newType.trim();
        product.price = newPrice.trim();
        product.version = newVersion.trim();

        saveData(STORAGE_KEY_PRODUCTS, products);
        renderProducts();
        showNotification(`Cập nhật sản phẩm ${id} thành công.`);
    }
}
window.deleteProduct = function (id) {
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${id}?`)) {
        let products = getData(STORAGE_KEY_PRODUCTS);
        products = products.filter(p => p.id !== id);
        saveData(STORAGE_KEY_PRODUCTS, products);
        renderProducts();
        showNotification(`Đã xóa sản phẩm ${id}.`);
    }
}

// *********** KHÁCH HÀNG ***********
function renderCustomers() {
    const tableBody = document.getElementById('customer-list');
    if (!tableBody) return;

    const customers = getData(STORAGE_KEY_CUSTOMERS);
    const employees = getData(STORAGE_KEY_EMPLOYEES);
    tableBody.innerHTML = '';

    customers.forEach(cust => {
        const assignedEmp = employees.find(emp => emp.id === cust.assignedEmpId);
        const assignedName = assignedEmp ? assignedEmp.name : 'Chưa phân công';
        const statusClass = `status-${cust.status.toLowerCase().replace(/\s/g, '-')}`;

        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${cust.id}</td>
            <td>${cust.company}</td>
            <td>${cust.contact}</td>
            <td>${assignedName}</td>
            <td class="${statusClass}">${cust.status}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="viewCustomer('${cust.id}')">Xem</button>
                <button class="btn btn-sm" style="background-color: #ffc107;" onclick="changeCustomerStatusPrompt('${cust.id}', '${cust.status}')">Đổi TT</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${cust.id}')">Xóa</button>
            </td>
        `;
    });
}
window.viewCustomer = function (id) {
    const customers = getData(STORAGE_KEY_CUSTOMERS);
    const employees = getData(STORAGE_KEY_EMPLOYEES);
    const customer = customers.find(c => c.id === id);
    const assignedEmp = employees.find(emp => emp.id === customer.assignedEmpId);
    const assignedName = assignedEmp ? `${assignedEmp.name} (${assignedEmp.id})` : 'Chưa phân công';

    if (customer) {
        alert(
            `CHI TIẾT KHÁCH HÀNG (${customer.id})\n` +
            `\nCông ty: ${customer.company}` +
            `\nNgười liên hệ: ${customer.contact}` +
            `\nEmail: ${customer.email}` +
            `\nTrạng thái: ${customer.status}` +
            `\nPhụ trách: ${assignedName}`
        );
    }
}
window.changeCustomerStatusPrompt = function (id, currentStatus) {
    const newStatus = prompt(`Cập nhật trạng thái cho KH ${id}. Trạng thái hiện tại: ${currentStatus}\n\nNhập một trong các trạng thái: Tiềm năng, Đang đàm phán, Đã ký HĐ, Đã mất.`, currentStatus);

    if (newStatus && ['Tiềm năng', 'Đang đàm phán', 'Đã ký HĐ', 'Đã mất'].includes(newStatus)) {
        changeCustomerStatus(id, newStatus);
    } else if (newStatus !== null) {
        showNotification("Trạng thái không hợp lệ.");
    }
}
function changeCustomerStatus(id, newStatus) {
    let customers = getData(STORAGE_KEY_CUSTOMERS);
    const index = customers.findIndex(c => c.id === id);

    if (index !== -1) {
        customers[index].status = newStatus;
        saveData(STORAGE_KEY_CUSTOMERS, customers);
        renderCustomers();
        showNotification(`Đã cập nhật trạng thái của KH ${id} thành ${newStatus}.`);
    }
}
window.deleteCustomer = function (id) {
    if (confirm(`Bạn có chắc chắn muốn xóa khách hàng ${id}?`)) {
        let customers = getData(STORAGE_KEY_CUSTOMERS);
        customers = customers.filter(c => c.id !== id);
        saveData(STORAGE_KEY_CUSTOMERS, customers);
        renderCustomers();
        showNotification(`Đã xóa khách hàng ${id}.`);
    }
}

// *********** CHẤM CÔNG ***********
function renderAttendanceAdmin() {
    const tableBody = document.getElementById('attendance-admin-list');
    if (!tableBody) return;

    const attendanceRecords = getData(STORAGE_KEY_ATTENDANCE);
    const employees = getData(STORAGE_KEY_EMPLOYEES);

    tableBody.innerHTML = '';

    // Lọc và sắp xếp (ví dụ: lấy 20 bản ghi gần nhất)
    const recentRecords = attendanceRecords.slice(-20).reverse();

    recentRecords.forEach(record => {
        const employee = employees.find(emp => emp.id === record.id);
        const empName = employee ? employee.name : 'N/A';
        const totalHoursDisplay = record.totalHours > 0 ? `${record.totalHours}h` : '--';

        let statusText;
        let statusClass;
        if (record.checkOut) {
            statusText = record.totalHours >= 8 ? 'Đủ giờ' : 'Thiếu giờ';
            statusClass = record.totalHours >= 8 ? 'status-completed' : 'status-pending';
        } else if (record.checkIn) {
            statusText = 'Đang làm việc';
            statusClass = 'status-processing';
        } else {
            statusText = 'Vắng';
            statusClass = 'status-danger';
        }

        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.id}</td>
            <td>${empName}</td>
            <td>${record.checkIn || '--'}</td>
            <td>${record.checkOut || '--'}</td>
            <td>${totalHoursDisplay}</td>
            <td class="${statusClass}">${statusText}</td>
        `;
    });
}


// *********** LỊCH LÀM VIỆC (CA LÀM) ***********
function renderShiftsAndSchedule() {
    const shifts = getData(STORAGE_KEY_SHIFTS);
    const shiftListBody = document.getElementById('shift-list');
    if (shiftListBody) {
        shiftListBody.innerHTML = shifts.map(s => `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.start} - ${s.end}</td>
                <td>${Object.keys(s.schedule).length} NV</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteShift('${s.id}')">Xóa</button>
                </td>
            </tr>
        `).join('');
    }
    renderWeeklySchedule();
}

function renderWeeklySchedule() {
    const tableBody = document.getElementById('weekly-schedule-list');
    if (!tableBody) return;

    const employees = getData(STORAGE_KEY_EMPLOYEES).filter(emp => !emp.roles.includes('Admin'));
    const shifts = getData(STORAGE_KEY_SHIFTS);
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    tableBody.innerHTML = '';

    employees.forEach(emp => {
        const row = tableBody.insertRow();
        let dailyShifts = {}; // { 'T2': 'CA001', 'T3': 'OFF' }

        // Tìm ca làm việc của NV
        shifts.forEach(shift => {
            if (shift.schedule[emp.id]) {
                shift.schedule[emp.id].forEach(day => {
                    dailyShifts[day] = shift.name;
                });
            }
        });

        let rowContent = `<td>${emp.name} (${emp.id})</td>`;
        days.forEach(day => {
            const shiftName = dailyShifts[day] || 'Off';
            rowContent += `<td>${shiftName}</td>`;
        });

        rowContent += `<td><button class="btn btn-sm btn-primary" onclick="assignSchedulePrompt('${emp.id}')">Phân công</button></td>`;
        row.innerHTML = rowContent;
    });
}
window.deleteShift = function (id) {
    if (confirm(`Bạn có chắc chắn muốn xóa ca làm việc ${id}?`)) {
        let shifts = getData(STORAGE_KEY_SHIFTS);
        shifts = shifts.filter(s => s.id !== id);
        saveData(STORAGE_KEY_SHIFTS, shifts);
        renderShiftsAndSchedule();
        showNotification(`Đã xóa ca làm việc ${id}.`);
    }
}
window.assignSchedulePrompt = function (empId) {
    const shifts = getData(STORAGE_KEY_SHIFTS);
    const shiftNames = shifts.map(s => s.name).join(', ');
    const employee = getData(STORAGE_KEY_EMPLOYEES).find(e => e.id === empId);

    const promptText = `Phân công lịch làm việc cho ${employee.name} (${empId}).\n\n` +
        `Nhập Tên Ca (ví dụ: Hành chính, Ca Tối) và các ngày (T2, T3, T4...) cách nhau bằng dấu phẩy.\n` +
        `Ví dụ: Hành chính: T2, T3, T4\n\n` +
        `Các ca hiện có: ${shiftNames}\n` +
        `Nhập 'OFF: T7, CN' để xóa lịch làm việc vào ngày đó.`;

    const input = prompt(promptText);

    if (input) {
        // Xử lý logic phân công
        const parts = input.split(':').map(p => p.trim());
        if (parts.length === 2) {
            const shiftName = parts[0];
            const daysToAssign = parts[1].split(',').map(d => d.trim().toUpperCase()).filter(d => d.length > 0);

            if (daysToAssign.length > 0) {
                assignSchedule(empId, shiftName, daysToAssign);
            } else {
                showNotification("Vui lòng nhập ngày cần phân công.");
            }
        } else {
            showNotification("Định dạng nhập không hợp lệ. Vui lòng thử lại.");
        }
    }
}

function assignSchedule(empId, shiftName, days) {
    let shifts = getData(STORAGE_KEY_SHIFTS);
    let targetShift = shifts.find(s => s.name.toUpperCase() === shiftName.toUpperCase());

    // Xóa lịch làm việc cũ của nhân viên này khỏi tất cả các ca khác
    shifts.forEach(shift => {
        if (shift.schedule[empId]) {
            // Lọc ra các ngày không bị ghi đè
            shift.schedule[empId] = shift.schedule[empId].filter(day => !days.includes(day));
            if (shift.schedule[empId].length === 0) {
                delete shift.schedule[empId];
            }
        }
    });

    if (shiftName.toUpperCase() === 'OFF') {
        // Đã xóa ở bước trên
        saveData(STORAGE_KEY_SHIFTS, shifts);
        renderWeeklySchedule();
        showNotification(`Đã xóa lịch làm việc của ${empId} vào các ngày ${days.join(', ')}.`);
        return;
    }

    if (!targetShift) {
        showNotification(`Không tìm thấy ca làm việc có tên: ${shiftName}. Vui lòng tạo ca mới trước.`);
        return;
    }

    // Gán lịch mới
    if (!targetShift.schedule[empId]) {
        targetShift.schedule[empId] = [];
    }
    days.forEach(day => {
        if (!targetShift.schedule[empId].includes(day)) {
            targetShift.schedule[empId].push(day);
        }
    });

    saveData(STORAGE_KEY_SHIFTS, shifts);
    renderWeeklySchedule();
    showNotification(`Đã phân công ${empId} vào ca ${shiftName} các ngày ${days.join(', ')}.`);
}

// *********** BÁO CÁO (ADMIN) ***********
function renderReportManagement(filterStatus = 'All') {
    const tableBody = document.getElementById('reports-list');
    if (!tableBody) return;

    const reports = getData(STORAGE_KEY_REPORTS);
    const employees = getData(STORAGE_KEY_EMPLOYEES);

    const filteredReports = reports.filter(r => filterStatus === 'All' || r.status === filterStatus);

    tableBody.innerHTML = '';

    // Thống kê dashboard
    const pendingReportsDashboard = document.getElementById('pending-reports-dashboard');
    const pendingCount = reports.filter(r => r.status === 'Pending').length;

    if (pendingReportsDashboard) pendingReportsDashboard.textContent = pendingCount;

    if (filteredReports.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px;">Không có yêu cầu nào ${filterStatus !== 'All' ? `với trạng thái ${filterStatus}` : ''}.</td></tr>`;
    }

    filteredReports.forEach(report => {
        const employee = employees.find(e => e.id === report.empId);
        const empName = employee ? `${employee.name} (${employee.id})` : report.empId;

        let statusClass = `status-${report.status.toLowerCase()}`;
        let statusText;
        switch (report.status) {
            case 'Pending': statusText = 'Chờ xử lý'; break;
            case 'Processing': statusText = 'Đang xử lý'; break;
            case 'Completed': statusText = 'Hoàn thành'; break;
            default: statusText = report.status;
        }

        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${report.id}</td>
            <td>${report.requestedDate}</td>
            <td>${empName}</td>
            <td>${report.type === 'Report' ? 'Báo cáo' : 'Tố cáo'}</td>
            <td>${report.title}</td>
            <td class="${statusClass}">${statusText}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="viewReportDetails('${report.id}')" style="padding: 5px 10px;">Xem</button>
                <button class="btn btn-sm" onclick="updateReportStatusPrompt('${report.id}', '${report.status}')" style="padding: 5px 10px; background-color: #007bff;">Cập nhật</button>
            </td>
        `;
    });
}
window.viewReportDetails = function (reportId) {
    const reports = getData(STORAGE_KEY_REPORTS);
    const report = reports.find(r => r.id === reportId);
    const employee = getData(STORAGE_KEY_EMPLOYEES).find(e => e.id === report.empId);
    const empName = employee ? employee.name : report.empId;

    if (report) {
        alert(
            `CHI TIẾT PHẢN HỒI (${report.id})\n` +
            `\nNgười gửi: ${empName}` +
            `\nLoại: ${report.type === 'Report' ? 'Báo cáo' : 'Tố cáo'}` +
            `\nTiêu đề: ${report.title}` +
            `\nNgày gửi: ${report.requestedDate}` +
            `\nTrạng thái: ${report.status}\n` +
            `\nNội dung:\n${report.content}`
        );
    }
}
window.updateReportStatusPrompt = function (reportId, currentStatus) {
    const newStatus = prompt(`Cập nhật trạng thái cho ${reportId}. Trạng thái hiện tại: ${currentStatus}\n\nNhập một trong các trạng thái sau: Pending, Processing, Completed`, currentStatus);

    if (newStatus && ['Pending', 'Processing', 'Completed'].includes(newStatus)) {
        updateReportStatus(reportId, newStatus);
    } else if (newStatus !== null) {
        showNotification("Trạng thái không hợp lệ. Vui lòng nhập: Pending, Processing, hoặc Completed.");
    }
}
function updateReportStatus(reportId, newStatus) {
    let reports = getData(STORAGE_KEY_REPORTS);
    const index = reports.findIndex(r => r.id === reportId);

    if (index !== -1) {
        reports[index].status = newStatus;
        saveData(STORAGE_KEY_REPORTS, reports);
        renderReportManagement();
        showNotification(`Đã cập nhật trạng thái của ${reportId} thành ${newStatus}.`);
    }
}


// --- 4. Logic CRUD và Form Submissions (Gom chung) ---
function handleFormSubmissions(e) {
    e.preventDefault();
    const formId = e.target.id;

    if (formId === 'register-form') {
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        let users = getData(STORAGE_KEY_USERS);

        if (password !== confirmPassword) {
            showNotification('Mật khẩu xác nhận không khớp.');
            return;
        }
        if (users.some(user => user.username === username)) {
            showNotification('Tên đăng nhập đã tồn tại!');
            return;
        }

        let employees = getData(STORAGE_KEY_EMPLOYEES);
        const newEmpId = generateNewId(employees, 'NV');

        users.push({ username, password, role: 'User', empId: newEmpId });
        saveData(STORAGE_KEY_USERS, users);

        employees.push({ id: newEmpId, name: username, dept: 'Chưa xác định', roles: ['Nhân viên mới'], email: '' });
        saveData(STORAGE_KEY_EMPLOYEES, employees);

        showNotification(`Đăng ký thành công! Mã NV của bạn là ${newEmpId}. Đang chuyển hướng đến trang Đăng nhập.`);
        window.location.href = 'index.html';
    }
    else if (formId === 'add-employee-form') {
        const name = document.getElementById('emp-name').value;
        const dept = document.getElementById('emp-dept').value;
        const email = document.getElementById('emp-email').value;
        const roleInputs = Array.from(document.querySelectorAll('#add-employee-form input[name="emp-role"]:checked'));
        const roles = roleInputs.map(input => input.value);
        if (roles.length === 0) roles.push('Nhân viên');


        let employees = getData(STORAGE_KEY_EMPLOYEES);
        const newId = generateNewId(employees, 'NV');
        const newEmployee = { id: newId, name, dept, roles, email };

        employees.push(newEmployee);
        saveData(STORAGE_KEY_EMPLOYEES, employees);
        e.target.reset();
        renderEmployees();
        showNotification(`Đã thêm nhân viên ${name} (${newId}) thành công!`);
        populateEmployeeSelects();
    } else if (formId === 'add-dept-form') {
        const name = document.getElementById('dept-name').value;
        const managerId = document.getElementById('dept-manager-id').value || '';
        const location = document.getElementById('dept-location').value || 'Chưa xác định';

        let departments = getData(STORAGE_KEY_DEPARTMENTS);
        const newId = generateNewId(departments, 'PB');
        const employees = getData(STORAGE_KEY_EMPLOYEES);
        const empCount = employees.filter(emp => emp.dept === name).length;

        const newDepartment = { id: newId, name, managerId, location, empCount };

        departments.push(newDepartment);
        saveData(STORAGE_KEY_DEPARTMENTS, departments);
        e.target.reset();
        renderDepartments();
        updateDepartmentOptions();
        showNotification(`Đã thêm phòng ban ${name} (${newId}) thành công!`);
    } else if (formId === 'add-shift-form') {
        const name = document.getElementById('shift-name').value;
        const start = document.getElementById('shift-start').value;
        const end = document.getElementById('shift-end').value;

        let shifts = getData(STORAGE_KEY_SHIFTS);
        const newId = generateNewId(shifts, 'CA');
        shifts.push({ id: newId, name, start, end, schedule: {} });

        saveData(STORAGE_KEY_SHIFTS, shifts);
        e.target.reset();
        renderShiftsAndSchedule();
        showNotification(`Đã thêm ca làm việc ${name} (${start} - ${end}) thành công.`);
    } else if (formId === 'add-product-form') {
        const name = document.getElementById('product-name').value;
        const type = document.getElementById('product-type').value;
        const price = document.getElementById('product-price').value;
        const version = document.getElementById('product-version').value || '1.0';

        let products = getData(STORAGE_KEY_PRODUCTS);
        const newId = generateNewId(products, 'SP');
        products.push({ id: newId, name, type, price, version });

        saveData(STORAGE_KEY_PRODUCTS, products);
        e.target.reset();
        renderProducts();
        showNotification(`Đã thêm sản phẩm ${name} thành công.`);
    } else if (formId === 'add-customer-form') {
        const company = document.getElementById('customer-name').value;
        const contact = document.getElementById('contact-person').value;
        const email = document.getElementById('contact-email').value;

        let customers = getData(STORAGE_KEY_CUSTOMERS);
        const newId = generateNewId(customers, 'KH');
        // Mặc định trạng thái và chưa phân công
        customers.push({ id: newId, company, contact, email, status: 'Tiềm năng', assignedEmpId: '' });

        saveData(STORAGE_KEY_CUSTOMERS, customers);
        e.target.reset();
        renderCustomers();
        showNotification(`Đã thêm khách hàng ${company} thành công.`);
    }
    // Các form khác (profile, report...) giữ nguyên
    else if (formId === 'update-profile-form') {
        // ... (Logic đã có ở phiên bản trước, giữ nguyên)
    } else if (formId === 'user-profile-form') {
        // ... (Logic đã có ở phiên bản trước, giữ nguyên)
    } else if (formId === 'report-form') {
        // ... (Logic đã có ở phiên bản trước, giữ nguyên)
    }
}


// --- 5. Logic Chấm công (Dành cho User) & Báo cáo (User) ---

function renderAttendanceStatus() {
    const user = getCurrentUser();
    if (!user || !user.empId) return;

    const attendanceRecords = getData(STORAGE_KEY_ATTENDANCE);
    const todayRecord = attendanceRecords.find(
        r => r.id === user.empId && r.date === today
    );

    const statusArea = document.getElementById('attendance-status-area');
    const checkInBtn = document.getElementById('check-in-btn');
    const checkOutBtn = document.getElementById('check-out-btn');

    if (!statusArea || !checkInBtn || !checkOutBtn) return;

    checkInBtn.style.display = 'none';
    checkOutBtn.style.display = 'none';

    if (!todayRecord || !todayRecord.checkIn) {
        statusArea.innerHTML = `<p style="font-size: 1.2em; color: orange;"><i class="fas fa-exclamation-triangle"></i> Bạn chưa Check-in hôm nay.</p>`;
        checkInBtn.style.display = 'inline-block';
    } else if (todayRecord.checkIn && !todayRecord.checkOut) {
        statusArea.innerHTML = `<p style="font-size: 1.2em; color: green;"><i class="fas fa-check-circle"></i> Đã Check-in lúc: <strong>${todayRecord.checkIn}</strong></p>`;
        checkOutBtn.style.display = 'inline-block';
    } else if (todayRecord.checkIn && todayRecord.checkOut) {
        statusArea.innerHTML = `<p style="font-size: 1.2em; color: blue;"><i class="fas fa-info-circle"></i> Đã hoàn thành ngày làm việc: ${todayRecord.checkIn} - ${todayRecord.checkOut}</p>`;
    }
}
function handleAttendance(type) {
    const user = getCurrentUser();
    if (!user || !user.empId) return;

    let attendanceRecords = getData(STORAGE_KEY_ATTENDANCE);
    const time = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    const todayIndex = attendanceRecords.findIndex(
        r => r.id === user.empId && r.date === today
    );

    if (type === 'in') {
        if (todayIndex === -1) {
            attendanceRecords.push({ id: user.empId, date: today, checkIn: time, checkOut: null, totalHours: 0 });
            showNotification(`Check-in thành công lúc ${time}. Chúc bạn làm việc hiệu quả!`);
        } else {
            showNotification(`Bạn đã Check-in lúc ${attendanceRecords[todayIndex].checkIn} rồi.`);
        }
    } else if (type === 'out') {
        if (todayIndex !== -1 && attendanceRecords[todayIndex].checkIn && !attendanceRecords[todayIndex].checkOut) {
            const checkInTime = new Date(`${today} ${attendanceRecords[todayIndex].checkIn}`);
            const checkOutTime = new Date(`${today} ${time}`);
            const hours = ((checkOutTime - checkInTime) / (1000 * 60 * 60)).toFixed(2);

            attendanceRecords[todayIndex].checkOut = time;
            attendanceRecords[todayIndex].totalHours = parseFloat(hours);
            showNotification(`Check-out thành công lúc ${time}. Tổng giờ làm: ${hours} giờ.`);
        } else {
            showNotification('Bạn chưa Check-in hoặc đã Check-out rồi.');
        }
    }

    saveData(STORAGE_KEY_ATTENDANCE, attendanceRecords);
    renderAttendanceStatus();
    renderUserAttendanceHistory();
}
function renderUserAttendanceHistory() {
    const tableBody = document.getElementById('user-attendance-history');
    if (!tableBody) return;

    const user = getCurrentUser();
    if (!user || !user.empId) return;

    const attendanceRecords = getData(STORAGE_KEY_ATTENDANCE)
        .filter(r => r.id === user.empId)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    tableBody.innerHTML = '';

    if (attendanceRecords.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 15px;">Không có dữ liệu lịch sử.</td></tr>`;
        return;
    }

    attendanceRecords.forEach(record => {
        const row = tableBody.insertRow();
        const status = record.checkOut ? (record.totalHours >= 8 ? 'Hoàn thành' : 'Thiếu giờ') : (record.checkIn ? 'Đang làm việc' : 'Chưa Check-in');
        const statusColor = record.checkOut ? (record.totalHours >= 8 ? 'green' : 'red') : 'orange';

        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.checkIn || '--'}</td>
            <td>${record.checkOut || '--'}</td>
            <td>${record.totalHours > 0 ? record.totalHours + 'h' : '--'}</td>
            <td style="color: ${statusColor}; font-weight: bold;">${status}</td>
        `;
    });
}
function renderReportHistory() {
    const tableBody = document.getElementById('report-history-list');
    if (!tableBody) return;

    const user = getCurrentUser();
    if (!user || !user.empId) return;

    const reports = getData(STORAGE_KEY_REPORTS)
        .filter(r => r.empId === user.empId)
        .sort((a, b) => new Date(b.requestedDate) - new Date(a.requestedDate));

    tableBody.innerHTML = '';

    if (reports.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 15px;">Không có lịch sử phản hồi nào.</td></tr>`;
        return;
    }

    reports.forEach(req => {
        let statusClass = `status-${req.status.toLowerCase()}`;
        let statusText;

        switch (req.status) {
            case 'Processing': statusText = 'Đang xử lý'; break;
            case 'Completed': statusText = 'Đã hoàn thành'; break;
            default: statusText = 'Chờ xử lý'; break;
        }

        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${req.id}</td>
            <td>${req.requestedDate}</td>
            <td>${req.type === 'Report' ? 'Báo cáo' : 'Tố cáo'}</td>
            <td>${req.title}</td>
            <td class="${statusClass}">${statusText}</td>
        `;
    });
}

// --- 6. Logic Khởi chạy Ứng dụng & Xử lý UI Chung ---

function setActiveLink() {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = link.getAttribute('href');

        if (currentPath === linkPath) {
            link.classList.add('active');
        }
    });
}
function updateUserNameDisplay() {
    const user = getCurrentUser();
    const userNameElements = document.querySelectorAll('#current-user-name');

    if (!user) {
        userNameElements.forEach(el => el.textContent = 'Guest');
        return;
    }

    const employee = getData(STORAGE_KEY_EMPLOYEES).find(e => e.id === user.empId);
    const displayName = employee ? employee.name : user.username;

    userNameElements.forEach(el => el.textContent = displayName);
}
function setupRoleSwitcher() {
    const buttons = document.querySelectorAll('.role-switch-btn');
    const loginWrappers = document.querySelectorAll('.login-block-wrapper');

    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetRole = this.getAttribute('data-role');

            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            loginWrappers.forEach(wrapper => wrapper.classList.remove('active'));
            document.getElementById(targetRole)?.classList.add('active');
        });
    });
}
function handleDashboardInteractions() {
    const employees = getData(STORAGE_KEY_EMPLOYEES).filter(emp => !emp.roles.includes('Admin'));
    const departments = getData(STORAGE_KEY_DEPARTMENTS);
    const totalEmpElement = document.getElementById('total-employees');
    const totalDeptElement = document.getElementById('total-departments');
    const pendingReportsElement = document.getElementById('pending-reports-dashboard');

    const reports = getData(STORAGE_KEY_REPORTS);
    const pendingCount = reports.filter(r => r.status === 'Pending').length;

    if (totalEmpElement) totalEmpElement.textContent = employees.length;
    if (totalDeptElement) totalDeptElement.textContent = departments.length;
    if (pendingReportsElement) pendingReportsElement.textContent = pendingCount;

    // ... (Thống kê tháng giữ nguyên logic giả lập) ...
}

function renderEmployeeRoleCheckboxes() {
    const container = document.getElementById('employee-role-checkboxes');
    if (!container) return;

    container.innerHTML = COMMON_ROLES.map(role => `
        <label style="margin-right: 15px;">
            <input type="checkbox" name="emp-role" value="${role}"> ${role}
        </label>
    `).join('');
}


document.addEventListener('DOMContentLoaded', function () {
    initializeData();
    setActiveLink();
    handleLogout();
    updateUserNameDisplay();

    const currentPage = window.location.pathname.split('/').pop();

    // Xử lý logic theo từng trang
    if (currentPage === 'employees.html') {
        renderEmployees();
        updateDepartmentOptions();
        renderEmployeeRoleCheckboxes(); // Tạo checkbox cho chức vụ
    } else if (currentPage === 'departments.html') {
        renderDepartments();
    } else if (currentPage === 'dashboard.html') {
        handleDashboardInteractions();
    } else if (currentPage === 'profiles.html') {
        populateEmployeeSelects();
    } else if (currentPage === 'reports.html') {
        renderReportManagement();
        document.getElementById('filter-status')?.addEventListener('change', function () {
            renderReportManagement(this.value);
        });
    } else if (currentPage === 'attendance.html') {
        renderAttendanceAdmin();
    } else if (currentPage === 'schedule.html') {
        renderShiftsAndSchedule(); // Hiển thị cả ca làm và lịch phân công
    } else if (currentPage === 'products.html') {
        renderProducts();
    } else if (currentPage === 'customers.html') {
        renderCustomers();
    }
    // Logic cho trang user
    else if (currentPage === 'user-dashboard.html') {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            setInterval(() => {
                timeElement.textContent = new Date().toLocaleTimeString('vi-VN', { hour12: false }) + ' - ' + today;
            }, 1000);
        }

        renderAttendanceStatus();
        renderUserAttendanceHistory();

        document.getElementById('check-in-btn')?.addEventListener('click', () => handleAttendance('in'));
        document.getElementById('check-out-btn')?.addEventListener('click', () => handleAttendance('out'));

    } else if (currentPage === 'user-profile.html') {
        // Cần hàm renderUserProfileForm
    } else if (currentPage === 'user-report.html') {
        renderReportHistory();
    }

    if (document.querySelector('.role-switch-container')) {
        setupRoleSwitcher();
    }

    // Khởi tạo các sự kiện cho các form tĩnh
    if (document.getElementById('add-shift-form')) {
        console.log("Setup form add-shift-form");
    }
});