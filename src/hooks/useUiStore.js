import {onCloseDateModal, onOpenDateModal} from './../store';
import { useDispatch, useSelector } from "react-redux";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {isDateModalOpen} = useSelector( state => state.ui);

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
        ? openDateModal()
        : closeDateModal()
    }


    return {
        //Methods
        openDateModal,
        closeDateModal,
        toggleDateModal,
        //Properties
        isDateModalOpen,
    }
}