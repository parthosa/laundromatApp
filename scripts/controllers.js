'use strict';
var caseDoc ;
var globalVar;

var baseUrl = 'http://139.59.23.184:8001';
var socket = io.connect('139.59.23.184', {
  port: 4000
});
var API_KEY = 'AIzaSyDOCdq5yBdwwuE6A5H4RLxWe_34fEY6WDk';
//var socket = io();
var map;

angular.module('latchApp')

.controller('MainController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {


  $rootScope.cases = [
    {
      title:'Jaipur Land Issue',
      date:'23/01/2013'
    },
     {
      title:'Bhiwani Accident',
      date:'18/02/2011'
    }
  ]



  $rootScope.isActive = function (arg) {
    if ($state.current.url == arg) {
      return true;
    } else
      return false;
  }

  $rootScope.baseUrl = baseUrl;
  $rootScope.chats;
  $rootScope.groups;
  $rootScope.user = {};
  $rootScope.user.pic = 'images/johndoe.png'
  $rootScope.user.nick = 'John Doe'
  // $rootScope.user.pic = window.localStorage.getItem('pic');
  // $rootScope.user.nick = window.localStorage.getItem('nick');


   

  $rootScope.sendCurrLocNoMap = function () {
    var pos;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        var data = {
          lat: pos.lat,
          longitude: pos.lng,
          session_key: window.localStorage.getItem('session_key')

        }
        $.ajax({
          method: 'POST',
          url: baseUrl + '/main/user/location/',
          data: data,
          success: function (response) {
            if (response.status == 1)
              return pos;
            else
              Materialize.toast('Please Enable Location Services')
          }
        })
      }, function () {
        Materialize.toast('Please enable loaction services', 3000);
      }, {
        timeout: 2000
      });
    }
  };

  $(".button-collapse").sideNav();

  $rootScope.search = {
    visible: false,
    query: '',
    toggle: function () {
      $rootScope.search.visible = true;
      setTimeout(function () {
        $('#search')[0].focus();
      }, 300);
    },
    close: function () {
      $rootScope.search.visible = false;
      $rootScope.search.query = '';
    }
  };

  $scope.logout = function () {
    window.localStorage.clear();
  }

  //
  //  $scope.anonymousTrigger = function(){
  //    $.ajax({
  //      method:'POST',
  //      url:baseUrl + '/main/user/anonymous/',
  //      data:{
  //        session_key:window.localStorage.getItem('session_key')
  //      },
  //      success:function(response){
  //        Materialize.toast(response.message,1000);
  //        if(response.status==1)
  //            console.log('Yo')
  //           // update nicks
  //      },
  //      error:function(response){
  //        Materialize.toast(response.message,1000);
  //
  //      }
  //    })
  //  }
  //

  //  $scope.anonymousTrigger = function(){
  //    $.ajax({
  //      method:'POST',
  //      url:baseUrl + '/main/user/anonymous/',
  //      data:{
  //        session_key:window.localStorage.getItem('session_key')
  //      },
  //      success:function(response){
  //        Materialize.toast(response.message,1000);
  //        // if(response.status==1)
  //           // update nicks
  //      },
  //      error:function(response){
  //        Materialize.toast(response.message,1000);
  //
  //      }
  //    })
  //  }
  //
  //
  //  


}])


.controller('LandingController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {

  $scope.redirect = function (type) {
    if(type == 'client') 
      $state.go('app.login')
    else  if(type == 'lawyer') 
       $state.go('app.lawyer_login')
  }

}]).controller('RegisterController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {

  $rootScope.title = 'Register';
  //    $rootScope.back = function() {
  //        $state.go('app');
  //    }

  $scope.user = {};


  $scope.submit = function () {
    // $location.path('/chats');
     $state.go('app.findlawyer');

    // $.ajax({
    //   method: 'POST',
    //   url: baseUrl + '/main/accounts/register/',
    //   data: $scope.user,
    //   type: 'jsonp',
    //   success: function (response) {
    //     if (response.status == 1) {
    //       $state.go('app.profile_pic');
    //       window.localStorage.setItem('session_key', response.session_key);
    //       window.localStorage.setItem('loggedIn', true);
    //       window.localStorage.setItem('name', $scope.user.name);
    //       window.localStorage.setItem('contact', $scope.user.contact);

    //     }

    //     Materialize.toast(response.message, 1000)

    //   },
    //   error: function (response) {}
    // })
  }
}])

