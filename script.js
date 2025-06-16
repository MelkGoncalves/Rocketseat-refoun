const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


amount.oninput = () => {
    //Obtem o valor atual do input e remove todos os caracteres que nao sejam numeros
    let value = amount.value.replace(/\D/g, "")


    //Tranformar o valor em centavos
    value = Number(value) / 100

    // atualiza o valor do input com o valor limpo
    amount.value = formatCurrencyBRL(value)
}

 function formatCurrencyBRL(value) {
  // Formata o valor para BRL
     value = value.toLocaleString("pt-BR", {
         style: "currency", 
         currency: "BRL",
    })

    // Retorna o valor formatado
    return value

}

// Captura o evento de submit do formulário
form.onsubmit = (event) => {
    // Evita o comportamento padrão do formulário
    event.preventDefault()

    // Cria um novo objeto de despesa com os valores dos inputs
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    // Chama a função que irá adicionar um item na lista de despesas
    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
       
    } catch (error) {
        alert("Erro ao adicionar despesa: " + error.message)
        console.log(error)
    }
}