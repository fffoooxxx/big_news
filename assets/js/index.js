$(function () {
  getUserInfo();
  $("#btnlogOut").on("click", function () {
    layer.confirm("确认退出?", { icon: 3, title: "提示" }, function (index) {
      localStorage.removeItem("token");
      location.href = "/login.html";
      layer.close(index);
    });
  });
});
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    headers: {
      // Authorization: localStorage.getItem("token"),
      Authorization: localStorage.token || "",
    },
    success(res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      renderAvatar(res.data);
    },
    error() {},
    // complete: function (res) {
    //   console.log(res);
    //   const { message, status } = res.responseJSON;
    //   if (message === "身份认证失败！" && status === 1) {
    //     localStorage.removeItem("token");
    //     location.href = "/login.html";
    //   }
    // },
  });
}
function renderAvatar(user) {
  console.log(user);
  // 渲染欢迎文本
  const username = user.nickname || user.username;
  $("#welcome").html(username);
  // 渲染文本头像和图片头像
  if (user.user_pic) {
    // 渲染图片头像
    $(".layui-nav-img")
      .attr("src", user.user - pic)
      .show();
    $(".text-avatar").hide();
  } else {
    // 渲染文字头像
    $(".layui-nav-img").hide();
    const firstName = username[0].toUpperCase();
    // 文字头像替换
    $(".text-avatar").html(firstName).show();
  }
}
