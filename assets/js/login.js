$(function () {
  //   // 点击“去注册账号”的链接
  //   $("#link_reg").on("click", function () {
  //     $(".login-box").hide();
  //     $(".reg-box").show();
  //   });
  //   // 点击“登录账号”的链接
  //   $("#link_login").on("click", function () {
  //     $(".login-box").show();
  //     $(".reg-box").hide();
  //   });
  //  链式
  $("#link_reg").on("click", function () {
    $(".login-box").hide().siblings(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".reg-box").hide().siblings(".login-box").show();
  });
  // 定制密码校验规则
  const form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码不符合规则"],
    repwd: function (value) {
      const password = $(".reg-box [name=password]").val();
      if (password !== value) return "两次输入密码不一致";
    },
  });
  // 注册功能
  $("#reg-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/api/reguser",
      type: "POST",
      data: {
        username: $(".reg-box [name=username]").val(),
        password: $(".reg-box [name=password]").val(),
      },
      success(res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功");
        $("#link_login").click();
      },
    });
  });
  // 登录功能
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    console.log(this);
    $.ajax({
      url: "/api/login",
      type: "POST",
      data: $(this).serialize(),
      success(res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        console.log(12345);
        localStorage.setItem("token", res.token);
        // location.href = "/index.html";
      },
    });
  });
});
