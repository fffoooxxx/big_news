$(function () {
  $.ajaxPrefilter(function (option) {
    option.url = "http://ajax.frontend.itheima.net" + option.url;
    // my开头的接口统一添加
    if (option.url.indexOf("/my/") !== -1) {
      option.handlers = {
        Authorization: localStorage.token || "",
      };
      const successFunction = option.success.bind();
      console.log(successFunction);
      option.success = function (res) {
        console.log("妈妈经历了鬼门关才有了你,你却说人间不值得");
        successFunction(res);
        const { message, status } = res;
        if (message === "身份认证失败！" && status === 1) {
          localStorage.removeItem("token");
          location.href = "/login.html";
        }
      };
      //配置全局Ajax请求  每次调用接口都会匹配身份认证 若身份认证失败则强制清空token 在强制跳回登录界面
      // option.complete = function (res) {
      //   console.log(res);
      //   const { message, status } = res.responseJSON;
      //   if (message === "身份认证失败！" && status === 1) {
      //     localStorage.removeItem("token");
      //     location.href = "/login.html";
      //   }
      // },
    }
  });
});
