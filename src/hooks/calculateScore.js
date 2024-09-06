import _ from 'lodash'

const calculateScore = (answers, result) => {

    let userScore = 0

    let resultWithCorrectAnswers = _.cloneDeep(result)

    if(answers?.length > 0 && result?.length > 0){

      answers.forEach((answer, index1) => {

        let correctIndexes = []
        let checkedIndexes = []
  
        answer.options.forEach((option, index2) => {
          if(option.correct){
            correctIndexes.push(index2)
  
            //also put the 'correct' answers to user submitted 'result' array
            resultWithCorrectAnswers[index1].options[index2].correct = true
  
          }
          if(resultWithCorrectAnswers[index1].options[index2].checked){
            checkedIndexes.push(index2)
            
          }
  
          // console.log("checked indexes: ", checkedIndexes)
          // console.log("correct indexes: ", correctIndexes)
  
  
        })
  
        //now compare the correctIndexes and checkedIndexes array
        if(_.isEqual(correctIndexes, checkedIndexes)){
          userScore += 5
        }
  
        
      });
  

    }


    // console.log("result with correct ans: ", resultWithCorrectAnswers)
    // console.log("userScore: ", userScore)

    // if(resultWithCorrectAnswers.length > answers.length){
    //   resultWithCorrectAnswers[answers.length] = {userScore}
    // } else {
    //   resultWithCorrectAnswers[result.length] = {userScore}

    // }

    //update the 'user answers with correct answers array' to db
    // dispatch(updateResult({id, uid, resultWithCorrectAnswers}))
    // dispatch(updateResultScore({id, uid, userScore}))

    return ({
        userScore,
        resultWithCorrectAnswers
    })
    

  }

  export default calculateScore