.controller('LoginController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {
  $rootScope.title = 'Login';

  $scope.user = {};


  $scope.submit = function () {

       $state.go('app.findlawyer');

    // $.ajax({
    //   method: 'POST',
    //   url: baseUrl + '/main/accounts/login/',
    //   data: $scope.user,
    //   type: 'jsonp',
    //   success: function (response) {
    //     if (response.status == 1) {
    //       $state.go('app.profile_pic');
    //       window.localStorage.setItem('session_key', response.session_key);
    //       window.localStorage.setItem('loggedIn', true);
    //       window.localStorage.setItem('name', $scope.user.name);
    //       window.localStorage.setItem('contact', $scope.user.contact);

    //     }

    //     Materialize.toast(response.message, 1000)

    //   },
    //   error: function (response) {}
    // })

   
  }

}])
.controller('LawyerLoginController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {
  $rootScope.title = 'Lawyer Login';

  $scope.user = {};


  $scope.submit = function () {

       $state.go('app.lawyer_home');
   // $.ajax({
    //   method: 'POST',
    //   url: baseUrl + '/main/accounts/lawyer_login/',
    //   data: $scope.user,
    //   type: 'jsonp',
    //   success: function (response) {
    //     if (response.status == 1) {
    //       $state.go('app.profile_pic');
    //       window.localStorage.setItem('session_key', response.session_key);
    //       window.localStorage.setItem('loggedIn', true);
    //       window.localStorage.setItem('name', $scope.user.name);
    //       window.localStorage.setItem('contact', $scope.user.contact);

    //     }

    //     Materialize.toast(response.message, 1000)

    //   },
    //   error: function (response) {}
    // })
       
   
  }

}])

