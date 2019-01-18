var words = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"];
var listA = [74,71,40,93,49];
var listB = [43,51,66,73,63,96,65,87,90,41,78,79,42,47,45];

var duration = 1500; // the amount of time the words are displayed
var firstTest = "";
var visualDone = false;
var audioDone = false;
var theDate = new Date();
var timestamp = Date.now();
var downloadText = "";
var visualList = '';
var audioList = '';

function animate(thing){
	document.getElementById(thing).click();
}

function setup() {
	if (0) { // randomly choose which list will be used for which test
		visualList = 'listA';
		audioList = 'listB';
		document.getElementById("frm1").elements.namedItem("videoList").value = 'listA';
	} else {
		visualList = 'listB';
		audioList = 'listA';
		document.getElementById("frm1").elements.namedItem("videoList").value = 'listB';
	}
	listA.shuffle(); // randomly order listA
	listB.shuffle(); // randomly order listB

	document.getElementById("frm1").elements.namedItem("reference").value = timestamp;
	document.getElementById("frm1").elements.namedItem("date").value = theDate.getDate() + '/' + theDate.getMonth() + '/' + theDate.getFullYear();
	document.getElementById("frm1").elements.namedItem("time").value = theDate.getHours() + ':' + theDate.getMinutes();

	/*** ANIMATE *********************
	setTimeout(function() {
		document.getElementById("btn_consent").checked = true;
	}, 5000);
	setTimeout(function() {
		document.getElementById("btn_consent").click();
	}, 6000);
	setTimeout(function() {
		document.getElementById("btn_survey").click();
	}, 9000);
	setTimeout(function() {
		document.getElementById("btn_instructions").click();
	}, 12000);
	setTimeout(function() {
		document.getElementById("btn_black").click();
	}, 15000);
	setTimeout(function() {
		document.getElementById("visualButton").click();
	}, 42500);
	setTimeout(function() {
		document.getElementById("audioButton").click();
	}, 48000);
	/*********************************/
}

Array.prototype.shuffle = function() { // Fisher-Yates shuffle
    var input = this;
    for (var i = input.length-1; i >=0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
        input[randomIndex] = input[i];  
        input[i] = itemAtIndex;
    }
    return input;
}

function moveTo(section){
	//hide everything
	document.getElementById('consent').style.display = "none";
	document.getElementById('intro').style.display = "none";
	document.getElementById('survey').style.display = "none";
	document.getElementById('visualTest').style.display = "none";
	document.getElementById('startpage').style.display = "none";
	document.getElementById('audioTest').style.display = "none";
	document.getElementById('endTest').style.display = "none";
	
	// display the one thing
	if(section == 'test'){
		if (firstTest == "") {
			if (1) {
				firstTest = 'visualTest';
				visualDone = true;
				moveTo('visualTest');
				visualPlay(0, visualList);
				document.getElementById("frm1").elements.namedItem("testOrder").value = "VA";
			} else {
				firstTest = 'audioTest';
				audioDone = true;
				moveTo('audioTest');
				audioPlay(0, audioList);
				document.getElementById("frm1").elements.namedItem("testOrder").value = "AV";
			}
		} else if (firstTest == 'visualTest' && audioDone == false) {
			audioDone = true;
			moveTo('audioTest');
			audioPlay(0, audioList);
		} else if (firstTest == 'audioTest' && visualDone == false) {
			visualDone = true;
			moveTo('visualTest');
			visualPlay(0, visualList);
		} else {
			moveTo('endTest');
		}
	} else {
		document.getElementById(section).style.display = "block";
	}
}

function validateForm () {
	var complete = true;
	if(	!document.forms["frm1"]["gender"][0].checked && 
		!document.forms["frm1"]["gender"][1].checked) complete = false;
	if(document.getElementById("age").value == "") complete = false;
	if(	!document.forms["frm1"]["education"][0].checked && 
		!document.forms["frm1"]["education"][1].checked &&
		!document.forms["frm1"]["education"][2].checked &&
		!document.forms["frm1"]["education"][3].checked) complete = false;
	if(	!document.forms["frm1"]["language"][0].checked && 
		!document.forms["frm1"]["language"][1].checked) complete = false;
	complete ? moveTo('intro') : document.getElementById("error").style.display = "block";
}

