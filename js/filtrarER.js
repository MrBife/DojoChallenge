//Get Field
var campoFiltro = document.querySelector('#filtro-tabela');

//Listening on type
campoFiltro.addEventListener('input',function(){
  var Numbers = document.querySelectorAll('.Number');
  if (this.value.length > 0) {
    for (var i = 0; i < Numbers.length; i++) {
      var Number = Numbers[i];
      var tdNome = Number.querySelector('.info-criador');
      var nome = tdNome.textContent;

      var expressao = new RegExp(this.value,"i");

      if (!expressao.test(nome)) {
        Number.classList.add('esconder');
      }
      else{
        Number.classList.remove('esconder');
      }
    }
  }
  else{
    for (var i = 0; i < Numbers.length; i++) {
      var Number = Numbers[i];
      Number.classList.remove('esconder');
    }
  }
});
