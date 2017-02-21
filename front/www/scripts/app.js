'use strict';

angular.module('latchApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
            url: '/',
            views: {
                'content': {
                    templateUrl: 'views/landing.html'
                }
            }

        })

        .state('app.register', {
            url: 'register',
            views: {
                'header@': {
                    templateUrl: 'views/secondary_header.html',
                },
                'content@': {
                    templateUrl: 'views/register.html'
                }
            }

        })

        .state('app.login', {
            url: 'login',
            views: {
                'header@': {
                    templateUrl: 'views/secondary_header.html',
                },
                'content@': {
                    templateUrl: 'views/login.html'
                }
            }

        })



        .state('app.id_num', {
                url: 'id_num',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/id_num.html'
                    }
                }

            })
            .state('app.profile_pic', {
                url: 'profile_pic',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/profile_pic.html'
                    }
                }

            })

        .state('app.profile', {
            url: 'profile',
            views: {
                'header@': {
                    templateUrl: 'views/secondary_header.html',
                },
                'content@': {
                    templateUrl: 'views/profile.html'
                }
            }

        })




        // route for the map page
        .state('app.location', {
            url: 'location',
            views: {
                'header@': {
                    templateUrl: 'views/secondary_header.html',
                },
                'content@': {
                    templateUrl: 'views/location.html'
                }
            }
        })

        // route for the chats page
        .state('app.chats', {
            url: 'chats',
            views: {
                'header@': {
                    templateUrl: 'views/header.html',
                },
                'content@': {
                    templateUrl: 'views/chats.html'
                }
            }
        })


        .state('app.mylawyer', {
                url: 'mylawyer',
                views: {
                    'header@': {
                        templateUrl: 'views/header.html',
                    },
                    'content@': {
                        templateUrl: 'views/mylawyer.html'
                    }
                }
            })
            .state('app.mycases', {
                url: 'mycases',
                views: {
                    'header@': {
                        templateUrl: 'views/header.html',
                    },
                    'content@': {
                        templateUrl: 'views/mycases.html'
                    }
                }
            })
            .state('app.findlawyer', {
                url: 'findlawyer',
                views: {
                    'header@': {
                        templateUrl: 'views/header.html',
                    },
                    'content@': {
                        templateUrl: 'views/findlawyer.html'
                    }
                }
            })
            .state('app.search_results', {
                url: 'search_results',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/search_results.html'
                    }
                }
            }).state('app.add_case', {
                url: 'add_case',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/add_case.html'
                    }
                }
            })
            .state('app.view_case', {
                url: 'view_case',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/view_case.html'
                    }
                }
            })



    
        .state('app.message', {
            url: 'message',
            views: {
                'header@': {
                    templateUrl: 'views/secondary_header.html',
                },
                'content@': {
                    templateUrl: 'views/messages.html'
                }
            }
        })



        .state('app.settings', {
            url: 'settings',
            views: {
                'header@': {
                    templateUrl: 'views/secondary_header.html',
                },
                'content@': {
                    templateUrl: 'views/settings.html'
                }
            }
        })

        .state('app.edit_profile', {
            url: 'edit_profile',
            views: {
                'header@': {
                    templateUrl: 'views/secondary_header.html',
                },
                'content@': {
                    templateUrl: 'views/edit_profile.html'
                }
            }
        })

        .state('app.change_password', {
            url: 'change_password',
            views: {
                'header@': {
                    templateUrl: 'views/secondary_header.html',
                },
                'content@': {
                    templateUrl: 'views/change_password.html'
                }
            }
        })

        .state('app.logout', {
            url: '/',
            views: {
                'content@': {
                    templateUrl: 'views/landing.html'
                }
            }
        })


        .state('app.laundro_login', {
                url: 'laundro_login',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/laundro_login.html'
                    }
                }

            })
            .state('app.lawyer_home', {
                url: 'lawyer_home',
                views: {
                    'header@': {
                        templateUrl: 'views/main_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/lawyer_home.html'
                    }
                }

            })
            .state('app.lawyer_clients', {
                url: 'lawyer_clients',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/lawyer_clients.html'
                    }
                }

            }).state('app.lawyer_upcoming', {
                url: 'lawyer_upcoming',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/lawyer_upcoming.html'
                    }
                }

            })
            .state('app.lawyer_casespool', {
                url: 'lawyer_casespool',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/lawyer_casespool.html'
                    }
                }

            })
            .state('app.lawyer_mycases', {
                url: 'lawyer_mycases',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/lawyer_mycases.html'
                    }
                }

            })
            .state('app.lawyer_viewcase', {
                url: 'lawyer_viewcase',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/lawyer_viewcase.html'
                    }
                }

            })
            .state('app.user', {
                              url: 'user',
                              views: {
                                  'header@': {
                                      templateUrl: 'views/main_header.html',
                                  },
                                  'content@': {
                                      templateUrl: 'views/user.html'
                                  }
                              }

                          })
                          .state('app.user_status', {
                              url: 'user_status',
                              views: {
                                  'header@': {
                                      templateUrl: 'views/secondary_header.html',
                                  },
                                  'content@': {
                                      templateUrl: 'views/user_status.html'
                                  }
                              }

                          })

            .state('app.laundro_home', {
                url: 'laundro_home',
                views: {
                    'header@': {
                        templateUrl: 'views/main_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/laundro_home.html'
                    }
                }

            })
            .state('app.view_status', {
                url: 'view_status',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/view_status.html'
                    }
                }

            })
            .state('app.hostel_info', {
                url: 'hostel_info',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/hostel_info.html'
                    }
                }

            }) .state('app.student_info', {
                url: 'student_info',
                views: {
                    'header@': {
                        templateUrl: 'views/secondary_header.html',
                    },
                    'content@': {
                        templateUrl: 'views/student_info.html'
                    }
                }

            })



        // route for the test page


        ;

        // route to redirect to home in case URL not defined
        $urlRouterProvider.otherwise('/');

    })

.directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
})

.run(function($rootScope, $state, $location) {

    var history = [];

    $rootScope.$on('$locationChangeStart', function() {
        history.push($location.$$path);
        //        console.log(history);
    });

    $rootScope.back = function() {
        var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
        //        console.log(prevUrl);
        $location.path(prevUrl);
    };

    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    //     // event.preventDefault();
    //     // console.log(event);
    //     event.defaultPrevented = true;
    //     var loggedIn = window.localStorage.getItem('loggedIn');
    //     if  ((toState.name !== 'app' && toState.name !== 'app.register' && toState.name !== 'app.login'  && toState.name !== 'app.nick'  && toState.name !== 'app.profile_pic')   && !loggedIn){
    //         $state.go('app');
    //     }
    //     else{
    //         event.defaultPrevented = false;
    //         if  ($location.url() == '/' && loggedIn){
    //             $location.url('/chats')
    //         }
    //     }  lau


    // });

});
