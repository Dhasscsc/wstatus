// தரவு சேமிப்பு மாறிகள்
let customers = JSON.parse(localStorage.getItem('dassCustomers')) || [];
let jobs = JSON.parse(localStorage.getItem('dassJobs')) || [];
let serviceCategories = JSON.parse(localStorage.getItem('dassServiceCategories')) || [];
let services = JSON.parse(localStorage.getItem('dassServices')) || [];
let payments = JSON.parse(localStorage.getItem('dassPayments')) || [];
let editId = null;
let editType = null;

// முதல் பயன்பாட்டிற்கான மாதிரி தரவு
function initializeSampleData() {
    if (customers.length === 0) {
        customers = [
            {
                id: 'CUST001',
                name: 'ரமேஷ் குமார்',
                phone: '9843232324',
                address: '45, நந்தனம், தூத்துக்குடி',
                services: ['ஆதார் கார்டு', 'பான் கார்டு'],
                totalAmount: 200,
                paidAmount: 200,
                balanceAmount: 0,
                status: 'cleared',
                registrationDate: '2023-08-15',
                notes: 'விரைவான சேவை'
            },
            {
                id: 'CUST002',
                name: 'சுரேஷ் பாலு',
                phone: '9585334365',
                address: '78, பெரியார் நகர், தூத்துக்குடி',
                services: ['பாஸ்போர்ட்'],
                totalAmount: 1500,
                paidAmount: 1000,
                balanceAmount: 500,
                status: 'debtor',
                registrationDate: '2023-08-20',
                notes: 'பாக்கி 500 ரூபாய்'
            }
        ];
        saveCustomers();
    }
    
    if (serviceCategories.length === 0) {
        serviceCategories = [
            {
                id: 'CAT001',
                name: 'அரசு சேவைகள்',
                description: 'அரசு சார்ந்த சேவைகள்'
            },
            {
                id: 'CAT002',
                name: 'வங்கி சேவைகள்',
                description: 'வங்கி தொடர்பான சேவைகள்'
            },
            {
                id: 'CAT003',
                name: 'டோகுமெண்ட் சேவைகள்',
                description: 'ஆவணங்கள் தொடர்பான சேவைகள்'
            }
        ];
        saveServiceCategories();
    }
    
    if (services.length === 0) {
        services = [
            {
                id: 'SRV001',
                categoryId: 'CAT001',
                name: 'ஆதார் கார்டு',
                price: 100,
                duration: 7,
                requirements: 'புகைப்படம், முகவரி சான்று',
                description: 'ஆதார் கார்டு விண்ணப்பம்'
            },
            {
                id: 'SRV002',
                categoryId: 'CAT001',
                name: 'பாஸ்போர்ட்',
                price: 1500,
                duration: 30,
                requirements: 'புகைப்படம், ஆதார், பிறப்பு சான்றிதழ்',
                description: 'பாஸ்போர்ட் விண்ணப்பம்'
            },
            {
                id: 'SRV003',
                categoryId: 'CAT002',
                name: 'பாங்க் அக்கவுண்ட்',
                price: 200,
                duration: 3,
                requirements: 'ஆதார், பான் கார்டு, புகைப்படம்',
                description: 'புதிய வங்கிக் கணக்கு'
            }
        ];
        saveServices();
    }
    
    if (jobs.length === 0) {
        jobs = [
            {
                id: 'JOB001',
                refNo: 'DASS230815001',
                customerId: 'CUST001',
                customerName: 'ரமேஷ் குமார்',
                customerPhone: '9843232324',
                serviceId: 'SRV001',
                serviceName: 'ஆதார் கார்டு',
                details: 'முகவரி மாற்றம் செய்ய வேண்டும்',
                submittedDate: '2023-08-15',
                checkDate: '2023-08-20',
                status: 'completed',
                priority: 'medium',
                whatsappMessage: 'உங்கள் ஆதார் கார்டு வேலை முடிந்துவிட்டது. வந்து பெற்றுக்கொள்ளவும்.',
                createdDate: '2023-08-15',
                updatedDate: '2023-08-18',
                timeline: [
                    { date: '2023-08-15', action: 'வேலை பதிவு செய்யப்பட்டது', status: 'pending' },
                    { date: '2023-08-18', action: 'வேலை முடிந்தது', status: 'completed' }
                ]
            },
            {
                id: 'JOB002',
                refNo: 'DASS230820001',
                customerId: 'CUST002',
                customerName: 'சுரேஷ் பாலு',
                customerPhone: '9585334365',
                serviceId: 'SRV002',
                serviceName: 'பாஸ்போர்ட்',
                details: 'புதிய பாஸ்போர்ட் விண்ணப்பம்',
                submittedDate: '2023-08-20',
                checkDate: '2023-08-25',
                status: 'inprogress',
                priority: 'high',
                whatsappMessage: 'உங்கள் பாஸ்போர்ட் வேலை செயல்பாட்டில் உள்ளது. விரைவில் முடிக்கப்படும்.',
                createdDate: '2023-08-20',
                updatedDate: '2023-08-20',
                timeline: [
                    { date: '2023-08-20', action: 'வேலை பதிவு செய்யப்பட்டது', status: 'pending' }
                ]
            }
        ];
        saveJobs();
    }
    
    if (payments.length === 0) {
        payments = [
            {
                id: 'PAY001',
                customerId: 'CUST001',
                customerName: 'ரமேஷ் குமார்',
                customerPhone: '9843232324',
                amount: 200,
                date: '2023-08-15',
                mode: 'cash',
                reference: 'RC001',
                notes: 'முழுதும் செலுத்தியது'
            },
            {
                id: 'PAY002',
                customerId: 'CUST002',
                customerName: 'சுரேஷ் பாலு',
                customerPhone: '9585334365',
                amount: 1000,
                date: '2023-08-20',
                mode: 'online',
                reference: 'UPI123',
                notes: 'முதல் கட்டணம்'
            }
        ];
        savePayments();
    }
}

// பக்க ஏற்றுதல்
document.addEventListener('DOMContentLoaded', function() {
    initializeSampleData();
    updateDashboard();
    showTab('customers');
    setupEventListeners();
    
    // தேதி புலங்களை அமைக்க
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('job-submitted-date').value = today;
    document.getElementById('job-check-date').value = today;
    document.getElementById('payment-date').value = today;
    document.getElementById('report-date').value = today;
});

