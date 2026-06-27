messages = document.getElementById('messages');
input = document.getElementById('input');
bot_block = document.getElementById('bot_block');
user_block = document.getElementById('user_block');

//ID 
msgno = 0; 

var flag=false;

//import data from json file

var products;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    products = JSON.parse(xhttp.responseText);
  }
};

xhttp.open("GET", "data.json", true);
xhttp.send();


//function to take input from the user


function taketheinput(event) {

	// if user hit's the enter key
	if(event.key === "Enter"){
		//creates use message id
		messages.innerHTML += user_block.outerHTML;
		// changes it's id
		msgno += 1;
		messages.lastChild.id = msgno;
		//changes it's text
		messages.lastChild.childNodes[3].textContent = input.value;
		//here processes the input
		processinput(input.value.toLowerCase());
		input.value = "";

	}
}


// function to process user input message

function processinput(inputval){
	if(inputval!=""){
		// bot message block created
		messages.innerHTML += bot_block.outerHTML
		// changes it's ID
		msgno += 1
		messages.lastChild.id = msgno
		//changing its text
		messages.lastChild.childNodes[3].textContent = reply(inputval)
	}
}


// function to reply user's message


function reply(inputval) {

	//regex to check input message matching...
	msg = inputval.match(/(demo_for_men)|(\w+)/g)
  msg = inputval.match(/(demo_for_women)|(\w+)/g)
	
	// storing words in a variable for checking the user message..botimg

	var words = "colours demo_for_men demo_for_women images shopping_link_for_men shopping_link_for_women party_wear casual_wear summer_wear formal thankyou thanks";
	
	//condition to give reply to user's when they enter name...

	if(words.includes(inputval)==false && flag==false){
        flag=true;
        return "Hii "+inputval.toUpperCase()+", nice to meet you.Are you looking for an outfit? Then you must try these!! 1)party_wear 2)casual_wear 3)summer_wear 4)formal"
	}
	//from here bot check's the user's meggage is present or not..

    if(msg.includes("colours")){
        var img = document.createElement('img');
		img.src=recentproduct.images; 
		document.getElementById(msgno).appendChild(img);
		return recentproduct.colours
	}
	
    
    if(msg.includes("demo_for_men")){
		//iframe
		var iframe = document.createElement('iframe'); 
		//gets embeded video from data ..
		iframe.src=recentproduct.vedio_for_men
		document.getElementById(msgno).appendChild(iframe);
		return "Watch this vedio for more info!!👇🏻";
	}

  if(msg.includes("demo_for_women")){
		//iframe
		var iframe = document.createElement('iframe'); 
		//gets embeded video from data ..
		iframe.src=recentproduct.vedio_for_women
		document.getElementById(msgno).appendChild(iframe);
		return "Watch this demo of product!!👇🏻";
	}
	
	//if user enter buynow..
    if(msg.includes("shopping_link_for_men")){
		// bot will open website in new tab..

        window.open("https://www.myntra.com/");
        return recentproduct.shopping_link_for_men
	}
  if(msg.includes("shopping_link_for_women")){
		// bot will open website in new tab..

        window.open("https://www.myntra.com/");
        return recentproduct.shopping_link_for_women
	}

	//bot greets here !!
	if(msg.includes("thankyou") || msg.includes("thanks")){
		return "Thank you, visit again................. 🤗"
	}

	ans="";
	msg.forEach(function(product){
		if(products.hasOwnProperty(product)){
		//It is to ask the details of the product when user enters the product name..
		ans = "Please Enter the details you want to know. For Ex: 1) colours 2) demo_for_men 3) demo_for_women 4) shopping_link_for_men 5) shopping_link_for_women etc"
        recentproduct = products[product];
        }
	})

	if(ans){
		return ans;
	}

	//returns if the user's message is not available...
	return "Sorry " + inputval + " it is not available!! Explore available products🤗";
}
