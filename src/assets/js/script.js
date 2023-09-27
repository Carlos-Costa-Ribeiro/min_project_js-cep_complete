document.getElementById('cep').addEventListener('blur', (e) => {
    let cepValue = e.target.value;
    if (cepValue.length == 9) {
        cepValue = retireHifem(cepValue);
        searchForCep(cepValue)
    } else if (cepValue.length == 8 && !isNaN(cepValue)) {
        searchForCep(cepValue)
    } else {
        alert("Digite um cep valido !!")
    }
})

function retireHifem(cepValue) {
    let string = cepValue;
    // Check if the CEP value contains a hyphen
    if (string.includes("-")) {
        string = string.replace("-", "");
        // Check if the resulting string is a valid number
        if (!isNaN(string)) {
            return string;
        } else {
            alert("Digite um cep valido !!");
        }
    } else {
        alert("Digite um cep valido !!");
    }
}

async function searchForCep(cepNumber) {
    try {
        // Send a request to the CEP API
        let response = await fetch(`https://viacep.com.br/ws/${cepNumber}/json/`);
        let data = await response.json();
        console.log('Data retrieved:', data);
        if (!data.erro) {
            // Update the input fields with the address information
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
            document.getElementById('btn').disabled = false;
        } else {
            // Display an alert if the CEP is not found
            alert('CEP não encontrado.');
        }
    } catch {
        // Display an alert if there's an error while querying the CEP
        alert('Erro ao consultar o CEP.');
    }
}