const constants = require("./constants");

//We need to define max threshold values for all factors
//Return Paramter Score given its current value,max value, and paramter wieght
const getParamScore = (param,maxValue,weight=1) => {    
    const score = (Math.log(1+param) / Math.log(1+Math.max(param,maxValue))) * weight;
    return score;
}

const getRepositoryScore = (repo,additionalParams=null) => {

    var additionalParamScore = 0;
    var criticalityScore = 0;
    var totalWeight = constants.FORKS_WEIGHT+constants.STARS_WEIGHT+constants.CLOSEDISSUE_WEIGHT+constants.CONTRIBUTORS_WEIGHT+constants.COMMITFREQUENCY_WEIGHT;

    // additionalParams.map((additionalParam)=>{
    //     additionalParamScore += getParamScore(additionalParam.value,additionalParam.max_threshold,additionalParam.weight);
    // })   

    //Validating
    if(additionalParams.forks==null){
        additionalParams.forks=0;
    } 
    if(additionalParams.stars==null){ 
        additionalParams.stars =0;
    }
    if(additionalParams.closedIssues==null){
        additionalParams.closedIssues=0;
    }
    if(additionalParams.pullRequestContributors==null){
        additionalParams.pullRequestContributors=0;
    }
    if(additionalParams.commitCount4W==null){
        additionalParams.commitCount4W=0;
    }

    criticalityScore = parseFloat((
        (getParamScore(
            additionalParams.forks,constants.FORKS_THRESHOLD,constants.FORKS_WEIGHT
        )) +
        (getParamScore(
            additionalParams.stars,constants.STARS_THRESHOLD,constants.STARS_WEIGHT
        )) +
        (getParamScore(
            additionalParams.closedIssues,constants.CLOSEDISSUE_THRESHOLD,constants.CLOSEDISSUE_WEIGHT
        )) +
        (getParamScore(
            additionalParams.pullRequestContributors,constants.CONTRIBUTORS_THRESHOLD,constants.CONTRIBUTORS_WEIGHT
        )) +
        (getParamScore(
            additionalParams.commitCount4W, constants.COMMITFREQUENCY_THRESHOLD,constants.COMMITFREQUENCY_WEIGHT
        )) + additionalParamScore) 
         / totalWeight).toFixed(5);
        
        
        criticalityScore = Math.max(Math.min(criticalityScore,1),0);
        return criticalityScore;

}

module.exports = getRepositoryScore;