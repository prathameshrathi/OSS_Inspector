const constants = require("./constants");

//We need to define max threshold values for all factors
//Return Paramter Score given its current value,max value, and paramter wieght
const getParamScore = (param,maxValue,weight=1) => {    
    const score = (Math.log(1+param) / Math.log(1+Math.max(param,maxValue))) * weight;
    return score;
}

const getRepositoryScore = (additionalParams) => {

    console.log(additionalParams);
    const additionalParamScore = 0;
    var criticalityScore = 2;
    var totalWeight = constants.FORKS_WEIGHT+constants.STARS_WEIGHT+constants.CLOSEDISSUE_WEIGHT+constants.CONTRIBUTORS_WEIGHT+constants.COMMITFREQUENCY_WEIGHT+constants.CREATED_AT_WEIGHT+constants.UPDATED_AT_WEIGHT+constants.RELEASES_WEIGHT;

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
    if(additionalParams.created_at==null){
        additionalParams.created_at=0;
    }
    if(additionalParams.updated_at==null){
        additionalParams.updated_at=0;
    }
    if(additionalParams.releases==null){
        additionalParams.releases=0;
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
        ))+
        (getParamScore(
            additionalParams.created_at, constants.COMMITFREQUENCY_THRESHOLD,constants.COMMITFREQUENCY_WEIGHT
        ))+
        (getParamScore(
            additionalParams.updated_at, constants.COMMITFREQUENCY_THRESHOLD,constants.COMMITFREQUENCY_WEIGHT
        ))+
        (getParamScore(
            additionalParams.releases, constants.COMMITFREQUENCY_THRESHOLD,constants.COMMITFREQUENCY_WEIGHT
        )) + additionalParamScore)  / totalWeight).toFixed(3);
        
        
        criticalityScore = Math.max(Math.min(criticalityScore,1),0);
        console.log(criticalityScore*10);
        return criticalityScore*10;

}

module.exports = getRepositoryScore;