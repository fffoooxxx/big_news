$(function () {
  //   var form = layui.form;
  const { form, layer } = layui;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在 1 ~ 6 个字符之间！";
      }
    },
  });
  initUserInfo();
  //   初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败！");
        }
        console.log(res);
        form.val("userInfo", res.data);
      },
    });
  }

  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  });

  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          layer.msg("更新用户信息失败");
          return;
        }
        layer.msg("更新用户信息成功");

        // 调用父页面getUserInfo方法
        window.parent.getUserInfo();
      },
    });
  });
});
