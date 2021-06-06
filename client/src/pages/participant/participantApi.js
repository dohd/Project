import Api from 'api';
import { clientSocket } from 'utils';

export const fetchParticipants = async dispatch => {
    const participants = await Api.participant.get();
    const participantAnalysis = await Api.participantAnalysis.get();
    const regionGraph = await Api.regionGraph.get();
    const programmeGraph = await Api.programmeGraph.get();
    const activityCount = await Api.activityCount.get();

    dispatch({
        type: 'addParticipants',
        payload: participants
    });

    const eventsDataMap = {
        participants, participantAnalysis, regionGraph, 
        programmeGraph, activityCount
    };
    for (const event in eventsDataMap) {
        clientSocket.emit(event, eventsDataMap[event]);
    }
};
