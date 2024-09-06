export const miniPlayerScript = () => {
    // console.log("is script file loadedxxxx?")
    // console.log("floating button: ", document.querySelector(".floatingBtn"))
  
    document.querySelector(".floatingBtn").addEventListener(
      "click",
      function () {
        this.classList.remove("floatingBtn");
      },
      true
    );
  
    document.querySelector(".miniPlayer .close").addEventListener(
      "click",
      function () {
        document.querySelector(".miniPlayer").classList.add("floatingBtn");
      },
      true
    );
  
    // tooptip (progress bar)
    // document.querySelector(".progress").addEventListener(
    //   "mouseover",
    //   function () {
    //     document.querySelector(".tooltip").style.display = "block";
    //   },
    //   true
    // );
  
    // document.querySelector(".progress").addEventListener(
    //   "mouseout",
    //   function () {
    //     document.querySelector(".tooltip").style.display = "none";
    //   },
    //   true
    // );


    // console.log("hello script file")
  
  }
  
  
  
  
  