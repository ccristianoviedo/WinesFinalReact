import { doc, getDoc, getFirestore} from 'firebase/firestore'

export function getOrder (orderId) {

    const db= getFirestore()

    const order = doc(db, 'orders', orderId)

    return getDoc(order)
}