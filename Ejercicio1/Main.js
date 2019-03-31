export default class Main {
    constructor() {
        this._table = document.querySelector('#tableStudents');
        this._studentsArray = new Array();

        if (localStorage.getItem('students') != null) {
            this._studentsArray = JSON.parse(localStorage.getItem('students'));
            this._initTable();
        }

        document.querySelector('#btnAdd').addEventListener('click', () => {
            let isCreate = false;
            let inputNumberAccount = document.querySelector('#numberAccount');
            let inputName = document.querySelector('#name');

            let objStudent = {
                numberAccount: Number(inputNumberAccount.value),
                name: inputName.value
            }

            this._studentsArray.forEach((student) => {
                if (student.numberAccount == objStudent.numberAccount) {
                    isCreate = true;
                }
            });

            inputNumberAccount.value = '';
            inputName.value = '';

            if (!isCreate) {
                this._studentsArray.push(objStudent);
                localStorage.setItem('students', JSON.stringify(this._studentsArray));
                alert('¡Alumno registrado exitosamente!');
                this._showInTable(objStudent);
            } else {
                alert('El alumno ya fue registrado');
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
        }));
    }

    _showInTable(objStudent) {
        let row = this._table.insertRow(-1);
        let cell = row.insertCell(0);
        cell.innerHTML = objStudent.numberAccount;
        cell = row.insertCell(1);
        cell.innerHTML = objStudent.name;
    }
}

let main = new Main();