.controller('LawyerHomeController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {

  $rootScope.title = 'Simply Legal';
  
  

}]).controller('LawyerUpcomingController', ['$rootScope', '$scope', '$state', '$location','chatData', function ($rootScope, $scope, $state, $location,chatData) {

  $rootScope.title = 'Upcoming Cases';

   $scope.cases = [
    {
      name:'Jaipur Accident',
      status:'Ongoing',
      client:'John Doe'
    },
     {
      name:'Bhiwani Land Tax',
      status:'Ongoing',
      client:'Mark Louis'
    },
     {
      name:'Bhiwani Accident',
      status:'Declared',
      client:'Jim Carry'
    }
   ]

   
     $scope.redirect = function (el) {
    $rootScope.title = el.case.name;
    $state.go('app.lawyer_viewcase');
  }

}]).controller('LawyerCasesPoolController', ['$rootScope', '$scope', '$state', '$location','chatData', function ($rootScope, $scope, $state, $location,chatData) {

  $rootScope.title = 'Cases Pool';

   $scope.cases = [
    {
      name:'Jaipur Accident',
      date:'23/01/2016',
      client:'John Doe'
    },
     {
      name:'Bhiwani Land Tax',
      date:'23/01/2016',
      client:'Mark Louis'
    },
     {
      name:'Bhiwani Accident',
      date:'23/01/2016',
      client:'Jim Carry'
    },{
      name:'Jaipur Accident',
      date:'23/01/2016',
      client:'John Doe'
    },
     {
      name:'Bhiwani Land Tax',
      date:'23/01/2016',
      client:'Mark Louis'
    },
     {
      name:'Bhiwani Accident',
      date:'23/01/2016',
      client:'Jim Carry'
    },
   ]


     $scope.redirect = function (el) {
    $rootScope.title = el.case.name;
    $state.go('app.lawyer_viewcase');
  }

}]).controller('LawyerMyCasesController', ['$rootScope', '$scope', '$state', '$location','chatData', function ($rootScope, $scope, $state, $location,chatData) {

   $rootScope.title = 'My Cases';

    $scope.cases = [
    {
      name:'Jaipur Accident',
      date:'23/01/2016',
      client:'John Doe'
    },
     {
      name:'Bhiwani Land Tax',
      date:'23/01/2016',
      client:'Mark Louis'
    },
     {
      name:'Bhiwani Accident',
      date:'23/01/2016',
      client:'Jim Carry'
    }
   ]


     $scope.redirect = function (el) {
    $rootScope.title = el.case.name;
    $state.go('app.lawyer_viewcase');
  }


}]).controller('LawyerClientsController', ['$rootScope', '$scope', '$state', '$location','chatData', function ($rootScope, $scope, $state, $location,chatData) {

  $rootScope.title = 'Clients';

  $scope.clients = [
    {
      name:'John Doe',
      pic:'images/johndoe.png',
      location:'Jaipur'
    },
     {
      name:'Mark Louis',
      pic:'images/batman.png',
      location:'Delhi'
    }
  ]




  $scope.redirect = function (el) {
    chatData.chatId = el.client.name;
    // chatData.chatUrl = '/users';
    $rootScope.title = el.client.name;
    $state.go('app.message');
    // $rootScope.chatPic = el.chat.pic;
  }


}]).controller('NickController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {
  $rootScope.title = 'Nick';

  $rootScope.sendCurrLocNoMap();
  $scope.user = {};
  // $scope.user.nick = 'parthosa';

  $scope.submit = function () {

    var data = {
      nick: $scope.user.nick,
      session_key: window.localStorage.getItem('session_key')
    }
    $.ajax({
      method: 'POST',
      url: baseUrl + '/main/user/nick/',
      data: data,
      success: function (response) {
        if (response.status == 1) {
          window.localStorage.setItem('nick', data.nick);

          $state.go('app.interests');
        }
        Materialize.toast(response.message, 1000)

      },
      error: function (response) {}
    })
  }

}])


