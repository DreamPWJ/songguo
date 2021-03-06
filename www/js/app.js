// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.config', 'starter.directive', 'starter.filter', 'ngCordova', 'ionic-native-transitions'])

  .run(function ($ionicPlatform, $rootScope, $location, $ionicHistory, $cordovaToast, $cordovaNetwork, CommonService) {
    $ionicPlatform.ready(function () {

      if (window.StatusBar) {
        //状态栏颜色设置
        // org.apache.cordova.statusbar required
        if ($ionicPlatform.is('ios')) {
          StatusBar.styleLightContent();
          $rootScope.isPlatform = "ios";
        }
        if ($ionicPlatform.is('android')) {
          StatusBar.backgroundColorByHexString("#1983D1");
          $rootScope.isPlatform = "android";
        }

      }

      //hide splash immediately 加载完成立刻隐藏启动画面
      if (navigator && navigator.splashscreen) {
        setTimeout(function () { //延迟显示 让页面先加载 不显示不美观的加载过程
          navigator.splashscreen.hide();
        }, 500);

      }

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      //主页面显示退出提示
      $ionicPlatform.registerBackButtonAction(function (e) {
        e.preventDefault();
        // Is there a page to go back to? 制定页面返回退出程序
        if ($location.path() == '/tab/main') {
          if ($rootScope.backButtonPressedOnceToExit) {
            ionic.Platform.exitApp();
          } else {
            $rootScope.backButtonPressedOnceToExit = true;
            $cordovaToast.showShortCenter('再按返回退出松果微图');
            setTimeout(function () {
              $rootScope.backButtonPressedOnceToExit = false;
            }, 2000);
          }

        } else if ($ionicHistory.backView()) {
          // Go back in history
          $ionicHistory.goBack();
        } else {
        }

        return false;
      }, 101);

      //判断网络状态以及横屏事件
      document.addEventListener("deviceready", function () {
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
          var onlineState = networkState;
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
          var offlineState = networkState;
          //提醒用户的网络异常
          CommonService.platformPrompt("网络异常 无法连接服务器", 'close');
        })
        //添加JS 屏幕监听事件 禁止APP 横屏
        if (screenOrientation) {
          screenOrientation.setOrientation('portrait');
        }

      }, false);

      //打开外部网页
      if (window.cordova && window.cordova.InAppBrowser) {
        window.open = window.cordova.InAppBrowser.open;
      }

      //启动极光推送服务
      /*    try {
       window.plugins.jPushPlugin.init();
       } catch (e) {
       console.log(e);
       }
       // System events
       document.addEventListener("resume", resume, false);
       function resume() {
       if (window.plugins.jPushPlugin.isPlatformIOS()) {
       window.plugins.jPushPlugin.setBadge(0);
       window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
       } else if (device.platform == "Android") {
       window.plugins.jPushPlugin.setLatestNotificationNum(3);
       window.plugins.jPushPlugin.clearAllNotification();
       }
       }
       //点击极光推送跳转到相应页面
       document.addEventListener("jpush.openNotification", function (data) {

       }, false)*/

      //调试模式，这样报错会在应用中弹出一个遮罩层显示错误信息
      //window.plugins.jPushPlugin.setDebugMode(true);

    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider,$ionicNativeTransitionsProvider) {
    /* 设置平台特性*/
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    /*    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
     $ionicConfigProvider.platform.android.navBar.alignTitle('center');*/

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-left');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    //设置默认返回按钮的文字
    $ionicConfigProvider.backButton.previousTitleText(false).text('');

    //ion-content to have overflow-scroll='false'
    $ionicConfigProvider.scrolling.jsScrolling(false);
    //Checkbox style. Android defaults to square and iOS defaults to circle
    $ionicConfigProvider.form.checkbox('circle');
    //Toggle item style. Android defaults to small and iOS defaults to large.
    $ionicConfigProvider.form.toggle('large');
    //原生动画效果统一配置
      $ionicNativeTransitionsProvider.setDefaultOptions({
     duration: 200, // in milliseconds (ms), default 400,
     slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
     iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
     androiddelay: -1, // same as above but for Android, default -1
     winphonedelay: -1, // same as above but for Windows Phone, default -1,
     fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
     fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
     triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
     backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
     });
     $ionicNativeTransitionsProvider.setDefaultTransition({
     type: 'slide',
     direction: 'left'
     });
     $ionicNativeTransitionsProvider.setDefaultBackTransition({
     type: 'slide',
     direction: 'right'
     });

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('wxtab', { //微信tabs
        url: '/wxtab',
        abstract: true,
        templateUrl: 'templates/weixin/wxtabs.html'
      })

      .state('alitabs', { //支付宝tabs
        url: '/alitabs',
        abstract: true,
        templateUrl: 'templates/alipay/alitabs.html'
      })
      // Each tab has its own nav history stack:

      //APP首页面
      .state('tab.main', {
        url: '/main',
        nativeTransitions: null,
        views: {
          'tab-main': {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl'
          }
        }
      })

      //我的账号
      .state('tab.account', {
        url: '/account',
        cache: false,
        nativeTransitions: null,
        views: {
          'tab-account': {
            templateUrl: 'templates/account.html',
            controller: 'AccountCtrl'
          }
        }
      })

      //登录页面
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })

      //加好友专区
      .state('addbuddy', {
        url: '/addbuddy',
        templateUrl: 'templates/addbuddy.html',
        controller: 'AddBuddyCtrl'
      })

      //-------------------------------------微信路由开始-----------------------------------------
      //APP微信首页面
      .state('wxtab.weixin', {
        url: '/weixin',
        nativeTransitions: null,
        views: {
          'tab-weixin': {
            templateUrl: 'templates/weixin/weixin.html',
            controller: 'WeiXinCtrl'
          }
        }
      })

      //APP微信通讯录主页面
      .state('wxtab.addressbook', {
        url: '/addressbook',
        nativeTransitions: null,
        views: {
          'tab-addressbook': {
            templateUrl: 'templates/weixin/addressbook.html',
            controller: 'AddressBookCtrl'
          }
        }
      })

      //APP微信发现主页面
      .state('wxtab.find', {
        url: '/find',
        nativeTransitions: null,
        views: {
          'tab-find': {
            templateUrl: 'templates/weixin/find.html',
            controller: 'FindCtrl'
          }
        }
      })

      //APP微信我的主页面
      .state('wxtab.account', {
        url: '/account',
        nativeTransitions: null,
        views: {
          'tab-account': {
            templateUrl: 'templates/weixin/account.html',
            controller: 'WXAccountCtrl'
          }
        }
      })
      //APP微信聊天界面
      .state('chatdetails', {
        url: '/chatdetails',
        templateUrl: 'templates/weixin/chat/chatdetails.html',
        controller: 'ChatDetailsCtrl'
      })


      //APP微信聊天属性设置
      .state('chatsetting', {
        url: '/chatsetting',
        templateUrl: 'templates/weixin/chat/chatsetting.html',
        controller: 'ChatSettingCtrl'
      })

      //APP微信钱包
      .state('wallet', {
        url: '/wallet',
        templateUrl: 'templates/weixin/account/wallet.html',
        controller: 'WalletCtrl'
      })

      //APP微信个人信息
      .state('personalinfo', {
        url: '/personalinfo',
        templateUrl: 'templates/weixin/account/personalinfo.html',
        controller: 'PersonalInfoCtrl'
      })

      //APP微信添加聊天对象
      .state('addchat', {
        url: '/addchat',
        templateUrl: 'templates/weixin/addchat.html',
        controller: 'AddChatCtrl'
      })

      //APP微信新的朋友
      .state('addfriend', {
        url: '/addfriend',
        templateUrl: 'templates/weixin/addfriend/addfriend.html',
        controller: 'AddFriendCtrl'
      })
      //APP微信零钱
      .state('loosechange', {
        url: '/loosechange',
        templateUrl: 'templates/weixin/account/loosechange.html',
        controller: 'LooseChangeCtrl'
      })

      //APP微信充值
      .state('recharge', {
        url: '/recharge',
        templateUrl: 'templates/weixin/account/recharge.html',
        controller: 'RechargeCtrl'
      })

      //APP微信提现
      .state('withdraw', {
        url: '/withdraw',
        templateUrl: 'templates/weixin/account/withdraw.html',
        controller: 'WithdrawCtrl'
      })

      //APP微信选择银行卡
      .state('bankcard', {
        url: '/bankcard',
        templateUrl: 'templates/weixin/account/bankcard.html',
        controller: 'BankCardCtrl'
      })

      //APP微信支付列表
      .state('wxpaylist', {
        url: '/wxpaylist',
        templateUrl: 'templates/weixin/pay/wxpaylist.html',
        controller: 'WxPayListCtrl'
      })
      // -------------------------------------微信路由结束-----------------------------------------

      //-------------------------------------支付宝路由开始-----------------------------------------
      //APP支付宝首页面
      .state('alitabs.alipay', {
        url: '/alipay',
        nativeTransitions: null,
        views: {
          'tab-home': {
            templateUrl: 'templates/alipay/alipay.html',
            controller: 'AliPayCtrl'
          }
        }
      })

      //APP支付宝口碑
      .state('alitabs.koubei', {
        url: '/koubei',
        nativeTransitions: null,
        views: {
          'tab-koubei': {
            templateUrl: 'templates/alipay/koubei.html',
            controller: 'KouBeiCtrl'
          }
        }
      })

      //APP支付宝朋友
      .state('alitabs.friend', {
        url: '/friend',
        nativeTransitions: null,
        views: {
          'tab-friend': {
            templateUrl: 'templates/alipay/friend.html',
            controller: 'FriendCtrl'
          }
        }
      })

      //APP支付宝我的
      .state('alitabs.account', {
        url: '/account',
        nativeTransitions: null,
        views: {
          'tab-aliaccount': {
            templateUrl: 'templates/alipay/account.html',
            controller: 'AliAccountCtrl'
          }
        }
      })

      //APP支付宝添加聊天对象
      .state('aliaddchat', {
        url: '/aliaddchat',
        templateUrl: 'templates/alipay/aliaddchat.html',
        controller: 'AliAddChatCtrl'
      })

      //APP支付宝个人中心
      .state('personalcenter', {
        url: '/personalcenter',
        templateUrl: 'templates/alipay/account/personalcenter.html',
        controller: 'PersonalCenterCtrl'
      })

      //APP支付宝个人设置
      .state('alisetting', {
        url: '/alisetting',
        templateUrl: 'templates/alipay/account/alisetting.html',
        controller: 'AliSettingCtrl'
      })

      //APP支付宝账单列表
      .state('bill', {
        url: '/bill',
        templateUrl: 'templates/alipay/account/bill.html',
        controller: 'BillCtrl'
      })

      //APP支付宝余额
      .state('balance', {
        url: '/balance',
        templateUrl: 'templates/alipay/account/balance.html',
        controller: 'BalanceCtrl'
      })

      //APP支付宝聊天页面
      .state('alichatdetails', {
        url: '/alichatdetails',
        templateUrl: 'templates/alipay/chat/alichatdetails.html',
        controller: 'AliChatDetailsCtrl'
      })

      //APP支付宝提现
      .state('aliwithdraw', {
        url: '/aliwithdraw',
        templateUrl: 'templates/alipay/account/aliwithdraw.html',
        controller: 'AliWithdrawCtrl'
      })
// -------------------------------------支付宝路由结束-----------------------------------------
// if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/main');

  })
;
