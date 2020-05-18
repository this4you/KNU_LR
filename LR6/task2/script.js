$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://dummy.restapiexample.com/api/v1/employees",
        dataType: "json",
        success: function (response) {
            if (response.status === 'success') {
                response.data.forEach(el => {
                    const name = $("<h3></h3>").text(el.employee_name);
                    const age = $("<p></p>").text(`${el.employee_age} years old`);
                    const salary = $("<p></p>").text(`${el.employee_salary} $`);
                    const userBox = $("<div></div>").addClass("user-box").append(name, age, salary);
                    $("#usersList").append($("<li></li>").append(userBox));
                });
            }
        }
    });
});