function encodeMatrix(inpMat, keyMat){
    // No non-sqare matrixes
    if (keyMat.size()[0] != keyMat.size()[1]){
      throw new Error('Key Matrix is not a square! Jail!');
    }
  }
  function dotProd(mat1, mat2){
    if (mat1.size()[1] != mat2.size()[0]){
      throw new Error('Dot product can not be found!');
    }
    let outpMat = math.zeros(mat1.size()[0],mat2.size()[1])
    outpMat.forEach(function(value, index, matrix){
      let accum = 0
      for(let n = 0; n < mat1.size()[1]; n++){
        accum += mat1.get([index[0],n]) * mat2.get([n,index[1]])
      }
      matrix.set(index, accum)
    })
    printMatrix(outpMat)
    printMatrix(math.multiply(mat1, mat2))
    return(math.multiply(mat1, mat2))
  }
  function printMatrix(inpMat){
    let outP = ""
    for(let r = 0; r < inpMat.size()[0]; r++){
      let line = "| "
      for(let c = 0; c < inpMat.size()[1]; c++){
        line += inpMat.get([r, c]).toString() + "\t| "
      }
      outP += line + "\n"
    }
    console.log(outP)
  }
  
  
  // Page JS
  let rows = [4,4];
  let columns = [4,4];
  
  let inputBoxLine = [`<input type='text' class='n_inputLetterBox' maxlength='1'>`,`<input type='number' oninput="this.value = this.valueAsNumber" class='n_inputNumberBox'>`];
  for (let n = 1; n <= 16; n++){
      $('.n_inputBox:eq(0)').append(inputBoxLine[0])
    $('.n_inputBox:eq(1)').append(inputBoxLine[1])
  }
  function addColumns(ind){
    for(let n = 0; n < rows[ind]; n++){
      $(`.n_inputBox:eq(${ind})`).append(inputBoxLine[ind])
    }
  
    
    $(`.n_inputBox:eq(${ind})`).css('grid-template-columns',`repeat(${columns[ind]+1}, 1fr)`)
    columns[ind]++
  }
  function removeColumns(ind){
    if(columns[ind] <= 1){
      console.log("ERR - Not enough columns")
      return
    }
    for(let n = rows[ind]*columns[ind]; n >= rows[ind] * (columns[ind]-1); n--){
      $(`.n_inputBox:eq(${ind})`).children().eq(n).remove()
    }
  
    
    $(`.n_inputBox:eq(${ind})`).css('grid-template-columns',`repeat(${columns[ind]-1}, 1fr)`)
    columns[ind]--
  }
  function addRows(ind){
    for(let n = 0; n < columns[ind]; n++){
      $(`.n_inputBox:eq(${ind})`)
        .append(inputBoxLine[ind])
    }
  
    
    $(`.n_inputBox:eq(${ind})`).css('grid-template-rows',`repeat(${rows[ind]+1}, 1.25em)`)
    rows[ind]++
  }
  function removeRows(ind){
    if(rows[ind] <= 1){
      console.log("ERR - Not enough rows")
      return
    }
    for(let n = columns[ind]*rows[ind]; n >= columns[ind] * (rows[ind]-1); n--){
      $(`.n_inputBox:eq(${ind})`).children().eq(n).remove()
    }
  
    
    $(`.n_inputBox:eq(${ind})`).css('grid-template-rows',`repeat(${rows[ind]-1}, 1.25em)`)
    rows[ind]--
  }
  
  
  $(document).ready(function () 
  {
      $('.n_inputBox:first').on("keypress", ".n_inputLetterBox", function ()
      {
        if(event.key != "Backspace" && event.key != "Delete"){
            $(this).next()
            .focus();
        }
      });
      $('.n_inputBox').on("focus", ".n_inputLetterBox", function ()
      {
        $(this).select();
      });
  });