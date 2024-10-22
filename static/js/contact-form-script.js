/*==============================================================*/
// Raque Contact Form  JS
/*==============================================================*/
(function ($) {
    "use strict"; // Start of use strict
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });


    function submitForm() {
        // Initiate Variables With Form Content
        var data = {
            name: $("#name").val(),
            email: $("#email").val(),
            msg_subject: $("#msg_subject").val(),
            phone_number: $("#phone_number").val(),
            message: $("#message").val()
        };

        $.ajax({
            type: "POST",
            url: "https://uat.iresp.cn/jeecg-boot/iresp/public/www-form-process",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (text) {
                console.log(text);
                if (text == "success") {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, text);
                }
            },
            error: function errorCallback(xhr, status) {
                debugger;
                console.log('出问题了！');
            }
        });
    }

    function formSuccess() {
        $("#contactForm")[0].reset();
        submitMSG(true, "提交成功")
    }

    function formError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h4 tada animated text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
}(jQuery)); // End of use strict