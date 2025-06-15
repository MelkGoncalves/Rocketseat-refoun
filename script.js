const amount = document.getElementById("amount")


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