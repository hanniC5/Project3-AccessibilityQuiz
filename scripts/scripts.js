//Accessibility quiz taking user inputs and generating a score and final message
const accessQuiz = {};

accessQuiz.finalScore = 0;
accessQuiz.userAnswers = [];
accessQuiz.dynamicMessage = {
    highScore: "Way to go- You've covered some key basic accessibility requirements! You rock! Keep learning and visit some of the resources below",
    midScore: "Good job, you've used some of the key basic accessibility requirements! Keep going! Here are some resources",
    lowScore: "Your websites could use some work to make sure you meet basic accessibility requirements. Check out the resources below"
}

//function to calculate user score from radio input values
accessQuiz.userScore = function() {
    const $answer1= $('input[name=answerOne]:checked').val();
    const $answer2= $('input[name=answerTwo]:checked').val();
    const $answer3= $('input[name=answerThree]:checked').val();
    const $answer4= $('input[name=answerFour]:checked').val();
    const $answer5= $('input[name=answerFive]:checked').val();
    accessQuiz.userAnswers= [$answer1, $answer2, $answer3, $answer4, $answer5];
    let score= 0;
    for (let i= 0; i< accessQuiz.userAnswers.length; i++){
        score += parseInt(accessQuiz.userAnswers[i]);
    }
    return score;
};

//function that calls the userScore function to calculate score on form submit
accessQuiz.submitForm = function() {
    $('form').on('submit', function (e) {
        e.preventDefault();
        accessQuiz.userScore();
    });
};

//function that displays the quiz screen on click of home screen button
accessQuiz.toggleQuizDisplay = function() {
    $('.homeButton').on('click', function () {
        $(this).parents('.homeScreen').fadeOut();
        $('.quizScreen').addClass('display');
    });
};

//function creating unique results screen for 3 tiers of scores
accessQuiz.getResultsScreen = function(score) {
    if (score === 10) {
        $('.resultsScreen').html(`
            <h3> Your score is: <span>${score}</span></h3>
            <h2> ${accessQuiz.dynamicMessage.highScore}</h2>
            <a href="https://a11yproject.com/resources">https://a11yproject.com/resources</a>
            <a href="https://acessibility-cl.firebaseapp.com/">https://acessibility-cl.firebaseapp.com/</a>
            <a href="https://www.youtube.com/watch?v=cOmehxAU_4s">https://www.youtube.com/watch?v=cOmehxAU_4s</a>
            <button class="resetQuiz"> Try quiz again </button>
        `);
    }
    if (score >= 7 && score < 10) {
        $('.resultsScreen').html(`
            <h3> Your score is: <span>${score}</span></h3>
            <h2> ${accessQuiz.dynamicMessage.midScore}</h2>
            <a href="https://a11yproject.com/resources">https://a11yproject.com/resources</a>
            <a href="https://acessibility-cl.firebaseapp.com/">https://acessibility-cl.firebaseapp.com/</a>
            <a href="https://www.youtube.com/watch?v=cOmehxAU_4s">https://www.youtube.com/watch?v=cOmehxAU_4s</a>
            <button class="resetQuiz"> Try quiz again </button>
        `);
    }
    if (score < 7) {
        $('.resultsScreen').html(`
            <h3> Your score is: <span>${score}</span></h3>
            <h2> ${accessQuiz.dynamicMessage.lowScore}</h2>
            <a href="https://a11yproject.com/resources">https://a11yproject.com/resources</a>
            <a href="https://acessibility-cl.firebaseapp.com/">https://acessibility-cl.firebaseapp.com/</a>
            <a href="https://www.youtube.com/watch?v=cOmehxAU_4s">https://www.youtube.com/watch?v=cOmehxAU_4s</a>
            <button class="resetQuiz"> Try quiz again </button>
        `);
    }
};

//function that displays the user score on the results screen and calls the function to reset the quiz to the home screen  
accessQuiz.toggleResultsDisplay = function () {
    $('form').on('submit', function () {
        $(this).parents('.quizScreen').fadeOut();
        accessQuiz.getResultsScreen(accessQuiz.userScore());   
        $('.resultsScreen').addClass('display');
        accessQuiz.resetQuiz();
    });
};

//function reseting page to the home screen on button click
accessQuiz.resetQuiz = function () {
    $('.resetQuiz').on('click', function () {
        window.location.reload(true);
    });
};

//document ready and iClick listener function 
$(document).ready(function() {
    //method for styling radio buttons using iCheck
    $('input[type="radio"]').iCheck({
        radioClass: 'iradio_square-blue',
    });
    accessQuiz.toggleQuizDisplay();
    accessQuiz.submitForm();
    accessQuiz.toggleResultsDisplay();
}); 



