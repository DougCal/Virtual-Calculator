var str = '';
var smallStr = '';
var oper = [];
var operand = '';
var total = '';
var prevOper = [];

$('.roundCorners').click(function(num){
  
  num = $(this).text().split(/\s/).join('');   //converts entries to a single char
  
  if(num === 'X'){  //makes x lowercase
    
    num = num.toLowerCase();
    
  }else if(operand + num === '0' && str === '' || operand + str + num === operand + '0' + num && !isNaN(+num) && num !== '.'){
    
    str = num;
    smallStr = smallStr.slice(0, -1);
    smallStr = smallStr.concat(num);
    
    return $('#shiftSome').html(operand + str + '\n' + '<span style="font-size: 10px">' + smallStr + '</span>'); 
  }

  if(!isNaN(total) && smallStr === '' && isNaN(num) && num !== '.'){  //when equals has been clicked, reassign oper to equal the total returned
    
    oper = [total];
    smallStr = total.toString();
  }

  if(num === '='){  //makes all strings blank before returning the total to #screen and then makes oper blank after

    if(str === ''){  //if '=' is clicked again after it was just clicked, do the previous operation again and add that to total
      
      total = calculate([total, prevOper.join('').substr(1)]);
      return $('#shiftSome').text(total);
    }
    
      oper.push(str);
      str = '';
      smallStr = '';
      operand = '';
      total = calculate(oper);
      prevOper = oper;
      $('#shiftSome').text(total);
    
      oper = [];
  
  }else if(num === 'CE' || num === 'AC'){  //clears contents of the calculator when CE or AC is clicked
    
    oper = [];
    str = '';
    smallStr = '';
    operand = '';
    total = '';
    
    $('#shiftSome').text(str);
    
  }else if(isNaN(+smallStr.substr(-1)) && isNaN(+num)){ //Checks if an operative or '.' is being clicked after already being clicked
    
    if(num !== '.'){
      
      smallStr = smallStr.slice(0, -1);
      smallStr = smallStr.concat(num);
      
      oper.pop();
      oper.push(smallStr.substr(-2));
      
      operand = num;
      
      $('#shiftSome').html(operand + str + '\n' + '<span style="font-size: 10px">' + smallStr + '</span>');
      
    }else{
      
      $('#shiftSome').html(operand + str + '\n' + '<span style="font-size: 10px">' + smallStr + '</span>');
    }
    
  }else if(isNaN(+num) & num !== '.'){  //when an operation is clicked, push the digits plus the operation to oper
    
    $('#shiftSome').html(num + '\n' + '<span style="font-size: 10px">' + smallStr + num + '</span>');
  
    smallStr += num;
    operand = num;
    
    if(num === 'x'){  //when the operation is 'x', change it to '*' so it will multiply in the eval() function, then push to oper
      
      num = '*';
      oper.push(str + num);
      
    }else if(num === '÷'){  //when the operation is '÷', change it to '/' so it will divide in the eval() function, then push to oper
      
      num = '/';
      oper.push(str + num);
      
    }else{
      
      oper.push(str + num);
    }
    
    str = '';           //reassign str to an empty string so on the #screen it will show something like 'x' when displaying operation + str

  }else{                //if num is a number, just concatenate it to both strings for #screen to display
    
    str = str.concat(num);
    smallStr = smallStr.concat(num);
  
    $('#shiftSome').html(operand + str + '\n' + '<span style="font-size: 10px">' + smallStr + '</span>');
  }
})

function calculate(oper){  
  oper = oper.join('');
  
  var evaluated = eval(oper).toString();  
 
  if(evaluated.length < 16){  //if evaluated is a small number, just return the number
    
    return evaluated;
    
  }else if(evaluated.length > 15 && evaluated % 1 === 0){  //if evaluated is a large number and is not a decimal, return it in scientific notation 
    
    return evaluated.toExponential(12);
    
  }else if(evaluated.toString().split('.')[1].length > 12){  //if evaluated has many digits for a decimal, return 'toFixed(digitsAfterDecimal.length-digitsBeforeDecimal.length)' so the total digits displayed will always be 13
    
    return Number(evaluated).toFixed(14-evaluated.toString().split('.')[0].length);
    
  }else{  //if for some reason the number gets past all these conditions, just return it in scientific notation
    
    return evaluated.toExponential(12);
  }
}