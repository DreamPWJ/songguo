/**
 * Created by pwj on 2017/6/6.
 * 系统接口常量配置
 */
var configMod = angular.module("starter.config", []);

configMod.constant("SongGuo", {
  'name': 'SongGuo', //项目名称
  'debug': false, //调试标示 暂无使用
  'api': 'http://a.songguo.com',//接口服务地址  使用
  'siteUrl': 'http://a.songguo.com',//仓库地址 暂无使用
  'imgUrl': 'http://f.songguo.com',//图片地址 暂无使用
  'mobApi': 'http://m.songguo.com',//手机端服务  使用（分享链接展示等调用）
  'version': '1.0.0' //当前版本号
});

