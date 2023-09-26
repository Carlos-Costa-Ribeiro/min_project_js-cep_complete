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
    let string = cepValue
    if (string.includes("-")) {
        string = string.replace("-", "");
        if (!isNaN(string)) {
            return string
        } else {
            alert("Digite um cep valido !!")
        }
    } else {
        alert("Digite um cep valido !!")
    }
}

async function searchForCep(cepNumber) {
    try {
        let response = await fetch(`https://viacep.com.br/ws/${cepNumber}/json/`);
        let data = await response.json();
        console.log(data);
        if (!data.erro) {
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
            document.getElementById('btn').disabled = false;
        } else {
            alert('CEP não encontrado.');
        }
    } catch {
        alert('Erro ao consultar o CEP.');
    }
}