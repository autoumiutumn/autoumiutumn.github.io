let mode = ""

// RUNE SPECIFIC
function inputRune(thButt){
  inputRune_chr(thButt.value)
}
function inputRune_unk(){
  inputRune_chr("_")
}
function inputRune_chr(inp){
  $("#entryBox").append(`<span class="runeBit">${inp}</span>`)
}

// IPA SPECIFIC
$(".keyBL").click(function(){
  let v = $(this).attr("value")
  let t = $(this).text()
  
  $("#entryBox").append(`<button onclick="playS(this)" value="${v}" class="ipaBit">${t}</button>`)
})
// ^- Adds text into input function

function ipaSpace(){
  $("#entryBox").append(`<button value="space" class="ipaBit">   </button>`)
}

function playS(thButt){
  console.log(`/sounds/${thButt.value}.ogg`)
  var audio = new Audio(`/sounds/${thButt.value}.ogg`);
  audio.play();
}

// USED BY BOTH
function delChr(){
  $("#entryBox").children().last().remove()
}

function clearBox(){
  if(confClear()){
    console.log("Cleared")
    $("#entryBox").children().remove()
    subm()
  }
}


function subm(){
  let str = ""
  
  if (mode == "enc"){
    $("#entryBox").children().each(function( index ){
      let inp = $(this).attr("value")
      let outp = ""
      
      switch(inp){
        case "b":
          outp = "b"
          break;
        
        case "d":
          outp = "d"
          break;

        case "f":
          outp = "f"
          break;

        case "g":
          outp = "g"
          break;

        case "j":
          outp = "j"
          break;

        case "h":
          outp = "h"
          break;

        case "c":
          outp = "k"
          break;

        case "ch":
          outp = "c"
          break;

        case "l":
          outp = "l"
          break;

        case "m":
          outp = "m"
          break;

        case "n":
          outp = "n"
          break;

        case "ng":
          outp = "N"
          break;

        case "p":
          outp = "p"
          break;

        case "r":
          outp = "r"
          break;

        case "s":
          outp = "s"
          break;

        case "sh":
          outp = "S"
          break;

        case "t":
          outp = "t"
          break;

        case "th":
          outp = "T"
          break;

        case "v":
          outp = "v"
          break;

        case "w":
          outp = "w"
          break;

        case "y":
          outp = "y"
          break;

        case "z":
          outp = "z"
          break;

        case "zh":
          outp = "Z"
          break;

        // VOWELS
        case "schwa":
          outp = "a"
          break;

        case "ah":
          outp = "A"
          break;

        case "a":
          outp = "B"
          break;

        case "aw":
          outp = "E"
          break;

        case "eh":
          outp = "e"
          break;

        case "uh":
          outp = "u"
          break;

        case "u":
          outp = "U"
          break;

        case "oh":
          outp = "o"
          break;

        case "uu":
          outp = "O"
          break;

        case "oo":
          outp = "P"
          break;

        case "ih":
          outp = "i"
          break;

        case "ee":
          outp = "I"
          break;

        // DIPTHONGS
        case "eye":
          outp = "Ai"
          break;

        case "ow":
          outp = "AO"
          break;

        case "ei":
          outp = "ei"
          break;

        case "oy":
          outp = "oi"
          break;

        case "ea":
          outp = "ia"
          break;

        case "oa":
          outp = "Oa"
          break;

        default:
          outp = inp
          break;
      }
      
      str = str.concat(outp)
    })
  } else {
    let skip = false
    $("#entryBox").children().each(function( index ){
      if (skip){
        skip = false
        return ;
      }
      
      let inp = $(this).text()
      let outp = ""
      
      if ("aBcEINPSTUuZ".indexOf(inp) != -1){
        // Alt spelling
        switch(inp){
          // aBcEIN
          case "a":
            outp = "ə"
            // schwaFlag = true
            break;
          case "B":
            outp = "ae"
            break;
          case "c":
            outp = "ch"
            break;
          case "E":
            outp = "aw"
            break;
          case "I":
            outp = "ee"
            break;
          case "N":
            outp = "ng"
            break;
          // PSTUuZ
          case "P":
            outp = "oo"
            break;
          case "S":
            outp = "sh"
            break;
          case "T":
            outp = "th"
            break;
          case "U":
            outp = "ur"
            break;
          case "u":
            outp = "uh"
            break;
          case "Z":
            outp = "zh"
            // vpvfFlag = true (zh is ipa#135)
            break;
        }
      } else if ("AeiOo".indexOf(inp) != -1){
        // Potential Dipthong, look at next chr
        let nextInp = $(this).next().text()
        skip = true
        // FOR DEFAULTS, MAKE SKIP = FALSE
        switch(inp){
          case "A":
            switch(nextInp){
              case "i":
                outp = "eye"
                break;
              case "O":
                outp = "ow"
                break;
              default:
                skip = false
                outp = "ah"
                break;
            }
            break;
          case "e":
            switch(nextInp){
              case "i":
                outp = "ay"
                break;
              case "a":
                outp = "ai"
                break;
              default:
                skip = false
                outp = "eh" //e or eh
                break;
            }
            break;
          case "i":
            switch(nextInp){
              case "a":
                outp = "ee"
                break;
              default:
                skip = false
                outp = "ih" //i or ih
                break;
            }
            break;
          case "O":
            switch(nextInp){
              case "a":
                outp = "oo"
                break;
              default:
                skip = false
                outp = "uu"
                break;
            }
            break;
          case "o":
            switch(nextInp){
              case "i":
                outp = "oy"
                break;
              default:
                skip = false
                outp = "oh"
                break;
            }
            break;
        }
      } else if ("bdfghklmnprstvwyzj _".indexOf(inp) != -1){
        // Enter as is
        outp = inp
      }
      str = str.concat(outp)
    })
  }
  $("#outPBox")
      .empty()
      .text(str)
}

function confClear(){
  return(confirm("This action will clear the input box and cannot be undone, are you sure you want to continue? \nClick OK to clear, click Cancel to abort."))
}

//--

switchTo("dec")

function switchTo(code){
  if (code == "dec"){
    $("#controllerSwap").text("DECODE MODE")
    $(".runeKeyboard").show()
    $(".ipaKeyboard").hide()
    $("#outPBox").removeClass("outPBoxRune")
    mode = "dec"
  } else {
    $("#controllerSwap").text("ENCODE MODE")
    $(".ipaKeyboard").show()
    $(".runeKeyboard").hide()
    $("#outPBox").addClass("outPBoxRune")
    mode = "enc"
  }
}

function switchModes(){
  console.log("Cleared. Switching")
    $("#entryBox").children().remove()
    val = $("#controllerSwap").text()
    if (val.includes("ENCODE")){
      switchTo("dec")
    } 
    else if (val.includes("DECODE")){
      switchTo("enc")
    } 
    else{
      console.log(`val [${val}] not found, assuming DECODE MODE`)
      switchTo("dec")
    }
}

$("#controllerSwap").click(function(){
  if ($("#entryBox").children().length == 0){
    switchModes()
  } else {
    if (confClear()){
      switchModes()
    }
  }
})