// டேஷ்போர்டை புதுப்பிக்க
function updateDashboard() {
    // வாடிக்கையாளர்கள்
    document.getElementById('total-customers').textContent = customers.length;
    
    // நிலுவை வேலைகள்
    const pendingJobs = jobs.filter(job => job.status === 'pending' || job.status === 'inprogress').length;
    document.getElementById('pending-jobs-count').textContent = pendingJobs;
    
    // பாக்கி தொகை
    const totalDebt = customers.reduce((sum, customer) => sum + customer.balanceAmount, 0);
    document.getElementById('total-debt').textContent = `₹${totalDebt.toLocaleString('en-IN')}`;
    
    // சேவைகள்
    document.getElementById('total-services').textContent = services.length;
}

// தாவலை காட்டு
function showTab(tabName) {
    // தாவல் பட்டன்களை புதுப்பிக்க
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        }
    });
    
    // தாவல் உள்ளடக்கங்களை புதுப்பிக்க
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        if (content.id === `${tabName}-tab`) {
            content.classList.add('active');
        }
    });
    
    // தாவல் அடிப்படையில் தரவுகளை புதுப்பிக்க
    switch (tabName) {
        case 'customers':
            loadCustomersTable();
            break;
        case 'jobs':
            loadJobsTable();
            loadCustomerDropdown();
            loadServiceDropdown();
            break;
        case 'services':
            loadServiceCategories();
            break;
        case 'payments':
            loadDebtorsTable();
            loadPaymentCustomerDropdown();
            break;
        case 'reports':
            generateReport();
            break;
    }
}

// ======================
// வாடிக்கையாளர்கள் பகுதி
// ======================

// வாடிக்கையாளர்கள் டேபிளை லோட் செய்ய
function loadCustomersTable() {
    const tbody = document.getElementById('customers-table-body');
    const noData = document.getElementById('no-customers');
    
    if (customers.length === 0) {
        tbody.innerHTML = '';
        noData.style.display = 'block';
        return;
    }
    
    noData.style.display = 'none';
    
    let tableHTML = '';
    customers.forEach(customer => {
        const serviceList = customer.services ? customer.services.join(', ') : '-';
        const statusClass = customer.balanceAmount > 0 ? 'status-pending' : 'status-completed';
        const statusText = customer.balanceAmount > 0 ? 'பாக்கி உள்ளது' : 'முழுவதும் செலுத்தியது';
        
        tableHTML += `
            <tr>
                <td><strong>${customer.id}</strong></td>
                <td>
                    <div class="customer-name">${customer.name}</div>
                    <small>${customer.address || ''}</small>
                </td>
                <td>${customer.phone}</td>
                <td>${serviceList}</td>
                <td>₹${customer.totalAmount || 0}</td>
                <td>₹${customer.paidAmount || 0}</td>
                <td>
                    <span class="${customer.balanceAmount > 0 ? 'priority-high' : 'priority-low'}">
                        ₹${customer.balanceAmount || 0}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="small-btn primary-btn" onclick="editCustomer('${customer.id}')">
                            <i class="fas fa-edit"></i> திருத்து
                        </button>
                        <button class="small-btn secondary-btn" onclick="showCustomerDetails('${customer.id}')">
                            <i class="fas fa-eye"></i> பார்
                        </button>
                        <button class="small-btn whatsapp-btn" onclick="sendCustomerWhatsApp('${customer.id}')">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = tableHTML;
}

// வாடிக்கையாளர் மாடலை காட்டு
function showCustomerModal() {
    editId = null;
    editType = 'customer';
    const modal = document.getElementById('customer-modal');
    const form = document.getElementById('customer-form');
    const title = modal.querySelector('h3');
    
    title.innerHTML = '<i class="fas fa-user-plus"></i> புதிய வாடிக்கையாளர்';
    form.reset();
    
    // சேவைகள் டிராப் டவுணை புதுப்பிக்க
    updateServicesDropdown();
    
    // பாக்கி தொகையை கணக்கிட
    document.getElementById('paid-amount').addEventListener('input', calculateBalance);
    document.getElementById('total-amount').addEventListener('input', calculateBalance);
    
    modal.style.display = 'flex';
}

// சேவைகள் டிராப் டவுணை புதுப்பிக்க
function updateServicesDropdown() {
    const select = document.getElementById('customer-services');
    select.innerHTML = '';
    
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${service.name} (₹${service.price})`;
        select.appendChild(option);
    });
}

// பேலன்ஸை கணக்கிட
function calculateBalance() {
    const total = parseInt(document.getElementById('total-amount').value) || 0;
    const paid = parseInt(document.getElementById('paid-amount').value) || 0;
    const balance = total - paid;
    
    // பேலன்ஸை காண்பிக்க (வேண்டுமென்றால்)
}

// வாடிக்கையாளர் படிவத்தை சமர்ப்பிக்க
document.getElementById('customer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = editId || 'CUST' + Date.now().toString().slice(-6);
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const totalAmount = parseInt(document.getElementById('total-amount').value) || 0;
    const paidAmount = parseInt(document.getElementById('paid-amount').value) || 0;
    const balanceAmount = totalAmount - paidAmount;
    const notes = document.getElementById('customer-notes').value;
    
    // தேர்ந்தெடுக்கப்பட்ட சேவைகள்
    const selectedOptions = Array.from(document.getElementById('customer-services').selectedOptions);
    const selectedServices = selectedOptions.map(option => {
        const service = services.find(s => s.id === option.value);
        return service ? service.name : option.value;
    });
    
    const customer = {
        id: id,
        name: name,
        phone: phone,
        address: address,
        services: selectedServices,
        totalAmount: totalAmount,
        paidAmount: paidAmount,
        balanceAmount: balanceAmount,
        status: balanceAmount > 0 ? 'debtor' : 'cleared',
        registrationDate: new Date().toISOString().split('T')[0],
        notes: notes
    };
    
    if (editId) {
        // புதுப்பிக்க
        const index = customers.findIndex(c => c.id === editId);
        if (index !== -1) {
            customers[index] = customer;
        }
    } else {
        // சேர்க்க
        customers.unshift(customer);
    }
    
    saveCustomers();
    loadCustomersTable();
    updateDashboard();
    closeModal('customer-modal');
    
    alert(editId ? 'வாடிக்கையாளர் புதுப்பிக்கப்பட்டார்!' : 'வாடிக்கையாளர் சேர்க்கப்பட்டார்!');
});

