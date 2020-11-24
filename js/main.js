const datatable = document.getElementById('datatable');
const tbody = document.getElementById('datatable-tbody');
const thead = document.getElementById('datatable-thead');

function createElementH(element) {
    const createdElement = document.createElement(element);
    return createdElement;
}

function createTextContent(text) {
    const newContent = document.createTextNode(text);
    return newContent;
}

function createElementChild(element, child) {
    element.appendChild(child);
}

function addValuesTable(arr) {
    const tr = createElementH('tr');
    arr.filter(value => {
        const td = createElementH('td');
        const content = createTextContent(value);
        createElementChild(td, content);
        createElementChild(tr, td);
    })
    createElementChild(tbody, tr);
}

export function getData(arr){
    arr.filter(value => {
        const arrData = [
            value.id,
            value.name,
            value.symbol,
            value.slug,
            value.rank,
            value.first_historical_data.slice(0, 10)
        ]
        addValuesTable(arrData);
    });
}
thead.addEventListener('click', elem => {
    const thValue = elem.target.getAttribute('value');
    const order = elem.target.getAttribute('order');
    const tableLenght = datatable.rows.length;
    for(let i = 0; i < tableLenght; i++) {
        for(let j = 2; j < tableLenght; j++) {
            const previus = datatable.rows[j - 1].cells[thValue].innerText;
            const current = datatable.rows[j].cells[thValue].innerText;
            const previusTreaty = !isNaN(previus) ? parseFloat(previus) : previus;
            const currentTreaty = !isNaN(current) ? parseFloat(current) : current;
            if(order === 'asc') {
                if(previusTreaty > currentTreaty) {
                    const removed = tbody.removeChild(datatable.rows[j - 1]);
                    tbody.insertBefore(removed, datatable.rows[j]);
                }
            } else {
                if(previusTreaty < currentTreaty) {
                    const removed = tbody.removeChild(datatable.rows[j - 1]);
                    tbody.insertBefore(removed, datatable.rows[j]);
                }
            }
        }
    }
    if(order === 'asc') {
        elem.target.setAttribute('order', 'desc');
    } else {
        elem.target.setAttribute('order', 'asc');
    }

});
