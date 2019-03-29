export default class Main {
    constructor() {
        localStorage.removeItem('students');
        let studentsArray = new Array();

        if (localStorage.getItem('students') != null) {
            studentsArray = JSON.parse(localStorage.getItem('students'));
        }

        document.querySelector('#btnAdd').addEventListener('click', () => {
            let isCreate = false;
            let inputNumberAccount = document.querySelector('#numberAccount');
            let inputName = document.querySelector('#name');

            let objStudent = {
                numberAccount: Number(inputNumberAccount.value),
                name: inputName.value
            }

            studentsArray.forEach((student) => {
                if (student.numberAccount == objStudent.numberAccount) {
                    isCreate = true;
                }
            });

            inputNumberAccount.value = '';
            inputName.value = '';

            if (!isCreate) {
                studentsArray.push(objStudent);
                localStorage.setItem('students', JSON.stringify(studentsArray));
                alert('¡Alumno registrado exitosamente!');
            } else {
                alert('El alumno ya fue registrado');
            }
        });
    }
}

let main = new Main();