
function task1() {
    const config = {
        questions: [
            childrenNumber = {
                data: [1, 2, 20, 4, 14, 7, 222, 9],
                value: "Твое улюблене число - "
            },
            professions = {
                data: ["Пілот", "Музикант", "Програміст"],
                value: "Вам цікава була в дитинстві професія "
            },
            partnerNames = {
                data: ["Gregor", "Ilya", "Luna", "Anna"],
                value: "Чи подобається вам ім'я "
            },
            cities = {
                data: ["Киев", "Москва", "Барселона"],
                value: "Хотели бы вы жить в "
            }
        ],
        resultPaterns: [
            'Ви укладите шлюб з q2, та у вас буде q0 дітей.',
            'Ви переїдете у місто q3 на посаду q1.'
        ],
    };

    function askQuestion(question) {
        let data = question.data,
            dataNumbers = question.data.length;

        for (let i = 0; i < dataNumbers; i++) {
            if (confirm(question.value + data[i] + " ?"))
                return question.data[i]
        }
        return "";
    }

    (function startGame(config) {
        if (!confirm("Готові грати в гру?")) return alert("Бувай =(");

        let { questions, resultPaterns } = config,
            questionsNumbers = questions.length,
            answers = [];

        for (let i = 0; i < questionsNumbers; i++) {
            answers[i] = askQuestion(questions[i]);
        }

        do {
            prediction = prompt(`Для вас є ${resultPaterns.length} передбачень, яке ви хочете побачити?`);
        } while (prediction == undefined || prediction < 1 || prediction > resultPaterns.length)

        alert(getResultPrediction(prediction - 1));

        function getResultPrediction(predictionNumber) {
            let prediction = resultPaterns[predictionNumber]
            for (let i = 0; i < answers.length; i++) {
                prediction = prediction.replace("q" + i, answers[i]);
            }
            return prediction;
        }
    })(config);

}