.controller('LocationController', ['$rootScope', '$scope', '$state', '$location', 'chatData', function ($rootScope, $scope, $state, $location, chatData) {
    $rootScope.title = 'Find A Lawyer';


  var data = [];



  $scope.sendLoc;
  $scope.locModal;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 20.8912676,
        lng: 73.7361989
      },
      zoom: 5,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });

    var pos;

    $rootScope.getCurrLoc = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };


          var data = {
            lat: pos.lat,
            longitude: pos.lng,
            session_key: window.localStorage.getItem('session_key')

          }
          $.ajax({
            method: 'POST',
            url: baseUrl + '/main/user/location/',
            data: data,
            success: function (response) {
              if (response.status != 1)
                Materialize.toast('Please Enable Location Services')
            }
          })



          var marker = new google.maps.Marker({
            position: pos
          });
          map.setCenter(pos);
          marker.setMap(map);
          map.setZoom(13);
        }, function () {
          Materialize.toast('Please enable loaction services', 3000);
        }, {
          timeout: 2000
        });
      } else {
        Materialize.toast('Please enable loaction services', 3000);
      }
    }

    var markers = [];

    $rootScope.CustomMarker = function (latlng, map, imageSrc, nick, distance) {
      this.nick = nick;
      this.distance = distance;
      this.latlng_ = latlng;
      this.imageSrc = imageSrc;
      this.setMap(map);
      markers.push(this);
    }

    $rootScope.CustomMarker.prototype = new google.maps.OverlayView();

    $rootScope.CustomMarker.prototype.draw = function () {
      // Check if the div has been created.
      var div = this.div_;
      if (!div) {
        // Create a overlay text DIV
        div = this.div_ = document.createElement('div');
        // Create the DIV representing our $rootScope.CustomMarker
        div.className = "customMarker"

        var me = this;
        var img = document.createElement("img");
        img.src = this.imageSrc;
        div.appendChild(img);
        google.maps.event.addDomListener(div, "click", function (event) {
          google.maps.event.trigger(me, "click");
          $('.modal').modal();
          $scope.locModal = {
            lat: me.latlng_.lat(),
            lng: me.latlng_.lng(),
            nick: me.nick,
            pic: me.imageSrc,
            distance: me.distance
          }
          $scope.$apply();
          $('.modal').modal('open');
        });

        // Then add the overlay to the DOM
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
      }

      // Position the overlay 
      var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
      if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
      }
    };

    $rootScope.CustomMarker.prototype.remove = function () {
      // Check if the overlay was on the map and needs to be removed.
      if (this.div_) {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
      }
    };

    $rootScope.CustomMarker.prototype.getPosition = function () {
      return this.latlng_;
    };

    // var data = [{
    //   profileImage: 'https://avatars3.githubusercontent.com/u/10223953',
    //   pos: [28.365, 75.57],
    //   distance: 5,
    //   nick: 'bug'
    // },{
    //   profileImage: 'https://avatars3.githubusercontent.com/u/10223953',
    //   pos: [28.37, 75.58],
    //   distance: 5,
    //   nick: 'bug'
    // },{
    //   profileImage: 'https://avatars3.githubusercontent.com/u/10223953',
    //   pos: [28.36, 75.58],
    //   distance: 5,
    //   nick: 'bug'
    // },{
    //   profileImage: 'https://avatars3.githubusercontent.com/u/10223953',
    //   pos: [28.39, 75.58],
    //   distance: 5,
    //   nick: 'bug'
    // }]


    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

    $rootScope.getCurrLoc();


  }

  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


  initMap();


  $.ajax({
    method: 'POST',
    url: baseUrl + '/main/user/get_nearby/',
    data: {
      'session_key': window.localStorage.getItem('session_key')
    },
    success: function (response) {
      if (response.status == 1) {
        data = response.nearby_users;
        for (var i = 0; i < data.length; i++) {
          if (data[i].nick != window.localStorage.getItem('nick'))
            new $rootScope.CustomMarker(new google.maps.LatLng(data[i].lat, data[i].longitude), map, baseUrl + data[i].pic, data[i].nick, data[i].distance)
        }

      } else
        Materialize.toast('Cannot Fetch Nearby Users', 1000)
    },
    error: function () {
      Materialize.toast('Cannot Fetch Nearby Users', 1000)

    }
  })



  $scope.redirect = function (el) {
    chatData.chatId = el.locModal.nick;
    chatData.chatUrl = '/users';
    $('#modal').modal('close');
    $state.go('app.message');
    $rootScope.title = el.locModal.nick;
    $rootScope.chatPic = el.locModal.pic;
  }

}])


