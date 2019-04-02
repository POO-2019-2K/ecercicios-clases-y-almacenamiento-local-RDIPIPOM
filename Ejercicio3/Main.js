export default class Main {
    constructor() {
        this._table = document.querySelector('#tableMoves');
        this._arrayMoves = new Array();
        this._totalMoney = 0;

        let h1 = document.querySelector('#money');

        if (localStorage.getItem('moves') != null) {
            this._arrayMoves = JSON.parse(localStorage.getItem('moves'));
            this._totalMoney = Number(localStorage.getItem('totalMoney'));
            this._initTable();
            h1.innerHTML = '$' + this._totalMoney;
        }

        document.querySelector('#btnOK').addEventListener('click', () => {
            let type = document.querySelector('#type').value;
            let amount = Number(document.querySelector('#amount').value);
            let validMove = true;
            if (type === 'deposito') {
                type = 'Depósito';
                this._totalMoney += amount;
            } else {
                if (this._totalMoney >= amount) {
                    type = 'Retiro';
                    this._totalMoney -= amount;
                } else {
                    validMove = false;
                    alert('No hay suficientes fondos para retirar');
                }
            }

            if (validMove) {
                let objMove = {
                    date: new Date(),
                    type: type,
                    amount: amount,
                    totalMoney: this._totalMoney
                }

                this._arrayMoves.push(objMove);
                localStorage.setItem('moves', JSON.stringify(this._arrayMoves));
                localStorage.setItem('totalMoney', this._totalMoney);
                h1.innerHTML = '$' + this._totalMoney;
                this._showInTable(objMove);
            }
        });
    }

    _initTable() {
        let row;
        let cell;
        let date;

        this._arrayMoves.forEach(moves => {
            row = this._table.insertRow(-1);
            cell = row.insertCell(0);
            date = new Date(moves.date)
            cell.innerHTML = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            cell = row.insertCell(1);
            cell.innerHTML = moves.type;
            cell = row.insertCell(2);
            cell.innerHTML = moves.amount;
            cell = row.insertCell(3);
            cell.innerHTML = moves.totalMoney;
        });
    }

    _showInTable(objMove) {
        let row = this._table.insertRow(-1);
        let cell = row.insertCell(0);
        let date = new Date(objMove.date)
        cell.innerHTML = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
        cell = row.insertCell(1);
        cell.innerHTML = objMove.type;
        cell = row.insertCell(2);
        cell.innerHTML = objMove.amount;
        cell = row.insertCell(3);
        cell.innerHTML = objMove.totalMoney;
    }
}

let main = new Main();