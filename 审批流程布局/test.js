// console.log(layui.form);
var form = layui.form
// console.log(form);

//选择应用模块
form.on('select(type)', function (data) {
    let callback = function (e) {
        if (e.code == 0) {
            if (e.data.length > 0) {
                let ops = '<option value="">--请选择--</option>';
                for (var i = 0; i < e.data.length; i++) {
                    ops += '<option value="' + e.data[i].id + '">' + e.data[i].title + '</option>';
                }
                $('[name="flow_cate"]').html(ops);
                form.render();
            }
        }
    }
    console.log(data.value);
    let obj = {
        "code": 0,
        "msg": "",
        "url": "",
        "data": [
            {
                "id": 5,
                "type": 2,
                "title": "会议室预定",
                "name": "huiyishi",
                "icon": "icon-kehuguanli",
                "status": 1,
                "create_time": 1641802939,
                "update_time": 0
            },
            {
                "id": 6,
                "type": 2,
                "title": "公文流转",
                "name": "gongwen",
                "icon": "icon-jiaoxuejihua",
                "status": 1,
                "create_time": 1641802976,
                "update_time": 0
            },
            {
                "id": 7,
                "type": 2,
                "title": "物品维修",
                "name": "weixiu",
                "icon": "icon-chuangjianxitong",
                "status": 1,
                "create_time": 1641803005,
                "update_time": 0
            },
            {
                "id": 8,
                "type": 2,
                "title": "用章",
                "name": "yongzhang",
                "icon": "icon-shenpishezhi",
                "status": 1,
                "create_time": 1641804126,
                "update_time": 0
            },
            {
                "id": 9,
                "type": 2,
                "title": "用车",
                "name": "yongche",
                "icon": "icon-dongtaiguanli",
                "status": 1,
                "create_time": 1641804283,
                "update_time": 0
            },
            {
                "id": 10,
                "type": 2,
                "title": "用车归还",
                "name": "yongcheguihai",
                "icon": "icon-kaoheguanli",
                "status": 1,
                "create_time": 1641804411,
                "update_time": 0
            }
        ]
    }
    callback(obj)
    // tool.get("/api/index/get_flow_cate", {type:data.value}, callback);
})


//选择应用部门
// var selcted = $('#department_ids').attr('xm-selected');
// formSelects.data('select1', 'server', {
//     url: '/api/index/get_department_select',
//     keyword: selcted,
// });


// 审批流类型点击显示不同流程
form.on('radio(checktype)', function (data) {
    if (data.value == 1) {
        $('#flowTr1').show();
        $('#flowTr2').hide();
        $('#flowTr3').hide();
    } else if (data.value == 2) {
        $('#flowTr1').hide();
        $('#flowTr2').show();
        $('#flowTr3').hide();
    } else {
        $('#flowTr1').hide();
        $('#flowTr2').hide();
        $('#flowTr3').show();
    }
});

form.on('select(flowtype)', function (data) {
    $(data.elem).parents('.layui-form-item').find('.layui-inline').eq(1).attr('class', 'layui-inline select-' + data.value);
});

// 添加指定层级事件
$('#addFlow1').on('click', function () {
    var len = $('#flowList1').find('.layui-form-item').length;
    var index = len + 1;
    var timestamp = new Date().getTime();
    var tem = '<div class="layui-form-item  layui-form-pane">\
						<div class="layui-inline">\
						  <label class="layui-form-label label-index">第' + index + '级</label>\
						  <div class="layui-input-inline">\
							<select name="flowType[]" lay-filter="flowtype">\
								<option value="1">当前部门负责人</option>\
								<option value="2">上一级部门负责人</option>\
								<option value="3">指定人员(多人或签)</option>\
								<option value="4">指定人员(多人会签)</option>\
							</select>\
						  </div>\
						</div>\
						<div class="layui-inline select-1">\
						  <label class="layui-form-label">指定人员</label>\
						  <div class="layui-input-inline" style="width:360px;">\
							<input type="text" name="flowNamesA[]" value="" autocomplete="off" readonly class="layui-input picker-more">\
							<input type="hidden" name="flowUidsA[]" value="">\
						  </div>\
						</div>\
						<span class="layui-btn layui-btn-danger layui-btn-sm">删除</span>\
					</div>';
    $('#flowList1').append(tem);
    form.render();
});
// 删除按钮事件，通过冒泡绑定在父级
$('#flowList1').on('click', '.layui-btn-danger', function () {
    $(this).parents('.layui-form-item').remove();
    var items = $('.label-index').length;
    if (items > 0) {
        $('.label-index').each(function (index, item) {
            $(this).html('第' + (index + 2) + '级');
        })
    }
});
// 添加指定层级事件
//================================
$('#addFlow3').on('click', function () {
    var len = $('#flowList3').find('.layui-form-item').length;
    var index = len + 1;
    var timestamp = new Date().getTime();
    var tem = '<div class="layui-form-item  layui-form-pane">\
						<div class="layui-inline">\
						  <label class="layui-form-label label-index">第' + index + '级</label>\
						  <div class="layui-input-inline">\
							<input type="text" name="flowName[]" value="" autocomplete="off" placeholder="请输入流程名称" class="layui-input">\
						  </div>\
						</div>\
						<div class="layui-inline select-3">\
						  <label class="layui-form-label">指定人员</label>\
						  <div class="layui-input-inline" style="width:360px;">\
							<input type="text" name="flowNamesB[]" value="" autocomplete="off" readonly class="layui-input picker-one">\
							<input type="hidden" name="flowUidsB[]" value="">\
						  </div>\
						</div>\
						<span class="layui-btn layui-btn-danger layui-btn-sm">删除</span>\
					</div>';
    $('#flowList3').append(tem);
    form.render();
});
// 删除
$('#flowList3').on('click', '.layui-btn-danger', function () {
    $(this).parents('.layui-form-item').remove();
    var items = $('.label-index').length;
    if (items > 0) {
        $('.label-index').each(function (index, item) {
            $(this).html('第' + (index + 2) + '级');
        })
    }
});
