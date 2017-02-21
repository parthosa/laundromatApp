
var baseUrl = "http://192.178.0.1:8000"

//$(document).ready(function () {
//
//<<<<<<< HEAD
//  $(document).on('click', function (ev) {
//    console.log((ev.target).closest('#moreOptionsTrigger') != null)
//    var bx = document.getElementById('moreOptions');
//
//    if (bx != null) {
//      if ((ev.target).closest('#moreOptionsTrigger') != null)
//        bx.style.display = 'block'
//=======
//	$(document).on('click',function(ev){
//		var bx=document.getElementById('moreOptions');
//>>>>>>> 775b31d52bed9911216bacfb294cc40c1d9d45f5
//
//      else if ((ev.target).closest('#moreOptions') == null)
//        bx.style.display = 'none'
//
//    }
//  })
//});

$(document).ready(function () {
  Materialize.updateTextFields();
});


var dataURL;


function previewFile(canvasId) { 
  var preview = document.querySelector('img#img-preview'); 
  var file   = document.querySelector('input#profile-pic-upload').files[0]; 
  var reader  = new FileReader();
  //        console.log(2)

  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext("2d");

  img = new Image();
  img.onload = function () {

    canvas.height = canvas.width * (img.height / img.width);

    /// step 1
    var oc = document.createElement('canvas'),
      octx = oc.getContext('2d');

    oc.width = img.width * 0.5;
    oc.height = img.height * 0.5;
    octx.drawImage(img, 0, 0, 250, 250);

    /// step 2
//    octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

    ctx.drawImage(oc, 0, 0, 250, 250,
      0, 0, canvas.width, canvas.height);
    dataURL = canvas.toDataURL();
  }
   
  if (file) {
    reader.readAsDataURL(file); 
  }

   
  reader.addEventListener("load", function () {
            img.src = reader.result;

     }, false);

}


$('.card-action.more.details').click(function () {
  // body...
  $('.wash-info-more').show();
});

$('.less.details').click(function () {
  $('.wash-info-more').hide();
})






$(document).ready(function () {
    // var googleUser = {};
     var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '539760702142-9qt6sj0m4dinrctmasa3pbcqa2p4sc9j.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        // scope: 'additional_scope'
      });
      attachSignin(document.getElementById('google_sign_in'));
    });
  };

  function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        onSignIn
          
        , function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  window.localStorage.setItem('gid',profile.getId()) 
  window.localStorage.setItem('name',profile.getName());
 window.localStorage.setItem('img',profile.getImageUrl());
 window.localStorage.setItem('email',profile.getEmail());


  var data = {
    gid:profile.getId(),
    name:profile.getName(),
    img:profile.getImageUrl(),
    email:profile.getEmail()
  } 
  location.href='/#/id_num';

  // $.ajax({
  //   method:'POST',
  //   url:baseUrl + '/user/login/',
  //   data:data,
  //   success:function (response) {
  //    if(response.status == 1)
        // location.href='/#/id_num';
  //     else if(response.status == 2)
  //      alert('Use BITS Mail Only')
  //    
  //       location.href='/#/user/'
  //   }
  // })
}
  startApp();
})