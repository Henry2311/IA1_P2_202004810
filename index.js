
class Header {
    constructor(index, name) {
        this.index = index;
        this.name = name;
    }
}


var load_data = false;
var headers_data = []
var matrix_data = []


document.getElementById('load_file').addEventListener('click', function() {
    const fileInput = document.getElementById('file_dataset');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const csvContent = e.target.result;
            const rows = csvContent.split('\n').map(row => row.split(','));

            const tableHead = document.getElementById('csvTable').querySelector('thead');
            const tableBody = document.getElementById('csvTable').querySelector('tbody');
            const form_models = document.getElementById('form_model');
            const select = document.getElementById('models');
            tableHead.innerHTML = '';
            tableBody.innerHTML = ''; 
            form_models.innerHTML = '';
            select.value = '--';
            headers_data = []
            matrix_data = []
            if (rows.length > 0) {
                const headerRow = document.createElement('tr');
                rows[0].forEach((cell,index) => {
                    const th = document.createElement('th');
                    th.className = 'px-6 py-3'
                    th.textContent = cell.replace('_',' ');
                    headerRow.appendChild(th);
                    headers_data.push(new Header(index, cell))
                });
                tableHead.appendChild(headerRow);
            }

            rows.slice(1).forEach(row => {
                if (row.length > 1) { 
                    const tableRow = document.createElement('tr');
                    tableRow.className = 'bg-white border-b'
                    let row_aux = []
                    row.forEach(cell => {
                        const td = document.createElement('td');
                        td.textContent = cell;
                        tableRow.appendChild(td);
                        row_aux.push(cell)
                    });
                    tableBody.appendChild(tableRow);
                    matrix_data.push(row_aux)
                }
            });

            document.getElementById('container_data').style = ''
            load_data = true;
        };

        reader.readAsText(file);
    } else {
        alert('Por favor, selecciona un archivo CSV primero.');
    }
});

