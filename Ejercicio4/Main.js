export default class Main {
    constructor() {
        localStorage.removeItem('students');
        this._table = document.querySelector('#tableStudents');
        this._studentsArray = new Array();

        if (localStorage.getItem('students') != null) {
            this._studentsArray = JSON.parse(localStorage.getItem('students'));
            this._initTable();
        }

        document.querySelector('#btnAdd').addEventListener('click', () => {
            if (this._boxesIsFull()) {
                let objStudent = this._createObjectStudent();
                if (!this._studentIsInLocalStorange(objStudent)) {
                    this._studentsArray.push(objStudent);
                    localStorage.setItem('students', JSON.stringify(this._studentsArray));
                    this._showInTable(objStudent);
                } else {
                    alert('El alumno ya fue registrado');
                }
            } 
            else {
                alert('Rellene todos los campos para continuar');
            }
        });

        document.querySelector('#btnPresence').addEventListener('click', () => {
            if (this._boxesIsFull()) {
                let objStudent = this._createObjectStudent();
                if (this._studentIsInLocalStorange(objStudent)) {
                    this._studentsArray.forEach((student) => {
                        if (Number(student.numberAccount) === Number(document.querySelector('#numberAccount').value)) {
                            student.presences++;
                        }
                    });
                    localStorage.setItem('students', JSON.stringify(this._studentsArray));
                    this._cleanTable();
                    this._initTable();
                }
                else {
                    alert('El alumno no se encuntra registrado');
                }
            }
            else {
                alert('Rellene todos los campos para continuar');
            }
        });
    }

    _initTable() {
        let row;
        let cell;
        this._studentsArray.forEach((student => {
            row = this._table.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = student.numberAccount;
            cell = row.insertCell(1);
            cell.innerHTML = student.name;
            cell = row.insertCell(2);
            cell.innerHTML = student.presences;
        }));
    }

    _cleanTable() {
        for (let i = this._table.rows.length - 1; i > 0; i--) {
            this._table.deleteRow(i);
        }
    }

    _showInTable(objStudent) {
        let row = this._table.insertRow(-1);
        let cell = row.insertCell(0);
        cell.innerHTML = objStudent.numberAccount;
        cell = row.insertCell(1);
        cell.innerHTML = objStudent.name;
        cell = row.insertCell(2);
        cell.innerHTML = objStudent.presences;
    }

    _studentIsInLocalStorange(objStudent) {
        let isCreate = false;
        this._studentsArray.forEach((student) => {
            if (student.numberAccount == objStudent.numberAccount) {
                return true;
            }
        });
        return isCreate;
    }

    _createObjectStudent() {
        let inputNumberAccount = document.querySelector('#numberAccount');
        let inputName = document.querySelector('#name');

        let objStudent = {
            numberAccount: Number(inputNumberAccount.value),
            name: inputName.value,
            presences: 0
        }

        inputNumberAccount.value = '';
        inputName.value = '';

        return objStudent;
    }

    _boxesIsFull() {
        if (document.querySelector('#numberAccount').value != '' && document.querySelector('#name').value != '') {
            return true;
        }
        else {
            return false;
        }
    }
}

let main = new Main();