// வாடிக்கையாளரை திருத்து
function editCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;
    
    editId = customerId;
    editType = 'customer';
    
    const modal = document.getElementById('customer-modal');
    const form = document.getElementById('customer-form');
    const title = modal.querySelector('h3');
    
    title.innerHTML = '<i class="fas fa-user-edit"></i> வாடிக்கையாளரை திருத்து';
    
    // படிவத்தை நிரப்பு
    document.getElementById('customer-id').value = customerId;
    document.getElementById('customer-name').value = customer.name;
    document.getElementById('customer-phone').value = customer.phone;
    document.getElementById('customer-address').value = customer.address || '';
    document.getElementById('total-amount').value = customer.totalAmount || 0;
    document.getElementById('paid-amount').value = customer.paidAmount || 0;
    document.getElementById('customer-notes').value = customer.notes || '';
    
    // சேவைகள் டிராப் டவுணை புதுப்பிக்க
    updateServicesDropdown();
    
    // தேர்ந்தெடுக்கப்பட்ட சேவைகளை அமைக்க
    const serviceSelect = document.getElementById('customer-services');
    if (customer.services && customer.services.length > 0) {
        Array.from(serviceSelect.options).forEach(option => {
            option.selected = customer.services.some(service => 
                option.textContent.includes(service.split(' (')[0])
            );
        });
    }
    
    modal.style.display = 'flex';
}

// ======================
// வேலைகள் பகுதி
// ======================

// வேலைகள் டேபிளை லோட் செய்ய
function loadJobsTable() {
    const tbody = document.getElementById('jobs-table-body');
    const noData = document.getElementById('no-jobs');
    
    if (jobs.length === 0) {
        tbody.innerHTML = '';
        noData.style.display = 'block';
        return;
    }
    
    noData.style.display = 'none';
    
    let tableHTML = '';
    jobs.forEach(job => {
        const statusClass = `status-${job.status}`;
        const statusText = getStatusText(job.status);
        
        tableHTML += `
            <tr>
                <td><strong class="ref-no">${job.refNo}</strong></td>
                <td>
                    <div>${job.customerName}</div>
                    <small>${job.customerPhone}</small>
                </td>
                <td>${job.serviceName}</td>
                <td>${formatDate(job.submittedDate)}</td>
                <td>
                    ${formatDate(job.checkDate)}
                    ${isDatePassed(job.checkDate) ? '<br><small class="priority-high">கடந்துவிட்டது</small>' : ''}
                </td>
                <td>
                    <select class="status-select" data-job-id="${job.id}" onchange="updateJobStatus('${job.id}', this.value)">
                        <option value="pending" ${job.status === 'pending' ? 'selected' : ''}>நிலுவையில்</option>
                        <option value="inprogress" ${job.status === 'inprogress' ? 'selected' : ''}>செயல்பாட்டில்</option>
                        <option value="completed" ${job.status === 'completed' ? 'selected' : ''}>முடிந்தது</option>
                        <option value="delivered" ${job.status === 'delivered' ? 'selected' : ''}>வழங்கப்பட்டது</option>
                    </select>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="small-btn primary-btn" onclick="editJob('${job.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="small-btn whatsapp-btn" onclick="sendJobUpdateWhatsApp('${job.id}')">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                        <button class="small-btn secondary-btn" onclick="showJobDetails('${job.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = tableHTML;
}

// வாடிக்கையாளர் டிராப் டவுணை லோட் செய்ய
function loadCustomerDropdown() {
    const select = document.getElementById('job-customer');
    select.innerHTML = '<option value="">தேர்ந்தெடுக்கவும்</option>';
    
    customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = `${customer.name} (${customer.phone})`;
        option.setAttribute('data-phone', customer.phone);
        select.appendChild(option);
    });
}

// சேவை டிராப் டவுணை லோட் செய்ய
function loadServiceDropdown() {
    const select = document.getElementById('job-service');
    select.innerHTML = '<option value="">தேர்ந்தெடுக்கவும்</option>';
    
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${service.name} (₹${service.price})`;
        select.appendChild(option);
    });
}

// வேலை மாடலை காட்டு
function showJobModal() {
    editId = null;
    editType = 'job';
    const modal = document.getElementById('job-modal');
    const form = document.getElementById('job-form');
    const title = modal.querySelector('h3');
    
    title.innerHTML = '<i class="fas fa-tasks"></i> புதிய வேலை';
    form.reset();
    
    // தேதிகளை அமைக்க
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('job-submitted-date').value = today;
    document.getElementById('job-check-date').value = today;
    
    // குறிப்பு எண்ணை தானாக உருவாக்கு
    const refNo = generateJobRefNo();
    document.getElementById('job-ref-no').value = refNo;
    
    // டிராப் டவுண்களை புதுப்பிக்க
    loadCustomerDropdown();
    loadServiceDropdown();
    
    modal.style.display = 'flex';
}

// குறிப்பு எண்ணை உருவாக்கு
function generateJobRefNo() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    // அதே நாளில் உள்ள வேலைகளை எண்ணு
    const todayJobs = jobs.filter(job => job.createdDate && job.createdDate.startsWith(date.toISOString().split('T')[0]));
    const sequence = (todayJobs.length + 1).toString().padStart(3, '0');
    
    return `DASS${year}${month}${day}${sequence}`;
}

// சேவை விவரங்களை புதுப்பிக்க
function updateServiceDetails() {
    const serviceId = document.getElementById('job-service').value;
    const service = services.find(s => s.id === serviceId);
    
    if (service) {
        document.getElementById('job-details').value = `${service.description || service.name}\nதேவையான ஆவணங்கள்: ${service.requirements || 'இல்லை'}`;
    }
}

