(function(){

	// Initialize Firebase
	var config = {
        apiKey: "AIzaSyByCt2sDszxo84V6wd6MWxFarfsT7BpPZs",
        authDomain: "btime-e18fa.firebaseapp.com",
        databaseURL: "https://btime-e18fa.firebaseio.com",
        projectId: "btime-e18fa",
        storageBucket: "btime-e18fa.appspot.com",
        messagingSenderId: "23757485554"
    };
    firebase.initializeApp(config);
	var firestore = firebase.firestore();
	var storage = firebase.storage();


	//Get Users
	var storeUser = firestore.collection("User");

	storeUser.get().then(function(querySnapshot) {
		var allUsers = [];
		querySnapshot.forEach(function(doc) {
			allUsers.push(doc.data());
		});

		var getName = allUsers.filter(function (n) {
			return n.emailUser == UserEmail;
		});

		//Name Header
		$("#titulo").html("Olá, " + getName[0].nomeUser);
		window.name = getName[0].nomeUser;
	});

	//Get Items
	var storeNumber = firestore.collection("HappyNumber");

	storeNumber.onSnapshot(function(querySnapshot) {
		window.allNumber = [];

		$("#tabela-Number").empty();

		querySnapshot.forEach(function(doc) {
			var data = doc.data()
			data.id = doc.id;
			window.allNumber.push(data);
		});

		//Put at table
		var tabela = document.querySelector('#tabela-Number');
		for (var i = 0; i < window.allNumber.length; i++) {
			var TR = montaTR(window.allNumber[i]);
			tabela.appendChild(TR);
		}

		function montaTR(Number){
			var TR = document.createElement('tr');
			TR.classList.add('Number');
			TR.id = Number.id;
			TR.appendChild(montaTD(Number.Criador,'info-criador'));
			TR.appendChild(montaTD(Number.Number,'info-numb'));
			TR.appendChild(montaTD(Number.Resultado,'info-resul'));
			return TR;
		}

		function montaTD(dado, classe){
			var td = document.createElement('td');
			td.textContent = dado;
			td.classList.add(classe);
			return td;
		}
	});

	window.actual = {};

	$("tbody").on("dblclick", function(e){
		var $el = $(e.target);
		var paiDoElemento = $el.parentNode;

		e.preventDefault();

		window.allNumber.filter(n => {
			$.each(n, (i, el) => {
				if(el == $el.parent().attr("id")){
					window.actual = n;
				}
			});
		});

		let tdData = [];
		$el.parent().children().each((n, td) => {
			let className = $(td).attr("class").replace("info-", "");
			tdData.push({
				name : className,
				desc : $(td).html()
			});
		});

		$.each(tdData, (e, i) => {
			let $elm = $("#" + i.name);

			if ($elm.attr("type") == "file"){
				$elm.attr("value", i.desc);
			} else {
				$elm.val(i.desc);
			}
		});

		$("#popup_add").show();
		$("#adicionar-Number").addClass("hidden");
		$("#editar-Number").removeClass("hidden");
		$("#deletar-Number").removeClass("hidden");
		$("#titulo-form").html("Editar Number");

	})


	// Update
	$("#editar-Number").on("click", e => {
		e.preventDefault();

		let docID = window.actual.id;

	    return storeNumber.doc(docID).update(
	    	window.actual
	    ).then(function() {
	    	closePopup();
	        console.log("Document successfully updated!");
	    })
	    .catch(function(error) {
	        // The document probably doesn't exist.
	        console.error("Error updating document: ", error);
	    });
	});


	//Delete
	$("#deletar-Number").on("click", e => {
		e.preventDefault();

		let docID = window.actual.id;

	    storeNumber.doc(docID).delete().then(function() {
	    	closePopup();
	        console.log("Document successfully deleted!");
	    }).catch(function(error) {
	        console.error("Error removing document: ", error);
	    });
	});

    function closePopup(){
    	$("#popup_add").hide();
		$("#form-adiciona")[0].reset();
		window.actual = {};
    }



	//Name URL
	//var host = window.location.href;
	//window.name = decodeURI(host.split("?")[1].split("name=")[1]);

	//Close Popup
	$(".close_window").on("click", closePopup);

	$("#adicionar").on("click", function(e){
		e.preventDefault();
		$("#popup_add").show();
		$("#adicionar-Number").removeClass("hidden");
		$("#editar-Number").addClass("hidden");
		$("#deletar-Number").addClass("hidden");
		$("#titulo-form").html("Adicionar Number");
	});

	//SignOut
	$("#deslogar").on("click", function(e){
		e.preventDefault();
		firebase.auth().signOut().then(function() {
			alert("Desconectado");
		  }).catch(function(error) {
			alert("Erro - " + e);
		  });
	})


	// Add a Realtime Listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
			window.UserEmail = firebaseUser.email;
		}else {
			console.log('not logged in');
			location.href = "index.html";
		}
		});
})();