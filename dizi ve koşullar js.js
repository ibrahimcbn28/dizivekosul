let employees = [];

function addEmployee() {
    let name = document.getElementById("name").value.trim();
    let age = parseInt(document.getElementById("age").value);
    let department = document.getElementById("department").value.trim();
    let salary = parseFloat(document.getElementById("salary").value);

    if (name === "" || age < 18 || salary <= 0) {
        alert("Geçersiz veri girdiniz. İsim boş olamaz, yaş en az 18 olmalı ve maaş 0'dan büyük olmalı.");
        return;
    }

    let employeeExists = employees.some(emp => emp.name === name);
    if (employeeExists) {
        alert("Bu isimde bir çalışan zaten mevcut.");
        return;
    }

    let employee = { name, age, department, salary };
    employees.push(employee);
    alert("Çalışan başarıyla eklendi.");
    clearForm();
}

function updateEmployee() {
    let name = document.getElementById("name").value.trim();
    let age = parseInt(document.getElementById("age").value);
    let department = document.getElementById("department").value.trim();
    let salary = parseFloat(document.getElementById("salary").value);

    let index = employees.findIndex(emp => emp.name === name);
    if (index === -1) {
        alert("Bu isimde bir çalışan bulunamadı.");
        return;
    }

    if (age < 18 || salary <= 0) {
        alert("Geçersiz veri girdiniz.");
        return;
    }

    employees[index] = { name, age, department, salary };
    alert("Çalışan başarıyla güncellendi.");
    clearForm();
}

function deleteEmployee() {
    let name = document.getElementById("name").value.trim();
    let index = employees.findIndex(emp => emp.name === name);

    if (index === -1) {
        alert("Bu isimde bir çalışan bulunamadı.");
        return;
    }

    employees.splice(index, 1);
    alert("Çalışan başarıyla silindi.");
    clearForm();
}

function listEmployees() {
    if (employees.length === 0) {
        alert("Listelecek çalışan bulunmamaktadır.");
        return;
    }

    displayResult(employees);
}

function listByDepartment() {
    let department = prompt("Hangi departmanı listelemek istiyorsunuz?").trim();
    let filtered = employees.filter(emp => emp.department === department);

    if (filtered.length === 0) {
        alert(`${department} departmanında çalışan bulunmamaktadır.`);
        return;
    }

    displayResult(filtered);
}

function listBySalaryOrder() {
    let order = prompt("Maaş sıralaması 'art' ya da 'azal' olsun?").trim();
    let sorted;

    if (order === "art") {
        sorted = employees.slice().sort((a, b) => a.salary - b.salary);
    } else if (order === "azal") {
        sorted = employees.slice().sort((a, b) => b.salary - a.salary);
    } else {
        alert("Geçersiz sıralama tipi.");
        return;
    }

    displayResult(sorted);
}

function listBelowSalary() {
    let threshold = parseFloat(prompt("Maaşı kaç TL'den düşük olanları listelemek istiyorsunuz?"));
    let filtered = employees.filter(emp => emp.salary < threshold);

    if (filtered.length === 0) {
        alert(`Maaşı ${threshold} TL'nin altında olan çalışan bulunmamaktadır.`);
        return;
    }

    displayResult(filtered);
}

function findHighestSalary() {
    if (employees.length === 0) {
        alert("Çalışan listesi boş.");
        return;
    }

    let highest = employees.reduce((prev, current) => (prev.salary > current.salary) ? prev : current);
    alert(`En yüksek maaşlı çalışan: ${highest.name}, Maaş: ${highest.salary}`);
}

function calculateTotalSalary() {
    let total = employees.reduce((sum, emp) => sum + emp.salary, 0);
    let department = prompt("Hangi departman için toplam maaşı hesaplamak istiyorsunuz?");
    let departmentTotal = employees.filter(emp => emp.department === department)
                                   .reduce((sum, emp) => sum + emp.salary, 0);

    alert(`Tüm çalışanların toplam maaşı: ${total} TL, ${department} departmanının toplam maaşı: ${departmentTotal} TL`);
}

function displayResult(data) {
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h3>Çalışan Listesi:</h3>";
    data.forEach(emp => {
        resultDiv.innerHTML += `<p>İsim: ${emp.name}, Yaş: ${emp.age}, Departman: ${emp.department}, Maaş: ${emp.salary}</p>`;
    });
}

function clearForm() {
    document.getElementById("employeeForm").reset();
}