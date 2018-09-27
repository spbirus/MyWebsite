// VARIABLES
var name1;
var name2;
var b1;
var b2;
var birthday1;
var birthday2;
var piecesLeft1 = 21;
var piecesLeft2 = 21;
var currentPlayer = 1; //TODO: need to figure out how to change the currentPlayer
// var regexNum = /(\d{2}|\d{1})(\/|-)\d{1,2}(\/|-)(\d{4}|\d{2})/gm;
// var regexWord = /(\w{3}|\w{3,7})(\s|\.\s)\d{1,2}\,\s(\d{4}|\d{2})/gm;
var regexAll = /(\w+)(\/|\-|\.\s|\s)(\d{2}|\d{1})(\/|\-|,\s)(\d{4}|\d{2})/gm;
var rowA = 6;
var rowB = 6;
var rowC = 6;
var rowD = 6;
var rowE = 6;
var rowF = 6;
var rowG = 6;
var board = [
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0]
];
var clickedSquare = null;
//TIMER
var totalSeconds = 0;

// FUNCTIONS
function SubmitButton()
{

  var playerLabel = document.getElementById('player-nlabel').textContent.split(" ");
  // PLAYER 1 ------------------------------------------------------------------
  if(playerLabel[1] == "1")
  {
    name1 = document.getElementById('player-ninput').value;
    b1 = document.getElementById('player-sinput').value;

    document.getElementById('player1-name').innerHTML = name1;
    if(name1 == "")
    {
      alert("You need to enter a name!");
      return;
    }

    if(b1 == "")
    {
      alert("You need to enter your birthday!");
      return;
    }else{
      if(regexAll.test(b1) === true || regexAll.test(b1) === true){
        birthday1 = new Date(b1);
        if(!isValidDate(birthday1)){
          alert("Please submit a VALID birthday in the right format. Such as 'MM/DD/YYYY' or 'MMM. D, YY'");
          return;
        }
      }else {
        alert("Please submit your birthday in the right format. Such as 'MM/DD/YYYY' or 'MMM. D, YY'");
        return;
      }
    }

      // All values are inputed so move on
      //TODO: validate the birthday using REGEX


      // Change the boxes and labels for player 2
      document.getElementById('player-ninput').value = null;
      document.getElementById('player-sinput').value = null;
      document.getElementById('player-nlabel').innerHTML='Player 2';


  }
  // PLAYER 2 ------------------------------------------------------------------
  else
  {
    name2 = document.getElementById('player-ninput').value;
    b2 = document.getElementById('player-sinput').value;

    document.getElementById('player2-name').innerHTML = name2;
    if(name2 == "")
    {
      alert("You need to enter a name!");
      return;
    }

    if(b2 == "")
    {
      alert("You need to enter your birthday!");
      return;
    }else{
      if(regexAll.test(b2) === true || regexAll.test(b2) === true){
        birthday2 = new Date(b2);
        if(!isValidDate(birthday2)){
          alert("Please submit a VALID birthday in the right format. Such as 'MM/DD/YYYY' or 'MMM. D, YY'");
          return;
        }
      }else {
        alert("Please submit your birthday in the right format. Such as 'MM/DD/YYYY' or 'MMM. D, YY'");
        return;
      }
    }
      // All values are inputed so move on
      //TODO: validate the birthday using REGEX
      //TODO: set currentPlayer based off of whos birthday is earlier

      document.getElementById('player').style.display='none';
      document.getElementById('startpage').style.display='block';

      if(birthday1 <= birthday2)
      {
        currentPlayer = 1;
        document.getElementById('start-label').innerHTML = name1 + ", it's your turn!";
      }else {
        currentPlayer = 2;
        document.getElementById('start-label').innerHTML = name2 + ", it's your turn!";
      }

  }

}

function CancelButton(modalName)
{
  document.getElementById(modalName).style.display='none';
}

function StartButton()
{
  document.getElementById('startpage').style.display='none';
  setInterval(setTime, 1000);

}

function SquareClick(elementID)
{
  switch(elementID) {
    case "A":
      if(rowA == 0)
      {
        alert("This column is full. Choose another location.");
        return;
      }
      break;
    case "B":
      if(rowB == 0)
      {
        alert("This column is full. Choose another location.");
        return;
      }
      break;
    case "C":
      if(rowC == 0)
      {
        alert("This column is full. Choose another location.");
        return;
      }
      break;
    case "D":
      if(rowD == 0)
      {
        alert("This column is full. Choose another location.");
        return;
      }
      break;
    case "E":
      if(rowE == 0)
      {
        alert("This column is full. Choose another location.");
        return;
      }
      break;
    case "F":
      if(rowF == 0)
      {
        alert("This column is full. Choose another location.");
        return;
      }
      break;
    case "G":
      if(rowG == 0)
      {
        alert("This column is full. Choose another location.");
        return;
      }
      break;
    default:
        return;
  }
  if(clickedSquare == null)
  {
    clickedSquare = elementID;

    //highlight the square a different color for astetics
    if(currentPlayer == 1)
    {
      document.getElementById(elementID).style.backgroundColor = "#ff0000";
      document.getElementById('player1-place').disabled = false;
    }else
    {
      document.getElementById(elementID).style.backgroundColor = "#000000";
      document.getElementById('player2-place').disabled = false;
    }
  }
  else if(clickedSquare == elementID)
  {
    Unclick(elementID);
  }
  else
  {
    alert("You can only place once a turn. Unclick the first location then select a new one.");
  }
}

