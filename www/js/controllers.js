angular.module('starter.controllers', [])
  .config(function ($httpProvider) { //统一配置设置
    //服务注册到$httpProvider.interceptors中  用于接口授权
    $httpProvider.interceptors.push('MyInterceptor');
    /* $httpProvider.defaults.headers.common['Authorization'] = localStorage.getItem('token');*/
    /*    $http.defaults.cache = true/false;*/
  })


  //APP首页面
  .controller('MainCtrl', function ($scope, $rootScope, CommonService, $ionicHistory) {

    $scope.imgsPicAddr = [];//图片信息数组
    $scope.imageList = [];  //上传图片数组集合
    $scope.uploadActionSheet = function () {
      CommonService.uploadActionSheet($scope, "upload", true);
    }
    //在首页中清除导航历史退栈
    $scope.$on('$ionicView.afterEnter', function () {
      $ionicHistory.clearHistory();
      StatusBar.backgroundColorByHexString("#1B82D1");
    })
  })

  //登录页面
  .controller('LoginCtrl', function ($scope, $rootScope, $state, CommonService, AccountService) {
    $scope.user = {};//提前定义用户对象
    $scope.loginSubmit = function () {
      AccountService.login($scope.user).success(function (data) {
        CommonService.getStateName();   //跳转页面
      }).error(function () {
        CommonService.platformPrompt("登录失败!", 'close');
      })
    }
  })
  //我的设置页面
  .controller('AccountCtrl', function ($scope, $rootScope, CommonService) {
    $scope.settings = {
      enableFriends: true
    };
  })

  //加好友专区
  .controller('AddBuddyCtrl', function ($scope, CommonService) {

  })


  //-------------------------------------微信控制器开始-----------------------------------------
  //APP微信首页面
  .controller('WeiXinCtrl', function ($scope, CommonService) {
    $scope.$on('$ionicView.afterEnter', function () {
      StatusBar.backgroundColorByHexString("#393A3F");
    })
    CommonService.ionicPopover($scope, 'wxmain-popover.html');
  })

  //APP微信聊天界面
  .controller('ChatDetailsCtrl', function ($scope, CommonService) {

  })
  //APP微信聊天属性设置
  .controller('ChatSettingCtrl', function ($scope, CommonService) {

  })
  //APP微信通讯录主页面
  .controller('AddressBookCtrl', function ($scope, CommonService) {

  })
  //APP微信发现主页面
  .controller('FindCtrl', function ($scope, CommonService) {

  })
  //APP微信我的主页面
  .controller('WXAccountCtrl', function ($scope, CommonService) {

  })
  //APP微信钱包
  .controller('WalletCtrl', function ($scope, CommonService) {

  })
  //APP微信个人信息
  .controller('PersonalInfoCtrl', function ($scope, CommonService) {

  })
  //APP微信添加聊天对象
  .controller('AddChatCtrl', function ($scope, CommonService, $ionicSlideBoxDelegate) {
    $scope.tabIndex = 0;//当前tabs页
    $scope.slideChanged = function (index) {
      $scope.tabIndex = index;
    };

    $scope.selectedTab = function (index) {
      $scope.tabIndex = index;
      //滑动的索引和速度
      $ionicSlideBoxDelegate.$getByHandle("slidebox-addchatlist").slide(index)
    }
  })
  //APP微信新的朋友
  .controller('AddFriendCtrl', function ($scope, CommonService, $ionicActionSheet) {
    $scope.addFriend = function () {//添加朋友
      $ionicActionSheet.show({
        cssClass: '',
        titleText: '',
        buttons: [
          {text: '刷新类别'},
          {text: '清空列表'},
          {text: '继续添加'},
        ],
        cancelText: '取消',
        cancel: function () {
          return true;
        },
        buttonClicked: function (index) {
          switch (index) {
            case 0:
            function a() {

            }

              break;
            case 1:
            function b() {

            }

              break;
            case 2:
            function c() {

            }

              break;
            default:
              break;
          }
          return true;
        }
      });
    }
  })

  //APP微信零钱
  .controller('LooseChangeCtrl', function ($scope, CommonService) {

  })

  //APP微信充值
  .controller('RechargeCtrl', function ($scope, CommonService) {

  })

  //APP微信提现
  .controller('WithdrawCtrl', function ($scope, CommonService) {

  })

  //APP微信选择银行卡
  .controller('BankCardCtrl', function ($scope, CommonService) {

  })

  //APP微信支付列表
  .controller('WxPayListCtrl', function ($scope, CommonService) {

  })
  //-------------------------------------微信控制器结束-----------------------------------------

  //-------------------------------------支付宝控制器开始-----------------------------------------
  //APP支付宝首页面
  .controller('AliPayCtrl', function ($scope, CommonService) {
    $scope.$on('$ionicView.afterEnter', function () {
      StatusBar.backgroundColorByHexString("#1B82D1");
    })
  })

//-------------------------------------支付宝控制器结束-----------------------------------------
