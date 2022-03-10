var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
var token = "282d4740b459f7dcb85b0c96faa173c861e8e5ad";

function getData(query){ 
    let options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
    }

    fetch(url, options)
    .then(response => response.text())
    .then(result => setData(result))
    .catch(error => console.log("error", error));
}

function typeDescription(type) {
  let TYPES = {
    'INDIVIDUAL': 'Индивидуальный предприниматель',
    'LEGAL': 'Организация'
  }
  return TYPES[type];
}

(function() {
    document.querySelector('input').addEventListener('keydown', function(e) {
      if (e.keyCode === 13) {
        // можете делать все что угодно со значением текстового поля
        getData(this.value)
      }
    });
  })();

sendButton.onclick = function() {
    let val = document.getElementById('party').value;
    getData(val)
 };

function setData(data)
{
    var objectData = eval('(' + data + ')');
    let name = objectData.suggestions[0].data.name.short_with_opf
    let fullName = objectData.suggestions[0].data.name.full_with_opf
    let inn = objectData.suggestions[0].data.inn
    let kpp = objectData.suggestions[0].data.kpp
    let address=objectData.suggestions[0].data.address.unrestricted_value


    let p = document.getElementById('type')
    p.innerHTML=typeDescription(objectData.suggestions[0].data.type)+` (${objectData.suggestions[0].data.type})`
    document.getElementById('name_short').value=name
    document.getElementById('name_full').value=fullName
    document.getElementById('inn_kpp').value=inn+" / "+kpp
    document.getElementById('address').value=address
}