document.getElementById('models').addEventListener('change', function(){
    const select = document.getElementById('models');

    switch(select.value){
        case 'rl':
            if(headers_data.length>0 && matrix_data.length>0){
                const container = document.createElement('div');
                container.className = 'flex space-x-6 py-6'

                const container_left = document.createElement('div');
                container_left.className = 'basis-1/2'
                const container_right = document.createElement('div');
                container_right.className = 'basis-1/2'
                
                container.appendChild(container_left)
                container.appendChild(container_right)

                const label_x = document.createElement('label')
                label_x.for = 'column_x'
                label_x.className = 'block mb-2 text-sm font-medium text-gray-900'
                label_x.textContent = 'Columna X'
                const selection_x = document.createElement('select')
                selection_x.id = 'column_x'
                selection_x.className = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                

                const label_y = document.createElement('label')
                label_y.for = 'column_y'
                label_y.className = 'block mb-2 text-sm font-medium text-gray-900'
                label_y.textContent = 'Columna Y'
                const selection_y = document.createElement('select')
                selection_y.id = 'column_y'
                selection_y.className = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'

                headers_data.forEach(header=>{
                    let row = matrix_data[0]
                    if (!isNaN(parseFloat(row[header.index])) && isFinite(row[header.index])) {
                        const option = document.createElement('option')
                        option.value = header.index
                        option.textContent = header.name

                        const option_y = document.createElement('option')
                        option_y.value = header.index
                        option_y.textContent = header.name

                        selection_x.appendChild(option)
                        selection_y.appendChild(option_y)
                    }
                })

                container_left.appendChild(label_x);
                container_left.appendChild(selection_x);
                container_right.appendChild(label_y);
                container_right.appendChild(selection_y);

                const form_models = document.getElementById('form_model');
                form_models.innerHTML = '';
                form_models.appendChild(container)

                const button = document.createElement('button')
                button.id = 'train_model'
                button.className = 'bg-gray-700 w-full rounded-full text-white mr-4 py-2 px-4 hover:bg-gray-500'
                button.textContent = 'Entrenar Modelo'

                button.onclick = train_model
                
                form_models.appendChild(button)
            }
            break;
        case 'rp':
            if(headers_data.length>0 && matrix_data.length>0){
                const container = document.createElement('div');
                container.className = 'flex space-x-6 py-6'

                const container_left = document.createElement('div');
                container_left.className = 'basis-1/2'
                const container_right = document.createElement('div');
                container_right.className = 'basis-1/2'
                
                container.appendChild(container_left)
                container.appendChild(container_right)

                const label_x = document.createElement('label')
                label_x.for = 'column_x'
                label_x.className = 'block mb-2 text-sm font-medium text-gray-900'
                label_x.textContent = 'Columna X'
                const selection_x = document.createElement('select')
                selection_x.id = 'column_x'
                selection_x.className = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                

                const label_y = document.createElement('label')
                label_y.for = 'column_y'
                label_y.className = 'block mb-2 text-sm font-medium text-gray-900'
                label_y.textContent = 'Columna Y'
                const selection_y = document.createElement('select')
                selection_y.id = 'column_y'
                selection_y.className = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'

                headers_data.forEach(header=>{
                    let row = matrix_data[0]
                    if (!isNaN(parseFloat(row[header.index])) && isFinite(row[header.index])) {
                        const option = document.createElement('option')
                        option.value = header.index
                        option.textContent = header.name

                        const option_y = document.createElement('option')
                        option_y.value = header.index
                        option_y.textContent = header.name

                        selection_x.appendChild(option)
                        selection_y.appendChild(option_y)
                    }
                })

                container_left.appendChild(label_x);
                container_left.appendChild(selection_x);
                container_right.appendChild(label_y);
                container_right.appendChild(selection_y);

                const form_models = document.getElementById('form_model');
                form_models.innerHTML = '';
                form_models.appendChild(container)

                const button = document.createElement('button')
                button.id = 'train_model'
                button.className = 'bg-gray-700 w-full rounded-full text-white mr-4 py-2 px-4 hover:bg-gray-500'
                button.textContent = 'Entrenar Modelo'

                button.onclick = train_model
                
                form_models.appendChild(button)
            }
            break;
        case 'ad':
            if(headers_data.length>0 && matrix_data.length>0){
                const form_models = document.getElementById('form_model');
                form_models.innerHTML = '';
                form_models.className = 'my-3';
                
                const button = document.createElement('button')
                button.id = 'train_model'
                button.className = 'bg-gray-700 w-full rounded-full text-white mr-4 py-2 px-4 hover:bg-gray-500'
                button.textContent = 'Entrenar Modelo'

                button.onclick = train_model
                form_models.appendChild(button)

            }
            break;
        case 'nb':
            alert('Bayes')
            break;
        default:
            alert('Modelo no implementado')
    }
})

function train_model(){

    const select = document.getElementById('models');

    switch(select.value){
        case 'rl':
        case 'rp':
            const form_models = document.getElementById('form_model');

            const label_input = document.createElement('label')
            label_input.for = 'train_data' 
            label_input.className = 'block mb-2 text-sm font-medium text-gray-900'
            label_input.textContent = 'Datos para predicción'

            const input = document.createElement('input')
            input.type = 'text'
            input.className = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            input.id = 'train_data'
            input.placeholder = 'Datos separados por ,'

            const div = document.createElement('div')
            div.className = 'py-2 px-4'

            div.appendChild(label_input)
            div.appendChild(input)

            form_models.appendChild(div)

            const button = document.createElement('button')
            button.id = 'train_model'
            button.className = 'bg-gray-700 w-full rounded-full text-white mr-4 py-2 px-4 hover:bg-gray-500'
            button.textContent = 'Ver resultados'

            button.onclick = show_graph
            
            form_models.appendChild(button)

            break;
        case 'ad':
            const form_models_ab = document.getElementById('form_model');
            form_models_ab.className = 'my-3';
                
            const h4_title = document.createElement('h4');
            h4_title.className = 'text-xl font-bold tracking-tight text-gray-900'
            h4_title.textContent = 'Parámetros'

            form_models_ab.appendChild(h4_title)

            headers_data.forEach((header, index)=>{
                const container = document.createElement('div');
                const label = document.createElement('label')
                label.for = `input_ab_${header.name}`
                label.className = 'block mb-2 text-sm font-medium text-gray-900'
                label.textContent = header.name

                const input = document.createElement('input')
                input.type = 'text'
                input.id = `input_ab_${header.name}`
                input.name = `input_ab_${header.name}`
                input.className = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                input.placeholder = header.name

                if(index == headers_data.length-1){
                    input.disabled = true
                    input.className = 'bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    input.value = header.name
                    label.textContent = 'Valor a decidir'
                    label.for = 'analizar'
                    input.id = 'analizar'
                    input.name = 'analizar'
                }
                container.appendChild(label)
                container.appendChild(input)
                form_models_ab.appendChild(container)
            })

            const button_ab = document.createElement('button')
            button_ab.id = 'train_model'
            button_ab.className = 'bg-gray-700 my-3 w-full rounded-full text-white mr-4 py-2 px-4 hover:bg-gray-500'
            button_ab.textContent = 'Ver resultados'

            button_ab.onclick = show_graph
            
            form_models_ab.appendChild(button_ab)
            break;
        case 'nb':
            alert('Bayes')
            break;
        default:
            alert('Modelo no implementado')
    }
}

