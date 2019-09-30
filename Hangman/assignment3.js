//Loop through the alphabet string to create the needed <span> elements for letter selection 
alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
create_span = function()
{
	for(i = 0; i < alphabet.length; i++) 
	{
			character = alphabet.charAt(i) 
			$("#select_letter").append("<span class =\"unguessed\">" + character + "</span>")
	}
	$("#image").html("<img src =\"0.png\" alt=\"hangman_pic\">")
}
//Retrieve a random word for the player to guess.  All words are in all UPPER-CASE with no spaces or other non-letter characters included.
//It may be useful to temporarily change this to something constant like word_to_guess = "CANADA" or something similar to make testing easier
word_to_guess = random_word()
//guessed_letters will contain all letters that the user has guessed.  If the player initially guesses all five vowels, this will be equal to "AEIOU"
//The order of letters in the string is unimportant, "EUAIO" and "IUAOE" would lead to the same result as "AEIOU"
guessed_letters = ""
 
incorrect_guesses = 0 //The number of incorrect guesses the user has made
 
correct_letters = 0 //Will store the number of letters in the word to guess that the user has successfully found, i.e. C A _ A _ A would be 4
 

 
//This function will be called when the user clicks on a letter to select it
letter_clicked = function() {
    //Change the class of the <span> that was clicked
	$(this).attr("class","guessed")
    //Change this line to retrieve the letter that was clicked and 
	letter = $(this).html()
	$(this).off()
    //then add it to the guessed_letters string
    guessed_letters = guessed_letters + letter
    //The .include() function will return true if letter is somewhere in word_to_guess
	word_to_guess =  word_to_guess.toUpperCase()
    successful = (word_to_guess.includes(letter))
    if (successful) 
	{
    //Progress was made, so update the displayed progress
        show_word_progress()
		//Check if the user has won and take appropriate actions if they have
		
    } 
	else 
	{
        //An incorrect guess, take appropriate action
       incorrect_guesses++
	   $("img").attr("src",  incorrect_guesses + ".png")
	   
		
		if(incorrect_guesses == 6)
		{
			$("#result").append("<p>GAME OVER! The word is " + word_to_guess + "</p>")
			$("*").off()
		}
        //Check if the user has lost and take appropriate action if they have
    }
}
 
 
//This function will display the current progress of the player, i.e. _ _ _ _ _ _  or C _ N _ D _
//It will also keep the correct_letters variable set correctly
show_word_progress = function() {
    word_progress = ""  //will be built into a string such as "C _ N _ D _"
	index = 0;
    
	while(index < word_to_guess.length)
	{
		character = word_to_guess.charAt(index)
		if(guessed_letters.includes(character))
		{
			word_progress = word_progress + character
		}
		else
		{
			word_progress = word_progress + "_" + " "
		}
	   index++
	}
	$("#progress").html(word_progress)
	
	if(word_progress == word_to_guess)
	{
		$("#result").append("<p>Congratulations! You've won the game!</p>")
		$("img").attr("src", "winner.png")
		$("*").off()
	}
	
    //Loop through the word_to_guess string.  For each character...
    //If the letter has been guessed, display it and increase the value of correct_letters.  Use the .includes() function used earlier to check if a letter has been guessed
    //Otherwise, display an underscore,_, character
     
    //Seperate the letters and underscores with a single space "C A _ A _ A", not "CA_A_A"
    //It is ok to have an extra space at the beginning or end, " C A _ A _ A" or "C A _ A _ A "
 
    //Display the progress
}
 
 
setup = function() {
    //Create the <span> elements for the user to click
    create_span()
    //Call show_word_progress()  If working it will display an underscore for each letter when called here
    show_word_progress()
     
  //Connect the letter_clicked with the appropriate elements/event
	$("span").click(letter_clicked)
}
 
$(document).ready(setup)