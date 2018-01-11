var firestore = firebase.firestore();

//Get Elements
window.storeNumber = firestore.collection("HappyNumber");

    window.valNumber = $('#number');
    window.add = $('#adicionar-Number');

//Add Number
add.on('click', e => {

    e.preventDefault();

    const number = valNumber.val();
    const criador = window.name;

    const auth = firebase.auth();

    //Happy Number Function    -    http://dojopuzzles.com/problemas/exibe/numeros-felizes/
    var a = [];
    var cont = 0;
    var b = 0;

    acheNumero(number);

    function acheNumero(num) {
      var cast = num.toString(10).split('');
      for (var i=0,n=cast.length; i<n; i++){
      var res = Math.pow(cast[i], 2);
      a.push(res);

      }
      seraFeliz(a);
    }

    function seraFeliz(n){
      var somado = a.reduce(getSum);

      if(cont == 50){
        alert("Tente novamente =/");
        storeNumber.add({
          Criador: criador,
          Number: number,
          Resultado: "Errou..."
        }).then(function() {
          $("popup_add").hide();
        }).catch(function(error){
          alert(error);
        });
      }else if(somado != 1){
        cont++;
        a = [];
        acheNumero(somado);
      }else{
        alert("Você achou um número feliz!  ^^");
        storeNumber.add({
          Criador: criador,
          Number: number,
          Resultado: "Acertou!!!"
        }).then(function() {
          $("popup_add").hide();
        }).catch(function(error){
          alert(error);
        });
      }

    }

    function getSum(total, num) {
        return total + num;
    }
});

// Add a Realtime Listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
  }else {
    console.log('not logged in');
    location.href = "index.html";
  }
});