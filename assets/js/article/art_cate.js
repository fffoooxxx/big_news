$(function () {
  const form = layui.form;
  initCateInfo();

  function initCateInfo() {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        const htmlStr = template("tpl-table", res);
        // console.log(htmlStr);
        $("tbody").html(htmlStr);
      },
    });
  }

  $("#btnAddCate").on("click", function () {
    addIndex = layer.open({
      // 弹出层类型
      type: 1,
      // 弹出层宽高
      area: ["500px", "300px"],
      // 弹出层标题
      title: "添加类别",
      // 弹出层里面的内容
      content: $("#dialog-add").html(),
    });
  });
  let addIndex = null;
  $("body").on("submit", "#form-add", function (event) {
    event.preventDefault();
    console.log(this);
    //发起Ajax请求
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("添加分类成功");
        initCateInfo();
        layer.close(addIndex);
      },
    });
  });
  let indexEdit = null;
  // 通过代理形式为 btn-edit   绑定
  $("tbody").on("click", "#btn-edit", function () {
    // 弹出一个修改文章分类信息的层
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    // 获取编辑按钮的Id
    const id = $(this).data("id");
    console.log(id);
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });
  // 点击  确认修改  通过代理绑定
  $("body").on("submit", "#form-edit", function (event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          console.log(res);
          return layer.msg("更新数据失败!!!");
        } else {
          layer.msg("更新数据成功!!!");
          layer.close(indexEdit);
          initCateInfo();
        }
      },
    });
  });

  // 为删除按钮绑定
  $("tbody").on("click", ".btn-delete", function () {
    const id = $(this).data("id");
    console.log(id);
    // 提示用户是否要删除
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg("删除分类失败！");
          }
          layer.msg("删除分类成功！");
          layer.close(index);
          initCateInfo();
        },
      });
    });
  });
});
