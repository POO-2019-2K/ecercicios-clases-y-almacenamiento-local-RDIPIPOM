export default class Main {
    constructor() {
        let money = 0;
        let h1 = document.querySelector('#money');
        if (localStorage.getItem('money') != null) {
            money = Number(localStorage.getItem('money'));
            h1.innerHTML = '$' + money;
        }

        document.querySelector('#btnOK').addEventListener('click', () => {
            let amount = Number(document.querySelector('#amount').value);
            switch (document.querySelector('#type').value) {
                case 'deposito':
                    money += amount;
                    break;
                case 'retiro':
                    if (money >= amount) {
                        money -= amount;
                    }
                    else {
                        alert('No existen suficientes fondos para retirar');
                    }
                    break;
            }
            localStorage.setItem('money', money); 
            h1.innerHTML = '$' + money;
        });
    }
}

let main = new Main();