.controller('ChatController', ['$rootScope', '$scope', '$state', '$location', 'chatData', function ($rootScope, $scope, $state, $location, chatData) {
  $rootScope.title = 'Find A Lawyer';
  $rootScope.chats = [
    {
      pic:'images/johndoe.png',
      'nick':'John Doe'
    },
    {
      pic:'images/ninja.png',
      'nick':'Ninja'
    }
  ]

  if (window.localStorage.getItem('name') == "undefined") {

    $.ajax({
      method: 'POST',
      url: baseUrl + '/main/user/profile/',
      data: {
        'session_key': window.localStorage.getItem('session_key')
      },
      success: function (response) {
        if (response.status == 1) {
          window.localStorage.setItem('pic', response.pic);
          window.localStorage.setItem('nick', response.nick);
          window.localStorage.setItem('name', response.name);
          window.localStorage.setItem('contact', response.contact);
          $rootScope.user.nick = response.nick;
          $rootScope.user.pic = response.pic;
          $rootScope.user.name = response.name;
          $rootScope.user.contact = response.contact;
          $rootScope.$apply();
        } else {
          Materialize.toast('Cannot load profile', 1000);

        }
      },
      error: function (response) {
        Materialize.toast('Cannot load profile', 1000);

      }
    })

  }


  $.ajax({
    method: 'POST',
    url: baseUrl + '/main/user/get_chat_list/',
    data: {
      session_key: window.localStorage.getItem('session_key')
    },
    success: function (response) {
      $rootScope.chats = response.peers;
      $scope.$apply();
    },
    error: function (response) {
      Materialize.toast('Could Not Fetch Chat List', 1000);
    }
  })

  $scope.redirect = function (el) {
    chatData.chatId = el.chat.nick;
    chatData.chatUrl = '/users';
    $state.go('app.message');
    $rootScope.title = el.chat.nick;
    $rootScope.chatPic = el.chat.pic;
  }

}])




.controller('ProfileController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {

  $rootScope.title = 'Profile';

  $.ajax({
    method: 'POST',
    url: baseUrl + '/main/user/profile/',
    data: {
      'session_key': window.localStorage.getItem('session_key')
    },
    success: function (response) {
      if (response.status == 1) {
        window.localStorage.setItem('pic', response.pic);
        window.localStorage.setItem('nick', response.nick);
        window.localStorage.setItem('name', response.name);
        window.localStorage.setItem('contact', response.contact);
        $rootScope.user.nick = response.nick;
        $rootScope.user.pic = response.pic;
        $rootScope.user.name = response.name;
        $rootScope.user.contact = response.contact;
        $rootScope.$apply();
      } else {
        Materialize.toast('Cannot load profile', 1000);

      }
    },
    error: function (response) {
      Materialize.toast('Cannot load profile', 1000);

    }
  })


}])

.controller('SettingsController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {

  $rootScope.title = 'Settings';



}])

.controller('MessageController', ['$rootScope', '$scope', '$state', 'chatData', '$location', function ($rootScope, $scope, $state, chatData, $location) {
  // $rootScope.title='John Doe';
  $scope.messages;
  if ($scope.messages == null)
    $scope.messages = [];


  $scope.user = {};
  $scope.user.nick = window.localStorage.getItem('nick');
  var chatScreen = document.getElementsByClassName('chat-screen')[0];

  $.ajax({
    method: 'POST',
    url: baseUrl + '/main/user/get/indi_chat/',
    data: {
      'nick': chatData.chatId,
      'session_key': window.localStorage.getItem('session_key')

    },
    success: function (response) {
      for (var i = 0; i < response.messages.length; i++) {
        response.messages[i].nick = response.messages[i].nick_name;
      }
      $scope.messages = response.messages;
      $scope.$apply();
      chatScreen.scrollTop = $('.message-wrapper').outerHeight() * response.messages.length
    },
    error: function (response) {
      Materialize.toast('Could Not Fetch Messages', 1000)
    }
  })


  $scope.newMessageText = '';
  var newMessage;
  $scope.send = function () {
    if ($scope.newMessageText != '') {

      var date = new Date();
      date = date.toLocaleDateString() + ',' + date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
        minute: 'numeric'
      })

      newMessage = {
        message: $scope.newMessageText,
        nick: window.localStorage.getItem('nick'),
        nick_name: chatData.chatId,
        time: date,
        sent: false,
        msg_id: uuid.v4(),
        session_key: window.localStorage.getItem('session_key')
      }


      $scope.messages.push(newMessage);
      setTimeout(function () {
        chatScreen.scrollTop += $('.message-wrapper').outerHeight();
      }, 100)

      // var scrollTop = $('.chat-screen').scrollTop() + $($('.message-wrapper')[0]).outerHeight()
      // $('.chat-screen').scrollTop(scrollTop)
      $scope.newMessageText = '';


      socket.emit('send_message_indi', newMessage);


    }
  }


  socket.on('send_message_indi', function (data) {
    if (chatData.chatId == data.nick) {
      console.log(1);
      $scope.messages.push(data);
      $scope.$apply();
      chatScreen.scrollTop += $('.message-wrapper').outerHeight();
    } else if ($scope.user.nick == data.nick) {
      for (var i = $scope.messages.length - 1; i >= 0; i--) {
        if ($scope.messages[i].msg_id == data.msg_id) {
          $scope.messages[i].sent = true;
          $scope.$apply();
          break;
        }
      }



    } else {
      console.log(3);
      Materialize.toast('New Message from ' + data.nick, 1000);
    }



  });

}])