// வேலை படிவத்தை சமர்ப்பிக்க
document.getElementById('job-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = editId || 'JOB' + Date.now().toString().slice(-6);
    const refNo = document.getElementById('job-ref-no').value;
    const customerId = document.getElementById('job-customer').value;
    const serviceId = document.getElementById('job-service').value;
    const details = document.getElementById('job-details').value;
    const submittedDate = document.getElementById('job-submitted-date').value;
    const checkDate = document.getElementById('job-check-date').value;
    const status = document.getElementById('job-status').value;
    const priority = document.getElementById('job-priority').value;
    const whatsappMessage = document.getElementById('job-whatsapp-message').value;
    
    // வாடிக்கையாளர் மற்றும் சேவை விவரங்களை பெறு
    const customer = customers.find(c => c.id === customerId);
    const service = services.find(s => s.id === serviceId);
    
    if (!customer || !service) {
        alert('தவறான வாடிக்கையாளர் அல்லது சேவை தேர்வு!');
        return;
    }
    
    const job = {
        id: id,
        refNo: refNo,
        customerId: customerId,
        customerName: customer.name,
        customerPhone: customer.phone,
        serviceId: serviceId,
        serviceName: service.name,
        details: details,
        submittedDate: submittedDate,
        checkDate: checkDate,
        status: status,
        priority: priority,
        whatsappMessage: whatsappMessage || `உங்கள் ${service.name} வேலை ${getStatusText(status)}.`,
        createdDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0],
        timeline: [
            {
                date: new Date().toISOString().split('T')[0],
                action: editId ? 'வேலை புதுப்பிக்கப்பட்டது' : 'வேலை பதிவு செய்யப்பட்டது',
                status: status
            }
        ]
    };
    
    if (editId) {
        // புதுப்பிக்க
        const index = jobs.findIndex(j => j.id === editId);
        if (index !== -1) {
            jobs[index] = job;
        }
    } else {
        // சேர்க்க
        jobs.unshift(job);
    }
    
    saveJobs();
    loadJobsTable();
    updateDashboard();
    closeModal('job-modal');
    
    // சேவை மாற்றப்பட்டால் வாட்ச்அப் செய்தியை அனுப்பு
    if (editId && whatsappMessage) {
        sendJobUpdateWhatsApp(id);
    }
    
    alert(editId ? 'வேலை புதுப்பிக்கப்பட்டது!' : 'வேலை சேர்க்கப்பட்டது!');
});

// வேலையை திருத்து
function editJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    editId = jobId;
    editType = 'job';
    
    const modal = document.getElementById('job-modal');
    const form = document.getElementById('job-form');
    const title = modal.querySelector('h3');
    
    title.innerHTML = '<i class="fas fa-tasks"></i> வேலையை திருத்து';
    
    // படிவத்தை நிரப்பு
    document.getElementById('job-id').value = jobId;
    document.getElementById('job-ref-no').value = job.refNo;
    document.getElementById('job-customer').value = job.customerId;
    document.getElementById('job-service').value = job.serviceId;
    document.getElementById('job-details').value = job.details || '';
    document.getElementById('job-submitted-date').value = job.submittedDate;
    document.getElementById('job-check-date').value = job.checkDate;
    document.getElementById('job-status').value = job.status;
    document.getElementById('job-priority').value = job.priority || 'medium';
    document.getElementById('job-whatsapp-message').value = job.whatsappMessage || '';
    
    // டிராப் டவுண்களை புதுப்பிக்க
    loadCustomerDropdown();
    loadServiceDropdown();
    
    modal.style.display = 'flex';
}

// வேலை நிலையை மாற்று
function updateJobStatus(jobId, newStatus) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    const oldStatus = job.status;
    job.status = newStatus;
    job.updatedDate = new Date().toISOString().split('T')[0];
    
    // காலவரிசையில் சேர்க்க
    job.timeline.push({
        date: new Date().toISOString().split('T')[0],
        action: `நிலை மாற்றப்பட்டது: ${getStatusText(oldStatus)} → ${getStatusText(newStatus)}`,
        status: newStatus
    });
    
    saveJobs();
    loadJobsTable();
    
    // வாட்ச்அப் செய்தியை அனுப்பு
    sendJobUpdateWhatsApp(jobId);
}

