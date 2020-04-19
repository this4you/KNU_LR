$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://dummy.restapiexample.com/api/v1/employees",
        dataType: "json",
        success: function (response) {
            if (response.status === 'success') {
                response.data.forEach(el => {
                    let name = $("<h3></h3>").text(el.employee_name);
                    let age = $("<p></p>").text(el.employee_age + ' years old');
                    let salary = $("<p></p>").text(el.employee_salary + '$');
                    let userBox = $("<div></div>").addClass("user-box").append(name, age, salary);
                    $("#usersList").append($("<li></li>").append(userBox));
                });
            }
        }
    });
});