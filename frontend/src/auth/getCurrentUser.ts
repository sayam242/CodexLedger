import {auth} from "./firebase/firebase";

export function getCurrentUser() {
    return auth.currentUser;
}