// வேலை வாட்ச்அப் செய்தியை அனுப்பு
function sendJobUpdateWhatsApp(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    let message = `தாஸ் பொது சேவை மையம்\n`;
    message += `-----------------\n`;
    message += `குறிப்பு எண்: ${job.refNo}\n`;
    message += `வாடிக்கையாளர்: ${job.customerName}\n`;
    message += `சேவை: ${job.serviceName}\n`;
    message += `நிலை: ${getStatusText(job.status)}\n`;
    message += `சமர்ப்பித்த தேதி: ${formatDate(job.submittedDate)}\n`;
    message += `-----------------\n`;
    message += `${job.whatsappMessage || 'எங்கள் சேவையைப் பயன்படுத்தியதற்கு நன்றி!'}\n`;
    message += `-----------------\n`;
    message += `தாஸ் பொது சேவை மையம்\n`;
    message += `98 43 23 23 24`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/91${job.customerPhone}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// குழு வேலை அப்டேட்களை அனுப்பு
function sendBulkJobUpdates() {
    const pendingJobs = jobs.filter(job => job.status === 'pending' || job.status === 'inprogress');
    
    if (pendingJobs.length === 0) {
        alert('நிலுவை வேலைகள் இல்லை.');
        return;
    }
    
    if (confirm(`${pendingJobs.length} வாடிக்கையாளர்களுக்கு வேலை அப்டேட் அனுப்ப விரும்புகிறீர்களா?`)) {
        pendingJobs.forEach((job, index) => {
            setTimeout(() => {
                sendJobUpdateWhatsApp(job.id);
            }, index * 2000); // 2 வினாடிகள் இடைவெளி
        });
    }
}

// ======================
// சேவைகள் பகுதி
// ======================

// சேவை வகைகளை லோட் செய்ய
function loadServiceCategories() {
    const container = document.getElementById('services-categories');
    
    if (serviceCategories.length === 0) {
        container.innerHTML = '<div class="no-data"><i class="fas fa-cogs"></i><h3>சேவை வகைகள் இல்லை</h3></div>';
        return;
    }
    
    let html = '';
    serviceCategories.forEach(category => {
        const categoryServices = services.filter(s => s.categoryId === category.id);
        
        html += `
            <div class="category-card">
                <div class="category-header">
                    <h4><i class="fas fa-folder"></i> ${category.name}</h4>
                    <div class="action-buttons">
                        <button class="small-btn primary-btn" onclick="editServiceCategory('${category.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="small-btn secondary-btn" onclick="showServiceModal('${category.id}')">
                            <i class="fas fa-plus"></i> சேவை
                        </button>
                    </div>
                </div>
                <p class="category-description">${category.description || 'விளக்கம் இல்லை'}</p>
                
                <div class="services-list">
                    ${categoryServices.length > 0 ? categoryServices.map(service => `
                        <div class="service-item">
                            <div class="service-info">
                                <h5>${service.name}</h5>
                                <p>கட்டணம்: ₹${service.price} | காலம்: ${service.duration} நாட்கள்</p>
                                <small>${service.requirements || 'தேவையான ஆவணங்கள் இல்லை'}</small>
                            </div>
                            <div class="service-actions">
                                <button class="small-btn primary-btn" onclick="editService('${service.id}')">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="small-btn danger-btn" onclick="deleteService('${service.id}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('') : '<p style="text-align: center; color: #6c757d;">இந்த வகையில் சேவைகள் இல்லை</p>'}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// சேவை வகை மாடலை காட்டு
function showServiceCategoryModal() {
    editId = null;
    editType = 'service-category';
    const modal = document.getElementById('service-category-modal');
    const form = document.getElementById('service-category-form');
    const title = modal.querySelector('h3');
    
    title.innerHTML = '<i class="fas fa-folder-plus"></i> புதிய சேவை வகை';
    form.reset();
    
    modal.style.display = 'flex';
}

// சேவை வகை படிவத்தை சமர்ப்பிக்க
document.getElementById('service-category-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = editId || 'CAT' + Date.now().toString().slice(-6);
    const name = document.getElementById('category-name').value;
    const description = document.getElementById('category-description').value;
    
    const category = {
        id: id,
        name: name,
        description: description
    };
    
    if (editId) {
        // புதுப்பிக்க
        const index = serviceCategories.findIndex(c => c.id === editId);
        if (index !== -1) {
            serviceCategories[index] = category;
        }
    } else {
        // சேர்க்க
        serviceCategories.push(category);
    }
    
    saveServiceCategories();
    loadServiceCategories();
    closeModal('service-category-modal');
    
    alert(editId ? 'சேவை வகை புதுப்பிக்கப்பட்டது!' : 'சேவை வகை சேர்க்கப்பட்டது!');
});

// சேவை மாடலை காட்டு
function showServiceModal(categoryId) {
    editId = null;
    editType = 'service';
    const modal = document.getElementById('service-modal');
    const form = document.getElementById('service-form');
    const title = modal.querySelector('h3');
    
    title.innerHTML = '<i class="fas fa-cog"></i> புதிய சேவை';
    form.reset();
    
    // வகைகள் டிராப் டவுணை புதுப்பிக்க
    const categorySelect = document.getElementById('service-category');
    categorySelect.innerHTML = '';
    
    serviceCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        if (categoryId && category.id === categoryId) {
            option.selected = true;
        }
        categorySelect.appendChild(option);
    });
    
    modal.style.display = 'flex';
}

// சேவை படிவத்தை சமர்ப்பிக்க
document.getElementById('service-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = editId || 'SRV' + Date.now().toString().slice(-6);
    const categoryId = document.getElementById('service-category').value;
    const name = document.getElementById('service-name').value;
    const price = parseInt(document.getElementById('service-price').value) || 0;
    const duration = parseInt(document.getElementById('service-duration').value) || 0;
    const requirements = document.getElementById('service-requirements').value;
    
    const category = serviceCategories.find(c => c.id === categoryId);
    
    const service = {
        id: id,
        categoryId: categoryId,
        categoryName: category ? category.name : 'பிற',
        name: name,
        price: price,
        duration: duration,
        requirements: requirements,
        description: `${name} - ${category ? category.name : 'பிற'} வகை`
    };
    
    if (editId) {
        // புதுப்பிக்க
        const index = services.findIndex(s => s.id === editId);
        if (index !== -1) {
            services[index] = service;
        }
    } else {
        // சேர்க்க
        services.push(service);
    }
    
    saveServices();
    loadServiceCategories();
    closeModal('service-modal');
    
    alert(editId ? 'சேவை புதுப்பிக்கப்பட்டது!' : 'சேவை சேர்க்கப்பட்டது!');
});

// சேவை வகையை திருத்து
function editServiceCategory(categoryId) {
    const category = serviceCategories.find(c => c.id === categoryId);
    if (!category) return;
    
    editId = categoryId;
    editType = 'service-category';
    
    const modal = document.getElementById('service-category-modal');
    const title = modal.querySelector('h3');
    
    title.innerHTML = '<i class="fas fa-folder"></i> சேவை வகையை திருத்து';
    
    document.getElementById('service-category-id').value = categoryId;
    document.getElementById('category-name').value = category.name;
    document.getElementById('category-description').value = category.description || '';
    
    modal.style.display = 'flex';
}

// சேவையை திருத்து
function editService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;
    
    editId = serviceId;
    editType = 'service';
    
    const modal = document.getElementById('service-modal');
    const title = modal.querySelector('h3');
    
    title.innerHTML = '<i class="fas fa-cog"></i> சேவையை திருத்து';
    
    document.getElementById('service-id').value = serviceId;
    document.getElementById('service-category').value = service.categoryId;
    document.getElementById('service-name').value = service.name;
    document.getElementById('service-price').value = service.price;
    document.getElementById('service-duration').value = service.duration;
    document.getElementById('service-requirements').value = service.requirements || '';
    
    // வகைகள் டிராப் டவுணை புதுப்பிக்க
    const categorySelect = document.getElementById('service-category');
    categorySelect.innerHTML = '';
    
    serviceCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
    
    modal.style.display = 'flex';
}

// சேவையை நீக்கு
function deleteService(serviceId) {
    if (!confirm('இந்த சேவையை நிச்சயமாக நீக்க விரும்புகிறீர்களா?')) return;
    
    services = services.filter(s => s.id !== serviceId);
    saveServices();
    loadServiceCategories();
    
    alert('சேவை நீக்கப்பட்டது!');
}

// ======================
// கட்டணங்கள் பகுதி
// ======================