function visualPlay(wordNum, visualList) { // recursive function to display words
	switch(visualList) {
		case 'listA':
			document.getElementById("visualTest").innerHTML = '<div class="word">' + words[listA[wordNum]-1] + '</div>'; // select the word based on the number in list A
			if (wordNum < listA.length - 1) {
				setTimeout(visualPlay, duration, wordNum+1, 'listA'); // Change image every duration ms
			} else {setTimeout(endVisualTest, duration)};
			break;
		case 'listB':
			document.getElementById("visualTest").innerHTML = '<div class="word">' + words[listB[wordNum]-1] + '</div>'; // select the word based on the number in list B
			if (wordNum < listB.length - 1) {
				setTimeout(visualPlay, duration, wordNum+1, 'listB'); // Change image every duration ms
			} else {setTimeout(endVisualTest, duration)};
			break;
	}
}

function endVisualTest() {
	document.getElementById("visualTest").innerHTML = '<h1>Please repeat the words</h1><div class="fakeButton centered" id="visualButton" onclick="moveTo(\'test\')">next</div>'; // select the word based on the number in list B
	document.getElementById("visualButton").style.display = "block";
}

function audioPlay(wordNum, audioList) { // recursive function to display words
	switch(audioList) {
		case 'listA':
			document.getElementById("audioFile").innerHTML = '<source src="audio/' + listA[wordNum] + '.wav" type="audio/wav">'; // select the word based on the number in list A
			document.getElementById("audioFile").load();
			document.getElementById("audioFile").play();
			if (wordNum < listA.length - 1) {
				setTimeout(audioPlay, duration, wordNum+1, 'listA'); // Change image every duration ms
			} else {setTimeout(endaudioFile, duration)};
			break;
		case 'listB':
			document.getElementById("audioFile").innerHTML = '<source src="audio/' + listB[wordNum] + '.wav" type="audio/wav">'; // select the word based on the number in list A
			document.getElementById("audioFile").load();
			document.getElementById("audioFile").play();
			if (wordNum < listB.length - 1) {
				setTimeout(audioPlay, duration, wordNum+1, 'listB'); // Change image every duration ms
			} else {setTimeout(endaudioFile, duration)};
			break;
	}
}

function endaudioFile() {
	document.getElementById("audioTest").innerHTML = '<h1>Please repeat the words</h1><div class="fakeButton centered" id="audioButton" onclick="moveTo(\'test\')">next</div>'; // select the word based on the number in list B
	document.getElementById("audioButton").style.display = "block";
}

function downloadResults() {
    var x = document.getElementById("frm1");
    var i;
    for (i = 0; i < x.length ;i++) {
		if(x.elements[i].type == 'radio') {
			if(x.elements[i].checked) {downloadText += x.elements[i].value + ","};
		} else {
			downloadText += x.elements[i].value + ",";
		}
    }
	var data = new Blob([downloadText], {type: 'text/plain'});
	var link = document.createElement('a');
	link.setAttribute('download', timestamp + '.csv');
	link.href = window.URL.createObjectURL(data);
	document.body.appendChild(link);
	
	// wait for the link to be added to the document
	window.requestAnimationFrame(function () {
			var event = new MouseEvent('click');
			link.dispatchEvent(event);
			document.body.removeChild(link);
	});
}





/*
1     the 
2     be 
3     to 
4     of 
5     and 
6     a 
7     in 
8     that 
9     have 
10    I 
11    it 
12    for 
13    not 
14    on 
15    with 
16    he 
17    as 
18    you 
19    do 
20    at 
21    this 
22    but 
23    his 
24    by 
25    from 
26    they 
27    we 
28    say 
29    her 
30    she 
31    or 
32    an 
33    will 
34    my 
35    one 
36    all 
37    would 
38    there 
39    their 
40    what 
41    so 
42    up 
43    out 
44    if 
45    about 
46    who 
47    get 
48    which 
49    go 
50    me 
51    when 
52    make 
53    can 
54    like 
55    time 
56    no 
57    just 
58    him 
59    know 
60    take 
61    people 
62    into 
63    year 
64    your 
65    good 
66    some 
67    could 
68    them 
69    see 
70    other 
71    than 
72    then 
73    now 
74    look 
75    only 
76    come 
77    its 
78    over 
79    think 
80    also 
81    back 
82    after 
83    use 
84    two 
85    how 
86    our 
87    work 
88    first 
89    well 
90    way 
91    even 
92    new 
93    want 
94    because 
95    any 
96    these 
97    give 
98    day 
99    most 
100   us 
*/