function Unclick(elementID)
{
  if(clickedSquare == elementID)
  {
    clickedSquare = null;
    document.getElementById(elementID).style.backgroundColor = "#ffff00";
    if(currentPlayer == 1)
    {
      document.getElementById('player1-place').disabled = true;
    }
    else if(currentPlayer == 2)
    {
      document.getElementById('player2-place').disabled = true;
    }
  }

}


function PlacePiece()
{
  //unhighlights the column selection
  document.getElementById(clickedSquare).style.backgroundColor = "#ffff00"

  //lock the place buttons again
  document.getElementById('player1-place').disabled = true;
  document.getElementById('player2-place').disabled = true;

  //find actual square
  switch(clickedSquare){
    case "A":
      var actualSquare = String(clickedSquare) + rowA; //calculate backgroundPosition
      //enter it into the board array
      if(currentPlayer == 1){
        board[rowA-1][0] = 1;
      }else{
        board[rowA-1][0] = 2;
      }
      rowA--;
      break;
    case "B":
      var actualSquare = String(clickedSquare) + rowB; //calculate backgroundPosition
      //enter it into the board array
      if(currentPlayer == 1){
        board[rowB-1][1] = 1;
      }else{
        board[rowB-1][1] = 2;
      }
      rowB--;
      break;
    case "C":
      var actualSquare = String(clickedSquare) + rowC; //calculate backgroundPosition
      //enter it into the board array
      if(currentPlayer == 1){
        board[rowC-1][2] = 1;
      }else{
        board[rowC-1][2] = 2;
      }
      rowC--;
      break;
    case "D":
      var actualSquare = String(clickedSquare) + rowD; //calculate backgroundPosition
      //enter it into the board array
      if(currentPlayer == 1){
        board[rowD-1][3] = 1;
      }else{
        board[rowD-1][3] = 2;
      }
      rowD--;
      break;
    case "E":
      var actualSquare = String(clickedSquare) + rowE; //calculate backgroundPosition
      //enter it into the board array
      if(currentPlayer == 1){
        board[rowE-1][4] = 1;
      }else{
        board[rowE-1][4] = 2;
      }
      rowE--;
    break;
    case "F":
      var actualSquare = String(clickedSquare) + rowF; //calculate backgroundPosition
      //enter it into the board array
      if(currentPlayer == 1){
        board[rowF-1][5] = 1;
      }else{
        board[rowF-1][5] = 2;
      }
      rowF--;
      break;
    case "G":
      var actualSquare = String(clickedSquare) + rowG; //calculate backgroundPosition
      //enter it into the board array
      if(currentPlayer == 1){
        board[rowG-1][6] = 1;
      }else{
        board[rowG-1][6] = 2;
      }
      rowG--;
      break;
  }

  if(currentPlayer == 1)
  {
    document.getElementById(actualSquare).style.background = "url('images/red-circle.png')";
    document.getElementById(actualSquare).style.backgroundRepeat = "no-repeat";
    document.getElementById(actualSquare).style.backgroundPosition = "center center";

    //subtract pieces
    piecesLeft1--;
    document.getElementById("pieces1").innerHTML = piecesLeft1;

    //check for a win
    if(checkWin(board) == "yay"){
      setTimeout(function(){ alert(name1 + " wins in " + totalSeconds + " seconds!"); }, 50);
      // alert(name1 + " wins in " + totalSeconds + " seconds!");
      //add to local storage
      addToLocalStorage(name1);
      //remove table
      removeTable();
      //display the scores
      displayScores();
    }
    //alert who has the next turn
    // setTimeout(function(){ alert("It is now " + name2 +"\'s turn"); }, 50);

    currentPlayer = 2;
  }else
  {
    document.getElementById(actualSquare).style.background = "url('images/black-circle.png')";
    document.getElementById(actualSquare).style.backgroundRepeat = "no-repeat";
    document.getElementById(actualSquare).style.backgroundPosition = "center center";

    //subtract pieces
    piecesLeft2--;
    document.getElementById("pieces2").innerHTML = piecesLeft2;

    //check for a win
    if(checkWin(board) == "yay"){
      setTimeout(function(){ alert(name2 + " wins in " + totalSeconds + " seconds!"); }, 50);
      // alert(name2 + " wins in " + totalSeconds + " seconds!");
      //add to local storage
      addToLocalStorage(name2);
      //remove table
      removeTable();
      //display the scores
      displayScores();
    }
    //alert who has the next turn
    // setTimeout(function(){ alert("It is now " + name1 +"\'s turn"); }, 50);

    currentPlayer = 1;
  }



  clickedSquare = null; //have to set back to null to be used again
}

