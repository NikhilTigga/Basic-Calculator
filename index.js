
// select all button with calss c
const buttons= document.querySelectorAll('.c');
const screen =document.querySelector('.calculatorScreen')

// mouse clicked detection

function calculateTheValue(input){
    try{
         const result = math.evaluate(input);
        // Flatten nested arrays/matrices to scalar values if possible
        const getScalar = val => {
            if (Array.isArray(val)) {
                return getScalar(val[0]); // Recursively unwrap
            } else if (val && typeof val === 'object' && 'valueOf' in val) {
                return val.valueOf(); // For math.js types
            }
            return val;
        };

        const displayResult = getScalar(result);
        screen.textContent = displayResult.toString();
   
    }
    catch(error){
        console.log(error);
    }
    


}

buttons.forEach(button =>{

    button.addEventListener('click',()=>{
        console.log('Button clicked', button.textContent);
      
        if(button.textContent==='c'){
            screen.textContent=''

        }
        else if(button.textContent==='='){
            calculateTheValue(screen.textContent)
        }else if(button.textContent==="X"){
            screen.textContent=screen.textContent.slice(0, -1);

        }
        else{
             screen.textContent+=button.textContent;// Append clicked value to screen
             // Auto-scroll to the right
             screen.scrollLeft = screen.scrollWidth;
        }
    })

})

//keyboard detection

document.addEventListener('keydown',(event)=>{
    const key=event.key;

    //Match key pressed with button pressed

    buttons.forEach(button=>{
        if(button.textContent===key ||
            (key==='Enter'&& button.textContent==='=')||
            (key==='*' && button.textContent==='x')||
            (key==='Backspace' && button.textContent==='X')
        )
        {
            console.log ('Key pressed', key, '-> Button match:',button.textContent);
             button.classList.add('active');
             setTimeout(()=> button.classList.remove('active'), 150)

             // Append key value to screen 
             const value=key==='Enter'?'=':key==='Backspace'?'X':key;
             if(value==='c'){
              screen.textContent='';
             }else if(value==='='){
                calculateTheValue(screen.textContent)
             }else if(value==="X"){
                screen.textContent=screen.textContent.slice(0, -1);
             }
             else{
                screen.textContent+=value;
                // Auto-scroll to the right
                screen.scrollLeft = screen.scrollWidth;

             }
             
        }
    })
   
    
})