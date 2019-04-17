    var total_seconds = 2*10;
    var c_minutes = parseInt(total_seconds/60);
    var c_seconds = parseInt(total_seconds%60);

    // time checker function
    function CheckTime(){
    document.getElementById("quiz-time-left").innerHTML
        = 'Time Left: ' + c_minutes + ' minutes ' + c_seconds + ' seconds ' ;

    // time checker, display score if time is up
    if(total_seconds <=0){
    setTimeout("showScores()");
    }   else {
        total_seconds = total_seconds -1;
        c_minutes = parseInt(total_seconds/60);
        c_seconds = parseInt(total_seconds%60);
        setTimeout("CheckTime()",1000);
        }
    }
    setTimeout("CheckTime()",1000);

    // set criteria for question display (used in var question later)
    function Question(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    
    // correct answer checker
    Question.prototype.isCorrectAnswer = function(choice) {
        return this.answer === choice;
    }    

    function Quiz(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }
    
    // question number
    Quiz.prototype.getQuestionIndex = function() {
        return this.questions[this.questionIndex];
    }
    
    Quiz.prototype.guess = function(answer) {
        if(this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
    
        this.questionIndex++;
    }
    
    // check for the end of the quiz
    Quiz.prototype.isEnded = function() {
        return this.questionIndex === this.questions.length;
    }    

    // quiz execution
    function populate() {
        if(quiz.isEnded()) {
            showScores();
        }
        else {
            // show question
            var element = document.getElementById("question");
            element.innerHTML = quiz.getQuestionIndex().text;
    
            // show true and false choices
            var choices = quiz.getQuestionIndex().choices;
            for(var i = 0; i < choices.length; i++) {
                var element = document.getElementById("choice" + i);
                element.innerHTML = choices[i];
                guess("btn" + i, choices[i]);
            }
    
            showProgress();
        }
    };
    
    function guess(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            populate();
        }
    };
    
    // display current question number
    function showProgress() {
        var currentQuestionNumber = quiz.questionIndex + 1;
        var element = document.getElementById("progress");
        element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
    };
    
    // score display screen function
    function showScores() {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2>";
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;
    };
    
    // quiz questions
    var questions = [
        new Question("Pokemon Let's Go Pikachu/Evee are based in the Johto region.", ["True", "False"], "False"),
        new Question("Batman can defeat Superman given enough preparation.", ["True", "False"], "False"),
        new Question("EA is company known for their generous monetization models created with their customers in mind.", ["True", "False"], "False"),
        new Question("MVC is a framework used in different programming languages like Java and C#.", ["True", "False"], "True"),
        new Question("Super Smash Bros. Ultimate will save the fighting game community.", ["True", "True"], "True")
    ];
    
    // create quiz
    var quiz = new Quiz(questions);
    
    // execute quiz
    populate();    