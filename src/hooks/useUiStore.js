import {onOpenDateModal} from './../store';
import { useDispatch, useSelector } from "react-redux";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {isDateModalOpen} = useSelector( state => state.ui);

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    return {
        //Methods
        openDateModal,
        //Properties
        isDateModalOpen,
    }
}