// பாக்கி உள்ளவர்கள் டேபிளை லோட் செய்ய
function loadDebtorsTable() {
    const tbody = document.getElementById('debtors-table-body');
    const noData = document.getElementById('no-debtors');
    
    const debtors = customers.filter(c => c.balanceAmount > 0);
    
    if (debtors.length === 0) {
        tbody.innerHTML = '';
        noData.style.display = 'block';
        return;
    }
    
    noData.style.display = 'none';
    
    let tableHTML = '';
    debtors.forEach(customer => {
        // கடைசி கட்டணம்
        const customerPayments = payments.filter(p => p.customerId === customer.id);
        const lastPayment = customerPayments.length > 0 ? customerPayments[customerPayments.length - 1] : null;
        
        tableHTML += `
            <tr>
                <td>
                    <div class="customer-name">${customer.name}</div>
                    <small>${customer.id}</small>
                </td>
                <td>${customer.phone}</td>
                <td>₹${customer.totalAmount || 0}</td>
                <td>₹${customer.paidAmount || 0}</td>
                <td class="priority-high">₹${customer.balanceAmount || 0}</td>
                <td>${lastPayment ? formatDate(lastPayment.date) : 'இல்லை'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="small-btn primary-btn" onclick="showPaymentModal('${customer.id}')">
                            <i class="fas fa-money-bill-wave"></i> கட்டணம்
                        </button>
                        <button class="small-btn whatsapp-btn" onclick="sendDebtReminder('${customer.id}')">
                            <i class="fab fa-whatsapp"></i> நினைவூட்டல்
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = tableHTML;
}

// கட்டண வாடிக்கையாளர் டிராப் டவுணை லோட் செய்ய
function loadPaymentCustomerDropdown() {
    const select = document.getElementById('payment-customer');
    select.innerHTML = '<option value="">தேர்ந்தெடுக்கவும்</option>';
    
    customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = `${customer.name} (பாக்கி: ₹${customer.balanceAmount})`;
        select.appendChild(option);
    });
}

// வாடிக்கையாளர் பேலன்ஸ் தகவலை காட்டு
function showCustomerBalance() {
    const customerId = document.getElementById('payment-customer').value;
    const customer = customers.find(c => c.id === customerId);
    const balanceInfo = document.getElementById('customer-balance-info');
    
    if (customer) {
        balanceInfo.style.display = 'block';
        balanceInfo.innerHTML = `
            <h4><i class="fas fa-info-circle"></i> வாடிக்கையாளர் பேலன்ஸ்</h4>
            <p><strong>பெயர்:</strong> ${customer.name}</p>
            <p><strong>மொத்த தொகை:</strong> ₹${customer.totalAmount || 0}</p>
            <p><strong>செலுத்தியது:</strong> ₹${customer.paidAmount || 0}</p>
            <p><strong>பாக்கி:</strong> ₹${customer.balanceAmount || 0}</p>
        `;
        
        // பாக்கி தொகையை கட்டண புலத்தில் அமைக்க
        if (customer.balanceAmount > 0) {
            document.getElementById('payment-amount').value = customer.balanceAmount;
        }
    } else {
        balanceInfo.style.display = 'none';
    }
}

// கட்டண மாடலை காட்டு
function showPaymentModal(customerId) {
    editId = null;
    editType = 'payment';
    const modal = document.getElementById('payment-modal');
    const form = document.getElementById('payment-form');
    const title = modal.querySelector('h3');
    
    title.innerHTML = '<i class="fas fa-money-bill-wave"></i> புதிய கட்டணம்';
    form.reset();
    
    // தேதியை அமைக்க
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('payment-date').value = today;
    
    // டிராப் டவுணை புதுப்பிக்க
    loadPaymentCustomerDropdown();
    
    // குறிப்பிட்ட வாடிக்கையாளரை தேர்ந்தெடுக்க
    if (customerId) {
        document.getElementById('payment-customer').value = customerId;
        showCustomerBalance();
    }
    
    modal.style.display = 'flex';
}

// கட்டண படிவத்தை சமர்ப்பிக்க
document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = editId || 'PAY' + Date.now().toString().slice(-6);
    const customerId = document.getElementById('payment-customer').value;
    const amount = parseInt(document.getElementById('payment-amount').value) || 0;
    const date = document.getElementById('payment-date').value;
    const mode = document.getElementById('payment-mode').value;
    const reference = document.getElementById('payment-reference').value;
    const notes = document.getElementById('payment-notes').value;
    
    const customer = customers.find(c => c.id === customerId);
    if (!customer) {
        alert('தவறான வாடிக்கையாளர் தேர்வு!');
        return;
    }
    
    const payment = {
        id: id,
        customerId: customerId,
        customerName: customer.name,
        customerPhone: customer.phone,
        amount: amount,
        date: date,
        mode: mode,
        reference: reference,
        notes: notes
    };
    
    if (editId) {
        // புதுப்பிக்க
        const index = payments.findIndex(p => p.id === editId);
        if (index !== -1) {
            payments[index] = payment;
        }
    } else {
        // சேர்க்க
        payments.unshift(payment);
        
        // வாடிக்கையாளர் பேலன்ஸை புதுப்பிக்க
        customer.paidAmount = (customer.paidAmount || 0) + amount;
        customer.balanceAmount = (customer.totalAmount || 0) - customer.paidAmount;
        customer.status = customer.balanceAmount > 0 ? 'debtor' : 'cleared';
        
        saveCustomers();
    }
    
    savePayments();
    loadDebtorsTable();
    updateDashboard();
    closeModal('payment-modal');
    
    // ரசீதை அனுப்பு
    sendPaymentReceipt(id);
    
    alert(editId ? 'கட்டணம் புதுப்பிக்கப்பட்டது!' : 'கட்டணம் சேர்க்கப்பட்டது!');
});

// கட்டண ரசீதை அனுப்பு
function sendPaymentReceipt(paymentId) {
    const payment = payments.find(p => p.id === paymentId);
    if (!payment) return;
    
    const customer = customers.find(c => c.id === payment.customerId);
    if (!customer) return;
    
    let message = `தாஸ் பொது சேவை மையம் - கட்டண ரசீது\n`;
    message += `-----------------\n`;
    message += `ரசீது எண்: ${payment.reference || payment.id}\n`;
    message += `வாடிக்கையாளர்: ${customer.name}\n`;
    message += `தொலைபேசி: ${customer.phone}\n`;
    message += `-----------------\n`;
    message += `கட்டண தொகை: ₹${payment.amount}\n`;
    message += `கட்டண தேதி: ${formatDate(payment.date)}\n`;
    message += `கட்டண முறை: ${getPaymentModeText(payment.mode)}\n`;
    message += `-----------------\n`;
    message += `மொத்த தொகை: ₹${customer.totalAmount || 0}\n`;
    message += `இதுவரை செலுத்தியது: ₹${customer.paidAmount || 0}\n`;
    message += `பாக்கி தொகை: ₹${customer.balanceAmount || 0}\n`;
    message += `-----------------\n`;
    message += `தாஸ் பொது சேவை மையம்\n`;
    message += `98 43 23 23 24`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/91${customer.phone}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// பாக்கி நினைவூட்டலை அனுப்பு
function sendDebtReminder(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer || customer.balanceAmount <= 0) return;
    
    let message = `தாஸ் பொது சேவை மையம் - நினைவூட்டல்\n`;
    message += `-----------------\n`;
    message += `அன்பான ${customer.name} அவர்களே,\n\n`;
    message += `உங்கள் கணக்கில் ₹${customer.balanceAmount} பாக்கி தொகை உள்ளது.\n`;
    message += `மொத்த தொகை: ₹${customer.totalAmount || 0}\n`;
    message += `செலுத்தியது: ₹${customer.paidAmount || 0}\n`;
    message += `பாக்கி: ₹${customer.balanceAmount}\n\n`;
    message += `தயவு செய்து பாக்கி தொகையை செலுத்தி எங்களுக்கு உதவவும்.\n`;
    message += `-----------------\n`;
    message += `தாஸ் பொது சேவை மையம்\n`;
    message += `98 43 23 23 24`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/91${customer.phone}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// அனைவருக்கும் பாக்கி நினைவூட்டலை அனுப்பு
function sendDebtReminders() {
    const debtors = customers.filter(c => c.balanceAmount > 0);
    
    if (debtors.length === 0) {
        alert('பாக்கி தொகை உள்ள வாடிக்கையாளர்கள் இல்லை.');
        return;
    }
    
    if (confirm(`${debtors.length} வாடிக்கையாளர்களுக்கு பாக்கி நினைவூட்டல் அனுப்ப விரும்புகிறீர்களா?`)) {
        debtors.forEach((customer, index) => {
            setTimeout(() => {
                sendDebtReminder(customer.id);
            }, index * 2000); // 2 வினாடிகள் இடைவெளி
        });
    }
}

// ======================
// அறிக்கைகள் பகுதி
// ======================

// அறிக்கையை உருவாக்கு
function generateReport() {
    const reportType = document.getElementById('report-type').value;
    const reportDate = document.getElementById('report-date').value;
    const output = document.getElementById('report-output');
    
    let reportHTML = '<div class="report-card">';
    
    switch (reportType) {
        case 'daily':
            reportHTML += `<h3><i class="fas fa-calendar-day"></i> தினசரி அறிக்கை - ${formatDate(reportDate)}</h3>`;
            
            // இன்றைய வேலைகள்
            const dailyJobs = jobs.filter(job => job.submittedDate === reportDate);
            reportHTML += `<h4>இன்றைய வேலைகள் (${dailyJobs.length})</h4>`;
            
            if (dailyJobs.length > 0) {
                reportHTML += `<table><tr><th>குறிப்பு எண்</th><th>வாடிக்கையாளர்</th><th>சேவை</th><th>நிலை</th></tr>`;
                dailyJobs.forEach(job => {
                    reportHTML += `
                        <tr>
                            <td>${job.refNo}</td>
                            <td>${job.customerName}</td>
                            <td>${job.serviceName}</td>
                            <td>${getStatusText(job.status)}</td>
                        </tr>
                    `;
                });
                reportHTML += `</table>`;
            } else {
                reportHTML += `<p>இன்றைய வேலைகள் இல்லை</p>`;
            }
            
            // இன்றைய கட்டணங்கள்
            const dailyPayments = payments.filter(payment => payment.date === reportDate);
            const dailyTotal = dailyPayments.reduce((sum, p) => sum + p.amount, 0);
            
            reportHTML += `<h4>இன்றைய கட்டணங்கள் (${dailyPayments.length}) - மொத்தம்: ₹${dailyTotal}</h4>`;
            break;
            
        case 'debtors':
            reportHTML += `<h3><i class="fas fa-exclamation-triangle"></i> பாக்கி அறிக்கை</h3>`;
            
            const debtors = customers.filter(c => c.balanceAmount > 0);
            const totalDebt = debtors.reduce((sum, c) => sum + c.balanceAmount, 0);
            
            reportHTML += `<p>மொத்த பாக்கி தொகை: ₹${totalDebt} (${debtors.length} வாடிக்கையாளர்கள்)</p>`;
            
            if (debtors.length > 0) {
                reportHTML += `<table><tr><th>வாடிக்கையாளர்</th><th>தொலைபேசி</th><th>பாக்கி தொகை</th></tr>`;
                debtors.forEach(customer => {
                    reportHTML += `
                        <tr>
                            <td>${customer.name}</td>
                            <td>${customer.phone}</td>
                            <td class="priority-high">₹${customer.balanceAmount}</td>
                        </tr>
                    `;
                });
                reportHTML += `</table>`;
            }
            break;
            
        case 'jobs':
            reportHTML += `<h3><i class="fas fa-tasks"></i> வேலைகள் அறிக்கை</h3>`;
            
            const statusCounts = {
                pending: jobs.filter(j => j.status === 'pending').length,
                inprogress: jobs.filter(j => j.status === 'inprogress').length,
                completed: jobs.filter(j => j.status === 'completed').length,
                delivered: jobs.filter(j => j.status === 'delivered').length
            };
            
            reportHTML += `<h4>நிலைகள் வாரியாக</h4>`;
            reportHTML += `<ul>`;
            reportHTML += `<li>நிலுவையில்: ${statusCounts.pending}</li>`;
            reportHTML += `<li>செயல்பாட்டில்: ${statusCounts.inprogress}</li>`;
            reportHTML += `<li>முடிந்தது: ${statusCounts.completed}</li>`;
            reportHTML += `<li>வழங்கப்பட்டது: ${statusCounts.delivered}</li>`;
            reportHTML += `</ul>`;
            
            // சேவை வாரியாக
            const serviceCounts = {};
            jobs.forEach(job => {
                if (!serviceCounts[job.serviceName]) {
                    serviceCounts[job.serviceName] = 0;
                }
                serviceCounts[job.serviceName]++;
            });
            
            reportHTML += `<h4>சேவை வாரியாக</h4>`;
            reportHTML += `<ul>`;
            Object.keys(serviceCounts).forEach(service => {
                reportHTML += `<li>${service}: ${serviceCounts[service]} வேலைகள்</li>`;
            });
            reportHTML += `</ul>`;
            break;
    }
    
    reportHTML += `</div>`;
    output.innerHTML = reportHTML;
}

// ======================
// உதவி செயல்பாடுகள்
// ======================

// நிகழ்வு கேட்பவர்களை அமைக்க
function setupEventListeners() {
    // தேடல் இன்புட்கள்
    document.getElementById('customer-search').addEventListener('input', function() {
        searchCustomers(this.value);
    });
    
    document.getElementById('job-search').addEventListener('input', function() {
        searchJobs(this.value);
    });
    
    // வடிகட்டிகள்
    document.getElementById('customer-filter').addEventListener('change', function() {
        filterCustomers(this.value);
    });
    
    document.getElementById('job-filter').addEventListener('change', function() {
        filterJobs(this.value);
    });
}

// வாடிக்கையாளர்களை தேடு
function searchCustomers(query) {
    const tbody = document.getElementById('customers-table-body');
    const filtered = customers.filter(customer => 
        customer.name.toLowerCase().includes(query.toLowerCase()) ||
        customer.phone.includes(query) ||
        customer.id.toLowerCase().includes(query) ||
        (customer.services && customer.services.some(s => s.toLowerCase().includes(query.toLowerCase())))
    );
    
    renderFilteredCustomers(filtered);
}

// வாடிக்கையாளர்களை வடிகட்டு
function filterCustomers(filter) {
    let filtered = customers;
    
    if (filter === 'debtor') {
        filtered = customers.filter(c => c.balanceAmount > 0);
    } else if (filter === 'cleared') {
        filtered = customers.filter(c => c.balanceAmount <= 0);
    }
    
    renderFilteredCustomers(filtered);
}

// வடிகட்டப்பட்ட வாடிக்கையாளர்களை காட்டு
function renderFilteredCustomers(filtered) {
    const tbody = document.getElementById('customers-table-body');
    const noData = document.getElementById('no-customers');
    
    if (filtered.length === 0) {
        tbody.innerHTML = '';
        noData.style.display = 'block';
        return;
    }
    
    noData.style.display = 'none';
    
    let tableHTML = '';
    filtered.forEach(customer => {
        const serviceList = customer.services ? customer.services.join(', ') : '-';
        
        tableHTML += `
            <tr>
                <td><strong>${customer.id}</strong></td>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${serviceList}</td>
                <td>₹${customer.totalAmount || 0}</td>
                <td>₹${customer.paidAmount || 0}</td>
                <td class="${customer.balanceAmount > 0 ? 'priority-high' : 'priority-low'}">
                    ₹${customer.balanceAmount || 0}
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="small-btn primary-btn" onclick="editCustomer('${customer.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="small-btn whatsapp-btn" onclick="sendCustomerWhatsApp('${customer.id}')">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = tableHTML;
}

// வேலைகளை தேடு
function searchJobs(query) {
    const tbody = document.getElementById('jobs-table-body');
    const filtered = jobs.filter(job => 
        job.refNo.toLowerCase().includes(query.toLowerCase()) ||
        job.customerName.toLowerCase().includes(query.toLowerCase()) ||
        job.serviceName.toLowerCase().includes(query.toLowerCase()) ||
        job.details.toLowerCase().includes(query.toLowerCase())
    );
    
    renderFilteredJobs(filtered);
}

// வேலைகளை வடிகட்டு
function filterJobs(filter) {
    let filtered = jobs;
    
    if (filter !== 'all') {
        filtered = jobs.filter(j => j.status === filter);
    }
    
    renderFilteredJobs(filtered);
}

// வடிகட்டப்பட்ட வேலைகளை காட்டு
function renderFilteredJobs(filtered) {
    const tbody = document.getElementById('jobs-table-body');
    const noData = document.getElementById('no-jobs');
    
    if (filtered.length === 0) {
        tbody.innerHTML = '';
        noData.style.display = 'block';
        return;
    }
    
    noData.style.display = 'none';
    
    let tableHTML = '';
    filtered.forEach(job => {
        tableHTML += `
            <tr>
                <td><strong class="ref-no">${job.refNo}</strong></td>
                <td>${job.customerName}</td>
                <td>${job.serviceName}</td>
                <td>${formatDate(job.submittedDate)}</td>
                <td>${formatDate(job.checkDate)}</td>
                <td>${getStatusText(job.status)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="small-btn primary-btn" onclick="editJob('${job.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="small-btn whatsapp-btn" onclick="sendJobUpdateWhatsApp('${job.id}')">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = tableHTML;
}

// மாடலை மூடு
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    editId = null;
    editType = null;
}

// தேதியை வடிவமைக்க
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ta-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// நிலை உரையை பெறு
function getStatusText(status) {
    const statusMap = {
        'pending': 'நிலுவையில்',
        'inprogress': 'செயல்பாட்டில்',
        'completed': 'முடிந்தது',
        'delivered': 'வழங்கப்பட்டது'
    };
    return statusMap[status] || status;
}

// கட்டண முறை உரையை பெறு
function getPaymentModeText(mode) {
    const modeMap = {
        'cash': 'பணம்',
        'online': 'ஆன்லைன்',
        'cheque': 'செக்',
        'upi': 'UPI'
    };
    return modeMap[mode] || mode;
}

// தேதி கடந்துவிட்டதா என்பதை சரிபார்
function isDatePassed(dateString) {
    if (!dateString) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(dateString);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
}

// வாட்ச்அப் செய்தி அனுப்பு
function sendCustomWhatsApp() {
    const phone = document.getElementById('whatsapp-phone').value;
    const message = document.getElementById('whatsapp-message').value;
    
    if (!phone || !message) {
        alert('தொலைபேசி எண் மற்றும் செய்தி தேவை!');
        return;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/91${phone.replace(/\D/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    closeModal('whatsapp-modal');
}

// வாடிக்கையாளர் வாட்ச்அப் செய்தி
function sendCustomerWhatsApp(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;
    
    const message = `தாஸ் பொது சேவை மையம்\n-----------------\nஅன்பான ${customer.name} அவர்களே,\n\nஉங்கள் கணக்கு விவரங்கள்:\nகுறியீடு: ${customer.id}\nபாக்கி தொகை: ₹${customer.balanceAmount || 0}\n-----------------\nதாஸ் பொது சேவை மையம்\n98 43 23 23 24`;
    
    document.getElementById('whatsapp-phone').value = customer.phone;
    document.getElementById('whatsapp-message').value = message;
    
    document.getElementById('whatsapp-modal').style.display = 'flex';
}

// அச்சிடு அறிக்கை
function printReport() {
    window.print();
}

// தரவுகளை சேமிக்க
function saveCustomers() {
    localStorage.setItem('dassCustomers', JSON.stringify(customers));
    updateDashboard();
}

function saveJobs() {
    localStorage.setItem('dassJobs', JSON.stringify(jobs));
    updateDashboard();
}

function saveServiceCategories() {
    localStorage.setItem('dassServiceCategories', JSON.stringify(serviceCategories));
    updateDashboard();
}

function saveServices() {
    localStorage.setItem('dassServices', JSON.stringify(services));
    updateDashboard();
}

function savePayments() {
    localStorage.setItem('dassPayments', JSON.stringify(payments));
}