import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
  
    const {events, activeEvent} = useSelector(state => state.calendar);
  
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(calendarEvent) => {
        // Todo: llegar al backend

        // Todo OK
        if (calendarEvent._id) {
            // Actualizando
            dispatch(onUpdateEvent(calendarEvent));
        }else{
            // Creando
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}));
        }
    }

    const startDeletingEvent = () => {

        // Todo: llegar al back
        dispatch(onDeleteEvent());
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}
