//variavel principal 
var Itens
var ItemAtual
var ItensMP
var CodigoPin
var ItensModelo
var SetModelo
// ->> CARREGAMENTO DOS DADOS PRINCIPAIS
  fetch("../dados/dados.json").then((data) => {
  data.json().then((data) => {   
    Itens =  data
  })   
})
//CARREGAMENTO DOS ITENS DE MP
fetch("../dados/base_mp.json").then((data) => {
  data.json().then((data) => {   
    ItensMP =  data    
  })   
})
//CARREGAMENTO DOS CODIGOS PIN
fetch("../dados/base_pin.json").then((data) => {
  data.json().then((data) => {   
    CodigoPin =  data    
  })   
})
//FUNÇÕES QUE VÃO SER EXECUTADAS NO CARREGAMENTO
window.onload =  function(){   
  carregaModelo()
}     
//COLOCA A LISTA DE MODELOS NA INPUT DE MODELO
function carregaModelo() {  
  setTimeout(  function (){
    const  vet = []
    Itens.map(it =>{
      vet.push(it.Modelo)
    })
    ItensModelo = Array.from(new Set(vet))   
    ItensModelo.map( item => {  
      const btmodelo = document.getElementById('btModelo')
      const model = document.createElement('option')
      model.value = item
      model.innerText = item
    
      btmodelo.append('<option>', value= model, text= model)
    })
  },2000)
}
function carregamento() {       
  fetch("dados.json").then((response) => {
    response.json().then((data) => {
      //processarDados(itens);      
      for (let i=0; i<data.lengt; i++){
        Itens[i] = new Item(data.Modelo,  data.CÓDIGO, data.Descrição)
      }                
    })   
  })     
}
// FILTRA O NOME DA PEÇA  
function filterTable() {  
  var mod = document.getElementById('input-btModelo')
  var model = mod.value.toLowerCase();
  const input = document.getElementById('formGroupExampleInput');
  const filter = input.value.toLowerCase();
  const table = document.getElementById('galeria');
  const rows = table.getElementsByTagName('tr');
  const exibicao = document.getElementById('exibicao')
  var veto = []

  let selecao = model.value;

  for(let i=0;i<ItemAtual.length;i++){
    let it = ItemAtual[i].Modelo 
    if (it == selecao){
      veto.push(it); 
    }       
  }   
  veto.forEach(element => {
    tr = document.createElement('tr')
    td1 = document.createElement('td')
    td2 = document.createElement('td')
    td3 = document.createElement('td')
  
    td1.innerText = element.Modelo
    td2.innerText = element.Descrição
    td3.innerText = element.CÓDIGO
  
    tr.append(td1)
    tr.append(td2)
    tr.append(td3)
  
    table.append(tr)      
  })  
  if (input.value && model.value == ""){
    alert("insira o modelo do equipamento para pesquisa")
  }else{
    // Itera sobre todas as linhas da tabela (exceto a linha do cabeçalho) 
    for (let i = 1; i < rows.length; i++) {
      let row = rows[i];
      let cells = row.getElementsByTagName('td');
      let match = false;
      // Verifica se alguma célula da linha contém o texto filtrado
      for (let j = 0; j < cells.length; j++) {
        if (cells[j].innerHTML.toLowerCase().indexOf(filter) > -1) {           
          match = true;
          break;
        }
      }
      // Exibe ou oculta a linha com base no filtro
      row.style.display = match ? ""  : "none";
    }
  }
}
function carregaPin(modelo){
  let lbPin = document.getElementById('lbPin')
  let codpin
  CodigoPin.map(item =>{
    if(item.Modelo == modelo)
      codpin = item.SERVICE_PIN     
  })
  if (codpin ==null){
    codpin = "verificar se tem PIN"
  }
  lbPin.innerText = codpin
  const md = document.getElementById('formGroupExampleInput')
  md.value=""
}
function modeloSelecionado(){
  const md = document.getElementById('formGroupExampleInput')
  const inp = document.getElementById('input-btModelo'); 
  const rdPecas = document.getElementById('radio_Pecas')
  const rdMP = document.getElementById('radio_MP')
  const gal = document.getElementById('exibicao')
  let vetAux 
  const  vet = []
  md.value = ""
  carregaPin(inp.value)

  if (rdPecas.checked){
    gal.innerHTML = '';
    vetAux = Itens;
  }   
  if (rdMP.checked){
    gal.innerHTML = '';
    vetAux = ItensMP;
  }
  ItemAtual = vetAux
  vetAux.map(it =>{
    if(it.Modelo == inp.value){
      vet.push(it);
    }
  }) 
  vet.forEach(element => {
    tr = document.createElement('tr')
    td1 = document.createElement('td')
    td2 = document.createElement('td')
    td3 = document.createElement('td')
  
    td1.innerText = element.Modelo
    td2.innerText = element.Descrição
    td3.innerText = element.CÓDIGO
  
    tr.append(td1)
    tr.append(td2)
    tr.append(td3)
  
    gal.append(tr) 
  })  
}
function filterModel() {
  // FILTRA O MODELO DO EQUIPAMENTO
  const inputModelo = document.getElementById('input-btModelo'); 
  const filter = inputModelo.value.toLowerCase();
  const table = document.getElementById('galeria');
  const rows = table.getElementsByTagName('tr');
  // Itera sobre todas as linhas da tabela (exceto a linha do cabeçalho)    
  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];
    let cells = row.getElementsByTagName('td');   
    let match = false;    

    // Verifica se alguma célula da linha contém o texto filtrado
    for (let j = 0; j < cells.length; j++) {      
      if (cells[j].innerHTML.toLowerCase().indexOf(filter) > -1) {
        match = true;
        break;
      }
    }
    // Exibe ou oculta a linha com base no filtro
    row.style.display = match ? "" : "none"; 
  } 
}
