const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-livros");
const modelo = document.querySelector("#modelo-livro");

const apiKey = "cv_prePXOk1ahzH1vNpbLJ8MxucOZDQ1pmdzE_QVCuwZou9vMekaRUEWZyfkDbr17B0";
const apiUrl = "https://api-ds.codeverse.dev.br/api/livros";

async function buscarlivros() {

  //Mostra uma msg.
  resposta.textContent="Carregando livros..."
  
  try {
    //Fazer o get
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key" : apiKey},
    });
    
    //Verificar se não deu certo
    if(!retorno.ok){
      throw new Error("Não foi possível carregar os livros.");
    }

    // Converter o resultado para JSON, pois será um objeto.
    const resultado = await retorno.json();

    //Percorrer todos os livros que esta dentro de resultado.
    for (const livro of resultado.data){
      
      //fazer uma copia do modelo que criamos no html
      const card = modelo.content.cloneNode(true);

      //preecher cada item desse card

      card.querySelector(".nome").textContent = livro.title;
      card.querySelector(".autor").textContent = livro.autor;
      card.querySelector(".genero").textContent = livro.genero;
      card.querySelector(".ano_publicacao").textContent = livro.ano_publicacao;
      card.querySelector(".numero_paginas").textContent = livro.numero_paginas;

      const imagem = card.querySelector(".imagem-livro");

      if (livro.imageUrl){
        imagem.src = livro.imageUrl;
        imagem.alt = livro.title;
        
        imagem.onerror = () => imagem.remove();
        
      } else {
        imagem.remove();
      }

      // adiciona o card preenchido na tela

      lista.appendChild(card);
      resposta.textContent = "";

    }

  } catch (error) {
    console.error(error);
    resposta.textContent= "Não foi possível carregar os livros. Tente novamente!" 
  }
}

// Executar no arquivo

buscarlivros();