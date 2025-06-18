const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elemntos da Lista
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p span")




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

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
    try {
       //cria o elemento para adcionar o item ('li') na lista (ul).
       const expenseItem = document.createElement("li")
       expenseItem.classList.add("expense")

       // Cria o Icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Cria a info  da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense  

        // Cria a Categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace("R$", "")}`

        // Cria o item de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")    
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "Remover")   

        // Adiciona nome e categoria dentro da div expense-info
        expenseInfo.append(expenseName, expenseCategory)

        //Adicona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        // Adicona o Item na Lista
        expenseList.append(expenseItem)

        // Limpa os valores dos inputs
        formClear()

        //Atualiza os totais
        updateTotals()

    } catch (error) {
        console.log(error)
        alert("Nao foi possivel atualizar a lista de  despesa")
    }
}

// Atualiza os totais 
function updateTotals() {
    try {
      // Recupera todos os itens na lista 
      const items = expenseList.children 
     
      // Atualiza a quantidade de despesas na lista
        expensesQuantity.textContent = 
        `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        // Variavel para incrementar o total
        let total = 0
        
        //Percorre cada item da (li) da lista (ul)
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            // Remove caracteres que nao sejam numeros e substitui a virgula por ponto
            let value = itemAmount.textContent.replace("R$", "").replace(/\s/g, "").replace(".", "").replace(",", ".") 

            // Converte o valor para float
            value = parseFloat(value)

            // Verificar se o valor é um número válido
            if(isNaN(value)) {
                return alert("Não foi possivel calcular o total.")
            }

            // Incrementa o valor total
            total += Number(value)
        }

        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "") 

        expensesTotal.innerHTML = ""

        expensesTotal.append(symbolBRL, total)
    } catch (error) {
      console.log(error)
      alert("Nao foi possivel atualizar os totais.") 
    }
}

//Evento que captura o clique nos itens da lista

expenseList.addEventListener("click", (event) =>{
   // Verifica se o evento foi disparado pelo icone de remover   
   if(event.target.classList.contains("remove-icon")) {
       // Obetem o item mais próximo com a classe "expense"
       const item = event.target.closest(".expense")
       // Remove o item da lista
       item.remove()

    }

    // Atualiza os totais
    updateTotals()
})

function formClear() {
    // Limpa os valores dos inputs
    amount.value = ""
    expense.value = ""
    category.value = ""

    expense.focus()
}