function removeTable(){
  var parent = document.querySelector(".column.middle");
  if (parent.hasChildNodes()){
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
      parent.removeChild(children[i]);
    }
  }
}

function displayScores(){
  var table  = document.createElement('table');
  table.setAttribute('id', 'table')
  parent.appendChild(table);
  for (var i = 0; i <= 10 ; i++) {
      var row = document.createElement('tr');
      for (var j = 0; j < 2; j++ ) {
          var cell = document.createElement('td');
          if(i == 0 && j == 0){
            cell.innerHTML = "Names";
          }
          else if(i == 0 && j == 1){
            cell.innerHTML = "Times (seconds)";
          }
          else{
            if(localStorage.getItem(i-1) !== null){
              cell.innerHTML = localStorage.getItem(i-1).split(",")[j];
            }else{

              cell.innerHTML = "Empty";
            }
          }

          row.appendChild(cell);
      }
      document.querySelector("#table").appendChild(row);
  }
  var button = document.createElement('button');
  button.setAttribute("onclick","makeBoardAgain();");
  button.innerHTML = "Click me to play a new game!";
  document.querySelector("#table").appendChild(button);

}

function makeBoardAgain(){
  //remove everything from the board
  removeTable();

  //make the table
  var letters = ['','A','B','C','D','E','F','G'];
  var numbers = ['','1','2','3','4','5','6'];
  var parent = document.querySelector(".column.middle");
  if (parent.hasChildNodes()){
      var children = parent.childNodes;
      for (var i = 0; i < children.length; i++) {
          parent.removeChild(children[i]);
      }
  }
  var table  = document.createElement('table');
  table.setAttribute('id', 'table')
  parent.appendChild(table);
  for (var i = 0; i < 7 ; i++) {
      var row = document.createElement('tr');
      for (var j = 0; j < 8; j++ ) {
          var cell = document.createElement('td');
          //cell.innerHTML = letters[i] + j;
          if(i == 0){
            cell.innerHTML = letters[j];
            cell.setAttribute("onclick","SquareClick('"+letters[j]+"');");
            cell.setAttribute("id",letters[j]);

          }
          else if(j == 0){
            cell.innerHTML = numbers[i];
          }
          else{
            //add the style
            cell.setAttribute("class" , "row");
            cell.setAttribute("id", letters[j]+numbers[i]);
          }
          row.appendChild(cell);
      }
      document.querySelector("#table").appendChild(row);
  }

  //reset everything
  totalSeconds = 0;
  piecesLeft1 = 21;
  piecesLeft2 = 21;
  board = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ];
  rowA = 6;
  rowB = 6;
  rowC = 6;
  rowD = 6;
  rowE = 6;
  rowF = 6;
  rowG = 6;
  console.log("reseting the rows");
  clickedSquare = null;
  currentPlayer = 1;
}

function addToLocalStorage(name){
  for(i = 0; i < 10; i++){
    if(localStorage.getItem(i) != null && parseInt(localStorage.getItem(i).split(",")[1]) > totalSeconds){
      for(j = 9; j > i; j--){
        localStorage.setItem(j, localStorage.getItem(j-1));
      }
      localStorage.setItem(i, name+"," +totalSeconds);
      break;
    }
    else if(localStorage.getItem(i) == null){
      //there are not yet 10 scores
      localStorage.setItem(i, name+"," +totalSeconds);
      break;
    }
  }
}

function chkLine(a,b,c,d) {
    // Check first cell non-zero and all cells match
    return ((a != 0) && (a ==b) && (a == c) && (a == d));
}

function checkWin(bd) {
    // Check down
    for (r = 0; r < 3; r++)
        for (c = 0; c < 7; c++)
            if (chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c]))
            {
                return "yay";
            }

    // Check right
    for (r = 0; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3]))
            {
               return "yay";
            }

    // Check down-right
    for (r = 0; r < 3; r++)
        for (c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3]))
            {
                return "yay";
            }

    // Check down-left
    for (r = 3; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r-1][c+1], bd[r-2][c+2], bd[r-3][c+3]))
            {
                return "yay";
            }

    return 0;
}

function setTime() {
  ++totalSeconds;
  document.getElementById("seconds").innerHTML = pad(totalSeconds % 60);
  document.getElementById("minutes").innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
