import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import { calendarApi } from "../apis";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
  
    const {events, activeEvent} = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth);


    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(calendarEvent) => {
        const url = '/events';

        try {
            
            if (calendarEvent.id) {
    
                // Actualizando
                await calendarApi.put(`${url}/${calendarEvent.id}`, calendarEvent);
                
                dispatch(onUpdateEvent( {...calendarEvent, user} ));
    
                return;
            }
    
            // Creando
            const {data} = await calendarApi.post(url, calendarEvent);
            dispatch(onAddNewEvent( {...calendarEvent, id: data.event.id, user} ));

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

        
        
    }

    const startDeletingEvent = async() => {

        const url = '/events';

        try {

            await calendarApi.delete(`${url}/${activeEvent.id}`);
            dispatch(onDeleteEvent());

        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar evento.', error.response.data.msg, 'error');
        }

    }

    const startLoadingEvents = async() => {

        const url = '/events';

        try {
            const {data} = await calendarApi.get(url);
            const events = convertEventsToDateEvents(data.events);
            
            dispatch(onLoadEvents(events));

        } catch (error) {
            console.log('Error cargando eventos.', error);
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
