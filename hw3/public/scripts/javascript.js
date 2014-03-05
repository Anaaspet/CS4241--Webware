var lowNum; //The current lower bound.
var highNum; //The current upper bound.
var correctAnswer; //The current correct target answer.

//Called only on page load. Sets the bound values, then calls the AJAX function to get a target value. 
function initialStart() {
	lowNum = parseInt(document.getElementById("lowNum").innerHTML);
	highNum = parseInt(document.getElementById("highNum").innerHTML);
	getNewTarget();
}

//Called when the user wants to play with new bounds and a new target.
//Makes new bounds in JS, then sends AJAX call with these bounds to get a new target number.
function playAgain()
{
	var request = new XMLHttpRequest(); 
	request.onreadystatechange = function() { 
    	if(request.readyState == 4 && request.status == 200) { //Wait for processing to be complete
    	    correctAnswer = request.responseText; 
		}
	};
	var newLowerBound = Math.floor(Math.random()*10) + 1; 
	var newUpperBound = Math.floor(Math.random()*10) + 200; 
	document.getElementById("lowNum").innerHTML = newLowerBound;
	document.getElementById("highNum").innerHTML = newUpperBound; 
	lowNum = newLowerBound; //Set the global variable
	highNum = newUpperBound; //Set the global variable
	
	//Process the request 
	request.open('GET', "/newTarget?lowNum="+newLowerBound+"&highNum="+newUpperBound, true); 
    request.send(); 
}

//Called whenever the user submits an answer.
//Checks for out of range answers and for answers that aren't numbers
//Provides feedback about the accuracy of the answer.
function checkAnswer() {
	var guess = document.getElementById("userGuess").value;
	var guessNumber = Number(guess);
	document.getElementById("response").style.color = "black";
	
	//Check if the input wasn't a valid integer
	if (isNaN(guessNumber)) {
		document.getElementById("response").innerHTML = "You wrote something that isn't a number. Please go back to kindergarten."; 
	}
	
	//Check for out of bounds input
	else if((guessNumber) < (lowNum) || (guessNumber) > (highNum)) {
		document.getElementById("response").innerHTML = "I told you to guess in between the numbers...";
	}
	
	//If it gets here, input was valid.
	else {
	
		//Congratulate user if the answer was correct.
		if((guessNumber) == (correctAnswer)) {
			document.getElementById("response").innerHTML = "Congratulations! You won! Now go outside.";
			document.getElementById("response").style.color = "green";
		}
		
		//Notify user that answer was low.
		else if ((guessNumber) < (correctAnswer)) {
			document.getElementById("response").innerHTML = "Your guess was too low.";
			document.getElementById("response").style.color = "red";
		}
		
		//Notify user that answer was high.
		else {
			document.getElementById("response").innerHTML = "Your guess was too high.";
			document.getElementById("response").style.color = "red";
		}
	}
}

//Called whenever a new target number is desired. 
//Uses whatever the current values for the bounds are to generate a target number in that range. 
function getNewTarget() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() { 
		if(request.readyState == 4 && request.status == 200) { //Wait for processing to be complete
		    correctAnswer = request.responseText; //The response from the server is the new target value, set the global variable.
		}
	};
	
	//Process the request 
	request.open('GET', "/newTarget?lowNum="+lowNum+"&highNum="+highNum, true); 
	request.send();  
}

