export const progressBarScript = () => {
    // console.log("is script file loadedxxxx?")
    // console.log("progress bar: ", document.querySelector(".progress"))
  

    // tooptip (progress bar)
    document.querySelector(".progress").addEventListener(
      "mouseover",
      function () {
        document.querySelector(".tooltip").style.display = "block";
      },
      true
    );
  
    document.querySelector(".progress").addEventListener(
      "mouseout",
      function () {
        document.querySelector(".tooltip").style.display = "none";
      },
      true
    );


    // console.log("hello script file")
  
  }
  
  
  
  
  