function show_graph(){

    const select = document.getElementById('models');

    switch(select.value){
        case 'rl':
            const index_x = parseInt(document.getElementById('column_x').value);
            const index_y = parseInt(document.getElementById('column_y').value);

            let train_x = [], train_y = [];

            matrix_data.forEach(row => {
                row.forEach((cell, index)=>{
                    if(index == index_x){
                        train_x.push(parseFloat(cell))
                    }else if(index == index_y){
                        train_y.push(parseFloat(cell))
                    }
                })
            })

            var linear = new LinearRegression()
            linear.fit(train_x, train_y)

            let predict_y;
            const predict = document.getElementById('train_data').value
            let data_predict = []
            if(predict != ''){
                data_predict = predict.split(',')
            }
            if(data_predict.length > 0){
                predict_y = linear.predict(data_predict)
            }else{
                predict_y = linear.predict(train_x)
            }
            show_table_result(predict_y)
            let a = joinArrays('x',train_x,'yTrain',train_y,'yPredict',predict_y)
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(()=>{
                var data = google.visualization.arrayToDataTable(a);
                var options = {
                    seriesType : 'scatter',
                    series: {1: {type: 'line'}}
                };  
                var chart = new google.visualization.ComboChart(document.getElementById('model_chart'));
                chart.draw(data, options);       
            });

            break;
        case 'rp':
            const index_x_pol = parseInt(document.getElementById('column_x').value);
            const index_y_pol = parseInt(document.getElementById('column_y').value);

            let train_x_pol = [], train_y_pol = [];
            //2.1,3.5,4.8,5.5,6.3
            matrix_data.forEach(row => {
                row.forEach((cell, index)=>{
                    if(index == index_x_pol){
                        train_x_pol.push(parseFloat(cell))
                    }else if(index == index_y_pol){
                        train_y_pol.push(parseFloat(cell))
                    }
                })
            })
            console.log(train_x_pol)
            console.log(train_y_pol)
            let polynomial = new PolynomialRegression();
            polynomial.fit(train_x_pol, train_y_pol, 2);

            let predict_y_pol;
            const predict_pol = document.getElementById('train_data').value
            let data_predict_pol = []
            if(predict_pol != ''){
                data_predict_pol = predict_pol.split(',')
            }
            if(data_predict_pol.length > 0){
                predict_y_pol = data_predict_pol
            }else{
                predict_y_pol = train_x_pol
            }

            let grado2 = polynomial.predict(predict_y_pol);
            polynomial.fit(train_x_pol, train_y_pol, 3);
            let grado3 = polynomial.predict(predict_y_pol);
            polynomial.fit(train_x_pol, train_y_pol, 4);
            let grado4 = polynomial.predict(predict_y_pol);
            
            const tableHead = document.getElementById('resultTable').querySelector('thead');
            const tableBody = document.getElementById('resultTable').querySelector('tbody');
            tableHead.innerHTML = `
                <tr>
                    <th scope=\"col\">Prediccion</th>
                    <th scope=\"col\">GRADO 2</th>
                    <th scope=\"col\">GRADO 3</th>
                    <th scope=\"col\">GRADO 4</th>
                </tr>`
            tableBody.innerHTML = '';
            let contentBody = '';
            for (let i = 0; i < grado2.length; i++) {
                contentBody += "<tr><td>" + predict_y_pol[i] + "</td> <td> " + grado2[i] + "</td> <td> " + grado3[i] + "</td> <td> " + grado4[i] + "</td></tr>";
            }

            tableBody.innerHTML=contentBody


            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(()=>{
                var valoresGrafica = [];
                valoresGrafica.push(["X", "Y", "Grado 2", "Grado 3", "Grado 4"]);

                for (let i = 0; i < train_x_pol.length; i++) {
                    valoresGrafica.push([
                        train_x_pol[i],
                        train_y_pol[i],
                        grado2[i],
                        grado3[i],
                        grado4[i],
                    ]);
                }

                var data = google.visualization.arrayToDataTable(valoresGrafica);

                var options = {
                    title: 'Regresion Polinomial',
                    curveType: 'function'
                };

                var chart = new google.visualization.LineChart(document.getElementById('model_chart'));
                chart.draw(data, options);    
            });

            break;
        case 'ad':
            let data_set = [headers_data.map(head => head.name), ...matrix_data];
            let dTree = new DecisionTreeID3(data_set);
            console.log(dTree.dataset)
            let root = dTree.train(dTree.dataset);

            const inputs = document.querySelectorAll('input');

            const values = Array.from(inputs)
                .filter(input => input.name.startsWith('input_ab_'))
                .map(input => input.value);
            
            let predict_ab = dTree.predict([
                    headers_data.slice(0, -1).map(head => head.name),
                    values,
                ], root)
            
            console.log({
                predictNode: predict_ab
            })

            const tableHead_ab = document.getElementById('resultTable').querySelector('thead');
            const tableBody_ab = document.getElementById('resultTable').querySelector('tbody');
            tableHead_ab.innerHTML = `
                <tr>
                    <th scope=\"col\">ID</th>
                    <th scope=\"col\">TAG</th>
                    <th scope=\"col\">RESULTADO</th>
                </tr>`
            tableBody_ab.innerHTML = `
            <tr>
                <th scope=\"col\">${predict_ab.id}</th>
                <th scope=\"col\">${predict_ab.tag}</th>
                <th scope=\"col\">${predict_ab.value}</th>
            </tr>`;

            var parsDot = vis.network.convertDot(dTree.generateDotString(root));
            var data = {
                nodes: parsDot.nodes,
                edges: parsDot.edges
            }
            var options = {
                layout: {
                    hierarchical: {
                        levelSeparation: 100,
                        nodeSpacing: 100,
                        parentCentralization: true,
                        direction: 'UD', 
                        sortMethod: 'directed',                  
                    },
                },
            };
            var network = new vis.Network(document.getElementById("model_chart"), data, options);
            break;
        case 'nb':
            alert('Bayes')
            break;
        default:
            alert('Modelo no implementado')
    }

}

function show_table_result(data){
    const tableHead = document.getElementById('resultTable').querySelector('thead');
    const tableBody = document.getElementById('resultTable').querySelector('tbody');
    tableHead.innerHTML = '';
    tableBody.innerHTML = ''; 

    const headerRow = document.createElement('tr');
    const th = document.createElement('th');
    th.className = 'px-6 py-3'
    th.textContent = '#'
    headerRow.appendChild(th);   
    const th_predict = document.createElement('th');
    th_predict.className = 'px-6 py-3'
    th_predict.textContent = 'Prediccion'
    headerRow.appendChild(th);               
    headerRow.appendChild(th_predict);           
    tableHead.appendChild(headerRow);

    data.forEach((value, index)=>{
        const tableRow = document.createElement('tr');
        tableRow.className = 'bg-white border-b'
        const td = document.createElement('td');
        td.textContent = index;
        const td_2 = document.createElement('td');
        td_2.textContent = value;
        tableRow.appendChild(td);
        tableRow.appendChild(td_2);
        tableBody.appendChild(tableRow);
    })

}