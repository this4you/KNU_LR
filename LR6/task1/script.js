
$(document).ready(function () {
    $('#loginform').submit(function (e) {
        e.preventDefault();
        const $form = $(this);
        if (!$form.valid()) return false;
        const dataObject = {};
        $form.serializeArray().forEach((el)=> {
            dataObject[el.name] = el.value;
        })
        $.ajax({
            type: "POST",
            url: $form.attr('action'),
            data: JSON.stringify(dataObject),
            contentType: "application/json",
            dataType: "json"
        });
    });
    $("#loginform").validate({
        rules: {
            firstname: {
                required: true,
                minlength: 4,
                maxlength: 16,
            },
            email: {
                required: true,
                email: true
            },
            messages: {
                required: true,
                maxlength: 250,
            },
        },
        messages: {
            firstname: {
                required: "Это поле обязательно для заполнения",
                minlength: "Имя должно быть минимум 4 символа",
                maxlength: "Максимальное число символов - 16",
            },
            email: {
                required: "Это поле обязательно для заполнения",
                minlength: "Пароль должен быть минимум 6 символа",
                maxlength: "Пароль должен быть максимум 16 символов",
            },
        }
    });

});