.controller('SidebarController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {

}]) .controller('FindLawyerController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {

  $rootScope.title="Simply Legal";
    
    $scope.caseType;
    $scope.lawyerExperience;

    var options = ' <option value="" disabled selected>Choose your option</option>';

    $.each($rootScope.cases,function (i,ev) {
      options += '<option value="'+i+'">'+ev['title']+'</option>';
    });

    $('#case-select').html(options);
    $('select').material_select();

    $scope.search = function () {
        
        console.log(1);
         $state.go('app.search_results');
        var data = {
          'case-type':$scope.caseType,
          'lawyer-experience':$scope.lawyerExperience,
        }
        $.ajax({
          method:'POST',
          url:baseUrl+'/findlawyer/',
          data:data,
          success:function (response) {
            $state.go('app.search_results');
            $rootScope.lawyerResults = response.results;
          },
          error:function () {
            Materialize.toast('Try Again',1000);
          }
        })

    }
    
}]) .controller('MyCasesController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {

$rootScope.title="Simply Legal";
  

  $scope.redirect = function (el) {
    $rootScope.title = el.case.title;
    $state.go('app.view_case');
  }


}]) .controller('SearchController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
   $rootScope.title = 'Search Results';
   $scope.lawyers = [
    {
      name:'Ram Jethmalani',
      exp:'5yrs',
      type:'Civil'
    },
     {
      name:'KK Venugopal',
      exp:'5yrs',
      type:'Civil'
    }
   ]


}]) .controller('ViewCaseController', ['$rootScope', '$scope', '$state','chatData', function ($rootScope, $scope, $state,chatData) {

}]) .controller('AddCaseController', ['$rootScope', '$scope', '$state','chatData', function ($rootScope, $scope, $state,chatData) {
  $rootScope.title = 'New Case';
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  $scope.case = {};

  $scope.addCase = function () {
    var files = document.querySelector('#case-docs').files;
     var formData = new FormData();
     for(key in $scope.case){
      formData.append(key,$scope.case[key]);
     }
     formData.append('files',files);
     $.ajax({
        method:'POST',
          url:baseUrl+'/add_case/',
          data:formData,
          contentType: false,
          processData: false,
          success:function (response) {
            Materialize.toast(response.message,1000);
          },
          error:function (response) {
            response=response.responseJSON;
            Materialize.toast(response.message,1000);
          }
        })
  }

}]) .controller('MyLawyerController', ['$rootScope', '$scope', '$state','chatData', function ($rootScope, $scope, $state,chatData) {
  $rootScope.title="Simply Legal";
   $('.collapsible').collapsible();
   $scope.lawyers = [
    {
      name:'Ram Jethmalani',
      active:'Active',
      type:'Civil'
    },
     {
      name:'KK Venugopal',
      active:'Inactive',
      type:'Civil'
    },
     {
      name:'Gopal Subramanium',
      active:'Active',
      type:'Criminal'
    }
   ]



  $scope.redirect = function (el) {
    chatData.chatId = el.lawyer.name;
    // chatData.chatUrl = '/users';
    $rootScope.title = el.lawyer.name;
    $state.go('app.message');
    console.log(el.lawyer.name)
    // $rootScope.chatPic = el.chat.pic;
  }

 // $rootScope.title = 'Edit Profile';
}]) .controller('EditProfileController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
              $rootScope.title = 'Edit Profile';

              $scope.name = window.localStorage.getItem('name');
              $scope.contact = window.localStorage.getItem('contact');
              $scope.nick = window.localStorage.getItem('nick');

              $scope.submit = function () { 
                var file  = document.querySelector('input#edit-profile-pic-upload').files[0];
                var session_key = window.localStorage.getItem('session_key')
                var formData = new FormData();
                formData.append('session_key', session_key);
                formData.append('name', $scope.name);
                formData.append('contact', $scope.contact);
                formData.append('nick', $scope.nick);
                  formData.append('session_key', session_key);
                var data = {
                  session_key: session_key,
                  name: $scope.name,
                  contact: $scope.contact,
                  nick: $scope.nick,
                  pic: dataURL
                }
                $.ajax({
                  method: 'POST',
                  url: baseUrl + '/main/user/edit_profile/',
                  data: data,
                  success: function (response) {
                    Materialize.toast(response.message, 1000);
                    if (response.status == 1) {
                      window.localStorage.setItem('pic', response.pic);
                      window.localStorage.setItem('nick', response.nick);
                      window.localStorage.setItem('name', response.name);
                      window.localStorage.setItem('contact', response.contact);
                      $rootScope.user.nick = response.nick;
                      $rootScope.user.pic = response.pic;
                      $rootScope.user.name = response.name;
                      $rootScope.user.contact = response.contact;
                      $rootScope.$apply();
                      $state.go('app.chats');
                    }
                  },
                  error: function (response) {
                    Materialize.toast('Try Again', 1000);

                  }
                })
              }
}]) .controller('PasswordController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
              $rootScope.title = 'Change Password';
              $scope.old_password;
              $scope.new_password;
              $scope.new_password_confirm;

              $scope.submit = function () {
                var data = {};
                data['old_password'] = $scope.old_password;
                data['new_password'] = $scope.new_password;
                data['new_password_confirm'] = $scope.new_password_confirm;
                data['session_key'] = window.localStorage.getItem('session_key')
                $.ajax({
                  method: 'POST',
                  url: baseUrl + '/main/user/password/change/',
                  data: data,
                  success: function (response) {
                    if (response.status == 1) {
                      Materialize.toast(response.message, 1000);
                      $state.go('app.chats')
                    } else
                      Materialize.toast(response.message, 1000);
                  },
                  error: function (response) {
                    Materialize.toast('Try Again', 1000);
                  }
                })
              }
  }]).controller('ProfilePicController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {

                $rootScope.title = 'Upload Profile Picture';
                //  $scope.profilePic;

                $rootScope.sendCurrLocNoMap();


                $scope.submit = function () { 
                  //    var file  = dataURL;
                  var session_key = window.localStorage.getItem('session_key')
                    //    var formData = new FormData();
                    //    formData.append('session_key', session_key);
                    //    formData.append('dpic', file);
                    //    console.log(formData.getAll('dpic'))
                  console.log(dataURL);

                  var data = {
                    session_key: session_key,
                    dpic: dataURL
                  }
                  if (dataURL != undefined) {
                      $.ajax({
                        method: 'POST',
                        url: baseUrl + '/main/user/profile_pic/',
                        data: data,
                        success: function (response) {
                          Materialize.toast(response.message, 1000);
                          if (response.status == 1) {
                            $state.go('app.nick');
                            window.localStorage.setItem('pic', file);
                          }
                        },
                        error: function (response) {
                          Materialize.toast('Try Again', 1000);

                        }
                      })
                    } else Materialize.toast('Please upload a image', 1000);
                  }

    }]);