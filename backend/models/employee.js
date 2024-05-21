class Employee {
    constructor(uid, fullname, email, phone, role, cinemaId) {
        this.uid = uid;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.cinemaId = cinemaId;
    }
}

module.exports = Employee;